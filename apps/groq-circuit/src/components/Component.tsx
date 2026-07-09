import type { Component as ComponentType } from '../lib/types';

interface ComponentProps {
  component: ComponentType;
}

export function Component({ component }: ComponentProps) {
  const commonProps = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    fill: "none",
  };

  switch (component.shape) {
    case 'circle':
      return (
        <circle
          cx={component.x + component.width / 2}
          cy={component.y + component.height / 2}
          r={component.width / 2}
          {...commonProps}
        />
      );
    case 'round-rect':
      return (
        <rect
          x={component.x}
          y={component.y}
          width={component.width}
          height={component.height}
          rx={component.width / 4}
          {...commonProps}
        />
      );
    default:
      return (
        <rect
          x={component.x}
          y={component.y}
          width={component.width}
          height={component.height}
          rx={0}
          {...commonProps}
        />
      );
  }
}
