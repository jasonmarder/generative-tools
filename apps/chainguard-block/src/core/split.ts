import type { RNG } from './rng'

export function snapToStep(v: number, step = 2) {
  return Math.round(v / step) * step
}

// Generate N weights that sum to 1, each with at least minPct
export function splitWeights(n: number, minPct: number, rng: RNG): number[] {
  const base = Math.max(0, Math.min(minPct, 1))
  const totalBase = base * n
  const remainder = Math.max(0, 1 - totalBase)
  // If totalBase > 1, distribute evenly
  let weights = new Array(n).fill(1 / n)
  if (totalBase <= 1) {
    // random positive numbers
    const raw = Array.from({ length: n }, () => rng.next())
    const sum = raw.reduce((a, b) => a + b, 0) || 1
    const extra = raw.map((v) => (v / sum) * remainder)
    weights = extra.map((v) => v + base)
  }
  // Normalize numerically
  const s = weights.reduce((a, b) => a + b, 0)
  return weights.map((w) => w / s)
}

// Convert fractional weights to pixel sizes with gutters and snapping, ensuring sum fits exactly
export function weightsToPixels(weights: number[], total: number, gutter: number, step = 2): { sizes: number[]; positions: number[] } {
  const n = weights.length
  const totalGutters = gutter * (n - 1)
  const usable = total - totalGutters
  const raw = weights.map((w) => w * usable)
  const snapped = raw.map((v) => snapToStep(v, step))
  let diff = Math.round(usable - snapped.reduce((a, b) => a + b, 0))
  // Fix rounding by adjusting largest elements first by step increments
  if (diff !== 0) {
    const stepSign = diff > 0 ? step : -step
    let i = 0
    while (diff !== 0 && i < 10000) {
      const idx = i % n
      const candidate = snapped[idx] + stepSign
      if (candidate >= step) {
        snapped[idx] = candidate
        diff -= stepSign
      }
      i++
    }
  }
  // Last-resort adjust final element to absorb any remaining small diff
  if (diff !== 0) {
    snapped[n - 1] += diff
    diff = 0
  }
  // Positions including gutters
  const positions: number[] = []
  let acc = 0
  for (let i = 0; i < n; i++) {
    positions.push(acc)
    acc += snapped[i]
    if (i < n - 1) acc += gutter
  }
  return { sizes: snapped, positions }
}