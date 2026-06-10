"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ports the draft's scroll-reveal behaviour: every element carrying a
 * `data-reveal` attribute fades/slides in once it enters the viewport.
 * Re-initialises on route change so newly mounted pages animate too.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));

    // Safety net: reveal anything already in view that the observer missed.
    const t = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("is-visible");
          }
        });
    }, 1400);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
