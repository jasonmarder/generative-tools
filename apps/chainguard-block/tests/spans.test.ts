import { describe, it, expect } from 'vitest'
import { rngFromSeed } from '../src/core/rng'
import { attemptSpans } from '../src/core/spans'

describe('spans', () => {
  it('keeps spans within bounds and covers cells exactly once', () => {
    const rng = rngFromSeed('span')
    const cols = 6, rows = 5
    const cells = attemptSpans([], cols, rows, true, 0.5, rng)
    const occ: number[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
    for (const c of cells) {
      expect(c.col + c.colSpan).toBeLessThanOrEqual(cols)
      expect(c.row + c.rowSpan).toBeLessThanOrEqual(rows)
      for (let r = c.row; r < c.rowSpan + c.row; r++)
        for (let k = c.col; k < c.colSpan + c.col; k++) occ[r][k] += 1
    }
    // every cell covered at most once
    for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) expect(occ[r][k]).toBeLessThanOrEqual(1)
  })
})