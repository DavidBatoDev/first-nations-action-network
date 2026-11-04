"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DURATION_MS = 260;
const EASING = "cubic-bezier(0.2, 0.7, 0.2, 1)";

/**
 * `.faq-grid` wrapper that animates its `<details className="faq-item">`
 * children open and closed. Native `<details>` toggles instantly, so the
 * summary click is intercepted and the element's height is tweened between
 * its closed and open sizes. Closing keeps `open` set until the tween ends
 * so the answer stays visible while it collapses; `data-closing` lets CSS
 * turn the marker back immediately. Reduced-motion visitors get the native
 * instant toggle.
 */
export default function FaqGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new Map<HTMLDetailsElement, Animation>();

    const onClick = (event: MouseEvent) => {
      if (reducedMotion.matches) return;
      const summary = (event.target as Element | null)?.closest("summary");
      const details = summary?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || !grid.contains(details)) {
        return;
      }
      event.preventDefault();

      const closing = details.hasAttribute("data-closing");
      const opening = !details.open || closing;
      // Read before cancelling so an interrupted tween reverses from where it is.
      const from = details.offsetHeight;
      running.get(details)?.cancel();
      details.removeAttribute("data-closing");

      let to: number;
      if (opening) {
        details.open = true;
        to = details.offsetHeight;
      } else {
        details.open = false;
        to = details.offsetHeight;
        details.open = true;
        details.setAttribute("data-closing", "");
      }

      details.style.overflow = "hidden";
      const animation = details.animate(
        { height: [`${from}px`, `${to}px`] },
        { duration: DURATION_MS, easing: EASING },
      );
      running.set(details, animation);
      animation.onfinish = () => {
        running.delete(details);
        details.style.overflow = "";
        if (!opening) {
          details.open = false;
          details.removeAttribute("data-closing");
        }
      };
    };

    grid.addEventListener("click", onClick);
    return () => {
      grid.removeEventListener("click", onClick);
      running.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div ref={ref} className="faq-grid">
      {children}
    </div>
  );
}
