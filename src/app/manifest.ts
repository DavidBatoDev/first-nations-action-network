import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    // Deliberately shorter than SITE_DESCRIPTION: install prompts truncate
    // long descriptions, so this keeps its own condensed wording.
    description:
      "A First Nations–led national network strengthening communities through connection, collaboration and action.",
    start_url: "/",
    display: "standalone",
    background_color: "#16130F",
    theme_color: "#16130F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
