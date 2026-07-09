import type { RNG } from './rng'
import type { Rect } from './types'

// Build adjacency based on edge-touching rectangles
export function buildAdjacency(rects: Rect[]): Map<number, number[]> {
  const adj = new Map<number, number[]>()
  const n = rects.length
  for (let i = 0; i < n; i++) adj.set(i, [])
  for (let i = 0; i < n; i++) {
    const a = rects[i]
    const aRight = a.x + a.w
    const aBottom = a.y + a.h
    for (let j = i + 1; j < n; j++) {
      const b = rects[j]
      const bRight = b.x + b.w
      const bBottom = b.y + b.h
      // Overlap helpers
      const vOverlap = Math.min(aBottom, bBottom) - Math.max(a.y, b.y)
      const hOverlap = Math.min(aRight, bRight) - Math.max(a.x, b.x)
      const touchV = (aRight === b.x || bRight === a.x) && vOverlap > 0
      const touchH = (aBottom === b.y || bBottom === a.y) && hOverlap > 0
      if (touchH || touchV) {
        adj.get(i)!.push(j)
        adj.get(j)!.push(i)
      }
    }
  }
  return adj
}

export function assignColors(
  rects: Rect[],
  palette: string[],
  rng: RNG,
  leadCount = 2,
  leadWeight = 2,
  accentWeight = 1,
): string[] {
  if (palette.length === 0) return []

  // Edge-case: only one color – skip adjacency rule
  if (palette.length === 1) return new Array(rects.length).fill(palette[0])

  const adj = buildAdjacency(rects)
  const colors: string[] = new Array(rects.length).fill('')

  const weights = palette.map((_, i) => (i < leadCount ? leadWeight : accentWeight))
  const weightSum = weights.reduce((a, b) => a + b, 0)

  for (let i = 0; i < rects.length; i++) {
    const forbidden = new Set(adj.get(i)!.map((j) => colors[j]).filter(Boolean))
    let pick = ''
    const attempts = 16
    for (let t = 0; t < attempts; t++) {
      let r = rng.next() * weightSum
      let k = 0
      for (; k < palette.length; k++) {
        r -= weights[k]
        if (r <= 0) break
      }
      const candidate = palette[Math.min(k, palette.length - 1)]
      if (!forbidden.has(candidate)) {
        pick = candidate
        break
      }
    }
    if (!pick) {
      pick = palette.find((c) => !forbidden.has(c)) || palette[0]
    }
    colors[i] = pick
  }

  return colors
}
