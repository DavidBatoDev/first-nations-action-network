import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const INK = "#16130f";
const CREAM = "#faf6ef";
const OCHRE = "#d97c00";
const YELLOW = "#ffda00";

export function renderOgImage(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "80px",
          color: CREAM,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: YELLOW,
              marginRight: "16px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: YELLOW,
            }}
          >
            First Nations Action Network
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              lineHeight: 1.1,
              fontWeight: 700,
              color: CREAM,
              maxWidth: "980px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              width: "120px",
              height: "10px",
              backgroundColor: OCHRE,
              marginTop: "40px",
            }}
          />
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}

export const ogImageAlt = SITE_NAME;
