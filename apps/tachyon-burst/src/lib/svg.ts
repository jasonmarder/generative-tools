import type { BlendMode, GeneratedBurst, GeneratedRay, LineCap, Point } from '../core/types';

const SVG_NS = 'http://www.w3.org/2000/svg';

export interface SvgRenderOptions {
  title?: string;
}

const formatNumber = (value: number) => {
  if (!Number.isFinite(value)) {
    return '0';
  }

  return Number(value.toFixed(3)).toString();
};

const escapeAttribute = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const escapeText = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const pointsToAttribute = (points: Point[]) =>
  points.map((point) => `${formatNumber(point.x)},${formatNumber(point.y)}`).join(' ');

export const rayToSvgMarkup = (ray: GeneratedRay, blendMode: BlendMode, lineCap: LineCap | undefined = 'round') => {
  const common = [
    `data-ray-id="${escapeAttribute(ray.id)}"`,
    `opacity="${formatNumber(ray.opacity)}"`,
    `style="mix-blend-mode:${escapeAttribute(blendMode)}"`,
  ].join(' ');

  if (ray.primitive === 'line') {
    return `<line ${common} fill="none" stroke="${escapeAttribute(ray.color)}" stroke-width="${formatNumber(
      ray.width,
    )}" stroke-linecap="${strokeLinecapForLineCap(lineCap)}" vector-effect="non-scaling-stroke" x1="${formatNumber(
      ray.start.x,
    )}" y1="${formatNumber(ray.start.y)}" x2="${formatNumber(ray.end.x)}" y2="${formatNumber(ray.end.y)}" />`;
  }

  return `<polygon ${common} fill="${escapeAttribute(ray.color)}" points="${pointsToAttribute(ray.points)}" />`;
};

export const burstToSvgMarkup = (burst: GeneratedBurst, options: SvgRenderOptions = {}) => {
  const { config, layers, viewBox } = burst;
  const width = formatNumber(config.canvas.width || viewBox.width);
  const height = formatNumber(config.canvas.height || viewBox.height);
  const viewWidth = formatNumber(viewBox.width);
  const viewHeight = formatNumber(viewBox.height);
  const title = options.title ? `<title>${escapeText(options.title)}</title>` : '';

  // Flatten every layer's rays into a single group so each shape imports as an
  // individually selectable vector (with its own blend mode) in design tools.
  // No clip-path and no nested layer groups — that scaffolding is preview-only
  // and causes importers to flatten the artwork into one shape.
  //
  // The group keeps `isolation:isolate` so blended shapes composite against each
  // other over a transparent backdrop (matching the live preview) instead of
  // multiplying directly against the background — without it, e.g. a pink shape
  // over a yellow background turns orange on export.
  const shapes = layers
    .flatMap((layer) => layer.rays)
    .map((ray) => rayToSvgMarkup(ray, config.blendMode, config.geometry.lineCap))
    .join('');

  return [
    `<svg xmlns="${SVG_NS}" width="${width}" height="${height}" viewBox="0 0 ${viewWidth} ${viewHeight}" role="img">`,
    title,
    `<rect class="burst-background" x="0" y="0" width="${viewWidth}" height="${viewHeight}" fill="${escapeAttribute(
      config.canvas.background,
    )}" />`,
    '<g class="burst" style="isolation:isolate">',
    shapes,
    '</g>',
    '</svg>',
  ].join('');
};

export const serializeSvgElement = (svg: SVGSVGElement) => {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.querySelectorAll('[data-preview-only="true"]').forEach((node) => node.remove());

  clone.setAttribute('xmlns', SVG_NS);

  return new XMLSerializer().serializeToString(clone);
};

function strokeLinecapForLineCap(lineCap: LineCap | undefined) {
  return lineCap === 'flat' ? 'butt' : 'round';
}
