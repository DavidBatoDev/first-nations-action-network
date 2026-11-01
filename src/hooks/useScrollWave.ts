"use client";

import { useEffect, type RefObject } from "react";
import {
  clamp,
  lerp,
  type WaveAnimationState,
} from "../components/AnimatedWave/waveMath";

export interface UseScrollWaveOptions {
  /** Container the divider lives in; also gates the IntersectionObserver. */
  container: RefObject<HTMLElement | null>;
  sensitivity: number;
  baseAmplitude: number;
  maxAmplitude: number;
  amplitudeGain: number;
  smoothing: number;
  /** Phase the wave holds before any scrolling. */
  restPhase?: number;
}

/**
 * Scroll-driven wave driver. No infinite loop: phase accumulates from
 * scroll displacement only, amplitude chases scroll velocity, both decay
 * smoothly toward rest once scrolling stops — the shape simply
 * freezes at its current pose.
 *
 * Performance contract:
 * - passive scroll listener mutates hot refs only; no React re-renders.
 * - one rAF loop that starts on scroll and stops itself when settled and
 *   the section is offscreen or the tab is hidden.
 * - per frame it only calls onFrame(snapshot); DOM writes happen in the
 *   caller (setAttribute, no state churn).
 * - prefers-reduced-motion: the loop never starts, the listener just fires
 *   onFrame once with an at-rest state (static composition).
 */
export function useScrollWave(
  options: UseScrollWaveOptions,
  onFrame: (state: WaveAnimationState) => void,
) {
  useEffect(() => {
    const {
      container,
      sensitivity,
      baseAmplitude,
      maxAmplitude,
      amplitudeGain,
      smoothing,
      restPhase = 0,
    } = options;

    const state: WaveAnimationState = {
      scrollProgress: 0,
      scrollVelocity: 0,
      phase: restPhase,
      amplitude: baseAmplitude,
      direction: 1,
    };
    // Hot mutable values, never re-rendered through.
    const hot = {
      scrollY: typeof window !== "undefined" ? window.scrollY : 0,
      phaseTarget: restPhase,
      amplitudeTarget: baseAmplitude,
      inView: true,
      rafId: 0,
      running: false,
      reduced: false,
    };

    const reducedMq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    hot.reduced = reducedMq?.matches ?? false;

    const emit = () => onFrame({ ...state });

    /** One frame: integrate scroll, damp phase/amplitude, draw, settle. */
    const frame = () => {
      hot.rafId = requestAnimationFrame(frame);
      const y = window.scrollY;
      const dy = y - hot.scrollY;
      hot.scrollY = y;

      state.scrollVelocity = dy;
      if (dy !== 0) {
        state.direction = dy > 0 ? 1 : -1;
        hot.phaseTarget += dy * sensitivity;
        // Amplitude reacts to a single frame of scrolling, not to a
        // catch-up delta accumulated while the strip was offscreen.
        const step = clamp(Math.abs(dy), 0, 48);
        hot.amplitudeTarget = clamp(
          baseAmplitude + step * amplitudeGain,
          baseAmplitude,
          maxAmplitude,
        );
      } else {
        // Scroll stopped: amplitude eases back to rest.
        hot.amplitudeTarget = baseAmplitude;
      }

      // One frame covering a long jump (the strip was offscreen) snaps.
      // Ordinary scrolling eases so the crest glides with the page.
      if (Math.abs(dy) > 160) {
        state.phase = hot.phaseTarget;
      } else {
        state.phase = lerp(state.phase, hot.phaseTarget, smoothing);
      }
      state.amplitude = lerp(state.amplitude, hot.amplitudeTarget, smoothing);

      const docMax = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      state.scrollProgress = clamp(y / docMax, 0, 1);

      emit();

      // Settle: nothing new from scroll and both values caught up.
      const settled =
        dy === 0 &&
        Math.abs(hot.phaseTarget - state.phase) < 0.002 &&
        Math.abs(hot.amplitudeTarget - state.amplitude) < 0.01;
      if (settled || document.hidden || !hot.inView) {
        hot.running = false;
        cancelAnimationFrame(hot.rafId);
      }
    };

    const ensureLoop = () => {
      if (hot.running || hot.reduced || document.hidden || !hot.inView) return;
      hot.running = true;
      hot.rafId = requestAnimationFrame(frame);
    };

    const target = container.current;
    if (!target) return;

    const onScroll = () => {
      // Leave hot.scrollY for the frame to sample. Writing it here zeroes
      // the delta and the wave never moves.
      ensureLoop();
    };

    const io = new IntersectionObserver(([entry]) => {
      hot.inView = entry.isIntersecting;
      if (hot.inView) ensureLoop();
      else if (hot.running) {
        hot.running = false;
        cancelAnimationFrame(hot.rafId);
      }
    });
    io.observe(target);

    const onReducedChange = () => {
      hot.reduced = reducedMq?.matches ?? false;
      if (hot.reduced && hot.running) {
        hot.running = false;
        cancelAnimationFrame(hot.rafId);
        // Park exactly on the current pose; rerender the static frame.
        emit();
      }
    };
    reducedMq?.addEventListener?.("change", onReducedChange);

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial paint: static pose (also the reduced-motion composition).
    emit();

    return () => {
      window.removeEventListener("scroll", onScroll);
      reducedMq?.removeEventListener?.("change", onReducedChange);
      io.disconnect();
      hot.running = false;
      cancelAnimationFrame(hot.rafId);
    };
    // onFrame is expected to be a stable callback from the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
