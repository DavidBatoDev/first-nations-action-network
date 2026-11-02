import { AnimatedWave, makeBubbles } from "@/components/AnimatedWave";

type SectionWaveProps = {
  /** Colour of the section above the divider. */
  fromColor?: string;
  /** Colour of the dark CTA or footer below the divider. */
  toColor?: string;
};

const bubbles = makeBubbles(22);

/** The shared light-to-dark transition before closing CTAs and footers. */
export default function SectionWave({
  fromColor = "var(--paper)",
  toColor = "var(--ink)",
}: SectionWaveProps) {
  return (
    <div className="join-wave-band" aria-hidden="true" style={{ background: toColor }}>
      <AnimatedWave
        height={280}
        background={toColor}
        primaryColor={fromColor}
        secondaryColor={toColor}
        bubbleColor={fromColor}
        bubbles={bubbles}
        baselineFraction={0.4}
        fillUp
        harmonic={0.5}
        bubbleCenterGap={0.045}
      />
    </div>
  );
}
