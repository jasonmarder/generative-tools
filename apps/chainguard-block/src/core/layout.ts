import type { Layout, Params, Rect } from './types'
import { rngFromSeed } from './rng'
import { splitWeights, weightsToPixels, snapToStep } from './split'

// Caches to support lockCols / lockRows between rerolls in the demo environment. These are purely in-memory and
// keyed by column/row count so they reset when the grid dimensions change.
let cachedColWeights: number[] | null = null
let cachedRowWeights: number[] | null = null
import { attemptSpans, type Cell } from './spans'
import { assignColors } from './color'

export function generateLayout(params: Params): Layout {
  const {
    cols, rows,
    canvasWidth, canvasHeight,
    margin, gutter,
    palette, seed,
    allowSpans, spanChance,
    minColPct, minRowPct,
    bg,
    showGridLines = true,
    gridLineColor = '#EDEDED',
    snapStep = 2,
    snapStepPx,
    hero = true,
    heroBoostPct = 0.15,
    lockCols = false,
    lockRows = false,
    leadCount = 2,
    leadWeight = 2,
    accentWeight = 1,
    centerExcludeRect,
    squaresOnly = false,
    blockDensity = 1,
    squareSizeSteps = 1,
  } = params

  const rng = rngFromSeed(seed)

  const innerW = canvasWidth - margin * 2
  const innerH = canvasHeight - margin * 2

  const stepPx = snapStepPx ?? snapStep

  // Column & row weight generation with optional axis locks
  if (!lockCols || !cachedColWeights || cachedColWeights.length !== cols) {
    cachedColWeights = splitWeights(cols, minColPct, rng)
  }
  if (!lockRows || !cachedRowWeights || cachedRowWeights.length !== rows) {
    cachedRowWeights = splitWeights(rows, minRowPct, rng)
  }
  let colWeights = cachedColWeights
  let rowWeights = cachedRowWeights

  // For squares-only mode, equalize weights to create square grid cells
  if (squaresOnly) {
    const avgWeight = 1 / Math.max(cols, rows)
    colWeights = new Array(cols).fill(avgWeight)
    rowWeights = new Array(rows).fill(avgWeight)
    // Normalize
    const colSum = colWeights.reduce((a, b) => a + b, 0)
    const rowSum = rowWeights.reduce((a, b) => a + b, 0)
    colWeights = colWeights.map(w => w / colSum)
    rowWeights = rowWeights.map(w => w / rowSum)
  }

  const colsPx = weightsToPixels(colWeights, innerW, gutter, stepPx)
  const rowsPx = weightsToPixels(rowWeights, innerH, gutter, stepPx)

  // Build cells with optional spans
  let cells = attemptSpans([], cols, rows, allowSpans, spanChance, rng, centerExcludeRect, squaresOnly, blockDensity, squareSizeSteps)
  if (cells.length === 0) {
    // Fallback to singles if spans implementation returns empty
    cells = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ col: c, row: r, colSpan: 1, rowSpan: 1 })
      }
    }
  }

  // Convert cells to rects
  const rects: Rect[] = []
  const toX = (c: number) => margin + colsPx.positions[c]
  const toY = (r: number) => margin + rowsPx.positions[r]
  for (const cell of cells) {
    let x = toX(cell.col)
    let y = toY(cell.row)
    const w = colsPx.sizes.slice(cell.col, cell.col + cell.colSpan).reduce((a, b) => a + b, 0) + gutter * (cell.colSpan - 1)
    const h = rowsPx.sizes.slice(cell.row, cell.row + cell.rowSpan).reduce((a, b) => a + b, 0) + gutter * (cell.rowSpan - 1)
    // Positions are already consistent across the grid; only snap sizes to avoid drift.
    let rw = snapToStep(w, stepPx)
    let rh = snapToStep(h, stepPx)
    rects.push({ x, y, w: rw, h: rh, fill: '' })
  }

  // Optional hero merge: merge the largest rect once with a neighbor to get ~10–20% larger if possible
  if (hero && allowSpans && rects.length > 1) {
    const areas = rects.map((r) => r.w * r.h)
    const idx = areas.indexOf(Math.max(...areas))
    const a = rects[idx]
    // Find a neighbor that shares an edge
    const neighbors = rects.map((b, j) => ({ b, j })).filter(({ b, j }) => j !== idx && (
      (a.y === b.y && a.h === b.h && (a.x + a.w === b.x || b.x + b.w === a.x)) ||
      (a.x === b.x && a.w === b.w && (a.y + a.h === b.y || b.y + b.h === a.y))
    ))
    if (neighbors.length) {
      const target = neighbors[Math.floor(rng.next() * neighbors.length)]
      const b = target.b
      const merged: Rect = {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        w: (a.x === b.x ? a.w : a.w + b.w),
        h: (a.y === b.y ? a.h : a.h + b.h),
        fill: ''
      }
      const newArea = merged.w * merged.h
      const lower = areas[idx] * (1 + heroBoostPct * 0.8)
      const upper = areas[idx] * (1 + heroBoostPct * 1.2)
      if (newArea >= lower && newArea <= upper) {
        // Replace a and remove b
        rects[idx] = merged
        rects.splice(target.j, 1)
      }
    }
  }

  // Assign colors avoiding adjacency duplicates
  const fills = assignColors(rects, palette, rng, leadCount, leadWeight, accentWeight)
  for (let i = 0; i < rects.length; i++) rects[i].fill = fills[i]

  return { width: canvasWidth, height: canvasHeight, background: bg, rects, gridLines: { show: showGridLines, color: gridLineColor } }
}