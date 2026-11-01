/**
 * Pure math for the scroll-driven cream wave divider. No DOM access here —
 * every function takes numbers and returns numbers/strings so it is cheap
 * to call at 60fps and easy to keep in sync between the wave layers and
 * the bubbles riding the same surface.
 */
import { WAVE_TUNABLES, type WaveBubble } from "./waveConfig";

/** Shared animation state driven by useScrollWave. */
export interface WaveAnimationState {
  /** 0..1 page-level scroll progress. */
  scrollProgress: number;
  /** Raw scroll delta of the last frame, px. */
  scrollVelocity: number;
  /** Smoothed phase (cumulative scroll displacement × sensitivity). */
  phase: number;
  /** Smoothed amplitude, clamped to [amplitudeBase, amplitudeMax]. */
  amplitude: number;
  /** Sign of the last scroll delta: 1 = down, -1 = up. */
  direction: 1 | -1;
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** Frame-rate independent-ish smoothing (lerp toward target by factor). */
export const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

const fmt = (n: number) => Math.round(n * 100) / 100;

/** Sample x across the strip, always including the right edge. */
function sampleXs(width: number): number[] {
  const step = WAVE_TUNABLES.sampleStep;
  const xs: number[] = [];
  for (let x = 0; x < width; x += step) xs.push(x);
  xs.push(width);
  return xs;
}

/** Smooth cubic through the samples (Catmull-Rom), so the crest has no corners. */
function smoothCurve(points: Array<[number, number]>, move: boolean): string {
  if (points.length === 0) return "";
  const [x0, y0] = points[0];
  let d = move ? `M${fmt(x0)} ${fmt(y0)}` : "";
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${fmt(c1x)} ${fmt(c1y)} ${fmt(c2x)} ${fmt(c2y)} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return d;
}

/**
 * One long sine, so the crest is a single smooth bend instead of extra bumps.
 * `harmonic` adds a second, gentler undulation on top — 0 keeps this a plain
 * sine; higher values give the divider a more designed, scalloped rhythm.
 */
function waveShape(u: number, harmonic = 0): number {
  const t = u - Math.floor(u);
  const base = Math.sin(t * Math.PI * 2 + 0.45) * 0.85;
  if (harmonic === 0) return base;
  const detail = Math.sin(t * Math.PI * 4 - 0.9) * 0.5;
  return base + detail * harmonic;
}

/**
 * The shared crest. One asymmetric period spans the strip, and `phase`
 * (radians) slides that period to the right as the page scrolls.
 */
/** 0 on the left, easing to 1 at the right edge. Smootherstep so the lean has no corner. */
function rightDepth(screenT: number): number {
  const t = Math.min(1, Math.max(0, (screenT - 0.06) / 0.94));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function getWaveY(
  x: number,
  phase: number,
  amplitude: number,
  baseline: number,
  width: number,
  harmonic = 0,
): number {
  const period = Math.max(width, 1);
  const travel = (phase / (Math.PI * 2)) * period;
  let u = (x - travel) / period;
  u -= Math.floor(u);
  const screenT = Math.min(1, Math.max(0, x / period));
  // Traveling ripple, plus a lean that keeps dropping toward the right edge.
  return (
    baseline + waveShape(u, harmonic) * amplitude + rightDepth(screenT) * 62
  );
}

/**
 * Size follows the circle's place on the screen, not its index in the row.
 *
 * That is what produces the intended read: always large at both edges,
 * tapering to nothing through the middle, so the centre always looks empty
 * no matter where the row has travelled. `centerGap` is the half-width of
 * that empty middle as a fraction of the strip.
 */
export function bubbleRadius(
  base: number,
  x: number,
  width: number,
  centerGap = 0.055,
  rightGain = 1.7,
): number {
  if (base <= 0 || width <= 0) return 0;
  const t = clamp(x / width, 0, 1);
  const gap = clamp(centerGap, 0.01, 0.45);
  if (t > 0.5 - gap && t < 0.5 + gap) return 0;

  // Both halves taper on the same cosine so the row reads symmetrically.
  // The right half is scaled up, so its outer circles end larger than the
  // left's while the dot count on each side stays equal.
  if (t <= 0.5) {
    const u = t / (0.5 - gap);
    return base * Math.cos(u * Math.PI * 0.5);
  }

  const u = (t - 0.5 - gap) / (0.5 - gap);
  return base * rightGain * Math.cos((1 - u) * Math.PI * 0.5);
}

/**
 * Circle hangs in the white under the crest. Its top sits `bubbleDrop`
 * px below the line.
 */
export function getBubbleY(
  x: number,
  phase: number,
  amplitude: number,
  baseline: number,
  bubble: WaveBubble,
  width: number,
  harmonic = 0,
): number {
  // Discs always hang BELOW the crest, in the next section's colour, so the
  // wave reads as the previous section spilling droplets into the one below.
  return (
    getWaveY(x, phase, amplitude, baseline, width, harmonic) +
    bubble.size +
    WAVE_TUNABLES.bubbleDrop +
    bubble.offset
  );
}

/**
 * Place a bubble.
 *
 * With `travel = 0` the row is anchored to the screen, so the symmetric
 * spacing — tight at both ends, open through the middle — stays put while
 * the crest slides underneath. That is what the Join divider uses.
 *
 * With `travel > 0` the row also slides along the crest (the logo divider),
 * wrapping past both edges so a circle leaves the frame before it reappears.
 */
export function getBubbleX(
  slot: number,
  width: number,
  phase = 0,
  travel = 0,
): number {
  if (travel === 0) return slot * width;
  const pad = 64;
  const span = width + pad * 2;
  let u = slot + (phase / (Math.PI * 2)) * travel;
  u -= Math.floor(u);
  return u * span - pad;
}

/**
 * White paper below the crest, from the sine down to the bottom of the
 * strip. Above the curve stays transparent so the cream section shows.
 * Pass `fillUp` to close the shape to the top instead, which inverts the
 * divider: the fill sits above the crest and the section colour below it.
 */
export function buildWavePath(
  width: number,
  height: number,
  phase: number,
  amplitude: number,
  baseline: number,
  fillUp = false,
  harmonic = 0,
): string {
  const pts: Array<[number, number]> = sampleXs(width).map((x) => [
    x,
    getWaveY(x, phase, amplitude, baseline, width, harmonic),
  ]);
  let d = smoothCurve(pts, true);
  const edge = fillUp ? 0 : height;
  d += ` L${fmt(width)} ${fmt(edge)} L0 ${fmt(edge)} Z`;
  return d;
}

/**
 * Thin ribbon parallel to the crest (same phase, same amplitude, shifted
 * up). The cream ground between this ribbon and the white fill is the
 * beige band in the reference.
 */
export function buildWaveRibbon(
  width: number,
  phase: number,
  amplitude: number,
  baseline: number,
  offsetTop: number,
  offsetBottom: number,
  harmonic = 0,
): string {
  const xs = sampleXs(width);
  const top = xs.map(
    (x) =>
      [
        x,
        getWaveY(x, phase, amplitude, baseline + offsetTop, width, harmonic),
      ] as [number, number],
  );
  const bot = xs
    .map(
      (x) =>
        [
          x,
          getWaveY(
            x,
            phase,
            amplitude,
            baseline + offsetBottom,
            width,
            harmonic,
          ),
        ] as [number, number],
    )
    .reverse();
  const [bx, by] = bot[0];
  return `${smoothCurve(top, true)} L${fmt(bx)} ${fmt(by)}${smoothCurve(bot, false)} Z`;
}
