---
title: "Breaking rigid spherical shell into organic smoky cloud"
category: shader-issues
component: particle-simulation
tags: [glsl, curl-noise, restoring-force, gpgpu, fbo]
severity: visual
date: 2026-02-19
---

# Rigid Sphere Shell → Organic Smoky Cloud

## Symptom

Particle orb renders as a clean, rigid ring/sphere. Particles are locked to a fixed radius — no organic deformation, no wispy tendrils, no sense of a malleable cloud.

## Root Cause

**Linear restoring force with high stiffness.** The simulation shader used:

```glsl
float diff = dist - uRadius;
p -= normalize(p) * diff * uRestoreForce * 0.016;
```

This pulls every particle linearly toward `uRadius` with `restoreForce = 2.0`. Combined with low `turbulence = 0.15`, the curl noise couldn't overcome the spring — particles stayed rigidly locked to the shell.

Three compounding issues:
1. **Single fixed target radius** — all particles restore to the same `r`, producing a perfect sphere
2. **Linear spring** — equally strong near and far from shell, no "wandering zone"
3. **Low turbulence + only 2 curl octaves** — not enough energy to break the shell

## Solution

Four surgical changes in `src/main.ts`:

### 1. Rebalance parameters

```ts
radiusSpread: 2.0,      // was 0.3 — wider initial spread
shellDeform: 3.0,       // NEW — noise-driven shell deformation
turbulence: 0.6,        // was 0.15 — let noise breathe
curlSpeed: 0.4,         // was 0.3
restoreForce: 0.8,      // was 2.0 — softer spring
```

### 2. Per-particle phase offset

```glsl
float phase = snoise(vec3(vUv * 50.0, 0.0)) * 0.5;
float t = uTime * uCurlSpeed + phase;
```

Each particle samples noise at a unique time offset, breaking lockstep motion.

### 3. Third curl noise octave

```glsl
vel += curlNoise(noisePos * 4.0 + 13.7) * uTurbulence * 0.25;
```

High-frequency wisps that create smoky tendrils breaking from the surface.

### 4. Deformable shell + cubic soft restoring force (the key change)

```glsl
vec3 dir = normalize(p);
float targetR = uRadius + snoise(dir * 1.5 + uTime * 0.15) * uShellDeform;

float nd = (dist - targetR) / uRadius;
float restore = nd * nd * sign(nd);
p -= dir * restore * uRestoreForce * uRadius * 0.016;
```

- **Deformable shell**: `targetR` varies per-direction via simplex noise — the sphere bulges and contracts organically
- **Cubic restoring**: `nd^2 * sign(nd)` is weak near the shell (particles wander freely) but snaps hard when they drift far. This is the key to "malleable and organic"

## Prevention / Design Principles

When building particle systems with restoring forces:

- **Never use linear springs for organic motion** — cubic or higher-order springs create a "soft zone" near the target
- **Always add per-particle phase offsets** — without them, all particles move in lockstep
- **Target radius should be a field, not a scalar** — noise-deformed shell > fixed radius
- **3+ curl noise octaves** for smoke/cloud effects — 2 octaves look turbulent but not smoky
- **Expose deformation parameters in GUI** — organic effects need real-time tuning

## Verification

1. Shell bulges and breathes — no longer a clean circle
2. Wispy tendrils break from the surface
3. GUI: `shellDeform` 5-6 for dramatic deformation, `turbulence` 1.0+ for aggressive wisps
4. Hollow center still visible but with organic, fuzzy edges
