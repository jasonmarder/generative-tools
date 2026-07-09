import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import GUI from "lil-gui";
import { burstConfig } from "./hero-arch-motion";

// ════════════════════════════════════════════════════════════════════════════
// Runlayer — Logo Resolve (isolated sandbox)
// 8-arm asterisk with orchestrated funnel pulse (squash → hub charge → release).
// ════════════════════════════════════════════════════════════════════════════

// ─── Section 1: Parameters ───────────────────────────────────────────────────

const ORB = {
  size: 256,
  logoResolve: 1,
  logoForce: 12,
  logoBreath: 0.206,
  logoDepth: 1.5,
  logoScale: 0.9,
  logoWidth: 1.36,
  logoActivity: 0.07,
  logoPulseTravelSeconds: 0.5, // gather (inward) travel time
  logoPulseArmStagger: 1.78, // "Gather spread" scale
  logoPulseCycleSeconds: 4,
  logoHoldSeconds: 0.77,
  logoRestSeconds: 0.5,
  logoPulseEase: 4, // inward gather ease-out exponent (1 = linear)
  logoTipExitFade: 0.51,
  logoHubChargeAmount: 0.92,
  logoChargeSwell: 0.5,
  logoHubReach: 0.56, // how far inward-arm inner edges stretch toward center at full charge
  logoNineOffset: 0.02, // Converge: 9:00 lead/lag vs the other radials
  logoFlowThreePauseSeconds: 0.3, // Flow only: pause after all arms gather before 3:00 L→R
  // 3:00 exit pulse — its own duration + cubic-bezier easing (snap out fast, then taper).
  logoExitTravel: 1.1,
  logoExitB1x: 0.93,
  logoExitB1y: 0.59,
  logoExitB2x: 0.02,
  logoExitB2y: 0.65,
  pointSize: 1.1075,
  opacity: 0.24,
  /** Manual multiplier on top of auto viewport density (1 = auto only). */
  densityScale: 1,
  depthFade: 0.48,
  // Composition (for handoff): X/Y rotation of the logo + camera zoom.
  viewYawDeg: -25,
  viewPitchDeg: 0,
  viewZoom: 0.88,
};

const APPEARANCE = {
  backgroundColor: "#F5F5F4",
  particleColor: "#1C1917",
  threePulseColor: "#ceaa92",
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
  ORB.logoForce = 1.2;
  ORB.logoActivity = 0.02;
  ORB.logoPulseCycleSeconds = 5.0;
}

let lastFrameTime = 0;
let pulseMode = 0; // 0 = Converge, 1 = Sweep, 2 = Flow

// ─── Section 2: Inline GLSL Shaders ──────────────────────────────────────────

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
uniform float uHoldSeconds;
uniform float uPulseMode;
uniform float uFlowThreePause;
uniform float uPulseEase;
uniform float uTipExitFade;
uniform float uHubChargeAmount;
uniform float uChargeSwell;
uniform float uNineOffset;
uniform float uRestSeconds;
uniform float uHubReach;
uniform float uExitTravel;
uniform float uExitB1x;
uniform float uExitB1y;
uniform float uExitB2x;
uniform float uExitB2y;
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

// CSS-style cubic-bezier(x1,y1,x2,y2): given time t in [0,1], Newton-solve for the
// curve parameter where Bx(u)=t, then return By(u). P0=(0,0), P3=(1,1).
float cubicBezier(float t, float x1, float y1, float x2, float y2) {
  float u = saturate(t);
  for (int i = 0; i < 6; i++) {
    float omu = 1.0 - u;
    float bx = 3.0 * omu * omu * u * x1 + 3.0 * omu * u * u * x2 + u * u * u;
    float dbx = 3.0 * omu * omu * x1 + 6.0 * omu * u * (x2 - x1) + 3.0 * u * u * (1.0 - x2);
    u = saturate(u - (bx - t) / (abs(dbx) < 1e-4 ? 1e-4 : dbx));
  }
  float omu = 1.0 - u;
  return 3.0 * omu * omu * u * y1 + 3.0 * omu * u * u * y2 + u * u * u;
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

void main() {
  vec4 posData = texture2D(uPositions, vUv);
  vec3 p = posData.xyz;
  float dt = uDeltaTime > 0.0001 ? uDeltaTime : 0.016;

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

  // ── Direction: arms 1–7 pulse inward (tip→hub); arm 0 (3:00) pulses outward (hub→tip) ──
  float isInwardArm = step(0.5, armSlot);                    // 1.0 for slots 1–7, 0.0 for the 3:00 hub arm
  float releaseCoord = saturate(along / max(armEnd, 0.001)); // arm-0 coord measured from the TRUE hub (x=0)
  float headCoord = mix(1.0 - armT, releaseCoord, isHubArm); // travel coordinate the wave head sweeps 0→1

  // ── One-shot resolve wave (orb → logo): direction-consistent, 3:00 line written last ──
  float resolveDelay = mix(0.0, 0.16, isHubArm);
  float waveHead = (uLogoResolve - resolveDelay) * 1.18;
  float waveGate = smoothstep(-0.08, 0.04, waveHead) * (1.0 - smoothstep(1.03, 1.22, waveHead));
  float resLead = gaussian(headCoord - waveHead, 0.052) * waveGate;
  float resBody = gaussian(headCoord - (waveHead - 0.075), 0.125) * waveGate;
  float resTail = gaussian(headCoord - (waveHead - 0.19), 0.18) * waveGate;

  float settled = smoothstep(0.86, 1.0, uLogoResolve);

  // ── Orchestrated funnel loop: inward gather → hub charge → 3:00 release ──
  float spreadScale = max(uLogoPulseArmStagger, 0.0);       // "Gather spread" knob
  float clockPos = mod(0.25 - armSlot * 0.125, 1.0);        // screen-clockwise position from 12:00
  float isConverge = step(uPulseMode, 0.5);
  float armOrder = mix(clockPos, 0.0, isConverge);          // Converge: all radials synced; Sweep/Flow: clockwise
  float isNineArm = 1.0 - step(0.5, abs(armSlot - 4.0));    // slot 4 = 9:00

  float keepTravel = max(uLogoPulseTravelSeconds, 0.45);
  float exitTravel = max(uExitTravel, 0.2);                 // 3:00 exit gets its own duration
  float spread = keepTravel * spreadScale;
  // Per-mode rhythm — Converge(0): synchronized; Sweep(1): tight ripple; Flow(2): wide continuous overlap
  float gatherSpread = spread * 0.6;
  float holdDur = max(uHoldSeconds, 0.0);
  float restDur = max(uRestSeconds, 0.0);
  float releaseLead = 0.1;
  if (uPulseMode < 0.5) {                                   // Converge — radials collapse together
    gatherSpread = 0.0;
    releaseLead = keepTravel * 0.22;                        // 3:00 line starts while the hub is still charged
  } else if (uPulseMode > 1.5) {                            // Flow — staggered gather, then 3:00 exit
    gatherSpread = spread * 1.6;
    holdDur = 0.0;
    restDur = 0.0;
    releaseLead = 0.0;                                      // no overlap: 3:00 waits for full gather + pause
  }

  float isFlow = step(1.5, uPulseMode) * (1.0 - step(2.5, uPulseMode));
  float gatherEnd = gatherSpread + keepTravel;
  float flowLastGather = gatherSpread * 0.875 + keepTravel;   // last clockwise inward arm (slot 3) finishes
  float chargeGatherEnd = mix(gatherEnd, flowLastGather, isFlow);
  float releaseStart = gatherEnd + holdDur - releaseLead;
  releaseStart = mix(releaseStart, flowLastGather + max(uFlowThreePause, 0.0), isFlow);
  float releaseEnd = releaseStart + exitTravel;            // 3:00 line uses its own travel time
  float cyclePeriod = max(uLogoPulseCycleSeconds, releaseEnd + restDur + 0.2);
  float cycleTime = uTime - floor(uTime / cyclePeriod) * cyclePeriod;

  float inwardStart = armOrder * gatherSpread + isNineArm * uNineOffset;
  float armStartTime = mix(inwardStart, releaseStart, isHubArm);
  float armTravel = mix(keepTravel, exitTravel, isHubArm); // 3:00 exit has its own duration
  float linHead = (cycleTime - armStartTime) / armTravel;
  // Inward gather: power ease-out. 3:00 exit: cubic-bezier (snaps out fast, then tapers).
  float easedPow = 1.0 - pow(clamp(1.0 - linHead, 0.0, 1.0), max(uPulseEase, 0.25));
  float easedBez = cubicBezier(clamp(linHead, 0.0, 1.0), uExitB1x, uExitB1y, uExitB2x, uExitB2y);
  float easedSel = mix(easedPow, easedBez, isHubArm);
  // Head runs past 1 so the comet exits the tip cleanly.
  float head = linHead < 0.0 ? linHead : (linHead > 1.0 ? linHead : easedSel);
  // exitFade applies to the 3:00 TIP only. The inward comet stays continuous all the
  // way into the hub; its visible saturation is handled later by source-directed ink.
  float exitFade = 1.0 - smoothstep(1.0, 1.0 + max(uTipExitFade, 0.02), linHead) * isHubArm;
  float keepGate = smoothstep(0.0, 0.1, linHead) * exitFade * settled;
  float keepLead = gaussian(headCoord - head, 0.06) * keepGate;
  float keepBody = gaussian(headCoord - (head - 0.11), 0.155) * keepGate;
  float keepTail = gaussian(headCoord - (head - 0.29), 0.24) * keepGate;

  // ── Hub charge: a single conserved arc. Energy gathers (anticipation, eased rise), holds briefly
  // (tension), then DISCHARGES over an eased window that overlaps the 3:00 draw (follow-through) —
  // never a hard cut. The old 0.14s fall caused both a brightness jump and a position spring-back. ──
  float dischargeDur = keepTravel * 0.7;
  float chargeRise = smoothstep(chargeGatherEnd * 0.35, chargeGatherEnd, cycleTime);
  float chargeFall = 1.0 - smoothstep(releaseStart, releaseStart + dischargeDur, cycleTime);
  float hubCharge = chargeRise * chargeFall * settled * uHubChargeAmount;

  // ── 3:00 wind-up: the hub/left side swells as radial energy funnels in ──
  float armZeroHub = smoothstep(0.55, 0.0, releaseCoord) * isHubArm;
  float chargeSwell = hubCharge * armZeroHub * uChargeSwell;

  // ── Restraint: calm the ambient noise while the 3:00 line draws ──
  float releasePhase =
    smoothstep(releaseStart - 0.1, releaseStart + 0.12, cycleTime) *
    (1.0 - smoothstep(releaseEnd, releaseEnd + 0.3, cycleTime));
  float calm = 1.0 - releasePhase * 0.85;

  float keepBreath = (0.5 + 0.5 * sin(uTime * 6.2831853 / cyclePeriod)) * 0.05 * settled * calm;

  float guideLead = (resLead * 0.82 + keepLead * 0.7) * crossMask * resolveField;
  float guideBody = (resBody * 0.62 + keepBody * 0.74 + keepBreath * 0.16) * crossMask * resolveField;
  float guideTail = (resTail * 0.35 + keepTail * 0.4 + keepBreath * 0.08) * crossMask * resolveField;
  float guideEnergy = saturate(guideLead + guideBody * 0.72 + guideTail * 0.42);
  float passedWave = smoothstep(-0.08, 0.13, waveHead - headCoord) * waveGate;
  float regionalResolve = saturate(
    uLogoResolve * 0.32 +
    passedWave * 0.52 +
    guideEnergy * 0.18 +
    smoothstep(0.86, 1.0, uLogoResolve) * 0.74
  );

  // ── Ambient correction drift (kept, but gated down by calm during release) ──
  float correctionCycle = uTime / 13.7;
  float correctionIndex = floor(correctionCycle);
  float correctionPhase = fract(correctionCycle);
  float correctionArm = mod(correctionIndex * 5.0 + 2.0, 8.0);
  float correctionMatch = 1.0 - step(0.5, abs(armSlot - correctionArm));
  float correctionT = 0.34 + hash21(vec2(correctionIndex + 9.1, correctionArm + 2.7)) * 0.42;
  float correctionRegion = gaussian(armT - correctionT, 0.052) * crossMask * correctionMatch * settled * calm;
  float correctionEnvelope =
    smoothstep(0.08, 0.24, correctionPhase) *
    (1.0 - smoothstep(0.58, 0.9, correctionPhase));
  float correctionCatch =
    smoothstep(0.28, 0.66, correctionPhase) *
    (1.0 - smoothstep(0.76, 0.98, correctionPhase));
  float correction = correctionRegion * correctionEnvelope * 0.08;
  float catchField = correctionRegion * correctionCatch * 0.16;

  // ── Forces: inward arms compress toward the hub; the 3:00 arm shoots outward ──
  float pulseTravelSign = mix(-1.0, 1.0, isHubArm);         // inward = toward hub, arm 0 = outward
  // Taper the outward push at the 3:00 tip: the eased comet decelerates AT the tip, and a constant
  // outward swell there ratchets particles past the edge → the residual dark clump. Fade it out.
  float tipTaper = 1.0 - smoothstep(0.8, 1.0, armT) * isHubArm;
  vec2 centerlinePull =
    -armPerp * signedCross * (guideLead * 0.2 + guideBody * 0.095 + guideTail * 0.04 + catchField * 0.08);
  vec2 pressureSwell =
    armDir * pulseTravelSign * (guideLead * 0.055 + guideBody * 0.18 - guideTail * 0.035 + keepBreath * 0.014) * (0.72 + headCoord * 0.28) * tipTaper;
  // Width "breath" removed: armPerp*sign(signedCross) shoves the two halves apart by a constant
  // amount, and since centerlinePull→0 at the centerline it tears a thin seam down the middle
  // wherever the comet is dense. A fixed particle band can't widen without hollowing its center,
  // so the pulse reads as density + ink instead of width.
  vec2 correctionDrift =
    armPerp * sign(sin(correctionIndex * 12.91 + armSlot * 2.7)) * halfWidth * correction * 0.24;

  // Hub-charge micro-compression: inner ends of inward arms ease toward center as energy pools.
  // uHubReach = world-space distance each inner edge stretches toward center at full charge.
  float innerProximity = (1.0 - armT) * isInwardArm;
  vec2 hubCompress = -normalize(logoTarget.xy + vec2(0.0001)) * hubCharge * innerProximity * uHubReach;

  // 3:00 wind-up: hub side gathers toward center during the charge (denser pool), then bursts outward on release
  vec2 chargeWindup = -armDir * chargeSwell * 0.09;

  vec3 materialFlow = curlNoise(vec3(logoTarget.xy * 0.115, uTime * 0.11 + armSlot * 0.23));
  materialFlow *= uLogoActivity * 0.19 * settled * calm * (0.35 + crossMask * 0.65);

  logoTarget.xy += centerlinePull + pressureSwell + correctionDrift + hubCompress + chargeWindup + materialFlow.xy;
  logoTarget.z *= 1.0 - guideLead * 0.075 - catchField * 0.06 + guideBody * 0.04;
  logoTarget.z += materialFlow.z * 0.28;
  logoTarget.z += sin(uTime * 0.55 + armSlot * 1.7 + armT * 2.4) * uLogoBreath * 0.16 * settled * crossMask;

  float logoStiffness = uLogoForce * (1.35 + guideLead * 1.12 + guideBody * 0.56 + guideTail * 0.36 + catchField * 0.5);
  float logoK = 1.0 - exp(-dt * logoStiffness * regionalResolve);
  p = mix(p, logoTarget, logoK);

  // ── Visual energy: one directional ink pass, not a hidden comet plus a second hub flash.
  // Inward arms source from their outer tips; the 3:00 release sources from the hub. The role
  // channel drives both color intensity and point size, so every added term must preserve that direction.
  float inwardInk = 1.0 - smoothstep(0.04, 0.96, headCoord);
  float releaseInk = 1.0 - smoothstep(0.02, 0.92, releaseCoord);
  float directionalInk = mix(inwardInk, releaseInk, isHubArm);
  float logoVisualEnergy = saturate((guideLead * 0.7 + guideBody * 0.88 + guideTail * 0.3) * directionalInk);
  float extensionTipInk = hubCharge * smoothstep(0.2, 0.0, armT) * isInwardArm;
  float releaseSwellInk = chargeSwell * releaseInk;
  float correctionVisual = saturate(correctionRegion * correctionEnvelope * 0.015);
  float logoRole = saturate(logoVisualEnergy + correctionVisual + extensionTipInk * 0.24 + releaseSwellInk * 0.42);
  // 3:00 L→R exit wave — brand tint on the outward comet only (hub→tip). Do not multiply by
  // releaseInk: that term is static along the arm and would zero out the tip as the wave arrives.
  float threePulseMix =
    isHubArm * keepGate * saturate(keepLead * 1.1 + keepBody * 0.95 + keepTail * 0.32);
  float roleByte = floor(logoRole * 255.0 + 0.5);
  float pulseByte = floor(threePulseMix * 255.0 + 0.5);
  float packedRole = (roleByte + pulseByte * 256.0) / 65535.0;
  gl_FragColor = vec4(p, packedRole);
}
`;

const orbVert = /* glsl */ `
uniform sampler2D uPositions;
uniform float uPointSize;
uniform float uDepthFade;
uniform vec3 uParticleColor;
uniform vec3 uThreePulseColor;
varying float vBrightness;
varying vec3 vColor;
varying float vRole;

void main() {
  vec4 posData = texture2D(uPositions, position.xy);
  vec3 pos = posData.xyz;
  float packedInt = posData.w * 65535.0 + 0.5;
  float positiveRole = mod(packedInt, 256.0) / 255.0;
  float threePulseMix = floor(packedInt / 256.0) / 255.0;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float depth = -mvPos.z;
  float logoSizeBoost = 1.0 + positiveRole * 0.82;
  gl_PointSize = uPointSize * logoSizeBoost * (72.0 / depth);

  vBrightness = 1.0 - uDepthFade * smoothstep(10.0, 50.0, depth);
  vColor = mix(uParticleColor, uThreePulseColor, threePulseMix);
  vRole = positiveRole;
}
`;

const orbFrag = /* glsl */ `
uniform float uOpacity;
varying float vBrightness;
varying vec3 vColor;
varying float vRole;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.15, d);
  // On the pale background, "energy" reads as denser ink — boost opacity with pulse/hub role.
  gl_FragColor = vec4(vColor * vBrightness, alpha * uOpacity * (1.0 + vRole * 1.1));
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
  color.rgb = mix(color.rgb, vignetteCol, edge * uDarkMode * 0.35);
  gl_FragColor = color;
}
`;

// ─── Section 3: Renderer + Scene + Camera ────────────────────────────────────

const renderHost = document.querySelector<HTMLElement>(".hero-orb-viewport") ?? document.body;

/** Logo arm tips sit near this radius in simulation space (see createLogoTargetsTexture). */
const LOGO_OUTER_RADIUS = 12.5;

/** Desktop lg hero orb column — target look for auto density scaling. */
const VIEWPORT_DENSITY_REF = { width: 700, height: 560 };

/**
 * Scale particle size/opacity so overlap density matches the reference viewport.
 * Fixed 256×256 particle count + cover-zoom fill on small screens = darker composite.
 */
function getViewportDensityScale(width: number, height: number): number {
  const refArea = VIEWPORT_DENSITY_REF.width * VIEWPORT_DENSITY_REF.height;
  const area = width * height;
  const areaScale = Math.sqrt(area / refArea);
  const refZoom = getCoverZoom(VIEWPORT_DENSITY_REF.width, VIEWPORT_DENSITY_REF.height) * ORB.viewZoom;
  const currentZoom = getCoverZoom(width, height) * ORB.viewZoom;
  const autoScale = areaScale * (refZoom / currentZoom);
  return THREE.MathUtils.clamp(autoScale * ORB.densityScale, 0.42, 1.2);
}

function applyOrbViewportUniforms(width: number, height: number) {
  const densityScale = getViewportDensityScale(width, height);
  orbMat.uniforms.uPointSize.value = ORB.pointSize * densityScale;
  orbMat.uniforms.uOpacity.value = ORB.opacity * densityScale;
}

function getRenderSize(): { width: number; height: number } | null {
  const rect = renderHost.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);
  // Avoid bootstrapping from window size while the viewport is hidden or not laid out yet.
  if (width < 2 || height < 2) return null;
  return { width, height };
}

/** Cover-fit zoom so the burst fills the masked viewport and clips at overflow:hidden. */
function getCoverZoom(width: number, height: number) {
  const aspect = width / height;
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const dist = camera.position.z;
  const visibleHeight = 2 * Math.tan(vFov / 2) * dist;
  const visibleWidth = visibleHeight * aspect;
  const logoDiameter = LOGO_OUTER_RADIUS * 2 * ORB.logoScale * 1.05;
  const bleed = 0.9;
  return Math.max(
    visibleWidth / (logoDiameter * bleed),
    visibleHeight / (logoDiameter * bleed)
  );
}

function applyCameraComposition(width: number, height: number) {
  camera.aspect = width / height;
  camera.zoom = getCoverZoom(width, height) * ORB.viewZoom;
  camera.updateProjectionMatrix();
}

const bootstrapSize = getRenderSize() ?? { width: 1, height: 1 };
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(bootstrapSize.width, bootstrapSize.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(APPEARANCE.backgroundColor);
renderHost.appendChild(renderer.domElement);
document.body.style.background = APPEARANCE.backgroundColor;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  bootstrapSize.width / bootstrapSize.height,
  0.1,
  100
);
camera.position.z = 30;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;

let composer: EffectComposer;

function resizeRenderer() {
  const size = getRenderSize();
  if (!size) return;
  const { width, height } = size;
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  applyCameraComposition(width, height);
  applyOrbViewportUniforms(width, height);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  composer.setSize(width, height);
}

window.addEventListener("resize", resizeRenderer);
const renderHostObserver = new ResizeObserver(() => resizeRenderer());
renderHostObserver.observe(renderHost);

// ─── Section 4: Particle Targets + FBO ───────────────────────────────────────

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

const simScene = new THREE.Scene();
const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const simMat = new THREE.ShaderMaterial({
  vertexShader: simVert,
  fragmentShader: simFrag,
  uniforms: {
    uPositions: { value: null },
    uTime: { value: 0 },
    uDeltaTime: { value: 0.016 },
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
    uHoldSeconds: { value: ORB.logoHoldSeconds },
    uPulseMode: { value: 0 },
    uFlowThreePause: { value: ORB.logoFlowThreePauseSeconds },
    uPulseEase: { value: ORB.logoPulseEase },
    uTipExitFade: { value: ORB.logoTipExitFade },
    uHubChargeAmount: { value: ORB.logoHubChargeAmount },
    uChargeSwell: { value: ORB.logoChargeSwell },
    uHubReach: { value: ORB.logoHubReach },
    uNineOffset: { value: ORB.logoNineOffset },
    uRestSeconds: { value: ORB.logoRestSeconds },
    uExitTravel: { value: ORB.logoExitTravel },
    uExitB1x: { value: ORB.logoExitB1x },
    uExitB1y: { value: ORB.logoExitB1y },
    uExitB2x: { value: ORB.logoExitB2x },
    uExitB2y: { value: ORB.logoExitB2y },
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
    uPointSize: { value: ORB.pointSize },
    uOpacity: { value: ORB.opacity },
    uDepthFade: { value: ORB.depthFade },
    uParticleColor: { value: new THREE.Color(APPEARANCE.particleColor) },
    uThreePulseColor: { value: new THREE.Color(APPEARANCE.threePulseColor) },
  },
  transparent: true,
  blending: THREE.NormalBlending,
  depthWrite: false,
});

const orbPoints = new THREE.Points(particleGeo, orbMat);
// viewGroup carries manual X/Y composition rotation (independent of the resolve spin on orbPoints).
const viewGroup = new THREE.Group();
viewGroup.add(orbPoints);
scene.add(viewGroup);

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

function resetParticleSimulation() {
  seedMat.uniforms.uSeed.value = logoTargetsTex;

  renderer.setRenderTarget(fboA);
  renderer.render(seedScene, simCamera);
  renderer.setRenderTarget(fboB);
  renderer.render(seedScene, simCamera);
  renderer.setRenderTarget(null);

  simMat.uniforms.uPositions.value = fboA.texture;
  orbMat.uniforms.uPositions.value = fboA.texture;
}

// ─── Section 5: Post-processing ──────────────────────────────────────────────

composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
resizeRenderer();
requestAnimationFrame(() => {
  resizeRenderer();
  requestAnimationFrame(resizeRenderer);
});

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
composer.addPass(new OutputPass());

// ─── Section 6: Update Function ──────────────────────────────────────────────

function updateOrb(time: number, dt: number) {
  simMat.uniforms.uTime.value = time;
  simMat.uniforms.uDeltaTime.value = Math.min(dt, 0.05);
  simMat.uniforms.uPositions.value = fboA.texture;
  simMat.uniforms.uLogoResolve.value = ORB.logoResolve;
  simMat.uniforms.uLogoPulseTravelSeconds.value = ORB.logoPulseTravelSeconds;
  simMat.uniforms.uLogoPulseArmStagger.value = ORB.logoPulseArmStagger;
  simMat.uniforms.uLogoPulseCycleSeconds.value = ORB.logoPulseCycleSeconds;
  simMat.uniforms.uHoldSeconds.value = ORB.logoHoldSeconds;
  simMat.uniforms.uPulseMode.value = pulseMode;
  simMat.uniforms.uFlowThreePause.value = ORB.logoFlowThreePauseSeconds;
  simMat.uniforms.uPulseEase.value = ORB.logoPulseEase;
  simMat.uniforms.uTipExitFade.value = ORB.logoTipExitFade;
  simMat.uniforms.uHubChargeAmount.value = ORB.logoHubChargeAmount;
  simMat.uniforms.uChargeSwell.value = ORB.logoChargeSwell;
  simMat.uniforms.uHubReach.value = ORB.logoHubReach;
  simMat.uniforms.uNineOffset.value = ORB.logoNineOffset;
  simMat.uniforms.uRestSeconds.value = ORB.logoRestSeconds;
  simMat.uniforms.uExitTravel.value = ORB.logoExitTravel;
  simMat.uniforms.uExitB1x.value = ORB.logoExitB1x;
  simMat.uniforms.uExitB1y.value = ORB.logoExitB1y;
  simMat.uniforms.uExitB2x.value = ORB.logoExitB2x;
  simMat.uniforms.uExitB2y.value = ORB.logoExitB2y;

  // Render FBO
  renderer.setRenderTarget(fboB);
  renderer.render(simScene, simCamera);
  renderer.setRenderTarget(null);
  orbMat.uniforms.uPositions.value = fboB.texture;

  // Ping-pong
  const tmp = fboA;
  fboA = fboB;
  fboB = tmp;

  // Composition controls (handoff): manual X/Y rotation + cover-fit zoom.
  viewGroup.rotation.x = THREE.MathUtils.degToRad(ORB.viewPitchDeg);
  viewGroup.rotation.y = THREE.MathUtils.degToRad(ORB.viewYawDeg);
  const renderSize = getRenderSize();
  if (renderSize) {
    applyCameraComposition(renderSize.width, renderSize.height);
    applyOrbViewportUniforms(renderSize.width, renderSize.height);
  }
}

// ─── Section 7: GUI ──────────────────────────────────────────────────────────

const updateLogoTargets = () => {
  logoTargetsTex.dispose();
  logoTargetsTex = createLogoTargetsTexture(ORB.size, ORB.logoDepth, ORB.logoScale, ORB.logoWidth);
  simMat.uniforms.uLogoArmScale.value = ORB.logoScale;
  simMat.uniforms.uLogoArmWidth.value = ORB.logoWidth;
  simMat.uniforms.uTargets.value = logoTargetsTex;
  resetParticleSimulation();
  const renderSize = getRenderSize();
  if (renderSize) {
    applyCameraComposition(renderSize.width, renderSize.height);
    applyOrbViewportUniforms(renderSize.width, renderSize.height);
  }
};

let pulseFolderEl: HTMLElement | null = null;

function buildGui() {
  const gui = new GUI();

  const appearanceFolder = gui.addFolder("Appearance");
  appearanceFolder.addColor(APPEARANCE, "backgroundColor").name("Background").onChange((v: string) => {
    renderer.setClearColor(v);
    document.body.style.background = v;
  });
  appearanceFolder.addColor(APPEARANCE, "particleColor").name("Particles").onChange((v: string) => {
    orbMat.uniforms.uParticleColor.value.set(v);
  });
  appearanceFolder.addColor(APPEARANCE, "threePulseColor").name("3:00 pulse color").onChange((v: string) => {
    orbMat.uniforms.uThreePulseColor.value.set(v);
  });
  appearanceFolder.add(ORB, "opacity", 0.01, 0.6, 0.01).name("Particle opacity").onChange(() => {
    const renderSize = getRenderSize();
    if (renderSize) applyOrbViewportUniforms(renderSize.width, renderSize.height);
  });
  appearanceFolder.open();

  // All pulse params are pushed to the shader every frame from ORB (see updateOrb),
  // so these controllers just edit ORB — no per-controller onChange needed.
  const pulseFolder = gui.addFolder("Pulse choreography");
  pulseFolderEl = pulseFolder.domElement;
  pulseFolder.add(ORB, "logoPulseCycleSeconds", 1.6, 7.0, 0.05).name("Cycle (s)");
  pulseFolder.add(ORB, "logoPulseTravelSeconds", 0.35, 2.8, 0.05).name("Pulse travel (s)");
  pulseFolder.add(ORB, "logoPulseEase", 1.0, 5.0, 0.05).name("Gather ease (fast→slow)");
  pulseFolder.add(ORB, "logoPulseArmStagger", 0.0, 3.0, 0.01).name("Gather spread");
  pulseFolder.add(ORB, "logoHoldSeconds", 0.0, 1.5, 0.01).name("Hub charge / hold (s)");
  pulseFolder.add(ORB, "logoRestSeconds", 0.0, 2.0, 0.01).name("Rest (s)");
  pulseFolder.add(ORB, "logoHubChargeAmount", 0.0, 2.5, 0.01).name("Hub charge amount");
  pulseFolder.add(ORB, "logoHubReach", 0.0, 2.5, 0.01).name("Inner-edge reach");
  pulseFolder.add(ORB, "logoChargeSwell", 0.0, 2.5, 0.01).name("3:00 charge swell");
  pulseFolder.add(ORB, "logoTipExitFade", 0.02, 0.6, 0.01).name("Tip exit fade");
  pulseFolder.add(ORB, "logoNineOffset", -0.6, 0.6, 0.01).name("9:00 offset (Converge)");
  pulseFolder
    .add(ORB, "logoFlowThreePauseSeconds", 0.0, 1.2, 0.01)
    .name("Flow: pause before 3:00 (s)");
  pulseFolder.open();

  // 3:00 exit pulse — its own timing + cubic-bezier easing. Default = cubic-bezier(0, 0.85, 0.01, 0.98).
  const exitFolder = pulseFolder.addFolder("3:00 exit easing");
  exitFolder.add(ORB, "logoExitTravel", 0.25, 2.0, 0.01).name("Exit travel (s)");
  exitFolder.add(ORB, "logoExitB1x", 0.0, 1.0, 0.01).name("bezier P1 x");
  exitFolder.add(ORB, "logoExitB1y", 0.0, 1.0, 0.01).name("bezier P1 y");
  exitFolder.add(ORB, "logoExitB2x", 0.0, 1.0, 0.01).name("bezier P2 x");
  exitFolder.add(ORB, "logoExitB2y", 0.0, 1.0, 0.01).name("bezier P2 y");
  exitFolder.open();

  const compFolder = gui.addFolder("Composition (handoff)");
  compFolder.add(ORB, "viewYawDeg", -180, 180, 0.5).name("Y rotation (deg)");
  const viewPitchCtrl = compFolder.add(ORB, "viewPitchDeg", -90, 90, 0.5).name("X rotation (deg)");
  compFolder.add(ORB, "viewZoom", 0.3, 3.0, 0.01).name("Zoom").onChange(() => {
    const renderSize = getRenderSize();
    if (renderSize) {
      applyCameraComposition(renderSize.width, renderSize.height);
      applyOrbViewportUniforms(renderSize.width, renderSize.height);
    }
  });
  compFolder
    .add(
      {
        reset: () => {
          controls.reset();
          camera.position.set(0, 0, 30);
          controls.target.set(0, 0, 0);
          ORB.viewPitchDeg = 0;
          viewPitchCtrl.updateDisplay();
          controls.update();
        },
      },
      "reset"
    )
    .name("Reset camera");
  compFolder.open();

  const logoShapeFolder = gui.addFolder("Logo shape");
  logoShapeFolder.add(ORB, "logoScale", 0.8, 1.35, 0.01).name("Arm scale").onChange(updateLogoTargets);
  logoShapeFolder.add(ORB, "logoWidth", 0.6, 2.2, 0.01).name("Arm width").onChange(updateLogoTargets);
  logoShapeFolder.add(ORB, "logoDepth", 0.1, 3.0, 0.05).name("Bar depth").onChange(updateLogoTargets);
  logoShapeFolder.add(ORB, "logoForce", 0.0, 12.0).name("Logo force").onChange((v: number) => {
    simMat.uniforms.uLogoForce.value = v;
  });
  logoShapeFolder.add(ORB, "logoBreath", 0.0, 2.0).name("Logo depth drift").onChange((v: number) => {
    simMat.uniforms.uLogoBreath.value = v;
  });
  logoShapeFolder.add(ORB, "logoActivity", 0.0, 1.0, 0.01).name("Logo particle activity").onChange((v: number) => {
    simMat.uniforms.uLogoActivity.value = v;
  });
  logoShapeFolder.open();

  const partFolder = gui.addFolder("Particles");
  partFolder.add(ORB, "pointSize", 0.5, 8.0).onChange(() => {
    const renderSize = getRenderSize();
    if (renderSize) applyOrbViewportUniforms(renderSize.width, renderSize.height);
  });
  partFolder
    .add(ORB, "densityScale", 0.5, 1.5, 0.01)
    .name("Density scale (×auto)")
    .onChange(() => {
      const renderSize = getRenderSize();
      if (renderSize) applyOrbViewportUniforms(renderSize.width, renderSize.height);
    });
  partFolder.add(ORB, "depthFade", 0.0, 1.0).onChange((v: number) => {
    orbMat.uniforms.uDepthFade.value = v;
  });

  // Line-burst lasers (architectural "Lines"/"Waves" modes). Colors write the
  // --beam-c-* custom properties (read by the SVG gradient stops in hero.css);
  // timing binds straight to the scheduler config. All live.
  const rootStyle = document.documentElement.style;
  const readVar = (name: string, fallback: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const BURST = {
    hot: readVar("--beam-c-hot", "#d7b17f"),
    core: readVar("--beam-c-core", "#c09a68"),
    deep: readVar("--beam-c-deep", "#9d7034"),
    base: readVar("--beam-base", "#d6d3d1"),
  };
  const burstFolder = gui.addFolder("Line burst");
  burstFolder.addColor(BURST, "hot").name("Head (hot)").onChange((v: string) => rootStyle.setProperty("--beam-c-hot", v));
  burstFolder.addColor(BURST, "core").name("Core").onChange((v: string) => rootStyle.setProperty("--beam-c-core", v));
  burstFolder.addColor(BURST, "deep").name("Tail (deep)").onChange((v: string) => rootStyle.setProperty("--beam-c-deep", v));
  burstFolder.addColor(BURST, "base").name("Line base").onChange((v: string) => rootStyle.setProperty("--beam-base", v));
  burstFolder.add(burstConfig, "beams", 2, 12, 1).name("Beams / density");
  burstFolder.add(burstConfig, "stagger", 0, 0.5, 0.01).name("Stagger (s)");
  burstFolder.add(burstConfig, "travel", 0.4, 4.0, 0.05).name("Speed (s)");
  burstFolder.add(burstConfig, "ease", 1, 5, 0.1).name("Ease-out (1=linear)");
  burstFolder.add(burstConfig, "fadeIn", 0, 0.4, 0.01).name("Fade in");
  burstFolder.add(burstConfig, "fadeOut", 0, 0.5, 0.01).name("Dissolve");
  burstFolder.open();
}

// ─── Section 8: Hero mode sync (unified tab bar in hero.ts) ───────────────────

let particlesRunning = false;

function applyHeroMode(style: string, pulseModeValue: number | null) {
  particlesRunning = style === "particles";

  if (pulseModeValue !== null) pulseMode = pulseModeValue;

  const orbHost = document.querySelector<HTMLElement>(".hero-orb-viewport");
  if (orbHost) orbHost.style.display = particlesRunning ? "" : "none";

  if (pulseFolderEl) {
    pulseFolderEl.style.display = particlesRunning ? "" : "none";
  }

  if (particlesRunning) lastFrameTime = 0;
}

document.addEventListener("hero-mode-change", (event) => {
  const { style, pulseMode: pulseModeValue } = (
    event as CustomEvent<{ style: string; pulseMode: number | null }>
  ).detail;
  applyHeroMode(style, pulseModeValue ?? null);
});

applyHeroMode("architectural", null);

// ─── Section 9: Seed FBO & Animation Loop ────────────────────────────────────

buildGui();
resetParticleSimulation();

function animate(t: number) {
  requestAnimationFrame(animate);
  if (!particlesRunning) return;

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
