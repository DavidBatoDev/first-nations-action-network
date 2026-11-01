"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { useScrollWave } from "../../hooks/useScrollWave";
import {
  bubbleRadius,
  buildWavePath,
  buildWaveRibbon,
  getBubbleX,
  getBubbleY,
  type WaveAnimationState,
} from "./waveMath";
import {
  DEFAULT_WAVE_PROPS,
  WAVE_BUBBLES,
  WAVE_TUNABLES,
  type WaveBubble,
} from "./waveConfig";
import WaveLayer from "./WaveLayer";
import WaveBubbles from "./WaveBubbles";
import "../../styles/wave.css";

export interface AnimatedWaveProps {
  /** Divider strip height in px (SVG user unit = 1px: circles never oval). */
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  bubbleColor?: string;
  /** Band behind the crest. The wave reads as white wherever this shows. */
  background?: string;
  /** Crest position as a fraction of height; overrides the shared default. */
  baselineFraction?: number;
  /** Fill above the crest instead of below, inverting the divider. */
  fillUp?: boolean;
  /** Extra undulation on the crest. 0 = a plain sine; ~0.5 reads designed. */
  harmonic?: number;
  /** Half-width of the empty middle of the circle row, as a fraction. */
  bubbleCenterGap?: number;
  /** How far the circle row slides with scroll. 0 pins it to the screen. */
  bubbleTravel?: number;
  /**
   * Radius of the row's widest circle, in SVG px. Larger on the right so the
   * row grows toward that edge, matching the reference divider.
   */
  bubbleRightGain?: number;
  /** Circles to draw; defaults to the logo row's set. */
  bubbles?: WaveBubble[];
  /** Radians of phase per px scrolled. */
  scrollSensitivity?: number;
  className?: string;
}

/**
 * Cream-to-white divider under the logo band. A light ribbon parallels the
 * crest, white fills below it, and plain sand bubbles hang in that white
 * with their tops tucked into the beige edge.
 * Scroll translates the whole pattern — no autoplay loop. Paths and bubble
 * transforms are written straight to the DOM.
 */
export default function AnimatedWave({
  height = DEFAULT_WAVE_PROPS.height,
  primaryColor = DEFAULT_WAVE_PROPS.primaryColor,
  secondaryColor = DEFAULT_WAVE_PROPS.secondaryColor,
  bubbleColor = DEFAULT_WAVE_PROPS.bubbleColor,
  background,
  baselineFraction,
  fillUp = false,
  harmonic = 0,
  bubbleCenterGap = 0.055,
  bubbleTravel = 1,
  bubbleRightGain = 1,
  bubbles = WAVE_BUBBLES,
  scrollSensitivity = DEFAULT_WAVE_PROPS.scrollSensitivity,
  className = "",
}: AnimatedWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const primaryPathRef = useRef<SVGPathElement>(null);
  const secondaryPathRef = useRef<SVGPathElement>(null);
  const bubbleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const sizeRef = useRef({ width: 0, height });
  const stateRef = useRef<WaveAnimationState>({
    scrollProgress: 0,
    scrollVelocity: 0,
    phase: WAVE_TUNABLES.restPhase,
    amplitude: WAVE_TUNABLES.amplitudeBase,
    direction: 1,
  });

  /** Translate the shared state into path `d` attributes and bubble transforms. */
  const draw = useCallback(() => {
    const { width, height: h } = sizeRef.current;
    if (!primaryPathRef.current || !secondaryPathRef.current || width < 8) return;
    const s = stateRef.current;
    const wavePhase = s.phase * WAVE_TUNABLES.waveSpeed;

    const baseline =
      h * (baselineFraction ?? WAVE_TUNABLES.baseYFraction);
    primaryPathRef.current.setAttribute(
      "d",
      buildWavePath(width, h, wavePhase, s.amplitude, baseline, fillUp, harmonic),
    );
    secondaryPathRef.current.setAttribute(
      "d",
      buildWaveRibbon(
        width,
        wavePhase,
        s.amplitude,
        baseline,
        WAVE_TUNABLES.ribbonTop,
        WAVE_TUNABLES.ribbonBottom,
        harmonic,
      ),
    );

    const scale = width < WAVE_TUNABLES.mobileBreakpoint
      ? WAVE_TUNABLES.mobileScale
      : 1;

    bubbles.forEach((b, i) => {
      const circle = bubbleRefs.current[i];
      if (!circle) return;
      const x = getBubbleX(b.slot, width, wavePhase, bubbleTravel);
      const size = bubbleRadius(
        b.size * scale,
        x,
        width,
        bubbleCenterGap,
        bubbleRightGain,
      );
      const placed = { ...b, size, offset: b.offset * scale };
      const y = getBubbleY(
        x,
        wavePhase,
        s.amplitude,
        baseline,
        placed,
        width,
        harmonic,
      );
      circle.setAttribute("cx", String(round2(x)));
      circle.setAttribute("cy", String(round2(y)));
      circle.setAttribute("r", String(round2(size)));
    });
  }, []);

  const onFrame = useCallback((s: WaveAnimationState) => {
    stateRef.current = s;
    draw();
  }, [draw]);

  useScrollWave(
    {
      container: containerRef,
      sensitivity: scrollSensitivity,
      baseAmplitude: WAVE_TUNABLES.amplitudeBase,
      maxAmplitude: WAVE_TUNABLES.amplitudeMax,
      amplitudeGain: WAVE_TUNABLES.amplitudeGain,
      smoothing: WAVE_TUNABLES.smoothing,
      restPhase: WAVE_TUNABLES.restPhase,
    },
    onFrame,
  );

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const applySize = () => {
      const box = container.getBoundingClientRect();
      const h = height;
      sizeRef.current = { width: box.width, height: h };
      svg.setAttribute("viewBox", `0 0 ${box.width} ${h}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      draw();
    };

    applySize();
    const ro = new ResizeObserver(applySize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw, height]);

  return (
    <div
      ref={containerRef}
      className={`animated-wave ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg ref={svgRef} width="100%" height={height} focusable="false">
        {background ? (
          <rect x={0} y={0} width="100%" height="100%" fill={background} />
        ) : null}
        <WaveLayer pathRef={primaryPathRef} fill={primaryColor} />
        <WaveLayer pathRef={secondaryPathRef} fill={secondaryColor} />
        <WaveBubbles
          groupRefs={bubbleRefs}
          bubbles={bubbles}
          color={bubbleColor}
        />
      </svg>
    </div>
  );
}

const round2 = (n: number) => Math.round(n * 100) / 100;
