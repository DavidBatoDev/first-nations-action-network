import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";

const DIRECTORY_DESCRIPTION =
  "A public directory of organisations, groups, networks and initiatives working to strengthen communities and create positive change across Australia.";

export const metadata: Metadata = {
  title: "Community Directory",
  description: DIRECTORY_DESCRIPTION,
  alternates: { canonical: "/directory" },
  openGraph: {
    title: "Community Directory · First Nations Action Network",
    description: DIRECTORY_DESCRIPTION,
    url: "/directory",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
];

export default function DirectoryPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/membership"
      />

      <main className="home-page directory-page">
        <header className="hero directory-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span>{" "}
                Community Directory
              </span>
              <span className="kicker on-dark" data-reveal>
                Community directory
              </span>
              <h1 data-reveal data-delay="1">
                Find Community. Build{" "}
                <span className="em-action">Connection.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                A public directory of organisations, groups, networks and
                initiatives working to strengthen communities and create
                positive change across Australia.
              </p>
            </div>

            <aside className="directory-purpose" data-reveal data-delay="2">
              <span className="directory-purpose-mark" aria-hidden="true">
                01
              </span>
              <div>
                <span className="eyebrow">A public resource</span>
                <p>
                  The directory will make community leadership and action more
                  visible, helping people discover organisations and build
                  stronger relationships.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className="sec bg-cream directory-discovery-section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Discover organisations</span>
              <h2>
                A Directory Built For{" "}
                <span className="em-action">Connection.</span>
              </h2>
              <p className="lead">
                Search and filters will be available once FNAN has gathered and
                approved public listings.
              </p>
            </div>

            <form className="directory-filters" aria-describedby="directory-status">
              <div className="directory-search-field">
                <label htmlFor="directory-search">Search the directory</label>
                <div className="directory-search-control">
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
                    id="directory-search"
                    type="search"
                    placeholder="Search by organisation or keyword"
                    disabled
                  />
                </div>
              </div>

              <div className="directory-filter-field">
                <label htmlFor="directory-state">State or territory</label>
                <select id="directory-state" defaultValue="" disabled>
                  <option value="">All states and territories</option>
                </select>
              </div>

              <div className="directory-filter-field">
                <label htmlFor="directory-type">Organisation type</label>
                <select id="directory-type" defaultValue="" disabled>
                  <option value="">All organisation types</option>
                </select>
              </div>

              <div className="directory-filter-field">
                <label htmlFor="directory-focus">Focus area</label>
                <select id="directory-focus" defaultValue="" disabled>
                  <option value="">All focus areas</option>
                </select>
              </div>
              <p id="directory-status" className="directory-filter-status">
                Directory discovery is being prepared with verified public
                information.
              </p>
            </form>

            <div className="directory-empty" data-reveal>
              <div className="directory-empty-symbol" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <span className="eyebrow">Coming soon</span>
                <h3>The directory is being populated.</h3>
                <p>
                  FNAN is preparing verified public listings before they are
                  published here. Check back soon to discover organisations,
                  networks and community initiatives from across Australia.
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
