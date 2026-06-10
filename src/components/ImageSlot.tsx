type ImageSlotProps = {
  src: string;
  alt: string;
  /** Optional caption chip shown bottom-left (the draft's ph-note). */
  note?: string;
  /** Rounded corners; pass a radius in px (defaults to 16). */
  rounded?: boolean | number;
  /** Extra classes for the slot container (sizing comes from the parent CSS). */
  className?: string;
};

/**
 * Replaces the draft's <image-slot> custom element. The slot fills its
 * parent (heights are set by the surrounding CSS) and crops the image with
 * object-fit: cover, matching the original layout.
 */
export default function ImageSlot({
  src,
  alt,
  note,
  rounded,
  className = "",
}: ImageSlotProps) {
  const isRounded = rounded !== undefined && rounded !== false;
  const radius =
    typeof rounded === "number" ? rounded : isRounded ? 16 : undefined;

  return (
    <div
      className={`img-slot${isRounded ? " rounded" : ""}${
        className ? " " + className : ""
      }`}
      style={radius !== undefined ? { borderRadius: radius } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
      {note ? <span className="ph-note">{note}</span> : null}
    </div>
  );
}
