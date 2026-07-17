import { Pane } from 'tweakpane'
import { generateLayout } from '../core/layout'
import { renderSVG, toSVGString } from '../render/svg'
import { toPNG } from '../render/export'
import type { Params } from '../core/types'
import { rngFromSeed } from '../core/rng'

export type DemoState = Params

type Callbacks = {
  onChange: (p: Params) => void
}

export function createPane(container: HTMLElement, initial: Params, cbs: Callbacks) {
  const pane = new Pane({ container, title: 'Chainguard Block Generator', expanded: true })

  const params: Params = {
    lockCols: false,
    lockRows: false,
    snapStepPx: 2,
    heroBoostPct: 0.15,
    leadCount: 2,
    leadWeight: 2,
    accentWeight: 1,
    showGridLines: true,
    gridLineColor: '#EDEDED',
    squaresOnly: false,
    blockDensity: 1,
    squareSizeSteps: 1,
    ...initial
  }

  const fGrid = pane.addFolder({ title: 'Grid' })
  fGrid.addBinding(params, 'cols', { min: 1, max: 30, step: 1 }).on('change', () => cbs.onChange(params))
  fGrid.addBinding(params, 'rows', { min: 1, max: 20, step: 1 }).on('change', () => cbs.onChange(params))
  fGrid.addBinding(params, 'margin', { min: 0, max: 200, step: 2 }).on('change', () => cbs.onChange(params))
  fGrid.addBinding(params, 'gutter', { min: 0, max: 60, step: 2 }).on('change', () => cbs.onChange(params))
  fGrid.addBinding(params, 'snapStepPx', { min: 1, max: 8, step: 1 }).on('change', () => cbs.onChange(params))

  // Grid lines controls
  const fGridLines = pane.addFolder({ title: 'Grid Lines' })
  fGridLines.addBinding(params, 'showGridLines', { label: 'Show' }).on('change', () => cbs.onChange(params))
  fGridLines.addBinding(params, 'gridLineColor', { view: 'color', label: 'Color' }).on('change', () => cbs.onChange(params))

  // Axis Locks
  const fLocks = pane.addFolder({ title: 'Axis Locks' })
  fLocks.addBinding(params, 'lockCols', { label: 'Lock Columns' }).on('change', () => cbs.onChange(params))
  fLocks.addBinding(params, 'lockRows', { label: 'Lock Rows' }).on('change', () => cbs.onChange(params))

  // Center Exclusion Zone - initialize with sensible defaults based on current grid
  const centerExclude = {
    enabled: false,
    col: Math.floor(params.cols * 0.3),
    row: Math.floor(params.rows * 0.3),
    colSpan: Math.ceil(params.cols * 0.4),
    rowSpan: Math.ceil(params.rows * 0.4)
  }
  const fCenter = pane.addFolder({ title: 'Center Exclusion' })
  fCenter.addBinding(centerExclude, 'enabled', { label: 'Enable' }).on('change', updateCenterExclude)
  fCenter.addBinding(centerExclude, 'col', { min: 0, max: 30, step: 1, label: 'Start Col' }).on('change', updateCenterExclude)
  fCenter.addBinding(centerExclude, 'row', { min: 0, max: 30, step: 1, label: 'Start Row' }).on('change', updateCenterExclude)
  fCenter.addBinding(centerExclude, 'colSpan', { min: 1, max: 30, step: 1, label: 'Width (cols)' }).on('change', updateCenterExclude)
  fCenter.addBinding(centerExclude, 'rowSpan', { min: 1, max: 30, step: 1, label: 'Height (rows)' }).on('change', updateCenterExclude)

  // Sync centerExclude to params
  function updateCenterExclude() {
    if (centerExclude.enabled) {
      params.centerExcludeRect = {
        col: centerExclude.col,
        row: centerExclude.row,
        colSpan: centerExclude.colSpan,
        rowSpan: centerExclude.rowSpan
      }
    } else {
      params.centerExcludeRect = undefined
    }
    cbs.onChange(params)
  }
  // Keep folder-level change as a safety net, though individual bindings handle updates
  fCenter.on('change', updateCenterExclude)

  // Add button to auto-center the exclusion zone
  fCenter.addButton({ title: 'Auto-Center' }).on('click', () => {
    centerExclude.enabled = true
    centerExclude.col = Math.floor(params.cols * 0.3)
    centerExclude.row = Math.floor(params.rows * 0.3)
    centerExclude.colSpan = Math.ceil(params.cols * 0.4)
    centerExclude.rowSpan = Math.ceil(params.rows * 0.4)
    pane.refresh()
    updateCenterExclude()
  })

  const fRandom = pane.addFolder({ title: 'Spans & Randomness' })
  fRandom.addBinding(params, 'allowSpans').on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'spanChance', { min: 0, max: 1, step: 0.05 }).on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'minColPct', { min: 0, max: 0.5, step: 0.01 }).on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'minRowPct', { min: 0, max: 0.5, step: 0.01 }).on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'heroBoostPct', { min: 0.05, max: 0.5, step: 0.05 }).on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'squaresOnly', { label: 'Squares Only' }).on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'blockDensity', { min: 0.1, max: 1, step: 0.05, label: 'Block Density' }).on('change', () => cbs.onChange(params))
  fRandom.addBinding(params, 'squareSizeSteps', { min: 1, max: 6, step: 1, label: 'Square Size Steps' }).on('change', () => cbs.onChange(params))
  // Square Jitter removed

  // Color Weighting
  const fColors = pane.addFolder({ title: 'Colors' })
  fColors.addBinding(params, 'bg', { view: 'color' }).on('change', () => cbs.onChange(params))
  fColors.addBinding(params, 'leadCount', { min: 1, max: 5, step: 1, label: 'Lead Colors' }).on('change', () => cbs.onChange(params))
  fColors.addBinding(params, 'leadWeight', { min: 0.5, max: 5, step: 0.1, label: 'Lead Weight' }).on('change', () => cbs.onChange(params))
  fColors.addBinding(params, 'accentWeight', { min: 0.1, max: 3, step: 0.1, label: 'Accent Weight' }).on('change', () => cbs.onChange(params))

  // Palette Editor
  const paletteFolder = pane.addFolder({ title: 'Palette Editor', expanded: true })
  let paletteBindings: any[] = []

const refreshPalette = () => {
    // Force min 1 color
    if (params.palette.length === 0) params.palette.push('#888888')
    // Clear existing bindings
    paletteBindings.forEach(b => paletteFolder.remove(b))
    paletteBindings = []

    // Add color pickers for current palette
    params.palette.forEach((color, i) => {
      const key = `palette_${i}`
      ;(params as any)[key] = color
      const rowFolder = paletteFolder.addFolder({ title: `Color ${i + 1}` , expanded: false})
      const binding = rowFolder.addBinding(params as any, key, { view: 'color' })
      binding.on('change', () => {
        params.palette[i] = (params as any)[key]
        cbs.onChange(params)
      })
      // Remove button for this color
      rowFolder.addButton({ title: 'Remove' }).on('click', () => {
        if (params.palette.length > 1) {
          params.palette.splice(i, 1)
          refreshPalette()
          cbs.onChange(params)
        }
      })
      paletteBindings.push(rowFolder)
    })
  }

  refreshPalette()

  // Palette controls
  paletteFolder.addButton({ title: 'Add Color' }).on('click', () => {
    if (params.palette.length < 12) {
      params.palette.push('#888888')
      refreshPalette()
      cbs.onChange(params)
    }
  })

  // Presets
  const presets: Record<string, Partial<Params> & { centerExclude?: typeof centerExclude }> = {
    Poster: { cols: 8, rows: 6, margin: 40, gutter: 8 },
    Billboard: { cols: 20, rows: 12, margin: 60, gutter: 12 },
    StageBackdrop: { cols: 30, rows: 18, margin: 80, gutter: 16 },
    'Hero Center': {
      cols: 20,
      rows: 12,
      margin: 60,
      gutter: 12,
      centerExcludeRect: { col: 6, row: 4, colSpan: 8, rowSpan: 4 },
      centerExclude: { enabled: true, col: 6, row: 4, colSpan: 8, rowSpan: 4 }
    },
    'Squares Grid': {
      cols: 12,
      rows: 12,
      margin: 40,
      gutter: 8,
      squaresOnly: true
    },
    'Organic Scatter': {
      cols: 20,
      rows: 12,
      margin: 60,
      gutter: 12,
      blockDensity: 0.4,
      squaresOnly: true,
      allowSpans: true,
      spanChance: 0.3
    }
  }
  const preset = { name: 'Poster' }
  pane.addBinding(preset, 'name', { options: Object.keys(presets).reduce((o, k) => ({ ...o, [k]: k }), {}) })
    .on('change', () => {
      const selected = presets[preset.name]
      Object.assign(params, selected)
      // Sync center exclude UI
      if (selected.centerExclude) {
        Object.assign(centerExclude, selected.centerExclude)
      } else {
        centerExclude.enabled = false
        params.centerExcludeRect = undefined
      }
      cbs.onChange(params)
      pane.refresh()
    })

  // Canvas Ratio
  const ratios: Record<string, [number, number]> = {
    'Horizontal / 16:9': [1600, 900],
    'Horizontal / 3:2': [1500, 1000],
    'Horizontal / 4:3': [1200, 900],
    'Square / 1:1': [1000, 1000],
    'Vertical / 2:3': [1000, 1500],
    'Vertical / 9:16': [900, 1600],
  }
  const ratioSel = { ratio: 'Horizontal / 16:9' }
  const fCanvas = pane.addFolder({ title: 'Canvas Size' })
  fCanvas.addBinding(ratioSel, 'ratio', { options: Object.keys(ratios).reduce((o, k) => ({ ...o, [k]: k }), {}) })
    .on('change', () => {
      const [w, h] = ratios[ratioSel.ratio]
      params.canvasWidth = w
      params.canvasHeight = h
      cbs.onChange(params)
    })

  // Seed Control
  const fSeed = pane.addFolder({ title: 'Seed Control', expanded: true })
  fSeed.addBinding(params, 'seed', { label: 'Current Seed' }).on('change', () => cbs.onChange(params))
  fSeed.addButton({ title: 'Reroll Seed (R)' }).on('click', () => {
    params.seed = String(Math.floor(Math.random() * 1e9))
    cbs.onChange(params)
    pane.refresh()
  })
  pane.addButton({ title: 'Export SVG' }).on('click', () => {
    const svg = toSVGString(generateLayout(params))
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'layout.svg'
    a.click()
    URL.revokeObjectURL(url)
  })
  pane.addButton({ title: 'Export PNG' }).on('click', async () => {
    const blob = await toPNG(generateLayout(params))
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'layout.png'
    a.click()
    URL.revokeObjectURL(url)
  })

  // Copy JSON
  pane.addButton({ title: 'Copy JSON' }).on('click', async () => {
    const copy = { ...params }
    await navigator.clipboard.writeText(JSON.stringify(copy, null, 2))
  })

  // Change handlers
  pane.on('change', () => {
    cbs.onChange(params)
  })

  return { pane, params }
}
