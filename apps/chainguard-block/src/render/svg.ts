import type { Layout } from '../core/types'

export function toSVGString(layout: Layout): string {
  const { width, height, background, rects } = layout
  const strokeAttrs = layout.gridLines?.show
    ? ` stroke="${layout.gridLines!.color}" stroke-width="1" shape-rendering="crispEdges"`
    : ''
  const rectEls = rects
    .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.fill}"${strokeAttrs} />`)
    .join('')
return `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;max-width:100%;">` +
  `<rect width="100%" height="100%" fill="${background}" pointer-events="none"/>` +
  rectEls +
  `</svg>`
}

export function renderSVG(layout: Layout, mountEl: HTMLElement) {
  const svg = toSVGString(layout)
  mountEl.innerHTML = svg
}