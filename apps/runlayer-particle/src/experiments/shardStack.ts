import * as THREE from "three";

const TAU = Math.PI * 2;

export type ShardStackPalette = {
  background: string;
  ink: string;
  activity: string;
  signal: string;
  rejected: string;
};

export type ShardStackMotion = {
  resolveDuration: number;
  traceDuration: number;
  rotationSpeed: number;
  activity: number;
  signalSpeed: number;
  policyFadeIn: number;
  policyFadeOut: number;
};

export type ShardStackVisuals = {
  scale: number;
  pointSize: number;
  pointOpacity: number;
  lineOpacity: number;
  signalOpacity: number;
};

export type ShardStackOptions = {
  particleCount: number;
  palette: ShardStackPalette;
  motion: ShardStackMotion;
  visuals: ShardStackVisuals;
  pixelRatio: number;
  reducedMotion: boolean;
  seed: number;
};

type StructureLine = {
  start: THREE.Vector3;
  end: THREE.Vector3;
  role: number;
  delay: number;
  alpha: number;
};

type StructurePoint = {
  target: THREE.Vector3;
  role: number;
  delay: number;
  size: number;
};

type StructureRouteKind = 0 | 1 | 2;

type StructureRouteSegment = {
  start: THREE.Vector3;
  end: THREE.Vector3;
  startT: number;
  endT: number;
};

type StructureRoute = {
  kind: StructureRouteKind;
  segments: StructureRouteSegment[];
  clipT: number;
  radius: number;
  strength: number;
};

export const RUNLAYER_SHARD_STACK_PALETTE: ShardStackPalette = {
  background: "#F5F5F4",
  ink: "#1C1917",
  activity: "#050504",
  signal: "#1C1917",
  rejected: "#A4513E",
};

export const SHARD_STACK_DEFAULTS: ShardStackOptions = {
  particleCount: 32000,
  palette: RUNLAYER_SHARD_STACK_PALETTE,
  motion: {
    resolveDuration: 3.35,
    traceDuration: 1.05,
    rotationSpeed: 0.028,
    activity: 0.13,
    signalSpeed: 0.31,
    policyFadeIn: 0.12,
    policyFadeOut: 0.18,
  },
  visuals: {
    scale: 1.07,
    pointSize: 0.62,
    pointOpacity: 0.58,
    lineOpacity: 0.6,
    signalOpacity: 0.34,
  },
  pixelRatio: 1,
  reducedMotion: false,
  seed: 1931,
};

const pointVertexShader = /* glsl */ `
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uActivity;
uniform float uSignalSpeed;
uniform float uPolicyFadeIn;
uniform float uPolicyFadeOut;
uniform float uPointSize;
uniform float uPixelRatio;
uniform float uScale;
uniform float uReducedMotion;

attribute vec3 aSource;
attribute vec3 aTarget;
attribute vec4 aMeta;
attribute vec4 aSeed;
attribute vec4 aRoute;
attribute vec2 aRouteControl;

varying float vAlpha;
varying float vEnergy;
varying float vActivationEnergy;
varying float vPolicyInfluence;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float hash11(float n) {
  return fract(sin(n * 37.719 + 3.117) * 43758.5453123);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float routePhase(float routeIndex) {
  float seed = hash11(routeIndex + 1.7);
  float speed = mix(0.13, 0.19, hash11(routeIndex + 6.3)) * max(uSignalSpeed, 0.01) / 0.18;
  return fract(uTime * speed + seed);
}

float routeEnvelope(float phase, float kind) {
  float rise = smoothstep(0.015, 0.08, phase);
  float fall = kind < 1.5
    ? 1.0 - smoothstep(0.58, 0.76, phase)
    : 1.0 - smoothstep(0.78, 0.94, phase);
  return rise * fall;
}

float routeHead(float phase, float kind, float clipT) {
  if (kind < 0.5) {
    return smoother((phase - 0.04) / 0.54);
  }
  if (kind < 1.5) {
    return min(clipT, smoother((phase - 0.04) / 0.36) * clipT);
  }
  float firstLeg = smoother((phase - 0.04) / 0.28) * clipT;
  float secondLeg = mix(clipT, 1.0, smoother((phase - 0.42) / 0.38));
  return phase < 0.38 ? firstLeg : secondLeg;
}

float routeActivationEnergy(vec4 route, vec2 control) {
  if (route.x < 0.0) return 0.0;

  float kind = route.w;
  float phase = routePhase(route.x);
  float ready = smoother((uElapsed - uResolveDuration * 0.48) / 0.9);
  float head = routeHead(phase, kind, control.x);
  float envelope = routeEnvelope(phase, kind) * ready;
  float radius = max(control.y, 0.001);
  float distanceField = exp(-0.5 * route.z * route.z / (radius * radius));
  float front = gaussian(route.y - head, 0.07);
  float body = smoothstep(head - 0.42, head - 0.1, route.y) * (1.0 - smoothstep(head + 0.03, head + 0.11, route.y));
  float trail = gaussian(route.y - (head - 0.3), 0.28);
  float blockedSettle = kind > 0.5 && kind < 1.5
    ? gaussian(route.y - control.x, 0.06) * smoothstep(0.28, 0.46, phase) * (1.0 - smoothstep(0.58, 0.74, phase)) * 0.42
    : 0.0;

  return sat(distanceField * envelope * (front * 1.25 + body * 0.82 + trail * 0.34 + blockedSettle) * 1.8);
}

float routePolicyInfluence(vec4 route, vec2 control) {
  if (route.x < 0.0 || route.w < 0.5) return 0.0;

  float kind = route.w;
  float phase = routePhase(route.x);
  float ready = smoother((uElapsed - uResolveDuration * 0.56) / 0.72);
  float clipT = control.x;
  float tubeRadius = max(control.y * 0.34, 0.58);
  float edgeTube = exp(-0.5 * route.z * route.z / (tubeRadius * tubeRadius));
  float eventField = gaussian(route.y - clipT, kind < 1.5 ? 0.078 : 0.105);
  float policyMoment = kind < 1.5 ? 0.43 : 0.49;
  float fadeIn = max(uPolicyFadeIn, 0.012);
  float fadeOut = max(uPolicyFadeOut, 0.012);
  float hold = kind < 1.5 ? 0.11 : 0.16;
  float temporalEnvelope =
    smoothstep(policyMoment - fadeIn, policyMoment, phase) *
    (1.0 - smoothstep(policyMoment + hold, policyMoment + hold + fadeOut, phase));
  float absorbedAfterglow = gaussian(
    phase - (policyMoment + hold + fadeOut * 0.48),
    max(fadeOut * 0.62, 0.045)
  ) * 0.34;
  float routeEnergy = routeEnvelope(phase, kind);

  return sat(edgeTube * eventField * ready * (temporalEnvelope + absorbedAfterglow) * routeEnergy * 2.35);
}

vec3 sharedActivityField(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.27 + p.z * 0.19 + t * 0.58),
    sin(p.z * 0.23 + p.x * 0.21 + t * 0.43),
    cos(p.x * 0.18 + p.y * 0.25 + t * 0.49)
  );
}

void main() {
  float role = aMeta.x;
  float delay = aMeta.y;
  float sizeSeed = aMeta.z;
  float sourceSpread = aMeta.w;

  float progress = uReducedMotion > 0.5
    ? 1.0
    : smoother((uElapsed - delay * 0.24) / max(uResolveDuration, 0.001));
  float settled = smoother((progress - 0.62) / 0.38);

  vec3 target = aTarget * uScale;
  vec3 source = aSource * uScale;
  vec3 dir = normalize(target - source + vec3(0.001, 0.003, 0.002));
  vec3 orth = normalize(cross(dir, vec3(0.0, 1.0, 0.31)));
  if (length(orth) < 0.01) orth = vec3(1.0, 0.0, 0.0);

  float overshoot = sin(progress * 3.14159265) * (1.0 - settled) * 0.11 * sourceSpread;
  vec3 pos = mix(source, target, progress) + dir * overshoot;

  vec3 alive = sharedActivityField(target, uTime + aSeed.x * 0.35) * uActivity * settled;
  float activationEnergy = routeActivationEnergy(aRoute, aRouteControl);
  float policyInfluence = routePolicyInfluence(aRoute, aRouteControl);
  float policyColorMix = smoothstep(0.0, 0.28, policyInfluence);
  pos += alive * (0.1 + min(role, 4.0) * 0.025) * (1.0 - activationEnergy * 0.78 - policyInfluence * 0.34);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = max(-mvPos.z, 0.001);
  float spine = 1.0 - step(0.5, role);
  float cluster = step(3.5, role);
  float roleBoost = mix(0.7, 1.18, spine) + cluster * 0.28;
  float signalBreath = cluster * smoothstep(0.15, 0.0, abs(fract(uTime * 0.16 + aSeed.w) - 0.5));

  vActivationEnergy = activationEnergy;
  vPolicyInfluence = policyInfluence;
  vEnergy = signalBreath + spine * 0.25 + activationEnergy * 0.82 + policyColorMix * 0.72;
  vAlpha = progress * (0.34 + roleBoost * 0.45 + signalBreath * 0.35 + activationEnergy * 0.36 + policyColorMix * 0.22);
  gl_PointSize = uPointSize * uPixelRatio * (0.58 + sizeSeed * 0.72 + cluster * 0.38 + vEnergy * 0.35) * (1.0 + activationEnergy * 0.24 + policyColorMix * 0.18) * (78.0 / depth);
  gl_PointSize = clamp(gl_PointSize, 0.3 * uPixelRatio, 6.6 * uPixelRatio);
}
`;

const pointFragmentShader = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uActiveInk;
uniform vec3 uRejectedInk;
uniform float uOpacity;
varying float vAlpha;
varying float vEnergy;
varying float vActivationEnergy;
varying float vPolicyInfluence;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.12, d);
  float pin = smoothstep(0.16, 0.0, d) * vEnergy * 0.38;
  vec3 color = mix(uInk, uActiveInk, vActivationEnergy * 0.58);
  float policyColorMix = smoothstep(0.0, 0.28, vPolicyInfluence);
  color = mix(color, uRejectedInk, policyColorMix);
  float alpha = (core + pin) * vAlpha * uOpacity * (1.0 + vActivationEnergy * 0.28 + policyColorMix * 0.18);
  gl_FragColor = vec4(color, alpha);
}
`;

const lineVertexShader = /* glsl */ `
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uTraceDuration;
uniform float uActivity;
uniform float uSignalSpeed;
uniform float uScale;
uniform float uReducedMotion;

attribute vec3 aSourceStart;
attribute vec3 aSourceEnd;
attribute vec3 aTargetStart;
attribute vec3 aTargetEnd;
attribute vec4 aMeta;
attribute vec4 aRoute;
attribute vec2 aRouteControl;
attribute float aEnd;

varying float vAlpha;
varying float vRole;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float hash11(float n) {
  return fract(sin(n * 37.719 + 3.117) * 43758.5453123);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float routePhase(float routeIndex) {
  float seed = hash11(routeIndex + 1.7);
  float speed = mix(0.13, 0.19, hash11(routeIndex + 6.3)) * max(uSignalSpeed, 0.01) / 0.18;
  return fract(uTime * speed + seed);
}

float routeEnvelope(float phase, float kind) {
  float rise = smoothstep(0.015, 0.08, phase);
  float fall = kind < 1.5
    ? 1.0 - smoothstep(0.58, 0.76, phase)
    : 1.0 - smoothstep(0.78, 0.94, phase);
  return rise * fall;
}

float routeHead(float phase, float kind, float clipT) {
  if (kind < 0.5) {
    return smoother((phase - 0.04) / 0.54);
  }
  if (kind < 1.5) {
    return min(clipT, smoother((phase - 0.04) / 0.36) * clipT);
  }
  float firstLeg = smoother((phase - 0.04) / 0.28) * clipT;
  float secondLeg = mix(clipT, 1.0, smoother((phase - 0.42) / 0.38));
  return phase < 0.38 ? firstLeg : secondLeg;
}

float routeActivationEnergy(vec4 route, vec2 control) {
  if (route.x < 0.0) return 0.0;

  float kind = route.w;
  float phase = routePhase(route.x);
  float ready = smoother((uElapsed - uResolveDuration * 0.48) / 0.9);
  float head = routeHead(phase, kind, control.x);
  float envelope = routeEnvelope(phase, kind) * ready;
  float radius = max(control.y, 0.001);
  float distanceField = exp(-0.5 * route.z * route.z / (radius * radius));
  float front = gaussian(route.y - head, 0.07);
  float body = smoothstep(head - 0.42, head - 0.1, route.y) * (1.0 - smoothstep(head + 0.03, head + 0.11, route.y));
  float trail = gaussian(route.y - (head - 0.3), 0.28);
  float blockedSettle = kind > 0.5 && kind < 1.5
    ? gaussian(route.y - control.x, 0.06) * smoothstep(0.28, 0.46, phase) * (1.0 - smoothstep(0.58, 0.74, phase)) * 0.42
    : 0.0;

  return sat(distanceField * envelope * (front * 1.25 + body * 0.82 + trail * 0.34 + blockedSettle) * 1.8);
}

vec3 sharedActivityField(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.27 + p.z * 0.19 + t * 0.58),
    sin(p.z * 0.23 + p.x * 0.21 + t * 0.43),
    cos(p.x * 0.18 + p.y * 0.25 + t * 0.49)
  );
}

void main() {
  float role = aMeta.x;
  float delay = aMeta.y;
  float baseAlpha = aMeta.z;
  float seed = aMeta.w;

  float assemble = uReducedMotion > 0.5
    ? 1.0
    : smoother((uElapsed - delay * 0.24) / max(uResolveDuration, 0.001));

  vec3 targetStart = aTargetStart * uScale;
  vec3 targetEnd = aTargetEnd * uScale;
  vec3 sourceStart = aSourceStart * uScale;
  vec3 sourceEnd = aSourceEnd * uScale;
  vec3 start = mix(sourceStart, targetStart, assemble);
  vec3 fullEnd = mix(sourceEnd, targetEnd, assemble);
  vec3 pos = mix(start, fullEnd, aEnd);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vRole = role;
  vAlpha = baseAlpha * assemble;
}
`;

const lineFragmentShader = /* glsl */ `
uniform vec3 uInk;
uniform float uOpacity;
varying float vAlpha;
varying float vRole;

void main() {
  float roleDim = vRole > 2.5 ? 0.58 : 1.0;
  gl_FragColor = vec4(uInk, vAlpha * uOpacity * roleDim);
}
`;

const signalVertexShader = /* glsl */ `
uniform float uTime;
uniform float uElapsed;
uniform float uResolveDuration;
uniform float uSignalSpeed;
uniform float uScale;
uniform float uReducedMotion;

attribute vec3 aPathStart;
attribute vec3 aPathEnd;
attribute vec4 aRoute;
attribute vec4 aSignalMeta;
attribute float aEnd;

varying float vAlpha;
varying float vTraceEnergy;
varying float vAuditEnergy;

float sat(float v) {
  return clamp(v, 0.0, 1.0);
}

float hash11(float n) {
  return fract(sin(n * 37.719 + 3.117) * 43758.5453123);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-0.5 * x * x);
}

float smoother(float t) {
  t = sat(t);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float routePhase(float routeIndex) {
  float seed = hash11(routeIndex + 1.7);
  float speed = mix(0.13, 0.19, hash11(routeIndex + 6.3)) * max(uSignalSpeed, 0.01) / 0.18;
  return fract(uTime * speed + seed);
}

float routeEnvelope(float phase, float kind) {
  float rise = smoothstep(0.015, 0.08, phase);
  float fall = kind < 1.5
    ? 1.0 - smoothstep(0.58, 0.76, phase)
    : 1.0 - smoothstep(0.78, 0.94, phase);
  return rise * fall;
}

float routeHead(float phase, float kind, float clipT) {
  if (kind < 0.5) {
    return smoother((phase - 0.04) / 0.54);
  }
  if (kind < 1.5) {
    return min(clipT, smoother((phase - 0.04) / 0.36) * clipT);
  }
  float firstLeg = smoother((phase - 0.04) / 0.28) * clipT;
  float secondLeg = mix(clipT, 1.0, smoother((phase - 0.42) / 0.38));
  return phase < 0.38 ? firstLeg : secondLeg;
}

vec3 sharedActivityField(vec3 p, float t) {
  return vec3(
    sin(p.y * 0.27 + p.z * 0.19 + t * 0.58),
    sin(p.z * 0.23 + p.x * 0.21 + t * 0.43),
    cos(p.x * 0.18 + p.y * 0.25 + t * 0.49)
  );
}

void main() {
  vec3 start = aPathStart * uScale;
  vec3 end = aPathEnd * uScale;
  float routeIndex = aRoute.x;
  float segmentStart = aRoute.y;
  float segmentEnd = aRoute.z;
  float kind = aRoute.w;
  float width = aSignalMeta.x;
  float strength = aSignalMeta.y;
  float clipT = aSignalMeta.z;
  float originalKind = aSignalMeta.w;
  float phase = routePhase(routeIndex);
  float ready = uReducedMotion > 0.5 ? 0.0 : smoother((uElapsed - uResolveDuration * 0.48) / 0.9);
  vec3 pos = mix(start, end, aEnd);
  float alpha = 0.0;
  float traceEnergy = 0.0;
  float auditEnergy = 0.0;

  if (kind > 2.5) {
    float tickMoment = originalKind < 1.5 ? 0.42 : 0.46;
    auditEnergy = gaussian(phase - tickMoment, 0.04) * ready;
    alpha = auditEnergy * strength * 1.35;
  } else {
    float head = routeHead(phase, kind, clipT);
    float tail = max(0.0, head - width);
    float visibleStart = max(segmentStart, tail);
    float visibleEnd = min(segmentEnd, head);
    float visible = step(visibleStart + 0.002, visibleEnd);
    float routeCoord = mix(visibleStart, visibleEnd, aEnd);
    float localT = sat((routeCoord - segmentStart) / max(segmentEnd - segmentStart, 0.001));
    pos = mix(start, end, localT);
    vec3 signalFlow = sharedActivityField(pos, uTime + routeIndex * 0.35);
    pos += signalFlow * 0.028 * ready;
    traceEnergy = gaussian(routeCoord - head, max(width * 0.28, 0.02));
    alpha = ready * routeEnvelope(phase, kind) * strength * visible * (1.25 + traceEnergy * 1.1);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vAlpha = alpha;
  vTraceEnergy = traceEnergy;
  vAuditEnergy = auditEnergy;
}
`;

const signalFragmentShader = /* glsl */ `
uniform vec3 uSignal;
uniform vec3 uActiveInk;
uniform vec3 uAuditInk;
uniform float uOpacity;
varying float vAlpha;
varying float vTraceEnergy;
varying float vAuditEnergy;

void main() {
  vec3 color = mix(uSignal, uActiveInk, vTraceEnergy * 0.34);
  color = mix(color, uAuditInk, vAuditEnergy);
  gl_FragColor = vec4(color, vAlpha * uOpacity);
}
`;

export class ShardStackArchitecture {
  readonly group = new THREE.Group();

  private readonly options: ShardStackOptions;
  private readonly pointGeometry = new THREE.BufferGeometry();
  private readonly lineGeometry = new THREE.BufferGeometry();
  private readonly signalGeometry = new THREE.BufferGeometry();
  private readonly pointMaterial: THREE.ShaderMaterial;
  private readonly lineMaterial: THREE.ShaderMaterial;
  private readonly signalMaterial: THREE.ShaderMaterial;
  private readonly points: THREE.Points;
  private readonly lines: THREE.LineSegments;
  private readonly signals: THREE.LineSegments;
  private startTime = 0;
  private lastUpdateTime = 0;
  private rotationOffset = 0;
  private active = false;

  constructor(input: Partial<ShardStackOptions> = {}) {
    this.options = mergeOptions(SHARD_STACK_DEFAULTS, input);
    const rng = createRng(this.options.seed);
    const structure = buildStructure(rng);

    populateLineGeometry(this.lineGeometry, structure.lines, structure.routes, rng);
    populatePointGeometry(this.pointGeometry, structure.points, structure.routes, this.options.particleCount, rng);
    populateSignalGeometry(this.signalGeometry, structure.routes, rng);

    const sharedUniforms = {
      uTime: { value: 0 },
      uElapsed: { value: 0 },
      uResolveDuration: { value: this.options.motion.resolveDuration },
      uActivity: { value: this.options.motion.activity },
      uSignalSpeed: { value: this.options.motion.signalSpeed },
      uPolicyFadeIn: { value: this.options.motion.policyFadeIn },
      uPolicyFadeOut: { value: this.options.motion.policyFadeOut },
      uScale: { value: this.options.visuals.scale },
      uReducedMotion: { value: this.options.reducedMotion ? 1 : 0 },
    };

    this.pointMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...sharedUniforms,
        uPointSize: { value: this.options.visuals.pointSize },
        uPixelRatio: { value: this.options.pixelRatio },
        uOpacity: { value: this.options.visuals.pointOpacity },
        uInk: { value: new THREE.Color(this.options.palette.ink) },
        uActiveInk: { value: new THREE.Color(this.options.palette.activity) },
        uRejectedInk: { value: new THREE.Color(this.options.palette.rejected) },
      },
      vertexShader: pointVertexShader,
      fragmentShader: pointFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.lineMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...sharedUniforms,
        uTraceDuration: { value: this.options.motion.traceDuration },
        uOpacity: { value: this.options.visuals.lineOpacity },
        uInk: { value: new THREE.Color(this.options.palette.ink) },
      },
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.signalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uElapsed: { value: 0 },
        uResolveDuration: { value: this.options.motion.resolveDuration },
        uSignalSpeed: { value: this.options.motion.signalSpeed },
        uScale: { value: this.options.visuals.scale },
        uReducedMotion: { value: this.options.reducedMotion ? 1 : 0 },
        uOpacity: { value: this.options.visuals.signalOpacity },
        uSignal: { value: new THREE.Color(this.options.palette.signal) },
        uActiveInk: { value: new THREE.Color(this.options.palette.activity) },
        uAuditInk: { value: new THREE.Color(this.options.palette.rejected) },
      },
      vertexShader: signalVertexShader,
      fragmentShader: signalFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.points = new THREE.Points(this.pointGeometry, this.pointMaterial);
    this.lines = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
    this.signals = new THREE.LineSegments(this.signalGeometry, this.signalMaterial);
    this.points.frustumCulled = false;
    this.lines.frustumCulled = false;
    this.signals.frustumCulled = false;
    this.signals.visible = false;
    this.lines.renderOrder = 2;
    this.points.renderOrder = 3;
    this.signals.renderOrder = 4;
    this.group.add(this.lines, this.points);
  }

  setActive(active: boolean, time: number): void {
    if (active && !this.active) {
      this.startTime = time;
      this.lastUpdateTime = time;
    }
    this.active = active;
    this.group.visible = active;
  }

  replay(time = 0): void {
    this.startTime = time;
    this.lastUpdateTime = time;
  }

  setPalette(palette: Partial<ShardStackPalette>): void {
    this.options.palette = { ...this.options.palette, ...palette };
    this.pointMaterial.uniforms.uInk.value.set(this.options.palette.ink);
    this.pointMaterial.uniforms.uActiveInk.value.set(this.options.palette.activity);
    this.pointMaterial.uniforms.uRejectedInk.value.set(this.options.palette.rejected);
    this.lineMaterial.uniforms.uInk.value.set(this.options.palette.ink);
    this.signalMaterial.uniforms.uSignal.value.set(this.options.palette.signal);
    this.signalMaterial.uniforms.uActiveInk.value.set(this.options.palette.activity);
    this.signalMaterial.uniforms.uAuditInk.value.set(this.options.palette.rejected);
  }

  setMotion(motion: Partial<ShardStackMotion>): void {
    this.options.motion = { ...this.options.motion, ...motion };
    this.pointMaterial.uniforms.uResolveDuration.value = this.options.motion.resolveDuration;
    this.pointMaterial.uniforms.uActivity.value = this.options.motion.activity;
    this.pointMaterial.uniforms.uSignalSpeed.value = this.options.motion.signalSpeed;
    this.pointMaterial.uniforms.uPolicyFadeIn.value = this.options.motion.policyFadeIn;
    this.pointMaterial.uniforms.uPolicyFadeOut.value = this.options.motion.policyFadeOut;
    this.lineMaterial.uniforms.uResolveDuration.value = this.options.motion.resolveDuration;
    this.lineMaterial.uniforms.uTraceDuration.value = this.options.motion.traceDuration;
    this.lineMaterial.uniforms.uActivity.value = this.options.motion.activity;
    this.lineMaterial.uniforms.uSignalSpeed.value = this.options.motion.signalSpeed;
    this.lineMaterial.uniforms.uPolicyFadeIn.value = this.options.motion.policyFadeIn;
    this.lineMaterial.uniforms.uPolicyFadeOut.value = this.options.motion.policyFadeOut;
    this.signalMaterial.uniforms.uResolveDuration.value = this.options.motion.resolveDuration;
    this.signalMaterial.uniforms.uSignalSpeed.value = this.options.motion.signalSpeed;
  }

  setVisuals(visuals: Partial<ShardStackVisuals>): void {
    this.options.visuals = { ...this.options.visuals, ...visuals };
    this.pointMaterial.uniforms.uPointSize.value = this.options.visuals.pointSize;
    this.pointMaterial.uniforms.uOpacity.value = this.options.visuals.pointOpacity;
    this.pointMaterial.uniforms.uScale.value = this.options.visuals.scale;
    this.lineMaterial.uniforms.uOpacity.value = this.options.visuals.lineOpacity;
    this.lineMaterial.uniforms.uScale.value = this.options.visuals.scale;
    this.signalMaterial.uniforms.uOpacity.value = 0;
    this.signalMaterial.uniforms.uScale.value = this.options.visuals.scale;
    this.signals.visible = false;
  }

  setPixelRatio(pixelRatio: number): void {
    this.pointMaterial.uniforms.uPixelRatio.value = pixelRatio;
  }

  update(time: number): void {
    if (!this.active) return;
    const elapsed = this.options.reducedMotion ? this.options.motion.resolveDuration : time - this.startTime;
    const deltaTime = this.options.reducedMotion ? 0 : Math.min(Math.max(time - this.lastUpdateTime, 0), 0.1);
    this.lastUpdateTime = time;
    this.pointMaterial.uniforms.uTime.value = time;
    this.pointMaterial.uniforms.uElapsed.value = elapsed;
    this.lineMaterial.uniforms.uTime.value = time;
    this.lineMaterial.uniforms.uElapsed.value = elapsed;
    this.signalMaterial.uniforms.uTime.value = time;
    this.signalMaterial.uniforms.uElapsed.value = elapsed;
    this.rotationOffset += deltaTime * this.options.motion.rotationSpeed;
    this.group.rotation.set(-0.18, 0.34 + this.rotationOffset, -0.04);
  }

  dispose(): void {
    this.pointGeometry.dispose();
    this.lineGeometry.dispose();
    this.signalGeometry.dispose();
    this.pointMaterial.dispose();
    this.lineMaterial.dispose();
    this.signalMaterial.dispose();
  }
}

function buildStructure(rng: () => number): {
  lines: StructureLine[];
  points: StructurePoint[];
  signalPairs: [THREE.Vector3, THREE.Vector3][];
  routes: StructureRoute[];
} {
  const lines: StructureLine[] = [];
  const points: StructurePoint[] = [];
  const junctions: THREE.Vector3[] = [];
  const signalPairs: [THREE.Vector3, THREE.Vector3][] = [];
  const routeEdges: [THREE.Vector3, THREE.Vector3][] = [];

  const addLine = (start: THREE.Vector3, end: THREE.Vector3, role: number, delay: number, alpha: number) => {
    lines.push({ start, end, role, delay, alpha });
  };
  const addJunction = (point: THREE.Vector3, delay: number, density = 32) => {
    junctions.push(point.clone());
    points.push({ target: point.clone(), role: 0, delay, size: 1.2 });
    for (let i = 0; i < density; i++) {
      points.push({
        target: point.clone().add(randomUnit(rng).multiplyScalar(Math.pow(rng(), 2) * 0.55)),
        role: 4,
        delay: delay + rng() * 0.35,
        size: 0.6 + rng() * 0.7,
      });
    }
  };

  const yMin = -8.2;
  const yMax = 8.6;
  const coreHubs: THREE.Vector3[] = [];
  for (let i = 0; i < 32; i++) {
    const t = i / 31;
    const y = THREE.MathUtils.lerp(yMin, yMax, t);
    const drift = Math.sin(t * TAU * 1.7 + 0.8) * 2.2 + Math.sin(t * TAU * 4.1) * 0.7;
    const hub = new THREE.Vector3(
      drift + (rng() - 0.5) * 1.8,
      y + (rng() - 0.5) * 0.42,
      Math.cos(t * TAU * 1.25) * 3.1 + Math.sin(t * TAU * 3.2) * 1.6 + (rng() - 0.5) * 3.2
    );
    coreHubs.push(hub);
    addJunction(hub, 0.08 + t * 0.28, 8 + Math.floor(rng() * 10));
  }

  for (let i = 0; i < coreHubs.length - 1; i++) {
    if (rng() < 0.38) continue;
    const jump = rng() < 0.72 ? 1 : 2;
    const next = coreHubs[Math.min(coreHubs.length - 1, i + jump)];
    addFragmentedLine(lines, coreHubs[i], next, 5, 0.38 + i * 0.018, 0.1 + rng() * 0.16, rng, 2 + Math.floor(rng() * 4));
    routeEdges.push([coreHubs[i], next]);
  }

  const graphBands = [
    { y: -5.9, left: -9.6, right: 7.4, depth: 6.8, count: 24, delay: 0.72 },
    { y: -3.4, left: -7.8, right: 9.1, depth: 5.9, count: 28, delay: 0.9 },
    { y: -0.9, left: -8.8, right: 5.8, depth: 7.4, count: 25, delay: 1.05 },
    { y: 1.7, left: -5.2, right: 6.8, depth: 6.2, count: 22, delay: 1.22 },
    { y: 4.2, left: -3.4, right: 9.6, depth: 5.4, count: 24, delay: 1.38 },
    { y: 7.2, left: -2.4, right: 3.3, depth: 4.2, count: 14, delay: 1.5 },
  ];
  const bandRows: THREE.Vector3[][] = [];

  for (const band of graphBands) {
    const row: THREE.Vector3[] = [];
    for (let i = 0; i < band.count; i++) {
      const t = band.count <= 1 ? 0 : i / (band.count - 1);
      const drift = Math.sin(t * TAU * (1.2 + rng() * 0.8) + rng() * TAU);
      const node = new THREE.Vector3(
        THREE.MathUtils.lerp(band.left, band.right, t) + (rng() - 0.5) * 0.85,
        band.y + drift * 0.22 + (rng() - 0.5) * 0.34,
        Math.sin(t * TAU + rng() * 0.7) * band.depth * 0.72 + (rng() - 0.5) * band.depth * 1.35
      );
      row.push(node);
      addJunction(node, band.delay + t * 0.22 + rng() * 0.16, 14 + Math.floor(rng() * 20));
    }
    bandRows.push(row);

    for (let i = 0; i < row.length - 1; i++) {
      if (rng() < 0.16) continue;
      addFragmentedLine(lines, row[i], row[i + 1], 5, band.delay + i * 0.012, 0.2 + rng() * 0.24, rng, 2 + Math.floor(rng() * 4));
      signalPairs.push([row[i].clone(), row[i + 1].clone()]);
      routeEdges.push([row[i], row[i + 1]]);
    }

    for (let i = 0; i < row.length; i++) {
      const jump = 2 + Math.floor(rng() * 5);
      if (i + jump >= row.length || rng() > 0.42) continue;
      addFragmentedLine(lines, row[i], row[i + jump], 5, band.delay + 0.18 + rng() * 0.3, 0.08 + rng() * 0.16, rng, 2 + Math.floor(rng() * 3));
      routeEdges.push([row[i], row[i + jump]]);
    }
  }

  for (let rowIndex = 0; rowIndex < bandRows.length - 1; rowIndex++) {
    const row = bandRows[rowIndex];
    const next = bandRows[rowIndex + 1];
    const connectionCount = 12 + Math.floor(rng() * 12);
    for (let i = 0; i < connectionCount; i++) {
      const a = row[Math.floor(rng() * row.length)];
      const b = next[Math.floor(rng() * next.length)];
      if (!a || !b) continue;
      addFragmentedLine(lines, a, b, 5, 1.25 + rowIndex * 0.18 + rng() * 0.5, 0.07 + rng() * 0.17, rng, 2 + Math.floor(rng() * 4));
      if (rng() < 0.38) {
        signalPairs.push([a.clone(), b.clone()]);
        routeEdges.push([a, b]);
      }
    }
  }

  const outerAnchors = [
    new THREE.Vector3(-11.8, -5.6, -3.5),
    new THREE.Vector3(11.5, -3.9, 2.8),
    new THREE.Vector3(-10.5, -0.4, 3.4),
    new THREE.Vector3(12.4, 4.35, -1.7),
    new THREE.Vector3(-7.4, 2.5, -5.2),
    new THREE.Vector3(8.2, 7.1, 2.4),
    new THREE.Vector3(0.8, -12.5, 1.2),
  ];
  for (const anchor of outerAnchors) {
    const hub = junctions[Math.floor(rng() * junctions.length)] ?? new THREE.Vector3();
    addBundledFragmentedLine(lines, hub, anchor, 3, 1.65 + rng() * 0.7, 0.18 + rng() * 0.18, rng, 9, 3, 0.16);
    addJunction(anchor, 1.9 + rng() * 0.6, 18);
    signalPairs.push([hub.clone(), anchor.clone()]);
    routeEdges.push([hub, anchor]);
  }

  for (let i = 0; i < 260; i++) {
    const a = junctions[Math.floor(rng() * junctions.length)];
    const b = junctions[Math.floor(rng() * junctions.length)];
    if (!a || !b || a.distanceTo(b) > 8.4 || a.distanceTo(b) < 0.75) continue;
    addLine(a.clone(), b.clone(), 3, 1.45 + rng() * 1.25, 0.18 + rng() * 0.28);
  }

  for (let i = 0; i < 620; i++) {
    const anchor = junctions[Math.floor(rng() * junctions.length)] ?? new THREE.Vector3();
    const dir = randomUnit(rng);
    const len = 0.18 + rng() * 1.65;
    const center = anchor.clone().add(randomUnit(rng).multiplyScalar(rng() * 1.9));
    addLine(
      center.clone().addScaledVector(dir, -len * 0.5),
      center.clone().addScaledVector(dir, len * 0.5),
      4,
      1.45 + rng() * 1.75,
      0.18 + rng() * 0.42
    );
  }

  addAmbientConstructionField(lines, points, junctions, routeEdges, rng);
  const routes = createSignalRoutes(routeEdges, rng);

  for (const line of lines) {
    const samples = line.role === 0 ? 10 : line.role === 1 ? 8 : line.role === 2 ? 6 : 4;
    for (let i = 0; i < samples; i++) {
      const t = (i + rng()) / samples;
      points.push({
        target: line.start.clone().lerp(line.end, t).add(randomUnit(rng).multiplyScalar(rng() * 0.18)),
        role: line.role,
        delay: line.delay + rng() * 0.22,
        size: 0.42 + rng() * 0.48,
      });
    }
  }

  return { lines, points, signalPairs, routes };
}

function addFragmentedLine(
  lines: StructureLine[],
  start: THREE.Vector3,
  end: THREE.Vector3,
  role: number,
  delay: number,
  alpha: number,
  rng: () => number,
  pieces: number
): void {
  for (let i = 0; i < pieces; i++) {
    const a = i / pieces + rng() * 0.025;
    const b = Math.min(1, a + 0.045 + rng() * 0.12);
    if (b <= a) continue;
    lines.push({
      start: start.clone().lerp(end, a),
      end: start.clone().lerp(end, b),
      role,
      delay: delay + i * 0.018 + rng() * 0.16,
      alpha,
    });
  }
}

function addBundledFragmentedLine(
  lines: StructureLine[],
  start: THREE.Vector3,
  end: THREE.Vector3,
  role: number,
  delay: number,
  alpha: number,
  rng: () => number,
  pieces: number,
  bundleCount: number,
  bundleRadius: number
): void {
  const axis = end.clone().sub(start).normalize();
  const up = Math.abs(axis.y) > 0.86 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(axis, up).normalize();
  const normal = new THREE.Vector3().crossVectors(right, axis).normalize();

  for (let i = 0; i < bundleCount; i++) {
    const angle = rng() * TAU;
    const radius = Math.pow(rng(), 0.65) * bundleRadius;
    const offset = right
      .clone()
      .multiplyScalar(Math.cos(angle) * radius)
      .addScaledVector(normal, Math.sin(angle) * radius);
    addFragmentedLine(
      lines,
      start.clone().add(offset),
      end.clone().add(offset),
      role,
      delay + i * 0.018 + rng() * 0.08,
      alpha * (0.62 + rng() * 0.5),
      rng,
      pieces
    );
  }
}

function addAmbientConstructionField(
  lines: StructureLine[],
  points: StructurePoint[],
  junctions: THREE.Vector3[],
  routeEdges: [THREE.Vector3, THREE.Vector3][],
  rng: () => number
): void {
  const graphNodes: THREE.Vector3[] = [];
  const graphWeights: number[] = [];
  const graphClusters = [
    { center: new THREE.Vector3(-10.8, -7.4, -4.8), spread: new THREE.Vector3(2.9, 1.2, 5.2), count: 55 },
    { center: new THREE.Vector3(-7.8, -2.3, 5.4), spread: new THREE.Vector3(3.6, 2.6, 6.0), count: 80 },
    { center: new THREE.Vector3(-3.8, 1.0, -3.4), spread: new THREE.Vector3(3.8, 3.2, 6.8), count: 95 },
    { center: new THREE.Vector3(2.4, 0.1, 1.7), spread: new THREE.Vector3(4.3, 3.2, 6.4), count: 115 },
    { center: new THREE.Vector3(7.2, -2.8, 4.7), spread: new THREE.Vector3(4.8, 2.1, 5.8), count: 82 },
    { center: new THREE.Vector3(8.4, 3.4, -5.1), spread: new THREE.Vector3(4.2, 2.6, 5.9), count: 75 },
    { center: new THREE.Vector3(1.2, 6.9, 3.2), spread: new THREE.Vector3(3.4, 2.8, 5.6), count: 72 },
    { center: new THREE.Vector3(-1.6, -5.7, -2.6), spread: new THREE.Vector3(5.0, 1.3, 5.4), count: 95 },
  ];

  for (const cluster of graphClusters) {
    for (let i = 0; i < cluster.count; i++) {
      const dir = randomUnit(rng);
      const falloff = Math.pow(rng(), 0.54);
      const node = cluster.center.clone().add(
        new THREE.Vector3(
          dir.x * cluster.spread.x * falloff,
          dir.y * cluster.spread.y * falloff,
          dir.z * cluster.spread.z * falloff
        )
      );
      graphNodes.push(node);
      graphWeights.push(0.65 + rng() * 0.9);
    }
  }

  const bridgeNodes = [
    new THREE.Vector3(-14.4, -5.9, -8.2),
    new THREE.Vector3(-12.8, 0.3, 8.6),
    new THREE.Vector3(-9.8, 5.1, -7.8),
    new THREE.Vector3(-4.2, 9.2, 6.5),
    new THREE.Vector3(4.9, 8.2, -6.7),
    new THREE.Vector3(12.5, 5.9, 7.8),
    new THREE.Vector3(14.0, -1.8, -5.2),
    new THREE.Vector3(10.8, -7.0, 8.2),
    new THREE.Vector3(1.2, -12.8, -6.1),
  ];
  for (const node of bridgeNodes) {
    graphNodes.push(node);
    graphWeights.push(1.4);
  }

  for (const junction of junctions) {
    if (rng() > 0.34) continue;
    const offset = randomUnit(rng).multiplyScalar(1.2 + rng() * 5.2);
    offset.z *= 1.8;
    graphNodes.push(junction.clone().add(offset));
    graphWeights.push(0.8 + rng() * 0.9);
  }

  for (let i = 0; i < graphNodes.length; i++) {
    const node = graphNodes[i];
    const weight = graphWeights[i];
    const satellites = 3 + Math.floor(weight * 4 + rng() * 3);
    points.push({
      target: node.clone(),
      role: 6,
      delay: 1.05 + rng() * 1.5,
      size: 0.82 + weight * 0.42,
    });
    for (let s = 0; s < satellites; s++) {
      points.push({
        target: node.clone().add(randomUnit(rng).multiplyScalar(Math.pow(rng(), 2.3) * (0.34 + weight * 0.22))),
        role: 6,
        delay: 1.12 + rng() * 1.7,
        size: 0.22 + rng() * 0.4,
      });
    }
  }

  const edgeKeys = new Set<string>();
  const addGraphEdge = (aIndex: number, bIndex: number, alpha: number, pieces: number) => {
    if (aIndex === bIndex) return;
    const a = Math.min(aIndex, bIndex);
    const b = Math.max(aIndex, bIndex);
    const key = `${a}:${b}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    const start = graphNodes[aIndex];
    const end = graphNodes[bIndex];
    const distance = start.distanceTo(end);
    if (distance < 0.65) return;
    addFragmentedLine(lines, start, end, 5, 1.25 + rng() * 1.35, alpha, rng, pieces);
    routeEdges.push([start, end]);

    const samples = Math.max(2, Math.floor(distance * 1.55));
    for (let i = 0; i < samples; i++) {
      const t = (i + rng()) / samples;
      const edgePoint = start.clone().lerp(end, t);
      points.push({
        target: edgePoint.add(randomUnit(rng).multiplyScalar(rng() * 0.09)),
        role: 5,
        delay: 1.28 + rng() * 1.6,
        size: 0.18 + rng() * 0.34,
      });
    }
  };

  for (let i = 0; i < graphNodes.length; i++) {
    const nearest = graphNodes
      .map((node, index) => ({ index, distance: index === i ? Infinity : graphNodes[i].distanceTo(node) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3 + Math.floor(rng() * 3));
    for (const candidate of nearest) {
      if (candidate.distance > 5.8 && rng() > 0.22) continue;
      addGraphEdge(i, candidate.index, 0.08 + rng() * 0.14, candidate.distance > 5 ? 3 : 5 + Math.floor(rng() * 5));
    }
  }

  for (let i = 0; i < 170; i++) {
    const a = Math.floor(rng() * graphNodes.length);
    const b = Math.floor(rng() * graphNodes.length);
    const distance = graphNodes[a].distanceTo(graphNodes[b]);
    if (distance < 5.8 || distance > 18.5) continue;
    addGraphEdge(a, b, 0.045 + rng() * 0.08, 2 + Math.floor(rng() * 4));
  }

  for (let i = 0; i < 420; i++) {
    const a = graphNodes[Math.floor(rng() * graphNodes.length)];
    const dir = randomUnit(rng);
    const len = 0.12 + rng() * 1.15;
    const center = a.clone().add(randomUnit(rng).multiplyScalar(0.2 + rng() * 0.9));
    lines.push({
      start: center.clone().addScaledVector(dir, -len * 0.5),
      end: center.clone().addScaledVector(dir, len * 0.5),
      role: 5,
      delay: 1.55 + rng() * 1.45,
      alpha: 0.07 + rng() * 0.16,
    });
  }
}

function createSignalRoutes(edges: [THREE.Vector3, THREE.Vector3][], rng: () => number): StructureRoute[] {
  const nodesByKey = new Map<string, { key: string; point: THREE.Vector3; neighbors: string[] }>();

  const getNode = (point: THREE.Vector3) => {
    const key = routeNodeKey(point);
    let node = nodesByKey.get(key);
    if (!node) {
      node = { key, point: point.clone(), neighbors: [] };
      nodesByKey.set(key, node);
    }
    return node;
  };

  for (const [a, b] of edges) {
    if (a.distanceTo(b) < 0.2) continue;
    const start = getNode(a);
    const end = getNode(b);
    if (!start.neighbors.includes(end.key)) start.neighbors.push(end.key);
    if (!end.neighbors.includes(start.key)) end.neighbors.push(start.key);
  }

  const nodes = Array.from(nodesByKey.values()).filter((node) => node.neighbors.length > 0);
  const routes: StructureRoute[] = [];
  const targetRouteCount = Math.min(24, Math.max(0, nodes.length));
  let attempts = 0;

  while (routes.length < targetRouteCount && attempts < 240) {
    attempts += 1;
    const routeIndex = routes.length;
    const kind: StructureRouteKind = routeIndex % 7 === 2 ? 1 : routeIndex % 7 === 5 ? 2 : 0;
    const spreadIndex = Math.floor((routes.length * 0.61803398875 + rng() * 0.16) * nodes.length) % nodes.length;
    const startNode = nodes[spreadIndex];
    if (!startNode) break;

    const routePoints = [startNode.point.clone()];
    let previousKey = "";
    let currentKey = startNode.key;
    const steps = kind === 1 ? 3 + Math.floor(rng() * 4) : 4 + Math.floor(rng() * 6);

    for (let step = 0; step < steps; step++) {
      const current = nodesByKey.get(currentKey);
      if (!current) break;
      const choices = current.neighbors.filter((key) => key !== previousKey);
      const candidates = choices.length > 0 ? choices : current.neighbors;
      if (candidates.length === 0) break;
      const nextKey = candidates[Math.floor(rng() * candidates.length)];
      const next = nodesByKey.get(nextKey);
      if (!next) break;
      routePoints.push(next.point.clone());
      previousKey = currentKey;
      currentKey = nextKey;
    }

    const route = createRouteFromPoints(routePoints, kind, rng);
    if (route) routes.push(route);
  }

  return routes;
}

function createRouteFromPoints(
  points: THREE.Vector3[],
  kind: StructureRouteKind,
  rng: () => number
): StructureRoute | null {
  const cleaned: THREE.Vector3[] = [];
  for (const point of points) {
    const previous = cleaned[cleaned.length - 1];
    if (!previous || previous.distanceTo(point) > 0.2) cleaned.push(point);
  }
  if (kind === 2 && cleaned.length < 3) return null;
  if (cleaned.length < 2) return null;

  const lengths: number[] = [];
  let totalLength = 0;
  for (let i = 0; i < cleaned.length - 1; i++) {
    const length = cleaned[i].distanceTo(cleaned[i + 1]);
    if (length <= 0.2) continue;
    lengths.push(length);
    totalLength += length;
  }
  if (totalLength <= 0.2 || lengths.length === 0) return null;

  const segments: StructureRouteSegment[] = [];
  let cursor = 0;
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i];
    const startT = cursor / totalLength;
    cursor += length;
    const endT = cursor / totalLength;
    segments.push({
      start: cleaned[i].clone(),
      end: cleaned[i + 1].clone(),
      startT,
      endT,
    });
  }

  if (segments.length === 0) return null;

  const first = segments[0];
  const clipT =
    kind === 1
      ? THREE.MathUtils.lerp(first.startT, first.endT, 0.52 + rng() * 0.18)
      : kind === 2
        ? first.endT
        : 1;

  return {
    kind,
    segments,
    clipT,
    radius: 2.0 + rng() * 0.85,
    strength: 1.05 + rng() * 0.38,
  };
}

function routeNodeKey(point: THREE.Vector3): string {
  return `${point.x.toFixed(3)}:${point.y.toFixed(3)}:${point.z.toFixed(3)}`;
}

function sampleRouteBinding(
  point: THREE.Vector3,
  routes: StructureRoute[]
): { routeIndex: number; routeT: number; distance: number; kind: number; clipT: number; radius: number } {
  let routeIndex = -1;
  let routeT = 0;
  let distance = Infinity;
  let kind = 0;
  let clipT = 1;
  let radius = 1;

  routes.forEach((route, index) => {
    for (const segment of route.segments) {
      const sample = closestPointOnSegment(point, segment.start, segment.end);
      if (sample.distance >= distance) continue;
      routeIndex = index;
      routeT = THREE.MathUtils.lerp(segment.startT, segment.endT, sample.t);
      distance = sample.distance;
      kind = route.kind;
      clipT = route.clipT;
      radius = route.radius;
    }
  });

  if (routeIndex < 0 || distance > radius * 2.2) {
    return { routeIndex: -1, routeT: 0, distance: 99, kind: 0, clipT: 1, radius: 1 };
  }

  return { routeIndex, routeT, distance, kind, clipT, radius };
}

function closestPointOnSegment(
  point: THREE.Vector3,
  start: THREE.Vector3,
  end: THREE.Vector3
): { t: number; distance: number } {
  const edge = end.clone().sub(start);
  const lengthSq = Math.max(edge.lengthSq(), 0.0001);
  const t = THREE.MathUtils.clamp(point.clone().sub(start).dot(edge) / lengthSq, 0, 1);
  const closest = start.clone().addScaledVector(edge, t);
  return { t, distance: point.distanceTo(closest) };
}

function pointOnRoute(route: StructureRoute, routeT: number): THREE.Vector3 {
  const segment = route.segments.find((candidate) => routeT <= candidate.endT + 0.0001) ?? route.segments[route.segments.length - 1];
  const localT = THREE.MathUtils.clamp((routeT - segment.startT) / Math.max(segment.endT - segment.startT, 0.0001), 0, 1);
  return segment.start.clone().lerp(segment.end, localT);
}

function tangentOnRoute(route: StructureRoute, routeT: number): THREE.Vector3 {
  const segment = route.segments.find((candidate) => routeT <= candidate.endT + 0.0001) ?? route.segments[route.segments.length - 1];
  return segment.end.clone().sub(segment.start).normalize();
}

function writeRouteBinding(
  route: Float32Array,
  routeControl: Float32Array,
  index: number,
  binding: { routeIndex: number; routeT: number; distance: number; kind: number; clipT: number; radius: number }
): void {
  route[index * 4 + 0] = binding.routeIndex;
  route[index * 4 + 1] = binding.routeT;
  route[index * 4 + 2] = binding.distance;
  route[index * 4 + 3] = binding.kind;
  routeControl[index * 2 + 0] = binding.clipT;
  routeControl[index * 2 + 1] = binding.radius;
}

function populateLineGeometry(
  geometry: THREE.BufferGeometry,
  lines: StructureLine[],
  routes: StructureRoute[],
  rng: () => number
): void {
  const vertexCount = lines.length * 2;
  const position = new Float32Array(vertexCount * 3);
  const sourceStart = new Float32Array(vertexCount * 3);
  const sourceEnd = new Float32Array(vertexCount * 3);
  const targetStart = new Float32Array(vertexCount * 3);
  const targetEnd = new Float32Array(vertexCount * 3);
  const meta = new Float32Array(vertexCount * 4);
  const route = new Float32Array(vertexCount * 4);
  const routeControl = new Float32Array(vertexCount * 2);
  const endpoint = new Float32Array(vertexCount);

  lines.forEach((line, lineIndex) => {
    const center = line.start.clone().lerp(line.end, 0.5);
    const binding = sampleRouteBinding(center, routes);
    const scatter = randomUnit(rng).multiplyScalar(2.4 + rng() * 5.6);
    const sourceCenter = center.clone().add(scatter);
    const sourceDir = randomUnit(rng);
    const sourceLen = line.start.distanceTo(line.end) * (0.12 + rng() * 0.24);
    const s0 = sourceCenter.clone().addScaledVector(sourceDir, -sourceLen);
    const s1 = sourceCenter.clone().addScaledVector(sourceDir, sourceLen);

    for (let side = 0; side < 2; side++) {
      const index = lineIndex * 2 + side;
      writeVec3(sourceStart, index, s0);
      writeVec3(sourceEnd, index, s1);
      writeVec3(targetStart, index, line.start);
      writeVec3(targetEnd, index, line.end);
      meta[index * 4 + 0] = line.role;
      meta[index * 4 + 1] = line.delay;
      meta[index * 4 + 2] = line.alpha;
      meta[index * 4 + 3] = rng();
      writeRouteBinding(route, routeControl, index, binding);
      endpoint[index] = side;
    }
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aSourceStart", new THREE.BufferAttribute(sourceStart, 3));
  geometry.setAttribute("aSourceEnd", new THREE.BufferAttribute(sourceEnd, 3));
  geometry.setAttribute("aTargetStart", new THREE.BufferAttribute(targetStart, 3));
  geometry.setAttribute("aTargetEnd", new THREE.BufferAttribute(targetEnd, 3));
  geometry.setAttribute("aMeta", new THREE.BufferAttribute(meta, 4));
  geometry.setAttribute("aRoute", new THREE.BufferAttribute(route, 4));
  geometry.setAttribute("aRouteControl", new THREE.BufferAttribute(routeControl, 2));
  geometry.setAttribute("aEnd", new THREE.BufferAttribute(endpoint, 1));
}

function populatePointGeometry(
  geometry: THREE.BufferGeometry,
  basePoints: StructurePoint[],
  routes: StructureRoute[],
  particleCount: number,
  rng: () => number
): void {
  const source = new Float32Array(particleCount * 3);
  const target = new Float32Array(particleCount * 3);
  const meta = new Float32Array(particleCount * 4);
  const seed = new Float32Array(particleCount * 4);
  const route = new Float32Array(particleCount * 4);
  const routeControl = new Float32Array(particleCount * 2);
  const position = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const point = basePoints[Math.floor(rng() * basePoints.length)];
    const binding = sampleRouteBinding(point.target, routes);
    const scatterDir = randomUnit(rng);
    const spread = 0.7 + Math.pow(rng(), 0.55) * 8.5;
    const sourcePoint = point.target
      .clone()
      .addScaledVector(scatterDir, spread)
      .add(new THREE.Vector3((rng() - 0.5) * 2.2, (rng() - 0.5) * 1.4, (rng() - 0.5) * 2.2));

    writeVec3(source, i, sourcePoint);
    writeVec3(target, i, point.target);
    writeVec3(position, i, point.target);
    meta[i * 4 + 0] = point.role;
    meta[i * 4 + 1] = point.delay + rng() * 0.4;
    meta[i * 4 + 2] = point.size * (0.7 + rng() * 0.6);
    meta[i * 4 + 3] = spread / 9.2;
    seed[i * 4 + 0] = rng();
    seed[i * 4 + 1] = rng();
    seed[i * 4 + 2] = rng();
    seed[i * 4 + 3] = rng();
    writeRouteBinding(route, routeControl, i, binding);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aSource", new THREE.BufferAttribute(source, 3));
  geometry.setAttribute("aTarget", new THREE.BufferAttribute(target, 3));
  geometry.setAttribute("aMeta", new THREE.BufferAttribute(meta, 4));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4));
  geometry.setAttribute("aRoute", new THREE.BufferAttribute(route, 4));
  geometry.setAttribute("aRouteControl", new THREE.BufferAttribute(routeControl, 2));
}

function populateSignalGeometry(
  geometry: THREE.BufferGeometry,
  routes: StructureRoute[],
  rng: () => number
): void {
  const renderSegments: {
    start: THREE.Vector3;
    end: THREE.Vector3;
    routeIndex: number;
    startT: number;
    endT: number;
    kind: number;
    width: number;
    strength: number;
    clipT: number;
    originalKind: number;
  }[] = [];

  routes.forEach((route, routeIndex) => {
    const width = route.kind === 0 ? 0.24 + rng() * 0.06 : 0.17 + rng() * 0.05;
    for (const segment of route.segments) {
      renderSegments.push({
        start: segment.start,
        end: segment.end,
        routeIndex,
        startT: segment.startT,
        endT: segment.endT,
        kind: route.kind,
        width,
        strength: route.strength,
        clipT: route.clipT,
        originalKind: route.kind,
      });
    }

    if (route.kind > 0) {
      const clipPoint = pointOnRoute(route, route.clipT);
      const tangent = tangentOnRoute(route, route.clipT);
      const up = Math.abs(tangent.y) > 0.82 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
      const tickAxis = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const tickLength = 0.16 + route.strength * 0.08;
      renderSegments.push({
        start: clipPoint.clone().addScaledVector(tickAxis, -tickLength * 0.5),
        end: clipPoint.clone().addScaledVector(tickAxis, tickLength * 0.5),
        routeIndex,
        startT: route.clipT,
        endT: route.clipT,
        kind: 3,
        width,
        strength: route.strength * 0.72,
        clipT: route.clipT,
        originalKind: route.kind,
      });
    }
  });

  const vertexCount = renderSegments.length * 2;
  const position = new Float32Array(vertexCount * 3);
  const pathStart = new Float32Array(vertexCount * 3);
  const pathEnd = new Float32Array(vertexCount * 3);
  const route = new Float32Array(vertexCount * 4);
  const signalMeta = new Float32Array(vertexCount * 4);
  const endpoint = new Float32Array(vertexCount);

  renderSegments.forEach((segment, segmentIndex) => {
    for (let side = 0; side < 2; side++) {
      const index = segmentIndex * 2 + side;
      writeVec3(pathStart, index, segment.start);
      writeVec3(pathEnd, index, segment.end);
      route[index * 4 + 0] = segment.routeIndex;
      route[index * 4 + 1] = segment.startT;
      route[index * 4 + 2] = segment.endT;
      route[index * 4 + 3] = segment.kind;
      signalMeta[index * 4 + 0] = segment.width;
      signalMeta[index * 4 + 1] = segment.strength;
      signalMeta[index * 4 + 2] = segment.clipT;
      signalMeta[index * 4 + 3] = segment.originalKind;
      endpoint[index] = side;
    }
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geometry.setAttribute("aPathStart", new THREE.BufferAttribute(pathStart, 3));
  geometry.setAttribute("aPathEnd", new THREE.BufferAttribute(pathEnd, 3));
  geometry.setAttribute("aRoute", new THREE.BufferAttribute(route, 4));
  geometry.setAttribute("aSignalMeta", new THREE.BufferAttribute(signalMeta, 4));
  geometry.setAttribute("aEnd", new THREE.BufferAttribute(endpoint, 1));
}

function mergeOptions(defaults: ShardStackOptions, input: Partial<ShardStackOptions>): ShardStackOptions {
  return {
    ...defaults,
    ...input,
    palette: { ...defaults.palette, ...input.palette },
    motion: { ...defaults.motion, ...input.motion },
    visuals: { ...defaults.visuals, ...input.visuals },
  };
}

function writeVec3(array: Float32Array, index: number, vector: THREE.Vector3): void {
  array[index * 3 + 0] = vector.x;
  array[index * 3 + 1] = vector.y;
  array[index * 3 + 2] = vector.z;
}

function randomUnit(rng: () => number): THREE.Vector3 {
  const z = rng() * 2 - 1;
  const a = rng() * TAU;
  const r = Math.sqrt(Math.max(0, 1 - z * z));
  return new THREE.Vector3(Math.cos(a) * r, z, Math.sin(a) * r);
}

function createRng(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
