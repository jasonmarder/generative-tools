import * as THREE from "three";

const TAU = Math.PI * 2;
const POLICY_INFLUENCE_EVENT_LIMIT = 8;

export const POLICY_TORUS_PALETTE = {
  background: "#F5F5F4",
  foreground: "#1C1917",
  particle: "#1C1917",
  line: "#1C1917",
  node: "#1C1917",
  rejected: "#A4513E",
} as const;

export type PolicyTorusPalette = {
  background: string;
  foreground: string;
  particle: string;
  line: string;
  node: string;
  rejected: string;
};

export type PolicyTorusShapeOptions = {
  majorRadius: number;
  tubeRadius: number;
  axialSquash: number;
  vortexTurns: number;
};

export type PolicyTorusTargetOptions = Partial<PolicyTorusShapeOptions> & {
  seed: number;
  surfaceThickness: number;
  particleJitter: number;
  densityContrast: number;
  densityWaves: number;
};

export type PolicyTorusNodeOptions = Partial<PolicyTorusShapeOptions> & {
  seed: number;
  majorSegments: number;
  minorSegments: number;
  nodeJitter: number;
  irregularity: number;
};

export type PolicyTorusPairOptions = {
  nearestNeighbors: number;
  maxDistance: number;
  maxMajorStep: number;
  maxMinorStep: number;
};

export type PolicyTorusMotionKnobs = {
  buildProgress: number;
  rotationSpeed: number;
  nodeDrift: number;
  nodeDriftSpeed: number;
  spawnRate: number;
  maxActiveConnections: number;
  connectionDuration: number;
  lineOpacity: number;
  nodeOpacity: number;
  growthPortion: number;
  holdPortion: number;
  fadePortion: number;
};

export type PolicyTorusNode = {
  index: number;
  majorIndex: number;
  minorIndex: number;
  theta: number;
  phi: number;
  position: THREE.Vector3;
  phase: number;
  weight: number;
};

export type PolicyTorusPair = {
  start: number;
  end: number;
  distance: number;
};

type ActiveConnection = {
  pairIndex: number;
  startTime: number;
  duration: number;
  seed: number;
  policyKind: PolicyConnectionKind;
  blockT: number;
  alternateNodeIndex: number;
  policyEnergy: number;
  notchEnergy: number;
};

type PolicyConnectionKind = "normal" | "approved" | "blocked" | "rerouted";

export const DEFAULT_POLICY_TORUS_SHAPE: PolicyTorusShapeOptions = {
  majorRadius: 7.9,
  tubeRadius: 3.05,
  axialSquash: 0.82,
  vortexTurns: 1.72,
};

export const DEFAULT_POLICY_TORUS_TARGETS: PolicyTorusTargetOptions = {
  ...DEFAULT_POLICY_TORUS_SHAPE,
  seed: 1207,
  surfaceThickness: 0.34,
  particleJitter: 0.18,
  densityContrast: 0.88,
  densityWaves: 7,
};

export const DEFAULT_POLICY_TORUS_NODES: PolicyTorusNodeOptions = {
  ...DEFAULT_POLICY_TORUS_SHAPE,
  seed: 7229,
  majorSegments: 72,
  minorSegments: 16,
  nodeJitter: 0.18,
  irregularity: 0.34,
};

export const DEFAULT_POLICY_TORUS_PAIRS: PolicyTorusPairOptions = {
  nearestNeighbors: 5,
  maxDistance: 1.85,
  maxMajorStep: 1,
  maxMinorStep: 1,
};

export const DEFAULT_POLICY_TORUS_MOTION: PolicyTorusMotionKnobs = {
  buildProgress: 1,
  rotationSpeed: 0.035,
  nodeDrift: 0.1,
  nodeDriftSpeed: 0.36,
  spawnRate: 120,
  maxActiveConnections: 190,
  connectionDuration: 5.4,
  lineOpacity: 0.5,
  nodeOpacity: 0.56,
  growthPortion: 0.38,
  holdPortion: 0.48,
  fadePortion: 0.14,
};

export function createPolicyTorusTargetTexture(
  size: number,
  options: Partial<PolicyTorusTargetOptions> = {}
): THREE.DataTexture {
  const config = {
    majorRadius: options.majorRadius ?? DEFAULT_POLICY_TORUS_SHAPE.majorRadius,
    tubeRadius: options.tubeRadius ?? DEFAULT_POLICY_TORUS_SHAPE.tubeRadius,
    axialSquash: options.axialSquash ?? DEFAULT_POLICY_TORUS_SHAPE.axialSquash,
    vortexTurns: options.vortexTurns ?? DEFAULT_POLICY_TORUS_SHAPE.vortexTurns,
    seed: options.seed ?? DEFAULT_POLICY_TORUS_TARGETS.seed,
    surfaceThickness: options.surfaceThickness ?? DEFAULT_POLICY_TORUS_TARGETS.surfaceThickness,
    particleJitter: options.particleJitter ?? DEFAULT_POLICY_TORUS_TARGETS.particleJitter,
    densityContrast: options.densityContrast ?? DEFAULT_POLICY_TORUS_TARGETS.densityContrast,
    densityWaves: options.densityWaves ?? DEFAULT_POLICY_TORUS_TARGETS.densityWaves,
  };
  const rng = createRng(config.seed);
  const nodes = createPolicyTorusNodes({
    majorRadius: config.majorRadius,
    tubeRadius: config.tubeRadius,
    axialSquash: config.axialSquash,
    vortexTurns: config.vortexTurns,
    seed: DEFAULT_POLICY_TORUS_NODES.seed,
  });
  const pairs = buildPolicyTorusLocalPairs(nodes, DEFAULT_POLICY_TORUS_PAIRS);
  const data = new Float32Array(new ArrayBuffer(size * size * 4 * 4));

  for (let i = 0; i < size * size; i++) {
    const pair = pairs[Math.floor(rng() * pairs.length)];
    const start = nodes[pair.start];
    const end = nodes[pair.end];
    const t = rng();
    const base = start.position.clone().lerp(end.position, t);
    const tangent = end.position.clone().sub(start.position).normalize();
    const radial = base.clone().normalize();
    const bitangent = new THREE.Vector3().crossVectors(tangent, radial).normalize();
    if (bitangent.lengthSq() < 0.001) bitangent.set(0, 0, 1);
    const normal = new THREE.Vector3().crossVectors(bitangent, tangent).normalize();
    const density = (start.weight + end.weight) * 0.5;
    const strandRadius =
      config.surfaceThickness * (0.18 + rng() * 0.42) +
      config.particleJitter * Math.pow(rng(), 2.0);
    const angle = rng() * TAU;
    const p = base
      .addScaledVector(normal, Math.cos(angle) * strandRadius)
      .addScaledVector(bitangent, Math.sin(angle) * strandRadius)
      .addScaledVector(radial, gaussian(rng) * config.particleJitter * 0.18);
    const lanePhase = fract(start.theta / TAU + t * 0.055 + rng() * 0.025);

    data[i * 4 + 0] = p.x;
    data[i * 4 + 1] = p.y;
    data[i * 4 + 2] = p.z;
    data[i * 4 + 3] = lanePhase * 0.82 + density * 0.18;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createPolicyTorusLookupGeometry(size: number): THREE.BufferGeometry {
  const count = size * size;
  const positions = new Float32Array(new ArrayBuffer(count * 3 * 4));

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (i % size) / Math.max(size - 1, 1);
    positions[i * 3 + 1] = Math.floor(i / size) / Math.max(size - 1, 1);
    positions[i * 3 + 2] = 0;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

export function createPolicyTorusNodes(
  options: Partial<PolicyTorusNodeOptions> = {}
): PolicyTorusNode[] {
  const config = {
    majorRadius: options.majorRadius ?? DEFAULT_POLICY_TORUS_SHAPE.majorRadius,
    tubeRadius: options.tubeRadius ?? DEFAULT_POLICY_TORUS_SHAPE.tubeRadius,
    axialSquash: options.axialSquash ?? DEFAULT_POLICY_TORUS_SHAPE.axialSquash,
    vortexTurns: options.vortexTurns ?? DEFAULT_POLICY_TORUS_SHAPE.vortexTurns,
    seed: options.seed ?? DEFAULT_POLICY_TORUS_NODES.seed,
    majorSegments: options.majorSegments ?? DEFAULT_POLICY_TORUS_NODES.majorSegments,
    minorSegments: options.minorSegments ?? DEFAULT_POLICY_TORUS_NODES.minorSegments,
    nodeJitter: options.nodeJitter ?? DEFAULT_POLICY_TORUS_NODES.nodeJitter,
    irregularity: options.irregularity ?? DEFAULT_POLICY_TORUS_NODES.irregularity,
  };
  const rng = createRng(config.seed);
  const nodes: PolicyTorusNode[] = [];

  for (let majorIndex = 0; majorIndex < config.majorSegments; majorIndex++) {
    const thetaBase = (majorIndex / config.majorSegments) * TAU;

    for (let minorIndex = 0; minorIndex < config.minorSegments; minorIndex++) {
      const uneven =
        Math.sin(thetaBase * 3.0 + minorIndex * 1.7) * config.irregularity +
        Math.sin(thetaBase * 7.0 - minorIndex * 0.9) * config.irregularity * 0.32;
      const theta =
        thetaBase +
        (rng() - 0.5) * config.nodeJitter * 0.42 +
        Math.sin(minorIndex * 2.3 + thetaBase * 1.6) * config.nodeJitter * 0.05;
      const phi =
        (minorIndex / config.minorSegments) * TAU +
        thetaBase * config.vortexTurns +
        uneven +
        (rng() - 0.5) * config.nodeJitter * 1.4;
      const density = torusDensity(theta, phi, 0.68, 7);
      const tube =
        config.tubeRadius +
        (rng() - 0.5) * config.nodeJitter * 1.25 +
        (density - 0.5) * 0.22;

      nodes.push({
        index: nodes.length,
        majorIndex,
        minorIndex,
        theta,
        phi,
        position: torusPoint(theta, phi, config.majorRadius, tube, config.axialSquash),
        phase: rng() * TAU,
        weight: THREE.MathUtils.clamp(0.55 + density * 0.5 + rng() * 0.12, 0.45, 1),
      });
    }
  }

  return nodes;
}

export function buildPolicyTorusLocalPairs(
  nodes: PolicyTorusNode[],
  options: Partial<PolicyTorusPairOptions> = {}
): PolicyTorusPair[] {
  const config = { ...DEFAULT_POLICY_TORUS_PAIRS, ...options };
  const majorSegments = Math.max(...nodes.map((node) => node.majorIndex)) + 1;
  const minorSegments = Math.max(...nodes.map((node) => node.minorIndex)) + 1;
  const pairKeys = new Set<string>();
  const pairs: PolicyTorusPair[] = [];

  for (const node of nodes) {
    const candidates = nodes
      .filter((candidate) => candidate.index !== node.index)
      .filter((candidate) =>
        isLocalTorusNeighbor(node, candidate, majorSegments, minorSegments, config)
      )
      .map((candidate) => ({
        node: candidate,
        distance: node.position.distanceTo(candidate.position),
      }))
      .filter((candidate) => candidate.distance <= config.maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, config.nearestNeighbors);

    for (const candidate of candidates) {
      const a = Math.min(node.index, candidate.node.index);
      const b = Math.max(node.index, candidate.node.index);
      const key = `${a}:${b}`;
      if (pairKeys.has(key)) continue;
      pairKeys.add(key);
      pairs.push({ start: a, end: b, distance: candidate.distance });
    }
  }

  return pairs;
}

export function createPolicyTorusNodeTexture(nodes: PolicyTorusNode[]): THREE.DataTexture {
  const width = Math.max(1, nodes.length);
  const data = new Float32Array(new ArrayBuffer(width * 4 * 4));

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    data[i * 4 + 0] = node.position.x;
    data[i * 4 + 1] = node.position.y;
    data[i * 4 + 2] = node.position.z;
    data[i * 4 + 3] = node.weight;
  }

  const texture = new THREE.DataTexture(data, width, 1, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

export type PolicyTorusWebManagerOptions = {
  nodes?: PolicyTorusNode[];
  pairs?: PolicyTorusPair[];
  nodeOptions?: Partial<PolicyTorusNodeOptions>;
  pairOptions?: Partial<PolicyTorusPairOptions>;
  palette?: Partial<PolicyTorusPalette>;
  motion?: Partial<PolicyTorusMotionKnobs>;
  maxSlots?: number;
};

export class PolicyTorusWebManager {
  readonly object3d = new THREE.Group();
  readonly nodes: PolicyTorusNode[];
  readonly pairs: PolicyTorusPair[];
  readonly lineSegments: THREE.LineSegments;
  readonly nodePoints: THREE.Points;
  readonly policyEventPoints: THREE.Points;
  readonly policyInfluenceA: THREE.Vector4[];
  readonly policyInfluenceB: THREE.Vector4[];
  readonly policyInfluenceC: THREE.Vector4[];
  readonly policyInfluenceD: THREE.Vector4[];
  readonly policyInfluenceCount = { value: 0 };

  motion: PolicyTorusMotionKnobs;
  palette: PolicyTorusPalette;

  private readonly slots: (ActiveConnection | null)[];
  private readonly linePositions: Float32Array<ArrayBuffer>;
  private readonly lineColors: Float32Array<ArrayBuffer>;
  private readonly nodePositions: Float32Array<ArrayBuffer>;
  private readonly nodeColors: Float32Array<ArrayBuffer>;
  private readonly eventPositions: Float32Array<ArrayBuffer>;
  private readonly eventAlphas: Float32Array<ArrayBuffer>;
  private readonly eventSizes: Float32Array<ArrayBuffer>;
  private readonly eventKinds: Float32Array<ArrayBuffer>;
  private readonly nodePolicyInfluences: Float32Array<ArrayBuffer>;
  private readonly nodePolicyTargets: Float32Array<ArrayBuffer>;
  private readonly lineGeometry = new THREE.BufferGeometry();
  private readonly nodeGeometry = new THREE.BufferGeometry();
  private readonly eventGeometry = new THREE.BufferGeometry();
  private readonly lineMaterial: THREE.LineBasicMaterial;
  private readonly nodeMaterial: THREE.PointsMaterial;
  private readonly eventMaterial: THREE.ShaderMaterial;
  private readonly activeNodePositions: THREE.Vector3[];
  private readonly adjacency: number[][];
  private readonly rng: () => number;
  private readonly foreground = new THREE.Color();
  private readonly background = new THREE.Color();
  private readonly rejected = new THREE.Color();
  private nextSpawn = 0;

  constructor(options: PolicyTorusWebManagerOptions = {}) {
    this.nodes = options.nodes ?? createPolicyTorusNodes(options.nodeOptions);
    this.pairs = options.pairs ?? buildPolicyTorusLocalPairs(this.nodes, options.pairOptions);
    this.motion = { ...DEFAULT_POLICY_TORUS_MOTION, ...options.motion };
    this.palette = { ...POLICY_TORUS_PALETTE, ...options.palette };
    this.foreground.set(this.palette.line);
    this.background.set(this.palette.background);
    this.rejected.set(this.palette.rejected);
    this.rng = createRng(options.nodeOptions?.seed ?? DEFAULT_POLICY_TORUS_NODES.seed);
    this.adjacency = buildPolicyAdjacency(this.nodes.length, this.pairs);

    const maxSlots = Math.max(options.maxSlots ?? 96, 3600);
    const maxPolicyEvents = 1;
    this.slots = new Array(maxSlots).fill(null);
    this.linePositions = new Float32Array(new ArrayBuffer(maxSlots * 4 * 3 * 4));
    this.lineColors = new Float32Array(new ArrayBuffer(maxSlots * 4 * 3 * 4));
    this.nodePositions = new Float32Array(new ArrayBuffer(this.nodes.length * 3 * 4));
    this.nodeColors = new Float32Array(new ArrayBuffer(this.nodes.length * 3 * 4));
    this.eventPositions = new Float32Array(new ArrayBuffer(maxPolicyEvents * 3 * 4));
    this.eventAlphas = new Float32Array(new ArrayBuffer(maxPolicyEvents * 4));
    this.eventSizes = new Float32Array(new ArrayBuffer(maxPolicyEvents * 4));
    this.eventKinds = new Float32Array(new ArrayBuffer(maxPolicyEvents * 4));
    this.nodePolicyInfluences = new Float32Array(new ArrayBuffer(this.nodes.length * 4));
    this.nodePolicyTargets = new Float32Array(new ArrayBuffer(this.nodes.length * 4));
    this.activeNodePositions = this.nodes.map((node) => node.position.clone());
    this.policyInfluenceA = Array.from(
      { length: POLICY_INFLUENCE_EVENT_LIMIT },
      () => new THREE.Vector4()
    );
    this.policyInfluenceB = Array.from(
      { length: POLICY_INFLUENCE_EVENT_LIMIT },
      () => new THREE.Vector4()
    );
    this.policyInfluenceC = Array.from(
      { length: POLICY_INFLUENCE_EVENT_LIMIT },
      () => new THREE.Vector4()
    );
    this.policyInfluenceD = Array.from(
      { length: POLICY_INFLUENCE_EVENT_LIMIT },
      () => new THREE.Vector4()
    );

    this.lineGeometry.setAttribute("position", new THREE.BufferAttribute(this.linePositions, 3));
    this.lineGeometry.setAttribute("color", new THREE.BufferAttribute(this.lineColors, 3));

    this.nodeGeometry.setAttribute("position", new THREE.BufferAttribute(this.nodePositions, 3));
    this.nodeGeometry.setAttribute("color", new THREE.BufferAttribute(this.nodeColors, 3));
    this.eventGeometry.setAttribute("position", new THREE.BufferAttribute(this.eventPositions, 3));
    this.eventGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(this.eventAlphas, 1));
    this.eventGeometry.setAttribute("aSize", new THREE.BufferAttribute(this.eventSizes, 1));
    this.eventGeometry.setAttribute("aKind", new THREE.BufferAttribute(this.eventKinds, 1));

    this.lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    this.nodeMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      transparent: true,
      opacity: this.motion.nodeOpacity,
      size: 0.135,
      sizeAttenuation: true,
      depthWrite: false,
    });
    this.eventMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uRejected: { value: this.rejected },
      },
      vertexShader: /* glsl */ `
        attribute float aAlpha;
        attribute float aSize;
        varying float vAlpha;

        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = aSize * (150.0 / max(-mvPos.z, 0.001));
          vAlpha = aAlpha;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uRejected;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;

          float radius = clamp(d / 0.5, 0.0, 1.0);
          float glow = pow(1.0 - radius, 2.05);
          float core = max(0.0, 1.0 - d / 0.24) * 0.28;
          float alpha = (glow * 0.58 + core) * vAlpha;
          gl_FragColor = vec4(uRejected, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    });

    this.lineSegments = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
    this.lineSegments.frustumCulled = false;
    this.lineSegments.renderOrder = 4;

    this.nodePoints = new THREE.Points(this.nodeGeometry, this.nodeMaterial);
    this.nodePoints.frustumCulled = false;
    this.nodePoints.renderOrder = 3;

    this.policyEventPoints = new THREE.Points(this.eventGeometry, this.eventMaterial);
    this.policyEventPoints.frustumCulled = false;
    this.policyEventPoints.renderOrder = 6;
    this.policyEventPoints.visible = false;

    this.object3d.add(this.lineSegments, this.nodePoints);
    this.writeNodeColors(1);
    this.clearLines();
    this.clearPolicyEvents();
  }

  setPalette(palette: Partial<PolicyTorusPalette>): void {
    this.palette = { ...this.palette, ...palette };
    this.foreground.set(this.palette.line);
    this.background.set(this.palette.background);
    this.rejected.set(this.palette.rejected);
    this.writeNodeColors(this.motion.buildProgress);
  }

  setMotion(motion: Partial<PolicyTorusMotionKnobs>): void {
    this.motion = { ...this.motion, ...motion };
    this.nodeMaterial.opacity = this.motion.nodeOpacity;
  }

  reset(): void {
    for (let i = 0; i < this.slots.length; i++) this.slots[i] = null;
    this.nodePolicyInfluences.fill(0);
    this.nodePolicyTargets.fill(0);
    this.nextSpawn = 0;
    this.clearLines();
    this.clearPolicyEvents();
  }

  update(time: number, deltaTime: number, motion: Partial<PolicyTorusMotionKnobs> = {}): void {
    if (Object.keys(motion).length > 0) this.setMotion(motion);

    const build = THREE.MathUtils.clamp(this.motion.buildProgress, 0, 1);
    const buildEase = THREE.MathUtils.smoothstep(build, 0, 1);
    this.object3d.rotation.y =
      Math.sin(time * this.motion.rotationSpeed * 1.8) * 0.14 * buildEase;
    this.nodeMaterial.opacity = this.motion.nodeOpacity * buildEase;

    this.updateNodePositions(time, buildEase);
    this.retireExpired(time);
    this.spawnConnections(time, buildEase);
    this.writeConnections(time, buildEase, deltaTime);
    this.updatePolicyInfluences(time, deltaTime, buildEase);
    this.writeNodeColors(buildEase);
    this.writePolicyEvents(time, buildEase);
  }

  dispose(): void {
    this.lineGeometry.dispose();
    this.nodeGeometry.dispose();
    this.eventGeometry.dispose();
    this.lineMaterial.dispose();
    this.nodeMaterial.dispose();
    this.eventMaterial.dispose();
  }

  private updateNodePositions(time: number, buildEase: number): void {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const animated = this.activeNodePositions[i];
      const radial = node.position.clone().normalize();
      const drift =
        Math.sin(time * this.motion.nodeDriftSpeed + node.phase) *
        this.motion.nodeDrift *
        node.weight *
        buildEase;
      animated.copy(node.position).addScaledVector(radial, drift);
      this.nodePositions[i * 3 + 0] = animated.x;
      this.nodePositions[i * 3 + 1] = animated.y;
      this.nodePositions[i * 3 + 2] = animated.z;
    }

    (this.nodeGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  }

  private retireExpired(time: number): void {
    for (let i = 0; i < this.slots.length; i++) {
      const connection = this.slots[i];
      if (!connection) continue;
      if (time - connection.startTime > this.connectionLifetime(connection)) this.slots[i] = null;
    }
  }

  private spawnConnections(time: number, buildEase: number): void {
    if (this.pairs.length === 0) return;
    if (this.nextSpawn === 0) this.nextSpawn = time + 0.35;

    const cap = Math.min(this.slots.length, Math.max(0, Math.floor(this.motion.maxActiveConnections)));
    const targetActive = Math.floor(cap * buildEase);
    const activeCount = this.slots.reduce((count, slot) => count + (slot ? 1 : 0), 0);
    if (activeCount >= targetActive || time < this.nextSpawn) return;

    const freeSlot = this.slots.findIndex((slot, index) => index < cap && slot === null);
    if (freeSlot < 0) return;

    const pairIndex = Math.floor(this.rng() * this.pairs.length);
    let policyKind = this.pickPolicyKind(buildEase);
    const pair = this.pairs[pairIndex];
    const blockT = 0.34 + this.rng() * 0.38;
    let alternateNodeIndex = -1;
    if (policyKind === "rerouted") {
      alternateNodeIndex = this.pickAlternateNode(pair, blockT);
      if (alternateNodeIndex < 0) policyKind = "blocked";
    }

    this.slots[freeSlot] = {
      pairIndex,
      startTime: time,
      duration: this.motion.connectionDuration * (0.82 + this.rng() * 0.36),
      seed: this.rng(),
      policyKind,
      blockT,
      alternateNodeIndex,
      policyEnergy: 0,
      notchEnergy: 0,
    };

    const rate = THREE.MathUtils.lerp(3, this.motion.spawnRate, buildEase);
    this.nextSpawn = time + 1 / Math.max(rate, 0.01);
  }

  private writeConnections(time: number, buildEase: number, deltaTime: number): void {
    const growthPortion = Math.max(0.05, this.motion.growthPortion);
    const holdPortion = Math.max(0, this.motion.holdPortion);
    const fadePortion = Math.max(0.05, this.motion.fadePortion);
    const phaseTotal = growthPortion + holdPortion + fadePortion;
    const growthEnd = growthPortion / phaseTotal;
    const holdEnd = (growthPortion + holdPortion) / phaseTotal;

    for (let i = 0; i < this.slots.length; i++) {
      const base = i * 12;
      const connection = this.slots[i];
      if (!connection) {
        this.writeStructuralLine(i, base, time, buildEase);
        continue;
      }

      const pair = this.pairs[connection.pairIndex];
      const start = this.activeNodePositions[pair.start];
      const end = this.activeNodePositions[pair.end];
      const age = (time - connection.startTime) / Math.max(connection.duration, 0.001);
      const progress = THREE.MathUtils.clamp(age, 0, 1);
      const flicker = 0.86 + Math.sin(time * 8.0 + connection.seed * TAU) * 0.08;

      if (
        connection.policyKind === "blocked" ||
        (connection.policyKind === "rerouted" && connection.alternateNodeIndex >= 0)
      ) {
        this.updateConnectionPolicyEnergy(connection, progress, buildEase, deltaTime);
        if (connection.policyKind === "blocked") {
          this.writeBlockedConnection(base, connection, start, end, progress, buildEase, flicker);
        } else {
          this.writeReroutedConnection(base, connection, start, end, progress, buildEase, flicker);
        }
        continue;
      }

      let head = 1;
      let alpha = 1;
      if (progress < growthEnd) {
        const t = progress / growthEnd;
        head = 1 - Math.pow(1 - t, 2.2);
        alpha = THREE.MathUtils.smoothstep(t, 0, 0.22);
      } else if (progress < holdEnd) {
        head = 1;
        alpha = 1;
      } else {
        const t = (progress - holdEnd) / Math.max(1 - holdEnd, 0.001);
        head = 1;
        alpha = 1 - THREE.MathUtils.smoothstep(t, 0, 1);
      }

      const visibleAlpha = alpha * this.motion.lineOpacity * buildEase * flicker;
      const headPoint = tempVec3.copy(start).lerp(end, head);
      const approvedGlow = connection.policyKind === "approved"
        ? this.policyEnvelope(connection, progress) * 0.18
        : 0;

      this.writeLineSegment(base, start, headPoint, visibleAlpha * (1 + approvedGlow));
      this.writeHiddenLine(base + 6);
    }

    (this.lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }

  private writeBlockedConnection(
    base: number,
    connection: ActiveConnection,
    start: THREE.Vector3,
    end: THREE.Vector3,
    progress: number,
    buildEase: number,
    flicker: number
  ): void {
    const timing = this.policyEnvelopeTiming(connection);
    const eventPos = tempVec3.copy(start).lerp(end, connection.blockT);
    const interceptT = THREE.MathUtils.smoothstep(progress, 0, timing.start);
    const releaseT = THREE.MathUtils.smoothstep(progress, timing.holdEnd, timing.releaseEnd);
    const head = progress < timing.start
      ? connection.blockT * interceptT
      : connection.blockT;
    const tail = connection.blockT * releaseT;
    const alphaIn = progress < timing.start
      ? THREE.MathUtils.smoothstep(interceptT, 0, 0.24)
      : 1;
    const dissolveEnvelope = 1 - releaseT * 0.96;
    const alpha = alphaIn * dissolveEnvelope * this.motion.lineOpacity * buildEase * flicker * 4.8;

    if (alpha <= 0.001 || tail >= head - 0.002) {
      this.writeHiddenLine(base);
    } else {
      const tailPoint = tempVec3b.copy(start).lerp(end, tail);
      const headPoint = progress < timing.start
        ? tempVec3c.copy(start).lerp(end, head)
        : eventPos;
      this.writeLineSegment(base, tailPoint, headPoint, alpha);
    }

    const notchEnergy = connection.notchEnergy;
    if (notchEnergy <= 0.02) {
      this.writeHiddenLine(base + 6);
      return;
    }

    const notchEndT = Math.min(connection.blockT + 0.065, 1);
    const notchEnd = tempVec3c.copy(start).lerp(end, notchEndT);
    this.writeLineSegment(
      base + 6,
      eventPos,
      notchEnd,
      notchEnergy * this.motion.lineOpacity * buildEase * flicker * 7.4
    );
  }

  private writeReroutedConnection(
    base: number,
    connection: ActiveConnection,
    start: THREE.Vector3,
    end: THREE.Vector3,
    progress: number,
    buildEase: number,
    flicker: number
  ): void {
    const envelopeTiming = this.policyEnvelopeTiming(connection);
    const eventPos = tempVec3.copy(start).lerp(end, connection.blockT);
    const interceptT = THREE.MathUtils.smoothstep(progress, 0, envelopeTiming.start);
    const head = progress < envelopeTiming.start
      ? connection.blockT * interceptT
      : connection.blockT;
    const alphaIn = progress < envelopeTiming.start
      ? THREE.MathUtils.smoothstep(interceptT, 0, 0.24)
      : 1;
    const alpha = alphaIn * this.motion.lineOpacity * buildEase * flicker * 4.4;

    const headPoint = progress < envelopeTiming.start
      ? tempVec3b.copy(start).lerp(end, head)
      : eventPos;
    this.writeLineSegment(base, start, headPoint, alpha);

    const routeAnchorIndex = this.routeAnchorNodeIndex(connection);
    if (routeAnchorIndex < 0) {
      this.writeHiddenLine(base + 6);
      return;
    }

    const routeStart = this.activeNodePositions[routeAnchorIndex];
    const routeEnd = this.activeNodePositions[connection.alternateNodeIndex];
    const routeT = THREE.MathUtils.smoothstep(
      progress,
      envelopeTiming.holdEnd,
      envelopeTiming.releaseEnd
    );
    const routeAlpha = routeT * (1 - Math.max(0, routeT - 0.78) / 0.22) * alpha * 0.9;

    if (routeAlpha <= 0.001) {
      this.writeHiddenLine(base + 6);
      return;
    }

    const routeHead = tempVec3c.copy(routeStart).lerp(routeEnd, routeT);
    this.writeLineSegment(base + 6, routeStart, routeHead, routeAlpha);
  }

  private writeStructuralLine(slotIndex: number, base: number, time: number, buildEase: number): void {
    if (buildEase <= 0.001 || this.pairs.length === 0) {
      this.writeHiddenLine(base);
      this.writeHiddenLine(base + 6);
      return;
    }

    const pair = this.pairs[(slotIndex * 37) % this.pairs.length];
    const start = this.activeNodePositions[pair.start];
    const end = this.activeNodePositions[pair.end];
    const startNode = this.nodes[pair.start];
    const endNode = this.nodes[pair.end];
    const lineWeight = (startNode.weight + endNode.weight) * 0.5;
    const shimmer =
      0.88 +
      Math.sin(time * 1.35 + startNode.phase * 0.7 + endNode.phase * 0.3) * 0.08 +
      Math.sin(time * 0.53 + slotIndex * 0.19) * 0.04;
    const alpha =
      this.motion.lineOpacity *
      buildEase *
      lineWeight *
      shimmer *
      0.62;

    this.writeLineSegment(base, start, end, alpha);
    this.writeHiddenLine(base + 6);
  }

  private writeHiddenLine(base: number): void {
    for (let k = 0; k < 6; k++) {
      this.linePositions[base + k] = 0;
    }
    this.writeLineColor(base, 0);
  }

  private writeLineSegment(
    base: number,
    start: THREE.Vector3,
    end: THREE.Vector3,
    alpha: number
  ): void {
    this.linePositions[base + 0] = start.x;
    this.linePositions[base + 1] = start.y;
    this.linePositions[base + 2] = start.z;
    this.linePositions[base + 3] = end.x;
    this.linePositions[base + 4] = end.y;
    this.linePositions[base + 5] = end.z;
    this.writeLineColor(base, alpha);
  }

  private writeLineColor(base: number, alpha: number): void {
    const color = tempColor
      .copy(this.background)
      .lerp(this.foreground, THREE.MathUtils.clamp(alpha, 0, 1));
    this.lineColors[base + 0] = color.r;
    this.lineColors[base + 1] = color.g;
    this.lineColors[base + 2] = color.b;
    this.lineColors[base + 3] = color.r;
    this.lineColors[base + 4] = color.g;
    this.lineColors[base + 5] = color.b;
  }

  private clearLines(): void {
    for (let i = 0; i < this.slots.length; i++) {
      const base = i * 12;
      this.writeHiddenLine(base);
      this.writeHiddenLine(base + 6);
    }
    (this.lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }

  private connectionLifetime(connection: ActiveConnection): number {
    if (connection.policyKind === "blocked" || connection.policyKind === "rerouted") {
      return connection.duration * (this.policyEnvelopeTiming(connection).releaseEnd + 0.08);
    }
    return connection.duration;
  }

  private pickPolicyKind(buildEase: number): PolicyConnectionKind {
    if (buildEase < 0.82) return "normal";
    const roll = this.rng();
    if (roll < 0.05) return "approved";
    if (roll < 0.24) return "blocked";
    if (roll < 0.4) return "rerouted";
    return "normal";
  }

  private pickAlternateNode(pair: PolicyTorusPair, blockT: number): number {
    const preferred = blockT < 0.52 ? pair.start : pair.end;
    const secondary = preferred === pair.start ? pair.end : pair.start;
    const eventPos = tempVec3.copy(this.activeNodePositions[pair.start]).lerp(
      this.activeNodePositions[pair.end],
      blockT
    );
    const candidates = new Set<number>([
      ...this.adjacency[preferred],
      ...this.adjacency[secondary],
    ]);
    candidates.delete(pair.start);
    candidates.delete(pair.end);

    const ranked = [...candidates]
      .map((nodeIndex) => ({
        nodeIndex,
        distance: eventPos.distanceTo(this.activeNodePositions[nodeIndex]),
      }))
      .filter((candidate) => candidate.distance <= Math.max(pair.distance * 2.8, 2.6))
      .sort((a, b) => a.distance - b.distance);

    if (ranked.length === 0) return -1;
    const shortList = ranked.slice(0, Math.min(4, ranked.length));
    return shortList[Math.floor(this.rng() * shortList.length)].nodeIndex;
  }

  private routeAnchorNodeIndex(connection: ActiveConnection): number {
    if (connection.alternateNodeIndex < 0) return -1;

    const pair = this.pairs[connection.pairIndex];
    const alternate = connection.alternateNodeIndex;
    const startAdjacent = this.adjacency[pair.start].includes(alternate);
    const endAdjacent = this.adjacency[pair.end].includes(alternate);

    if (startAdjacent && endAdjacent) return connection.blockT < 0.5 ? pair.start : pair.end;
    if (startAdjacent) return pair.start;
    if (endAdjacent) return pair.end;
    return -1;
  }

  private policyTiming(connection: ActiveConnection): {
    interceptEnd: number;
    pauseEnd: number;
    resolveEnd: number;
    routeEnd: number;
  } {
    const growthPortion = Math.max(0.05, this.motion.growthPortion);
    const holdPortion = Math.max(0, this.motion.holdPortion);
    const fadePortion = Math.max(0.05, this.motion.fadePortion);
    const phaseTotal = growthPortion + holdPortion + fadePortion;
    const growthEnd = growthPortion / phaseTotal;
    const interceptEnd = THREE.MathUtils.clamp(growthEnd * connection.blockT, 0.12, 0.42);
    const pauseEnd = Math.min(interceptEnd + 0.12, 0.62);
    return {
      interceptEnd,
      pauseEnd,
      resolveEnd: Math.min(pauseEnd + 0.3, 0.86),
      routeEnd: Math.min(pauseEnd + 0.44, 0.94),
    };
  }

  private policyEnvelopeTiming(connection: ActiveConnection): {
    start: number;
    attackEnd: number;
    holdEnd: number;
    releaseEnd: number;
  } {
    const timing = this.policyTiming(connection);
    const attackSeconds = 0.34 + fract(connection.seed * 12.137) * 0.12;
    const holdSeconds = connection.policyKind === "rerouted" ? 0.18 : 0.1;
    const releaseSeconds = 1.75 + fract(connection.seed * 37.73) * 0.65;
    const duration = Math.max(connection.duration, 0.001);
    const start = timing.interceptEnd;
    const attackEnd = start + attackSeconds / duration;
    const holdEnd = attackEnd + holdSeconds / duration;

    return {
      start,
      attackEnd,
      holdEnd,
      releaseEnd: holdEnd + releaseSeconds / duration,
    };
  }

  private policyEnvelope(connection: ActiveConnection, progress: number): number {
    if (connection.policyKind === "approved") {
      const timing = this.policyTiming(connection);
      const rise = linearRamp(progress, timing.interceptEnd - 0.08, timing.interceptEnd);
      const fall = 1 - linearRamp(progress, timing.interceptEnd + 0.08, timing.interceptEnd + 0.22);
      return THREE.MathUtils.clamp(rise * fall * 0.45, 0, 1);
    }

    const timing = this.policyEnvelopeTiming(connection);
    const appear = THREE.MathUtils.smoothstep(progress, timing.start, timing.attackEnd);
    const fade = 1 - THREE.MathUtils.smoothstep(progress, timing.holdEnd, timing.releaseEnd);
    return THREE.MathUtils.clamp(appear * fade, 0, 1);
  }

  private updateConnectionPolicyEnergy(
    connection: ActiveConnection,
    progress: number,
    buildEase: number,
    deltaTime: number
  ): void {
    const timing = this.policyEnvelopeTiming(connection);
    const targetEnergy = this.policyEnvelope(connection, progress) * buildEase;
    const releaseT = THREE.MathUtils.smoothstep(progress, timing.holdEnd, timing.releaseEnd);
    const targetNotch = connection.policyKind === "blocked"
      ? targetEnergy * (1 - releaseT)
      : 0;

    connection.policyEnergy = smoothDampedScalar(
      connection.policyEnergy,
      targetEnergy,
      deltaTime,
      5.8,
      1.75
    );
    connection.notchEnergy = smoothDampedScalar(
      connection.notchEnergy,
      targetNotch,
      deltaTime,
      6.4,
      2.2
    );
  }

  private updatePolicyInfluences(time: number, deltaTime: number, buildEase: number): void {
    this.nodePolicyTargets.fill(0);

    if (buildEase > 0.001) {
      for (const connection of this.slots) {
        if (
          !connection ||
          (connection.policyKind !== "blocked" && connection.policyKind !== "rerouted")
        ) continue;

        const pair = this.pairs[connection.pairIndex];
        const influence = connection.policyEnergy * buildEase;

        this.addNodePolicyTarget(pair.start, influence);
        this.addNodePolicyTarget(pair.end, influence);
        if (connection.policyKind === "rerouted" && connection.alternateNodeIndex >= 0) {
          this.addNodePolicyTarget(connection.alternateNodeIndex, influence);
        }
      }
    }

    const dt = Math.min(Math.max(deltaTime, 0), 0.05);
    for (let i = 0; i < this.nodePolicyInfluences.length; i++) {
      const current = this.nodePolicyInfluences[i];
      const target = this.nodePolicyTargets[i];
      this.nodePolicyInfluences[i] = smoothDampedScalar(current, target, dt, 4.8, 1.7);
    }
  }

  private addNodePolicyTarget(nodeIndex: number, influence: number): void {
    this.nodePolicyTargets[nodeIndex] = Math.max(
      this.nodePolicyTargets[nodeIndex],
      THREE.MathUtils.clamp(influence, 0, 1)
    );
  }

  private policyKindValue(kind: PolicyConnectionKind): number {
    if (kind === "approved") return 1;
    if (kind === "blocked") return 2;
    if (kind === "rerouted") return 3;
    return 0;
  }

  private writePolicyEvents(time: number, buildEase: number): void {
    let influenceSlot = 0;
    this.object3d.updateMatrixWorld();

    for (let slotIndex = 0; slotIndex < this.slots.length; slotIndex++) {
      const connection = this.slots[slotIndex];
      if (
        !connection ||
        connection.policyKind === "normal" ||
        connection.policyKind === "approved"
      ) continue;

      const envelope = connection.policyEnergy;

      const pair = this.pairs[connection.pairIndex];
      const start = this.activeNodePositions[pair.start];
      const end = this.activeNodePositions[pair.end];
      const eventPos = tempVec3.copy(start).lerp(end, connection.blockT);
      const kindValue = this.policyKindValue(connection.policyKind);
      const startInfluence = this.nodePolicyInfluences[pair.start];
      const endInfluence = this.nodePolicyInfluences[pair.end];
      const alternateInfluence = connection.alternateNodeIndex >= 0
        ? this.nodePolicyInfluences[connection.alternateNodeIndex]
        : 0;
      const edgeInfluence = Math.max(envelope, startInfluence, endInfluence, alternateInfluence);

      if (influenceSlot < POLICY_INFLUENCE_EVENT_LIMIT && connection.policyKind !== "approved") {
        const worldStart = tempVec3b.copy(start).applyMatrix4(this.object3d.matrixWorld);
        const worldEnd = tempVec3c.copy(end).applyMatrix4(this.object3d.matrixWorld);
        const worldEvent = tempVec3d.copy(eventPos).applyMatrix4(this.object3d.matrixWorld);
        const alternate =
          connection.alternateNodeIndex >= 0
            ? tempVec3e
                .copy(this.activeNodePositions[connection.alternateNodeIndex])
                .applyMatrix4(this.object3d.matrixWorld)
            : tempVec3e.set(0, 0, 0);

        this.policyInfluenceA[influenceSlot].set(worldEvent.x, worldEvent.y, worldEvent.z, edgeInfluence);
        this.policyInfluenceB[influenceSlot].set(worldStart.x, worldStart.y, worldStart.z, kindValue);
        this.policyInfluenceC[influenceSlot].set(worldEnd.x, worldEnd.y, worldEnd.z, connection.blockT);
        this.policyInfluenceD[influenceSlot].set(
          alternate.x,
          alternate.y,
          alternate.z,
          connection.alternateNodeIndex >= 0 ? 1 : 0
        );
        influenceSlot++;
      }
    }

    for (let i = 0; i < this.eventAlphas.length; i++) {
      this.eventPositions[i * 3 + 0] = 0;
      this.eventPositions[i * 3 + 1] = 0;
      this.eventPositions[i * 3 + 2] = 0;
      this.eventAlphas[i] = 0;
      this.eventSizes[i] = 0;
      this.eventKinds[i] = 0;
    }
    for (let i = influenceSlot; i < POLICY_INFLUENCE_EVENT_LIMIT; i++) {
      this.policyInfluenceA[i].set(0, 0, 0, 0);
      this.policyInfluenceB[i].set(0, 0, 0, 0);
      this.policyInfluenceC[i].set(0, 0, 0, 0);
      this.policyInfluenceD[i].set(0, 0, 0, 0);
    }
    this.policyInfluenceCount.value = influenceSlot;

    (this.eventGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.eventGeometry.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    (this.eventGeometry.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
    (this.eventGeometry.attributes.aKind as THREE.BufferAttribute).needsUpdate = true;
  }

  private clearPolicyEvents(): void {
    for (let i = 0; i < this.eventAlphas.length; i++) {
      this.eventPositions[i * 3 + 0] = 0;
      this.eventPositions[i * 3 + 1] = 0;
      this.eventPositions[i * 3 + 2] = 0;
      this.eventAlphas[i] = 0;
      this.eventSizes[i] = 0;
      this.eventKinds[i] = 0;
    }
    for (let i = 0; i < POLICY_INFLUENCE_EVENT_LIMIT; i++) {
      this.policyInfluenceA[i].set(0, 0, 0, 0);
      this.policyInfluenceB[i].set(0, 0, 0, 0);
      this.policyInfluenceC[i].set(0, 0, 0, 0);
      this.policyInfluenceD[i].set(0, 0, 0, 0);
    }
    this.policyInfluenceCount.value = 0;
    (this.eventGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.eventGeometry.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    (this.eventGeometry.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
    (this.eventGeometry.attributes.aKind as THREE.BufferAttribute).needsUpdate = true;
  }

  private writeNodeColors(buildEase: number): void {
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeAlpha = this.motion.nodeOpacity * buildEase * this.nodes[i].weight;
      const color = tempColor
        .copy(this.background)
        .lerp(this.foreground, nodeAlpha);
      this.nodeColors[i * 3 + 0] = color.r;
      this.nodeColors[i * 3 + 1] = color.g;
      this.nodeColors[i * 3 + 2] = color.b;
    }
    (this.nodeGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }
}

const tempVec3 = new THREE.Vector3();
const tempVec3b = new THREE.Vector3();
const tempVec3c = new THREE.Vector3();
const tempVec3d = new THREE.Vector3();
const tempVec3e = new THREE.Vector3();
const tempColor = new THREE.Color();

function torusPoint(
  theta: number,
  phi: number,
  majorRadius: number,
  tubeRadius: number,
  axialSquash: number
): THREE.Vector3 {
  const ringRadius = majorRadius + tubeRadius * Math.cos(phi);
  return new THREE.Vector3(
    ringRadius * Math.cos(theta),
    ringRadius * Math.sin(theta),
    tubeRadius * Math.sin(phi) * axialSquash
  );
}

function fract(value: number): number {
  return value - Math.floor(value);
}

function linearRamp(value: number, start: number, end: number): number {
  return THREE.MathUtils.clamp((value - start) / Math.max(end - start, 0.001), 0, 1);
}

function smoothDampedScalar(
  current: number,
  target: number,
  deltaTime: number,
  attackStiffness: number,
  releaseStiffness: number
): number {
  const stiffness = target > current ? attackStiffness : releaseStiffness;
  const t = 1 - Math.exp(-stiffness * Math.min(Math.max(deltaTime, 0), 0.05));
  return current + (target - current) * t;
}

function sampleDenseTorusAngles(
  rng: () => number,
  contrast: number,
  waves: number,
  vortexTurns: number
): { theta: number; phi: number } {
  for (let attempt = 0; attempt < 10; attempt++) {
    const theta = rng() * TAU;
    const phi = rng() * TAU + theta * vortexTurns;
    const acceptance = torusDensity(theta, phi, contrast, waves);
    if (rng() <= acceptance) return { theta, phi };
  }
  const theta = rng() * TAU;
  return { theta, phi: rng() * TAU + theta * vortexTurns };
}

function torusDensity(theta: number, phi: number, contrast: number, waves: number): number {
  const woven =
    0.5 +
    0.5 *
      Math.sin(theta * waves + Math.sin(phi * 1.7) * 1.2 + Math.cos(theta * 0.67) * 1.1);
  const cellular =
    0.5 +
    0.5 *
      Math.sin(theta * 3.3 - phi * 2.15 + Math.sin(theta * 1.21 + phi * 0.81) * 1.8);
  const crescent = 0.5 + 0.5 * Math.sin(theta * 1.05 + phi * 0.58 - 0.9);
  const braided = 0.5 + 0.5 * Math.cos(theta * 9.0 + phi * 3.0);
  const density = woven * 0.34 + cellular * 0.32 + crescent * 0.2 + braided * 0.14;
  const ridgedDensity = Math.pow(THREE.MathUtils.clamp(density, 0, 1), 1.85);
  return THREE.MathUtils.clamp(THREE.MathUtils.lerp(1 - contrast, 1, ridgedDensity), 0.015, 1);
}

function gaussian(rng: () => number): number {
  const u = Math.max(rng(), 1e-7);
  const v = Math.max(rng(), 1e-7);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

function createRng(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPolicyAdjacency(nodeCount: number, pairs: PolicyTorusPair[]): number[][] {
  const adjacency = Array.from({ length: nodeCount }, () => [] as number[]);
  for (const pair of pairs) {
    adjacency[pair.start].push(pair.end);
    adjacency[pair.end].push(pair.start);
  }
  return adjacency;
}

function isLocalTorusNeighbor(
  a: PolicyTorusNode,
  b: PolicyTorusNode,
  majorSegments: number,
  minorSegments: number,
  options: PolicyTorusPairOptions
): boolean {
  const majorStep = cyclicStepDistance(a.majorIndex, b.majorIndex, majorSegments);
  const minorStep = cyclicStepDistance(a.minorIndex, b.minorIndex, minorSegments);
  return majorStep <= options.maxMajorStep && minorStep <= options.maxMinorStep;
}

function cyclicStepDistance(a: number, b: number, modulo: number): number {
  const direct = Math.abs(a - b);
  return Math.min(direct, modulo - direct);
}
