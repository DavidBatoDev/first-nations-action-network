import Image from "next/image";

type ImageSlotProps = {
  src: string;
  alt: string;
  /** Optional caption chip shown bottom-left (the draft's ph-note). */
  note?: string;
  /** Rounded corners; pass a radius in px (defaults to 16). */
  rounded?: boolean | number;
  /** Extra classes for the slot container (sizing comes from the parent CSS). */
  className?: string;
  /** Responsive rendered-width hint used by next/image. */
  sizes?: string;
  /** Preload only the single image expected to be the route's LCP element. */
  preload?: boolean;
  /** Crop focus passed to the fill image. */
  objectPosition?: string;
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
  sizes = "(max-width: 900px) calc(100vw - 48px), 50vw",
  preload = false,
  objectPosition = "center",
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        style={{ objectFit: "cover", objectPosition }}
      />
      {note ? <span className="ph-note">{note}</span> : null}
    </div>
  );
}
