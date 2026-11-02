"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import ImageSlot from "@/components/ImageSlot";

type TeamCardProps = {
  name: string;
  role: string;
  image: string;
  biography: string;
  objectPosition?: string;
  delay?: string;
};

export default function TeamCard({
  name,
  role,
  image,
  biography,
  objectPosition,
  delay,
}: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);
  const biographyId = useId();
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const outgoing = flipped ? frontButtonRef.current : backButtonRef.current;
    const incoming = flipped ? backButtonRef.current : frontButtonRef.current;
    if (document.activeElement === outgoing) {
      incoming?.focus({ preventScroll: true });
    }
  }, [flipped]);

  // ScrollReveal adds is-visible imperatively; keep className stable across flips.

  return (
    <article
      className="who-person"
      data-flipped={flipped}
      data-reveal
      data-delay={delay}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setFlipped(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setFlipped(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFlipped(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setFlipped(false);
      }}
    >
      <div className="who-person-inner">
        <div className="who-person-front" aria-hidden={flipped}>
          <div className="who-person-photo">
            <ImageSlot
              src={image}
              alt={`Portrait of ${name}`}
              objectPosition={objectPosition}
              sizes="(max-width: 620px) calc(100vw - 48px), (max-width: 900px) 44vw, 30vw"
            />
          </div>
          <div className="who-person-body">
            <h3>{name}</h3>
            <span className="who-person-role">{role}</span>
          </div>
          <button
            ref={frontButtonRef}
            type="button"
            className="who-person-toggle"
            aria-label={`Read ${name}'s story`}
            aria-expanded={flipped}
            aria-controls={biographyId}
            tabIndex={flipped ? -1 : 0}
            onClick={() => setFlipped(true)}
          >
            <span>Read story</span>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7v5h-5" />
              <path d="M19.5 12a7.5 7.5 0 1 0-2.2 5.3M20 12l-3-3" />
            </svg>
          </button>
        </div>
        <div
          className="who-person-back"
          id={biographyId}
          aria-hidden={!flipped}
        >
          <div>
            <h3>{name}</h3>
            <span className="who-person-role">{role}</span>
          </div>
          <p>{biography}</p>
          <button
            ref={backButtonRef}
            type="button"
            className="who-person-toggle"
            aria-label={`Show ${name}'s portrait`}
            aria-expanded={flipped}
            aria-controls={biographyId}
            tabIndex={flipped ? 0 : -1}
            onClick={() => setFlipped(false)}
          >
            <span>Back to portrait</span>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7v5h-5" />
              <path d="M19.5 12a7.5 7.5 0 1 0-2.2 5.3M20 12l-3-3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
