import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

export default function DirectoryLoading() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors"
      />

      <main className="home-page directory-page">
        <header className="hero directory-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              </span>
              <div>
                <span className="eyebrow">A public resource</span>
                <p>
                  Our directory makes community leadership and action more
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
                Search organisations across the state and territory networks,
                and follow each one through to Action Network or its own
                website.
              </p>
            </div>

            <div
              className="directory-empty"
              role="status"
              aria-busy="true"
              aria-label="Loading directory"
            >
              <div className="directory-empty-symbol" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <span className="eyebrow">Loading</span>
                <h3>Loading organisations…</h3>
                <p>
                  Reading the community directory from the state and
                  territory networks.
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
