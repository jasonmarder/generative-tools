export const blendModes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-burn',
  'color-dodge',
  'difference',
] as const;

export type BlendMode = (typeof blendModes)[number];
export type BurstMode = 'wedges' | 'lines' | 'mixed';
export type DistributionMode = 'controlled' | 'organic';
export type LineCap = 'round' | 'flat';
export type PrimitiveType = 'wedge' | 'line';

export interface Point {
  x: number;
  y: number;
}

export interface CanvasSettings {
  width: number;
  height: number;
  background: string;
}

export interface BurstConfig {
  seed: string;
  mode: BurstMode;
  distribution: DistributionMode;
  rayCount: number;
  layerCount: number;
  palette: string[];
  blendMode: BlendMode;
  opacity: number;
  center: Point;
  canvas: CanvasSettings;
  geometry: {
    minLength: number;
    maxLength: number;
    width: number;
    widthVariance: number;
    lengthVariance: number;
    skew: number;
    foreshortening: number;
    rotationJitter: number;
    organicCluster: number;
    lineCap: LineCap;
  };
  layers: {
    rotationSpread: number;
    scaleVariance: number;
    opacityVariance: number;
  };
  dominantBeam: {
    enabled: boolean;
    strength: number;
    angle: number;
  };
  motion: {
    preview: boolean;
    speed: number;
    drift: number;
  };
}

export interface GeneratedRay {
  id: string;
  layerId: string;
  primitive: PrimitiveType;
  color: string;
  opacity: number;
  points: Point[];
  start: Point;
  end: Point;
  width: number;
}

export interface GeneratedLayer {
  id: string;
  rays: GeneratedRay[];
}

export interface GeneratedBurst {
  config: BurstConfig;
  layers: GeneratedLayer[];
  viewBox: {
    width: number;
    height: number;
  };
}

export interface BurstPreset {
  id: string;
  name: string;
  config: BurstConfig;
}

export interface SavedBurst {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  config: BurstConfig;
}

export interface ExportPayload {
  version: 1;
  exportedAt: string;
  presetName?: string;
  config: BurstConfig;
}
