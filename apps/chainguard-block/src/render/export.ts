import type { Layout } from '../core/types'

export async function toPNG(layout: Layout): Promise<Blob> {
  const { width, height, background, rects } = layout
  const hasOffscreen = typeof (globalThis as any).OffscreenCanvas !== 'undefined'
  const canvas: HTMLCanvasElement | OffscreenCanvas = hasOffscreen
    ? new (globalThis as any).OffscreenCanvas(width, height)
    : Object.assign(document.createElement('canvas'), { width, height })

  const ctx = (canvas as any).getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)
  for (const r of rects) {
    ctx.fillStyle = r.fill
    ctx.fillRect(r.x, r.y, r.w, r.h)
  }

  if (layout.gridLines?.show) {
    ctx.strokeStyle = layout.gridLines.color
    ctx.lineWidth = 1
    for (const r of rects) {
      ctx.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5, Math.round(r.w) - 1, Math.round(r.h) - 1)
    }
  }

  if (hasOffscreen) {
    // @ts-ignore
    return (canvas as OffscreenCanvas).convertToBlob({ type: 'image/png' })
  } else {
    return new Promise<Blob>((resolve) => (canvas as HTMLCanvasElement).toBlob((b) => resolve(b!), 'image/png')!)
  }
}