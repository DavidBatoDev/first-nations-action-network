"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Partner = { name: string; file: string; url: string | null };

const partners: Partner[] = [
  { name: "Faira Aboriginal Corporation", file: "/assets/logos/faira.png", url: "https://www.faira.org.au/" },
  { name: "First Nations Allies", file: "/assets/logos/first-nations-allies.png", url: "https://www.facebook.com/FirstNationsAlliesBrisbane/" },
  { name: "Orange Together", file: "/assets/logos/orange-together.png", url: "https://orangetogether.org.au/" },
  { name: "Sunshine Coast Reconciliation Group", file: "/assets/logos/sunshine-coast.png", url: "https://www.scrgi.org.au/" },
  { name: "Unley Allies", file: "/assets/logos/unley-allies.png", url: "https://unleyallies.org/" },
  { name: "Voice from the Heart Alliance", file: "/assets/logos/voice-from-the-heart.png", url: "https://voicefromtheheartalliance.com/" },
  { name: "YACHATDAC", file: "/assets/logos/yachatdac.png", url: "https://yachatdac.com.au/" },
  { name: "Noosa First Nations Allies", file: "/assets/logos/noosa.png", url: "https://noosaallies.org.au/" },
  { name: "Wynnum First Nations Allies", file: "/assets/logos/wynnum.png", url: null },
];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** The auto-advancing partner logo marquee, ported from the draft. */
export default function LogoCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<((dir: 1 | -1) => void) | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(".logo-item"),
    );
    const vp = track.parentElement;
    if (!vp || items.length === 0) return;

    const N = partners.length;
    const PAUSE = 2000;
    const itemW = () => items[0].getBoundingClientRect().width || 248;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let idx = 0;
    let timer: number | undefined;
    let hoverPaused = false;
    let inViewport = true;
    let documentHidden = document.hidden;
    let rafId = 0;

    const isPaused = () =>
      hoverPaused || !inViewport || documentHidden || reducedMotion.matches;

    // Colour the logo nearest the centre only while the carousel is visible.
    const centre = () => {
      if (!inViewport || documentHidden) {
        rafId = 0;
        return;
      }
      const c = vp.getBoundingClientRect();
      const mid = c.left + c.width / 2;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      items.forEach((it) => {
        const r = it.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = it;
        }
      });
      items.forEach((it) => it.classList.toggle("is-center", it === best));
      rafId = requestAnimationFrame(centre);
    };

    const startCentre = () => {
      if (!rafId && inViewport && !documentHidden) {
        rafId = requestAnimationFrame(centre);
      }
    };

    const advance = () => {
      if (isPaused()) return;
      idx++;
      track.style.transition = "transform .9s cubic-bezier(.45,.05,.25,1)";
      track.style.transform = "translateX(" + -idx * itemW() + "px)";
    };

    const schedule = () => {
      window.clearTimeout(timer);
      if (!isPaused()) timer = window.setTimeout(advance, PAUSE);
    };

    const updatePlayback = () => {
      schedule();
      startCentre();
    };

    // Jump to a position without animating (the duplicate run makes
    // positions i and i+N visually identical).
    const snapTo = (i: number) => {
      idx = i;
      track.style.transition = "none";
      track.style.transform = "translateX(" + -idx * itemW() + "px)";
      void track.offsetWidth; // force reflow so the next move animates
    };

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      if (idx >= N) snapTo(idx - N);
      schedule();
    };

    // Manual prev/next. Unlike advance(), this must not respect isPaused():
    // reduced-motion and hovering users still expect the buttons to work.
    const step = (dir: 1 | -1) => {
      window.clearTimeout(timer);
      if (idx >= N) snapTo(idx - N);
      if (dir === -1 && idx === 0) snapTo(N);
      idx += dir;
      if (reducedMotion.matches) {
        snapTo(idx >= N ? idx - N : idx);
        schedule();
        return;
      }
      track.style.transition = "transform .9s cubic-bezier(.45,.05,.25,1)";
      track.style.transform = "translateX(" + -idx * itemW() + "px)";
    };
    stepRef.current = step;

    const onEnter = () => {
      hoverPaused = true;
      schedule();
    };
    const onLeave = () => {
      hoverPaused = false;
      updatePlayback();
    };
    const onVisibilityChange = () => {
      documentHidden = document.hidden;
      updatePlayback();
    };
    const onReducedMotionChange = () => {
      updatePlayback();
    };
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        updatePlayback();
      },
      { rootMargin: "160px 0px" },
    );

    track.addEventListener("transitionend", onTransitionEnd);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onReducedMotionChange);
    visibilityObserver.observe(section);
    updatePlayback();

    return () => {
      stepRef.current = null;
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
      visibilityObserver.disconnect();
      track.removeEventListener("transitionend", onTransitionEnd);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  const renderItem = (p: Partner, key: string) => {
    const inner = (
      <Image
        src={p.file}
        alt={p.name}
        width={501}
        height={251}
        sizes="220px"
        loading="lazy"
      />
    );
    return (
      <div key={key} className={`logo-item ${slug(p.name)}`}>
        {p.url ? (
          <a
            className="logo-box"
            href={p.url}
            target="_blank"
            rel="noopener"
            aria-label={`${p.name} (opens in a new tab)`}
          >
            {inner}
          </a>
        ) : (
          <div className="logo-box" role="img" aria-label={p.name}>
            {inner}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="logos"
      aria-label="Connected organisations across Australia"
    >
      <div className="wrap logos-head">
        <p className="eyebrow">Connected organisations across Australia</p>
        <div className="logos-controls">
          <button
            type="button"
            aria-label="Previous organisations"
            onClick={() => stepRef.current?.(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next organisations"
            onClick={() => stepRef.current?.(1)}
          >
            →
          </button>
        </div>
      </div>
      <div className="logos-viewport">
        <div className="logos-track" ref={trackRef}>
          {partners.map((p, i) => renderItem(p, `a-${i}`))}
          {partners.map((p, i) => renderItem(p, `b-${i}`))}
        </div>
      </div>
    </section>
  );
}
