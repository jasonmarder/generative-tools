# Handoff — runlayer-particle-orb (Policy Network visual)

You are taking over work on the **Policy Network** experiment in this Three.js particle orb. Read this whole file before touching anything. The user (Jason) is design-driven, has strong taste, will course-correct hard if you go off-vision, and explicitly does not want you to stop for clarifying questions once direction is set — make reasonable calls and continue.

---

## TL;DR

- The project has three scene modes: **logo** (8-pointed star logo resolve), **network** (Policy Network — the thing in active development), and **plasma** (sunset-filament orb — built by someone else in parallel; do not touch).
- The Policy Network visual went through **two major pivots**. The current direction is: dark space, sparse star-like particles, **20–40 short connection lines drawing between proximal anchor points**, ~28% of which get **blocked mid-growth, flash red, and dissolve** (policy enforcement).
- All wiring exists and renders. The remaining work is mostly **visual polish** — getting bright "star" particle highlights wired, tuning line visibility against the cloud, and any further look adjustments Jason asks for.
- Everything is in **one file**: `src/main.ts` (~2k lines, grown from 1051). There are no separate modules.

---

## What Jason cares about (read this twice)

1. **Reference image set the direction.** He shared a starfield-nebula screenshot showing: dark space, sparse white-ish particle dots with brighter highlights, wispy cloud structure, NO drawn lines visible in that frame (lines are an additional layer on top).
2. **"No chunks floating around."** Earlier I built a signal-pulse system where ~700 recruited particles formed bright comets traversing edges. He hated it. Those are now disabled (`NETWORK.simultaneousPulses = 0`).
3. **"Connections formed between proximal particles with small lines being drawn between 20-40 groups... cooperating and collaborating."** Lines should feel like local handshakes, not bridges across the orb.
4. **"Some connection lines need to be 'blocked' in the process of trying to reach another particle and flash red and then dissolve."** Red flash + dissolve = policy enforcement. ~28% of connections.
5. **"Invisible structuring of teams / swarms of particles, rather than visible lines / infrastructure."** The orbital structure (team-bias rings) is expressed through density gradients in the particle population, never as drawn rings. There are zero `LineSegments` rings, no chord skeletons, no torus geometries in network mode.
6. **"We still want the many many particles like we have in logo resolve. That shows the scale and the proliferation of agents."** Particle count is **65,536** (256×256 FBO). Non-negotiable. Lines are an additional layer on top, not a replacement.
7. **"Make sure the dots are lerping / smoothstepping into place as the composition and its subcomponents forms and reforms."** Every transition is exponentially smoothed or smoothstepped. No pops, ever. There's a `Lerp everything` design pillar in the plan file — preserve it.
8. **Voice**: Jason wants direct, opinionated, slightly dry communication. Don't open with "Great question." State results, push back when warranted, recommend when there's a clear best path. He runs `/grill-me`-style sessions — he wants you to challenge his thinking.

---

## File layout

This is a single-file Vite + TypeScript + raw Three.js project. No React, no R3F.

```
runlayer-particle-orb/
├─ src/main.ts          # everything lives here (~2k lines, sectioned with banner comments)
├─ index.html           # body + experiment-tabs (Logo Resolve / Policy Network / Plasma Orb buttons)
├─ package.json         # three ^0.170, lil-gui ^0.20, vite ^6, ts ^5.7
├─ tsconfig.json        # strict mode on, ES2020, bundler resolution
└─ HANDOFF.md           # this file
```

Run:
```sh
cd /Users/jasonmarder/Documents/Runlayer/runlayer-particle-orb
bun install
bun run dev    # http://localhost:3000
bun run build  # production build, also catches TS errors
bun x tsc --noEmit  # standalone typecheck
```

There is also a planning doc at `/Users/jasonmarder/.claude/plans/working-on-particle-morphing-synchronous-cherny.md` — that captures the original signal-pulse design (now superseded by the connection-line pivot). Useful for context on what Jason rejected and why.

---

## main.ts section map

```
Section 1: Parameters                              src/main.ts:1–117
  - ORB constant (logo + shared)
  - APPEARANCE (logo palette: warm paper)
  - NETWORK constant (network-mode params, including connection lines and dark palette)
  - PLASMA constant (someone else owns this — leave alone)
  - prefersReducedMotion overrides
  - module-level state (build progress, policy mode weights, camera rotate ease)

Section 2: GLSL shaders                            src/main.ts:141–730
  - simVert: pass-through UV
  - simFrag: 3 branches gated by uPlasmaResolve / uNetworkMode / else (logo).
      Network branch: curl drift + shell restore + weak team bias toward orbital ring.
      Plasma branch: leave alone.
      Logo branch: unchanged from original.
  - orbVert: point-size + per-vertex brightness. Has a network-mode color path
      that reads roleData/signalsTex — currently a no-op because signal pulses are disabled.
      uStarData IS NOT YET WIRED INTO orbVert. This is the main open polish item.
  - orbFrag: soft disc with smoothstep alpha
  - postVert / vignetteFrag: vignette + film grain. Has uDarkMode (0=paper, 1=dark).

Section 3: renderer + scene + camera               src/main.ts:~755
Section 3b: invisible node attractors (legacy)     src/main.ts:~786
  - buildNodeLayers(), buildEdges(), createNodeTex(), createEdgeTex().
  - These existed for the signal-pulse system. The data structures are still
    constructed and uniforms still wired — the shader branches that consume them
    are present but inactive because `simultaneousPulses = 0`.
  - You can ignore unless you intentionally want to bring signal pulses back.

Section 3c: team-bias + role data textures         src/main.ts:~929
  - createTeamDataTex(): per-particle (teamId, biasX, biasY, biasZ) — drives the
    weak ambient pull toward orbital ring volumes. KEEP — this gives the swarm
    its sub-structure.
  - createRoleDataTex(): per-particle signal-recruitment slot — currently unused
    because signals are disabled. Safe to leave.
  - createStarDataTex(): per-particle star highlight factor 0..1. BUILT BUT NOT
    WIRED INTO ORB SHADER. See open work below.

Section 3d: SignalEngine class                     src/main.ts:~999
  - JS-side signal pulse manager. Still runs each frame, but with
    simultaneousPulses=0 it spawns nothing. The DataTexture stays full of -1s
    so the shader's `if (edgeIdx >= 0.0)` branch never fires. Safe to leave.

Section 3e: attractorMarkers (debug)               src/main.ts:~1133
  - SphereGeometry markers at node positions. Hidden by default.
  - Toggleable via NETWORK.debugShowAttractors GUI checkbox.

Section 3f: Connection lines (THE CURRENT VISUAL) src/main.ts:~1170
  - generateAnchors(): spherical Fibonacci, 110 anchors at radius 11 ± 1.6.
  - buildAnchorPairs(): pre-computed proximal pairs (dist <= 3.4).
  - Connection type + ConnectionManager class. Pooled THREE.LineSegments mesh
    with up to 80 slots (NETWORK.maxConnections caps active to 40).
  - Each connection: growth (ease-out) → hold → fade. Blocked variants: growth →
    stop → red flash → dissolve.
  - Uses AdditiveBlending so lines pop on dark bg. RenderOrder=5 to render on
    top of particles.
  - Vertex colors scaled by per-frame alpha * 2.4 boost.

Section 4: FBO infrastructure + simMat/orbMat     src/main.ts:~1216
  - 256×256 ping-pong WebGLRenderTarget pair.
  - simMat and orbMat ShaderMaterials with all uniforms wired.
  - particleGeo: 65536 UV-indexed positions.

Section 5: post-processing                        src/main.ts:~1416
  - EffectComposer → RenderPass → ShaderPass(vignette).
  - vignetteShader has uDarkMode uniform driven by activeExperiment.

Section 6: updateOrb function                     src/main.ts:~1432
  - Per-frame controller. Drives:
      - networkBuildProgress (3s smoothstep ramp on network entry)
      - logoResolve auto-resolve
      - plasmaResolve crossfade
      - policyModeCurrent crossfade (still wired but irrelevant with signals off)
      - simMat + orbMat uniforms
      - signalEngine.update() (no-op when capped at 0)
      - connectionManager.update() ← THE LINES
      - FBO ping-pong render
      - Camera auto-rotate ease (~30s/rev target via NETWORK.rotationSpeed)
      - orbPoints.rotation.y for logo mode

Section 7: seed FBO + animation loop              src/main.ts:~1520
Section 8: lil-gui                                src/main.ts:~1542
  - buildGuiForExperiment(): destroys and rebuilds the GUI per active scene so
    each experiment has its own scoped panel. Network panel has a Policy network
    folder, Connections folder, Swarm folder. Plasma owns its own. Logo has
    Simulation + Logo shape folders.
```

---

## Current state of network mode (as of handoff)

**Working:**
- Dark background `#0A0B0E`, cream particles `#E8E5DD`, opacity 0.55, pointSize 1.3
- 65k particles drift on a deformable sphere shell with curl noise + a weak team-bias toward 6 orbital ring volumes (subtle, you only notice if you look — that's intentional)
- 3-second smoothstepped build ramp (`uBuildProgress` 0→1) chaos → order
- Slow auto-orbit camera, eased on entry (~30s/rev)
- Connection lines spawn at 14/sec, ~30 active at steady state, between proximal anchor pairs
- Growth animation (ease-out) → hold → fade. Smooth, no pops
- ~28% blocked → red flash → dissolve
- Vignette darkens in network/plasma modes
- Scene-scoped lil-gui — network controls don't touch logo or plasma uniforms
- Logo mode untouched. Plasma mode untouched.

**Open polish items (in priority order):**

1. **Star particles not wired into orb shader.** `createStarDataTex()` builds a per-particle star-factor texture (5% of particles flagged as bright stars, half of those at full brightness, half at 60–90%). The texture is bound to `uStarData` in `orbMat`'s uniforms but `orbVert` doesn't currently sample it. Jason's reference shows distinct bright stars scattered through the cloud — this is the missing pop. To wire:
   - In `orbVert`, sample `uStarData` at `position.xy`, read `.r` as star factor.
   - Gate by `uNetworkMode > 0.5` so logo is unaffected.
   - Boost `gl_PointSize` (~2.5×) and `vBrightness` (~1.6×) for star particles.
   - In `orbFrag`, optionally make stars crisper (smaller smoothstep softness).
   - I drafted this in an earlier rewrite — see git history of main.ts. Or write fresh.

2. **Connection visibility vs. particle haze.** At small/medium zoom levels the amber lines can still get overwhelmed by the particle field. Options if Jason wants them stronger: bump `boost` (currently 2.4 in `ConnectionManager.update`), shift line color toward white (`#FFE6B5` instead of `#C9A86B`), or reduce particle opacity further (currently 0.55).

3. **Line thickness.** Three.js's default WebGL line width is 1px regardless of `LineBasicMaterial.linewidth`. If Jason wants thicker lines, switch to `Line2`/`LineMaterial` from `three/examples/jsm/lines/` — it supports per-instance width but requires different geometry. Real cost, only do if asked.

4. **Anchor placement.** Currently 110 anchors at radius 11 ± 1.6 via spherical Fibonacci. The connection lines therefore form a uniform shell of activity. If Jason wants the network density to vary (more activity in some regions, sparser elsewhere) to match a "galactic" feel, weight the Fibonacci output by a curl-noise field at the same orbital ring positions used by the team bias.

5. **Connection lines stay in world space — they don't follow the camera orbit visually because they're added to `scene`, not nested in a rotating group.** This is fine because the camera rotates around the scene anyway. If anyone wants the orb to rotate independently of the camera in network mode, the lines and orbPoints need to share a parent Group (in an earlier rewrite I called this `networkGroup`; got removed in the targeted-edit cycle).

---

## How to verify changes

Run `bun run dev`, open `http://localhost:3000/?experiment=network`. Watch the first ~6 seconds:

- **0.0–0.5s**: near-empty dark space, particles in initial random sphere
- **0.5–3.0s**: orb settles, team-bias structure quietly emerges, no lines yet
- **~1.4s onward (relative to build start)**: first connection lines start drawing — short amber line segments growing between nearby anchor points
- **~3s+**: steady state, ~30 active lines at any moment, occasional red flashes when one gets blocked

URL params:
- `?experiment=network` — Policy Network
- `?experiment=logo` — Logo Resolve (golden path; verify no regressions)
- `?experiment=plasma` — Plasma Orb (someone else owns this; verify no regressions)
- `&hideGui` — hides the lil-gui panel for clean screenshots
- `&policy=A|B|C` — sets the policy mode crossfade weight (no visible effect with signals disabled)

Screenshot via Playwright:
```ts
// Loaded earlier in session:
mcp__plugin_playwright_playwright__browser_navigate(url)
mcp__plugin_playwright_playwright__browser_take_screenshot({ type: "png", filename: "..." })
mcp__plugin_playwright_playwright__browser_console_messages({ level: "error" })
```

Playwright sometimes loses its browser. Recovery:
```sh
pkill -f ms-playwright; sleep 1
```
Then re-navigate.

---

## Architecture gotchas

1. **TS strict mode + Float32Array typing.** TS 5.7+ types `new Float32Array(size)` as `Float32Array<ArrayBufferLike>`, which is not assignable to `THREE.DataTexture`'s `BufferSource` parameter. Workaround used everywhere: `new Float32Array(new ArrayBuffer(byteLength))` which gives `Float32Array<ArrayBuffer>`. **Do this consistently.** Also annotate class field types explicitly as `Float32Array<ArrayBuffer>` when storing.

2. **The user is editing this file in parallel sometimes.** During my work, the Plasma mode was added by someone else. If you do a full `Write` and the file has been modified since your last `Read`, the harness will reject the write. Prefer targeted `Edit`s over full `Write`s, and re-read sections you're about to touch.

3. **Don't break logo or plasma.** Jason's verification checklist always includes "no regressions in logo/plasma." The logo branch of simFrag uses fixed `0.016` for dt (it predates the `uDeltaTime` uniform); preserve that. The plasma branch is wholly owned by another agent — don't refactor uniforms or simFrag structure that plasma depends on (`uPlasmaResolve`, `uPlasmaActivatedRatio`, `uPlasma*`).

4. **The plasma constant references `PLASMA.filamentCount`** in the uniforms block (`uPlasmaFilamentCount: { value: PLASMA.filamentCount }`) but `filamentCount` is not declared in PLASMA at the top. TypeScript hasn't complained yet so this may be a `noImplicitAny` blind spot or it was added since I checked. Don't touch unless you mean to.

5. **`hideGui` URL param.** When present, GUI is suppressed entirely. Use for screenshots and demos.

6. **Camera rotation.** Driven by OrbitControls `autoRotateSpeed`. Network mode targets `NETWORK.rotationSpeed * 2.0` (so `1.0` → ~30s/rev). Eased in via `cameraRotateCurrent` over time. Logo uses fixed `0.35` (very slow). Plasma uses `0.6`.

7. **Scene graph in network mode.** `connectionManager.lineSegments` and `attractorMarkers` and `orbPoints` are all direct children of `scene`. There's no shared rotating group. The earlier "networkGroup" approach was removed during the targeted-edit pivot.

---

## Style constraints (palette, voice, motion)

**Palette:**
- Logo mode: warm paper `#F5F5F4` bg, near-black `#1C1917` particles
- Network mode: dark `#0A0B0E` bg, cream `#E8E5DD` particles, amber `#C9A86B` connections, red `#D14438` for blocked flash
- Plasma: sunset gradient hot/warm/ember `#FFC850 / #FF823C / #FF4040`

**Voice (in code comments and in chat):**
- No emoji unless explicitly asked
- Direct, opinionated, slightly dry. No "Great question" / "Absolutely" / sycophancy.
- Make recommendations; commit to a take. Hedging wastes Jason's time.
- Short responses. Brevity is mandatory.
- Push back when warranted.

**Motion:**
- Every transition smoothstepped or exponentially smoothed. No pops, ever.
- "No pops, ever" is a top-priority design constraint Jason explicitly stated. If a value changes by more than ~5% in one frame without easing, that's a bug.

**Comments in code:**
- Default to no comments. Add only when the WHY is non-obvious — hidden constraint, subtle invariant, workaround, surprising behavior.
- Never narrate WHAT the code does (the names already do that).
- Never reference the current task or callers in comments.

---

## What to do when Jason gives new direction

1. **Read what he said carefully.** He's specific and his pivots are real. The signal-pulse system → connection-line system pivot was a complete rebuild based on one paragraph + a reference image.
2. **Make the call yourself.** He'll redirect if needed. Don't ask for clarification unless something is genuinely ambiguous and the wrong choice would be expensive to reverse.
3. **Use Playwright + screenshots to verify.** UI/visual work without browser verification is incomplete per his own CLAUDE.md.
4. **Show progress quickly.** Visual feedback beats long descriptions.
5. **Update this handoff doc** when you make non-trivial changes so the next agent starts at your endpoint, not mine.

---

## Useful past artifacts

- Plan file: `/Users/jasonmarder/.claude/plans/working-on-particle-morphing-synchronous-cherny.md` — pre-pivot design doc. Documents the signal-pulse system Jason rejected. Useful for understanding what NOT to do and why.
- Screenshots taken during this session live in repo root: `network-v3-conn.png`, `net-pivot.png`, etc. Some show the rejected blob/chunks visual; some show current state.
- Keith's original brief (from a Slack-style message Jason shared): "The animation can start sparse and quiet, then a single 'signal' pulse begins moving through the 'network'... individual nodes light up, new paths draw themselves in real time, and everything starts to feel more orchestrated... The security layer appears directly around the motion itself. Some paths open smoothly while others get blocked, rerouted, or dissolved to imply some sort of policy enforcement. The contrast between fluid motion and more structured orchestration is the key visual tension." Note: Jason's connection-line interpretation departs significantly from Keith's "single signal pulse traveling" framing. Follow Jason's lead.

---

## Quick checklist before signing off your turn

- [ ] `bun x tsc --noEmit` clean
- [ ] `bun run build` clean
- [ ] Browser test: logo mode unchanged
- [ ] Browser test: network mode renders dark bg + particles + visible lines + occasional red flashes
- [ ] Browser test: plasma mode unchanged
- [ ] No pops on mode switching or build replay
- [ ] This handoff doc updated if you changed anything material
