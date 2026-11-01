import { type WaveBubble } from "./waveConfig";

/**
 * Flat sand circles along the crest. One fill, no highlight — the same
 * plain discs as the reference. Each circle's centre is written straight
 * to the DOM every frame through `groupRefs`.
 */
export default function WaveBubbles({
  groupRefs,
  bubbles,
  color,
}: {
  groupRefs: {
    current: (SVGCircleElement | null)[];
  };
  bubbles: WaveBubble[];
  color: string;
}) {
  return (
    <>
      {bubbles.map((b, i) => (
        <circle
          key={i}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
          r={b.size}
          fill={color}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
