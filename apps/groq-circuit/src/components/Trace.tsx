import type { Trace as TraceType } from '../lib/types';
import { pointsToPath } from '../lib/utils';

interface TraceProps {
  trace: TraceType;
}

export function Trace({ trace }: TraceProps) {
  const pathData = pointsToPath(trace.path);

  return (
    <path
      d={pathData}
      stroke="currentColor"
      strokeWidth={trace.strokeWidth}
      fill="none"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
  );
}
