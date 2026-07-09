# Plasma Orb tab — handoff

This is the handoff for the **Plasma Orb** experiment. Pick up from here and make it better. The basics work, but the streamer aesthetic isn't yet at the level of the reference video.

---

## TL;DR

A third tab was added to the existing 65,536-particle FBO simulation:

- **Logo Resolve** — existing
- **Policy Network** — existing
- **Plasma Orb** — **NEW**, this handoff

The Plasma Orb morphs the same 65k particles into a Tesla-globe-style scene:
a dim spherical shell, a bright dense core, and animated radial filaments
crackling outward. Filaments are colored with a **breathing sunset gradient**
adapted from Jakub Antalík's [border-beam](https://github.com/Jakubantalik/border-beam)
component (MIT) — sunset palette (`hot → warm → ember`) sampled along each
filament's stroke phase, with a slow 12s HSL hue-rotation breath underneath.

The scene is **walled off**: every plasma knob lives in its own lil-gui folders,
mutates only plasma-owned state, and never bleeds into Logo or Network.

Original plan: `/Users/jasonmarder/.claude/plans/add-a-new-tab-bubbly-whale.md`
Reference video frames: `/tmp/plasma-ref/frame_00{1..4}.png`

---

## What works (verified)

- Three tabs render in `index.html`; `Experiment` type union includes `"plasma"`.
- `?experiment=plasma` URL param boots directly into the plasma scene.
- `setExperiment` swaps in plasma-specific state and tweens `uPlasmaResolve` 0→1 over `PLASMA.resolveDuration` (1.2s default).
- Dark background (`PLASMA.backgroundColor = "#0A0A12"`) is applied only while plasma is active. `APPEARANCE.backgroundColor` is never touched.
- Shell particles get a plasma-only mono tint (`uPlasmaShellColor`) so they're visible against the dark background; `uParticleColor` is left untouched.
- Sunset gradient color pipeline works (verified visually — `plasma-streamers.png` shows colored particles in the right palette range).
- `bun run dev` + `npm run build` + `npx tsc --noEmit` all clean.
- All 15 `PLASMA.*` keys are wired to lil-gui controllers in `buildGuiForExperiment`'s plasma branch — see the **Coverage audit** in the plan.

## What's incomplete / underwhelming

This is the meat of the handoff — the streamer aesthetic doesn't yet match
the reference video. The current implementation produces colored points,
but not the bright, branchy, lightning-tendril look of a real plasma globe.

Open visual issues, ranked by impact:

1. **Streamers don't look like streamers.** The radial filaments are too sparse and too low-contrast against the shell. The reference video has obvious bright thread-like trails; ours look like a noisy shell with some warm-tinted dots scattered through.
2. **No clear "hot core."** The reference has a near-saturated white-hot center; ours has a slight density bump at phase ≈ 0 but it's not visually dominant.
3. **No flicker / no re-direction.** Real plasma globes have tendrils that snap to new positions every few seconds. Currently each filament group has a stable direction forever — the only variation comes from each particle's phase advancing through the cycle.
4. **Breath is barely visible.** With `breathHueRange = 30°` and `breathBrightness = 0.10`, the inhale-exhale is subtle — possibly too subtle for the dark background. Either bump the defaults or replace HSL hue-rotate with a more visible mechanic (e.g., periodic saturation pump).
5. **Whoosh is invisible.** The plan promised a per-stroke color gradient (hot leading edge → ember trailing tail). It's implemented, but the streamers are too sparse to read as colored gradients along a line — you just see scattered red/orange/yellow points.

## Visual evidence on disk

- `plasma-initial.png` — first attempt, cream background → activated particles invisible. Why we added the dark background override.
- `plasma-dark-a.png` — dark background, no group bucketing → scattered sunset points, no streamer structure.
- `plasma-streamers.png` — dark background, group bucketing added → still doesn't look right, but with structure. **This is the current state.**

Reference frames (what we're aiming for):
- `/tmp/plasma-ref/frame_001.png` through `frame_004.png`

---

## Code map

All work lives in two files:

### `src/main.ts`
Vite-served vanilla TypeScript, no framework. Single file, ~1800 lines, growing.
**Important:** this file is being edited by multiple parallel agent sessions
(see "File-collision context" below). Read with git diff before editing.

| Section | Lines (approx) | What's there |
|---|---|---|
| `PLASMA` config | ~80–110 | Walled-off scene state. 15 keys, all wired to GUI |
| Plasma reduced-motion overrides | ~135 | parallel block to the existing ORB/NETWORK reduced-motion overrides |
| `applyBackgroundForScene` | ~140 | scene-aware clear color helper |
| `simFrag` plasma branch | ~332–390 | gated by `uPlasmaResolve > 0.001`; runs filament + shell physics |
| `orbVert` plasma block | ~689–718 | gated the same way; samples sunset gradient + HSL breath |
| `simMat.uniforms` plasma keys | ~1548–1555 | physics uniforms |
| `orbMat.uniforms` plasma keys | ~1589–1602 | color uniforms |
| `setExperiment` plasma branch | ~1638–1700 | sets `plasmaResolveTarget`, camera, autoRotate |
| `updateOrb` plasma resolve smoothing | ~1760–1772 | exponential smoothing of `plasmaResolveCurrent` |
| `buildGuiForExperiment` plasma branch | search for `if (experiment === "plasma")` | four folders, every key wired |

### `index.html`
- `<button data-experiment="plasma">Plasma Orb</button>` added to `.experiment-tabs`.

### `/Users/jasonmarder/.claude/plans/add-a-new-tab-bubbly-whale.md`
The approved original plan with the full mechanism design and isolation contract.

---

## Architecture decisions (don't undo these without reason)

1. **One shared FBO simulation, three branches.** simFrag uses `if (uPlasmaResolve > 0.001) { plasma } else if (uNetworkMode > 0.5) { network } else { logo }`. No second render target. The plasma "targets" are computed procedurally per-particle inside the shader — no `plasmaTargetsTex` is uploaded.

2. **Plasma is gated by `uPlasmaResolve` as a *force scalar*, not a `uPlasmaMode` flag.** This means as the user enters plasma, the morph happens naturally: the physics flips to plasma logic immediately (once resolve > 0.001), but the filament-pull force ramps from 0 over `PLASMA.resolveDuration`. Particles drift smoothly into position rather than snapping.

3. **Activated particles are picked by hash, not by per-particle attribute.** `step(hash21(vUv + 11.1), uPlasmaActivatedRatio)` in both simFrag and orbVert. Identical hash in both shaders → identical "is this particle activated" decision → same set of particles get filament physics AND filament color.

4. **Filament groups via secondary hash.** `floor(hash21(vUv + 31.3) * uPlasmaFilamentCount)` buckets activated particles into ~24 groups. All particles in a group share an outward direction `dir`. Within a group, particles get individual phase offsets so they spread along the streamer's length. This is what makes the points form a *line* from core to shell rather than a scatter.

5. **Sunset gradient is RGB-anchored, not gradient-textured.** Three uniforms `uPaletteHot`, `uPaletteWarm`, `uPaletteEmber`. Two `mix()` calls in the vertex shader. The "breath" is added in HSL space using inline `rgb2hsl` / `hsl2rgb` helpers.

6. **Background override is local, not config-mutating.** `applyBackgroundForScene` reads either `PLASMA.backgroundColor` (if plasma is active) or `APPEARANCE.backgroundColor`. The shared "Appearance > Background" controller still mutates `APPEARANCE.backgroundColor` but has no visible effect on the plasma tab. Pre-stages the value for when you switch back.

---

## Tuning starting points (no code changes needed)

The plasma scene is fully tweakable in lil-gui at runtime. Start here when
chasing the reference aesthetic:

| Goal | Folder → Knob | Try this |
|---|---|---|
| Fewer thicker tendrils | Plasma activity → Filament count | 12–16 |
| More tendrils, thinner | Plasma activity → Filament count | 32–48 |
| Sharper line geometry | Plasma activity → Filament force | 12–16 |
| Faster crackle | Plasma activity → Filament speed | 0.5–0.8 |
| Brighter "hot core" | Plasma activity → Core tightness | 0.4–0.7 (lower = tighter) |
| Dimmer shell so filaments dominate | Plasma scene → Shell color | a darker grey like `#3A3D40` |
| More dramatic breath | Sunset gradient → Breath hue range | 45–60° |
| Snappier transition in | Transition → Resolve duration | 0.6–0.8s |
| Calmer overall | Plasma activity → Shell turbulence | 0.6–0.8 |

You can persist a tuned configuration by reading the values from `PLASMA` in
the browser console (`PLASMA` is module-scoped — won't be reachable without
exporting it; see "Open improvements").

---

## Open improvements (concrete next steps)

Tackled roughly in order of expected impact-per-effort.

### A. Bigger visual win: make filaments visibly *branchy*
The reference video shows tendrils that branch and zigzag, not perfectly
straight lines. Currently each filament is `dir * r` — a strict ray.

Try: jitter each particle off the ideal radial line using snoise of `(dir, phase)`. Pseudo-shader:
```glsl
// in the simFrag plasma branch, after computing plasmaTarget:
vec3 lateral = vec3(
  snoise(vec3(dir.yz * 4.0, uTime * 0.3 + groupId)),
  snoise(vec3(dir.zx * 4.0, uTime * 0.3 + groupId + 11.0)),
  snoise(vec3(dir.xy * 4.0, uTime * 0.3 + groupId + 23.0))
) * uPlasmaBranchJitter * r * 0.15;
plasmaTarget += lateral;
```
Add `PLASMA.branchJitter` (default ~0.6, range 0–2.0) and wire it to the GUI.

### B. Filaments should reroute periodically
Real plasma globes have tendrils that snap to new directions every few seconds.

Approach: on each cycle wraparound (when `phaseRaw` crosses 0), regenerate the group direction. Implementation:
```glsl
float cycleIndex = floor((uTime * uPlasmaSpeed + groupBasePhase * cycle) / cycle);
vec2 cycleKey = vec2(groupId + cycleIndex * 73.1, groupId * 7.91 + cycleIndex * 31.7);
vec3 dir = normalize(vec3(
  hash21(cycleKey + 17.3) - 0.5,
  hash21(cycleKey + 41.9) - 0.5,
  hash21(cycleKey + 73.1) - 0.5
));
```
This will look jarring without crossfade between old and new direction —
worth experimenting with a 0.3s blend window at cycle wraparound.

### C. Hotter core
The plan said particles at phase < 0.05 cluster at the origin via
`coreRadius = 0.55 / uPlasmaCoreTightness`. Currently this only affects ~5% of activated
particles' lifecycle — not enough particles concentrated at the center at any given time.

Two parallel fixes:
1. **Recruit a fixed subset to the core**: pick ~15% of activated particles to PERMANENTLY orbit the core (not advance through filament phases). They form the "core attractor cluster."
2. **Saturate core colors**: at `phase < 0.1`, blend `breathed` toward `vec3(1.0)` (near-white) so the core renders near-saturated.

### D. Bloom pass
Without bloom, bright filament colors look matte. Add a `UnrealBloomPass` from `three/examples/jsm/postprocessing/UnrealBloomPass.js` after the existing `RenderPass` and before the vignette pass. Gate it on `uPlasmaResolve > 0.001` by setting `bloomPass.strength = plasmaResolveCurrent * 0.6`. Bloom is what makes the streamers feel *electrically hot*.

### E. Additive blending only for activated particles
Currently `orbMat` uses `THREE.NormalBlending`. Filaments would look better
with `THREE.AdditiveBlending` so overlapping particles brighten each other.
But shell particles use additive looks washed out on the dark background.

Possible approach: keep one `THREE.Points` with `NormalBlending`, add a SECOND `THREE.Points` for activated particles only using `AdditiveBlending`. Render both with the same FBO. The second mesh discards non-activated particles in its vertex shader.

This is a bigger refactor. Pay it down only if (A)–(D) don't get the look there.

### F. Expose `PLASMA` for runtime inspection
Add `(window as any).PLASMA = PLASMA;` near the bottom of main.ts so the
console can `JSON.stringify(PLASMA, null, 2)` after tweaking.

### G. "Copy all values" support for plasma
The original GUI has a "Copy all values" button that exports the logo
configuration as JSON. The plasma branch never got the equivalent. Look at
how the logo branch's `getCurrentValues` / `copyCurrentValues` work and
mirror them for plasma.

### H. Reduced-motion polish
The reduced-motion block lowers `PLASMA.filamentSpeed`, `shellTurbulence`,
`breathDuration`, and `breathBrightness`. It does NOT lower
`filamentForce` or `activatedRatio`. Worth auditing — reduced-motion users
might want fewer, slower tendrils.

---

## Verification checklist (for any fix)

After making changes, run through this:

1. `npx tsc --noEmit` — clean
2. `npx vite build` — clean
3. `bun run dev`, navigate to http://localhost:3001/?experiment=plasma — no console errors
4. **Filament structure**: zoom in, can you see particle streams going from center to shell? Or are particles scattered?
5. **Color gradient**: pick one tendril and watch it — does its leading edge look yellow-white and trailing tail look red?
6. **Breath**: watch for 30s without touching anything. Subtle hue shift (warmer ↔ cooler within orange band) over ~12s? Faint brightness pulse synced?
7. **Isolation test** — the critical one:
   - On plasma: set `shellTurbulence` to 3.0 and all three sunset colors to bright cyan
   - Switch to Logo Resolve — should look exactly like default logo, no leaked turbulence or color
   - Console: `ORB.turbulence` should still be 1.1, `APPEARANCE.particleColor` still `"#1C1917"`
   - Repeat round-trip with Policy Network
8. **URL params**: `?experiment=plasma` boots directly to plasma; `?hideGui&experiment=plasma` loads plasma with no GUI panel
9. **Tab cycling**: click Logo → Network → Plasma → Logo a few times. No flicker, no stuck states, no console errors. The morph between tabs should be smooth.

---

## File-collision context (read before editing)

While this plasma feature was being built, **another Claude session was concurrently editing `src/main.ts`** with a major Policy Network upgrade (new `ConnectionManager` class, `applyParticlePaletteForScene`, `NETWORK.backgroundColor`, etc.). This caused some flapping during development:

- An early build broke with `ReferenceError: connectionManager is not defined` because the other session had introduced a reference to `connectionManager` in `setExperiment` before declaring the const. By the time I'd finished my plasma additions, the other session had completed its declaration too and the error went away.
- The other session added `applyParticlePaletteForScene` which **does** know about plasma (it has an `else if (activeExperiment === "plasma")` branch that leaves `uParticleColor` untouched). So the two scenes coexist correctly.
- `applyBackgroundForScene` was extended by the other session to include `NETWORK.backgroundColor`. The function I originally wrote handled only plasma + appearance; it was upgraded in place.

**Implication for you:** before you start editing, run `git diff HEAD src/main.ts` to see what's changed since this handoff was written. If you see unfamiliar code, it might be from another agent. Don't undo it.

The file grew from ~1450 lines (pre-plasma) → ~1800 lines (post-plasma + post-network-v2). Treat it as a shared resource.

---

## Won't-fix / out of scope

- **GSAP-based morph tween**: the plan explicitly avoided adding a GSAP dependency. The plasma resolve uses native `requestAnimationFrame` + exponential smoothing. Don't add GSAP just for this.
- **WebGL2 / compute shaders**: the existing pipeline is WebGL1-compatible. Don't reach for compute shaders for plasma effects when fragment-shader procedural targets work fine.
- **Touching `ORB`, `APPEARANCE`, or `NETWORK` from plasma controllers**: this is the walled-off contract. Breaking it defeats the whole isolation goal. If you need new shared state, add it to a *new* top-level config (e.g. `SHARED_PARTICLES`) and have all three scenes opt in deliberately.

---

## Acknowledgments

- **Border Beam** by Jakub Antalík (`https://github.com/Jakubantalik/border-beam`, MIT) — sunset palette and breathing-gradient mechanic adapted (not imported) from `src/styles.ts`.
- Original 65k-particle FBO simulation by the previous author — plasma reuses the full pipeline.
