// Seeded random number generator (Mulberry32)
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  choice<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)];
  }
}

// Convert array of points to SVG path string
export function pointsToPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';

  const commands = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${command}${point.x},${point.y}`;
  });

  return commands.join(' ');
}

// Convert polyline points to an SVG path with rounded corners.
// Works best for Manhattan-ish paths but is robust for any polyline.
export function pointsToRoundedPath(
  points: { x: number; y: number }[],
  radius: number
): string {
  if (points.length === 0) return '';
  if (points.length < 3 || radius <= 0) return pointsToPath(points);

  const r = Math.max(0, radius);
  const parts: string[] = [];
  parts.push(`M${points[0].x},${points[0].y}`);

  for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];

    const v1x = p1.x - p0.x;
    const v1y = p1.y - p0.y;
    const v2x = p2.x - p1.x;
    const v2y = p2.y - p1.y;

    const len1 = Math.hypot(v1x, v1y);
    const len2 = Math.hypot(v2x, v2y);
    if (len1 < 1e-6 || len2 < 1e-6) {
      parts.push(`L${p1.x},${p1.y}`);
      continue;
    }

    // If either adjacent segment is diagonal, keep the join sharp (no bezier rounding).
    // This preserves the crisp 45°/angled aesthetic.
    const seg1Diagonal = v1x !== 0 && v1y !== 0;
    const seg2Diagonal = v2x !== 0 && v2y !== 0;
    if (seg1Diagonal || seg2Diagonal) {
      parts.push(`L${p1.x},${p1.y}`);
      continue;
    }

    // If essentially straight, keep a sharp line.
    const dot = (v1x / len1) * (v2x / len2) + (v1y / len1) * (v2y / len2);
    if (dot > 0.999) {
      parts.push(`L${p1.x},${p1.y}`);
      continue;
    }

    const cut = Math.min(r, len1 / 2, len2 / 2);
    const p1a = { x: p1.x - (v1x / len1) * cut, y: p1.y - (v1y / len1) * cut };
    const p1b = { x: p1.x + (v2x / len2) * cut, y: p1.y + (v2y / len2) * cut };

    parts.push(`L${p1a.x},${p1a.y}`);
    parts.push(`Q${p1.x},${p1.y} ${p1b.x},${p1b.y}`);
  }

  const last = points[points.length - 1];
  parts.push(`L${last.x},${last.y}`);
  return parts.join(' ');
}

// Clamp a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Check if two rectangles intersect
export function rectIntersects(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
): boolean {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

// Distance between two points
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
