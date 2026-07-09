import { describe, expect, it } from 'vitest'
import { generateLayout } from '../src/core/layout'
import { toSVGString } from '../src/render/svg'

describe('grid lines rendering', () => {
  it('includes stroke attributes in SVG when grid lines are enabled', () => {
    const layout = generateLayout({
      cols: 4,
      rows: 3,
      canvasWidth: 400,
      canvasHeight: 300,
      margin: 20,
      gutter: 8,
      palette: ['#111111', '#222222', '#333333'],
      seed: 'grid-on',
      allowSpans: false,
      spanChance: 0,
      minColPct: 0.1,
      minRowPct: 0.1,
      bg: '#FFFFFF',
      showGridLines: true,
      gridLineColor: '#EDEDED'
    })
    const svg = toSVGString(layout)
    expect(svg).toContain('stroke="#EDEDED"')
  })

  it('omits stroke attributes in SVG when grid lines are disabled', () => {
    const layout = generateLayout({
      cols: 4,
      rows: 3,
      canvasWidth: 400,
      canvasHeight: 300,
      margin: 20,
      gutter: 8,
      palette: ['#111111', '#222222', '#333333'],
      seed: 'grid-off',
      allowSpans: false,
      spanChance: 0,
      minColPct: 0.1,
      minRowPct: 0.1,
      bg: '#FFFFFF',
      showGridLines: false
    })
    const svg = toSVGString(layout)
    expect(svg).not.toContain('stroke="#')
  })

  it('respects center exclusion and only outlines present blocks', () => {
    const params = {
      cols: 8,
      rows: 6,
      canvasWidth: 800,
      canvasHeight: 600,
      margin: 40,
      gutter: 8,
      palette: ['#FF0000', '#00FF00', '#0000FF'],
      seed: 'exclude',
      allowSpans: false,
      spanChance: 0,
      minColPct: 0.1,
      minRowPct: 0.1,
      bg: '#FFFFFF',
      centerExcludeRect: { col: 3, row: 2, colSpan: 2, rowSpan: 2 },
      showGridLines: true,
      gridLineColor: '#EDEDED'
    }
    const layout = generateLayout(params)
    // Total cells minus excluded area
    const expectedMax = params.cols * params.rows - (params.centerExcludeRect.colSpan * params.centerExcludeRect.rowSpan)
    expect(layout.rects.length).toBeLessThanOrEqual(expectedMax)
    const svg = toSVGString(layout)
    expect(svg).toContain('stroke="#EDEDED"')
  })
})
