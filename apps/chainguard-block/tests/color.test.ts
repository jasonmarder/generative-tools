import { describe, it, expect } from 'vitest'
import { assignColors } from '../src/core/color'
import type { Rect } from '../src/core/types'
import { rngFromSeed } from '../src/core/rng'

describe('color adjacency', () => {
  it('never places the same color on touching edges', () => {
    const rects: Rect[] = [
      { x: 0, y: 0, w: 100, h: 100, fill: '' },
      { x: 100, y: 0, w: 100, h: 100, fill: '' }, // touches first on vertical edge
      { x: 0, y: 100, w: 200, h: 100, fill: '' }, // touches both on horizontal edge
    ]
    const colors = assignColors(rects, ['#111', '#222', '#333'], rngFromSeed('color'))
    // Adjacent pairs: 0-1 touch, 0-2 touch, 1-2 do not touch
    expect(colors[0]).not.toBe(colors[1])
    expect(colors[0]).not.toBe(colors[2])
  })
})