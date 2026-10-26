import {
  renderOgImage,
  ogImageAlt,
  ogImageSize,
  ogImageContentType,
} from "@/lib/og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage("Community Directory");
}
