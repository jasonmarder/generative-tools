# Chainguard Block Generator

A small framework-agnostic TypeScript library that generates Chainguard-style block layouts (rectangles only, no text) and a plain HTML/ESM demo for live tweaking and exporting.

- ESM-only build
- Seeded RNG for repeatable results
- Gap-free, snapped layout
- Color adjacency rules
- Optional span logic and hero merge
- Demo uses Tweakpane (no framework)

Run steps

- pnpm i
- pnpm dev

API overview

Core API
- generateLayout(params): { width, height, background, rects: [{x,y,w,h,fill}] }
- renderSVG(layout, mountEl)
- toSVGString(layout)
- toPNG(layout)

Params
- cols, rows, canvasWidth, canvasHeight, margin, gutter
- palette: string[], seed
- allowSpans, spanChance
- minColPct, minRowPct
- bg, snapStep (2-4 recommended), hero (optional)
- centerExcludeRect: { col, row, colSpan, rowSpan } (optional) - defines a center area to keep empty for overlaying text/content
- squaresOnly: boolean (optional) - forces all blocks to be square shapes
- blockDensity: number 0-1 (optional, default 1) - probability each block appears, lower = more sparse/organic

Presets (demo)
- Poster, Billboard, StageBackdrop

Usage (ESM)
import { generateLayout, toSVGString } from 'chainguard-block-generator'

Presets JSON
{
  "Poster": { "cols": 8, "rows": 6, "margin": 40, "gutter": 8 },
  "Billboard": { "cols": 20, "rows": 12, "margin": 60, "gutter": 12 },
  "StageBackdrop": { "cols": 30, "rows": 18, "margin": 80, "gutter": 16 }
}
