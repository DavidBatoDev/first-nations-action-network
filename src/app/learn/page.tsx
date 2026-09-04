import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import { Arrow } from "@/components/icons";
import Nav, { type NavLink } from "@/components/Nav";

const TRAINING_DESCRIPTION =
  "Practical learning, cultural engagement and leadership development for organisations, teams and communities working alongside First Nations peoples.";

export const metadata: Metadata = {
  title: "Learning & Development",
  description: TRAINING_DESCRIPTION,
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learning & Development · First Nations Action Network",
    description: TRAINING_DESCRIPTION,
    url: "/learn",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

const focusAreas = [
  {
    title: "First Nations engagement",
    description:
      "Build stronger relationships through practical learning and effective engagement strategies.",
  },
  {
    title: "Cultural responsiveness",
    description:
      "Develop understanding that supports respectful and sustainable engagement with First Nations communities.",
  },
  {
    title: "Community organising",
    description:
      "Strengthen connection, participation and shared action across communities.",
  },
  {
    title: "Leadership development",
    description:
      "Support people and organisations to build leadership for positive community outcomes.",
  },
];

const waysToLearn = [
  "Workshops",
  "Key note presentations",
  "Structured courses",
  "On-Country Experiences",
];

/**
 * Draft. The partner is not named because their name arrived truncated, and the
 * service list is unconfirmed — both are logged in pending-request.md.
 */
const brandingServices = ["Branding", "Website", "Communications"];

export default function LearnPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors"
      />

      <main className="home-page training-page">
        <header className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="kicker on-dark" data-reveal>
                Learning and development
              </span>
              <h1 data-reveal data-delay="1">
                Learning Through Experience. Leading Through{" "}
                <span className="em-action">Understanding.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                Support your organisation, team or community through practical
                learning, cultural engagement and leadership development.
              </p>
              <div className="hero-cta" data-reveal data-delay="3">
                <Link href="/contact" className="btn btn-primary">
                  Book a Conversation <Arrow />
                </Link>
              </div>
            </div>
            <div className="hero-media" data-reveal data-delay="2">
              <div className="img-frame">
                <ImageSlot
                  src="/images/training.webp"
                  alt="Facilitated session on Country"
                  note="Facilitated session on Country"
                  rounded={20}
                  sizes="(max-width: 980px) calc(100vw - 48px), 42vw"
                  preload
                />
              </div>
            </div>
          </div>
        </header>

        <section className="sec bg-cream">
          <div className="wrap split media-left">
            <div className="training-audience-panel" data-reveal>
              <span className="kicker">Who it supports</span>
              <h3>Learning alongside community</h3>
              <div className="training-audience-tags">
                <span>Organisations</span>
                <span>Businesses</span>
                <span>Government agencies</span>
                <span>Community groups</span>
              </div>
            </div>
            <div data-reveal data-delay="1">
              <span className="kicker">Practical learning</span>
              <h2 style={{ fontSize: "clamp(32px,3.8vw,48px)", marginTop: 18 }}>
                Build Stronger Relationships With First Nations{" "}
                <span className="em-action">Communities.</span>
              </h2>
              <div className="body" style={{ marginTop: 24 }}>
                <p>
                  The First Nations Action Network supports organisations, businesses, government agencies
                  and communities seeking practical learning and meaningful
                  engagement.
                </p>
                <p>
                  The focus is on connection, cultural engagement, leadership and
                  the capacity to achieve more outcomes with greater inclusion
                  and participation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Learning focus</span>
              <h2>
                Practical Learning For Meaningful{" "}
                <span className="em-action">Action.</span>
              </h2>
              <p className="lead">
                Learning is most powerful when it comes directly from
                people&rsquo;s lived experiences — their stories, wisdom, and
                direct knowledge of their own communities. By taking a
                trauma-informed approach that prioritises safety, trust, and
                collaboration, we create meaningful learning opportunities
                through the shared work of listening to, organising, and
                strengthening our communities together.
              </p>
            </div>
            <div className="training-focus-grid">
              {focusAreas.map((area, index) => (
                <article
                  className="training-focus-card"
                  data-reveal
                  data-delay={String(index)}
                  key={area.title}
                >
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec bg-cream training-conversation">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Ways to learn</span>
              <h2>Start With A Conversation.</h2>
              <p className="lead">
                Talk with the Network about workshop, learning and capacity-building
                opportunities for your organisation, team or community.
              </p>
            </div>
            <div className="training-offerings is-four" data-reveal data-delay="1">
              {waysToLearn.map((offering) => (
                <span key={offering}>{offering}</span>
              ))}
            </div>
            <div className="actions" data-reveal data-delay="2">
              <Link href="/contact" className="btn btn-primary">
                Book a Conversation <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ MARKETING & BRANDING SUPPORT (draft) ============ */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Marketing and branding</span>
              <h2>
                Marketing &amp; Branding{" "}
                <span className="em-action">Support.</span>
              </h2>
              <p className="lead">
                Practical support to help your organisation present itself
                clearly and reach the people it serves, offered in partnership
                with specialist providers.
              </p>
            </div>
            <div className="training-offerings" data-reveal data-delay="1">
              {brandingServices.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
