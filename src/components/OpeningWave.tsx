import { AnimatedWave, makeBubbles } from "@/components/AnimatedWave";

type OpeningWaveProps = {
  /** Match the hero or logo band above the divider. */
  fromColor?: string;
  /** Match the content section below the divider. */
  toColor?: string;
};

const bubbles = makeBubbles(22);

/** The opening divider shared by page heroes and the homepage logo band. */
export default function OpeningWave({
  fromColor = "var(--eggshell)",
  toColor = "var(--paper)",
}: OpeningWaveProps) {
  return (
    <div className="opening-wave" aria-hidden="true" style={{ background: fromColor }}>
      <AnimatedWave
        background={fromColor}
        primaryColor={toColor}
        secondaryColor={toColor}
        bubbleColor={fromColor}
        bubbles={bubbles}
        bubbleCenterGap={0.045}
      />
    </div>
  );
}
