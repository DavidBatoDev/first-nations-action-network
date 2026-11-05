import { AnimatedWave, makeBubbles } from "@/components/AnimatedWave";

type OpeningWaveProps = {
  /** Match the hero or logo band above the divider. */
  fromColor?: string;
  /** Match the content section below the divider. */
  toColor?: string;
  /**
   * Let the section below show through under the crest. The divider fills only
   * above the crest (in `fromColor`) and leaves the rest transparent, so the
   * next section has to extend up beneath this strip, e.g. a photo band.
   */
  overImage?: boolean;
};

const bubbles = makeBubbles(22);

/** The opening divider shared by page heroes and the homepage logo band. */
export default function OpeningWave({
  fromColor = "var(--eggshell)",
  toColor = "var(--paper)",
  overImage = false,
}: OpeningWaveProps) {
  return (
    <div
      className="opening-wave"
      aria-hidden="true"
      style={{ background: overImage ? "transparent" : fromColor }}
    >
      <AnimatedWave
        background={overImage ? undefined : fromColor}
        fillUp={overImage}
        primaryColor={overImage ? fromColor : toColor}
        secondaryColor={toColor}
        bubbleColor={fromColor}
        bubbles={bubbles}
        bubbleCenterGap={0.045}
      />
    </div>
  );
}
