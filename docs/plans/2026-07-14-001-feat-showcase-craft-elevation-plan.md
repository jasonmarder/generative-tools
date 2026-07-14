---
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
date: 2026-07-14
type: feat
---

# feat: Elevate generative-tools showcase to acquisition-demo craft bar

## Summary

Jason demos this site to a studio considering acquiring him this week. The site (a fullscreen iframe stage + bottom dock picker hosting 8 prebuilt generative tools) has broken interactions, visual sloppiness, and a blank-flash tool switch. Fix the confirmed defects, rebuild the tool-switch transition so it never blanks, and run a systematic craft pass — executed as 3 rounds of Opus subagent implementation, each followed by an adversarial in-browser review by the lead.

## Problem Frame

Empirical audit (Playwright, dev server) found:

1. **Broken dropdowns (confirmed root cause).** In `public/tools/tachyon-burst`, the right control rail (`.rail--right`) has `backdrop-filter: blur(18px)` + `overflow: hidden`. `backdrop-filter` makes the rail the containing block for `position: fixed` descendants, so every `dialkit-select` dropdown resolves its viewport coordinates against the rail → renders off-screen and clipped. State toggles (`data-open=true`, chevron rotates) but nothing paints. Every tool snapshot ships `backdrop-filter` somewhere; all 8 must be audited for the same fixed-inside-filtered-ancestor trap. Note: `apps/tachyon-burst` source predates the snapshot (no `dialkit` in it) — fixes land in the `public/tools/` snapshot CSS/JS, which is the served artifact per the repo's own layout.
2. **Stray underlines.** `.dock-option` items are `<a>` elements with no `text-decoration: none` (`src/styles.css`). Every menu item is underlined — reads broken.
3. **Blank tool switch.** `selectTool` half-fades the single iframe (95ms), swaps `src`, and the stage goes dark/white while the next tool boots. Light-background tools flash hard. The complaint "goes blank" is this.
4. **Sloppiness inventory.** Inconsistent label casing in the tool list ("chainguard block" vs "Gradient isometric"); no favicon; Escape only closes the menu when focus is inside it; misc near-miss motion values.

## Requirements

- R1: All dropdowns in all 8 tools open, paint, and select correctly.
- R2: No unintended text decoration anywhere in the shell.
- R3: Tool switch never shows a blank/flash frame: old tool remains visible until the new tool is ready, then a gentle crossfade completes. Loading state is visible if the new tool is slow. Reduced-motion path swaps instantly without animation.
- R4: The shell (dock, menu, transitions) meets the Vercel/Linear bar: token-disciplined values, one motion grammar, invisible-details complete (a11y, history, focus, cleanup).
- R5: Production build (`vite build` + `preview`) verified, not just dev.

## Key Technical Decisions

- **KTD1 — Double-buffered iframes for the transition.** Two stacked iframes; the incoming tool loads hidden (`src` set, opacity 0), on `load` + settle frame crossfade in over the outgoing frame, then unload the old one (`src="about:blank"`) to free GPU/CPU. This is the only way to satisfy "never blank" with cross-framework snapshot apps. Keep the house grammar: opacity + faint blur, ease-out tokens.
- **KTD2 — Fix dropdowns in snapshot CSS, minimally.** Prefer removing `backdrop-filter` from the offending clipping ancestors (rails sit over near-black; the blur is nearly invisible) or re-anchoring the dropdown, whichever is least invasive per tool. No framework rebuilds of snapshots.
- **KTD3 — 3-round loop, lead reviews adversarially.** Subagents (Opus) implement; the lead drives the real browser after each round (mid-flight screenshots, DOM probes, settled-state cleanup checks) and feeds defects into the next round. Taste calls stay with the lead per design-taste doctrine.

## Implementation Units

### U1. Repair broken dropdowns across all tool snapshots
**Goal:** R1. **Files:** `public/tools/*/`(css/js snapshots). **Approach:** Fix tachyon-burst rail containing-block bug; audit remaining 7 snapshots for fixed-position elements inside `backdrop-filter`/`transform`/`filter` ancestors; verify every dropdown-like control opens and paints. **Test scenarios:** each tool's selects/dropdowns open visibly, options selectable, value updates, canvas rerenders. Verification in real browser.

### U2. Dock correctness + hygiene
**Goal:** R2, part of R4. **Files:** `src/styles.css`, `src/main.js`, `index.html`. **Approach:** kill underlines; normalize label casing (brand-correct: "Chainguard block", "Fortastra rings", "Gradient isometric", "Groq circuit", "Groq circle shader", "Runlayer hero", "Runlayer particle", "Tachyon burst"); dock-level Escape; favicon + meta polish. **Test scenarios:** no underline in any state (default/hover/focus/checked); Escape closes from trigger focus; labels consistent in dock + menu + `<title>`.

### U3. Never-blank tool-switch transition (flagship)
**Goal:** R3. **Files:** `index.html`, `src/main.js`, `src/styles.css`. **Approach:** KTD1 double-buffer; dock status dot doubles as loading indicator (subtle pulse while incoming tool loads); timeout fallback if a tool never fires `load`; keep URL/history/announcement behavior; reduced-motion = instant swap after load. **Test scenarios:** switch between light↔dark tools with mid-flight screenshots showing no blank frame; rapid successive switches don't race (cancel in-flight load); back/forward works; reduced-motion instant; old iframe unloaded after settle (leave-no-trace).

### U4. Craft pass (round 2)
**Goal:** R4. **Files:** shell files. **Approach:** apply round-1 review findings; token discipline sweep (no near-miss values); micro-interaction polish (trigger hover/active, menu stagger already good — verify totals inside time band); first-load choreography (initial arrival should feel composed, not just "iframe pops in"). **Test expectation:** review-driven; verified in browser.

### U5. Production build + final verification (round 3)
**Goal:** R5. **Files:** none new. **Approach:** apply round-2 findings; `npm run build && npm run preview`; re-run the full interaction sweep on the preview build; final screenshots. 

## Scope Boundaries

- In: shell UX/UI, transitions, snapshot-level dropdown fixes, casing/meta polish.
- Out (deferred): rebuilding tool sources under `apps/`, new tools, deploy pipeline changes, mobile-specific redesign (existing responsive dock is kept, verified not regressed).

## Risks

- Snapshot JS is minified — dropdown fixes must be CSS-first; JS patches only if unavoidable.
- Double-buffered iframes double transient memory; mitigate by unloading the outgoing frame post-settle.
- WebGL tools (context-loss on rapid switching) — rapid-switch race tests required.

## Verification Contract

Every round ends with the lead driving the real browser: dropdown paints (screenshot), no-blank crossfade (mid-flight screenshots), keyboard/focus/history sweep, reduced-motion, console-error-free on all 8 tools, and (round 3) the production preview build.
