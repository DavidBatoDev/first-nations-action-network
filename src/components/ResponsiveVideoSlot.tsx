"use client";

import { useEffect, useState } from "react";
import { useMinWidth } from "@/hooks/useMinWidth";
import VideoSlot from "@/components/VideoSlot";

type ResponsiveVideoSlotProps = {
  /** Used at and above `minWidth`. */
  desktopSrc: string;
  /** Used below `minWidth`. */
  mobileSrc: string;
  desktopPoster?: string;
  mobilePoster?: string;
  /** Describes the footage for assistive tech. */
  label: string;
  rounded?: boolean | number;
  className?: string;
  objectPosition?: string;
  /** Breakpoint in px. Matches the `.member` single-column collapse. */
  minWidth?: number;
};

/**
 * One video slot whose source depends on viewport width.
 *
 * The point of choosing in markup rather than with CSS is cost: a `<video>`
 * hidden by `display: none` is still downloaded, so a CSS-only swap would ship
 * both clips to every visitor and discard one. That is roughly 11 MB across the
 * two files.
 *
 * Choosing in markup alone is not enough, though. The server cannot know the
 * viewport, so it renders the narrow branch, the browser begins fetching that
 * file, and then hydration discovers it needs the wide one and fetches that
 * too. Measured: both clips downloaded, which is exactly what this component
 * exists to prevent.
 *
 * So nothing is rendered until after mount. Before then the slot shows the
 * poster as a background image, which is already how `VideoSlot` degrades under
 * `prefers-reduced-motion`. Once mounted, the width is known and exactly one
 * source is attached.
 */
export default function ResponsiveVideoSlot({
  desktopSrc,
  mobileSrc,
  desktopPoster,
  mobilePoster,
  label,
  rounded,
  className,
  objectPosition,
  minWidth = 901,
}: ResponsiveVideoSlotProps) {
  const wide = useMinWidth(minWidth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const poster = wide ? desktopPoster : mobilePoster;

  if (!mounted) {
    /*
     * Poster only. Deliberately not an empty <video>: an element with no source
     * still costs a layout box and can flash its controls, and we already have
     * the right still to show. The radius and background match VideoSlot so the
     * swap is invisible.
     */
    const radius =
      rounded === undefined || rounded === false
        ? undefined
        : typeof rounded === "number"
          ? rounded
          : 16;

    return (
      <div
        className={`img-slot has-video${radius !== undefined ? " rounded" : ""}${
          className ? " " + className : ""
        }`}
        style={{
          ...(radius !== undefined ? { borderRadius: radius } : {}),
          ...(poster
            ? {
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: objectPosition ?? "center",
              }
            : {}),
        }}
      />
    );
  }

  return (
    <VideoSlot
      src={wide ? desktopSrc : mobileSrc}
      poster={poster}
      label={label}
      rounded={rounded}
      className={className}
      objectPosition={objectPosition}
    />
  );
}
