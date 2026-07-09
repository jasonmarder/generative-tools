import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DialRoot, useDialKit } from 'dialkit';
import BurstCanvas from './components/BurstCanvas';
import { Gallery } from './components/Gallery';
import { PaletteEditor } from './components/PaletteEditor';
import {
  burstConfigFromDialValues,
  createBurstDialConfig,
  createBurstDialOptions,
  defaultBurstConfig,
  type BurstDialValues,
  type DialActionPath,
  dialActionPaths,
} from './core/dialConfig';
import { generateBurst } from './core/generator';
import { burstPresets } from './core/presets';
import type { BurstConfig, SavedBurst } from './core/types';
import {
  createExportPayload,
  exportPngBlob,
  parseExportPayload,
  type PngScale,
} from './lib/export';
import {
  deleteSavedBurst,
  loadSavedBursts,
  saveBurst,
} from './lib/storage';
import { serializeSvgForExport } from './lib/export';
import { burstToSvgMarkup } from './lib/svg';

function ControlBridge({
  baseConfig,
  onConfigChange,
  onAction,
}: {
  baseConfig: BurstConfig;
  onConfigChange: (config: BurstConfig) => void;
  onAction: (action: DialActionPath) => void;
}) {
  const dialConfig = useMemo(() => createBurstDialConfig(baseConfig), [baseConfig]);
  const dialOptions = useMemo(() => createBurstDialOptions(onAction), [onAction]);
  const values = useDialKit('Generator', dialConfig, dialOptions) as unknown as BurstDialValues;
  const valuesKey = JSON.stringify(values);

  useEffect(() => {
    onConfigChange(burstConfigFromDialValues(baseConfig, values));
    // `useDialKit` returns a fresh resolved object, so the serialized key is the stable change signal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseConfig, onConfigChange, valuesKey]);

  return null;
}

export default function App() {
  const [baseConfig, setBaseConfig] = useState(defaultBurstConfig);
  const [currentConfig, setCurrentConfig] = useState(defaultBurstConfig);
  const [controlVersion, setControlVersion] = useState(0);
  const [presetName, setPresetName] = useState('Wedge Burst');
  const [saved, setSaved] = useState<SavedBurst[]>(() => loadSavedBursts());
  const stageRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const burst = useMemo(() => generateBurst(currentConfig), [currentConfig]);

  const resetDialkit = useCallback((nextConfig: BurstConfig, nextName = presetName) => {
    setBaseConfig(nextConfig);
    setCurrentConfig(nextConfig);
    setPresetName(nextName);
    setControlVersion((version) => version + 1);
  }, [presetName]);

  const currentSvg = useCallback(() => {
    const svg = stageRef.current?.querySelector('svg');
    if (!(svg instanceof SVGSVGElement)) {
      throw new Error('No burst canvas is available yet.');
    }
    return svg;
  }, []);

  const makeThumbnail = useCallback(() => {
    const svg = currentSvg();
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serializeSvgForExport(svg))}`;
  }, [currentSvg]);

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadText = useCallback((text: string, filename: string, type: string) => {
    downloadBlob(new Blob([text], { type }), filename);
  }, [downloadBlob]);

  const refreshStorage = useCallback(() => {
    setSaved(loadSavedBursts());
  }, []);

  const randomSeed = useCallback(() => `tachyon-${Math.random().toString(36).slice(2, 9)}`, []);

  const randomPalette = useCallback((palette: string[]) => shuffle(palette), []);

  const handleRandomizeAll = useCallback(() => {
    const nextConfig: BurstConfig = {
      ...currentConfig,
      seed: randomSeed(),
      mode: randomPick(['wedges', 'lines', 'mixed']),
      distribution: randomPick(['controlled', 'organic']),
      rayCount: randomInt(4, 32),
      layerCount: randomInt(1, 12),
      palette: randomPalette(currentConfig.palette),
      dominantBeam: {
        ...currentConfig.dominantBeam,
        enabled: Math.random() > 0.35,
        strength: Math.random(),
        angle: Math.random() * Math.PI * 2 - Math.PI,
      },
    };
    resetDialkit(nextConfig, 'Random Burst');
  }, [currentConfig, randomPalette, randomSeed, resetDialkit]);

  const setPalette = useCallback((nextPalette: string[]) => {
    setBaseConfig((config) => ({ ...config, palette: nextPalette }));
    setCurrentConfig((config) => ({ ...config, palette: nextPalette }));
  }, []);

  const handleChangeColor = useCallback((index: number, color: string) => {
    const replaceAt = (palette: string[]) =>
      palette.map((existing, colorIndex) => (colorIndex === index ? color : existing));
    setBaseConfig((config) => ({ ...config, palette: replaceAt(config.palette) }));
    setCurrentConfig((config) => ({ ...config, palette: replaceAt(config.palette) }));
  }, []);

  const handleRemoveColor = useCallback((index: number) => {
    const removeAt = (palette: string[]) =>
      palette.length <= 1 ? palette : palette.filter((_, colorIndex) => colorIndex !== index);
    setBaseConfig((config) => ({ ...config, palette: removeAt(config.palette) }));
    setCurrentConfig((config) => ({ ...config, palette: removeAt(config.palette) }));
  }, []);

  const handleAddColor = useCallback(() => {
    setBaseConfig((config) => ({ ...config, palette: [...config.palette, '#ffffff'] }));
    setCurrentConfig((config) => ({ ...config, palette: [...config.palette, '#ffffff'] }));
  }, []);

  const handleRandomizePalette = useCallback(() => {
    setPalette(randomPalette(currentConfig.palette));
  }, [currentConfig.palette, randomPalette, setPalette]);

  const handleSave = useCallback(() => {
    saveBurst({
      name: presetName,
      config: currentConfig,
      thumbnail: makeThumbnail(),
    });
    refreshStorage();
  }, [currentConfig, makeThumbnail, presetName, refreshStorage]);

  const handleExportJson = useCallback(() => {
    const payload = createExportPayload(currentConfig, presetName);
    downloadText(
      JSON.stringify(payload, null, 2),
      `${filenameSafe(presetName)}.burst.json`,
      'application/json;charset=utf-8',
    );
  }, [currentConfig, downloadText, presetName]);

  const handleExportSvg = useCallback(() => {
    const markup = burstToSvgMarkup(burst, { title: presetName });
    downloadBlob(
      new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }),
      `${filenameSafe(presetName)}.svg`,
    );
  }, [burst, downloadBlob, presetName]);

  const handleExportPng = useCallback(async () => {
    const svg = currentSvg();
    for (const scale of [1, 2, 4] as PngScale[]) {
      const blob = await exportPngBlob(svg, scale);
      downloadBlob(blob, `${filenameSafe(presetName)}-${scale}x.png`);
    }
  }, [currentSvg, downloadBlob, presetName]);

  const handleAction = useCallback(
    (action: DialActionPath) => {
      if (action === dialActionPaths.randomizeAll) {
        handleRandomizeAll();
        return;
      }

      if (action === dialActionPaths.randomizeSeed) {
        const nextConfig = { ...currentConfig, seed: randomSeed() };
        resetDialkit(nextConfig, presetName);
        return;
      }

      if (action === dialActionPaths.randomizePalette) {
        handleRandomizePalette();
        return;
      }

      if (action === dialActionPaths.savePreset) {
        handleSave();
        return;
      }

      if (action === dialActionPaths.importJson) {
        importInputRef.current?.click();
        return;
      }

      if (action === dialActionPaths.exportJson) {
        handleExportJson();
        return;
      }

      if (action === dialActionPaths.exportPng) {
        void handleExportPng();
        return;
      }

      if (action === dialActionPaths.exportSvg) {
        handleExportSvg();
      }
    },
    [
      currentConfig,
      handleExportJson,
      handleExportPng,
      handleExportSvg,
      handleRandomizeAll,
      handleRandomizePalette,
      handleSave,
      presetName,
      randomSeed,
      resetDialkit,
    ],
  );

  const handleImportFile = useCallback(async (file: File | undefined) => {
    if (!file) {
      return;
    }

    const text = await file.text();
    const payload = parseExportPayload(text);
    resetDialkit(payload.config, payload.presetName ?? 'Imported Burst');
  }, [resetDialkit]);

  const restoreSaved = useCallback((item: SavedBurst) => {
    resetDialkit(item.config, item.name);
  }, [resetDialkit]);

  const handleDeleteSaved = useCallback((id: string) => {
    setSaved(deleteSavedBurst(id));
  }, []);

  const handleOriginChange = useCallback((center: BurstConfig['center']) => {
    setBaseConfig((config) => ({ ...config, center }));
    setCurrentConfig((config) => ({ ...config, center }));
  }, []);

  return (
    <main className="app">
      <ControlBridge
        key={controlVersion}
        baseConfig={baseConfig}
        onConfigChange={setCurrentConfig}
        onAction={handleAction}
      />
      <input
        ref={importInputRef}
        className="visually-hidden"
        type="file"
        accept="application/json,.json"
        onChange={(event) => {
          void handleImportFile(event.target.files?.[0]);
          event.currentTarget.value = '';
        }}
      />

      <aside className="rail rail--left" aria-label="Library">
        <div className="rail__head">
          <span className="rail__title">Burst Lab</span>
        </div>

        <div className="rail__body">
          <section className="panel" aria-label="Presets">
            <h2 className="panel__title">Presets</h2>
            <ul className="preset-list">
              {burstPresets.map((preset) => (
                <li key={preset.id}>
                  <button
                    type="button"
                    className={preset.name === presetName ? 'is-active' : undefined}
                    onClick={() => resetDialkit(preset.config, preset.name)}
                  >
                    <span className="dot" aria-hidden="true" />
                    {preset.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel" aria-label="Saved">
            <h2 className="panel__title">Saved</h2>
            <Gallery
              saved={saved}
              onRestore={restoreSaved}
              onDeleteSaved={handleDeleteSaved}
            />
          </section>
        </div>
      </aside>

      <section className="stage" aria-label="Canvas">
        <div className="stage__top">
          <span className="stage__label">{presetName}</span>
        </div>
        <div ref={stageRef} className="stage__frame">
          <BurstCanvas
            burst={burst}
            className={currentConfig.motion.preview ? 'burst-canvas is-moving' : 'burst-canvas'}
            onOriginChange={handleOriginChange}
          />
        </div>
      </section>

      <aside className="rail rail--right" aria-label="Generator controls">
        <PaletteEditor
          palette={currentConfig.palette}
          onChangeColor={handleChangeColor}
          onRemoveColor={handleRemoveColor}
          onAddColor={handleAddColor}
        />
        <div className="dial-wrap">
          <DialRoot mode="inline" theme="dark" defaultOpen productionEnabled />
        </div>
      </aside>
    </main>
  );
}

function randomPick<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: readonly T[]) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function filenameSafe(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'tachyon-burst';
}
