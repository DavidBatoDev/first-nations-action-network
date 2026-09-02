import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import ResourceCatalogue from "@/components/ResourceCatalogue";
import { RESOURCE_COURSES } from "@/lib/resources";

const RESOURCES_DESCRIPTION =
  "A contributor learning library of practical guides, articles and tools for community organising, leadership and shared learning.";

export const metadata: Metadata = {
  title: "Resources",
  description: RESOURCES_DESCRIPTION,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources · First Nations Action Network",
    description: RESOURCES_DESCRIPTION,
    url: "/resources",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

export default function ResourcesPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/contributors"
      />

      <main className="home-page resources-page">
        <header className="hero resources-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span>{" "}
                Resources
              </span>
              <span className="kicker on-dark" data-reveal>
                Contributor learning library
              </span>
              <h1 data-reveal data-delay="1">
                Shared Learning. Stronger{" "}
                <span className="em-action">Communities.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                A contributor learning library of practical guides, articles and
                tools for community organising, leadership and shared action.
              </p>
            </div>

            <aside className="resources-purpose" data-reveal data-delay="2">
              <span className="resources-purpose-mark" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <div>
                <span className="eyebrow">A contributor benefit</span>
                <p>
                  Resources will help contributor organisations learn from
                  shared experience and apply it in their own communities.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className="sec bg-cream resources-library-section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Browse resources</span>
              <h2>
                Find The Right Resource For Your{" "}
                <span className="em-action">Work.</span>
              </h2>
              <p className="lead">
                Browse practical learning for organising, engagement and
                leadership as the contributor library grows.
              </p>
            </div>

            <ResourceCatalogue courses={RESOURCE_COURSES} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
