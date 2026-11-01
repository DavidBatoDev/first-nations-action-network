import type { RefObject } from "react";

/**
 * One filled wave surface. The parent owns the path element via `pathRef`
 * and updates its `d` attribute directly each animation frame — no React
 * state, no reconciliation on the hot path.
 */
export default function WaveLayer({
  pathRef,
  fill,
}: {
  pathRef: RefObject<SVGPathElement | null>;
  fill: string;
}) {
  return (
    <path
      ref={pathRef}
      fill={fill}
      d=""
      aria-hidden="true"
    />
  );
}
