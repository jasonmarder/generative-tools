import type { RNG } from './rng'

export type Cell = { col: number; row: number; colSpan: number; rowSpan: number }

type ExcludeRect = { col: number; row: number; colSpan: number; rowSpan: number } | undefined

export function attemptSpans(
  cells: Cell[],
  cols: number,
  rows: number,
  allowSpans: boolean,
  spanChance: number,
  rng: RNG,
  centerExcludeRect?: ExcludeRect,
  squaresOnly?: boolean,
  blockDensity?: number,
  squareSizeSteps?: number
): Cell[] {
  const steps = Math.max(1, squareSizeSteps ?? 1)
  const maxSquare = Math.min(cols, rows)
  // Generate harmonic sizes using Fibonacci sequence (1, 2, 3, 5, 8, ...)
  const fib: number[] = [1, 2]
  while (fib.length < steps) {
    const n = fib[fib.length - 1] + fib[fib.length - 2]
    fib.push(n)
  }
  // Limit sizes to grid capacity and ensure unique, descending order for placement attempts
  const allowedSquareSizes = Array.from(new Set(fib.filter(n => n <= maxSquare))).sort((a, b) => b - a)

  // Helper to check if a cell overlaps with center exclusion zone
  const overlapsExclude = (c: Cell): boolean => {
    if (!centerExcludeRect) return false
    const { col: excCol, row: excRow, colSpan: excColSpan, rowSpan: excRowSpan } = centerExcludeRect
    return !(
      c.col + c.colSpan <= excCol ||
      c.col >= excCol + excColSpan ||
      c.row + c.rowSpan <= excRow ||
      c.row >= excRow + excRowSpan
    )
  }

  // If spans are disabled but we have an exclusion zone, build singles and filter
  if (!allowSpans || spanChance <= 0) {
    if (!centerExcludeRect) return cells
    const singles: Cell[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = { col: c, row: r, colSpan: 1, rowSpan: 1 }
        if (!overlapsExclude(cell)) {
          singles.push(cell)
        }
      }
    }
    return singles
  }

  // Occupancy grid to avoid overlapping merges
  const occ: boolean[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
  const mark = (c: Cell, v: boolean) => {
    for (let r = c.row; r < c.row + c.rowSpan; r++) {
      for (let cl = c.col; cl < c.col + c.colSpan; cl++) {
        occ[r][cl] = v
      }
    }
  }

  // Start as single cells
  const singles: Cell[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      singles.push({ col: c, row: r, colSpan: 1, rowSpan: 1 })
    }
  }

  const merged: Cell[] = []
  for (const cell of singles) {
    if (occ[cell.row][cell.col]) continue

    // Skip if this cell overlaps the exclusion zone
    if (overlapsExclude(cell)) continue

    // Determine span
    let chosenSpan = 1
    if (rng.next() < spanChance) {
      if (squaresOnly) {
        // Try allowed square sizes in randomized order (prefer larger first)
        const candidates = allowedSquareSizes.slice()
        // Small shuffle to avoid repetitive patterns
        for (let i = candidates.length - 1; i > 0; i--) {
          const j = Math.floor(rng.next() * (i + 1))
          const tmp = candidates[i]; candidates[i] = candidates[j]; candidates[j] = tmp
        }
        // Bias to larger sizes by sorting after shuffle (stable randomness + preference)
        candidates.sort((a, b) => b - a)
        for (const s of candidates) {
          if (s === 1) { chosenSpan = 1; break }
          const within = cell.col + s <= cols && cell.row + s <= rows
          if (!within) continue
          let free = true
          for (let r = cell.row; r < cell.row + s; r++) {
            for (let c = cell.col; c < cell.col + s; c++) {
              if (occ[r][c]) { free = false; break }
            }
            if (!free) break
          }
          if (!free) continue
          const candidate: Cell = { ...cell, colSpan: s, rowSpan: s }
          if (overlapsExclude(candidate)) continue
          chosenSpan = s
          break
        }
      } else {
        // Original non-square logic (2x1 or 1x2)
        const canRight = cell.col + 1 < cols && !occ[cell.row][cell.col + 1]
        const canDown = cell.row + 1 < rows && !occ[cell.row + 1][cell.col]
        if (canRight && canDown) {
          chosenSpan = 1 // size applies only to squares; we keep old behavior here
        } else if (canRight || canDown) {
          chosenSpan = 1
        }
      }
    }

    const spanCell: Cell = { ...cell, colSpan: chosenSpan, rowSpan: chosenSpan }
    // Check occupancy bounds and exclusion zone for final choice
    let ok = true
    for (let r = spanCell.row; r < spanCell.row + spanCell.rowSpan; r++) {
      for (let c = spanCell.col; c < spanCell.col + spanCell.colSpan; c++) {
        if (r >= rows || c >= cols || occ[r][c]) { ok = false; break }
      }
      if (!ok) break
    }
    if (!ok || overlapsExclude(spanCell)) continue

    mark(spanCell, true)
    merged.push(spanCell)
  }

  // Apply block density filter for organic/sparse layouts
  if (blockDensity !== undefined && blockDensity < 1) {
    return merged.filter(() => rng.next() <= blockDensity)
  }

  return merged
}
