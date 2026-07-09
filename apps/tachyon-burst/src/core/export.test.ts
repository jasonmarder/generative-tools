import { describe, expect, it } from 'vitest';
import type { BurstConfig, ExportPayload, GeneratedBurst } from './types';
import { createExportPayload, parseExportPayload, stringifyExportPayload } from '../lib/export';
import { burstToSvgMarkup } from '../lib/svg';

const config: BurstConfig = {
  seed: 'test-seed',
  mode: 'mixed',
  distribution: 'controlled',
  rayCount: 2,
  layerCount: 1,
  palette: ['#111111', '#f04e23'],
  blendMode: 'multiply',
  opacity: 0.8,
  center: { x: 100, y: 80 },
  canvas: {
    width: 320,
    height: 180,
    background: '#f7f4ea',
  },
  geometry: {
    minLength: 20,
    maxLength: 100,
    width: 8,
    widthVariance: 0.3,
    lengthVariance: 0.3,
    skew: 0,
    foreshortening: 0,
    rotationJitter: 0,
    organicCluster: 0,
    lineCap: 'round',
  },
  layers: {
    rotationSpread: 0,
    scaleVariance: 0,
    opacityVariance: 0,
  },
  dominantBeam: {
    enabled: false,
    strength: 0,
    angle: 0,
  },
  motion: {
    preview: false,
    speed: 0,
    drift: 0,
  },
};

const burst: GeneratedBurst = {
  config,
  viewBox: { width: 320, height: 180 },
  layers: [
    {
      id: 'layer-1',
      rays: [
        {
          id: 'wedge-1',
          layerId: 'layer-1',
          primitive: 'wedge',
          color: '#111111',
          opacity: 0.7,
          points: [
            { x: 100, y: 80 },
            { x: 210, y: 50 },
            { x: 214, y: 74 },
          ],
          start: { x: 100, y: 80 },
          end: { x: 214, y: 74 },
          width: 20,
        },
        {
          id: 'line-1',
          layerId: 'layer-1',
          primitive: 'line',
          color: '#f04e23',
          opacity: 0.45,
          points: [],
          start: { x: 100, y: 80 },
          end: { x: 32, y: 140 },
          width: 4,
        },
      ],
    },
  ],
};

describe('SVG export', () => {
  it('serializes a clean flat SVG: one group of shapes, no preview scaffolding', () => {
    const svg = burstToSvgMarkup(burst);

    expect(svg).toContain('<polygon');
    expect(svg).toContain('<line');
    // Per-shape blend mode is preserved so each shape stays individually editable.
    expect(svg).toContain('style="mix-blend-mode:multiply"');
    expect(svg).not.toContain('mix-blend-mode:inherit');
    // A single shapes group, with the background as a separate backdrop rect.
    // The group is isolated so blends match the preview instead of multiplying
    // straight against the background.
    expect(svg).toContain('<g class="burst" style="isolation:isolate">');
    expect(svg).toContain('class="burst-background"');
    expect(svg).toContain('fill="#f7f4ea"');
    expect(svg).toContain('opacity="0.45"');
    expect(svg).toContain('stroke-linecap="round"');
    // No preview/import scaffolding that collapses shapes into one vector.
    expect(svg).not.toContain('clip-path');
    expect(svg).not.toContain('<clipPath');
    expect(svg).not.toContain('<defs');
    expect(svg).not.toContain('data-layer-id');
    expect(svg).not.toContain('burst-composition');
    expect(svg).not.toContain('burst-artboard');
    expect(svg).not.toContain('burst-origin-handle');
    expect(svg).not.toContain('data-preview-only');
    expect(svg).not.toContain('<filter');
    expect(svg).not.toContain('<image');
  });

  it('exports flat line caps when selected', () => {
    const svg = burstToSvgMarkup({
      ...burst,
      config: {
        ...config,
        geometry: {
          ...config.geometry,
          lineCap: 'flat',
        },
      },
    });

    expect(svg).toContain('stroke-linecap="butt"');
    expect(svg).not.toContain('stroke-linecap="round"');
  });
});

describe('JSON export payloads', () => {
  it('round-trips payloads', () => {
    const payload = createExportPayload(config, 'Smoke Test');
    const parsed = parseExportPayload(stringifyExportPayload(payload));

    expect(parsed).toEqual<ExportPayload>(payload);
  });
});
