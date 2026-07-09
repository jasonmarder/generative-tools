import { generateLayout } from '../core/layout'
import { renderSVG } from '../render/svg'
import { createPane } from '../ui/pane'
import type { Params } from '../core/types'

const mount = document.getElementById('mount')!
const paneEl = document.getElementById('pane')!

const initial: Params = {
  cols: 16,
  rows: 9,
  canvasWidth: 1600,
  canvasHeight: 900,
  margin: 60,
  gutter: 12,
  palette: ['#6226FB', '#2BBAFD', '#FD2BF2', '#44FD2B'],
  seed: '12345',
  allowSpans: true,
  spanChance: 0.25,
  minColPct: 0.02,
  minRowPct: 0.02,
  bg: '#FFFFFF',
  showGridLines: true,
  gridLineColor: '#EDEDED',
  snapStep: 2,
  hero: true,
}

function rerender(p: Params) {
  const layout = generateLayout(p)
  renderSVG(layout, mount)
}

const { pane, params } = createPane(paneEl, initial, {
  onChange: (p) => rerender(p)
})

rerender(params)

// Keyboard: R to reroll seed
addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'r') {
    params.seed = String(Math.floor(Math.random() * 1e9))
    pane.refresh()
    rerender(params)
  }
})
