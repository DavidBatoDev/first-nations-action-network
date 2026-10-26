"use client";

/* Renders only when the root layout itself throws, which means it replaces the
 * layout entirely: no globals.css, no next/font variables, no Nav or Footer.
 * Everything here is deliberately self-contained and inline-styled so this page
 * cannot fail for want of a stylesheet. Colours are the brand tokens from
 * globals.css (--ink, --paper, --yellow, --cream) written out literally.
 * Error boundaries are Client Components, so `metadata` is not supported and
 * the title is set with React's <title>. */

const INK = "#16130f";
const PAPER = "#ffffff";
const YELLOW = "#ffda00";

const sans =
  'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serif = 'Georgia, "Times New Roman", serif';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: INK }}>
        <title>Something went wrong · First Nations Action Network</title>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            padding: "48px 24px",
            background: INK,
            color: PAPER,
            fontFamily: sans,
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: YELLOW,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Something went wrong
          </span>
          <h1
            style={{
              margin: 0,
              maxWidth: "18ch",
              fontFamily: serif,
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            The Site Could Not Load.
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "52ch",
              color: "#c9c2b6",
              fontSize: "18px",
              lineHeight: 1.6,
            }}
          >
            Something went wrong on our end, not yours. Trying again often sorts
            it out.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              justifyContent: "center",
              marginTop: "14px",
            }}
          >
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                padding: "16px 30px",
                border: "none",
                borderRadius: "7px",
                background: YELLOW,
                color: INK,
                fontFamily: "inherit",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A plain anchor, not next/link: the root layout has crashed,
                so a soft client navigation would re-render the same broken
                tree. This forces a full document load. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: "16px 30px",
                border: "1px solid rgba(255, 255, 255, 0.32)",
                borderRadius: "7px",
                color: PAPER,
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Return home
            </a>
          </div>
          {error.digest ? (
            <p style={{ margin: "10px 0 0", color: "#838383", fontSize: "13px" }}>
              Reference: <code>{error.digest}</code>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
