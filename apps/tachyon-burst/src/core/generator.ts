import { createPrng, type RandomSource } from './prng';
import type { BurstConfig, GeneratedBurst, GeneratedLayer, GeneratedRay, Point, PrimitiveType } from './types';

interface RayBlueprint {
  angle: number;
  lengthUnit: number;
  widthUnit: number;
  skewUnit: number;
  foreshortenUnit: number;
  primitive: PrimitiveType;
  colorIndex: number;
  opacityUnit: number;
}

interface BlueprintOptions {
  angleOffset: number;
}

const TAU = Math.PI * 2;

export function generateBurst(config: BurstConfig): GeneratedBurst {
  const prng = createPrng(config.seed);
  const apex = resolveApex(config);
  const rayFieldCenter = resolveRayFieldCenter(config);
  const layerCount = Math.max(1, config.layerCount);
  const rayCount = Math.max(1, config.rayCount);

  const layers: GeneratedLayer[] = Array.from({ length: layerCount }, (_, layerIndex) => {
    const layerPrng = prng.fork(`layer-${layerIndex}`);
    const blueprintPrng = prng.fork(`layer-${layerIndex}:blueprints`);
    const layerRotation = layerPrng.range(-config.layers.rotationSpread, config.layers.rotationSpread);
    const layerScale = 1 + layerPrng.range(-config.layers.scaleVariance, config.layers.scaleVariance);
    const layerOpacity = clamp(
      config.opacity * (1 + layerPrng.range(-config.layers.opacityVariance, config.layers.opacityVariance)),
      0,
      1,
    );
    const colorOrder = layerPrng.shuffle(config.palette);
    const angleOffset = layerCount > 1 ? blueprintPrng.range(-TAU / rayCount, TAU / rayCount) : 0;
    const blueprints = createBlueprints(config, blueprintPrng, { angleOffset });

    const rays = blueprints.map((blueprint, rayIndex) =>
      createRay(config, blueprint, {
        apex,
        rayFieldCenter,
        layerIndex,
        rayIndex,
        layerRotation,
        layerScale,
        layerOpacity,
        colorOrder,
      }),
    );

    return {
      id: `layer-${layerIndex}`,
      rays,
    };
  });

  return {
    config,
    layers,
    viewBox: {
      width: config.canvas.width,
      height: config.canvas.height,
    },
  };
}

function createBlueprints(config: BurstConfig, prng: RandomSource, options: BlueprintOptions): RayBlueprint[] {
  const rayCount = Math.max(1, config.rayCount);
  const trackCount = Math.max(3, Math.round(4 + config.geometry.organicCluster * 8));
  const trackAngles = Array.from({ length: trackCount }, (_, index) => {
    const base = (index / trackCount) * TAU;
    return base + options.angleOffset + prng.range(-0.18, 0.18);
  });

  return Array.from({ length: rayCount }, (_, index) => {
    const baseAngle =
      config.distribution === 'controlled'
        ? controlledAngle(index, rayCount, config, prng, options.angleOffset)
        : organicAngle(index, rayCount, config, trackAngles, prng);
    const angle = bendTowardDominantBeam(baseAngle, config);

    return {
      angle,
      lengthUnit: prng.next(),
      widthUnit: prng.next(),
      skewUnit: prng.range(-1, 1),
      foreshortenUnit: prng.next(),
      primitive: choosePrimitive(config.mode, index, prng),
      colorIndex: prng.int(0, Math.max(0, config.palette.length - 1)),
      opacityUnit: prng.next(),
    };
  });
}

function controlledAngle(
  index: number,
  rayCount: number,
  config: BurstConfig,
  prng: RandomSource,
  angleOffset: number,
) {
  const base = (index / rayCount) * TAU + angleOffset;
  const unevenGap = Math.sin((index + 1) * 1.73 + angleOffset) * config.geometry.rotationJitter * 0.7;
  const jitter = prng.range(-config.geometry.rotationJitter, config.geometry.rotationJitter);

  return base + unevenGap + jitter;
}

function organicAngle(
  index: number,
  rayCount: number,
  config: BurstConfig,
  trackAngles: number[],
  prng: RandomSource,
) {
  const trackIndex = index % trackAngles.length;
  const trackPosition = index / Math.max(1, rayCount - 1);
  const trackCurl = (trackPosition - 0.5) * config.geometry.organicCluster * 1.4;
  const scatter = prng.range(-0.42, 0.42) * config.geometry.organicCluster;

  return trackAngles[trackIndex] + trackCurl + scatter;
}

function bendTowardDominantBeam(angle: number, config: BurstConfig) {
  if (!config.dominantBeam.enabled || config.dominantBeam.strength <= 0) {
    return angle;
  }

  const strength = clamp(config.dominantBeam.strength, 0, 1) * 0.72;
  const delta = shortestAngle(config.dominantBeam.angle - angle);

  return angle + delta * strength;
}

function choosePrimitive(mode: BurstConfig['mode'], index: number, prng: RandomSource): PrimitiveType {
  if (mode === 'wedges') {
    return 'wedge';
  }

  if (mode === 'lines') {
    return 'line';
  }

  return (index + prng.int(0, 1)) % 2 === 0 ? 'line' : 'wedge';
}

function createRay(
  config: BurstConfig,
  blueprint: RayBlueprint,
  layer: {
    apex: Point;
    rayFieldCenter: Point;
    layerIndex: number;
    rayIndex: number;
    layerRotation: number;
    layerScale: number;
    layerOpacity: number;
    colorOrder: string[];
  },
): GeneratedRay {
  const angle = blueprint.angle + layer.layerRotation;
  const direction = pointFromAngle(angle);
  const normal = { x: -direction.y, y: direction.x };
  const lengthBase = mix(config.geometry.minLength, config.geometry.maxLength, blueprint.lengthUnit);
  const lengthVariance = 1 + (blueprint.lengthUnit - 0.5) * config.geometry.lengthVariance;
  const foreshortening = 1 - config.geometry.foreshortening * blueprint.foreshortenUnit * Math.abs(Math.sin(angle));
  const length = lengthBase * lengthVariance * foreshortening * layer.layerScale;
  const width = Math.max(
    1,
    config.geometry.width * (1 + (blueprint.widthUnit - 0.5) * config.geometry.widthVariance * 2) * layer.layerScale,
  );
  const skew = blueprint.skewUnit * config.geometry.skew * width;
  const start = layer.apex;
  const end = add(layer.rayFieldCenter, add(scale(direction, length), scale(normal, skew)));
  const opacity = clamp(layer.layerOpacity * mix(0.84, 1, blueprint.opacityUnit), 0, 1);
  const palette = layer.colorOrder.length > 0 ? layer.colorOrder : config.palette;
  const color = palette[blueprint.colorIndex % Math.max(1, palette.length)] ?? '#000000';

  return {
    id: `ray-${layer.layerIndex}-${layer.rayIndex}`,
    layerId: `layer-${layer.layerIndex}`,
    primitive: blueprint.primitive,
    color,
    opacity,
    points: blueprint.primitive === 'wedge' ? wedgePoints(start, end, normal, width) : linePoints(start, end),
    start,
    end,
    width: blueprint.primitive === 'wedge' ? 0 : Math.max(1, width * 0.38),
  };
}

function wedgePoints(apex: Point, farCenter: Point, normal: Point, width: number): Point[] {
  const farHalfWidth = width / 2;
  const farLeft = add(farCenter, scale(normal, -farHalfWidth));
  const farRight = add(farCenter, scale(normal, farHalfWidth));

  return [roundPoint(apex), roundPoint(farLeft), roundPoint(farRight)];
}

function linePoints(start: Point, end: Point): Point[] {
  return [roundPoint(start), roundPoint(end)];
}

function resolveApex(config: BurstConfig): Point {
  return {
    x: Math.abs(config.center.x) <= 1 ? config.center.x * config.canvas.width : config.center.x,
    y: Math.abs(config.center.y) <= 1 ? config.center.y * config.canvas.height : config.center.y,
  };
}

function resolveRayFieldCenter(config: BurstConfig): Point {
  return {
    x: config.canvas.width / 2,
    y: config.canvas.height / 2,
  };
}

function pointFromAngle(angle: number): Point {
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

function add(a: Point, b: Point): Point {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

function scale(point: Point, scalar: number): Point {
  return {
    x: point.x * scalar,
    y: point.y * scalar,
  };
}

function roundPoint(point: Point): Point {
  return {
    x: round(point.x),
    y: round(point.y),
  };
}

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

function mix(min: number, max: number, amount: number) {
  return min + (max - min) * amount;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function shortestAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}
