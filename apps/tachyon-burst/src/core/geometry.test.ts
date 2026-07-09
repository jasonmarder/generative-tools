import { describe, expect, it } from 'vitest';
import { generateBurst } from './generator';
import { burstPresets, defaultBurstConfig, defaultPalette } from './presets';

describe('generateBurst', () => {
  it('produces deterministic geometry for the same seed and config', () => {
    const first = generateBurst(defaultBurstConfig);
    const second = generateBurst(defaultBurstConfig);

    expect(second).toEqual(first);
  });

  it('changes geometry when the seed changes', () => {
    const first = generateBurst(defaultBurstConfig);
    const second = generateBurst({
      ...defaultBurstConfig,
      seed: 'different-seed',
    });

    expect(second.layers[0]?.rays[0]?.points).not.toEqual(first.layers[0]?.rays[0]?.points);
  });

  it('keeps the default visual assumptions in the base config', () => {
    expect(defaultBurstConfig.palette).toEqual(defaultPalette);
    expect(defaultBurstConfig.mode).toBe('wedges');
    expect(defaultBurstConfig.distribution).toBe('controlled');
    expect(defaultBurstConfig.blendMode).toBe('multiply');
    expect(defaultBurstConfig.opacity).toBeGreaterThan(0.8);
    expect(defaultBurstConfig.canvas.width).toBe(1600);
    expect(defaultBurstConfig.canvas.height).toBe(900);
    expect(defaultBurstConfig.canvas.background).toMatch(/^#F/i);
    expect(defaultBurstConfig.geometry.lineCap).toBe('round');
    expect('offset' in defaultBurstConfig).toBe(false);
    expect('paperGrain' in defaultBurstConfig.canvas).toBe(false);
    expect('shapeGrain' in defaultBurstConfig.canvas).toBe(false);
    expect('grainAmount' in defaultBurstConfig.canvas).toBe(false);
    expect('taper' in defaultBurstConfig.geometry).toBe(false);
  });

  it('makes every wedge share the exact same apex point', () => {
    const generated = generateBurst({
      ...defaultBurstConfig,
      mode: 'wedges',
      rayCount: 8,
      layerCount: 3,
      layers: {
        ...defaultBurstConfig.layers,
        rotationSpread: 0,
        scaleVariance: 0,
        opacityVariance: 0,
      },
    });
    const apex = { x: 800, y: 450 };

    for (const ray of generated.layers.flatMap((layer) => layer.rays)) {
      expect(ray.primitive).toBe('wedge');
      expect(ray.start).toEqual(apex);
      expect(ray.points[0]).toEqual(apex);
      expect(ray.points).toHaveLength(3);
    }
  });

  it('makes every line start at the exact same apex point', () => {
    const generated = generateBurst({
      ...defaultBurstConfig,
      mode: 'lines',
      rayCount: 8,
      layerCount: 2,
      distribution: 'organic',
    });
    const apex = { x: 800, y: 450 };

    for (const ray of generated.layers.flatMap((layer) => layer.rays)) {
      expect(ray.primitive).toBe('line');
      expect(ray.start).toEqual(apex);
      expect(ray.points[0]).toEqual(apex);
    }
  });

  it('gives each layer an independent composition while preserving the shared apex', () => {
    const generated = generateBurst({
      ...defaultBurstConfig,
      mode: 'wedges',
      rayCount: 8,
      layerCount: 3,
      layers: {
        ...defaultBurstConfig.layers,
        rotationSpread: 0,
        scaleVariance: 0,
        opacityVariance: 0,
      },
    });
    const apex = { x: 800, y: 450 };
    const layerSignatures = generated.layers.map((layer) =>
      layer.rays
        .map(
          (ray) =>
            `${ray.end.x},${ray.end.y}:${ray.points[1]?.x},${ray.points[1]?.y}:${ray.points[2]?.x},${ray.points[2]?.y}`,
        )
        .join('|'),
    );

    expect(new Set(layerSignatures).size).toBe(generated.layers.length);

    for (const ray of generated.layers.flatMap((layer) => layer.rays)) {
      expect(ray.start).toEqual(apex);
      expect(ray.points[0]).toEqual(apex);
    }
  });

  it('moves only the wedge apex when center changes', () => {
    const base = generateBurst({
      ...defaultBurstConfig,
      mode: 'wedges',
      layerCount: 1,
      layers: {
        ...defaultBurstConfig.layers,
        rotationSpread: 0,
        scaleVariance: 0,
        opacityVariance: 0,
      },
    });
    const shifted = generateBurst({
      ...defaultBurstConfig,
      mode: 'wedges',
      center: { x: 0.35, y: 0.65 },
      layerCount: 1,
      layers: {
        ...defaultBurstConfig.layers,
        rotationSpread: 0,
        scaleVariance: 0,
        opacityVariance: 0,
      },
    });
    const baseRay = base.layers[0]?.rays[0];
    const shiftedRay = shifted.layers[0]?.rays[0];

    expect(baseRay?.points[0]).toEqual({ x: 800, y: 450 });
    expect(shiftedRay?.points[0]).toEqual({ x: 560, y: 585 });
    expect(shiftedRay?.points[1]).toEqual(baseRay?.points[1]);
    expect(shiftedRay?.points[2]).toEqual(baseRay?.points[2]);
    expect(shiftedRay?.end).toEqual(baseRay?.end);
  });

  it('moves only the line start when center changes', () => {
    const base = generateBurst({
      ...defaultBurstConfig,
      mode: 'lines',
      layerCount: 1,
    });
    const shifted = generateBurst({
      ...defaultBurstConfig,
      mode: 'lines',
      center: { x: 0.35, y: 0.65 },
      layerCount: 1,
    });
    const baseRay = base.layers[0]?.rays[0];
    const shiftedRay = shifted.layers[0]?.rays[0];

    expect(baseRay?.start).toEqual({ x: 800, y: 450 });
    expect(shiftedRay?.start).toEqual({ x: 560, y: 585 });
    expect(shiftedRay?.end).toEqual(baseRay?.end);
    expect(shiftedRay?.points[1]).toEqual(baseRay?.points[1]);
  });
});

describe('burstPresets', () => {
  it('defines the required presets', () => {
    expect(burstPresets.map((preset) => preset.name)).toEqual([
      'Wedge Burst',
      'Organic Tracks',
      'Dense Overprint',
      'Minimal Beam',
    ]);
  });

  it('generates non-empty geometry for every preset', () => {
    for (const preset of burstPresets) {
      const generated = generateBurst(preset.config);
      const rays = generated.layers.flatMap((layer) => layer.rays);

      expect(generated.layers.length).toBeGreaterThan(0);
      expect(rays.length).toBeGreaterThan(0);
      expect(rays.every((ray) => ray.points.length >= 2)).toBe(true);
    }
  });

  it('sets Wedge Burst to the corrected clean default density', () => {
    const wedgeBurst = burstPresets.find((preset) => preset.name === 'Wedge Burst');

    expect(wedgeBurst?.config.rayCount).toBe(8);
    expect(wedgeBurst?.config.layerCount).toBe(3);
    expect(wedgeBurst?.config.mode).toBe('wedges');
  });
});
