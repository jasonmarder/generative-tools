import type { BurstConfig, BurstPreset } from './types';

export const defaultPalette = ['#F83F5B', '#F9E908', '#F668D6', '#48B8F0'];

type BurstConfigOverrides = Partial<
  Omit<BurstConfig, 'canvas' | 'geometry' | 'layers' | 'dominantBeam' | 'motion'>
> & {
  canvas?: Partial<BurstConfig['canvas']>;
  geometry?: Partial<BurstConfig['geometry']>;
  layers?: Partial<BurstConfig['layers']>;
  dominantBeam?: Partial<BurstConfig['dominantBeam']>;
  motion?: Partial<BurstConfig['motion']>;
};

export const defaultBurstConfig: BurstConfig = {
  seed: 'tachyon-burst',
  mode: 'wedges',
  distribution: 'controlled',
  rayCount: 8,
  layerCount: 3,
  palette: defaultPalette,
  blendMode: 'multiply',
  opacity: 0.88,
  center: { x: 0.5, y: 0.5 },
  canvas: {
    width: 1600,
    height: 900,
    background: '#FAF7EF',
  },
  geometry: {
    minLength: 260,
    maxLength: 940,
    width: 118,
    widthVariance: 0.78,
    lengthVariance: 0.52,
    skew: 0.5,
    foreshortening: 0.22,
    rotationJitter: 0.12,
    organicCluster: 0.32,
    lineCap: 'round',
  },
  layers: {
    rotationSpread: 0.035,
    scaleVariance: 0.1,
    opacityVariance: 0.14,
  },
  dominantBeam: {
    enabled: false,
    strength: 0.55,
    angle: -0.28,
  },
  motion: {
    preview: true,
    speed: 0.45,
    drift: 0.22,
  },
};

function definePreset(id: string, name: string, config: BurstConfig): BurstPreset {
  return { id, name, config };
}

function withConfig(overrides: BurstConfigOverrides): BurstConfig {
  return {
    ...defaultBurstConfig,
    ...overrides,
    palette: overrides.palette ?? defaultBurstConfig.palette,
    canvas: {
      ...defaultBurstConfig.canvas,
      ...overrides.canvas,
    },
    geometry: {
      ...defaultBurstConfig.geometry,
      ...overrides.geometry,
    },
    layers: {
      ...defaultBurstConfig.layers,
      ...overrides.layers,
    },
    dominantBeam: {
      ...defaultBurstConfig.dominantBeam,
      ...overrides.dominantBeam,
    },
    motion: {
      ...defaultBurstConfig.motion,
      ...overrides.motion,
    },
  };
}

export const burstPresets: BurstPreset[] = [
  definePreset(
    'wedge-burst',
    'Wedge Burst',
    withConfig({
      seed: 'wedge-burst',
      mode: 'wedges',
      distribution: 'controlled',
      rayCount: 8,
      layerCount: 3,
      geometry: {
        minLength: 260,
        maxLength: 940,
        width: 118,
        widthVariance: 0.78,
        lengthVariance: 0.52,
        skew: 0.5,
        foreshortening: 0.22,
        rotationJitter: 0.12,
        organicCluster: 0.22,
        lineCap: 'flat',
      },
      layers: {
        rotationSpread: 0.035,
        scaleVariance: 0.12,
        opacityVariance: 0.14,
      },
    }),
  ),
  definePreset(
    'organic-tracks',
    'Organic Tracks',
    withConfig({
      seed: 'organic-tracks',
      mode: 'lines',
      distribution: 'organic',
      rayCount: 18,
      layerCount: 5,
      opacity: 0.76,
      geometry: {
        minLength: 220,
        maxLength: 720,
        width: 18,
        widthVariance: 0.78,
        lengthVariance: 0.62,
        skew: 0.18,
        foreshortening: 0.16,
        rotationJitter: 0.18,
        organicCluster: 0.78,
        lineCap: 'round',
      },
      dominantBeam: {
        enabled: true,
        strength: 0.42,
        angle: 0.72,
      },
    }),
  ),
  definePreset(
    'dense-overprint',
    'Dense Overprint',
    withConfig({
      seed: 'dense-overprint',
      mode: 'mixed',
      distribution: 'organic',
      rayCount: 32,
      layerCount: 7,
      opacity: 0.82,
      geometry: {
        minLength: 180,
        maxLength: 820,
        width: 46,
        widthVariance: 0.82,
        lengthVariance: 0.72,
        skew: 0.36,
        foreshortening: 0.24,
        rotationJitter: 0.2,
        organicCluster: 0.64,
        lineCap: 'round',
      },
      layers: {
        rotationSpread: 0.24,
        scaleVariance: 0.24,
        opacityVariance: 0.22,
      },
      dominantBeam: {
        enabled: true,
        strength: 0.34,
        angle: -0.62,
      },
    }),
  ),
  definePreset(
    'minimal-beam',
    'Minimal Beam',
    withConfig({
      seed: 'minimal-beam',
      mode: 'lines',
      distribution: 'controlled',
      rayCount: 12,
      layerCount: 2,
      opacity: 0.92,
      geometry: {
        minLength: 420,
        maxLength: 980,
        width: 14,
        widthVariance: 0.28,
        lengthVariance: 0.24,
        skew: 0.08,
        foreshortening: 0.2,
        rotationJitter: 0.04,
        organicCluster: 0.16,
        lineCap: 'flat',
      },
      layers: {
        rotationSpread: 0.04,
        scaleVariance: 0.08,
        opacityVariance: 0.1,
      },
      dominantBeam: {
        enabled: true,
        strength: 0.82,
        angle: -0.12,
      },
      canvas: {
        background: '#FFFDF6',
      },
    }),
  ),
];

export function getPreset(id: string): BurstPreset | undefined {
  return burstPresets.find((preset) => preset.id === id);
}
