import type { DialConfig, UseDialOptions } from 'dialkit';

import {
  blendModes,
  type BlendMode,
  type BurstConfig,
  type BurstMode,
  type DistributionMode,
  type LineCap,
} from './types';
export { defaultBurstConfig, defaultPalette } from './presets';

export const dialActionPaths = {
  randomizeAll: 'Actions.randomizeAll',
  randomizeSeed: 'Actions.randomizeSeed',
  randomizePalette: 'Actions.randomizePalette',
  savePreset: 'Actions.savePreset',
  importJson: 'Actions.importJson',
  exportJson: 'Export.exportJson',
  exportPng: 'Export.exportPng',
  exportSvg: 'Export.exportSvg',
} as const;

export type DialActionPath = (typeof dialActionPaths)[keyof typeof dialActionPaths];

export interface BurstDialValues {
  Core: {
    mode: string;
    distribution: string;
    lineCap: string;
    rayCount: number;
    layerCount: number;
    blendMode: string;
    opacity: number;
    background: string;
    seed: string;
  };
  Advanced: {
    Geometry: BurstConfig['geometry'];
    LayerVariance: BurstConfig['layers'];
    DominantBeam: BurstConfig['dominantBeam'];
    AnimationPreview: BurstConfig['motion'];
  };
}

export function createBurstDialConfig(config: BurstConfig): DialConfig {
  return {
    Core: {
      mode: {
        type: 'select',
        default: config.mode,
        options: [
          { value: 'wedges', label: 'Wedges' },
          { value: 'lines', label: 'Lines' },
          { value: 'mixed', label: 'Mixed' },
        ],
      },
      distribution: {
        type: 'select',
        default: config.distribution,
        options: [
          { value: 'controlled', label: 'Controlled' },
          { value: 'organic', label: 'Organic' },
        ],
      },
      lineCap: {
        type: 'select',
        default: config.geometry.lineCap ?? 'round',
        options: [
          { value: 'round', label: 'Rounded Lines' },
          { value: 'flat', label: 'Flat Lines' },
        ],
      },
      rayCount: [config.rayCount, 4, 32, 1],
      layerCount: [config.layerCount, 1, 12, 1],
      blendMode: {
        type: 'select',
        default: config.blendMode,
        options: blendModes.map((mode) => ({ value: mode, label: toTitleLabel(mode) })),
      },
      opacity: [config.opacity, 0, 1, 0.01],
      background: { type: 'color', default: config.canvas.background },
      seed: { type: 'text', default: config.seed, placeholder: 'Seed' },
    },
    Advanced: {
      _collapsed: true,
      Geometry: {
        minLength: [config.geometry.minLength, 40, 900, 10],
        maxLength: [config.geometry.maxLength, 80, 1600, 10],
        width: [config.geometry.width, 2, 220, 1],
        widthVariance: [config.geometry.widthVariance, 0, 1, 0.01],
        lengthVariance: [config.geometry.lengthVariance, 0, 1, 0.01],
        skew: [config.geometry.skew, -1, 1, 0.01],
        foreshortening: [config.geometry.foreshortening, 0, 1, 0.01],
        rotationJitter: [config.geometry.rotationJitter, 0, 0.5, 0.005],
        organicCluster: [config.geometry.organicCluster, 0, 1, 0.01],
      },
      LayerVariance: {
        rotationSpread: [config.layers.rotationSpread, 0, 1, 0.01],
        scaleVariance: [config.layers.scaleVariance, 0, 1, 0.01],
        opacityVariance: [config.layers.opacityVariance, 0, 1, 0.01],
      },
      DominantBeam: {
        enabled: config.dominantBeam.enabled,
        strength: [config.dominantBeam.strength, 0, 1, 0.01],
        angle: [config.dominantBeam.angle, -3.14, 3.14, 0.01],
      },
      AnimationPreview: {
        preview: config.motion.preview,
        speed: [config.motion.speed, 0.05, 4, 0.05],
        drift: [config.motion.drift, 0, 1, 0.01],
      },
    },
    Actions: {
      randomizeAll: { type: 'action', label: 'Randomize All' },
      randomizeSeed: { type: 'action', label: 'Randomize Seed' },
      randomizePalette: { type: 'action', label: 'Randomize Palette' },
      savePreset: { type: 'action', label: 'Save Preset' },
      importJson: { type: 'action', label: 'Import JSON' },
    },
    Export: {
      exportPng: { type: 'action', label: 'Export PNG' },
      exportJson: { type: 'action', label: 'Export JSON' },
      exportSvg: { type: 'action', label: 'Export SVG' },
    },
  };
}

export function createBurstDialOptions(onAction: (action: DialActionPath) => void): UseDialOptions {
  return {
    onAction: (action) => onAction(action as DialActionPath),
    shortcuts: {
      'Core.rayCount': { key: 'r', interaction: 'drag', mode: 'coarse' },
      'Core.layerCount': { key: 'l', interaction: 'drag' },
      'Core.opacity': { key: 'o', mode: 'fine' },
      'Advanced.Geometry.rotationJitter': { key: 'j', mode: 'fine' },
      'Advanced.DominantBeam.angle': { key: 'a', interaction: 'drag', mode: 'coarse' },
      'Advanced.AnimationPreview.preview': { key: 'p' },
    },
  };
}

export function burstConfigFromDialValues(baseConfig: BurstConfig, values: BurstDialValues): BurstConfig {
  return {
    ...baseConfig,
    seed: values.Core.seed,
    mode: values.Core.mode as BurstMode,
    distribution: values.Core.distribution as DistributionMode,
    rayCount: values.Core.rayCount,
    layerCount: values.Core.layerCount,
    blendMode: values.Core.blendMode as BlendMode,
    opacity: values.Core.opacity,
    canvas: {
      ...baseConfig.canvas,
      background: values.Core.background,
    },
    geometry: {
      ...values.Advanced.Geometry,
      lineCap: (values.Core.lineCap ?? baseConfig.geometry.lineCap ?? 'round') as LineCap,
    },
    layers: values.Advanced.LayerVariance,
    dominantBeam: values.Advanced.DominantBeam,
    motion: values.Advanced.AnimationPreview,
  };
}

function toTitleLabel(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
