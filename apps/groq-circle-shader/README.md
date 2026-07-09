# Organic Pattern Generator

A procedural pattern tool using Perlin noise to create unpredictable, organic arrangements of circles, dots, strokes, and punched-out squares.

## Quick Start

1. Open `index.html` in a modern web browser
2. Use the GUI controls on the right to adjust the pattern
3. Press **Space** to generate a new random pattern
4. Export your creations as PNG files

## How It Works

### The Perlin Noise Engine

Unlike random noise (static), Perlin noise creates smooth, flowing transitions that result in organic "biomes" of pattern styles across the grid.

### Four Pattern Types ("Biomes")

The tool uses threshold values to map noise into four distinct pattern types:

1. **Void** (0.0 - 0.25): Tiny dots - sparse, quiet areas
2. **Edge** (0.25 - 0.45): Stroked rings - transitional boundaries
3. **Body** (0.45 - 0.70): Solid circles - dense, filled regions
4. **Core** (0.70 - 1.0): Punched-out squares - inverted focal points

## Controls

### Grid Settings
- **cols/rows**: Grid resolution (10-100)
- **cellSize**: Size of each cell in pixels (5-40px)

### Organic Distribution
- **Noise Zoom**: Controls blob size (lower = larger organic clusters)
- **Animation Speed**: Speed of noise evolution over time
- **Animate**: Toggle live animation

### Pattern Thresholds
Adjust where one pattern type transitions to another:
- **Void → Edge**: Control tiny dot coverage
- **Edge → Body**: Control stroke ring coverage
- **Body → Core**: Control solid circle coverage

### Element Sizes
Fine-tune the size of each pattern element (0-1 scale relative to cell size)

### Organic Variation
- **Rotation Jitter**: Random rotation per element (0-π radians)
- **Position Jitter**: Random position offset per element (0-0.5)

## Keyboard Shortcuts

- **Space**: Generate new random pattern
- **S**: Save standard PNG (800x800)
- **H**: Save high-resolution PNG (4000x4000)

## Export Options

1. **Export PNG (800x800)**: Screen resolution, perfect for web/preview
2. **Export Hi-Res (4000x4000)**: 5x resolution for print quality
3. **Export SVG**: *Requires p5.svg.js library* (see below)

## Adding SVG Export

To enable vector export:

1. Download [p5.svg.js](https://github.com/zenozeng/p5.js-svg)
2. Add to `index.html` after p5.js:
   ```html
   <script src="p5.svg.min.js"></script>
   ```
3. The SVG export button will then work

## Architecture

```
┌─────────────────────────────────────────────────┐
│ Grid Loop (x, y)                                │
│  ↓                                              │
│ Perlin Noise (x * scale, y * scale, time)      │
│  ↓                                              │
│ Noise Value (0.0 - 1.0)                        │
│  ↓                                              │
│ Threshold Mapping                               │
│  ├─ < 0.25  → Tiny Dot                         │
│  ├─ < 0.45  → Stroke Ring                      │
│  ├─ < 0.70  → Solid Circle                     │
│  └─ < 1.0   → Punched Square                   │
└─────────────────────────────────────────────────┘
```

## Tips for Best Results

1. **Large organic blobs**: Lower the Noise Zoom (0.02-0.05)
2. **Fine detailed patterns**: Increase Noise Zoom (0.15-0.25)
3. **Glitchy aesthetic**: Add Rotation Jitter (~0.3-0.5)
4. **Natural variation**: Add Position Jitter (~0.1-0.2)
5. **Specific pattern dominance**: Adjust thresholds to expand/shrink biomes

## Technical Stack

- **p5.js**: Canvas rendering and creative coding framework
- **dat.GUI**: Real-time parameter controls
- **Perlin Noise**: Organic distribution algorithm

## Browser Compatibility

Works in all modern browsers with HTML5 Canvas support (Chrome, Firefox, Safari, Edge).
