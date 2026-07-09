export interface Point {
  x: number;
  y: number;
}

export interface Trace {
  id: string;
  path: Point[];
  strokeWidth: number;
}

export interface Component {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'chip' | 'pad' | 'connector';
  shape: 'rect' | 'round-rect' | 'circle';
}

export interface Via {
  id: string;
  x: number;
  y: number;
  radius: number;
  traceId?: string;
}

export interface CircuitPattern {
  traces: Trace[];
  components: Component[];
  vias: Via[];
}

export interface GeneratorConfig {
  width: number;
  height: number;
  gridSize: number;
  traceCount: number;
  componentCount: number;
  viaCount: number;
  strokeWidth: [number, number]; // [min, max]
  complexity: number;
  density: number; // 0..1
  overlap: number; // 0..1, allows traces to reuse existing trace cells (never through components)
  seed: number;
  showComponents: boolean;
}
