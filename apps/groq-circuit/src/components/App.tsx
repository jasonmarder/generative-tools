import { useMemo } from 'react';
import { Leva, useControls } from 'leva';
import { CircuitGenerator } from '../lib/CircuitGenerator';
import { TopDownCircuitGenerator } from '../lib/TopDownCircuitGenerator';
import { CircuitCanvas } from './CircuitCanvas';

const PANEL_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif';

const panelTheme = {
  colors: {
    elevation1: 'rgba(20,20,20,0.96)',
    elevation2: 'rgba(20,20,20,0.96)',
    elevation3: 'rgba(255,255,255,0.075)',
    accent1: '#70b0fa',
    accent2: '#70b0fa',
    accent3: '#70b0fa',
    highlight1: 'rgba(255,255,255,0.92)',
    highlight2: 'rgba(255,255,255,0.64)',
    highlight3: '#ffffff',
  },
  radii: {
    xs: '4px',
    sm: '4px',
    lg: '8px',
  },
  fonts: {
    mono: PANEL_FONT,
    sans: PANEL_FONT,
  },
  fontSizes: {
    root: '12px',
  },
  sizes: {
    rootWidth: '312px',
    rowHeight: '34px',
    titleBarHeight: '36px',
  },
};

export function App() {
  const config = useControls({
    mode: { value: 'isometric', options: ['isometric', 'topDown'] as const },
    width: { value: 1600, min: 400, max: 2400, step: 100 },
    height: { value: 900, min: 300, max: 1600, step: 100 },
    traceCount: { value: 260, min: 10, max: 700, step: 10 },
    componentCount: { value: 12, min: 0, max: 50, step: 1 },
    viaCount: { value: 20, min: 0, max: 100, step: 1 },
    strokeWidth: {
      value: [1, 2],
      min: 0.5,
      max: 5,
      step: 0.1,
    },
    complexity: { value: 0.75, min: 0, max: 1, step: 0.05 },
    density: { value: 0.75, min: 0, max: 1, step: 0.05 },
    overlap: { value: 0.35, min: 0, max: 1, step: 0.05 },
    gridSize: { value: 15, min: 5, max: 50, step: 1 },
    seed: { value: 1234, min: 1, max: 10000, step: 1 },
    showComponents: { value: true },
  });

  const pattern = useMemo(() => {
    const generatorConfig = {
      width: config.width,
      height: config.height,
      gridSize: config.gridSize,
      traceCount: config.traceCount,
      componentCount: config.componentCount,
      viaCount: config.viaCount,
      strokeWidth: config.strokeWidth as [number, number],
      complexity: config.complexity,
      density: config.density,
      overlap: config.overlap,
      seed: config.seed,
      showComponents: config.showComponents,
    };

    const generator =
      config.mode === 'topDown'
        ? new TopDownCircuitGenerator(generatorConfig)
        : new CircuitGenerator(generatorConfig);

    return generator.generate();
  }, [config]);

  return (
    <div className="circuit-workspace">
      <Leva theme={panelTheme} titleBar={{ title: 'Circuit Generator' }} />
      <CircuitCanvas
        pattern={pattern}
        width={config.width}
        height={config.height}
        showComponents={config.showComponents}
      />
    </div>
  );
}
