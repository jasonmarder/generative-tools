import { generateLayout, toSVGString } from '../src'

// Example 1: Layout with open center for text overlay (like the Chainguard website)
const centerLayout = generateLayout({
  cols: 20,
  rows: 12,
  canvasWidth: 1920,
  canvasHeight: 1080,
  margin: 60,
  gutter: 12,
  palette: ['#7C3AED', '#EC4899', '#3B82F6', '#10B981'],
  seed: 'center-open',
  allowSpans: true,
  spanChance: 0.4,
  minColPct: 0.05,
  minRowPct: 0.05,
  bg: '#FFFFFF',
  // Exclude center area (approximately middle 40% of grid) for text
  centerExcludeRect: { col: 6, row: 4, colSpan: 8, rowSpan: 4 },
})

console.log('Center layout SVG:')
console.log(toSVGString(centerLayout))

// Example 2: Square blocks only (uniform geometric feel)
const squaresLayout = generateLayout({
  cols: 12,
  rows: 12,
  canvasWidth: 1200,
  canvasHeight: 1200,
  margin: 40,
  gutter: 8,
  palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
  seed: 'squares-only',
  allowSpans: true,
  spanChance: 0.5,
  minColPct: 0.08,
  minRowPct: 0.08,
  bg: '#F8F9FA',
  squaresOnly: true,
})

console.log('\nSquares-only layout SVG:')
console.log(toSVGString(squaresLayout))

// Example 3: Combining both features for a centered hero layout with squares
const heroLayout = generateLayout({
  cols: 16,
  rows: 10,
  canvasWidth: 1600,
  canvasHeight: 1000,
  margin: 50,
  gutter: 10,
  palette: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'],
  seed: 'hero-squares',
  allowSpans: true,
  spanChance: 0.3,
  minColPct: 0.06,
  minRowPct: 0.06,
  bg: '#FAFAFA',
  // Center exclusion for hero content
  centerExcludeRect: { col: 5, row: 3, colSpan: 6, rowSpan: 4 },
  // Use squares for cleaner geometric appearance
  squaresOnly: true,
})

console.log('\nHero layout with center exclusion and squares SVG:')
console.log(toSVGString(heroLayout))
