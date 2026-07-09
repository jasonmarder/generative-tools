import { describe, expect, it } from 'vitest'
import { generateLayout } from '../src/core/layout'

describe('centerExcludeRect and squaresOnly', () => {
  it('should exclude center cells when centerExcludeRect is specified', () => {
    const layout = generateLayout({
      cols: 8,
      rows: 6,
      canvasWidth: 800,
      canvasHeight: 600,
      margin: 40,
      gutter: 8,
      palette: ['#FF0000', '#00FF00', '#0000FF'],
      seed: 'test',
      allowSpans: false,
      spanChance: 0,
      minColPct: 0.1,
      minRowPct: 0.1,
      bg: '#FFFFFF',
      centerExcludeRect: { col: 3, row: 2, colSpan: 2, rowSpan: 2 }
    })

    // Should have fewer rects than total cells (48 - 4 excluded = 44)
    expect(layout.rects.length).toBe(44)
  })

  it('should create square blocks when squaresOnly is true', () => {
    const layout = generateLayout({
      cols: 6,
      rows: 6,
      canvasWidth: 600,
      canvasHeight: 600,
      margin: 40,
      gutter: 8,
      palette: ['#FF0000', '#00FF00', '#0000FF'],
      seed: 'square-test',
      allowSpans: true,
      spanChance: 0.5,
      minColPct: 0.1,
      minRowPct: 0.1,
      bg: '#FFFFFF',
      squaresOnly: true
    })

    // All rects should be squares (or close to square, accounting for gutters)
    for (const rect of layout.rects) {
      // Width and height should be equal within tolerance for gutter differences
      expect(Math.abs(rect.w - rect.h)).toBeLessThan(20)
    }
  })

  it('should combine centerExcludeRect and squaresOnly', () => {
    const layout = generateLayout({
      cols: 10,
      rows: 10,
      canvasWidth: 1000,
      canvasHeight: 1000,
      margin: 40,
      gutter: 8,
      palette: ['#FF0000', '#00FF00', '#0000FF'],
      seed: 'combined',
      allowSpans: true,
      spanChance: 0.3,
      minColPct: 0.1,
      minRowPct: 0.1,
      bg: '#FFFFFF',
      centerExcludeRect: { col: 4, row: 4, colSpan: 2, rowSpan: 2 },
      squaresOnly: true
    })

    // Should have excluded center area
    expect(layout.rects.length).toBeLessThan(100)

    // All blocks should still be squares
    for (const rect of layout.rects) {
      expect(Math.abs(rect.w - rect.h)).toBeLessThan(20)
    }
  })
})
