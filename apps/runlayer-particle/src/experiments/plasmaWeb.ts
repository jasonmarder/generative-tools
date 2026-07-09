import * as THREE from "three";

export type PlasmaWebPalette = {
  background: string;
  ink: string;
  rust: string;
};

export type PlasmaWebTargetOptions = {
  radius: number;
  shellDepth: number;
  strandCount: number;
  strandCoverage: number;
  strandArc: number;
  strandWobble: number;
  voidCount: number;
  voidRadius: number;
  seed: number;
};

export type PlasmaWebMotionKnobs = {
  rotationSpeed: number;
  breathStrength: number;
  breathAmplitude: number;
  breathSpeed: number;
  strandDrift: number;
  surfaceJitter: number;
  connectionPulse: number;
};

export type PlasmaWebOrbOptions = Partial<PlasmaWebTargetOptions> & {
  particleCount: number;
  maxConnections: number;
  localDegree: number;
  maxConnectionDistance: number;
  pointSize: number;
  pointOpacity: number;
  lineOpacity: number;
  palette: PlasmaWebPalette;
  motion: PlasmaWebMotionKnobs;
};

export type PlasmaWebSurfaceSample = {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  strandId: number;
  strandPhase: number;
  weight: number;
};

type FunnelControlPlane = {
  y: number;
  radius: number;
  depth: number;
  weight: number;
};

const DEFAULT_TARGETS: PlasmaWebTargetOptions = {
  radius: 11.8,
  shellDepth: 1.45,
  strandCount: 86,
  strandCoverage: 0.72,
  strandArc: 1.9,
  strandWobble: 0.24,
  voidCount: 0,
  voidRadius: 0,
  seed: 42,
};

export const RUNLAYER_PLASMA_WEB_PALETTE: PlasmaWebPalette = {
  background: "#F5F5F4",
  ink: "#1C1917",
  rust: "#A4513E",
};

export const PLASMA_WEB_DEFAULTS: PlasmaWebOrbOptions = {
  ...DEFAULT_TARGETS,
  particleCount: 36000,
  maxConnections: 18,
  localDegree: 0,
  maxConnectionDistance: 0,
  pointSize: 0.88,
  pointOpacity: 0.2,
  lineOpacity: 0,
  palette: RUNLAYER_PLASMA_WEB_PALETTE,
  motion: {
    rotationSpeed: 0,
    breathStrength: 0.32,
    breathAmplitude: 1.56,
    breathSpeed: 2.37,
    strandDrift: 0.32,
    surfaceJitter: 0.115,
    connectionPulse: 0.82,
  },
};

const FUNNEL_X_SCALE = 1.34;
const FUNNEL_Z_SCALE = 0.98;
const FUNNEL_Y_SCALE = 1.03;
const FUNNEL_TOP_Y = 10.65;
const FUNNEL_BOTTOM_Y = -10.4;
const FUNNEL_TOP_RADIUS = 6.8;
const FUNNEL_BOTTOM_RADIUS = 0.78;
const FUNNEL_TAPER_EXPONENT = 1.08;

function funnelTForY(y: number) {
  return THREE.MathUtils.clamp((FUNNEL_TOP_Y - y) / (FUNNEL_TOP_Y - FUNNEL_BOTTOM_Y), 0, 1);
}

function funnelRadiusForY(y: number) {
  return THREE.MathUtils.lerp(
    FUNNEL_TOP_RADIUS,
    FUNNEL_BOTTOM_RADIUS,
    Math.pow(funnelTForY(y), FUNNEL_TAPER_EXPONENT)
  );
}

const FUNNEL_CONTROL_PLANES: FunnelControlPlane[] = [
  { y: 10.65, depth: 1.2, weight: 0.13 },
  { y: 9.15, depth: 1.14, weight: 0.12 },
  { y: 7.65, depth: 1.06, weight: 0.11 },
  { y: 6.2, depth: 0.98, weight: 0.1 },
  { y: 3.45, depth: 0.86, weight: 0.095 },
  { y: 1.25, depth: 0.76, weight: 0.09 },
  { y: -0.85, depth: 0.66, weight: 0.085 },
  { y: -3.15, depth: 0.56, weight: 0.08 },
  { y: -5.55, depth: 0.46, weight: 0.075 },
  { y: -7.35, depth: 0.38, weight: 0.065 },
  { y: -8.95, depth: 0.32, weight: 0.055 },
  { y: -10.4, depth: 0.26, weight: 0.05 },
].map((plane) => ({
  ...plane,
  radius: funnelRadiusForY(plane.y),
}));

const pointVertexShader = /* glsl */ `
uniform float uTime;
uniform float uElapsed;
uniform float uNoiseStrength;
uniform float uPixelRatio;
uniform float uPointSize;
uniform float uOpacity;
uniform float uDepthFade;
uniform float uResolveDuration;
uniform float uBreathStrength;
uniform float uBreathSpeed;
uniform float uBreathAmplitude;
uniform float uActivityStrength;
uniform float uReducedMotion;

attribute vec3 aOrb;
attribute vec3 aCore;
attribute vec3 aNormal;
attribute vec4 aMeta;
attribute vec4 aSeed;

varying float vAlpha;
varying float vEnergy;
varying float vRust;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float easeInOutCubic(float t) {
  t = sat(t);
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) * 0.5;
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 fieldNoise(vec3 p, float t, vec4 seed) {
  return vec3(
    sin(p.y * 1.73 + p.z * 0.61 + t * 0.73 + seed.x * 6.28318),
    sin(p.z * 1.81 + p.x * 0.67 + t * 0.69 + seed.y * 6.28318),
    sin(p.x * 1.67 + p.y * 0.83 + t * 0.71 + seed.z * 6.28318)
  ) * 0.333;
}

float cyclicDistance(float a, float b) {
  float d = abs(a - b);
  return min(d, 1.0 - d);
}

float arcSweep(float coord, float phase, float headWidth, float wakeWidth) {
  float head = 1.0 - smoothstep(0.0, headWidth, cyclicDistance(coord, phase));
  float wake = 1.0 - smoothstep(0.0, wakeWidth, cyclicDistance(coord, fract(phase - headWidth * 0.72)));
  return head * 0.82 + wake * 0.18;
}

float gaussianPulse(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float funnelBreathWave(float verticalT, float speed) {
  float waveSpeed = max(speed, 0.0) / 5.75;
  float head = fract(uTime * waveSpeed);
  float width = mix(0.24, 0.15, verticalT);
  float body = gaussianPulse(cyclicDistance(verticalT, head), width);
  float gather = gaussianPulse(cyclicDistance(verticalT, fract(head - 0.11)), width * 1.34) * 0.36;
  float release = gaussianPulse(cyclicDistance(verticalT, fract(head + 0.19)), width * 1.72) * 0.18;
  float undertone = 0.045 + 0.035 * smoother(0.5 + 0.5 * sin(uTime * (0.12 + speed * 0.14) + verticalT * 5.4));
  return smoother(sat(body + gather + release + undertone));
}

float funnelTForY(float y) {
  return clamp((10.65 - y) / 21.05, 0.0, 1.0);
}

float funnelRadiusProfile(float y) {
  return mix(6.8, 0.78, pow(funnelTForY(y), 1.08));
}

float layerBand(float y, float ringY, float width) {
  return 1.0 - smoothstep(0.0, width, abs(y - ringY));
}

float ringBand(float y, float r, float ringY, float ringRadius) {
  float taper = funnelTForY(ringY);
  float yBand = 1.0 - smoothstep(0.0, mix(0.68, 0.34, taper), abs(y - ringY));
  float rBand = 1.0 - smoothstep(0.0, mix(1.08, 0.34, taper), abs(r - ringRadius));
  return yBand * rBand;
}

float ringSweep(float y, float r, float theta, float ringY, float ringRadius, float phaseSeed) {
  float band = ringBand(y, r, ringY, ringRadius);
  float thetaT = fract(theta / 6.28318 + 1.0);
  float phase = fract(uTime * (0.028 + phaseSeed * 0.0035) + phaseSeed);
  float taper = funnelTForY(ringY);
  float primary = arcSweep(thetaT, phase, mix(0.074, 0.038, taper), mix(0.22, 0.105, taper));
  float secondary = arcSweep(thetaT, fract(phase + 0.36 + phaseSeed * 0.06), mix(0.06, 0.032, taper), mix(0.17, 0.088, taper)) * 0.58;
  float tertiary = arcSweep(thetaT, fract(phase + 0.71 - phaseSeed * 0.04), mix(0.052, 0.03, taper), mix(0.145, 0.078, taper)) * 0.38;
  return band * sat(primary + secondary + tertiary);
}

float blockedGate(float phaseSeed) {
  float gate = cyclicDistance(fract(uTime * 0.018 + phaseSeed * 1.73), 0.58);
  return 1.0 - smoothstep(0.0, 0.04, gate);
}

float nearestRingRadius(float y) {
  return funnelRadiusProfile(y);
}

void main() {
  float role = aMeta.x;
  float delay = aMeta.y;
  float pathPhase = aMeta.z;
  float sizeSeed = aMeta.w;
  float shellRole = 1.0 - step(1.5, role);
  float surfaceRole = step(0.5, role) * (1.0 - step(1.5, role));
  float coreRole = step(1.5, role);

  float resolveWindow = max(uResolveDuration, 0.2);
  float resolve = uReducedMotion > 0.5
    ? 1.0
    : smoother((uElapsed - delay * 1.05) / resolveWindow);
  float steady = smoother((resolve - 0.62) / 0.38);

  vec3 normal = normalize(aNormal + vec3(0.0001));
  float layerSwell = sin(uTime * uBreathSpeed + pathPhase * 6.28318 + aSeed.x * 0.9);
  float localSwell = sin(uTime * (uBreathSpeed * 0.63 + 0.08) + aSeed.y * 6.28318);
  float breath = (layerSwell * 0.74 + localSwell * 0.26) * uBreathStrength;
  vec3 orbPos = aOrb + normal * breath * (0.34 + surfaceRole * 0.42) * steady;
  vec3 corePos = aCore;
  vec3 target = mix(orbPos, corePos, coreRole);

  vec3 gatherPos = position + fieldNoise(position * 0.32, uTime, aSeed) * 0.24;
  vec3 pos = mix(gatherPos, target, smoother(resolve));

  float swellHit = surfaceRole * smoother(0.5 + 0.5 * layerSwell) * steady;

  float y = pos.y / 1.03;
  vec2 unscaledPlane = vec2(pos.x / 1.34, pos.z / 0.98);
  float r = length(unscaledPlane);
  float theta = atan(unscaledPlane.y, unscaledPlane.x);
  float taper = funnelTForY(y);
  float breathEnergy = funnelBreathWave(taper, uBreathSpeed) * uBreathAmplitude;
  float ringActivity = 0.0;
  float ringProximity = 0.0;
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 10.65, funnelRadiusProfile(10.65), 0.07));
  ringProximity = max(ringProximity, ringBand(y, r, 10.65, funnelRadiusProfile(10.65)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 9.15, funnelRadiusProfile(9.15), 0.18));
  ringProximity = max(ringProximity, ringBand(y, r, 9.15, funnelRadiusProfile(9.15)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 7.65, funnelRadiusProfile(7.65), 0.29));
  ringProximity = max(ringProximity, ringBand(y, r, 7.65, funnelRadiusProfile(7.65)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 6.2, funnelRadiusProfile(6.2), 0.41));
  ringProximity = max(ringProximity, ringBand(y, r, 6.2, funnelRadiusProfile(6.2)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 3.45, funnelRadiusProfile(3.45), 0.53));
  ringProximity = max(ringProximity, ringBand(y, r, 3.45, funnelRadiusProfile(3.45)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, 1.25, funnelRadiusProfile(1.25), 0.64));
  ringProximity = max(ringProximity, ringBand(y, r, 1.25, funnelRadiusProfile(1.25)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -0.85, funnelRadiusProfile(-0.85), 0.75));
  ringProximity = max(ringProximity, ringBand(y, r, -0.85, funnelRadiusProfile(-0.85)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -3.15, funnelRadiusProfile(-3.15), 0.86));
  ringProximity = max(ringProximity, ringBand(y, r, -3.15, funnelRadiusProfile(-3.15)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -5.55, funnelRadiusProfile(-5.55), 0.98));
  ringProximity = max(ringProximity, ringBand(y, r, -5.55, funnelRadiusProfile(-5.55)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -7.35, funnelRadiusProfile(-7.35), 1.09));
  ringProximity = max(ringProximity, ringBand(y, r, -7.35, funnelRadiusProfile(-7.35)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -8.95, funnelRadiusProfile(-8.95), 1.2));
  ringProximity = max(ringProximity, ringBand(y, r, -8.95, funnelRadiusProfile(-8.95)));
  ringActivity = max(ringActivity, ringSweep(y, r, theta, -10.4, funnelRadiusProfile(-10.4), 1.31));
  ringProximity = max(ringProximity, ringBand(y, r, -10.4, funnelRadiusProfile(-10.4)));

  float largeLayer =
    max(
      max(max(layerBand(y, 9.15, 0.52), layerBand(y, 7.65, 0.5)), max(layerBand(y, 6.2, 0.48), layerBand(y, 3.45, 0.44))),
      max(max(layerBand(y, 1.25, 0.4), layerBand(y, -0.85, 0.36)), max(layerBand(y, -3.15, 0.32), layerBand(y, -5.55, 0.28)))
    );
  float spokeCell = abs(fract(theta / 6.28318 * 128.0 + 0.5) - 0.5);
  float spokeLane = 1.0 - smoothstep(0.0, 0.082, spokeCell);
  float activity = 0.66 + uActivityStrength * 0.5;
  float radialFront = fract(uTime * (0.052 + uActivityStrength * 0.03) + pathPhase * 0.37);
  float radialT = clamp(r / max(nearestRingRadius(y), 0.1), 0.0, 1.24);
  float spokeHead = 1.0 - smoothstep(0.0, 0.082, abs(radialT - radialFront));
  float spokeWake = 1.0 - smoothstep(0.0, 0.22, abs(radialT - radialFront));
  float radialFrontTwo = fract(radialFront + 0.46 + pathPhase * 0.07);
  float spokeHeadTwo = 1.0 - smoothstep(0.0, 0.07, abs(radialT - radialFrontTwo));
  float spokeActivity = largeLayer * spokeLane * sat(spokeHead * 0.58 + spokeWake * 0.16 + spokeHeadTwo * 0.24 + breathEnergy * 0.42);

  float routeRole = 1.0 - smoothstep(0.0, 0.12, abs(role - 1.28));
  float routePhase = fract(uTime * (0.048 + uActivityStrength * 0.034) + aSeed.x * 0.2);
  float routeDelta = abs(pathPhase - routePhase);
  float routeHead = 1.0 - smoothstep(0.0, 0.064, routeDelta);
  float routeWake = 1.0 - smoothstep(0.0, 0.2, routeDelta);
  float routeActivity = routeRole * (routeHead * 0.5 + routeWake * 0.16 + breathEnergy * 0.36);

  float policyGate = blockedGate(0.5 + floor(y * 0.37) * 0.13);
  float rustMix = ringActivity * policyGate * 0.38;
  float breathCarrier = sat(0.38 + ringProximity * 0.54 + largeLayer * 0.18 + routeRole * 0.22);
  float materialBreath = breathEnergy * breathCarrier * mix(0.88, 1.26, taper);
  float localActivity = max(max(ringActivity * 0.72, spokeActivity), max(routeActivity, materialBreath)) * activity;
  float targetRingRadius = nearestRingRadius(y);
  float ringNear = 1.0 - smoothstep(0.0, 1.05, abs(r - targetRingRadius));
  float tighten = sat(ringActivity * 0.16 + materialBreath * 0.42 + spokeActivity * 0.08 + routeActivity * 0.08) * ringNear * steady * activity;
  float currentR = max(length(unscaledPlane), 0.0001);
  float tightenedR = mix(currentR, targetRingRadius, tighten);
  unscaledPlane *= tightenedR / currentR;
  pos.x = unscaledPlane.x * 1.34;
  pos.z = unscaledPlane.y * 0.98;
  vec3 localRadial = normalize(vec3(pos.x, 0.0, pos.z) + vec3(0.0001, 0.0, 0.0));
  pos += normal * (ringActivity * 0.024 + materialBreath * mix(0.05, 0.024, taper) + spokeActivity * 0.022 + routeActivity * 0.018) * steady * activity;
  pos += localRadial * materialBreath * mix(0.052, 0.018, taper) * steady;
  pos += localRadial * rustMix * 0.036 * steady;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = max(-mvPos.z, 0.001);
  float coreIgnition = coreRole * smoother(0.5 + 0.5 * sin(uTime * 1.2 + aSeed.w * 6.28318));
  float shellAlpha = (mix(0.2, 0.64, shellRole) + surfaceRole * 0.24) * (0.54 + 0.46 * steady);
  vEnergy = max(max(coreIgnition * 1.1, swellHit * 0.72), localActivity * 0.56);
  vAlpha = uOpacity * mix(shellAlpha, 1.0, sat(vEnergy));
  vAlpha *= 1.0 + localActivity * 0.24 + materialBreath * 0.18;
  vAlpha *= 1.0 - uDepthFade * smoothstep(18.0, 42.0, depth);
  vRust = rustMix * 0.72;

  float size = mix(0.5 + sizeSeed * 0.38 + surfaceRole * 0.22, 0.95, coreRole);
  size += swellHit * 0.24 + coreIgnition * 0.24 + localActivity * 0.16 + materialBreath * 0.38;
  gl_PointSize = uPointSize * uPixelRatio * size * (72.0 / depth);
  gl_PointSize = clamp(gl_PointSize, 0.32 * uPixelRatio, 5.2 * uPixelRatio);
}
`;

const pointFragmentShader = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uRust;
varying float vAlpha;
varying float vEnergy;
varying float vRust;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.1, d);
  float hot = smoothstep(0.24, 0.0, d) * vEnergy * 0.32;
  vec3 color = mix(uInk, uRust, clamp(vRust, 0.0, 1.0));
  gl_FragColor = vec4(color, soft * vAlpha + hot * vAlpha);
}
`;

const lineVertexShader = /* glsl */ `
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uLineOpacity;
uniform float uActivityStrength;
uniform float uBreathAmplitude;
uniform float uBreathSpeed;
uniform float uReducedMotion;

attribute vec4 aLineMeta;
varying float vAlpha;
varying float vRust;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cyclicDistance(float a, float b) {
  float d = abs(a - b);
  return min(d, 1.0 - d);
}

float arcSweep(float coord, float phase, float headWidth, float wakeWidth) {
  float head = 1.0 - smoothstep(0.0, headWidth, cyclicDistance(coord, phase));
  float wake = 1.0 - smoothstep(0.0, wakeWidth, cyclicDistance(coord, fract(phase - headWidth * 0.74)));
  return head * 0.82 + wake * 0.18;
}

float gaussianPulse(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float funnelBreathWave(float verticalT, float speed) {
  float waveSpeed = max(speed, 0.0) / 5.75;
  float head = fract(uTime * waveSpeed);
  float width = mix(0.24, 0.15, verticalT);
  float body = gaussianPulse(cyclicDistance(verticalT, head), width);
  float gather = gaussianPulse(cyclicDistance(verticalT, fract(head - 0.11)), width * 1.34) * 0.36;
  float release = gaussianPulse(cyclicDistance(verticalT, fract(head + 0.19)), width * 1.72) * 0.18;
  float undertone = 0.045 + 0.035 * smoother(0.5 + 0.5 * sin(uTime * (0.12 + speed * 0.14) + verticalT * 5.4));
  return smoother(sat(body + gather + release + undertone));
}

float pathFront(float coord, float phase, float headWidth, float wakeWidth) {
  float delta = abs(coord - phase);
  float head = 1.0 - smoothstep(0.0, headWidth, delta);
  float wake = 1.0 - smoothstep(0.0, wakeWidth, abs(coord - max(phase - headWidth * 0.76, -1.0)));
  return head * 0.82 + wake * 0.18;
}

float funnelTForY(float y) {
  return clamp((10.65 - y) / 21.05, 0.0, 1.0);
}

float funnelRadiusProfile(float y) {
  return mix(6.8, 0.78, pow(funnelTForY(y), 1.08));
}

float nearestRingRadius(float y) {
  return funnelRadiusProfile(y);
}

void main() {
  float lane = aLineMeta.x;
  float path = aLineMeta.y;
  float laneDelay = aLineMeta.z;
  float layer = aLineMeta.w;
  float resolve = uReducedMotion > 0.5 ? 1.0 : smoother(uElapsed / max(uResolveDuration, 0.2));
  float steady = smoother((resolve - 0.46) / 0.54);
  float swell = smoother(0.5 + 0.5 * sin(uTime * 0.42 + layer * 1.7 + lane * 0.09));
  float carrier = 0.2 + 0.12 * swell;
  float layerWeight = mix(1.0, 0.78, step(0.5, layer));
  layerWeight = mix(layerWeight, 0.62, step(1.5, layer));
  layerWeight = mix(layerWeight, 0.46, step(2.5, layer));
  vAlpha = uLineOpacity * steady * layerWeight * carrier;
  vec3 pos = position;
  float ringLine = 1.0 - step(0.5, layer);
  float routedLine = step(0.5, layer) * (1.0 - step(1.5, layer));
  float spokeLine = step(1.5, layer) * (1.0 - step(2.5, layer));
  float spineLine = step(2.5, layer);
  float y = pos.y / 1.03;
  float r = length(vec2(pos.x / 1.34, pos.z / 0.98));
  float taper = funnelTForY(y);

  float activity = 0.66 + uActivityStrength * 0.5;
  float breathEnergy = funnelBreathWave(taper, uBreathSpeed) * uBreathAmplitude;
  float ringPulse = ringLine * breathEnergy;
  float routePulse = routedLine * breathEnergy * 0.32;
  float ringPhase = fract(uTime * (0.03 + laneDelay * 0.004) + laneDelay);
  float ringSweepA = arcSweep(path, ringPhase, mix(0.072, 0.038, taper), mix(0.21, 0.105, taper));
  float ringSweepB = arcSweep(path, fract(ringPhase + 0.35 + laneDelay * 0.05), mix(0.058, 0.032, taper), mix(0.16, 0.088, taper)) * 0.6;
  float ringSweepC = arcSweep(path, fract(ringPhase + 0.72 - laneDelay * 0.04), mix(0.05, 0.03, taper), mix(0.14, 0.078, taper)) * 0.38;
  float ringSweep = ringLine * sat(ringSweepA + ringSweepB + ringSweepC);

  float routePhase = fract(uTime * (0.056 + uActivityStrength * 0.036) + laneDelay * 0.73);
  float routeTraceA = pathFront(path, routePhase, 0.05, 0.18);
  float routeTraceB = pathFront(path, fract(routePhase + 0.52 + laneDelay * 0.07), 0.042, 0.13) * 0.32;
  float routeTrace = routedLine * sat(routeTraceA + routeTraceB);

  float radialT = clamp(r / max(nearestRingRadius(y), 0.1), 0.0, 1.25);
  float spokeFront = fract(uTime * (0.058 + uActivityStrength * 0.032) + laneDelay * 0.41);
  float spokeHead = 1.0 - smoothstep(0.0, 0.088, abs(radialT - spokeFront));
  float spokeWake = 1.0 - smoothstep(0.0, 0.23, abs(radialT - spokeFront));
  float spokeFrontTwo = fract(spokeFront + 0.47 + laneDelay * 0.05);
  float spokeHeadTwo = 1.0 - smoothstep(0.0, 0.076, abs(radialT - spokeFrontTwo));
  float spokeWave = spokeLine * sat(spokeHead * 0.72 + spokeWake * 0.2 + spokeHeadTwo * 0.32);

  float policyGate = 1.0 - smoothstep(0.0, 0.034, cyclicDistance(fract(uTime * 0.013 + laneDelay * 1.83), 0.62));
  float blocked = ringSweep * policyGate;
  float approved = ringSweep * (1.0 - policyGate);
  float junction = 1.0 - smoothstep(0.035, 0.14, min(path, 1.0 - path));
  float rerouteGate = 1.0 - smoothstep(0.0, 0.045, cyclicDistance(fract(uTime * 0.018 + laneDelay * 1.17), 0.44));
  float rerouted = routeTrace * junction * rerouteGate;
  float spineTension = spineLine * (0.12 + 0.16 * smoother(0.5 + 0.5 * sin(uTime * 0.31 + path * 5.4)));

  vec3 localRadial = normalize(vec3(pos.x, 0.0, pos.z) + vec3(0.0001, 0.0, 0.0));
  pos += localRadial * (blocked * 0.048 - approved * 0.02 + ringPulse * mix(0.04, 0.02, taper) + spokeWave * 0.024 + routeTrace * 0.014 + routePulse * 0.012) * steady * activity;
  vAlpha += uLineOpacity * steady * activity * (approved * 1.06 + blocked * 0.98 + ringPulse * mix(1.45, 1.9, taper) + spokeWave * 0.76 + routeTrace * 1.16 + routePulse * 0.55 + rerouted * 0.42 + spineTension * 0.16);
  vRust = blocked * 0.68 + rerouted * 0.16;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const lineFragmentShader = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uRust;
varying float vAlpha;
varying float vRust;

void main() {
  gl_FragColor = vec4(mix(uInk, uRust, clamp(vRust, 0.0, 1.0)), vAlpha);
}
`;

function makeRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomUnit(rng: () => number) {
  const z = rng() * 2 - 1;
  const a = rng() * Math.PI * 2;
  const r = Math.sqrt(Math.max(0, 1 - z * z));
  return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, z);
}

function flowerRingPoint(radius: number, y: number, theta: number, wobble = 0) {
  const r = radius + wobble;
  return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r);
}

function futureFlowerPoint(radius: number, y: number, theta: number, wobble = 0) {
  const p = flowerRingPoint(radius, y, theta, wobble);
  p.x *= FUNNEL_X_SCALE;
  p.z *= FUNNEL_Z_SCALE;
  p.y *= FUNNEL_Y_SCALE;
  return p;
}

function pickWeightedPlane(rng: () => number, planes = FUNNEL_CONTROL_PLANES) {
  const total = planes.reduce((sum, plane) => sum + plane.weight, 0);
  let cursor = rng() * total;
  for (const plane of planes) {
    cursor -= plane.weight;
    if (cursor <= 0) return plane;
  }
  return planes[planes.length - 1];
}

function futureFlowerCagePoint(t: number, thetaBase: number, phase = 0) {
  const y = THREE.MathUtils.lerp(7.65, -7.15, t);
  const waist = Math.sin(t * Math.PI);
  const radius = 1.58 + 3.95 * waist + Math.sin(t * Math.PI * 3.0 + phase) * 0.18;
  const theta = thetaBase + (t - 0.5) * 0.74 + Math.sin(t * Math.PI * 2.0 + phase) * 0.12;
  return futureFlowerPoint(radius, y, theta);
}

function futureFlowerHourglassPoint(top: boolean, t: number, thetaBase: number, phase = 0) {
  const eased = THREE.MathUtils.smoothstep(t, 0, 1);
  const y = top
    ? THREE.MathUtils.lerp(10.05, 6.35, eased)
    : THREE.MathUtils.lerp(-3.45, -10.1, eased);
  const radius = top
    ? THREE.MathUtils.lerp(1.42, 4.55, eased)
    : THREE.MathUtils.lerp(4.15, 0.82, eased);
  const theta = thetaBase + eased * (top ? 0.92 : -1.18) + Math.sin(t * Math.PI * 2.0 + phase) * 0.12;
  const shoulder = Math.sin(t * Math.PI) * (top ? 0.18 : 0.28);
  return futureFlowerPoint(radius + shoulder, y, theta);
}

function sampleFutureFlowerStructure(rng: () => number) {
  const roll = rng();
  let target = new THREE.Vector3();
  let role = 1;
  let phase = rng();

  if (roll < 0.52) {
    const saucer = pickWeightedPlane(rng);
    const taper = funnelTForY(saucer.y);
    const radialSpoke = rng() < 0.78;
    const spoke = Math.floor(rng() * 256);
    const theta = radialSpoke
      ? (spoke / 256) * Math.PI * 2 + (rng() - 0.5) * 0.008
      : rng() * Math.PI * 2;
    const rimBias = rng() < THREE.MathUtils.lerp(0.62, 0.88, taper);
    const innerVoid = rng() < 0.04
      ? THREE.MathUtils.lerp(0.08, 0.22, taper) + rng() * 0.08
      : THREE.MathUtils.lerp(0.22, 0.42, taper) + rng() * 0.08;
    const u = rimBias
      ? THREE.MathUtils.lerp(0.58, 0.82, taper) + rng() * THREE.MathUtils.lerp(0.56, 0.21, taper)
      : innerVoid + Math.pow(rng(), THREE.MathUtils.lerp(0.46, 0.82, taper)) * (THREE.MathUtils.lerp(1.02, 0.91, taper) - innerVoid);
    const radius = saucer.radius * u;
    const lip = Math.pow(Math.min(u, 1.08), 2.0);
    const sheet = rng() < 0.52 ? -1 : 1;
    const y =
      saucer.y +
      sheet * saucer.depth * THREE.MathUtils.lerp(0.24 + 0.68 * lip, 0.1 + 0.3 * lip, taper) +
      Math.sin(theta * 3.0 + saucer.y) * THREE.MathUtils.lerp(0.065, 0.02, taper);
    target = flowerRingPoint(
      radius,
      y,
      theta,
      (rng() - 0.5) * THREE.MathUtils.lerp(radialSpoke ? 0.075 : 0.15, radialSpoke ? 0.026 : 0.05, taper)
    );
    phase = u;
  } else if (roll < 0.6) {
    role = 1.28;
    const route = rng() < 0.5
      ? {
          fromY: FUNNEL_CONTROL_PLANES[0].y,
          fromR: FUNNEL_CONTROL_PLANES[0].radius,
          toY: FUNNEL_CONTROL_PLANES[3].y,
          toR: FUNNEL_CONTROL_PLANES[3].radius,
        }
      : {
          fromY: FUNNEL_CONTROL_PLANES[7].y,
          fromR: FUNNEL_CONTROL_PLANES[7].radius * 0.84,
          toY: FUNNEL_CONTROL_PLANES[11].y,
          toR: FUNNEL_CONTROL_PLANES[11].radius,
        };
    const t = rng();
    const eased = THREE.MathUtils.smoothstep(t, 0, 1);
    const y = THREE.MathUtils.lerp(route.fromY, route.toY, eased);
    const radius =
      THREE.MathUtils.lerp(route.fromR, route.toR, eased) +
      Math.sin(t * Math.PI) * 0.24;
    const theta =
      rng() * Math.PI * 2 +
      eased * (route.fromY > 0 ? 1.25 : -1.45) +
      Math.sin(t * Math.PI * 2.0 + rng() * Math.PI * 2) * 0.18;
    target = flowerRingPoint(radius, y, theta, (rng() - 0.5) * 0.035);
    phase = t;
  } else if (roll < 0.72) {
    role = 1.28;
    const routes = [
      { from: 0, to: 2 },
      { from: 2, to: 4 },
      { from: 4, to: 6 },
      { from: 6, to: 8 },
      { from: 8, to: 11 },
    ];
    const routeIndexes = routes[Math.floor(rng() * routes.length)];
    const from = FUNNEL_CONTROL_PLANES[routeIndexes.from];
    const to = FUNNEL_CONTROL_PLANES[routeIndexes.to];
    const t = rng();
    const eased = THREE.MathUtils.smoothstep(t, 0, 1);
    const y = THREE.MathUtils.lerp(from.y, to.y, eased);
    const routeTaper = funnelTForY(y);
    const radius =
      THREE.MathUtils.lerp(from.radius * 0.88, to.radius * 0.9, eased) +
      Math.sin(t * Math.PI) * (THREE.MathUtils.lerp(0.28, 0.1, routeTaper) + rng() * THREE.MathUtils.lerp(0.36, 0.12, routeTaper));
    const lane = Math.floor(rng() * 64);
    const sweep = (lane % 2 === 0 ? 1 : -1) * (0.54 + rng() * 0.46);
    const theta =
      (lane / 64) * Math.PI * 2 +
      sweep * eased +
      Math.sin(t * Math.PI * 2.0 + lane * 0.37) * 0.11;
    target = flowerRingPoint(radius, y, theta, (rng() - 0.5) * 0.035);
    phase = t;
  } else if (roll < 0.996) {
    const ring = pickWeightedPlane(rng);
    const taper = funnelTForY(ring.y);
    const spokeAligned = rng() < THREE.MathUtils.lerp(0.72, 0.9, taper);
    const spoke = Math.floor(rng() * 256);
    const theta = spokeAligned
      ? (spoke / 256) * Math.PI * 2 + (rng() - 0.5) * 0.012
      : rng() * Math.PI * 2;
    const ringRadius = ring.radius * (0.99 + (rng() - 0.5) * THREE.MathUtils.lerp(0.14, 0.045, taper));
    target = flowerRingPoint(
      ringRadius,
      ring.y + (rng() - 0.5) * ring.depth * THREE.MathUtils.lerp(0.34, 0.12, taper),
      theta,
      (rng() - 0.5) * THREE.MathUtils.lerp(0.08, 0.024, taper)
    );
    phase = theta / (Math.PI * 2);
  } else if (roll < 0.998) {
    const t = rng();
    const y = THREE.MathUtils.lerp(FUNNEL_CONTROL_PLANES[11].y + 0.8, FUNNEL_CONTROL_PLANES[0].y - 0.75, t);
    const radius = 0.18 + Math.pow(rng(), 2.6) * 0.06;
    const theta = rng() * Math.PI * 2 + t * 0.55;
    target = flowerRingPoint(radius, y, theta, 0);
    role = 1;
    phase = t;
  } else {
    const t = rng();
    const y = THREE.MathUtils.lerp(FUNNEL_CONTROL_PLANES[10].y, FUNNEL_CONTROL_PLANES[2].y, t);
    const radius = 0.62 + Math.sin(t * Math.PI * 6.0) * 0.3 + rng() * 0.18;
    const theta = rng() * Math.PI * 2;
    target = flowerRingPoint(Math.max(0.08, radius), y, theta, 0);
    role = 1;
    phase = t;
  }

  target.x *= FUNNEL_X_SCALE;
  target.z *= FUNNEL_Z_SCALE;
  target.y *= FUNNEL_Y_SCALE;

  const normal = target.clone().normalize();
  return { target, normal, role, phase };
}

export function createPlasmaWebSurfaceSamples(
  count: number,
  input: Partial<PlasmaWebTargetOptions> = {}
): PlasmaWebSurfaceSample[] {
  const options = { ...DEFAULT_TARGETS, ...input };
  const rng = makeRng(options.seed);
  const samples: PlasmaWebSurfaceSample[] = [];
  for (let i = 0; i < count; i++) {
    const normal = randomUnit(rng);
    const radius = options.radius + (rng() - 0.5) * options.shellDepth;
    samples.push({
      position: normal.clone().multiplyScalar(radius),
      normal,
      strandId: -1,
      strandPhase: rng(),
      weight: 0.35 + rng() * 0.55,
    });
  }
  return samples;
}

export function createPlasmaWebTargetsTexture(
  size: number,
  input: Partial<PlasmaWebTargetOptions> = {}
) {
  const samples = createPlasmaWebSurfaceSamples(size * size, input);
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < samples.length; i++) {
    const { position, weight } = samples[i];
    data[i * 4 + 0] = position.x;
    data[i * 4 + 1] = position.y;
    data[i * 4 + 2] = position.z;
    data[i * 4 + 3] = weight;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  return texture;
}

export function applyRunlayerPlasmaWebPalette(
  renderer: THREE.WebGLRenderer,
  target: HTMLElement,
  palette: PlasmaWebPalette = RUNLAYER_PLASMA_WEB_PALETTE
) {
  renderer.setClearColor(palette.background);
  target.style.background = palette.background;
}

export class PlasmaWebOrb {
  readonly group = new THREE.Group();
  readonly points: THREE.Points;
  readonly strands: THREE.LineSegments;

  private options: PlasmaWebOrbOptions = PLASMA_WEB_DEFAULTS;
  private geometry = new THREE.BufferGeometry();
  private lineGeometry = new THREE.BufferGeometry();
  private material: THREE.ShaderMaterial;
  private lineMaterial: THREE.ShaderMaterial;
  private ink = new THREE.Color();
  private rust = new THREE.Color();
  private futureFlowerTargets?: Float32Array;
  private startTime = 0;
  private wasActive = false;
  private reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  constructor(input: Partial<PlasmaWebOrbOptions> = {}) {
    this.options = this.mergeOptions(input);
    this.ink.set(this.options.palette.ink);
    this.rust.set(this.options.palette.rust);
    this.material = new THREE.ShaderMaterial({
      vertexShader: pointVertexShader,
      fragmentShader: pointFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uElapsed: { value: 0 },
        uNoiseStrength: { value: this.reducedMotion ? 0.012 : this.options.motion.surfaceJitter },
        uPixelRatio: { value: typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio, 2) },
        uPointSize: { value: this.options.pointSize },
        uOpacity: { value: this.options.pointOpacity },
        uDepthFade: { value: 0.18 },
        uResolveDuration: { value: 3.2 },
        uBreathStrength: { value: this.options.motion.breathStrength },
        uBreathSpeed: { value: this.options.motion.breathSpeed },
        uBreathAmplitude: { value: this.options.motion.breathAmplitude },
        uActivityStrength: { value: this.options.motion.connectionPulse },
        uReducedMotion: { value: this.reducedMotion ? 1 : 0 },
        uInk: { value: this.ink },
        uRust: { value: this.rust },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
    });
    this.lineMaterial = new THREE.ShaderMaterial({
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uElapsed: { value: 0 },
        uResolveDuration: { value: 3.2 },
        uLineOpacity: { value: this.options.lineOpacity },
        uActivityStrength: { value: this.options.motion.connectionPulse },
        uBreathAmplitude: { value: this.options.motion.breathAmplitude },
        uBreathSpeed: { value: this.options.motion.breathSpeed },
        uReducedMotion: { value: this.reducedMotion ? 1 : 0 },
        uInk: { value: this.ink },
        uRust: { value: this.rust },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
    });
    this.points = new THREE.Points(this.geometry, this.material);
    this.strands = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
    this.points.frustumCulled = false;
    this.strands.frustumCulled = false;
    this.strands.visible = false;
    this.strands.renderOrder = 1;
    this.points.renderOrder = 1;
    this.group.add(this.points);
    this.rebuild(input);
  }

  rebuild(input: Partial<PlasmaWebOrbOptions> = {}) {
    this.options = this.mergeOptions(input);
    this.writeGeometry();
    this.applyFutureFlowerTargets();
    this.setPalette(this.options.palette);
    this.setVisuals(this.options);
    this.setMotion(this.options.motion);
  }

  setFutureFlowerTargets(targets: Float32Array) {
    this.futureFlowerTargets = targets;
    this.strands.visible = false;
    this.applyFutureFlowerTargets();
  }

  setActive(active: boolean, time: number) {
    if (active && !this.wasActive) this.startTime = time;
    this.wasActive = active;
  }

  setMotion(knobs: Partial<PlasmaWebMotionKnobs>) {
    this.options.motion = { ...this.options.motion, ...knobs };
    this.material.uniforms.uBreathStrength.value = this.reducedMotion
      ? Math.min(this.options.motion.breathStrength, 0.035)
      : this.options.motion.breathStrength;
    this.material.uniforms.uBreathSpeed.value = this.options.motion.breathSpeed;
    this.lineMaterial.uniforms.uBreathSpeed.value = this.options.motion.breathSpeed;
    const breathAmplitude = this.reducedMotion
      ? Math.min(this.options.motion.breathAmplitude, 0.18)
      : this.options.motion.breathAmplitude;
    this.material.uniforms.uBreathAmplitude.value = breathAmplitude;
    this.lineMaterial.uniforms.uBreathAmplitude.value = breathAmplitude;
    this.material.uniforms.uNoiseStrength.value = this.reducedMotion
      ? 0.012
      : this.options.motion.surfaceJitter;
    this.material.uniforms.uActivityStrength.value = this.reducedMotion
      ? Math.min(this.options.motion.connectionPulse, 0.12)
      : this.options.motion.connectionPulse;
    this.lineMaterial.uniforms.uActivityStrength.value = this.options.motion.connectionPulse;
  }

  setPalette(palette: Partial<PlasmaWebPalette>) {
    this.options.palette = { ...this.options.palette, ...palette };
    this.ink.set(this.options.palette.ink);
    this.rust.set(this.options.palette.rust);
  }

  setVisuals(input: Partial<Pick<PlasmaWebOrbOptions, "pointSize" | "pointOpacity" | "lineOpacity">>) {
    this.options = { ...this.options, ...input };
    this.material.uniforms.uPointSize.value = this.options.pointSize;
    this.material.uniforms.uOpacity.value = this.options.pointOpacity;
    this.lineMaterial.uniforms.uLineOpacity.value = this.options.lineOpacity;
  }

  setResolveDuration(duration: number) {
    const value = Math.max(0.2, duration);
    this.material.uniforms.uResolveDuration.value = value;
    this.lineMaterial.uniforms.uResolveDuration.value = value;
  }

  setPixelRatio(pixelRatio: number) {
    const value = Math.min(pixelRatio, 2);
    this.material.uniforms.uPixelRatio.value = value;
  }

  update(time: number, dt = 0.016) {
    const elapsed = Math.max(0, time - this.startTime);
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uElapsed.value = elapsed;
    this.lineMaterial.uniforms.uTime.value = time;
    this.lineMaterial.uniforms.uElapsed.value = elapsed;
    if (!this.reducedMotion && this.options.motion.rotationSpeed > 0) {
      this.group.rotation.y += this.options.motion.rotationSpeed * dt;
      this.group.rotation.x = Math.sin(time * 0.07) * 0.025;
    } else {
      this.group.rotation.x = 0;
    }
  }

  dispose() {
    this.geometry.dispose();
    this.lineGeometry.dispose();
    this.material.dispose();
    this.lineMaterial.dispose();
  }

  private mergeOptions(input: Partial<PlasmaWebOrbOptions>) {
    return {
      ...PLASMA_WEB_DEFAULTS,
      ...this.options,
      ...input,
      palette: { ...PLASMA_WEB_DEFAULTS.palette, ...this.options?.palette, ...input.palette },
      motion: { ...PLASMA_WEB_DEFAULTS.motion, ...this.options?.motion, ...input.motion },
    };
  }

  private writeGeometry() {
    const options = { ...DEFAULT_TARGETS, ...this.options };
    const count = this.options.particleCount;
    const rng = makeRng(options.seed);
    const positions = new Float32Array(count * 3);
    const orbTargets = new Float32Array(count * 3);
    const coreTargets = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const meta = new Float32Array(count * 4);
    const seeds = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      const sample = sampleFutureFlowerStructure(rng);
      const { target, normal, role, phase } = sample;
      const haloRadius = 1.4 + Math.pow(rng(), 0.6) * 4.8;
      const source = randomUnit(rng)
        .multiplyScalar(haloRadius)
        .add(target.clone().multiplyScalar(role >= 2 ? 0.08 : 0.04));
      const delay = role >= 2 ? rng() * 0.2 : phase * 0.42 + rng() * 0.18;

      positions.set(source.toArray(), i * 3);
      orbTargets.set(target.toArray(), i * 3);
      coreTargets.set(target.toArray(), i * 3);
      normals.set(normal.toArray(), i * 3);
      meta.set([role, delay, phase, rng()], i * 4);
      seeds.set([rng(), rng(), rng(), rng()], i * 4);
    }

    this.geometry.dispose();
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aOrb", new THREE.BufferAttribute(orbTargets, 3));
    this.geometry.setAttribute("aCore", new THREE.BufferAttribute(coreTargets, 3));
    this.geometry.setAttribute("aNormal", new THREE.BufferAttribute(normals, 3));
    this.geometry.setAttribute("aMeta", new THREE.BufferAttribute(meta, 4));
    this.geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
    this.geometry.computeBoundingSphere();
    this.points.geometry = this.geometry;
    this.writeFutureFlowerInfrastructureGeometry();
  }

  private writeFutureFlowerInfrastructureGeometry() {
    const positions: number[] = [];
    const meta: number[] = [];
    let lane = 0;

    const writePoint = (point: THREE.Vector3, pathT: number, laneDelay: number, layer: number) => {
      positions.push(point.x, point.y, point.z);
      meta.push(lane, pathT, laneDelay, layer);
    };

    const writeSegment = (
      a: THREE.Vector3,
      b: THREE.Vector3,
      t0: number,
      t1: number,
      laneDelay: number,
      layer: number
    ) => {
      writePoint(a, t0, laneDelay, layer);
      writePoint(b, t1, laneDelay, layer);
    };

    const addRing = (radius: number, y: number, segments: number, layer: number, phase = 0) => {
      const laneDelay = phase;
      for (let i = 0; i < segments; i++) {
        const t0 = i / segments;
        const t1 = (i + 1) / segments;
        const a = futureFlowerPoint(radius, y, t0 * Math.PI * 2);
        const b = futureFlowerPoint(radius, y, t1 * Math.PI * 2);
        writeSegment(a, b, t0, t1, laneDelay, layer);
      }
      lane++;
    };

    const addSpokes = (
      radius: number,
      y: number,
      count: number,
      innerRatio: number,
      outerRatio: number,
      layer: number,
      phase = 0
    ) => {
      const laneDelay = phase;
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        const t0 = i / count;
        const a = futureFlowerPoint(radius * innerRatio, y, theta);
        const b = futureFlowerPoint(radius * outerRatio, y, theta);
        writeSegment(a, b, t0, t0, laneDelay, layer);
      }
      lane++;
    };

    FUNNEL_CONTROL_PLANES.forEach((ring, index) => {
      const primarySegments = ring.radius > 4.5 ? 192 : 160;
      const taper = funnelTForY(ring.y);
      const upperOffset = THREE.MathUtils.lerp(0.16, 0.06, taper);
      const lowerOffset = THREE.MathUtils.lerp(0.17, 0.065, taper);
      addRing(ring.radius, ring.y, primarySegments, 0, index * 0.073);
      addRing(ring.radius * THREE.MathUtils.lerp(0.965, 0.982, taper), ring.y + ring.depth * upperOffset, primarySegments, 0, index * 0.073 + 0.21);
      addRing(ring.radius * THREE.MathUtils.lerp(1.018, 1.006, taper), ring.y - ring.depth * lowerOffset, primarySegments, 0, index * 0.073 + 0.37);
      addRing(ring.radius * THREE.MathUtils.lerp(0.988, 0.994, taper), ring.y + ring.depth * upperOffset * 0.42, Math.max(128, primarySegments - 32), 0, index * 0.073 + 0.51);
      addRing(ring.radius * THREE.MathUtils.lerp(1.006, 1.002, taper), ring.y - ring.depth * lowerOffset * 0.44, Math.max(128, primarySegments - 32), 0, index * 0.073 + 0.64);

      if (index % 2 === 0 || ring.radius > 5.5) {
        addRing(ring.radius * THREE.MathUtils.lerp(0.72, 0.62, taper), ring.y + ring.depth * upperOffset * 0.32, 160, 0, 0.43 + index * 0.059);
      }

      const spokeCount = ring.radius > 5 ? 104 : 72;
      addSpokes(ring.radius, ring.y, spokeCount, 0.18, 1.02, 2, 0.19 + index * 0.041);
    });

    const routedPairs = [
      { from: 0, to: 2, copies: 7 },
      { from: 2, to: 4, copies: 8 },
      { from: 4, to: 6, copies: 8 },
      { from: 6, to: 8, copies: 7 },
      { from: 8, to: 11, copies: 6 },
    ];

    routedPairs.forEach((route, routeIndex) => {
      const from = FUNNEL_CONTROL_PLANES[route.from];
      const to = FUNNEL_CONTROL_PLANES[route.to];
      for (let copy = 0; copy < route.copies; copy++) {
        const theta0 = (copy / route.copies) * Math.PI * 2 + routeIndex * 0.18;
        const thetaSweep = (copy % 2 === 0 ? 1 : -1) * (0.5 + routeIndex * 0.095);
        const laneDelay = routeIndex * 0.22 + copy / route.copies;
        const steps = 56;
        for (let i = 0; i < steps; i++) {
          const t0 = i / steps;
          const t1 = (i + 1) / steps;
          const pointAt = (t: number) => {
            const eased = THREE.MathUtils.smoothstep(t, 0, 1);
            const y = THREE.MathUtils.lerp(from.y, to.y, eased);
            const routeTaper = funnelTForY(y);
            const radius =
              THREE.MathUtils.lerp(from.radius * 0.88, to.radius * 0.9, eased) +
              Math.sin(t * Math.PI) * THREE.MathUtils.lerp(0.42, 0.13, routeTaper);
            const theta = theta0 + thetaSweep * eased + Math.sin(t * Math.PI * 2.0 + copy) * 0.045;
            return futureFlowerPoint(radius, y, theta);
          };
          writeSegment(pointAt(t0), pointAt(t1), t0, t1, laneDelay, 1);
        }
        lane++;
      }
    });

    const spineSegments = 28;
    const laneDelay = 0.23;
    for (let i = 0; i < spineSegments; i++) {
      const t0 = i / spineSegments;
      const t1 = (i + 1) / spineSegments;
      const p0 = futureFlowerPoint(0.045, THREE.MathUtils.lerp(-9.75, 9.9, t0), t0 * 0.55);
      const p1 = futureFlowerPoint(0.045, THREE.MathUtils.lerp(-9.75, 9.9, t1), t1 * 0.55);
      writeSegment(p0, p1, t0, t1, laneDelay, 3);
    }
    lane++;

    this.lineGeometry.dispose();
    this.lineGeometry = new THREE.BufferGeometry();
    this.lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    this.lineGeometry.setAttribute("aLineMeta", new THREE.Float32BufferAttribute(meta, 4));
    this.lineGeometry.computeBoundingSphere();
    this.strands.geometry = this.lineGeometry;
  }

  private applyFutureFlowerTargets() {
    if (!this.futureFlowerTargets?.length) return;
    const targetCount = Math.floor(this.futureFlowerTargets.length / 3);
    const orbAttr = this.geometry.getAttribute("aOrb") as THREE.BufferAttribute | undefined;
    const coreAttr = this.geometry.getAttribute("aCore") as THREE.BufferAttribute | undefined;
    const normalAttr = this.geometry.getAttribute("aNormal") as THREE.BufferAttribute | undefined;
    const metaAttr = this.geometry.getAttribute("aMeta") as THREE.BufferAttribute | undefined;
    if (!orbAttr || !coreAttr || !normalAttr || !metaAttr || targetCount < 1) return;

    const orb = orbAttr.array as Float32Array;
    const core = coreAttr.array as Float32Array;
    const normals = normalAttr.array as Float32Array;
    const meta = metaAttr.array as Float32Array;
    const particleCount = orbAttr.count;
    const stride = 15485863;
    const shapeScale = 1.26;

    for (let i = 0; i < particleCount; i++) {
      const targetIndex = (i * stride) % targetCount;
      const src = targetIndex * 3;
      const dst = i * 3;
      const x = this.futureFlowerTargets[src] * shapeScale;
      const y = this.futureFlowerTargets[src + 1] * shapeScale;
      const z = this.futureFlowerTargets[src + 2] * shapeScale;
      orb[dst] = x;
      orb[dst + 1] = y;
      orb[dst + 2] = z;
      core[dst] = x;
      core[dst + 1] = y;
      core[dst + 2] = z;

      const len = Math.hypot(x, y, z) || 1;
      normals[dst] = x / len;
      normals[dst + 1] = y / len;
      normals[dst + 2] = z / len;
      meta[i * 4] = meta[i * 4] > 2.5 ? 2 : meta[i * 4];
    }

    orbAttr.needsUpdate = true;
    coreAttr.needsUpdate = true;
    normalAttr.needsUpdate = true;
    metaAttr.needsUpdate = true;
    this.geometry.computeBoundingSphere();
  }

}

export function createReducedMotionPlasmaWebOptions(
  input: Partial<PlasmaWebOrbOptions> = {}
): Partial<PlasmaWebOrbOptions> {
  return {
    ...input,
    particleCount: Math.min(input.particleCount ?? PLASMA_WEB_DEFAULTS.particleCount, 16000),
    motion: {
      ...PLASMA_WEB_DEFAULTS.motion,
      ...input.motion,
      rotationSpeed: 0,
      breathStrength: 0.035,
      breathAmplitude: 0.18,
      strandDrift: 0.02,
      surfaceJitter: 0.012,
      connectionPulse: 0,
    },
  };
}
