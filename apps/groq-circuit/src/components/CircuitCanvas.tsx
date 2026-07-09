import { useRef } from 'react';
import type { CircuitPattern } from '../lib/types';
import { Component } from './Component';
import { Trace } from './Trace';
import { Via } from './Via';

interface CircuitCanvasProps {
  pattern: CircuitPattern;
  width: number;
  height: number;
  showComponents?: boolean;
  backgroundColor?: string;
  onExport?: () => void;
}

export function CircuitCanvas({
  pattern,
  width,
  height,
  showComponents = true,
  backgroundColor,
}: CircuitCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleExport = () => {
    if (!svgRef.current) return;

    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `circuit-pattern-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="circuit-stage">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={backgroundColor ? { backgroundColor } : undefined}
        color="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Render components first (behind traces) */}
        {showComponents && pattern.components.map((component) => (
          <Component key={component.id} component={component} />
        ))}

        {/* Render traces */}
        {pattern.traces.map((trace) => (
          <Trace key={trace.id} trace={trace} />
        ))}

        {/* Render vias on top */}
        {pattern.vias.map((via) => (
          <Via key={via.id} via={via} />
        ))}
      </svg>

      <button
        onClick={handleExport}
        className="circuit-export"
      >
        Download SVG
      </button>
    </div>
  );
}
