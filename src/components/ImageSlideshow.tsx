"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = {
  src: string;
  alt: string;
};

type ImageSlideshowProps = {
  slides: Slide[];
  /** Accessible name describing this collection. */
  label?: string;
  /** Milliseconds each frame holds before advancing. */
  interval?: number;
  /** Corner radius in px. */
  rounded?: number;
  /** Responsive width hint handed to next/image. */
  sizes?: string;
  /** Set false to stop advancing on its own; the bullets still work. */
  auto?: boolean;
};

type SlideRequest = {
  id: number;
  target: number;
  direction: number;
};

/**
 * Decode a chosen photograph before sliding it over the current one.
 * Only the initial, adjacent and explicitly requested images are loaded.
 */
export default function ImageSlideshow({
  slides,
  label = "Photos from our learning programs",
  interval = 5200,
  rounded = 18,
  sizes = "(max-width: 900px) calc(100vw - 48px), 50vw",
  auto = true,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [prepared, setPrepared] = useState(() => new Set([0]));
  const [request, setRequest] = useState<SlideRequest | null>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const decodesRef = useRef(new Map<number, Promise<boolean>>());
  const requestIdRef = useRef(0);
  const count = slides.length;

  const decodeImage = useCallback((target: number) => {
    const existing = decodesRef.current.get(target);
    if (existing) return existing;
    const image = imagesRef.current[target];
    if (!image) return Promise.resolve(false);
    // Keep failures cached too: a later selection must not retry a failed image.
    const decoded = image.decode().then(
      () => image.naturalWidth > 0,
      () => false,
    );
    decodesRef.current.set(target, decoded);
    return decoded;
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (count < 2) return;
      const target = ((next % count) + count) % count;
      const id = ++requestIdRef.current;
      if (target === index) {
        setRequest(null);
        return;
      }
      setPrepared((current) =>
        current.has(target) ? current : new Set(current).add(target),
      );
      // Replacing this request invalidates any older decode completion.
      setRequest({ id, target, direction: next > index ? 1 : -1 });
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

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(preference.matches);
    onChange();
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);

  // Prepare just the next neighbour, rather than loading the whole collection.
  useEffect(() => {
    if (count < 2) return;
    const next = (index + 1) % count;
    setPrepared((current) =>
      current.has(next) ? current : new Set(current).add(next),
    );
  }, [count, index]);

  useEffect(() => {
    prepared.forEach((target) => {
      void decodeImage(target);
    });
  }, [decodeImage, prepared]);

  useEffect(() => {
    if (reducedMotion && leaving !== null) {
      setLeaving(null);
      return;
    }
    // A requested image can load during a handoff, but cannot interrupt it.
    if (!request || leaving !== null || reducedMotion === null) return;
    let cancelled = false;
    void decodeImage(request.target).then((decoded) => {
      if (cancelled || request.id !== requestIdRef.current) return;
      setRequest(null);
      if (!decoded) return;
      setDir(request.direction);
      if (!reducedMotion) setLeaving(index);
      setIndex(request.target);
    });
    return () => {
      cancelled = true;
    };
  }, [decodeImage, index, leaving, reducedMotion, request]);

  const running =
    auto &&
    count > 1 &&
    visible &&
    !hovered &&
    !focused &&
    !pageHidden &&
    reducedMotion === false &&
    leaving === null &&
    request === null;

  // Start a fresh hold after a handoff or a pause, never during image loading.
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
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        const handing = i === leaving && !active;
        return (
          <div
            key={slide.src}
            className={`slideshow-frame${active ? " is-active" : ""}${
              active && leaving !== null ? " is-entering" : ""
            }${handing ? " is-leaving" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            onAnimationEnd={(event) => {
              if (active && leaving !== null && event.target === event.currentTarget) {
                setLeaving(null);
              }
            }}
          >
            {prepared.has(i) ? (
              <Image
                ref={(image) => {
                  imagesRef.current[i] = image;
                }}
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                loading="eager"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            ) : null}
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
