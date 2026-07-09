import { nanoid } from 'nanoid';
import type { CircuitPattern, Component, GeneratorConfig, Point, Trace, Via } from './types';
import { clamp, rectIntersects, SeededRandom } from './utils';

// A* Node for pathfinding (square grid, Manhattan moves)
interface Node {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
  dirX: number;
  dirY: number;
}

export class TopDownCircuitGenerator {
  private config: GeneratorConfig;
  private random: SeededRandom;
  private grid: number[][];
  private components: Component[] = [];
  private vias: Via[] = [];
  private componentPorts: { x: number; y: number }[] = [];
  private cols: number;
  private rows: number;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.random = new SeededRandom(config.seed);
    this.cols = Math.ceil(config.width / config.gridSize);
    this.rows = Math.ceil(config.height / config.gridSize);
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  generate(): CircuitPattern {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.componentPorts = [];

    this.components = this.placeComponents();
    const traces = this.generateTraces();
    this.vias = this.placeVias(traces);

    return { traces, components: this.components, vias: this.vias };
  }

  private placeComponents(): Component[] {
    const components: Component[] = [];
    const padding = 4;

    for (let i = 0; i < this.config.componentCount; i++) {
      const wCells = this.random.nextInt(4, 12);
      const hCells = this.random.nextInt(3, 8);
      const width = wCells * this.config.gridSize;
      const height = hCells * this.config.gridSize;

      let attempts = 0;
      let placed = false;
      while (attempts < 50 && !placed) {
        const gridX = this.random.nextInt(padding, this.cols - wCells - padding);
        const gridY = this.random.nextInt(padding, this.rows - hCells - padding);
        const x = gridX * this.config.gridSize;
        const y = gridY * this.config.gridSize;

        const overlaps = components.some(comp =>
          rectIntersects(x - 10, y - 10, width + 20, height + 20, comp.x, comp.y, comp.width, comp.height)
        );

        if (!overlaps) {
          const component: Component = {
            id: nanoid(),
            x,
            y,
            width,
            height,
            type: 'chip',
            shape: this.random.next() > 0.5 ? 'rect' : 'round-rect',
          };
          components.push(component);

          // Mark obstacle ring
          this.markGridArea(gridX - 1, gridY - 1, wCells + 2, hCells + 2, 1);
          this.addComponentPorts(gridX, gridY, wCells, hCells);
          placed = true;
        }

        attempts++;
      }
    }

    return components;
  }

  private addComponentPorts(gridX: number, gridY: number, wCells: number, hCells: number) {
    const candidates: { x: number; y: number }[] = [];

    for (let y = gridY; y < gridY + hCells; y++) {
      candidates.push({ x: gridX - 1, y });
      candidates.push({ x: gridX + wCells, y });
    }
    for (let x = gridX; x < gridX + wCells; x++) {
      candidates.push({ x, y: gridY - 1 });
      candidates.push({ x, y: gridY + hCells });
    }

    const portCount = 2;
    for (let i = 0; i < portCount && candidates.length > 0; i++) {
      const idx = this.random.nextInt(0, candidates.length - 1);
      const port = candidates.splice(idx, 1)[0];
      if (!this.isInBounds(port.x, port.y)) continue;
      this.grid[port.y][port.x] = 0;
      this.componentPorts.push(port);
    }
  }

  private generateTraces(): Trace[] {
    const traces: Trace[] = [];
    const total = this.config.traceCount;

    const componentConnectionTarget = Math.min(
      Math.min(total, Math.max(this.config.componentCount, Math.floor(total * 0.25))),
      this.componentPorts.length
    );

    const bundleTracesTarget = Math.min(
      total - componentConnectionTarget,
      Math.floor(total * clamp(this.config.density, 0, 1) * 0.6)
    );

    const tracesPerBundle = 4;
    const bundleCount = Math.floor(bundleTracesTarget / tracesPerBundle);

    traces.push(...this.generateParallelBundles(bundleCount, tracesPerBundle));

    const remaining = total - traces.length - componentConnectionTarget;
    if (remaining > 0) {
      const attachTargets = this.collectAttachmentTargets(traces, Math.max(200, remaining * 2));
      traces.push(...this.generateEdgeTraces(remaining, attachTargets));
    }

    if (componentConnectionTarget > 0) {
      const attachTargets = this.collectAttachmentTargets(traces, Math.max(200, componentConnectionTarget * 4));
      traces.push(...this.connectComponentsToTraces(componentConnectionTarget, attachTargets));
    }

    return traces.slice(0, total);
  }

  private generateEdgeTraces(targetCount: number, attachTargets: { x: number; y: number }[]): Trace[] {
    const traces: Trace[] = [];
    const padding = 1;
    const edgePoints = this.findEdgeEntryPoints(Math.max(8, Math.min(200, Math.ceil(targetCount * 2))));

    let attempts = 0;
    while (traces.length < targetCount && attempts < targetCount * 10) {
      const start = this.random.choice(edgePoints);
      const r = this.random.next();
      const end =
        attachTargets.length > 0 && r < 0.35
          ? this.random.choice(attachTargets)
          : r < 0.85
            ? this.random.choice(edgePoints)
            : this.findRandomFreePoint(padding);

      if (!end) {
        attempts++;
        continue;
      }
      if (start.x === end.x && start.y === end.y) {
        attempts++;
        continue;
      }
      if (this.grid[start.y][start.x] !== 0) {
        attempts++;
        continue;
      }

      const path = this.findPath(start, end);
      if (path.length > 1) {
        traces.push(this.makeTraceFromGridPath(path));
        this.markPathOccupied(path);
      }
      attempts++;
    }

    return traces;
  }

  private generateParallelBundles(bundleCount: number, tracesPerBundle: number): Trace[] {
    const traces: Trace[] = [];
    if (bundleCount <= 0) return traces;

    const baseEdgePoints = this.findEdgeEntryPoints(Math.max(40, bundleCount * 8));
    const spacingCells = clamp(Math.round((1 - clamp(this.config.density, 0, 1)) * 4) + 1, 1, 5);

    let bundlesMade = 0;
    let attempts = 0;
    while (bundlesMade < bundleCount && attempts < bundleCount * 20) {
      const start = this.random.choice(baseEdgePoints);
      const end = this.random.choice(baseEdgePoints);
      if (start.x === end.x && start.y === end.y) {
        attempts++;
        continue;
      }
      if (this.grid[start.y][start.x] !== 0 || this.grid[end.y][end.x] !== 0) {
        attempts++;
        continue;
      }

      const basePath = this.findPath(start, end);
      if (basePath.length < 2) {
        attempts++;
        continue;
      }

      const offsetAlongX = start.y === 0 || start.y === this.rows - 1;
      const deltas = this.getBundleDeltas(tracesPerBundle, spacingCells);

      let added = 0;
      for (const delta of deltas) {
        const shiftedStart = offsetAlongX ? { x: start.x + delta, y: start.y } : { x: start.x, y: start.y + delta };
        const shiftedEnd = offsetAlongX ? { x: end.x + delta, y: end.y } : { x: end.x, y: end.y + delta };
        if (!this.isInBounds(shiftedStart.x, shiftedStart.y) || !this.isInBounds(shiftedEnd.x, shiftedEnd.y)) continue;
        if (this.grid[shiftedStart.y][shiftedStart.x] !== 0 || this.grid[shiftedEnd.y][shiftedEnd.x] !== 0) continue;

        const shiftedBase = basePath.map(p => (offsetAlongX ? { x: p.x + delta, y: p.y } : { x: p.x, y: p.y + delta }));
        const canUseShiftedBase = shiftedBase.every(p => this.isInBounds(p.x, p.y) && this.grid[p.y][p.x] === 0);
        const path = canUseShiftedBase ? shiftedBase : this.findPath(shiftedStart, shiftedEnd);

        if (path.length > 1) {
          traces.push(this.makeTraceFromGridPath(path));
          this.markPathOccupied(path);
          added++;
        }
      }

      if (added > 1) bundlesMade++;
      attempts++;
    }

    return traces;
  }

  private connectComponentsToTraces(targetCount: number, attachTargets: { x: number; y: number }[]): Trace[] {
    const traces: Trace[] = [];
    if (targetCount <= 0 || this.componentPorts.length === 0) return traces;

    const edgePoints = this.findEdgeEntryPoints(Math.max(40, targetCount * 4));
    const availablePorts = [...this.componentPorts];

    let attempts = 0;
    while (traces.length < targetCount && availablePorts.length > 0 && attempts < targetCount * 20) {
      const portIdx = this.random.nextInt(0, availablePorts.length - 1);
      const start = availablePorts.splice(portIdx, 1)[0];
      if (this.grid[start.y][start.x] !== 0) {
        attempts++;
        continue;
      }

      const end =
        attachTargets.length > 0 && this.random.next() < 0.7 ? this.random.choice(attachTargets) : this.random.choice(edgePoints);

      const path = this.findPath(start, end);
      if (path.length > 1) {
        traces.push(this.makeTraceFromGridPath(path));
        this.markPathOccupied(path);
      }
      attempts++;
    }

    return traces;
  }

  private collectAttachmentTargets(traces: Trace[], maxTargets: number): { x: number; y: number }[] {
    const out: { x: number; y: number }[] = [];
    const seen = new Set<string>();
    const toGrid = (p: Point): { x: number; y: number } => ({
      x: clamp(Math.round(p.x / this.config.gridSize), 0, this.cols - 1),
      y: clamp(Math.round(p.y / this.config.gridSize), 0, this.rows - 1),
    });

    for (const t of traces) {
      if (t.path.length < 2) continue;
      const candidates = [t.path[0], t.path[t.path.length - 1]];
      for (let i = 1; i < t.path.length - 1; i++) candidates.push(t.path[i]);

      for (const p of candidates) {
        const g = toGrid(p);
        const key = `${g.x},${g.y}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(g);
        if (out.length >= maxTargets) return out;
      }
    }

    return out;
  }

  private findEdgeEntryPoints(count: number): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const padding = 1;
    const density = clamp(this.config.density, 0, 1);
    const spacingCells = clamp(Math.round((1 - density) * 8) + 1, 1, 9);

    for (let x = padding; x < this.cols - padding; x += spacingCells) {
      points.push({ x, y: 0 });
      points.push({ x, y: this.rows - 1 });
    }
    for (let y = padding; y < this.rows - padding; y += spacingCells) {
      points.push({ x: 0, y });
      points.push({ x: this.cols - 1, y });
    }

    const free = points.filter(p => this.isInBounds(p.x, p.y) && this.grid[p.y][p.x] === 0);
    if (free.length === 0) return points.slice(0, Math.min(points.length, count));

    const sampled: { x: number; y: number }[] = [];
    const pool = [...free];
    while (sampled.length < count && pool.length > 0) {
      const idx = this.random.nextInt(0, pool.length - 1);
      sampled.push(pool.splice(idx, 1)[0]);
    }
    return sampled;
  }

  private findRandomFreePoint(padding: number): { x: number; y: number } | null {
    let attempts = 0;
    while (attempts < 20) {
      const x = this.random.nextInt(padding, this.cols - padding);
      const y = this.random.nextInt(padding, this.rows - padding);
      if (this.grid[y][x] === 0) return { x, y };
      attempts++;
    }
    return null;
  }

  private getBundleDeltas(tracesPerBundle: number, spacingCells: number): number[] {
    const deltas: number[] = [];
    const half = Math.floor(tracesPerBundle / 2);
    for (let i = 0; i < tracesPerBundle; i++) deltas.push((i - half) * spacingCells);
    return deltas.sort((a, b) => Math.abs(a) - Math.abs(b));
  }

  private makeTraceFromGridPath(pathPoints: { x: number; y: number }[]): Trace {
    const strokeWidth = this.random.nextFloat(this.config.strokeWidth[0], this.config.strokeWidth[1]);
    return { id: nanoid(), path: this.simplifyPath(pathPoints), strokeWidth };
  }

  private simplifyPath(gridPoints: { x: number; y: number }[]): Point[] {
    if (gridPoints.length < 2) return [];
    const simplified: Point[] = [];
    simplified.push(this.gridToWorld(gridPoints[0]));

    let lastDirX = 0;
    let lastDirY = 0;
    for (let i = 1; i < gridPoints.length; i++) {
      const prev = gridPoints[i - 1];
      const curr = gridPoints[i];
      const dirX = curr.x - prev.x;
      const dirY = curr.y - prev.y;
      if (i > 1 && (dirX !== lastDirX || dirY !== lastDirY)) {
        simplified.push(this.gridToWorld(prev));
      }
      lastDirX = dirX;
      lastDirY = dirY;
    }

    simplified.push(this.gridToWorld(gridPoints[gridPoints.length - 1]));
    return simplified;
  }

  private gridToWorld(p: { x: number; y: number }): Point {
    return { x: p.x * this.config.gridSize, y: p.y * this.config.gridSize };
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }

  private markGridArea(col: number, row: number, width: number, height: number, value: number) {
    for (let r = row; r < row + height && r < this.rows; r++) {
      for (let c = col; c < col + width && c < this.cols; c++) {
        if (r >= 0 && c >= 0 && r < this.rows && c < this.cols) this.grid[r][c] = value;
      }
    }
  }

  private markPathOccupied(path: { x: number; y: number }[]) {
    for (const p of path) {
      if (!this.isInBounds(p.x, p.y)) continue;
      if (this.grid[p.y][p.x] !== 1) this.grid[p.y][p.x] = 2;
    }
  }

  private findPath(start: { x: number; y: number }, end: { x: number; y: number }): { x: number; y: number }[] {
    const openSet: Node[] = [];
    const closedSet: Set<string> = new Set();
    const nodeMap: Map<string, Node> = new Map();

    const startNode: Node = {
      x: start.x,
      y: start.y,
      g: 0,
      h: this.heuristic(start, end),
      f: 0,
      parent: null,
      dirX: 0,
      dirY: 0,
    };
    startNode.f = startNode.g + startNode.h;
    openSet.push(startNode);
    nodeMap.set(`${start.x},${start.y}`, startNode);

    const neighbors = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
    ];

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      const currentKey = `${current.x},${current.y}`;

      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(current);
      }

      closedSet.add(currentKey);

      for (const { dx, dy } of neighbors) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        const neighborKey = `${nx},${ny}`;
        if (!this.isInBounds(nx, ny)) continue;

        const cell = this.grid[ny][nx];
        const isTarget = nx === end.x && ny === end.y;
        if (cell === 1 && !isTarget) continue;

        const overlap = clamp(this.config.overlap ?? 0, 0, 1);
        const reusingTrace = cell === 2 && !isTarget;
        if (reusingTrace && overlap <= 0) continue;

        if (closedSet.has(neighborKey)) continue;

        const complexity = clamp(this.config.complexity, 0, 1);
        let turnCost = 0;
        if (current.parent && (current.dirX !== dx || current.dirY !== dy)) {
          const basePenalty = 6.0;
          turnCost = basePenalty * (1 - complexity);
        }

        const reuseCost = reusingTrace ? (1 - overlap) * 8 + 0.25 : 0;
        const wander = this.random.nextFloat(0, 0.35) * complexity;

        const tentativeG = current.g + 1 + turnCost + reuseCost + wander;

        let neighbor = nodeMap.get(neighborKey);
        if (!neighbor) {
          neighbor = {
            x: nx,
            y: ny,
            g: Infinity,
            h: this.heuristic({ x: nx, y: ny }, end),
            f: Infinity,
            parent: null,
            dirX: dx,
            dirY: dy,
          };
          nodeMap.set(neighborKey, neighbor);
        }

        if (tentativeG < neighbor.g) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.dirX = dx;
          neighbor.dirY = dy;
          if (!openSet.includes(neighbor)) openSet.push(neighbor);
        }
      }
    }

    return [];
  }

  private heuristic(a: { x: number; y: number }, b: { x: number; y: number }): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return dx + dy;
  }

  private reconstructPath(node: Node): { x: number; y: number }[] {
    const path: { x: number; y: number }[] = [];
    let current: Node | null = node;
    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }
    return path;
  }

  private placeVias(traces: Trace[]): Via[] {
    if (this.config.viaCount <= 0 || traces.length === 0) return [];
    const candidates = this.collectViaCandidatePoints(traces);
    if (candidates.length === 0) return [];

    const vias: Via[] = [];
    const used = new Set<string>();
    let attempts = 0;

    while (vias.length < this.config.viaCount && attempts < this.config.viaCount * 20 && candidates.length > 0) {
      const idx = this.random.nextInt(0, candidates.length - 1);
      const candidate = candidates.splice(idx, 1)[0];
      const key = `${candidate.x},${candidate.y}`;
      if (used.has(key)) {
        attempts++;
        continue;
      }
      used.add(key);
      vias.push({
        id: nanoid(),
        x: candidate.x,
        y: candidate.y,
        radius: this.random.nextInt(3, 6),
      });
      attempts++;
    }

    return vias;
  }

  private collectViaCandidatePoints(traces: Trace[]): Point[] {
    const points: Point[] = [];
    const seen = new Set<string>();
    const pushUnique = (p: Point) => {
      const key = `${p.x},${p.y}`;
      if (seen.has(key)) return;
      seen.add(key);
      points.push(p);
    };

    for (const t of traces) {
      if (t.path.length < 2) continue;
      pushUnique(t.path[0]);
      pushUnique(t.path[t.path.length - 1]);
      for (let i = 1; i < t.path.length - 1; i++) pushUnique(t.path[i]);
      for (const p of this.samplePointsAlongTrace(t)) pushUnique(p);
    }
    return points;
  }

  private samplePointsAlongTrace(trace: Trace): Point[] {
    const out: Point[] = [];
    const density = clamp(this.config.density, 0, 1);
    const stepPx = clamp(Math.round((1 - density) * 40) + 10, 10, 50);

    for (let i = 0; i < trace.path.length - 1; i++) {
      const a = trace.path[i];
      const b = trace.path[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      if (len < stepPx * 2) continue;
      const steps = Math.floor(len / stepPx);
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        out.push({
          x: Math.round((a.x + dx * t) / this.config.gridSize) * this.config.gridSize,
          y: Math.round((a.y + dy * t) / this.config.gridSize) * this.config.gridSize,
        });
      }
    }

    return out;
  }
}
