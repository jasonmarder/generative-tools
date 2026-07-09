import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import GUI from "lil-gui";
import { PolicyTorusWebManager, createPolicyTorusTargetTexture } from "./experiments/policyTorus";
import { PlasmaWebOrb, PLASMA_WEB_DEFAULTS } from "./experiments/plasmaWeb";
import {
  RUNLAYER_SHARD_STACK_PALETTE,
  SHARD_STACK_DEFAULTS,
  ShardStackArchitecture,
} from "./experiments/shardStack";

// ─── Section 1: Parameters ───────────────────────────────────────────────────

const ORB = {
  size: 256,
  radius: 14.516,
  radiusSpread: 2.0,
  shellDeform: 1.8,
  frequency: 0.55,
  turbulence: 1.1,
  curlSpeed: 1.15,
  restoreForce: 1.55,
  clusterForce: 0.35,
  clusterCount: 9,
  autoResolve: true,
  logoResolve: 0,
  logoForce: 12,
  logoBreath: 0.206,
  logoDepth: 1.5,
  logoScale: 0.9,
  logoWidth: 1.4,
  logoActivity: 0.07,
  logoPulseTravelSeconds: 0.85,
  logoPulseArmStagger: 0.82,
  logoPulseCycleSeconds: 5.6,
  pointSize: 1.05,
  opacity: 0.4,
  rotationSpeed: 0.07,
  depthFade: 0.48,
};

const APPEARANCE = {
  backgroundColor: "#F5F5F4",
  particleColor: "#1C1917",
};

const NETWORK = {
  // Pacing
  buildDuration: 3.0,
  pulseSpawnRate: 1.3,
  simultaneousPulses: 0, // signal-pulse chunks disabled in favor of connection lines
  signalDuration: 2.4,
  // Structure
  teamBiasStrength: 0.32,
  recruitmentRate: 0.34,
  // Camera
  rotationSpeed: 1.0,
  // Policy
  policyMode: "A" as "A" | "B" | "C",
  // Connection lines (active visual layer)
  maxConnections: 170,
  connectionSpawnRate: 80.0,
  blockedProbability: 0.28,
  connectionMinDuration: 3.2,
  connectionMaxDuration: 7.0,
  anchorCount: 260,
  anchorPairMaxDistance: 2.25,
  // Look: shares Logo Resolve's quiet paper/ink palette
  backgroundColor: "#F5F5F4",
  particleColor: "#1C1917",
  starProbability: 0.05,
  connectionColor: "#1C1917",
  blockedColor: "#1C1917",
  reroutedColor: "#1C1917",
  rejectedColor: "#A4513E",
  signalColor: "#1C1917",
  pointSize: 1.05,
  opacity: 0.44,
  // Debug
  debugShowAttractors: false,
};

const NETWORK_TUNING = {
  maxSignals: 32,
  maxNodes: 32,
  maxEdges: 64,
};

const POLICY_WEB = {
  rotationSpeed: 0.045,
  nodeDrift: 0.12,
  nodeDriftSpeed: 0.42,
  spawnRate: 190,
  maxActiveConnections: 150,
  connectionDuration: 5.6,
  lineOpacity: 0.16,
  nodeOpacity: 0.43,
};

// Walled-off plasma scene config. Every key must be wired to a lil-gui
// controller in buildGuiForExperiment's plasma branch. Plasma controllers
// never mutate ORB/APPEARANCE/NETWORK — only PLASMA + the uPlasma* uniforms.
const PLASMA = {
  // Background and particles use the same palette as Logo Resolve.
  backgroundColor: "#F5F5F4",
  shellColor: "#1C1917",
  baseParticleOpacity: 0.08,
  basePointSize: 0.5,
  // Activity
  activatedRatio: 0.16,
  filamentCount: 42,
  filamentSpeed: 0.22,
  filamentForce: 7.5,
  filamentCycle: 5.6,
  coreTightness: 1.2,
  shellTurbulence: 0.72,
  webMaxConnections: 360,
  webSpawnRate: 150.0,
  webMinDuration: 4.0,
  webMaxDuration: 9.0,
  webAnchorCount: 420,
  webPairMaxDistance: 2.45,
  webColor: "#1C1917",
  // Monochrome gradient slots kept for isolated GUI/runtime compatibility.
  paletteHot: "#1C1917",
  paletteWarm: "#1C1917",
  paletteEmber: "#1C1917",
  // Breath
  breathDuration: 12.0,
  breathHueRange: 30.0,
  breathBrightness: 0.10,
  // Transition
  resolveDuration: 3.2,
};

const PLASMA_WEB = {
  pointSize: PLASMA_WEB_DEFAULTS.pointSize,
  pointOpacity: PLASMA_WEB_DEFAULTS.pointOpacity,
  lineOpacity: 0,
  compositionWidth: 1.12,
  compositionHeight: 1.03,
  rotationSpeed: 0,
  breathStrength: PLASMA_WEB_DEFAULTS.motion.breathStrength,
  breathAmplitude: PLASMA_WEB_DEFAULTS.motion.breathAmplitude,
  breathSpeed: PLASMA_WEB_DEFAULTS.motion.breathSpeed,
  strandDrift: PLASMA_WEB_DEFAULTS.motion.strandDrift,
  surfaceJitter: PLASMA_WEB_DEFAULTS.motion.surfaceJitter,
  connectionPulse: PLASMA_WEB_DEFAULTS.motion.connectionPulse,
};

const PLASMA_CAMERA_DEFAULTS = {
  azimuth: 0,
  elevation: 54.8,
  distance: 38.4,
  targetX: 0,
  targetY: 2.9,
  targetZ: 0,
  fov: 50,
};

const PLASMA_CAMERA = { ...PLASMA_CAMERA_DEFAULTS };

const SHARDS = {
  backgroundColor: RUNLAYER_SHARD_STACK_PALETTE.background,
  inkColor: RUNLAYER_SHARD_STACK_PALETTE.ink,
  activityColor: RUNLAYER_SHARD_STACK_PALETTE.activity,
  signalColor: RUNLAYER_SHARD_STACK_PALETTE.signal,
  rejectedColor: NETWORK.rejectedColor,
  particleCount: window.innerWidth < 720 ? 14000 : SHARD_STACK_DEFAULTS.particleCount,
  resolveDuration: SHARD_STACK_DEFAULTS.motion.resolveDuration,
  traceDuration: SHARD_STACK_DEFAULTS.motion.traceDuration,
  rotationSpeed: SHARD_STACK_DEFAULTS.motion.rotationSpeed,
  activity: SHARD_STACK_DEFAULTS.motion.activity,
  signalSpeed: SHARD_STACK_DEFAULTS.motion.signalSpeed,
  policyFadeIn: SHARD_STACK_DEFAULTS.motion.policyFadeIn,
  policyFadeOut: SHARD_STACK_DEFAULTS.motion.policyFadeOut,
  scale: SHARD_STACK_DEFAULTS.visuals.scale,
  pointSize: SHARD_STACK_DEFAULTS.visuals.pointSize,
  pointOpacity: SHARD_STACK_DEFAULTS.visuals.pointOpacity,
  lineOpacity: SHARD_STACK_DEFAULTS.visuals.lineOpacity,
  signalOpacity: SHARD_STACK_DEFAULTS.visuals.signalOpacity,
};

type Experiment = "logo" | "network" | "plasma" | "shards";

const getInitialExperiment = (): Experiment => {
  const queryMode = new URLSearchParams(window.location.search).get("experiment");
  const hashMode = window.location.hash.replace("#", "");
  const value = queryMode || hashMode;
  if (value === "network" || value === "plasma" || value === "shards") return value;
  return "logo";
};

let activeExperiment: Experiment = getInitialExperiment();
let activeGui: GUI | null = null;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
  ORB.turbulence = 0.22;
  ORB.curlSpeed = 0.08;
  ORB.clusterForce = 0.22;
  ORB.logoForce = 1.2;
  ORB.rotationSpeed = 0.02;
  NETWORK.rotationSpeed = 0.2;
  POLICY_WEB.rotationSpeed = 0;
  POLICY_WEB.nodeDrift = 0.03;
  POLICY_WEB.spawnRate = 20;
  POLICY_WEB.maxActiveConnections = 50;
  PLASMA.filamentSpeed = 0.12;
  PLASMA.shellTurbulence = 0.35;
  PLASMA.breathDuration = 24.0;
  PLASMA.breathBrightness = 0.04;
  PLASMA_WEB.rotationSpeed = 0;
  PLASMA_WEB.breathStrength = 0.04;
  PLASMA_WEB.breathAmplitude = 0.18;
  PLASMA_WEB.strandDrift = 0.03;
  PLASMA_WEB.surfaceJitter = 0.015;
  PLASMA_WEB.connectionPulse = 0;
  SHARDS.resolveDuration = 0.01;
  SHARDS.traceDuration = 0.01;
  SHARDS.rotationSpeed = 0;
  SHARDS.activity = 0.01;
  SHARDS.signalSpeed = 0.04;
}

// Plasma resolve smoothing — driven toward 1 on enter, 0 on leave
let plasmaResolveTarget = 0;
let plasmaResolveCurrent = 0;

function applyBackgroundForScene() {
  let bg = APPEARANCE.backgroundColor;
  if (activeExperiment === "plasma") bg = PLASMA.backgroundColor;
  else if (activeExperiment === "network") bg = NETWORK.backgroundColor;
  else if (activeExperiment === "shards") bg = SHARDS.backgroundColor;
  renderer.setClearColor(bg);
  document.body.style.background = bg;
}

function applyParticlePaletteForScene() {
  if (activeExperiment === "network") {
    orbMat.uniforms.uParticleColor.value.set(NETWORK.particleColor);
    orbMat.uniforms.uOpacity.value = NETWORK.opacity;
    orbMat.uniforms.uPointSize.value = NETWORK.pointSize;
  } else if (activeExperiment === "plasma") {
    orbMat.uniforms.uParticleColor.value.set(APPEARANCE.particleColor);
    orbMat.uniforms.uOpacity.value = PLASMA.baseParticleOpacity;
    orbMat.uniforms.uPointSize.value = PLASMA.basePointSize;
  } else if (activeExperiment === "shards") {
    orbMat.uniforms.uParticleColor.value.set(APPEARANCE.particleColor);
    orbMat.uniforms.uOpacity.value = 0;
  } else {
    orbMat.uniforms.uParticleColor.value.set(APPEARANCE.particleColor);
    orbMat.uniforms.uOpacity.value = ORB.opacity;
    orbMat.uniforms.uPointSize.value = ORB.pointSize;
  }
}

// Build progress drives chaos → order. Smoothly ramps 0→1 over NETWORK.buildDuration.
let networkBuildStartTime = -1;
let networkBuildProgress = 0;

// Policy mode crossfade weights — (A, B, C). Animated by setPolicyMode().
const policyModeTarget = new THREE.Vector3(1, 0, 0);
const policyModeCurrent = new THREE.Vector3(1, 0, 0);

// Camera auto-rotate eased value (starts at 0 on network entry, ramps in)
let cameraRotateCurrent = 0;
let lastFrameTime = 0;

// ─── Section 2: Inline GLSL Shaders ─────────────────────────────────────────

const simVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const simFrag = /* glsl */ `
uniform sampler2D uPositions;
uniform float uTime;
uniform float uDeltaTime;
uniform float uFrequency;
uniform float uTurbulence;
uniform float uCurlSpeed;
uniform float uRestoreForce;
uniform float uRadius;
uniform float uShellDeform;
uniform float uClusterForce;
uniform float uClusterCount;
uniform sampler2D uTargets;
uniform float uLogoResolve;
uniform float uLogoForce;
uniform float uLogoBreath;
uniform float uLogoActivity;
uniform float uLogoArmScale;
uniform float uLogoArmWidth;
uniform float uLogoPulseTravelSeconds;
uniform float uLogoPulseArmStagger;
uniform float uLogoPulseCycleSeconds;
// Network-mode uniforms
uniform float uNetworkMode;
uniform float uBuildProgress;
uniform float uTeamBiasStrength;
uniform sampler2D uTeamData;
uniform sampler2D uRoleData;
uniform sampler2D uSignalsTex;
uniform sampler2D uNodeTex;
uniform sampler2D uEdgeTex;
uniform sampler2D uNetworkTargets;
uniform vec3 uPolicyModeWeights;
uniform float uPolicyEventCount;
uniform vec4 uPolicyEventA[8];
uniform vec4 uPolicyEventB[8];
uniform vec4 uPolicyEventC[8];
uniform vec4 uPolicyEventD[8];
// Plasma-mode uniforms
uniform float uPlasmaResolve;
uniform float uPlasmaActivatedRatio;
uniform float uPlasmaFilamentCount;
uniform float uPlasmaSpeed;
uniform float uPlasmaForce;
uniform float uPlasmaCycle;
uniform float uPlasmaCoreTightness;
uniform float uPlasmaShellTurbulence;
varying vec2 vUv;

// --- Ashima Arts 3D simplex noise ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(27.619, 57.583))) * 43758.5453123);
}

float saturate(float v) {
  return clamp(v, 0.0, 1.0);
}

float gaussian(float delta, float width) {
  float x = delta / max(width, 0.001);
  return exp(-x * x * 0.5);
}

float smootherstep(float v) {
  v = saturate(v);
  return v * v * v * (v * (v * 6.0 - 15.0) + 10.0);
}

float cyclicDistance(float a, float b, float period) {
  float d = abs(a - b);
  return min(d, period - d);
}

vec3 agentAnchor(float index, float t) {
  float seed = index + 1.0;
  float angle = seed * 2.399963 + t * (0.22 + hash21(vec2(seed, 4.0)) * 0.18);
  float y = sin(seed * 1.17 + t * 0.31) * 0.55;
  float r = sqrt(max(0.0, 1.0 - y * y));
  return normalize(vec3(cos(angle) * r, y, sin(angle) * r));
}

vec3 curlNoise(vec3 p) {
  float e = 0.01;
  float n1, n2;
  vec3 curl;
  n1 = snoise(vec3(p.x, p.y + e, p.z));
  n2 = snoise(vec3(p.x, p.y - e, p.z));
  float a = (n1 - n2) / (2.0 * e);
  n1 = snoise(vec3(p.x, p.y, p.z + e));
  n2 = snoise(vec3(p.x, p.y, p.z - e));
  float b = (n1 - n2) / (2.0 * e);
  curl.x = a - b;
  n1 = snoise(vec3(p.x, p.y, p.z + e));
  n2 = snoise(vec3(p.x, p.y, p.z - e));
  a = (n1 - n2) / (2.0 * e);
  n1 = snoise(vec3(p.x + e, p.y, p.z));
  n2 = snoise(vec3(p.x - e, p.y, p.z));
  b = (n1 - n2) / (2.0 * e);
  curl.y = a - b;
  n1 = snoise(vec3(p.x + e, p.y, p.z));
  n2 = snoise(vec3(p.x - e, p.y, p.z));
  a = (n1 - n2) / (2.0 * e);
  n1 = snoise(vec3(p.x, p.y + e, p.z));
  n2 = snoise(vec3(p.x, p.y - e, p.z));
  b = (n1 - n2) / (2.0 * e);
  curl.z = a - b;
  return curl;
}

// Network-mode helpers
vec3 readNode(float idx) {
  return texture2D(uNodeTex, vec2((idx + 0.5) / 32.0, 0.5)).xyz;
}
vec4 readEdge(float idx) {
  return texture2D(uEdgeTex, vec2((idx + 0.5) / 64.0, 0.5));
}
vec4 readSignal(float idx) {
  return texture2D(uSignalsTex, vec2((idx + 0.5) / 32.0, 0.5));
}

void main() {
  vec4 posData = texture2D(uPositions, vUv);
  vec3 p = posData.xyz;
  float phase = snoise(vec3(vUv * 50.0, 0.0)) * 0.5;
  float t = uTime * uCurlSpeed + phase;
  vec3 noisePos = p * uFrequency + t;
  float dt = uDeltaTime > 0.0001 ? uDeltaTime : 0.016;

  if (uPlasmaResolve > 0.001) {
    // ═══════════════ PLASMA MODE ═══════════════
    float a = hash21(vUv * 113.7 + 2.1);
    float b = hash21(vUv * 271.3 + 8.4);
    float theta = a * 6.2831853 + uTime * uPlasmaSpeed * 0.08 * (hash21(vUv + 19.1) - 0.5);
    float y = b * 2.0 - 1.0;
    float ring = sqrt(max(0.0, 1.0 - y * y));
    vec3 dir = normalize(vec3(cos(theta) * ring, y, sin(theta) * ring));

    float veinA = abs(snoise(dir * 4.8 + vec3(uTime * 0.06, 1.7, 0.0)));
    float veinB = abs(snoise(dir * 9.0 + vec3(5.1, uTime * 0.05, 2.2)));
    float filament = smoothstep(0.44, 0.95, veinA) * 0.68 + smoothstep(0.58, 0.96, veinB) * 0.42;
    float hole = smoothstep(0.18, 0.62, abs(snoise(dir * 3.2 + 12.4)));
    float radius = uRadius * (0.94 + filament * 0.075 - (1.0 - hole) * 0.08);

    vec3 lateral = curlNoise(dir * 3.0 + uTime * 0.05) * 0.22 * uPlasmaShellTurbulence;
    vec3 plasmaTarget = normalize(dir + lateral * 0.035) * radius;
    vec3 ambient = p + curlNoise(noisePos) * uPlasmaShellTurbulence * 0.18 * dt;
    float stiffness = mix(1.4, uPlasmaForce, uPlasmaResolve);
    float k = 1.0 - exp(-dt * stiffness);
    p = mix(ambient, plasmaTarget, k * uPlasmaResolve);

    gl_FragColor = vec4(p, 1.0);

  } else if (uNetworkMode > 0.5) {
    // ═══════════════ NETWORK MODE ═══════════════
    vec4 roleD = texture2D(uRoleData, vUv);
    float signalSlot = roleD.r;
    float phaseOff = roleD.g;
    vec2 lateral = roleD.ba;

    float buildEase = smoothstep(0.0, 1.0, uBuildProgress);
    vec4 networkData = texture2D(uNetworkTargets, vUv);
    vec3 skeletonTarget = networkData.xyz;
    float lanePhase = fract(networkData.w + hash21(vUv * 19.7) * 0.045);
    float scanPhase = fract(uTime * 0.115 + 0.18);
    float laneDelta = abs(lanePhase - scanPhase);
    laneDelta = min(laneDelta, 1.0 - laneDelta);
    float scan = smoothstep(0.13, 0.0, laneDelta) * buildEase;
    float cluster = smoothstep(0.075, 0.0, laneDelta) * buildEase;
    vec3 tangentFlow = normalize(vec3(
      snoise(vec3(lanePhase * 9.0, 0.0, 1.0)),
      snoise(vec3(lanePhase * 9.0, 2.0, 3.0)),
      snoise(vec3(lanePhase * 9.0, 4.0, 5.0))
    ));
    vec3 orbitAxis = normalize(cross(normalize(skeletonTarget + vec3(0.001)), tangentFlow));
    vec3 orbital = orbitAxis * sin(uTime * 2.0 + phaseOff * 6.2831853) * 0.18;
    vec3 livingNoise = curlNoise(skeletonTarget * 0.24 + uTime * 0.08) * 0.18;
    vec3 torusTarget = skeletonTarget + livingNoise + orbital * (0.35 + cluster);

    vec3 ambientP = p + curlNoise(noisePos) * uTurbulence * 0.18 * dt;
    ambientP = mix(ambientP, torusTarget, buildEase * (0.78 + cluster * 0.22));

    float policyInfluence = 0.0;
    vec3 policyTarget = ambientP;
    for (int i = 0; i < 8; i++) {
      if (float(i) >= uPolicyEventCount) continue;

      vec4 eventData = uPolicyEventA[i];
      vec4 startData = uPolicyEventB[i];
      vec4 endData = uPolicyEventC[i];
      vec4 alternateData = uPolicyEventD[i];

      vec3 eventPos = eventData.xyz;
      float temporalEnvelope = eventData.w;
      vec3 edgeStart = startData.xyz;
      float policyKind = startData.w;
      vec3 edgeEnd = endData.xyz;
      float blockT = endData.w;
      vec3 edge = edgeEnd - edgeStart;
      float edgeLenSq = max(dot(edge, edge), 0.0001);
      float edgeT = clamp(dot(p - edgeStart, edge) / edgeLenSq, 0.0, 1.0);
      vec3 edgePoint = edgeStart + edge * edgeT;
      float edgeDistance = length(p - edgePoint);
      float eventDistance = length(p - eventPos);
      float eventRadius = 3.15;
      float edgeTubeRadius = 1.55;
      float eventFalloff = 1.0 - smoothstep(0.0, eventRadius, eventDistance);
      float edgeFalloff = 1.0 - smoothstep(0.0, edgeTubeRadius, edgeDistance);
      float influence =
        eventFalloff *
        edgeFalloff *
        temporalEnvelope;

      vec3 compressed = eventPos + (edgePoint - eventPos) * 0.42;
      if (policyKind > 1.5 && policyKind < 2.5) {
        policyTarget = mix(policyTarget, compressed, influence * 0.48);
        policyInfluence = max(policyInfluence, influence);
      } else if (policyKind > 2.5 && policyKind < 3.5) {
        vec3 routedTarget = compressed;
        if (alternateData.w > 0.5) {
          vec3 route = alternateData.xyz - eventPos;
          float routeLen = max(length(route), 0.001);
          vec3 routeDir = route / routeLen;
          float routeT = clamp(dot(p - eventPos, routeDir) / routeLen, 0.0, 1.0);
          routeT = max(routeT, smoothstep(blockT, 1.0, edgeT) * 0.36);
          routedTarget = mix(eventPos, alternateData.xyz, routeT);
        }
        policyTarget = mix(policyTarget, routedTarget, influence * 0.46);
        policyInfluence = max(policyInfluence, influence);
      }
    }

    // --- SIGNAL TARGET ---
    float roleBlend = 0.0;
    vec3 signalTarget = ambientP;
    float signalKind = 0.0;

    if (signalSlot >= 0.0) {
      vec4 sig = readSignal(signalSlot);
      float edgeIdx = sig.r;
      float signalT = sig.g;
      float sigKind = sig.b;
      float age = sig.a;

      if (edgeIdx >= 0.0 && age >= 0.0) {
        vec4 edge = readEdge(edgeIdx);
        vec3 nodeFrom = readNode(edge.r);
        vec3 nodeTo = readNode(edge.g);
        float edgeKind = edge.b;
        float blockAt = edge.a;

        // Each particle has a per-particle phase offset along the pulse window
        float windowSpread = 0.18;
        float particleT = clamp(signalT + (phaseOff - 0.5) * windowSpread, 0.0, 1.0);

        // Path base + lateral
        vec3 axis = nodeTo - nodeFrom;
        float axisLen = length(axis);
        vec3 axisDir = axisLen > 0.001 ? axis / axisLen : vec3(1.0, 0.0, 0.0);
        vec3 worldUp = abs(axisDir.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 rightAx = normalize(cross(axisDir, worldUp));
        vec3 upAx = normalize(cross(rightAx, axisDir));
        vec3 pathPos = mix(nodeFrom, nodeTo, particleT)
                       + rightAx * lateral.x * 0.32
                       + upAx * lateral.y * 0.32;

        // ===== POLICY MODE A: punishing & legible =====
        vec3 modeA = pathPos;
        if (edgeKind > 1.5 && edgeKind < 2.5) {
          // BLOCKED: hard stop + scatter
          if (particleT > blockAt) {
            vec3 stopPos = mix(nodeFrom, nodeTo, blockAt);
            float scatter = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
            vec3 jitter = vec3(
              snoise(vec3(vUv * 100.0, uTime * 0.7)),
              snoise(vec3(vUv * 100.0 + 13.0, uTime * 0.65)),
              snoise(vec3(vUv * 100.0 + 27.0, uTime * 0.8))
            );
            modeA = stopPos + jitter * scatter * 1.3 + rightAx * lateral.x * 0.4 + upAx * lateral.y * 0.4;
          }
        } else if (edgeKind > 2.5 && edgeKind < 3.5) {
          // REROUTED: 90° bend at blockAt
          if (particleT > blockAt) {
            vec3 bendStart = mix(nodeFrom, nodeTo, blockAt);
            float postT = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
            vec3 bendDir = rightAx * (lateral.x >= 0.0 ? 1.0 : -1.0);
            modeA = bendStart + bendDir * postT * (1.0 - blockAt) * axisLen + upAx * lateral.y * 0.32;
          }
        } else if (edgeKind > 3.5) {
          // DISSOLVED: scatter outward beyond blockAt
          if (particleT > blockAt) {
            float dissolveT = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
            vec3 outward = normalize(pathPos - vec3(0.0, 0.0, 0.0)) * dissolveT * 1.4;
            modeA = pathPos + outward + rightAx * dissolveT * lateral.x * 0.6;
          }
        }

        // ===== POLICY MODE B: atmospheric & subtle =====
        vec3 modeB = pathPos;
        if (edgeKind > 1.5) {
          // Generic: gentle slowdown + drift to neighbor
          float beyond = max(0.0, particleT - (blockAt - 0.12));
          float fadeOut = smoothstep(0.0, 0.35, beyond);
          vec3 drift = (rightAx * lateral.x + upAx * lateral.y) * fadeOut * 0.9;
          // Slow particleT progress (visual: pull back toward blockAt)
          float slowedT = mix(particleT, blockAt, fadeOut * 0.55);
          vec3 slowedPos = mix(nodeFrom, nodeTo, slowedT)
                           + rightAx * lateral.x * 0.32
                           + upAx * lateral.y * 0.32;
          modeB = slowedPos + drift;
        }

        // ===== POLICY MODE C: toroidal particle shell =====
        vec3 modeC = pathPos;
        if (edgeKind > 1.5) {
          // Recruit half the particles into a ring around blockAt position; let others pass
          vec3 ringCenter = mix(nodeFrom, nodeTo, blockAt);
          float ringWindow = smoothstep(blockAt - 0.18, blockAt, signalT) *
                             (1.0 - smoothstep(blockAt + 0.12, blockAt + 0.32, signalT));
          if (ringWindow > 0.0 && phaseOff < 0.55) {
            float ringAngle = phaseOff * 6.2831853 * 1.6 + uTime * 1.2;
            float ringRadius = 0.95 + lateral.x * 0.12;
            vec3 ringOffset = rightAx * cos(ringAngle) * ringRadius + upAx * sin(ringAngle) * ringRadius;
            modeC = mix(pathPos, ringCenter + ringOffset, ringWindow);
          } else {
            // Other half outcome depends on kind: pass through (blocked → eventual stop, rerouted → bend, dissolved → fade)
            if (edgeKind > 3.5) {
              // dissolved: fade outward after blockAt
              if (particleT > blockAt + 0.15) {
                float fT = (particleT - blockAt - 0.15) / max(0.85 - blockAt, 0.001);
                modeC = pathPos + normalize(pathPos) * fT * 0.8;
              }
            } else if (edgeKind > 2.5) {
              // rerouted: small bend
              if (particleT > blockAt) {
                float postT = (particleT - blockAt) / max(1.0 - blockAt, 0.001);
                modeC = pathPos + rightAx * postT * 1.6;
              }
            }
            // blocked → just hit the shell and stop; pathPos already clamps via window below
          }
        }

        // Crossfade modes
        vec3 modedPos = modeA * uPolicyModeWeights.x +
                        modeB * uPolicyModeWeights.y +
                        modeC * uPolicyModeWeights.z;

        signalTarget = modedPos;
        signalKind = edgeKind;

        // Role blend: smooth fade-in by age, smooth pulse-window envelope
        float fadeIn = smoothstep(0.0, 0.35, age);
        float fadeOutByT = 1.0 - smoothstep(0.88, 1.0, signalT);
        // Particle visible mostly when their particleT is near signalT (already by phaseOff)
        // Plus envelope on signalT itself
        roleBlend = fadeIn * fadeOutByT;
      }
    }

    // Final target blend
    float policyBlend = clamp(policyInfluence, 0.0, 1.0);
    float ambientRole = max(roleBlend, scan * 0.58 + cluster * 0.24);
    float policyPack = smoothstep(0.0, 0.08, policyBlend);
    float roleState = mix(ambientRole, -policyBlend, policyPack);
    vec3 target = mix(ambientP, signalTarget, max(roleBlend, 0.0));
    target = mix(target, policyTarget, clamp(policyBlend, 0.0, 0.44));

    // Exponential smoothing — stiffness varies by role
    float stiffness = mix(1.8, 6.4, max(ambientRole, policyBlend));
    float k = 1.0 - exp(-dt * stiffness);
    p = mix(p, target, k);

    // Pack roleBlend in alpha for vertex shader
    gl_FragColor = vec4(p, roleState);

  } else {
    // ═══════════════ LOGO MODE ═══════════════
    float orbInfluence = 1.0 - smoothstep(0.35, 0.92, uLogoResolve);

    vec3 vel = curlNoise(noisePos) * uTurbulence;
    vel += curlNoise(noisePos * 2.0 + 7.33) * uTurbulence * 0.4;
    vel += curlNoise(noisePos * 4.0 + 13.7) * uTurbulence * 0.25;
    vel *= orbInfluence;
    p += vel * 0.016;

    float group = floor(hash21(vUv * 83.0) * uClusterCount);
    float clusterPhase = hash21(vec2(group, group * 1.37)) * 6.2831853;
    float clusterWave = sin(uTime * 1.45 + clusterPhase) * 0.5 + 0.5;
    float gather = smoothstep(0.52, 0.96, clusterWave);
    vec3 anchorDir = agentAnchor(group, uTime);
    float anchorRadius = uRadius + snoise(anchorDir * 1.7 + uTime * 0.18) * uShellDeform * 0.65;
    vec3 anchor = anchorDir * anchorRadius;
    p += (anchor - p) * gather * uClusterForce * orbInfluence * 0.016;

    float dist = length(p);
    if (dist > 0.001) {
      vec3 dir = normalize(p);
      float targetR = uRadius + snoise(dir * 1.5 + uTime * 0.15) * uShellDeform;
      float nd = (dist - targetR) / uRadius;
      float restore = nd * nd * sign(nd);
      p -= dir * restore * uRestoreForce * uRadius * orbInfluence * 0.016;
    }

    vec4 logoData = texture2D(uTargets, vUv);
    vec3 logoTarget = logoData.xyz;
    float armSlot = floor(logoData.w * 8.0);
    float armAngle = armSlot * 0.78539816339;
    vec2 armDir = vec2(cos(armAngle), sin(armAngle));
    vec2 armPerp = vec2(-armDir.y, armDir.x);
    float isHubArm = 1.0 - step(0.5, armSlot);
    float innerRadius = mix(3.15, -1.65, isHubArm);
    float outerRadius = 12.5;
    float armCenter = (innerRadius + outerRadius) * 0.5;
    float halfLength = (outerRadius - innerRadius) * 0.5 * uLogoArmScale;
    float armStart = armCenter - halfLength;
    float armEnd = armCenter + halfLength;
    float along = dot(logoTarget.xy, armDir);
    float signedCross = dot(logoTarget.xy, armPerp);
    float crossDist = abs(signedCross);
    float armT = saturate((along - armStart) / max(armEnd - armStart, 0.001));
    float halfWidth = 0.7 * uLogoArmWidth;
    float crossMask = 1.0 - smoothstep(halfWidth * 0.24, halfWidth * 1.08, crossDist);
    float resolveField = smoothstep(0.04, 0.98, uLogoResolve);

    float armStagger = 0.014 + hash21(vec2(armSlot + 0.37, 4.2)) * 0.018;
    float waveHead = (uLogoResolve - armStagger) * 1.14;
    float waveGate = smoothstep(-0.08, 0.04, waveHead) * (1.0 - smoothstep(1.03, 1.22, waveHead));
    float leadingEdge = gaussian(armT - waveHead, 0.052) * waveGate;
    float waveBody = gaussian(armT - (waveHead - 0.075), 0.125) * waveGate;
    float waveTail = gaussian(armT - (waveHead - 0.19), 0.18) * waveGate;

    float settled = smoothstep(0.86, 1.0, uLogoResolve);
    float keepTravel = max(uLogoPulseTravelSeconds, 0.45);
    float keepPeriod = max(uLogoPulseCycleSeconds, keepTravel + 1.05);
    float keepCycleIndex = floor(uTime / keepPeriod);
    float keepCycleTime = uTime - keepCycleIndex * keepPeriod;
    float armStartRoll = hash21(vec2(armSlot + keepCycleIndex * 3.17, keepCycleIndex + 8.1));
    float armEnergyRoll = hash21(vec2(armSlot + keepCycleIndex * 5.13, keepCycleIndex + 19.4));
    float armStartDelay = armStartRoll * max(uLogoPulseArmStagger, 0.0);
    float armPulseStrength = 0.18 + 0.82 * smoothstep(0.24, 0.68, armEnergyRoll);
    float keepLocalTime = keepCycleTime - armStartDelay;
    float keepHead = (keepLocalTime - 0.18) / keepTravel;
    float keepGate =
      smoothstep(0.0, 0.26, keepLocalTime) *
      (1.0 - smoothstep(keepTravel + 0.34, keepTravel + 0.84, keepLocalTime)) *
      settled *
      armPulseStrength;
    float keepLead = gaussian(armT - keepHead, 0.06) * keepGate;
    float keepBody = gaussian(armT - (keepHead - 0.11), 0.155) * keepGate;
    float keepTail = gaussian(armT - (keepHead - 0.29), 0.24) * keepGate;
    float keepBreath = (0.5 + 0.5 * sin(uTime * 6.2831853 / keepPeriod + armStartRoll * 0.45)) * 0.05 * settled;

    float guideLead = (leadingEdge * 0.82 + keepLead * 0.66) * crossMask * resolveField;
    float guideBody = (waveBody * 0.62 + keepBody * 0.72 + keepBreath * 0.16) * crossMask * resolveField;
    float guideTail = (waveTail * 0.35 + keepTail * 0.38 + keepBreath * 0.08) * crossMask * resolveField;
    float guideEnergy = saturate(guideLead + guideBody * 0.72 + guideTail * 0.42);
    float passedWave = smoothstep(-0.08, 0.13, waveHead - armT) * waveGate;
    float regionalResolve = saturate(
      uLogoResolve * 0.32 +
      passedWave * 0.52 +
      guideEnergy * 0.18 +
      smoothstep(0.86, 1.0, uLogoResolve) * 0.74
    );

    float correctionCycle = uTime / 13.7;
    float correctionIndex = floor(correctionCycle);
    float correctionPhase = fract(correctionCycle);
    float correctionArm = mod(correctionIndex * 5.0 + 2.0, 8.0);
    float correctionMatch = 1.0 - step(0.5, abs(armSlot - correctionArm));
    float correctionT = 0.34 + hash21(vec2(correctionIndex + 9.1, correctionArm + 2.7)) * 0.42;
    float correctionRegion = gaussian(armT - correctionT, 0.052) * crossMask * correctionMatch * settled;
    float correctionEnvelope =
      smoothstep(0.08, 0.24, correctionPhase) *
      (1.0 - smoothstep(0.58, 0.9, correctionPhase));
    float correctionCatch =
      smoothstep(0.28, 0.66, correctionPhase) *
      (1.0 - smoothstep(0.76, 0.98, correctionPhase));
    float correction = correctionRegion * correctionEnvelope * 0.08;
    float catchField = correctionRegion * correctionCatch * 0.16;

    vec2 centerlinePull =
      -armPerp * signedCross * (guideLead * 0.2 + guideBody * 0.095 + guideTail * 0.04 + catchField * 0.08);
    vec2 pressureSwell =
      armDir * (guideLead * 0.055 + guideBody * 0.18 - guideTail * 0.035 + keepBreath * 0.014) * (0.72 + armT * 0.28);
    vec2 widthBreath =
      armPerp * sign(signedCross) * halfWidth * (guideBody * 0.055 - guideLead * 0.016 + keepBreath * 0.01);
    vec2 correctionDrift =
      armPerp * sign(sin(correctionIndex * 12.91 + armSlot * 2.7)) * halfWidth * correction * 0.24;

    vec3 materialFlow = curlNoise(vec3(logoTarget.xy * 0.115, uTime * 0.11 + armSlot * 0.23));
    materialFlow *= uLogoActivity * 0.19 * settled * (0.35 + crossMask * 0.65);

    logoTarget.xy += centerlinePull + pressureSwell + widthBreath + correctionDrift + materialFlow.xy;
    logoTarget.z *= 1.0 - guideLead * 0.075 - catchField * 0.06 + guideBody * 0.04;
    logoTarget.z += materialFlow.z * 0.28;
    logoTarget.z += sin(uTime * 0.55 + armSlot * 1.7 + armT * 2.4) * uLogoBreath * 0.16 * settled * crossMask;

    float logoStiffness = uLogoForce * (1.35 + guideLead * 1.12 + guideBody * 0.56 + guideTail * 0.36 + catchField * 0.5);
    float logoK = 1.0 - exp(-dt * logoStiffness * regionalResolve);
    p = mix(p, logoTarget, logoK);

    float logoVisualEnergy = saturate(guideLead * 0.7 + guideBody * 0.88 + guideTail * 0.3);
    float correctionVisual = saturate(correctionRegion * correctionEnvelope * 0.015);
    float logoRole = saturate(logoVisualEnergy + correctionVisual);
    gl_FragColor = vec4(p, logoRole);
  }
}
`;

const orbVert = /* glsl */ `
uniform sampler2D uPositions;
uniform sampler2D uRoleData;
uniform sampler2D uSignalsTex;
uniform sampler2D uEdgeTex;
uniform sampler2D uNetworkTargets;
uniform float uPolicyEventCount;
uniform vec4 uPolicyEventA[8];
uniform vec4 uPolicyEventB[8];
uniform vec4 uPolicyEventC[8];
uniform float uPointSize;
uniform float uDepthFade;
uniform float uTime;
uniform float uNetworkMode;
uniform vec3 uParticleColor;
uniform vec3 uSignalColor;
uniform vec3 uBlockedColor;
uniform vec3 uReroutedColor;
uniform vec3 uRejectedColor;
// Plasma color uniforms
uniform float uPlasmaResolve;
uniform float uPlasmaActivatedRatio;
uniform float uPlasmaSpeed;
uniform float uPlasmaCycle;
uniform vec3 uPlasmaShellColor;
uniform vec3 uPaletteHot;
uniform vec3 uPaletteWarm;
uniform vec3 uPaletteEmber;
uniform float uBreathPeriod;
uniform float uBreathHueRange;
uniform float uBreathBrightness;
varying float vBrightness;
varying vec3 vColor;
varying float vRoleBlend;
varying float vPolicyInfluence;

float hash21Orb(vec2 p) {
  return fract(sin(dot(p, vec2(27.619, 57.583))) * 43758.5453123);
}

vec3 rgb2hsl(vec3 c) {
  float maxC = max(max(c.r, c.g), c.b);
  float minC = min(min(c.r, c.g), c.b);
  float l = (maxC + minC) * 0.5;
  float d = maxC - minC;
  float h = 0.0;
  float s = 0.0;
  if (d > 1e-5) {
    s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);
    if (maxC == c.r) h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
    else if (maxC == c.g) h = (c.b - c.r) / d + 2.0;
    else h = (c.r - c.g) / d + 4.0;
    h /= 6.0;
  }
  return vec3(h, s, l);
}

float hue2rgb(float p, float q, float t) {
  if (t < 0.0) t += 1.0;
  if (t > 1.0) t -= 1.0;
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 0.5) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

vec3 hsl2rgb(vec3 hsl) {
  float h = hsl.x;
  float s = hsl.y;
  float l = hsl.z;
  if (s < 1e-5) return vec3(l);
  float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
  float p = 2.0 * l - q;
  return vec3(hue2rgb(p, q, h + 1.0 / 3.0), hue2rgb(p, q, h), hue2rgb(p, q, h - 1.0 / 3.0));
}

void main() {
  vec4 posData = texture2D(uPositions, position.xy);
  vec3 pos = posData.xyz;
  float roleState = posData.w;
  float policyInfluence = clamp(-roleState, 0.0, 1.0);
  float positiveRole = clamp(roleState, 0.0, 1.0);
  float isLogoMode = (1.0 - step(0.5, uNetworkMode)) * (1.0 - step(0.001, uPlasmaResolve));
  float roleBlend = max(positiveRole, policyInfluence * 0.12);
  vRoleBlend = mix(roleBlend, 0.0, isLogoMode);
  vPolicyInfluence = mix(policyInfluence, 0.0, isLogoMode);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = -mvPos.z;
  float networkSizeBoost = mix(1.0, 1.55, roleBlend);
  float logoSizeBoost = 1.0 + positiveRole * 0.68;
  float sizeBoost = mix(networkSizeBoost, logoSizeBoost, isLogoMode);
  gl_PointSize = uPointSize * sizeBoost * (72.0 / depth);

  vBrightness = 1.0 - uDepthFade * smoothstep(10.0, 50.0, depth);

  vec3 color = uParticleColor;

  if (isLogoMode > 0.5) {
    vBrightness *= 1.0;
  }

  // ═══════════════ PLASMA COLOR (sunset gradient + breath) ═══════════════
  if (uPlasmaResolve > 0.001) {
    float activated = step(hash21Orb(position.xy + 11.1), uPlasmaActivatedRatio);
    float phaseOffset = hash21Orb(position.xy + 3.7);
    float cycle = max(uPlasmaCycle, 0.001);
    float phaseRaw = mod(uTime * uPlasmaSpeed + phaseOffset * cycle, cycle);
    float phase = phaseRaw / cycle;

    // Whoosh: sample sunset palette along stroke phase
    // hot → warm at phase 0.5 → ember at phase 1.0
    vec3 strokeColor = phase < 0.5
      ? mix(uPaletteHot, uPaletteWarm, phase * 2.0)
      : mix(uPaletteWarm, uPaletteEmber, (phase - 0.5) * 2.0);

    // Slow breath: HSL hue rotation + brightness oscillation
    float breathPeriod = max(uBreathPeriod, 0.5);
    float breathT = sin(uTime * 6.2831853 / breathPeriod);
    vec3 hsl = rgb2hsl(strokeColor);
    hsl.x = fract(hsl.x + (breathT * uBreathHueRange) / 360.0 + 1.0);
    vec3 breathed = hsl2rgb(hsl) * (1.0 + breathT * uBreathBrightness);

    // Shell particles get a plasma-only mono tint so they're visible against
    // the dark background — never mutates the shared uParticleColor.
    vec3 shellTint = mix(uParticleColor, uPlasmaShellColor, uPlasmaResolve);
    color = mix(shellTint, breathed, activated * uPlasmaResolve);

    // Filament-side brightness + size pop
    vBrightness *= 1.0 + 0.6 * activated * uPlasmaResolve;
    gl_PointSize *= 1.0 + 0.45 * activated * uPlasmaResolve;
  }

  if (uNetworkMode > 0.5) {
    vec3 policyPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    float directPolicyInfluence = 0.0;
    for (int i = 0; i < 8; i++) {
      if (float(i) >= uPolicyEventCount) continue;

      vec4 eventData = uPolicyEventA[i];
      vec3 eventPos = eventData.xyz;
      float temporalEnvelope = eventData.w;
      vec3 edgeStart = uPolicyEventB[i].xyz;
      vec3 edgeEnd = uPolicyEventC[i].xyz;
      vec3 edge = edgeEnd - edgeStart;
      float edgeLenSq = max(dot(edge, edge), 0.0001);
      float edgeT = clamp(dot(policyPos - edgeStart, edge) / edgeLenSq, 0.0, 1.0);
      vec3 edgePoint = edgeStart + edge * edgeT;
      float edgeDistance = length(policyPos - edgePoint);
      float eventDistance = length(policyPos - eventPos);
      float eventFalloff = 1.0 - smoothstep(0.0, 4.4, eventDistance);
      float edgeFalloff = 1.0 - smoothstep(0.0, 2.25, edgeDistance);
      directPolicyInfluence = max(
        directPolicyInfluence,
        eventFalloff * edgeFalloff * temporalEnvelope
      );
    }

    float policyColorMix = smoothstep(0.0, 0.28, max(policyInfluence, directPolicyInfluence));
    color = mix(color, uRejectedColor, policyColorMix);
    vBrightness *= 1.0 + policyColorMix * 0.18;
    gl_PointSize *= 1.0 + policyColorMix * 0.12;

    vec4 roleD = texture2D(uRoleData, position.xy);
    float signalSlot = roleD.r;
    if (signalSlot >= 0.0) {
      vec4 sig = texture2D(uSignalsTex, vec2((signalSlot + 0.5) / 32.0, 0.5));
      float edgeIdx = sig.r;
      if (edgeIdx >= 0.0) {
        vec4 edge = texture2D(uEdgeTex, vec2((edgeIdx + 0.5) / 64.0, 0.5));
        float kind = edge.b;
        vec3 sigCol = uSignalColor;
        if (kind > 1.5 && kind < 2.5) sigCol = uBlockedColor;
        else if (kind > 2.5 && kind < 3.5) sigCol = uReroutedColor;
        else if (kind > 3.5) sigCol = mix(uSignalColor, vec3(0.95, 0.95, 0.95), 0.6);
        color = mix(color, sigCol, positiveRole * (1.0 - policyInfluence));
      }
    }
  }

  vColor = color;
}
`;

const orbFrag = /* glsl */ `
uniform float uOpacity;
varying float vBrightness;
varying vec3 vColor;
varying float vRoleBlend;
varying float vPolicyInfluence;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.15, d);
  float roleAlpha = mix(1.0, 1.85, vRoleBlend);
  float policyCalm = mix(1.0, 0.94, vPolicyInfluence);
  gl_FragColor = vec4(vColor * vBrightness, alpha * uOpacity * roleAlpha * policyCalm);
}
`;

const postVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const vignetteFrag = /* glsl */ `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uDarkMode;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  float dist = length(vUv - 0.5) * 1.4;
  float edge = smoothstep(0.35, 1.05, dist);
  vec3 vignetteCol = mix(vec3(0.90), vec3(0.0), uDarkMode);
  color.rgb = mix(color.rgb, vignetteCol, edge * mix(0.025, 0.35, uDarkMode));
  gl_FragColor = color;
}
`;

// ─── Section 3: Renderer + Scene + Camera ────────────────────────────────────

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(APPEARANCE.backgroundColor);
document.body.appendChild(renderer.domElement);
document.body.style.background = APPEARANCE.backgroundColor;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 30;

const policyTorusWeb = new PolicyTorusWebManager({
  maxSlots: 220,
  motion: {
    ...POLICY_WEB,
    buildProgress: 0,
    growthPortion: 0.46,
    holdPortion: 0.34,
    fadePortion: 0.2,
  },
});
policyTorusWeb.object3d.visible = false;
scene.add(policyTorusWeb.object3d);

const plasmaParticleBudget = prefersReducedMotion || window.innerWidth < 720 ? 24000 : 90000;

const plasmaWebOrb = new PlasmaWebOrb({
  particleCount: plasmaParticleBudget,
  maxConnections: 26000,
  localDegree: 5,
  maxConnectionDistance: 1.5,
  pointSize: PLASMA_WEB.pointSize,
  pointOpacity: PLASMA_WEB.pointOpacity,
  lineOpacity: PLASMA_WEB.lineOpacity,
  motion: {
    rotationSpeed: PLASMA_WEB.rotationSpeed,
    breathStrength: PLASMA_WEB.breathStrength,
    breathAmplitude: PLASMA_WEB.breathAmplitude,
    breathSpeed: PLASMA_WEB.breathSpeed,
    strandDrift: PLASMA_WEB.strandDrift,
    surfaceJitter: PLASMA_WEB.surfaceJitter,
    connectionPulse: PLASMA_WEB.connectionPulse,
  },
});
const applyPlasmaWebCompositionScale = () => {
  plasmaWebOrb.group.scale.set(
    PLASMA_WEB.compositionWidth,
    PLASMA_WEB.compositionHeight,
    PLASMA_WEB.compositionWidth
  );
};
applyPlasmaWebCompositionScale();
plasmaWebOrb.group.visible = false;
scene.add(plasmaWebOrb.group);

const shardStack = new ShardStackArchitecture({
  particleCount: SHARDS.particleCount,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
  reducedMotion: prefersReducedMotion,
  palette: {
    background: SHARDS.backgroundColor,
    ink: SHARDS.inkColor,
    activity: SHARDS.activityColor,
    signal: SHARDS.signalColor,
    rejected: SHARDS.rejectedColor,
  },
  motion: {
    resolveDuration: SHARDS.resolveDuration,
    traceDuration: SHARDS.traceDuration,
    rotationSpeed: SHARDS.rotationSpeed,
    activity: SHARDS.activity,
    signalSpeed: SHARDS.signalSpeed,
    policyFadeIn: SHARDS.policyFadeIn,
    policyFadeOut: SHARDS.policyFadeOut,
  },
  visuals: {
    scale: SHARDS.scale,
    pointSize: SHARDS.pointSize,
    pointOpacity: SHARDS.pointOpacity,
    lineOpacity: SHARDS.lineOpacity,
    signalOpacity: SHARDS.signalOpacity,
  },
});
shardStack.group.visible = false;
scene.add(shardStack.group);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;

const tabFadeOutDurationMs = prefersReducedMotion ? 0 : 1000;
const tabFadeInDurationMs = prefersReducedMotion ? 0 : 850;
const tabFadeOutTransition = `opacity ${tabFadeOutDurationMs}ms linear`;
const tabFadeInTransition = `opacity ${tabFadeInDurationMs}ms linear`;
let tabFadeTimeout: number | undefined;
let tabFadeInTimeout: number | undefined;
let pendingExperiment: Experiment | null = null;

renderer.domElement.style.opacity = "1";
renderer.domElement.style.transition = prefersReducedMotion ? "none" : tabFadeOutTransition;
renderer.domElement.style.willChange = "opacity";

window.addEventListener("resize", () => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  plasmaWebOrb.setPixelRatio(pixelRatio);
  shardStack.setPixelRatio(pixelRatio);
});

// ─── Section 3b: Network — Invisible Node Attractors ─────────────────────────

type NetworkNode = {
  pos: THREE.Vector3;
  type: 0 | 1 | 2 | 3; // 0=equatorial, 1=mid-orbit, 2=polar/depth, 3=core
};

type NetworkEdge = {
  from: number;
  to: number;
  kind: 1 | 2 | 3 | 4; // 1=open, 2=blocked, 3=rerouted, 4=dissolved
  blockAt: number;
};

function buildNodeLayers(): NetworkNode[] {
  const nodes: NetworkNode[] = [];
  const R_EQ = 12.0;
  const R_MID = 10.0;
  const R_POLAR = 9.0;

  // 12 equatorial nodes (great-circle ring)
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    nodes.push({
      pos: new THREE.Vector3(Math.cos(angle) * R_EQ, 0, Math.sin(angle) * R_EQ),
      type: 0,
    });
  }

  // 5 mid-orbit satellites (~35° inclined ring)
  const incl = (35 * Math.PI) / 180;
  const cosI = Math.cos(incl);
  const sinI = Math.sin(incl);
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + 0.42;
    const x = Math.cos(angle) * R_MID;
    const yPlanar = Math.sin(angle) * R_MID;
    const y = yPlanar * cosI;
    const z = yPlanar * sinI;
    nodes.push({ pos: new THREE.Vector3(x, y, z), type: 1 });
  }

  // 3 polar/depth nodes
  nodes.push({ pos: new THREE.Vector3(0, R_POLAR, 0), type: 2 });
  nodes.push({ pos: new THREE.Vector3(0, -R_POLAR, 0), type: 2 });
  nodes.push({ pos: new THREE.Vector3(2.3, 4.6, 8.2), type: 2 });

  // Core anchor
  nodes.push({ pos: new THREE.Vector3(0, 0, 0), type: 3 });

  return nodes;
}

function buildEdges(nodes: NetworkNode[]): NetworkEdge[] {
  const edges: NetworkEdge[] = [];
  const pairs: [number, number][] = [];

  // Equatorial neighbor connections (round the ring)
  for (let i = 0; i < 12; i++) pairs.push([i, (i + 1) % 12]);
  // Equatorial cross-chords (some long-distance)
  pairs.push([0, 6], [3, 9], [1, 7], [4, 10], [2, 8], [5, 11]);

  // Mid-orbit to nearest equatorial
  for (let i = 0; i < 5; i++) {
    const midIdx = 12 + i;
    const eqTarget = (i * 2) % 12;
    pairs.push([midIdx, eqTarget]);
    pairs.push([midIdx, (eqTarget + 3) % 12]);
  }
  // Mid-orbit to mid-orbit (a few)
  pairs.push([12, 14], [13, 15], [12, 16]);

  // Polar to equatorial
  pairs.push([17, 0], [17, 3], [17, 8]);
  pairs.push([18, 1], [18, 6], [18, 10]);
  // Depth-polar
  pairs.push([19, 12], [19, 7], [19, 2]);

  // Core hub (selective)
  pairs.push([20, 17], [20, 18], [20, 14], [20, 5]);

  // Assign kind distribution: ~58% open, 16% blocked, 16% rerouted, 10% dissolved
  for (const [from, to] of pairs) {
    const r = Math.random();
    let kind: 1 | 2 | 3 | 4;
    if (r < 0.58) kind = 1;
    else if (r < 0.74) kind = 2;
    else if (r < 0.9) kind = 3;
    else kind = 4;
    edges.push({
      from,
      to,
      kind,
      blockAt: 0.4 + Math.random() * 0.25,
    });
  }

  return edges;
}

const networkNodes = buildNodeLayers();
const networkEdges = buildEdges(networkNodes);

function createNodeTex(nodes: NetworkNode[], maxNodes: number): THREE.DataTexture {
  const data = new Float32Array(maxNodes * 4);
  for (let i = 0; i < maxNodes; i++) {
    if (i < nodes.length) {
      data[i * 4 + 0] = nodes[i].pos.x;
      data[i * 4 + 1] = nodes[i].pos.y;
      data[i * 4 + 2] = nodes[i].pos.z;
      data[i * 4 + 3] = nodes[i].type;
    } else {
      data[i * 4 + 0] = 0;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = -1;
    }
  }
  const tex = new THREE.DataTexture(data, maxNodes, 1, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

function createEdgeTex(edges: NetworkEdge[], maxEdges: number): THREE.DataTexture {
  const data = new Float32Array(maxEdges * 4);
  for (let i = 0; i < maxEdges; i++) {
    if (i < edges.length) {
      data[i * 4 + 0] = edges[i].from;
      data[i * 4 + 1] = edges[i].to;
      data[i * 4 + 2] = edges[i].kind;
      data[i * 4 + 3] = edges[i].blockAt;
    } else {
      data[i * 4 + 0] = -1;
      data[i * 4 + 1] = -1;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 0;
    }
  }
  const tex = new THREE.DataTexture(data, maxEdges, 1, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

// ─── Section 3c: Network — Team Bias + Role Assignment Textures ──────────────

function createTeamDataTex(size: number): THREE.DataTexture {
  const data = new Float32Array(size * size * 4);

  // 6 teams, each carrying a portion of the swarm into an orbital volume.
  // Encoded as: { up: orbital plane normal, arcStart, arcEnd }
  type Team = { up: THREE.Vector3; arcStart: number; arcEnd: number };
  const incl35 = (35 * Math.PI) / 180;
  const teams: Team[] = [
    { up: new THREE.Vector3(0, 1, 0), arcStart: -Math.PI / 4, arcEnd: Math.PI / 4 },
    { up: new THREE.Vector3(0, 1, 0), arcStart: Math.PI / 4, arcEnd: (3 * Math.PI) / 4 },
    { up: new THREE.Vector3(0, 1, 0), arcStart: (3 * Math.PI) / 4, arcEnd: (5 * Math.PI) / 4 },
    { up: new THREE.Vector3(0, 1, 0), arcStart: (5 * Math.PI) / 4, arcEnd: (7 * Math.PI) / 4 },
    {
      up: new THREE.Vector3(Math.sin(incl35), Math.cos(incl35), 0).normalize(),
      arcStart: 0,
      arcEnd: Math.PI * 2,
    },
    {
      up: new THREE.Vector3(0.6, 0.4, 0.7).normalize(),
      arcStart: 0,
      arcEnd: Math.PI * 2,
    },
  ];

  for (let i = 0; i < size * size; i++) {
    const teamId = Math.floor(Math.random() * teams.length);
    const team = teams[teamId];
    const angle = team.arcStart + Math.random() * (team.arcEnd - team.arcStart);
    const up = team.up.clone().normalize();
    const ref = Math.abs(up.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const right = ref.clone().sub(up.clone().multiplyScalar(ref.dot(up))).normalize();
    const fwd = up.clone().cross(right).normalize();
    const point = right
      .clone()
      .multiplyScalar(Math.cos(angle))
      .add(fwd.clone().multiplyScalar(Math.sin(angle)));

    data[i * 4 + 0] = teamId;
    data[i * 4 + 1] = point.x;
    data[i * 4 + 2] = point.y;
    data[i * 4 + 3] = point.z;
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

function createRoleDataTex(size: number, maxSlots: number, recruitmentRate: number): THREE.DataTexture {
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const recruited = Math.random() < recruitmentRate;
    if (recruited) {
      data[i * 4 + 0] = Math.floor(Math.random() * maxSlots); // signalSlot 0..maxSlots-1
      data[i * 4 + 1] = Math.random(); // phaseOff (0..1, position in pulse window)
      data[i * 4 + 2] = (Math.random() - 0.5) * 2; // lateralA (-1..1)
      data[i * 4 + 3] = (Math.random() - 0.5) * 2; // lateralB (-1..1)
    } else {
      data[i * 4 + 0] = -1;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 0;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

// ─── Section 3d: Network — Signal Engine ─────────────────────────────────────

type ActiveSignal = {
  slot: number;
  edgeIdx: number;
  startTime: number;
  duration: number;
  kind: number;
};

class SignalEngine {
  private active = new Map<number, ActiveSignal>();
  private signalData: Float32Array<ArrayBuffer>;
  private nextSpawnTime = 0;
  signalTex: THREE.DataTexture;

  constructor(private maxSlots: number) {
    this.signalData = new Float32Array(new ArrayBuffer(maxSlots * 4 * 4));
    for (let i = 0; i < maxSlots; i++) {
      this.signalData[i * 4 + 0] = -1;
      this.signalData[i * 4 + 1] = 0;
      this.signalData[i * 4 + 2] = 0;
      this.signalData[i * 4 + 3] = -1;
    }
    this.signalTex = new THREE.DataTexture(
      this.signalData,
      maxSlots,
      1,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.signalTex.needsUpdate = true;
  }

  update(
    time: number,
    networkActive: boolean,
    buildProgress: number,
    params: {
      spawnRate: number;
      simultaneousCap: number;
      signalDuration: number;
      edges: NetworkEdge[];
    }
  ) {
    if (!networkActive || params.simultaneousCap <= 0) {
      // Clear all signals
      for (let i = 0; i < this.maxSlots; i++) {
        this.signalData[i * 4 + 0] = -1;
        this.signalData[i * 4 + 1] = 0;
        this.signalData[i * 4 + 2] = 0;
        this.signalData[i * 4 + 3] = -1;
      }
      this.active.clear();
      this.signalTex.needsUpdate = true;
      this.nextSpawnTime = 0;
      return;
    }

    // Retire completed signals
    for (const [slot, sig] of this.active) {
      const age = time - sig.startTime;
      if (age > sig.duration) {
        this.active.delete(slot);
        this.signalData[slot * 4 + 0] = -1;
        this.signalData[slot * 4 + 1] = 0;
        this.signalData[slot * 4 + 2] = 0;
        this.signalData[slot * 4 + 3] = -1;
      }
    }

    // Spawn ramp: during build, allow fewer pulses; first pulse waits ~1.5s
    const buildEase = THREE.MathUtils.smoothstep(buildProgress, 0.0, 1.0);
    const effectiveCap = Math.max(
      1,
      Math.round(THREE.MathUtils.lerp(1, params.simultaneousCap, buildEase))
    );
    const effectiveRate = THREE.MathUtils.lerp(0.55, params.spawnRate, buildEase);

    // Wait until ~1.5s after build start for first pulse
    if (this.nextSpawnTime === 0) {
      this.nextSpawnTime = time + 1.5;
    }

    while (this.active.size < effectiveCap && time >= this.nextSpawnTime) {
      const slot = this.findFreeSlot();
      if (slot < 0) break;
      const edge = params.edges[Math.floor(Math.random() * params.edges.length)];
      const edgeIdx = params.edges.indexOf(edge);
      const sig: ActiveSignal = {
        slot,
        edgeIdx,
        startTime: time,
        duration: params.signalDuration,
        kind: edge.kind,
      };
      this.active.set(slot, sig);
      this.nextSpawnTime = time + 1.0 / Math.max(effectiveRate, 0.01);
    }

    // Write active signal state
    for (const [slot, sig] of this.active) {
      const age = time - sig.startTime;
      const t = Math.min(age / sig.duration, 1.0);
      this.signalData[slot * 4 + 0] = sig.edgeIdx;
      this.signalData[slot * 4 + 1] = t;
      this.signalData[slot * 4 + 2] = sig.kind;
      this.signalData[slot * 4 + 3] = age;
    }

    this.signalTex.needsUpdate = true;
  }

  private findFreeSlot(): number {
    for (let i = 0; i < this.maxSlots; i++) {
      if (!this.active.has(i)) return i;
    }
    return -1;
  }

  resetForRebuild() {
    this.active.clear();
    for (let i = 0; i < this.maxSlots; i++) {
      this.signalData[i * 4 + 0] = -1;
      this.signalData[i * 4 + 1] = 0;
      this.signalData[i * 4 + 2] = 0;
      this.signalData[i * 4 + 3] = -1;
    }
    this.signalTex.needsUpdate = true;
    this.nextSpawnTime = 0;
  }
}

// ─── Section 3e: Debug — Optional Node Attractor Markers ─────────────────────

const attractorMarkers = new THREE.Group();
attractorMarkers.visible = false;
{
  const markerMat = new THREE.MeshBasicMaterial({
    color: 0xff8844,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });
  for (const node of networkNodes) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), markerMat);
    mesh.position.copy(node.pos);
    attractorMarkers.add(mesh);
  }
}
scene.add(attractorMarkers);

// ─── Section 3f: Network — Connection Lines (proximal particle pairs) ────────

function generateAnchors(count: number, radius: number, spread: number): THREE.Vector3[] {
  const anchors: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const rad = radius + (Math.random() - 0.5) * spread;
    anchors.push(
      new THREE.Vector3(Math.cos(theta) * r * rad, y * rad, Math.sin(theta) * r * rad)
    );
  }
  return anchors;
}

function buildAnchorPairs(anchors: THREE.Vector3[], maxDist: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 0; i < anchors.length; i++) {
    for (let j = i + 1; j < anchors.length; j++) {
      if (anchors[i].distanceTo(anchors[j]) <= maxDist) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

type Connection = {
  startAnchorIdx: number;
  endAnchorIdx: number;
  startTime: number;
  growthDuration: number;
  holdDuration: number;
  fadeDuration: number;
  blocked: boolean;
  blockedAt: number;
  blockFlashDur: number;
  blockFadeDur: number;
};

class ConnectionManager {
  private slots: (Connection | null)[];
  private positions: Float32Array<ArrayBuffer>;
  private colors: Float32Array<ArrayBuffer>;
  private geometry: THREE.BufferGeometry;
  private material: THREE.LineBasicMaterial;
  lineSegments: THREE.LineSegments;
  private nextSpawn = 0;
  private connectionColor = new THREE.Color();
  private blockedColor = new THREE.Color();

  constructor(
    private maxSlots: number,
    private anchors: THREE.Vector3[],
    private pairs: [number, number][]
  ) {
    this.slots = new Array(maxSlots).fill(null);
    this.positions = new Float32Array(new ArrayBuffer(maxSlots * 2 * 3 * 4));
    this.colors = new Float32Array(new ArrayBuffer(maxSlots * 2 * 3 * 4));

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.lineSegments = new THREE.LineSegments(this.geometry, this.material);
    this.lineSegments.frustumCulled = false;
    this.lineSegments.renderOrder = 5;
  }

  setColors(connection: string, blocked: string) {
    this.connectionColor.set(connection);
    this.blockedColor.set(blocked);
  }

  reset() {
    for (let i = 0; i < this.maxSlots; i++) this.slots[i] = null;
    for (let i = 0; i < this.positions.length; i++) this.positions[i] = 0;
    for (let i = 0; i < this.colors.length; i++) this.colors[i] = 0;
    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    this.nextSpawn = 0;
  }

  update(
    time: number,
    active: boolean,
    buildProgress: number,
    params: {
      spawnRate: number;
      blockedProbability: number;
      minDuration: number;
      maxDuration: number;
      maxConnections: number;
    }
  ) {
    if (!active) {
      this.reset();
      this.lineSegments.visible = false;
      return;
    }
    this.lineSegments.visible = true;

    if (this.nextSpawn === 0) this.nextSpawn = time + 1.4;

    const buildEase = THREE.MathUtils.smoothstep(buildProgress, 0, 1);
    const effectiveRate = THREE.MathUtils.lerp(1.5, params.spawnRate, buildEase);
    const cap = Math.min(this.maxSlots, params.maxConnections);
    const targetActive = Math.max(3, Math.floor(cap * (0.3 + 0.7 * buildEase)));

    // Retire expired
    for (let i = 0; i < this.slots.length; i++) {
      const c = this.slots[i];
      if (!c) continue;
      const totalLife = c.blocked
        ? c.growthDuration * c.blockedAt + c.blockFlashDur + c.blockFadeDur
        : c.growthDuration + c.holdDuration + c.fadeDuration;
      if (time - c.startTime > totalLife) this.slots[i] = null;
    }

    // Spawn new
    let activeCount = this.slots.filter((s) => s !== null).length;
    while (activeCount < targetActive && time >= this.nextSpawn) {
      let slot = -1;
      for (let i = 0; i < cap; i++) {
        if (this.slots[i] === null) {
          slot = i;
          break;
        }
      }
      if (slot < 0 || this.pairs.length === 0) break;
      const pair = this.pairs[Math.floor(Math.random() * this.pairs.length)];
      const blocked = Math.random() < params.blockedProbability;
      const dur = params.minDuration + Math.random() * (params.maxDuration - params.minDuration);
      this.slots[slot] = {
        startAnchorIdx: pair[0],
        endAnchorIdx: pair[1],
        startTime: time,
        growthDuration: dur * 0.55,
        holdDuration: dur * 0.25,
        fadeDuration: dur * 0.4,
        blocked,
        blockedAt: blocked ? 0.32 + Math.random() * 0.45 : 1.0,
        blockFlashDur: 0.16,
        blockFadeDur: 0.34,
      };
      activeCount++;
      this.nextSpawn = time + 1.0 / Math.max(effectiveRate, 0.1);
    }

    // Write geometry
    for (let i = 0; i < this.maxSlots; i++) {
      const c = this.slots[i];
      const baseIdx = i * 6;
      if (!c || i >= cap) {
        for (let k = 0; k < 6; k++) {
          this.positions[baseIdx + k] = 0;
          this.colors[baseIdx + k] = 0;
        }
        continue;
      }

      const start = this.anchors[c.startAnchorIdx];
      const end = this.anchors[c.endAnchorIdx];
      const age = time - c.startTime;

      let headT = 0;
      let alpha = 0;
      let col = this.connectionColor;

      if (c.blocked) {
        const growthBudget = c.growthDuration * c.blockedAt;
        if (age < growthBudget) {
          const e = age / Math.max(growthBudget, 0.0001);
          headT = c.blockedAt * (1 - Math.pow(1 - e, 2));
          alpha = THREE.MathUtils.smoothstep(e, 0, 0.18);
          col = this.connectionColor;
        } else {
          const blockedAge = age - growthBudget;
          headT = c.blockedAt;
          if (blockedAge < c.blockFlashDur) {
            alpha = 1.0;
            col = this.blockedColor;
          } else if (blockedAge < c.blockFlashDur + c.blockFadeDur) {
            alpha = 1.0 - (blockedAge - c.blockFlashDur) / c.blockFadeDur;
            col = this.blockedColor;
          } else {
            alpha = 0;
          }
        }
      } else {
        if (age < c.growthDuration) {
          const e = age / c.growthDuration;
          headT = 1.0 - Math.pow(1 - e, 2.5);
          alpha = THREE.MathUtils.smoothstep(e, 0, 0.18);
          col = this.connectionColor;
        } else if (age < c.growthDuration + c.holdDuration) {
          headT = 1.0;
          alpha = 1.0;
          col = this.connectionColor;
        } else {
          const fadeAge = age - c.growthDuration - c.holdDuration;
          headT = 1.0;
          alpha = Math.max(0, 1.0 - fadeAge / c.fadeDuration);
          col = this.connectionColor;
        }
      }

      const headX = start.x + (end.x - start.x) * headT;
      const headY = start.y + (end.y - start.y) * headT;
      const headZ = start.z + (end.z - start.z) * headT;

      this.positions[baseIdx + 0] = start.x;
      this.positions[baseIdx + 1] = start.y;
      this.positions[baseIdx + 2] = start.z;
      this.positions[baseIdx + 3] = headX;
      this.positions[baseIdx + 4] = headY;
      this.positions[baseIdx + 5] = headZ;

      // Additive blending: brighter vertex color = brighter line on dark bg.
      // Boost so connection amber pops next to particle stars.
      const boost = 2.4;
      const r = col.r * alpha * boost;
      const g = col.g * alpha * boost;
      const b = col.b * alpha * boost;
      this.colors[baseIdx + 0] = r;
      this.colors[baseIdx + 1] = g;
      this.colors[baseIdx + 2] = b;
      this.colors[baseIdx + 3] = r;
      this.colors[baseIdx + 4] = g;
      this.colors[baseIdx + 5] = b;
    }

    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }
}

const networkAnchors = generateAnchors(NETWORK.anchorCount, 11.0, 3.2);
const networkPairs = buildAnchorPairs(networkAnchors, NETWORK.anchorPairMaxDistance);
const connectionManager: ConnectionManager = new ConnectionManager(80, networkAnchors, networkPairs);
connectionManager.setColors(NETWORK.connectionColor, NETWORK.blockedColor);
connectionManager.lineSegments.visible = false;
scene.add(connectionManager.lineSegments);

// ─── Section 4: FBO Infrastructure ───────────────────────────────────────────

function createPositionsTexture(size: number, radius: number, spread: number) {
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius + (Math.random() - 0.5) * spread;
    data[i * 4 + 0] = r * Math.sin(phi) * Math.cos(theta);
    data[i * 4 + 1] = r * Math.sin(phi) * Math.sin(theta);
    data[i * 4 + 2] = r * Math.cos(phi);
    data[i * 4 + 3] = 1;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

function createLogoTargetsTexture(
  size: number,
  barDepth: number,
  armScale: number,
  armWidth: number
) {
  const data = new Float32Array(size * size * 4);
  const innerRadius = 3.15;
  const outerRadius = 12.5;
  const halfWidth = 0.7 * armWidth;
  const halfDepth = barDepth;
  const arms = [
    { angle: 0, inner: -1.65, outer: outerRadius },
    { angle: Math.PI * 0.25, inner: innerRadius, outer: outerRadius },
    { angle: Math.PI * 0.5, inner: innerRadius, outer: outerRadius },
    { angle: Math.PI * 0.75, inner: innerRadius, outer: outerRadius },
    { angle: Math.PI, inner: innerRadius, outer: outerRadius },
    { angle: Math.PI * 1.25, inner: innerRadius, outer: outerRadius },
    { angle: Math.PI * 1.5, inner: innerRadius, outer: outerRadius },
    { angle: Math.PI * 1.75, inner: innerRadius, outer: outerRadius },
  ];

  for (let i = 0; i < size * size; i++) {
    const arm = arms[i % arms.length];
    const angle = arm.angle;
    const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    const perpendicular = new THREE.Vector3(-dir.y, dir.x, 0);
    const center = (arm.inner + arm.outer) * 0.5;
    const halfLength = (arm.outer - arm.inner) * 0.5 * armScale;
    const along = center + (Math.random() - 0.5) * halfLength * 2;
    const across = (Math.random() - 0.5) * halfWidth * 2;
    const depth = (Math.random() - 0.5) * halfDepth * 2;
    const position = dir
      .clone()
      .multiplyScalar(along)
      .add(perpendicular.multiplyScalar(across));

    data[i * 4 + 0] = position.x;
    data[i * 4 + 1] = position.y;
    data[i * 4 + 2] = depth;
    data[i * 4 + 3] = ((i % arms.length) + 0.5) / arms.length;
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  tex.needsUpdate = true;
  return tex;
}

const fboOpts: THREE.RenderTargetOptions = {
  minFilter: THREE.NearestFilter,
  magFilter: THREE.NearestFilter,
  type: THREE.FloatType,
  depthBuffer: false,
  stencilBuffer: false,
};

let fboA = new THREE.WebGLRenderTarget(ORB.size, ORB.size, fboOpts);
let fboB = new THREE.WebGLRenderTarget(ORB.size, ORB.size, fboOpts);
let logoTargetsTex = createLogoTargetsTexture(ORB.size, ORB.logoDepth, ORB.logoScale, ORB.logoWidth);
const networkTargetsTex = createPolicyTorusTargetTexture(ORB.size);
const teamDataTex = createTeamDataTex(ORB.size);
const roleDataTex = createRoleDataTex(ORB.size, NETWORK_TUNING.maxSignals, NETWORK.recruitmentRate);
const nodeTex = createNodeTex(networkNodes, NETWORK_TUNING.maxNodes);
const edgeTex = createEdgeTex(networkEdges, NETWORK_TUNING.maxEdges);
const signalEngine = new SignalEngine(NETWORK_TUNING.maxSignals);

const simScene = new THREE.Scene();
const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const simMat = new THREE.ShaderMaterial({
  vertexShader: simVert,
  fragmentShader: simFrag,
  uniforms: {
    uPositions: { value: null },
    uTime: { value: 0 },
    uDeltaTime: { value: 0.016 },
    uFrequency: { value: ORB.frequency },
    uTurbulence: { value: ORB.turbulence },
    uCurlSpeed: { value: ORB.curlSpeed },
    uRestoreForce: { value: ORB.restoreForce },
    uRadius: { value: ORB.radius },
    uShellDeform: { value: ORB.shellDeform },
    uClusterForce: { value: ORB.clusterForce },
    uClusterCount: { value: ORB.clusterCount },
    uTargets: { value: logoTargetsTex },
    uLogoResolve: { value: ORB.logoResolve },
    uLogoForce: { value: ORB.logoForce },
    uLogoBreath: { value: ORB.logoBreath },
    uLogoActivity: { value: ORB.logoActivity },
    uLogoArmScale: { value: ORB.logoScale },
    uLogoArmWidth: { value: ORB.logoWidth },
    uLogoPulseTravelSeconds: { value: ORB.logoPulseTravelSeconds },
    uLogoPulseArmStagger: { value: ORB.logoPulseArmStagger },
    uLogoPulseCycleSeconds: { value: ORB.logoPulseCycleSeconds },
    uNetworkMode: { value: 0 },
    uBuildProgress: { value: 0 },
    uTeamBiasStrength: { value: NETWORK.teamBiasStrength },
    uTeamData: { value: teamDataTex },
    uRoleData: { value: roleDataTex },
    uSignalsTex: { value: signalEngine.signalTex },
    uNodeTex: { value: nodeTex },
    uEdgeTex: { value: edgeTex },
    uNetworkTargets: { value: networkTargetsTex },
    uPolicyModeWeights: { value: policyModeCurrent },
    uPolicyEventCount: policyTorusWeb.policyInfluenceCount,
    uPolicyEventA: { value: policyTorusWeb.policyInfluenceA },
    uPolicyEventB: { value: policyTorusWeb.policyInfluenceB },
    uPolicyEventC: { value: policyTorusWeb.policyInfluenceC },
    uPolicyEventD: { value: policyTorusWeb.policyInfluenceD },
    uPlasmaResolve: { value: 0 },
    uPlasmaActivatedRatio: { value: PLASMA.activatedRatio },
    uPlasmaFilamentCount: { value: PLASMA.filamentCount },
    uPlasmaSpeed: { value: PLASMA.filamentSpeed },
    uPlasmaForce: { value: PLASMA.filamentForce },
    uPlasmaCycle: { value: PLASMA.filamentCycle },
    uPlasmaCoreTightness: { value: PLASMA.coreTightness },
    uPlasmaShellTurbulence: { value: PLASMA.shellTurbulence },
  },
});

const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat);
simScene.add(simQuad);

const particleCount = ORB.size * ORB.size;
const uvs = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  uvs[i * 3 + 0] = (i % ORB.size) / ORB.size;
  uvs[i * 3 + 1] = Math.floor(i / ORB.size) / ORB.size;
  uvs[i * 3 + 2] = 0;
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute("position", new THREE.BufferAttribute(uvs, 3));

const orbMat = new THREE.ShaderMaterial({
  vertexShader: orbVert,
  fragmentShader: orbFrag,
  uniforms: {
    uPositions: { value: null },
    uRoleData: { value: roleDataTex },
    uSignalsTex: { value: signalEngine.signalTex },
    uEdgeTex: { value: edgeTex },
    uNetworkTargets: { value: networkTargetsTex },
    uPolicyEventCount: policyTorusWeb.policyInfluenceCount,
    uPolicyEventA: { value: policyTorusWeb.policyInfluenceA },
    uPolicyEventB: { value: policyTorusWeb.policyInfluenceB },
    uPolicyEventC: { value: policyTorusWeb.policyInfluenceC },
    uPointSize: { value: ORB.pointSize },
    uOpacity: { value: ORB.opacity },
    uDepthFade: { value: ORB.depthFade },
    uTime: { value: 0 },
    uNetworkMode: { value: 0 },
    uParticleColor: { value: new THREE.Color(APPEARANCE.particleColor) },
    uSignalColor: { value: new THREE.Color(NETWORK.signalColor) },
    uBlockedColor: { value: new THREE.Color(NETWORK.blockedColor) },
    uReroutedColor: { value: new THREE.Color(NETWORK.reroutedColor) },
    uRejectedColor: { value: new THREE.Color(NETWORK.rejectedColor) },
    uPlasmaResolve: { value: 0 },
    uPlasmaActivatedRatio: { value: PLASMA.activatedRatio },
    uPlasmaSpeed: { value: PLASMA.filamentSpeed },
    uPlasmaCycle: { value: PLASMA.filamentCycle },
    uPlasmaShellColor: { value: new THREE.Color(PLASMA.shellColor) },
    uPaletteHot: { value: new THREE.Color(PLASMA.paletteHot) },
    uPaletteWarm: { value: new THREE.Color(PLASMA.paletteWarm) },
    uPaletteEmber: { value: new THREE.Color(PLASMA.paletteEmber) },
    uBreathPeriod: { value: PLASMA.breathDuration },
    uBreathHueRange: { value: PLASMA.breathHueRange },
    uBreathBrightness: { value: PLASMA.breathBrightness },
  },
  transparent: true,
  blending: THREE.NormalBlending,
  depthWrite: false,
});

const orbPoints = new THREE.Points(particleGeo, orbMat);
scene.add(orbPoints);

const seedMat = new THREE.ShaderMaterial({
  vertexShader: simVert,
  fragmentShader: `
    uniform sampler2D uSeed;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(uSeed, vUv);
    }
  `,
  uniforms: {
    uSeed: { value: null },
  },
});
const seedScene = new THREE.Scene();
seedScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), seedMat));

function resetParticleSimulation(radius = ORB.radius, spread = ORB.radiusSpread) {
  const seedTex = createPositionsTexture(ORB.size, radius, spread);
  seedMat.uniforms.uSeed.value = seedTex;

  renderer.setRenderTarget(fboA);
  renderer.render(seedScene, simCamera);
  renderer.setRenderTarget(fboB);
  renderer.render(seedScene, simCamera);
  renderer.setRenderTarget(null);

  simMat.uniforms.uPositions.value = fboA.texture;
  orbMat.uniforms.uPositions.value = fboA.texture;
  seedTex.dispose();
}

function setPolicyMode(mode: "A" | "B" | "C") {
  NETWORK.policyMode = mode;
  policyModeTarget.set(mode === "A" ? 1 : 0, mode === "B" ? 1 : 0, mode === "C" ? 1 : 0);
  const url = new URL(window.location.href);
  url.searchParams.set("policy", mode);
  window.history.replaceState({}, "", url);
}

// Initialize policy mode from URL hash on load
{
  const queryPolicy = new URLSearchParams(window.location.search).get("policy");
  if (queryPolicy === "A" || queryPolicy === "B" || queryPolicy === "C") {
    NETWORK.policyMode = queryPolicy;
    policyModeTarget.set(
      queryPolicy === "A" ? 1 : 0,
      queryPolicy === "B" ? 1 : 0,
      queryPolicy === "C" ? 1 : 0
    );
    policyModeCurrent.copy(policyModeTarget);
  }
}

window.addEventListener("keydown", (e) => {
  if (activeExperiment !== "network") return;
  if (e.key === "1") setPolicyMode("A");
  else if (e.key === "2") setPolicyMode("B");
  else if (e.key === "3") setPolicyMode("C");
});

function setExperimentVisualsVisible(experiment: Experiment, visible: boolean) {
  const isNetworkNow = experiment === "network";
  const isPlasmaNow = experiment === "plasma";
  const isShardsNow = experiment === "shards";
  orbPoints.visible = visible && !isPlasmaNow && !isShardsNow;
  policyTorusWeb.object3d.visible = visible && isNetworkNow;
  plasmaWebOrb.group.visible = visible && isPlasmaNow;
  shardStack.group.visible = visible && isShardsNow;
  attractorMarkers.visible = visible && isNetworkNow && NETWORK.debugShowAttractors;
}

function syncExperimentChrome(experiment: Experiment) {
  document.querySelectorAll<HTMLButtonElement>("[data-experiment]").forEach((button) => {
    const isActive = button.dataset.experiment === experiment;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const url = new URL(window.location.href);
  url.searchParams.set("experiment", experiment);
  window.history.replaceState({}, "", url);
}

function applyPlasmaCameraPose() {
  const elevation = THREE.MathUtils.degToRad(PLASMA_CAMERA.elevation);
  const azimuth = THREE.MathUtils.degToRad(PLASMA_CAMERA.azimuth);
  const horizontalDistance = Math.cos(elevation) * PLASMA_CAMERA.distance;
  const target = new THREE.Vector3(PLASMA_CAMERA.targetX, PLASMA_CAMERA.targetY, PLASMA_CAMERA.targetZ);

  camera.position.set(
    target.x + Math.sin(azimuth) * horizontalDistance,
    target.y + Math.sin(elevation) * PLASMA_CAMERA.distance,
    target.z + Math.cos(azimuth) * horizontalDistance
  );
  camera.fov = PLASMA_CAMERA.fov;
  camera.lookAt(target);
  camera.updateProjectionMatrix();
  controls.target.copy(target);
  controls.update();
}

function setExperiment(experiment: Experiment) {
  const isNetworkNow = experiment === "network";
  const isPlasmaNow = experiment === "plasma";
  const isShardsNow = experiment === "shards";
  const previousExperiment = activeExperiment;
  const wasNetwork = activeExperiment === "network";
  activeExperiment = experiment;

  setExperimentVisualsVisible(experiment, true);
  simMat.uniforms.uTargets.value = logoTargetsTex; // unused in non-logo branches
  simMat.uniforms.uNetworkMode.value = isNetworkNow ? 1 : 0;
  orbMat.uniforms.uNetworkMode.value = isNetworkNow ? 1 : 0;
  plasmaResolveTarget = isPlasmaNow ? 1 : 0;
  plasmaWebOrb.setActive(isPlasmaNow, lastFrameTime || performance.now() * 0.001);
  shardStack.setActive(isShardsNow, lastFrameTime || performance.now() * 0.001);

  if (previousExperiment !== experiment && (experiment === "logo" || isNetworkNow)) {
    resetParticleSimulation();
    orbPoints.rotation.set(0, 0, 0);
  }

  if (isNetworkNow) {
    // Policy network holds a front-facing torus; the lattice itself provides motion.
    controls.autoRotate = false;
    if (!wasNetwork) {
      networkBuildStartTime = -1; // re-arm build on entry
      networkBuildProgress = 0;
      cameraRotateCurrent = 0;
      signalEngine.resetForRebuild();
    }
  } else if (isPlasmaNow) {
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    cameraRotateCurrent = 0;
    PLASMA_WEB.rotationSpeed = 0;
    plasmaWebOrb.group.rotation.set(0, 0, 0);
    applyPlasmaCameraPose();
  } else if (isShardsNow) {
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    cameraRotateCurrent = 0;
    camera.position.set(4.8, 1.3, 33);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
  } else {
    // Logo resolve should stay front-readable; life comes from the particle field.
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    cameraRotateCurrent = 0.35;
  }

  if (!isShardsNow && !isPlasmaNow) {
    camera.position.set(0, 0, isNetworkNow ? 32 : 30);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
  }
  camera.updateProjectionMatrix();
  applyBackgroundForScene();
  applyParticlePaletteForScene();
  if (connectionManager) {
    connectionManager.lineSegments.visible = false;
    connectionManager.reset();
  }

  syncExperimentChrome(experiment);

  if (showGui) {
    buildGuiForExperiment(experiment);
  }
}

function switchExperimentWithFade(experiment: Experiment) {
  if (experiment === activeExperiment && pendingExperiment === null) return;

  pendingExperiment = experiment;

  if (tabFadeTimeout !== undefined) {
    window.clearTimeout(tabFadeTimeout);
  }
  if (tabFadeInTimeout !== undefined) {
    window.clearTimeout(tabFadeInTimeout);
    tabFadeInTimeout = undefined;
  }

  if (tabFadeOutDurationMs === 0) {
    pendingExperiment = null;
    setExperiment(experiment);
    return;
  }

  renderer.domElement.style.pointerEvents = "none";
  renderer.domElement.style.transition = tabFadeOutTransition;
  renderer.domElement.style.opacity = "0";

  tabFadeTimeout = window.setTimeout(() => {
    const nextExperiment = pendingExperiment;
    pendingExperiment = null;
    tabFadeTimeout = undefined;

    if (!nextExperiment) return;

    renderer.domElement.style.transition = "none";
    renderer.domElement.style.opacity = "0";
    renderer.domElement.getBoundingClientRect();

    setExperiment(nextExperiment);

    requestAnimationFrame(() => {
      renderer.domElement.style.transition = tabFadeInTransition;
      renderer.domElement.style.opacity = "1";
      tabFadeInTimeout = window.setTimeout(() => {
        tabFadeInTimeout = undefined;
        renderer.domElement.style.pointerEvents = "";
        renderer.domElement.style.transition = tabFadeOutTransition;
      }, tabFadeInDurationMs);
    });
  }, tabFadeOutDurationMs);
}

document.querySelectorAll<HTMLButtonElement>("[data-experiment]").forEach((button) => {
  button.addEventListener("click", () => {
    const raw = button.dataset.experiment;
    const experiment: Experiment =
      raw === "network"
        ? "network"
        : raw === "plasma"
          ? "plasma"
          : raw === "shards"
            ? "shards"
            : "logo";
    switchExperimentWithFade(experiment);
  });
});

// ─── Section 5: Post-Processing ──────────────────────────────────────────────

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uDarkMode: { value: 0 },
  },
  vertexShader: postVert,
  fragmentShader: vignetteFrag,
};
const vignettePass = new ShaderPass(vignetteShader);
composer.addPass(vignettePass);

// ─── Section 6: Update Function ──────────────────────────────────────────────

function updateOrb(time: number, dt: number) {
  const isNetwork = activeExperiment === "network";
  const isPlasma = activeExperiment === "plasma";
  const isShards = activeExperiment === "shards";

  // Network build progress (smoothstep ramp 0→1 over buildDuration)
  if (isNetwork) {
    if (networkBuildStartTime < 0) networkBuildStartTime = time;
    const rawProgress = THREE.MathUtils.clamp(
      (time - networkBuildStartTime) / Math.max(NETWORK.buildDuration, 0.01),
      0,
      1
    );
    networkBuildProgress = THREE.MathUtils.smoothstep(rawProgress, 0, 1);
  } else {
    networkBuildProgress = 0;
  }

  // Auto-resolve for logo mode
  const autoResolve = prefersReducedMotion
    ? 1
    : THREE.MathUtils.smoothstep(time, 1.2, 6.2);
  const logoResolve = ORB.autoResolve ? autoResolve : ORB.logoResolve;

  // Plasma resolve smoothing — ~95% settle in PLASMA.resolveDuration seconds
  const plasmaStiffness = 3.0 / Math.max(PLASMA.resolveDuration, 0.1);
  const plasmaK = 1 - Math.exp(-dt * plasmaStiffness);
  plasmaResolveCurrent += (plasmaResolveTarget - plasmaResolveCurrent) * plasmaK;
  if (Math.abs(plasmaResolveCurrent - plasmaResolveTarget) < 0.0005) {
    plasmaResolveCurrent = plasmaResolveTarget;
  }

  // Policy mode crossfade (exponential smoothing toward target)
  const policyStiffness = 4.0; // ~0.8s 95% settle
  const policyK = 1 - Math.exp(-dt * policyStiffness);
  policyModeCurrent.lerp(policyModeTarget, policyK);
  // Renormalize to keep total weight = 1
  const weightSum = policyModeCurrent.x + policyModeCurrent.y + policyModeCurrent.z;
  if (weightSum > 0.001) policyModeCurrent.multiplyScalar(1 / weightSum);

  // Update simulation uniforms
  simMat.uniforms.uTime.value = time;
  simMat.uniforms.uDeltaTime.value = Math.min(dt, 0.05);
  simMat.uniforms.uPositions.value = fboA.texture;
  simMat.uniforms.uLogoResolve.value = isNetwork || isPlasma || isShards ? 0 : logoResolve;
  simMat.uniforms.uLogoPulseTravelSeconds.value = ORB.logoPulseTravelSeconds;
  simMat.uniforms.uLogoPulseArmStagger.value = ORB.logoPulseArmStagger;
  simMat.uniforms.uLogoPulseCycleSeconds.value = ORB.logoPulseCycleSeconds;
  simMat.uniforms.uBuildProgress.value = networkBuildProgress;
  simMat.uniforms.uTeamBiasStrength.value = NETWORK.teamBiasStrength;
  const visiblePlasmaResolve = 0;
  simMat.uniforms.uPlasmaResolve.value = visiblePlasmaResolve;
  orbMat.uniforms.uTime.value = time;
  orbMat.uniforms.uPlasmaResolve.value = visiblePlasmaResolve;

  // Signal pulse engine is disabled (simultaneousPulses=0) — kept wired so
  // any existing GUI/state remains valid; renders nothing when capped at 0.
  signalEngine.update(time, isNetwork, networkBuildProgress, {
    spawnRate: NETWORK.pulseSpawnRate,
    simultaneousCap: NETWORK.simultaneousPulses,
    signalDuration: NETWORK.signalDuration,
    edges: networkEdges,
  });

  connectionManager.update(time, false, 0, {
    spawnRate: 0,
    blockedProbability: 0,
    minDuration: NETWORK.connectionMinDuration,
    maxDuration: NETWORK.connectionMaxDuration,
    maxConnections: 0,
  });

  policyTorusWeb.update(time, dt, {
    buildProgress: isNetwork ? networkBuildProgress : 0,
    rotationSpeed: POLICY_WEB.rotationSpeed,
    nodeDrift: POLICY_WEB.nodeDrift,
    nodeDriftSpeed: POLICY_WEB.nodeDriftSpeed,
    spawnRate: POLICY_WEB.spawnRate,
    maxActiveConnections: POLICY_WEB.maxActiveConnections,
    connectionDuration: POLICY_WEB.connectionDuration,
    lineOpacity: POLICY_WEB.lineOpacity,
    nodeOpacity: POLICY_WEB.nodeOpacity,
  });

  plasmaWebOrb.setMotion({
    rotationSpeed: 0,
    breathStrength: PLASMA_WEB.breathStrength,
    breathAmplitude: PLASMA_WEB.breathAmplitude,
    breathSpeed: PLASMA_WEB.breathSpeed,
    strandDrift: PLASMA_WEB.strandDrift,
    surfaceJitter: PLASMA_WEB.surfaceJitter,
    connectionPulse: PLASMA_WEB.connectionPulse,
  });
  plasmaWebOrb.setResolveDuration(PLASMA.resolveDuration);
  plasmaWebOrb.update(time, dt);

  shardStack.setMotion({
    resolveDuration: SHARDS.resolveDuration,
    traceDuration: SHARDS.traceDuration,
    rotationSpeed: SHARDS.rotationSpeed,
    activity: SHARDS.activity,
    signalSpeed: SHARDS.signalSpeed,
  });
  shardStack.setVisuals({
    scale: SHARDS.scale,
    pointSize: SHARDS.pointSize,
    pointOpacity: SHARDS.pointOpacity,
    lineOpacity: SHARDS.lineOpacity,
    signalOpacity: SHARDS.signalOpacity,
  });
  if (isShards) shardStack.update(time);

  // Render FBO
  renderer.setRenderTarget(fboB);
  renderer.render(simScene, simCamera);
  renderer.setRenderTarget(null);
  orbMat.uniforms.uPositions.value = fboB.texture;

  // Ping-pong
  const tmp = fboA;
  fboA = fboB;
  fboB = tmp;

  // Camera auto-rotate ease (smooth ramp on network entry)
  if (isNetwork) {
    // Target rate: NETWORK.rotationSpeed × 2 (OrbitControls.autoRotateSpeed = 2 → 30s/rev)
    const targetRate = NETWORK.rotationSpeed * 2.0;
    const rotStiffness = 0.9; // gentle ease-in
    const rotK = 1 - Math.exp(-dt * rotStiffness);
    cameraRotateCurrent += (targetRate - cameraRotateCurrent) * rotK;
    controls.autoRotateSpeed = cameraRotateCurrent;
  }

  // Particle rotation (orb spin) fades out as the logo becomes readable.
  if (isShards) {
    orbPoints.rotation.set(0, 0, 0);
  } else if (!isNetwork) {
    const logoSpin = activeExperiment === "logo" ? 1 - THREE.MathUtils.smoothstep(logoResolve, 0.48, 0.92) : 1;
    orbPoints.rotation.y += ORB.rotationSpeed * 0.016 * logoSpin;
  }
}

// ─── Section 7: Seed FBO & Animation Loop ────────────────────────────────────

resetParticleSimulation();

function animate(t: number) {
  requestAnimationFrame(animate);
  const time = t * 0.001;
  const dt = lastFrameTime === 0 ? 0.016 : Math.min(time - lastFrameTime, 0.1);
  lastFrameTime = time;

  controls.update();
  vignettePass.uniforms.uTime.value = time;
  vignettePass.uniforms.uDarkMode.value = 0;

  updateOrb(time, dt);
  composer.render();
}

requestAnimationFrame(animate);

// ─── Section 8: lil-gui ──────────────────────────────────────────────────────

const showGui = !new URLSearchParams(window.location.search).has("hideGui");

function buildGuiForExperiment(experiment: Experiment) {
  activeGui?.destroy();
  activeGui = new GUI({ title: "Runlayer Lab", width: 312 });
  const gui = activeGui;

  const updateBackground = (_value: string) => {
    applyBackgroundForScene();
  };

  const updateParticleColor = (value: string) => {
    orbMat.uniforms.uParticleColor.value.set(value);
  };

  const updateLogoTargets = () => {
    logoTargetsTex.dispose();
    logoTargetsTex = createLogoTargetsTexture(ORB.size, ORB.logoDepth, ORB.logoScale, ORB.logoWidth);
    simMat.uniforms.uLogoArmScale.value = ORB.logoScale;
    simMat.uniforms.uLogoArmWidth.value = ORB.logoWidth;
    if (activeExperiment === "logo") {
      simMat.uniforms.uTargets.value = logoTargetsTex;
    }
  };

  const restoreLastGoodLogoShape = () => {
    ORB.logoDepth = 1.5;
    ORB.logoScale = 0.9;
    ORB.logoWidth = 1.4;
    ORB.logoBreath = 0.206;
    ORB.logoActivity = 0.07;
    updateLogoTargets();
    simMat.uniforms.uLogoBreath.value = ORB.logoBreath;
    simMat.uniforms.uLogoActivity.value = ORB.logoActivity;
    for (const controller of logoShapeFolder.controllers) controller.updateDisplay();
    for (const controller of simFolder.controllers) controller.updateDisplay();
  };

  if (experiment === "shards") {
    const appearanceFolder = gui.addFolder("Appearance");
    appearanceFolder
      .addColor(SHARDS, "backgroundColor")
      .name("Background")
      .onChange((value: string) => {
        shardStack.setPalette({ background: value });
        updateBackground(value);
      });
    appearanceFolder
      .addColor(SHARDS, "inkColor")
      .name("Structure")
      .onChange((value: string) => {
        shardStack.setPalette({ ink: value });
      });
    appearanceFolder
      .addColor(SHARDS, "signalColor")
      .name("Signals")
      .onChange((value: string) => {
        shardStack.setPalette({ signal: value });
      });
    appearanceFolder.open();

    const networkActivityFolder = gui.addFolder("Network activity");
    networkActivityFolder
      .addColor(SHARDS, "activityColor")
      .name("Activity color")
      .onChange((value: string) => {
        shardStack.setPalette({ activity: value });
      });
    networkActivityFolder
      .addColor(SHARDS, "rejectedColor")
      .name("Rejected activity")
      .onChange((value: string) => {
        NETWORK.rejectedColor = value;
        orbMat.uniforms.uRejectedColor.value.set(value);
        policyTorusWeb.setPalette({ rejected: value });
        shardStack.setPalette({ rejected: value });
      });
    networkActivityFolder
      .add(SHARDS, "policyFadeIn", 0.02, 0.34, 0.005)
      .name("Color fade in");
    networkActivityFolder
      .add(SHARDS, "policyFadeOut", 0.02, 0.5, 0.005)
      .name("Color fade out");
    networkActivityFolder.open();

    const architectureFolder = gui.addFolder("Architecture");
    architectureFolder.add(SHARDS, "scale", 0.65, 1.35, 0.01).name("Scale");
    architectureFolder.add(SHARDS, "lineOpacity", 0.02, 0.9, 0.01).name("Line opacity");
    architectureFolder.add(SHARDS, "pointOpacity", 0.02, 0.9, 0.01).name("Point opacity");
    architectureFolder.add(SHARDS, "signalOpacity", 0.0, 1.0, 0.01).name("Signal opacity");
    architectureFolder.add(SHARDS, "pointSize", 0.2, 2.4, 0.01).name("Point size");
    architectureFolder.open();

    const motionFolder = gui.addFolder("Assembly motion");
    motionFolder.add(SHARDS, "resolveDuration", 0.5, 9.0, 0.05).name("Resolve duration");
    motionFolder.add(SHARDS, "traceDuration", 0.1, 3.0, 0.05).name("Trace duration");
    motionFolder.add(SHARDS, "activity", 0.0, 0.22, 0.005).name("Alive motion");
    motionFolder.add(SHARDS, "signalSpeed", 0.02, 0.8, 0.005).name("Signal speed");
    motionFolder.add(SHARDS, "rotationSpeed", 0.0, 0.14, 0.001).name("Rotation speed");
    motionFolder
      .add({ replay: () => shardStack.replay(lastFrameTime || performance.now() * 0.001) }, "replay")
      .name("Replay assembly");
    motionFolder.open();
    return;
  }

  if (experiment === "network") {
    const appearanceFolder = gui.addFolder("Appearance");
    appearanceFolder
      .addColor(NETWORK, "backgroundColor")
      .name("Background")
      .onChange(updateBackground);
    appearanceFolder
      .addColor(NETWORK, "particleColor")
      .name("Particles")
      .onChange((value: string) => {
        orbMat.uniforms.uParticleColor.value.set(value);
        policyTorusWeb.setPalette({ foreground: value, particle: value, line: value, node: value });
      });
    appearanceFolder
      .addColor(NETWORK, "rejectedColor")
      .name("Rejected activity")
      .onChange((value: string) => {
        SHARDS.rejectedColor = value;
        orbMat.uniforms.uRejectedColor.value.set(value);
        policyTorusWeb.setPalette({ rejected: value });
        shardStack.setPalette({ rejected: value });
      });
    appearanceFolder
      .add(NETWORK, "opacity", 0.01, 0.8, 0.01)
      .name("Particle opacity")
      .onChange((value: number) => {
        orbMat.uniforms.uOpacity.value = value;
      });
    appearanceFolder.open();

    const policyFolder = gui.addFolder("Policy torus");
    policyFolder.add(NETWORK, "buildDuration", 0.5, 8.0, 0.05).name("Resolve duration");
    policyFolder.add(POLICY_WEB, "rotationSpeed", 0.0, 0.18, 0.001).name("Rotation speed");
    policyFolder.add(POLICY_WEB, "nodeDrift", 0.0, 0.5, 0.01).name("Node drift");
    policyFolder.add(POLICY_WEB, "nodeDriftSpeed", 0.0, 1.4, 0.01).name("Drift speed");
    policyFolder.add(POLICY_WEB, "spawnRate", 5, 220, 1).name("Connection rate");
    policyFolder.add(POLICY_WEB, "maxActiveConnections", 0, 220, 1).name("Active lines");
    policyFolder.add(POLICY_WEB, "connectionDuration", 0.8, 9.0, 0.05).name("Line duration");
    policyFolder.add(POLICY_WEB, "lineOpacity", 0.0, 0.7, 0.01).name("Line opacity");
    policyFolder.add(POLICY_WEB, "nodeOpacity", 0.0, 0.8, 0.01).name("Node opacity");
    policyFolder
      .add({ rebuild: () => {
        networkBuildStartTime = -1;
        networkBuildProgress = 0;
        cameraRotateCurrent = 0;
        signalEngine.resetForRebuild();
        policyTorusWeb.reset();
      }}, "rebuild")
      .name("Replay build animation");
    policyFolder.open();

    const partFolder = gui.addFolder("Particles");
    partFolder.add(ORB, "pointSize", 0.5, 8.0).onChange((v: number) => {
      orbMat.uniforms.uPointSize.value = v;
    });
    partFolder.add(ORB, "depthFade", 0.0, 1.0).onChange((v: number) => {
      orbMat.uniforms.uDepthFade.value = v;
    });
    return;
  }

  if (experiment === "plasma") {
    const appearanceFolder = gui.addFolder("Appearance");
    appearanceFolder
      .addColor(PLASMA, "backgroundColor")
      .name("Background")
      .onChange(updateBackground);
    appearanceFolder
      .addColor(PLASMA, "shellColor")
      .name("Ink")
      .onChange((value: string) => {
        orbMat.uniforms.uPlasmaShellColor.value.set(value);
        plasmaWebOrb.setPalette({ ink: value });
      });
    appearanceFolder.add(PLASMA_WEB, "pointOpacity", 0.02, 0.95, 0.01).name("Particle opacity").onChange(() => {
      plasmaWebOrb.setVisuals(PLASMA_WEB);
    });
    appearanceFolder.open();

    const sceneFolder = gui.addFolder("Plane funnel");
    sceneFolder
      .add(PLASMA, "resolveDuration", 0.2, 5.0, 0.05)
      .name("Resolve duration")
      .onChange((value: number) => {
        plasmaWebOrb.setResolveDuration(value);
      });
    sceneFolder.add(PLASMA_WEB, "pointSize", 0.4, 3.0, 0.01).name("Point size").onChange(() => {
      plasmaWebOrb.setVisuals(PLASMA_WEB);
    });
    sceneFolder
      .add(PLASMA_WEB, "compositionWidth", 0.55, 1.65, 0.01)
      .name("Composition width")
      .onChange(applyPlasmaWebCompositionScale);
    sceneFolder
      .add(PLASMA_WEB, "compositionHeight", 0.65, 1.55, 0.01)
      .name("Composition height")
      .onChange(applyPlasmaWebCompositionScale);
    sceneFolder.open();

    const cameraFolder = gui.addFolder("Camera angle");
    const applyCameraControl = () => {
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0;
      cameraRotateCurrent = 0;
      PLASMA_WEB.rotationSpeed = 0;
      plasmaWebOrb.group.rotation.set(0, 0, 0);
      applyPlasmaCameraPose();
    };
    const cameraControllers = [
      cameraFolder.add(PLASMA_CAMERA, "elevation", 8, 78, 0.1).name("Top-down angle").onChange(applyCameraControl),
      cameraFolder.add(PLASMA_CAMERA, "azimuth", -70, 70, 0.1).name("Orbit angle").onChange(applyCameraControl),
      cameraFolder.add(PLASMA_CAMERA, "distance", 24, 72, 0.1).name("Distance").onChange(applyCameraControl),
      cameraFolder.add(PLASMA_CAMERA, "targetY", -8, 6, 0.1).name("Target height").onChange(applyCameraControl),
      cameraFolder.add(PLASMA_CAMERA, "fov", 28, 70, 1).name("FOV").onChange(applyCameraControl),
    ];
    cameraFolder
      .add({
        reset: () => {
          Object.assign(PLASMA_CAMERA, PLASMA_CAMERA_DEFAULTS);
          applyCameraControl();
          cameraControllers.forEach((controller) => controller.updateDisplay());
        },
      }, "reset")
      .name("Reset camera");
    cameraFolder.open();

    const motionFolder = gui.addFolder("Funnel motion");
    motionFolder.add(PLASMA_WEB, "breathStrength", 0.0, 0.4, 0.01).name("Breath");
    motionFolder.add(PLASMA_WEB, "breathAmplitude", 0.0, 2.0, 0.01).name("Breath amplitude");
    motionFolder.add(PLASMA_WEB, "breathSpeed", 0.0, 3.0, 0.01).name("Breath speed");
    motionFolder.add(PLASMA_WEB, "strandDrift", 0.0, 0.5, 0.01).name("Strand drift");
    motionFolder.add(PLASMA_WEB, "surfaceJitter", 0.0, 0.2, 0.005).name("Surface jitter");
    motionFolder.add(PLASMA_WEB, "connectionPulse", 0.0, 1.0, 0.01).name("Operational activity");
    motionFolder
      .add({ rebuild: () => plasmaWebOrb.rebuild() }, "rebuild")
      .name("Regenerate funnel");
    motionFolder.open();

    return;
  }

  const appearanceFolder = gui.addFolder("Appearance");
  appearanceFolder.addColor(APPEARANCE, "backgroundColor").name("Background").onChange(updateBackground);
  appearanceFolder.addColor(APPEARANCE, "particleColor").name("Particles").onChange(updateParticleColor);
  appearanceFolder.add(ORB, "opacity", 0.01, 0.6, 0.01).name("Particle opacity").onChange((v: number) => {
    orbMat.uniforms.uOpacity.value = v;
  });
  appearanceFolder.open();

  const simFolder = gui.addFolder("Simulation");
  simFolder.add(ORB, "frequency", 0.05, 2.0).onChange((v: number) => {
    simMat.uniforms.uFrequency.value = v;
  });
  simFolder.add(ORB, "turbulence", 0.01, 3.0).onChange((v: number) => {
    simMat.uniforms.uTurbulence.value = v;
  });
  simFolder.add(ORB, "curlSpeed", 0.01, 2.0).onChange((v: number) => {
    simMat.uniforms.uCurlSpeed.value = v;
  });
  simFolder.add(ORB, "restoreForce", 0.05, 10.0).onChange((v: number) => {
    simMat.uniforms.uRestoreForce.value = v;
  });
  simFolder.add(ORB, "shellDeform", 0, 8).onChange((v: number) => {
    simMat.uniforms.uShellDeform.value = v;
  });
  simFolder.add(ORB, "clusterForce", 0.0, 5.0).onChange((v: number) => {
    simMat.uniforms.uClusterForce.value = v;
  });
  simFolder.add(ORB, "autoResolve").name("Auto resolve");
  simFolder.add(ORB, "logoResolve", 0.0, 1.0, 0.01).name("Logo resolve").onChange((v: number) => {
    simMat.uniforms.uLogoResolve.value = v;
  });
  simFolder.add(ORB, "logoForce", 0.0, 12.0).name("Logo force").onChange((v: number) => {
    simMat.uniforms.uLogoForce.value = v;
  });
  simFolder.add(ORB, "logoBreath", 0.0, 2.0).name("Logo depth drift").onChange((v: number) => {
    simMat.uniforms.uLogoBreath.value = v;
  });
  simFolder.add(ORB, "logoActivity", 0.0, 1.0, 0.01).name("Logo particle activity").onChange((v: number) => {
    simMat.uniforms.uLogoActivity.value = v;
  });
  simFolder
    .add(ORB, "logoPulseTravelSeconds", 0.55, 2.8, 0.05)
    .name("Pulse travel time")
    .onChange((v: number) => {
      simMat.uniforms.uLogoPulseTravelSeconds.value = v;
    });
  simFolder
    .add(ORB, "logoPulseArmStagger", 0.0, 0.9, 0.01)
    .name("Pulse start spread")
    .onChange((v: number) => {
      simMat.uniforms.uLogoPulseArmStagger.value = v;
    });
  simFolder
    .add(ORB, "logoPulseCycleSeconds", 2.2, 7.0, 0.05)
    .name("Pulse cycle")
    .onChange((v: number) => {
      simMat.uniforms.uLogoPulseCycleSeconds.value = v;
    });
  simFolder.add(ORB, "radius", 2, 30).onChange((v: number) => {
    simMat.uniforms.uRadius.value = v;
  });

  const logoShapeFolder = gui.addFolder("Logo shape");
  logoShapeFolder.add(ORB, "logoScale", 0.8, 1.35, 0.01).name("Arm scale").onChange(updateLogoTargets);
  logoShapeFolder.add(ORB, "logoWidth", 0.6, 2.2, 0.01).name("Arm width").onChange(updateLogoTargets);
  logoShapeFolder.add(ORB, "logoDepth", 0.1, 3.0, 0.05).name("Bar depth").onChange(updateLogoTargets);
  logoShapeFolder.add({ restoreLastGoodLogoShape }, "restoreLastGoodLogoShape").name("Restore previous shape");
  logoShapeFolder.open();

  const partFolder = gui.addFolder("Particles");
  partFolder.add(ORB, "pointSize", 0.5, 8.0).onChange((v: number) => {
    orbMat.uniforms.uPointSize.value = v;
  });
  partFolder.add(ORB, "depthFade", 0.0, 1.0).onChange((v: number) => {
    orbMat.uniforms.uDepthFade.value = v;
  });
  partFolder.add(ORB, "rotationSpeed", 0.0, 0.5);
}

setExperiment(activeExperiment);
