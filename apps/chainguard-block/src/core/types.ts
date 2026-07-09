export type Params = {
  // Grid definition
  cols: number
  rows: number
  canvasWidth: number
  canvasHeight: number
  margin: number
  gutter: number

  // Color + randomness
  palette: string[]
  seed: string | number

  // Behaviour flags
  allowSpans: boolean
  spanChance: number // 0..1
  minColPct: number // 0..1
  minRowPct: number // 0..1
  bg: string

  // New params
  lockCols?: boolean // freeze column widths across rerolls
  lockRows?: boolean // freeze row heights across rerolls
  snapStep?: number // legacy – prefer snapStepPx
  snapStepPx?: number // px grid snapping, overrides snapStep

  // Grid lines
  showGridLines?: boolean
  gridLineColor?: string

  // Hero + sizing
  hero?: boolean // enable hero merge
  heroBoostPct?: number // desired boost factor (0.1 = 10% larger)

  // Color weighting
  leadCount?: number // number of lead colors at start of palette
  leadWeight?: number // weight for lead colors
  accentWeight?: number // weight for remaining colors

  // Layout constraints
  centerExcludeRect?: { col: number; row: number; colSpan: number; rowSpan: number } // exclude center area from blocks
  squaresOnly?: boolean // force all blocks to be square (colSpan === rowSpan)
  blockDensity?: number // 0..1, probability each block appears (1 = all blocks, 0.5 = ~50% sparse)
  squareSizeSteps?: number // when squaresOnly, number of distinct square sizes (1 = uniform)
}

export type Rect = { x: number; y: number; w: number; h: number; fill: string }

export type Layout = { width: number; height: number; background: string; rects: Rect[]; gridLines?: { show: boolean; color: string } }