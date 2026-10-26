"use client";

import Link from "next/link";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow } from "@/components/icons";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

/* Next 16.2 added `unstable_retry`, which re-fetches and re-renders the
 * segment. `reset()` only clears the boundary without re-fetching, so a server
 * render that failed would simply fail again. */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors"
      />

      <main className="home-page notfound-page">
        <header className="hero">
          <div className="wrap">
            <div className="notfound-copy">
              <span className="kicker on-dark">Something went wrong</span>
              <h1>
                This Page Did Not <span className="em-action">Load.</span>
              </h1>
              <p className="lead">
                Something went wrong on our end, not yours. Trying again often
                sorts it out. If it keeps happening, tell us and we will look
                into it.
              </p>
              <div className="hero-cta">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => unstable_retry()}
                >
                  Try again <Arrow />
                </button>
                <Link href="/" className="btn btn-ghost on-dark">
                  Return home
                </Link>
              </div>
              {/* `error.message` is not shown: for server errors it is a
                  generic string, and showing it risks leaking internals. The
                  digest matches the entry in the server logs. */}
              {error.digest ? (
                <p className="notfound-digest">
                  Reference: <code>{error.digest}</code>
                </p>
              ) : null}
            </div>
          </div>
        </header>
      </main>

      <Footer />
    </>
  );
}
