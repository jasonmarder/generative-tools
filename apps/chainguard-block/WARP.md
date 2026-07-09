# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Commands

All commands assume you are at the repository root.

• Install dependencies
  ```bash
  pnpm install
  ```

• Start the live demo (Vite dev server)
  ```bash
  pnpm dev
  ```

• Build the library (bundled with tsup, type declarations included)
  ```bash
  pnpm build
  ```

• Preview the built demo in a local web server
  ```bash
  pnpm preview
  ```

• Run the complete test suite (Vitest)
  ```bash
  pnpm test
  ```

• Run a single test file or test name
  ```bash
  pnpm test -t "spans"
  # or
  pnpm test tests/split.test.ts
  ```

• Generate coverage
  ```bash
  pnpm coverage
  ```

• Strict type-checking only (no emit)
  ```bash
  pnpm typecheck
  ```

## High-Level Architecture

```
src/
  core/      // Pure algorithms (no DOM access)
    rng.ts         – seeded pseudo-random generator
    split.ts       – utility to split lengths with weighted randomness, includes snap logic
    spans.ts       – optional multi-cell span calculation
    color.ts       – palette assignment obeying adjacency constraints
    layout.ts      – orchestrates grid generation; exported as generateLayout()
    types.ts       – shared type definitions

  render/    // Browser-specific helpers
    svg.ts        – renderSVG() + toSVGString() for DOM or string output
    export.ts     – toPNG() converts an SVG layout to a PNG via a canvas

  index.ts   // Public barrel; re-exports core and render surface
```

Key Flow:
1. `generateLayout(params)` (core/layout.ts) creates a grid of rects using `splitWeights`, optional `attemptSpans`, and `assignColors`.
2. Consumers call one of the render helpers:
   • `renderSVG(layout, mountEl)` – injects an `<svg>` into the DOM.
   • `toSVGString(layout)` – returns raw SVG markup.
   • `toPNG(layout)` – produces a `Blob` with PNG data.
3. All randomness is deterministic when a `seed` string is supplied, enabling repeatable layouts.

The library ships **ESM-only** bundles (outDir `dist/`) via `tsup`. Typings are generated alongside JS to support TypeScript consumers. A minimal HTML/ESM demo lives under `index.html` and is served by Vite during development.

## Notable Conventions & Guidelines for Agents

• Keep all code browser-friendly and framework-agnostic; avoid Node-specific APIs in `src/`.
• Do not introduce default exports—stay with named exports to preserve tree-shaking.
• New public APIs must be re-exported through `src/index.ts` and documented in README.md.
• Tests go in `tests/**/*.{test,spec}.ts` and use Vitest.
• When modifying the build or test setup, mirror existing tooling (pnpm, tsup, vitest). Avoid adding additional build systems unless necessary.
