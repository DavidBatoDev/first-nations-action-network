"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = {
  src: string;
  alt: string;
};

type ImageSlideshowProps = {
  slides: Slide[];
  /** Milliseconds each frame holds before advancing. */
  interval?: number;
  /** Corner radius in px. */
  rounded?: number;
  /** Responsive width hint handed to next/image. */
  sizes?: string;
  /** Set false to stop advancing on its own; the bullets still work. */
  auto?: boolean;
};

/** Must match --slide-dur in globals.css. */
const PUSH_MS = 620;

/**
 * Interactive photo strip: click a bullet, or use the arrow keys, to choose a
 * frame. Autoplay runs unless the reader is interacting with it.
 *
 * The transition is a parallax push. The incoming frame slides in from the side
 * the reader is travelling toward while the outgoing frame drifts out the
 * opposite way at about a third of the distance, so the two separate in depth
 * rather than one simply erasing the other. Both move, which is what sells the
 * sense of sequence; a cross-fade holds the picture still and reads as passive.
 *
 * Two details keep it from feeling like a template:
 *
 *  - Direction is tracked, so stepping back reverses the motion. A gallery that
 *    always pushes one way feels broken the moment you go backwards.
 *  - The photography drifts very slowly outward for the whole time a frame is
 *    held (see `slide-drift`), so a still image is never quite static.
 *
 * The push is a transform on the frame and the drift is a transform on the
 * <img>, which keeps them independent and lets both run on the compositor.
 * See the `.slideshow-frame` rules in globals.css, including the
 * reduced-motion path, which swaps frames with no motion at all.
 */
export default function ImageSlideshow({
  slides,
  interval = 5200,
  rounded = 18,
  sizes = "(max-width: 900px) calc(100vw - 48px), 50vw",
  auto = true,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);
  /** +1 travelling forward, -1 travelling back. Drives the push direction. */
  const [dir, setDir] = useState(1);
  /** The frame currently pushing out from under `index`. */
  const [leaving, setLeaving] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [held, setHeld] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count < 2) return;
      // Wrap in both directions so it loops at either end.
      const target = ((next % count) + count) % count;
      if (target === index) return;
      /*
       * Direction comes from the requested index, not the wrapped one, so
       * advancing past the last frame still reads as travelling forward.
       * Deliberately not done inside a setIndex updater: React may call an
       * updater twice, and marking the outgoing frame is a side effect.
       */
      setDir(next > index ? 1 : -1);
      setLeaving(index);
      setIndex(target);
    },
    [count, index],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onChange = () => setPageHidden(document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  // Release the outgoing frame once its push has finished.
  useEffect(() => {
    if (leaving === null) return;
    const id = window.setTimeout(() => setLeaving(null), PUSH_MS);
    return () => window.clearTimeout(id);
  }, [leaving]);

  const running = auto && count > 1 && visible && !held && !pageHidden;

  // Re-armed whenever the frame changes, so choosing by hand also resets the
  // countdown instead of triggering an instant advance.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => goTo(index + 1), interval);
    return () => window.clearTimeout(id);
  }, [goTo, index, interval, running]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (count < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`img-slot rounded slideshow ${
        dir < 0 ? "is-backward" : "is-forward"
      }`}
      style={{ borderRadius: rounded }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos from our learning programs"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        const handing = i === leaving && !active;
        return (
          <div
            key={slide.src}
            className={`slideshow-frame${active ? " is-active" : ""}${
              handing ? " is-leaving" : ""
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={sizes}
              loading={i === 0 ? "eager" : "lazy"}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        );
      })}

      {count > 1 ? (
        <>
          <div className="slideshow-dots">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.src}
                  type="button"
                  className={`slideshow-dot${active ? " is-on" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Show photo ${i + 1}: ${slide.alt}`}
                  aria-current={active ? "true" : undefined}
                >
                  <span className="slideshow-dot-mark" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {/* Tells screen readers which frame is showing without moving focus. */}
          <p className="slideshow-status" aria-live="polite">
            {`Photo ${index + 1} of ${count}: ${slides[index]?.alt ?? ""}`}
          </p>
        </>
      ) : null}
    </div>
  );
}
