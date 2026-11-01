type VideoSlotProps = {
  src: string;
  /** Poster frame shown before the video paints; also the no-video fallback. */
  poster?: string;
  /** Describes the footage for assistive tech. */
  label: string;
  /** Rounded corners; pass a radius in px (defaults to 16). */
  rounded?: boolean | number;
  /** Extra classes for the slot container (sizing comes from the parent CSS). */
  className?: string;
  /** Crop focus for the cover-fit video. */
  objectPosition?: string;
};

/**
 * Video counterpart to ImageSlot. Fills its parent, crops with
 * object-fit: cover, and loops silently so it behaves like the still
 * image it replaces. `prefers-reduced-motion` keeps it on the poster
 * frame instead of autoplaying.
 */
export default function VideoSlot({
  src,
  poster,
  label,
  rounded,
  className = "",
  objectPosition = "center",
}: VideoSlotProps) {
  const isRounded = rounded !== undefined && rounded !== false;
  const radius =
    typeof rounded === "number" ? rounded : isRounded ? 16 : undefined;

  return (
    <div
      className={`img-slot has-video${isRounded ? " rounded" : ""}${
        className ? " " + className : ""
      }`}
      style={{
        ...(radius !== undefined ? { borderRadius: radius } : {}),
        // Reduced-motion hides the video, so the poster doubles as the still.
        ...(poster
          ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: objectPosition }
          : {}),
      }}
    >
      <video
        className="slot-video"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        style={{ objectPosition }}
      />
    </div>
  );
}
