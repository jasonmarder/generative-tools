import { useMemo, useRef, type CSSProperties, type PointerEvent } from 'react';
import type { GeneratedBurst, LineCap, Point } from '../core/types';
import { pointsToAttribute } from '../lib/svg';

interface DragState {
  pointerId: number;
  startPoint: Point;
  startValue: Point;
}

export interface BurstCanvasProps {
  burst: GeneratedBurst;
  className?: string;
  onOriginChange?: (center: Point) => void;
}

const pointerToSvgPoint = (svg: SVGSVGElement, event: PointerEvent<SVGElement>): Point => {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;

  const matrix = svg.getScreenCTM();

  if (!matrix) {
    return { x: event.clientX, y: event.clientY };
  }

  const transformed = point.matrixTransform(matrix.inverse());
  return { x: transformed.x, y: transformed.y };
};

const clampPoint = (point: Point, width: number, height: number): Point => ({
  x: Math.min(Math.max(point.x, 0), width),
  y: Math.min(Math.max(point.y, 0), height),
});

export default function BurstCanvas({
  burst,
  className,
  onOriginChange,
}: BurstCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const { config, layers, viewBox } = burst;
  const centerPoint = centerToPoint(config.center, viewBox.width, viewBox.height);
  const clipId = useMemo(
    () => `burst-preview-clip-${config.seed.replace(/[^a-zA-Z0-9_-]/g, '-') || 'default'}`,
    [config.seed],
  );
  const rayBlendStyle = { mixBlendMode: config.blendMode as CSSProperties['mixBlendMode'] };
  const lineStrokeCap = strokeLinecapForLineCap(config.geometry.lineCap);

  const beginDrag = (event: PointerEvent<SVGElement>, startValue: Point) => {
    const svg = svgRef.current;

    if (!svg) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startPoint: pointerToSvgPoint(svg, event),
      startValue,
    };
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const drag = dragRef.current;

    if (!svg || !drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const currentPoint = pointerToSvgPoint(svg, event);
    const delta = {
      x: currentPoint.x - drag.startPoint.x,
      y: currentPoint.y - drag.startPoint.y,
    };

    const nextCenter = clampPoint(
      {
        x: drag.startValue.x + delta.x,
        y: drag.startValue.y + delta.y,
      },
      viewBox.width,
      viewBox.height,
    );
    onOriginChange?.(pointToCenter(nextCenter, viewBox.width, viewBox.height));
  };

  const endDrag = (event: PointerEvent<SVGSVGElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  };

  return (
    <svg
      ref={svgRef}
      className={className}
      width={config.canvas.width}
      height={config.canvas.height}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      role="img"
      aria-label="Generated burst artwork"
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={viewBox.width} height={viewBox.height} />
        </clipPath>
      </defs>

      <rect
        className="burst-background"
        x="0"
        y="0"
        width={viewBox.width}
        height={viewBox.height}
        fill={config.canvas.background}
      />

      <g className="burst-artboard" clipPath={`url(#${clipId})`} style={{ isolation: 'isolate' }}>
        <g className="burst-composition">
          {layers.map((layer) => (
            <g key={layer.id} data-layer-id={layer.id}>
              {layer.rays.map((ray) =>
                ray.primitive === 'line' ? (
                  <line
                    key={ray.id}
                    data-ray-id={ray.id}
                    x1={ray.start.x}
                    y1={ray.start.y}
                    x2={ray.end.x}
                    y2={ray.end.y}
                    stroke={ray.color}
                    strokeWidth={ray.width}
                    strokeLinecap={lineStrokeCap}
                    fill="none"
                    opacity={ray.opacity}
                    vectorEffect="non-scaling-stroke"
                    style={rayBlendStyle}
                  />
                ) : (
                  <polygon
                    key={ray.id}
                    data-ray-id={ray.id}
                    points={pointsToAttribute(ray.points)}
                    fill={ray.color}
                    stroke="none"
                    opacity={ray.opacity}
                    vectorEffect="non-scaling-stroke"
                    style={rayBlendStyle}
                  />
                ),
              )}
            </g>
          ))}
        </g>

      </g>

      {onOriginChange ? (
        <g
          className="burst-origin-handle"
          data-preview-only="true"
          transform={`translate(${centerPoint.x} ${centerPoint.y})`}
          onPointerDown={(event) => beginDrag(event, centerPoint)}
        >
          <circle r="9" fill="transparent" />
          <circle r="3.5" fill="#111111" />
          <circle r="8" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      ) : null}
    </svg>
  );
}

function centerToPoint(center: Point, width: number, height: number): Point {
  return {
    x: Math.abs(center.x) <= 1 ? center.x * width : center.x,
    y: Math.abs(center.y) <= 1 ? center.y * height : center.y,
  };
}

function pointToCenter(point: Point, width: number, height: number): Point {
  return {
    x: point.x / width,
    y: point.y / height,
  };
}

function strokeLinecapForLineCap(lineCap: LineCap | undefined) {
  return lineCap === 'flat' ? 'butt' : 'round';
}
