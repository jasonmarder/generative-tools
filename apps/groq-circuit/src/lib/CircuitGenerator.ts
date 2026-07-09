import { nanoid } from 'nanoid';
import type { CircuitPattern, Component, GeneratorConfig, Point, Trace, Via } from './types';
import { clamp, rectIntersects, SeededRandom } from './utils';

type GridPoint = { x: number; y: number };

// Isometric transformation constants
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const ISO_COS = Math.cos(ISO_ANGLE);
const ISO_SIN = Math.sin(ISO_ANGLE);

// A* Node for pathfinding (square grid coords)
interface Node {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic to end
  f: number; // Total cost
  parent: Node | null;
  dirX: number; // Direction from parent x
  dirY: number; // Direction from parent y
}

export class CircuitGenerator {
  private config: GeneratorConfig;
  private random: SeededRandom;
  private grid: number[][];
  private components: Component[] = [];
  private vias: Via[] = [];
  private componentPorts: GridPoint[] = [];
  private cols: number;
  private rows: number;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.random = new SeededRandom(config.seed);

    // Square grid dimensions
    this.cols = Math.ceil(config.width / config.gridSize);
    this.rows = Math.ceil(config.height / config.gridSize);
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  generate(): CircuitPattern {
    // 1. Reset grid
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.componentPorts = [];

    // 2. Place components and mark them on grid
    this.components = this.placeComponents();

    // 3. Generate traces using A*
    const traces = this.generateTraces();

    // 4. Place vias attached to traces
    this.vias = this.placeVias(traces);

    return {
      traces,
      components: this.components,
      vias: this.vias,
    };
  }

  private placeComponents(): Component[] {
    const components: Component[] = [];
    const paddingPx = this.config.gridSize * 2;

    for (let i = 0; i < this.config.componentCount; i++) {
      // Components dimensions in world units
      const wCells = this.random.nextInt(4, 12);
      const hCells = this.random.nextInt(3, 8);
      const width = wCells * this.config.gridSize;
      const height = hCells * this.config.gridSize;

      let attempts = 0;
      let placed = false;

      while (attempts < 50 && !placed) {
        const gridX = this.random.nextInt(0, this.cols - wCells);
        const gridY = this.random.nextInt(0, this.rows - hCells);
        const worldPos = this.gridToIsometric({ x: gridX, y: gridY });
        const x = worldPos.x;
        const y = worldPos.y;

        // Keep component fully in bounds (world-space rectangle)
        if (x < paddingPx || y < paddingPx || x + width > this.config.width - paddingPx || y + height > this.config.height - paddingPx) {
          attempts++;
          continue;
        }

        // Check overlaps with existing components
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
            shape: this.random.next() > 0.5 ? 'rect' : 'round-rect'
          };
          components.push(component);

          // Mark obstacles (components) in grid
          this.markWorldRect(component.x - this.config.gridSize, component.y - this.config.gridSize, component.width + this.config.gridSize * 2, component.height + this.config.gridSize * 2, 1);

          // Create a couple of ports on the perimeter ring so traces can connect.
          this.addComponentPortsForRect(component);
          placed = true;
        }
        attempts++;
      }
    }
    return components;
  }

  private generateTraces(): Trace[] {
    const traces: Trace[] = [];
    const total = this.config.traceCount;

    // Budget some traces for component connections.
    const componentConnectionTarget = Math.min(
      Math.min(
        total,
        Math.max(this.config.componentCount, Math.floor(total * 0.25))
      ),
      this.componentPorts.length
    );

    // Use density to decide how many traces are in bundled, parallel runs.
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

  private findRandomFreePoint(padding: number): GridPoint | null {
    let attempts = 0;
    while (attempts < 20) {
      const x = this.random.nextInt(padding, this.cols - padding);
      const y = this.random.nextInt(padding, this.rows - padding);
      if (this.grid[y][x] === 0) return { x, y };
      attempts++;
    }
    return null;
  }

  private addComponentPortsForRect(component: Component) {
    const ring = this.config.gridSize * 1.5;
    const inner = { x: component.x, y: component.y, w: component.width, h: component.height };
    const outer = { x: component.x - ring, y: component.y - ring, w: component.width + ring * 2, h: component.height + ring * 2 };

    const candidates: GridPoint[] = [];

    // Convert world rect to grid bounds
    const gridBounds = this.worldRectToGridBounds(outer);

    for (let gy = gridBounds.minY; gy <= gridBounds.maxY; gy++) {
      for (let gx = gridBounds.minX; gx <= gridBounds.maxX; gx++) {
        if (!this.isInBounds({ x: gx, y: gy })) continue;
        const cell = this.grid[gy][gx];
        const wp = this.gridToIsometric({ x: gx, y: gy });
        const inOuter = wp.x >= outer.x && wp.x <= outer.x + outer.w && wp.y >= outer.y && wp.y <= outer.y + outer.h;
        const inInner = wp.x >= inner.x && wp.x <= inner.x + inner.w && wp.y >= inner.y && wp.y <= inner.y + inner.h;
        if (inOuter && !inInner && cell !== 2) candidates.push({ x: gx, y: gy });
      }
    }

    // Pick 2 ports per component.
    const portCount = 2;
    for (let i = 0; i < portCount && candidates.length > 0; i++) {
      const idx = this.random.nextInt(0, candidates.length - 1);
      const port = candidates.splice(idx, 1)[0];
      this.grid[port.y][port.x] = 0;
      this.componentPorts.push(port);
    }
  }

  private worldRectToGridBounds(rect: { x: number; y: number; w: number; h: number }): { minX: number; maxX: number; minY: number; maxY: number } {
    // Convert world rect corners to grid coordinates
    const corners = [
      { x: rect.x, y: rect.y },
      { x: rect.x + rect.w, y: rect.y },
      { x: rect.x, y: rect.y + rect.h },
      { x: rect.x + rect.w, y: rect.y + rect.h },
    ];

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const corner of corners) {
      const grid = this.isometricToGrid(corner);
      minX = Math.min(minX, grid.x);
      maxX = Math.max(maxX, grid.x);
      minY = Math.min(minY, grid.y);
      maxY = Math.max(maxY, grid.y);
    }

    return {
      minX: clamp(Math.floor(minX) - 2, 0, this.cols - 1),
      maxX: clamp(Math.ceil(maxX) + 2, 0, this.cols - 1),
      minY: clamp(Math.floor(minY) - 2, 0, this.rows - 1),
      maxY: clamp(Math.ceil(maxY) + 2, 0, this.rows - 1),
    };
  }

  private generateEdgeTraces(targetCount: number, attachTargets: GridPoint[]): Trace[] {
    const traces: Trace[] = [];
    const padding = 1;

    const edgePoints = this.findEdgeEntryPoints(
      Math.max(8, Math.min(200, Math.ceil(targetCount * 2)))
    );

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

      const pathPoints = this.findPath(start, end);
      if (pathPoints.length > 1) {
        traces.push(this.makeTraceFromGridPath(pathPoints));
        this.markPathOccupied(pathPoints);
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

      // Determine which axis to offset along to keep the bundle parallel.
      const offsetAlongX = start.y === 0 || start.y === this.rows - 1;
      const deltas = this.getBundleDeltas(tracesPerBundle, spacingCells);

      let addedInBundle = 0;
      for (const delta of deltas) {
        const shiftedStart = offsetAlongX ? { x: start.x + delta, y: start.y } : { x: start.x, y: start.y + delta };
        const shiftedEnd = offsetAlongX ? { x: end.x + delta, y: end.y } : { x: end.x, y: end.y + delta };

        if (!this.isInBounds(shiftedStart) || !this.isInBounds(shiftedEnd)) {
          continue;
        }
        if (this.grid[shiftedStart.y][shiftedStart.x] !== 0 || this.grid[shiftedEnd.y][shiftedEnd.x] !== 0) {
          continue;
        }

        // Prefer a literal offset of the base path to keep the bundle truly parallel.
        const shiftedBase = basePath.map(p =>
          offsetAlongX ? { x: p.x + delta, y: p.y } : { x: p.x, y: p.y + delta }
        );
        const canUseShiftedBase =
          shiftedBase.length > 1 &&
          shiftedBase.every(p => this.isInBounds(p) && this.grid[p.y][p.x] === 0);

        const pathPoints = canUseShiftedBase ? shiftedBase : this.findPath(shiftedStart, shiftedEnd);
        if (pathPoints.length > 1) {
          traces.push(this.makeTraceFromGridPath(pathPoints));
          this.markPathOccupied(pathPoints);
          addedInBundle++;
        }
      }

      if (addedInBundle > 1) {
        bundlesMade++;
      }

      attempts++;
    }

    return traces;
  }

  private getBundleDeltas(tracesPerBundle: number, spacingCells: number): number[] {
    const deltas: number[] = [];
    const half = Math.floor(tracesPerBundle / 2);
    for (let i = 0; i < tracesPerBundle; i++) {
      deltas.push((i - half) * spacingCells);
    }
    // Place the center trace first, then expand outward.
    return deltas.sort((a, b) => Math.abs(a) - Math.abs(b));
  }

  private connectComponentsToTraces(targetCount: number, attachTargets: GridPoint[]): Trace[] {
    const traces: Trace[] = [];
    if (targetCount <= 0 || this.componentPorts.length === 0) return traces;

    const edgePoints = this.findEdgeEntryPoints(Math.max(40, targetCount * 4));

    // Shuffle ports deterministically by sampling random indices.
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
        attachTargets.length > 0 && this.random.next() < 0.7
          ? this.random.choice(attachTargets)
          : this.random.choice(edgePoints);

      const pathPoints = this.findPath(start, end);
      if (pathPoints.length > 1) {
        traces.push(this.makeTraceFromGridPath(pathPoints));
        this.markPathOccupied(pathPoints);
      }

      attempts++;
    }

    return traces;
  }

  private collectAttachmentTargets(traces: Trace[], maxTargets: number): GridPoint[] {
    const out: GridPoint[] = [];
    const seen = new Set<string>();
    const toGrid = (p: Point): GridPoint => this.isometricToGrid(p);

    for (const t of traces) {
      if (t.path.length < 2) continue;
      const candidates = [t.path[0], t.path[t.path.length - 1]];
      // Also include corners to get more realistic "tap points".
      for (let i = 1; i < t.path.length - 1; i++) candidates.push(t.path[i]);

      for (const p of candidates) {
        const g = toGrid(p);
        if (!this.isInBounds(g)) continue;
        const key = `${g.x},${g.y}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(g);
        if (out.length >= maxTargets) return out;
      }
    }

    return out;
  }

  private findEdgeEntryPoints(count: number): GridPoint[] {
    const points: GridPoint[] = [];
    const padding = 1;
    const density = clamp(this.config.density, 0, 1);
    const spacingCells = clamp(Math.round((1 - density) * 8) + 1, 1, 9);

    // Top & bottom edges
    for (let x = padding; x < this.cols - padding; x += spacingCells) {
      points.push({ x, y: 0 });
      points.push({ x, y: this.rows - 1 });
    }

    // Left & right edges
    for (let y = padding; y < this.rows - padding; y += spacingCells) {
      points.push({ x: 0, y });
      points.push({ x: this.cols - 1, y });
    }

    // Filter to keep only unoccupied points (still allow sparse when edges are blocked)
    const free = points.filter(p => this.isInBounds(p) && this.grid[p.y][p.x] === 0);
    if (free.length === 0) return points.slice(0, Math.min(points.length, count));

    // Downsample to requested count while keeping deterministic randomness.
    const sampled: GridPoint[] = [];
    const pool = [...free];
    while (sampled.length < count && pool.length > 0) {
      const idx = this.random.nextInt(0, pool.length - 1);
      sampled.push(pool.splice(idx, 1)[0]);
    }
    return sampled;
  }

  private makeTraceFromGridPath(pathPoints: GridPoint[]): Trace {
    const strokeWidth = this.random.nextFloat(this.config.strokeWidth[0], this.config.strokeWidth[1]);
    return {
      id: nanoid(),
      path: this.simplifyPath(pathPoints),
      strokeWidth,
    };
  }

  private isInBounds(p: GridPoint): boolean {
    return p.x >= 0 && p.x < this.cols && p.y >= 0 && p.y < this.rows;
  }

  /**
   * A* Pathfinding Algorithm with 8-directional moves (orthogonal + 45° diagonal)
   */
  private findPath(start: GridPoint, end: GridPoint): GridPoint[] {
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
      dirY: 0
    };
    startNode.f = startNode.g + startNode.h;

    openSet.push(startNode);
    nodeMap.set(`${start.x},${start.y}`, startNode);

    // 8-directional moves: 4 orthogonal + 4 diagonal (45°)
    const moves: { dx: number; dy: number; cost: number }[] = [
      // Orthogonal moves (cost = 1.0)
      { dx: 0, dy: -1, cost: 1.0 },  // Up
      { dx: 1, dy: 0, cost: 1.0 },    // Right
      { dx: 0, dy: 1, cost: 1.0 },     // Down
      { dx: -1, dy: 0, cost: 1.0 },    // Left
      // Diagonal moves (45°, cost = √2 ≈ 1.414)
      { dx: 1, dy: -1, cost: Math.SQRT2 },   // Up-Right
      { dx: 1, dy: 1, cost: Math.SQRT2 },     // Down-Right
      { dx: -1, dy: 1, cost: Math.SQRT2 },   // Down-Left
      { dx: -1, dy: -1, cost: Math.SQRT2 },  // Up-Left
    ];

    while (openSet.length > 0) {
      // Get node with lowest f score
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      const currentKey = `${current.x},${current.y}`;

      if (current.x === end.x && current.y === end.y) {
        return this.reconstructPath(current);
      }

      closedSet.add(currentKey);

      for (const move of moves) {
        const nx = current.x + move.dx;
        const ny = current.y + move.dy;
        const neighborKey = `${nx},${ny}`;

        const neighborPos = { x: nx, y: ny };
        if (!this.isInBounds(neighborPos)) continue;

        const isTarget = nx === end.x && ny === end.y;
        if (!this.isPassableCell(neighborPos, isTarget)) continue;

        if (closedSet.has(neighborKey)) continue;

        const overlap = clamp(this.config.overlap ?? 0, 0, 1);
        const complexity = clamp(this.config.complexity, 0, 1);
        const reusingTrace = this.grid[ny][nx] === 2 && !isTarget;

        // Prefer orthogonal routing: add small penalty for diagonal moves
        const diagonalPenalty = (move.dx !== 0 && move.dy !== 0) ? 0.1 : 0;

        let turnCost = 0;
        if (current.parent && (current.dirX !== move.dx || current.dirY !== move.dy)) {
          const basePenalty = 6.0;
          turnCost = basePenalty * (1 - complexity);

          // Higher penalty for sharp turns (90° or more)
          const dot = this.dirDot(current.dirX, current.dirY, move.dx, move.dy);
          if (dot < 0.5) turnCost += 6.0;
        }

        const reuseCost = reusingTrace ? (1 - overlap) * 8 + 0.25 : 0;
        const wander = this.random.nextFloat(0, 0.35) * complexity;

        const tentativeG = current.g + move.cost + diagonalPenalty + turnCost + reuseCost + wander;

        let neighbor = nodeMap.get(neighborKey);
        if (!neighbor) {
          neighbor = {
            x: nx,
            y: ny,
            g: Infinity,
            h: this.heuristic(neighborPos, end),
            f: Infinity,
            parent: null,
            dirX: move.dx,
            dirY: move.dy,
          };
          nodeMap.set(neighborKey, neighbor);
        }

        if (tentativeG < neighbor.g) {
          neighbor.parent = current;
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.dirX = move.dx;
          neighbor.dirY = move.dy;
          if (!openSet.includes(neighbor)) openSet.push(neighbor);
        }
      }
    }

    return []; // No path found
  }

  private isPassableCell(p: GridPoint, isTarget: boolean): boolean {
    const cell = this.grid[p.y][p.x];
    if (cell === 1 && !isTarget) return false; // component obstacle
    const overlap = clamp(this.config.overlap ?? 0, 0, 1);
    if (cell === 2 && !isTarget && overlap <= 0) return false;
    return true;
  }

  private dirDot(ax: number, ay: number, bx: number, by: number): number {
    // Dot product of two direction vectors
    const al = Math.hypot(ax, ay);
    const bl = Math.hypot(bx, by);
    if (al < 1e-6 || bl < 1e-6) return 1;
    return (ax / al) * (bx / bl) + (ay / al) * (by / bl);
  }

  private heuristic(a: GridPoint, b: GridPoint): number {
    // Use Euclidean distance for heuristic
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  private reconstructPath(node: Node): GridPoint[] {
    const path: GridPoint[] = [];
    let current: Node | null = node;
    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }
    return path;
  }

  private simplifyPath(gridPoints: GridPoint[]): Point[] {
    if (gridPoints.length < 2) return [];

    // Preserve ALL corner points for sharp angles (no simplification)
    // Convert grid points to isometric world coordinates
    return gridPoints.map(p => this.gridToIsometric(p));
  }

  /**
   * Convert square grid coordinates to isometric 3D world coordinates
   */
  private gridToIsometric(point: GridPoint): Point {
    // Isometric transformation: rotate and scale
    // isoX = (x - y) * cos(30°) * gridSize
    // isoY = (x + y) * sin(30°) * gridSize
    // Center the grid in the canvas
    const centerX = (this.cols - 1) / 2;
    const centerY = (this.rows - 1) / 2;
    const offsetX = (point.x - centerX - point.y + centerY) * ISO_COS * this.config.gridSize;
    const offsetY = (point.x - centerX + point.y - centerY) * ISO_SIN * this.config.gridSize;

    return {
      x: offsetX + this.config.width / 2,
      y: offsetY + this.config.height / 2,
    };
  }

  /**
   * Convert isometric world coordinates back to square grid coordinates
   */
  private isometricToGrid(p: Point): GridPoint {
    // Inverse isometric transformation
    const centeredX = p.x - this.config.width / 2;
    const centeredY = p.y - this.config.height / 2;

    const centerX = (this.cols - 1) / 2;
    const centerY = (this.rows - 1) / 2;

    const gridX = (centeredX / (ISO_COS * this.config.gridSize) + centeredY / (ISO_SIN * this.config.gridSize)) / 2 + centerX;
    const gridY = (centeredY / (ISO_SIN * this.config.gridSize) - centeredX / (ISO_COS * this.config.gridSize)) / 2 + centerY;

    return {
      x: clamp(Math.round(gridX), 0, this.cols - 1),
      y: clamp(Math.round(gridY), 0, this.rows - 1),
    };
  }

  private markWorldRect(x: number, y: number, w: number, h: number, value: number) {
    const gridBounds = this.worldRectToGridBounds({ x, y, w, h });

    for (let gy = gridBounds.minY; gy <= gridBounds.maxY; gy++) {
      for (let gx = gridBounds.minX; gx <= gridBounds.maxX; gx++) {
        const wp = this.gridToIsometric({ x: gx, y: gy });
        if (wp.x >= x && wp.x <= x + w && wp.y >= y && wp.y <= y + h) {
          this.grid[gy][gx] = value;
        }
      }
    }
  }

  private markPathOccupied(path: GridPoint[]) {
    for (const p of path) {
      if (!this.isInBounds(p)) continue;
      if (this.grid[p.y][p.x] !== 1) this.grid[p.y][p.x] = 2;
    }
  }

  private placeVias(traces: Trace[]): Via[] {
    if (this.config.viaCount <= 0 || traces.length === 0) return [];

    const candidates = this.collectViaCandidatePoints(traces);
    if (candidates.length === 0) return [];

    const vias: Via[] = [];
    const target = this.config.viaCount;
    const used = new Set<string>();

    let attempts = 0;
    while (vias.length < target && attempts < target * 20 && candidates.length > 0) {
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
    const pushUnique = (p: Point, seen: Set<string>) => {
      const key = `${p.x},${p.y}`;
      if (seen.has(key)) return;
      seen.add(key);
      points.push(p);
    };

    const seen = new Set<string>();

    // Prefer shared endpoints as "intersections" (junction hubs).
    const intersections = this.findTraceIntersections(traces);
    for (const p of intersections) pushUnique(p, seen);

    // Endpoints and corners feel like realistic connection points.
    for (const trace of traces) {
      if (trace.path.length < 2) continue;
      pushUnique(trace.path[0], seen);
      pushUnique(trace.path[trace.path.length - 1], seen);

      for (let i = 1; i < trace.path.length - 1; i++) {
        pushUnique(trace.path[i], seen);
      }

      // Along long straight runs.
      const along = this.samplePointsAlongTrace(trace);
      for (const p of along) pushUnique(p, seen);
    }

    return points;
  }

  private findTraceIntersections(traces: Trace[]): Point[] {
    const counts = new Map<string, { p: Point; n: number }>();
    for (const t of traces) {
      if (t.path.length < 2) continue;
      const endpoints = [t.path[0], t.path[t.path.length - 1]];
      for (const p of endpoints) {
        const key = `${p.x},${p.y}`;
        const entry = counts.get(key);
        if (!entry) counts.set(key, { p, n: 1 });
        else entry.n += 1;
      }
    }
    const intersections: Point[] = [];
    for (const { p, n } of counts.values()) {
      if (n > 1) intersections.push(p);
    }
    return intersections;
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
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < stepPx * 2) continue;
      const steps = Math.floor(len / stepPx);
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        const p = { x: a.x + dx * t, y: a.y + dy * t };
        // Snap to the nearest grid cell
        const grid = this.isometricToGrid(p);
        out.push(this.gridToIsometric(grid));
      }
    }
    return out;
  }
}
