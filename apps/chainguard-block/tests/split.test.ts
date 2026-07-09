import { describe, it, expect } from 'vitest'
import { rngFromSeed } from '../src/core/rng'
import { splitWeights, weightsToPixels } from '../src/core/split'

describe('splitWeights', () => {
  it('sums to 1 and respects min', () => {
    const rng = rngFromSeed('test')
    const w = splitWeights(10, 0.03, rng)
    const sum = w.reduce((a, b) => a + b, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(1e-9)
    expect(Math.min(...w)).toBeGreaterThanOrEqual(0.03 - 1e-9)
  })

  it('rounding fix: no gaps when converting to pixels', () => {
    const rng = rngFromSeed('test2')
    const w = splitWeights(8, 0.02, rng)
    const { sizes, positions } = weightsToPixels(w, 1600 - 120, 12, 2)
    const total = sizes.reduce((a, b) => a + b, 0) + 12 * (sizes.length - 1)
    expect(total).toBe(1600 - 120)
    // positions are increasing and within bounds
    expect(positions[0]).toBe(0)
    expect(positions[positions.length - 1] + sizes[sizes.length - 1]).toBe(1600 - 120)
  })
})