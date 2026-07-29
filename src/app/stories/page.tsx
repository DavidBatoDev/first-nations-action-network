import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";

const STORIES_DESCRIPTION =
  "Community stories, initiatives and projects that share leadership, learning and positive change across Australia.";

export const metadata: Metadata = {
  title: "Community Stories",
  description: STORIES_DESCRIPTION,
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Community Stories · First Nations Action Network",
    description: STORIES_DESCRIPTION,
    url: "/stories",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
];

export default function StoriesPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/membership"
      />

      <main className="home-page stories-page">
        <header className="hero stories-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span>{" "}
                Community Stories
              </span>
              <span className="kicker on-dark" data-reveal>
                Community stories
              </span>
              <h1 data-reveal data-delay="1">
                Stories That Strengthen{" "}
                <span className="em-action">Communities.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                A growing collection of community leadership, local initiatives
                and shared learning from across Australia.
              </p>
            </div>

            <aside className="stories-purpose" data-reveal data-delay="2">
              <span className="stories-purpose-mark" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <div>
                <span className="eyebrow">Shared with care</span>
                <p>
                  Each story will be published with approval, giving community
                  action the visibility it deserves.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className="sec bg-cream stories-library-section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Stories library</span>
              <h2>
                Community-Led Change,{" "}
                <span className="em-action">Shared.</span>
              </h2>
              <p className="lead">
                The library will showcase positive action, community leadership
                and ideas that help organisations learn from one another.
              </p>
            </div>

            <form className="stories-filters" aria-describedby="stories-status">
              <div className="stories-search-field">
                <label htmlFor="stories-search">Search stories</label>
                <div className="stories-search-control">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4.2 4.2" />
                  </svg>
                  <input
                    id="stories-search"
                    type="search"
                    placeholder="Search by keyword"
                    disabled
                  />
                </div>
              </div>
              <div className="stories-filter-field">
                <label htmlFor="stories-state">State or territory</label>
                <select id="stories-state" defaultValue="" disabled>
                  <option value="">All states and territories</option>
                </select>
              </div>
              <div className="stories-filter-field">
                <label htmlFor="stories-organisation">Organisation</label>
                <select id="stories-organisation" defaultValue="" disabled>
                  <option value="">All organisations</option>
                </select>
              </div>
              <div className="stories-filter-field">
                <label htmlFor="stories-topic">Topic</label>
                <select id="stories-topic" defaultValue="" disabled>
                  <option value="">All topics</option>
                </select>
              </div>
              <div className="stories-filter-field">
                <label htmlFor="stories-category">Category</label>
                <select id="stories-category" defaultValue="" disabled>
                  <option value="">All categories</option>
                </select>
              </div>
              <p id="stories-status" className="stories-filter-status">
                Story discovery will be available once approved community stories
                are ready to publish.
              </p>
            </form>

            <div className="stories-empty" data-reveal>
              <div className="stories-empty-mark" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div>
                <span className="eyebrow">Coming soon</span>
                <h3>Stories are being prepared.</h3>
                <p>
                  FNAN is gathering approved stories that reflect the work,
                  leadership and positive change happening in communities across
                  Australia. Check back soon to read and share them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
