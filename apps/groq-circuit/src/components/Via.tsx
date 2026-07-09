import type { Via as ViaType } from '../lib/types';

interface ViaProps {
  via: ViaType;
}

export function Via({ via }: ViaProps) {
  return (
    <circle
      cx={via.x}
      cy={via.y}
      r={via.radius}
      stroke="currentColor"
      strokeWidth={1}
      fill="none"
    />
  );
}
