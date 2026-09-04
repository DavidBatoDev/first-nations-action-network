import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

export default function EventsLoading() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors"
      />

      <header className="events-hero">
        <div className="wrap">
          <span className="kicker on-dark" data-reveal>
            Community calendar
          </span>
          <h1 data-reveal data-delay="1">
            Make Time To <span className="em-action">Gather.</span>
          </h1>
          <p className="lead" data-reveal data-delay="2">
            Workshops, forums and gatherings that strengthen relationships,
            build capacity and support community-led action.
          </p>
          <div className="hero-trust" data-reveal data-delay="3">
            <span className="dot" /> Public events
            <span className="dot" /> Across Australia
            <span className="dot" /> Online and in person
          </div>
        </div>
      </header>

      <main className="events-page">
        <section className="events-browser sec">
          <div className="wrap">
            <div
              className="events-empty"
              aria-busy="true"
              aria-label="Loading events"
            >
              <div>
                <h3>Loading events…</h3>
                <p>
                  Fetching the latest workshops, forums and gatherings from
                  Action Network.
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
