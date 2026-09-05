import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow } from "@/components/icons";

/* `not-found.tsx` takes no props. Next already injects
 * <meta name="robots" content="noindex"> for a 404 response, but the root
 * layout's `index, follow` is emitted alongside it; setting robots here
 * replaces that so the two directives agree. No canonical: this page has no
 * URL of its own. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

/** Ordered by the priorities in `src/app/sitemap.ts`. */
const destinations = [
  {
    href: "/who-we-are",
    title: "Who We Are",
    copy: "The story of the Network, what it believes and the people behind it.",
  },
  {
    href: "/contributors",
    title: "Contribute",
    copy: "How organisations join the Network and what contributing involves.",
  },
  {
    href: "/learn",
    title: "Learn",
    copy: "Learning and development for your organisation, team or community.",
  },
  {
    href: "/events",
    title: "Events",
    copy: "Upcoming gatherings, workshops and community events across Australia.",
  },
  {
    href: "/directory",
    title: "Directory",
    copy: "The community directory of organisations working across the country.",
  },
  {
    href: "/contact",
    title: "Contact",
    copy: "Send a message and someone from the Network will be in touch.",
  },
] as const;

const moreLinks = [
  { href: "/allyship", label: "First Nations Allies" },
  { href: "/stories", label: "Community Stories" },
  { href: "/resources", label: "Resources" },
] as const;

export default function NotFound() {
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
              <span className="kicker on-dark" data-reveal>
                404 · Page not found
              </span>
              <h1 data-reveal data-delay="1">
                This Page Has <span className="em-action">Moved On.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                The page you were looking for is not here. It may have been
                renamed, or the link that brought you here may be out of date.
                Everything else is still where you left it.
              </p>
              <div className="hero-cta" data-reveal data-delay="3">
                <Link href="/" className="btn btn-primary">
                  Return home <Arrow />
                </Link>
                <Link href="/contact" className="btn btn-ghost on-dark">
                  Book a conversation
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="sec bg-cream">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Try one of these</span>
              <h2>Where You Might Be Headed</h2>
              <p className="lead">
                These are the main parts of the site. If you followed a link
                from somewhere else and it should still work, let us know.
              </p>
            </div>

            <ul className="notfound-links" data-reveal data-delay="1">
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <Link href={destination.href}>
                    <h3>{destination.title}</h3>
                    <p>{destination.copy}</p>
                    <span className="more">
                      Open <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="notfound-more" data-reveal data-delay="2">
              <span>Also on the site:</span>
              {moreLinks.map((link) => (
                <Link key={link.href} href={link.href} className="textlink">
                  {link.label}
                </Link>
              ))}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
