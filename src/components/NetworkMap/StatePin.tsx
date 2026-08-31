"use client";

import { AnimatePresence, motion } from "motion/react";

const SPRING = { type: "spring" as const, stiffness: 420, damping: 24, mass: 0.7 };
/** Pop the pin back into place (it scales from its nib, i.e. the capital). */
const POP = { type: "spring" as const, stiffness: 300, damping: 18, mass: 0.7 };
/** Slower, softer spring for the label pop. */
const LABEL_SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  mass: 0.9,
};

/**
 * Orange map pin, drawn as vectors so it can animate:
 *  - hover balloons the pin head and pops the postal abbreviation above it
 *  - clicking morphs the pin into the state network card (shared `layoutId`)
 */
export default function StatePin({
  name,
  count,
  hovered,
  onHoverStart,
  onHoverEnd,
  onSelect,
  ariaLabel,
}: {
  /** Full state name, shown on hover. */
  name: string;
  count: number;
  hovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
  ariaLabel: string;
}) {
  return (
    <motion.button
      type="button"
      className="statepin"
      aria-label={ariaLabel}
      aria-expanded={hovered}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      onClick={onSelect}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: hovered ? -6 : 0 }}
      transition={{ ...SPRING, scale: POP, opacity: { duration: 0.16 } }}
    >
      {/* Postal abbreviation pops above the pin on hover */}
      <AnimatePresence>
        {hovered ? (
          <motion.span
            className="statepin-label"
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={LABEL_SPRING}
          >
            {name}
            {count ? <span className="statepin-count">{count}</span> : null}
          </motion.span>
        ) : null}
      </AnimatePresence>

      <svg
        className="statepin-svg"
        viewBox="0 0 34 46"
        aria-hidden="true"
        focusable="false"
      >
        {/* Nib: stays pointing at the map through the balloon effect */}
        <path
          d="M17 45.5 L9.8 27 L24.2 27 Z"
          fill="var(--ochre-deep)"
        />
        {/* Head balloons on hover */}
        <motion.circle
          cx="17"
          cy="17"
          r="12.5"
          fill="var(--ochre)"
          stroke="var(--ochre-deep)"
          strokeWidth="1.5"
          initial={{ r: 12.5 }}
          animate={{ r: hovered ? 16 : 12.5 }}
          transition={SPRING}
        />
        <motion.circle
          cx="17"
          cy="17"
          r="4.6"
          fill="#fff6e2"
          initial={{ r: 4.6 }}
          animate={{ r: hovered ? 6.4 : 4.6 }}
          transition={SPRING}
        />
      </svg>
    </motion.button>
  );
}
