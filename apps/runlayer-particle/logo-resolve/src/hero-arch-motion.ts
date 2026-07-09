// Architectural hero — border-beam mechanics, ported to per-spoke laser beams.
// Each beam is a color band traveling one spoke tip → hub (foreground →
// background). A JS scheduler launches individual beams — blue-noise distributed
// (non-contiguous, evenly spread) and organically staggered — so timing is
// per-spoke, not one shared sweep. Two variants:
//   • sparse — maintain ~N in flight; elegant, well-separated.
//   • dense  — launch every `stagger`; concurrency floats into overlapping waves.
// Colors come from the --beam-c-* CSS vars (live via the GUI); the scheduler
// animates each gradient stop's offset + opacity to move the band.

const BURST_URL = "/hero-line-burst.svg";
const SVG_NS = "http://www.w3.org/2000/svg";

// Burst hub ≈ viewBox centre (measured from the path geometry).
const HUB_X = 1006.5;
const HUB_Y = 1008.5;

// Band shape, as [offset-from-head, opacity] pairs. Offset runs 0 = hub → 1 = tip;
// the hot head leads toward the hub (smaller offset), warm tail toward the tip.
const STOP_PLAN: ReadonlyArray<readonly [number, number]> = [
  [-0.16, 0], // deep, fade-in ahead of the head
  [-0.08, 1], // hot head
  [0.0, 0.92], // core
  [0.09, 0.55], // deep tail
  [0.18, 0], // deep, fade-out behind the tail
];
const HEAD_FROM = 1.18; // band centre enters just past the tip
const HEAD_TO = -0.18; // …and exits just past the hub
const HEAD_SPAN = HEAD_FROM - HEAD_TO;

export type BurstVariant = "sparse" | "dense";

// Live config — bound to the GUI ("Line burst" folder).
export const burstConfig = {
  stagger: 0.1, // seconds between beam launches
  beams: 9, // sparse: concurrency target; both: blue-noise spread granularity
  travel: 1, // seconds, per-beam tip → hub
  jitter: 0.2, // ±fraction applied to launch spacing + per-beam travel
  ease: 4.5, // ease-out exponent: 1 = linear, 3 = cubic (fast launch → settle at hub)
  fadeIn: 0.25, // fraction of life spent ramping opacity up (quick birth)
  fadeOut: 0.35, // fraction of life spent dissolving (long death into the hub)
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Beam = { index: number; start: number; travelMs: number };

let host: HTMLElement | null = null;
let paths: SVGPathElement[] = [];
let stopSets: SVGStopElement[][] = [];
let angles: number[] = []; // radians, per spoke (for blue-noise distribution)
let active: Beam[] = [];
const activeSet = new Set<number>();
let variant: BurstVariant = "sparse";
let running = false;
let visible = true;
let rafId = 0;
let lastLaunch = 0;
let nextGap = 0;
let loaded = false;
let loadPromise: Promise<boolean> | null = null;
let observer: IntersectionObserver | null = null;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const jittered = (base: number) => base * (1 + rand(-burstConfig.jitter, burstConfig.jitter));
const smoothstep = (x: number) => x * x * (3 - 2 * x);

// Brightness over a beam's life: quick smooth ramp up, hold, long smooth dissolve.
function lifeEnvelope(t: number): number {
  const { fadeIn, fadeOut } = burstConfig;
  if (fadeIn > 0 && t < fadeIn) return smoothstep(t / fadeIn);
  if (fadeOut > 0 && t > 1 - fadeOut) return smoothstep((1 - t) / fadeOut);
  return 1;
}

function makeSvg(markup: string, className: string): SVGSVGElement {
  const holder = document.createElement("div");
  holder.innerHTML = markup;
  const svg = holder.querySelector("svg") as SVGSVGElement;
  svg.setAttribute("class", className);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  // Figma Layer_1 (254:3310) artwork bounds — crop the 2150 export padding.
  svg.setAttribute("viewBox", "0 0 2017.11 2017.11");
  svg.setAttribute("aria-hidden", "true");
  return svg;
}

// One linearGradient per spoke, axis hub → tip, with classed stops (hue from CSS).
function buildGradients(svg: SVGSVGElement) {
  const defs = document.createElementNS(SVG_NS, "defs");
  svg.prepend(defs);

  paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
  stopSets = [];
  angles = [];

  const stopClass = ["beam-stop-deep", "beam-stop-hot", "beam-stop-core", "beam-stop-deep", "beam-stop-deep"];

  paths.forEach((path, i) => {
    const len = path.getTotalLength();
    const a = path.getPointAtLength(0);
    const b = path.getPointAtLength(len);
    const hub = path.getPointAtLength(len / 2);
    const tip = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

    const grad = document.createElementNS(SVG_NS, "linearGradient");
    grad.id = `beam-grad-${i}`;
    grad.setAttribute("gradientUnits", "userSpaceOnUse");
    grad.setAttribute("x1", String(hub.x));
    grad.setAttribute("y1", String(hub.y));
    grad.setAttribute("x2", String(tip.x));
    grad.setAttribute("y2", String(tip.y));

    const stops = stopClass.map((cls) => {
      const stop = document.createElementNS(SVG_NS, "stop");
      stop.setAttribute("class", cls);
      stop.setAttribute("offset", "0");
      stop.setAttribute("stop-opacity", "0");
      grad.appendChild(stop);
      return stop;
    });

    defs.appendChild(grad);
    path.setAttribute("fill", "none"); // attribute controls fill; no CSS rule overrides

    stopSets.push(stops);
    angles.push(Math.atan2(tip.y - HUB_Y, tip.x - HUB_X));
  });
}

// Move one beam's band to head position `p`, scaled by the life envelope `env`.
function applyBeam(index: number, p: number, env: number) {
  const stops = stopSets[index];
  for (let k = 0; k < STOP_PLAN.length; k++) {
    const [doff, op] = STOP_PLAN[k];
    stops[k].setAttribute("offset", clamp01(p + doff).toFixed(4));
    stops[k].setAttribute("stop-opacity", (op * env).toFixed(4));
  }
}

// Blue-noise pick: a random spoke whose angular distance to every active beam
// clears a minimum separation; if none qualify (dense), the one furthest from all.
function pickSpoke(): number {
  const n = paths.length;
  if (activeSet.size >= n) return -1;
  if (active.length === 0) return Math.floor(Math.random() * n);

  const minSep = ((0.6 * 360) / Math.max(2, burstConfig.beams)) * (Math.PI / 180);
  const start = Math.floor(Math.random() * n);
  let firstValid = -1;
  let best = -1;
  let bestDist = -1;

  for (let s = 0; s < n; s++) {
    const i = (s + start) % n;
    if (activeSet.has(i)) continue;
    let d = Math.PI;
    for (const beam of active) {
      let diff = Math.abs(angles[i] - angles[beam.index]);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;
      if (diff < d) d = diff;
    }
    if (firstValid < 0 && d >= minSep) firstValid = i;
    if (d > bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return firstValid >= 0 ? firstValid : best;
}

function launch(now: number) {
  const i = pickSpoke();
  if (i < 0) return;
  active.push({ index: i, start: now, travelMs: jittered(burstConfig.travel) * 1000 });
  activeSet.add(i);
  paths[i].setAttribute("fill", `url(#beam-grad-${i})`);
  applyBeam(i, HEAD_FROM, 0); // born dark; the envelope ramps it in
  lastLaunch = now;
  // sparse: never launches faster than travel/beams; dense: every stagger.
  const base =
    variant === "sparse"
      ? Math.max(burstConfig.stagger, burstConfig.travel / Math.max(1, burstConfig.beams))
      : burstConfig.stagger;
  nextGap = jittered(base) * 1000;
}

function retire(beam: Beam) {
  paths[beam.index].setAttribute("fill", "none");
  activeSet.delete(beam.index);
}

function frame(now: number) {
  if (!running) {
    rafId = 0;
    return;
  }
  rafId = requestAnimationFrame(frame);
  if (!visible) return;

  for (let k = active.length - 1; k >= 0; k--) {
    const beam = active[k];
    const t = (now - beam.start) / beam.travelMs;
    if (t >= 1) {
      retire(beam);
      active.splice(k, 1);
      continue;
    }
    // ease-out: fast launch off the tip, decelerating into the hub (sells depth).
    const te = 1 - Math.pow(1 - t, burstConfig.ease);
    applyBeam(beam.index, HEAD_FROM - te * HEAD_SPAN, lifeEnvelope(t));
  }

  if (now - lastLaunch >= nextGap) {
    if (variant === "dense") launch(now);
    else if (active.length < burstConfig.beams) launch(now);
    // sparse at cap: hold — a launch fires as soon as a slot frees and the gap elapses.
  }
}

function clearActive() {
  for (const beam of active) paths[beam.index]?.setAttribute("fill", "none");
  active = [];
  activeSet.clear();
}

async function loadBurst(container: HTMLElement): Promise<boolean> {
  const response = await fetch(BURST_URL);
  if (!response.ok) return false;
  const markup = await response.text();

  const base = makeSvg(markup, "hero-arch-burst-base");
  const beam = makeSvg(markup, "hero-arch-burst-beam");
  container.append(base, beam);

  buildGradients(beam);
  return true;
}

export async function initArchMotion(v: BurstVariant = "sparse"): Promise<void> {
  host = document.querySelector<HTMLElement>(".hero-arch-burst");
  if (!host) return;
  variant = v;

  if (!loaded) {
    // Share one load across concurrent inits (e.g. switching tabs before the
    // first burst fetch resolves) so the SVG layers aren't appended twice.
    if (!loadPromise) loadPromise = loadBurst(host);
    try {
      loaded = await loadPromise;
    } catch {
      loadPromise = null;
      return;
    }
    if (!loaded) {
      loadPromise = null;
      return;
    }
  }

  clearActive();
  lastLaunch = 0;
  nextGap = 0;

  if (prefersReducedMotion) {
    running = false;
    return;
  }

  running = true;
  visible = true;

  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) visible = entry.isIntersecting;
    },
    { rootMargin: "128px" }
  );
  observer.observe(host);

  if (!rafId) rafId = requestAnimationFrame(frame);
}

export function stopArchMotion(): void {
  running = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  observer?.disconnect();
  observer = null;
  clearActive();
}
