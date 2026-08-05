import type { Metadata } from "next";
import Link from "next/link";
import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";
import EventsBrowser from "@/components/EventsBrowser";
import { getActionNetworkEvents } from "@/lib/action-network";

const EVENTS_DESCRIPTION =
  "Discover public First Nations Action Network workshops, forums and gatherings across Australia.";

export const metadata: Metadata = {
  title: "Events",
  description: EVENTS_DESCRIPTION,
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events · First Nations Action Network",
    description: EVENTS_DESCRIPTION,
    url: "/events",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
];

export default async function EventsPage() {
  const eventFeed = await getActionNetworkEvents();

  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/membership"
      />

      <header className="events-hero">
        <div className="wrap">
          <span className="crumb" data-reveal>
            <Link href="/">Home</Link> <span className="sep">/</span> Events
          </span>
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
        <EventsBrowser events={eventFeed.events} />
      </main>

      <section className="events-join">
        <div className="wrap">
          <span className="kicker" data-reveal>
            Be part of the network
          </span>
          <div className="events-join-content" data-reveal data-delay="1">
            <div>
              <h2>Bring your community into the conversation.</h2>
              <p>
                Join a growing national network of organisations sharing
                learning, opportunities and collective action.
              </p>
            </div>
            <Link href="/membership" className="btn btn-primary">
              Join the Network <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
