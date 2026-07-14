# Iframe showcase stage: history pollution, traversal restoration, and the backdrop-filter containing-block trap

**Date:** 2026-07-14 · **Verified:** dev + production preview, Playwright-driven

## Context

The generative-tools showcase hosts 8 prebuilt tool apps in a fullscreen iframe stage with a dock picker. Rebuilding the tool switch as a double-buffered two-iframe crossfade (never-blank invariant) surfaced three non-obvious bug classes, all invisible to code review and only found by driving a real browser.

## 1. `backdrop-filter` hijacks `position: fixed` (broken dropdowns)

Tachyon-burst's control rail had `backdrop-filter: blur(18px)` + `overflow: hidden`. Any `backdrop-filter` (also `filter`, `transform`, `will-change: transform`, `contain: paint`, `perspective`) makes that element the **containing block for fixed-position descendants**. The tool's dropdown portal (`position: fixed`, viewport coordinates from `getBoundingClientRect`) resolved against the rail instead → rendered off-screen and clipped. State toggled (chevron rotated, `data-open=true`) but nothing painted.

**Fix:** remove the backdrop-filter from the offending ancestor (visually negligible over a near-opaque dark rail). **Diagnostic:** when a dropdown "opens but doesn't paint," walk the ancestor chain for containing-block-creating properties before touching the dropdown itself. Native `<select>` is immune (OS-rendered).

Related, same family: a project-added `overflow: hidden` on dat.GUI's `.dg.main` clipped its absolutely-positioned color-picker popup (groq-circle-shader).

## 2. Programmatic `iframe.src` pollutes joint session history

After a frame's first navigation, every `iframe.src = url` assignment **splices a new entry into the page's joint session history**. Our switch gesture (pushState + buffer load + retire-to-about:blank) added 3 entries — Back needed 3 presses per switch. Measured via `history.length` (34→37 per switch).

**Fix:** navigate iframes with `frame.contentWindow.location.replace(url)` — replace() never creates entries. **Consequence:** the `src` *attribute* stops reflecting reality; all staleness/identity guards must track expected URLs in JS state (`dataset.loadTarget`) instead of reading `.src`. The boot assignment may stay `src=` (first navigation of a fresh browsing context replaces its initial about:blank entry).

## 3. History traversal restores iframe documents → duplicate `load` events

On `history.back()`, the browser **restores each iframe's document to its state in the target entry**, re-navigating frames the popstate handler is simultaneously navigating. Result: a second `load` event for the same URL → `crossfadeIn` ran twice → two commit timers → `finishSwitch` executed twice with swapped roles → retired the newly-active frame → **both frames hidden at about:blank, stage permanently blank**.

**Fix (two independent layers):**
1. **Consume the gesture token on commit** — `finishSwitch` increments `switchToken` right after its guard, so any orphaned continuation bails.
2. **Phase-gate the trigger** — `pendingPhase: "" | "loading" | "revealing"`; the load handler only fires the reveal when phase is `"loading"`; `crossfadeIn` flips to `"revealing"` synchronously.

Invariant worth stating in any such system: *every place that resets the pending gesture also invalidates its token*; a token check is then a strict superset of a phase check.

## Meta

- None of these three reproduce by reading code. Detection required: `history.length` counting, an instrumented event timeline (`popstate`/`load`/class mutations with timestamps), and mid-flight opacity sampling for the never-blank invariant.
- Review pattern that worked: subagents implement, lead adversarially drives the real browser after each round with invariant assertions ("at every 120ms sample, max(opacityA, opacityB) ≥ 0.99").
