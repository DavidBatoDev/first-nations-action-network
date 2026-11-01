/**
 * Tunables for the scroll-driven cream wave divider. All animation math
 * reads from here so the look can be adjusted in one place.
 *
 * The strip sits on the cream logo band. Above the crest the section
 * colour shows through; a thin light ribbon parallels the crest; white
 * fills everything below it so the next section arrives as a wave.
 * Bubbles hang on that crest. Scroll translates the whole pattern.
 */
export const WAVE_TUNABLES = {
  /** Height of the whole divider strip in px (matches the prop default). */
  height: 280,

  /**
   * Crest the white fill follows, as a fraction of height.
   * Kept low enough that the largest bubbles still fit above the peak.
   */
  baseYFraction: 0.32,

  /**
   * Light ribbon above the crest, in px. Negative is up.
   * The gap between ribbonBottom and the crest is the beige band.
   */
  ribbonTop: -24,
  ribbonBottom: -13,

  /** Pose at rest: the reference profile, plateau on the left. */
  restPhase: 0,

  /** Amplitude of the crest. Deep enough that the rise and dip read clearly. */
  amplitudeBase: 32,
  amplitudeMax: 42,
  /** px of scroll in one frame adds this much amplitude. */
  amplitudeGain: 0.55,

  /** Lerp factor per frame toward phase and amplitude. */
  smoothing: 0.22,

  /** Radians of phase per px scrolled. ~800px of scroll travels one wavelength. */
  scrollSensitivity: 0.008,

  /**
   * Shared scroll rate for the crest and the circles, so they travel
   * together. Lower than 1 keeps the motion slower.
   */
  waveSpeed: 0.35,

  /**
   * How far below the crest the top of each circle sits, in px.
   * The discs hang in the white under the line.
   */
  bubbleDrop: 14,

  /** Path sampling step in px. Finer steps keep the cubic crest smooth. */
  sampleStep: 6,

  /** Below this container width, bubble sizes and nudges shrink by mobileScale. */
  mobileBreakpoint: 520,
  mobileScale: 0.72,
} as const;

/**
 * Circles spaced along the full crest. `size` is the shared "big" radius;
 * the drawn radius comes from where the circle sits, so neighbours stay
 * comparable: big, smaller, gone through the middle, then small, big,
 * and largest at the right edge.
 */
export interface WaveBubble {
  slot: number;
  size: number;
  offset: number;
}

/**
 * Circles around the crest. `count` matches the logo divider by default;
 * pass a larger number for a denser row.
 *
 * `edgeBias` redistributes the spacing without changing the count:
 *   1    → evenly spaced (the logo divider's row)
 *   < 1  → bunched toward both ends and spread apart through the middle,
 *          which is the "compressed edges, open centre" rhythm the Join
 *          divider uses.
 */
export function makeBubbles(count = 10, edgeBias = 1): WaveBubble[] {
  // Slots run symmetrically from just inside the left edge to just inside the
  // right, so the row always covers both ends evenly. The outermost slot is
  // half a step in from each edge, mirroring exactly.
  const step = 1 / count;
  return Array.from({ length: count }, (_, i) => {
    const even = step * (i + 0.5);
    if (edgeBias === 1) {
      return {
        slot: even,
        size: 17,
        offset: (i % 2 === 0 ? -1 : 1) * 1.2,
      };
    }
    // Distance from the centre, 0..1, bent so mid-row circles drift outward.
    // Mirror around 0.5 so the two halves are exact reflections.
    const d = Math.abs(even - 0.5) * 2;
    const bent = Math.pow(d, edgeBias);
    const slot = 0.5 + Math.sign(even - 0.5) * (bent / 2);
    return {
      slot,
      size: 17,
      offset: (i % 2 === 0 ? -1 : 1) * 1.2,
    };
  });
}

export const WAVE_BUBBLES: WaveBubble[] = makeBubbles();

/** Prop-level defaults wired through AnimatedWave.tsx. */
export const DEFAULT_WAVE_PROPS = {
  height: WAVE_TUNABLES.height,
  /** White paper that fills below the crest. */
  primaryColor: "#ffffff",
  /** Light ribbon paralleling the crest, on the cream ground. */
  secondaryColor: "#f7f3ea",
  /** Flat sand, the same plain fill as the reference circles. */
  bubbleColor: "#e6d7bc",
  scrollSensitivity: WAVE_TUNABLES.scrollSensitivity,
} as const;
