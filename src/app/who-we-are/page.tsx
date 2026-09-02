import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow } from "@/components/icons";

const WHO_DESCRIPTION =
  "The First Nations Action Network is a First Nations-led federal network connecting communities, organisations and allies through shared learning, collective action and practical support.";

export const metadata: Metadata = {
  title: "Who We Are",
  description: WHO_DESCRIPTION,
  alternates: { canonical: "/who-we-are" },
  openGraph: {
    title: "Who We Are · First Nations Action Network",
    description: WHO_DESCRIPTION,
    url: "/who-we-are",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/#membership" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

const storyStages = [
  {
    title: "Community Conversations",
    copy: "It began with listening — yarns with community members, leaders and Elders about what stronger, self-determining communities could look like.",
  },
  {
    title: "Local Gatherings",
    copy: "Those conversations grew into gatherings, where people came together to share knowledge, culture and a common purpose.",
  },
  {
    title: "Partnerships Formed",
    copy: "Organisations and allies began working side by side, building trust and shared commitments grounded in respect.",
  },
  {
    title: "Shared Learning",
    copy: "Groups exchanged skills, tools and stories — learning from one another and strengthening local capacity together.",
  },
  {
    title: "National Collaboration",
    copy: "Local efforts connected into something larger: a federal network organising for change while acting locally.",
  },
  {
    title: "The Network Today",
    copy: "Today the First Nations Action Network connects communities, organisations and allies across Australia in ongoing collective action.",
  },
];

const beliefCards = [
  {
    no: "01",
    statement:
      "Demonstrate how all Australians are enriched when we value the First Peoples and our continent's history",
  },
  {
    no: "02",
    statement:
      "Increase the number of shared experiences with First Nations peoples (events, talks, rallies, other actions)",
  },
  {
    no: "03",
    statement:
      "Organise political action with greater communication and solidarity",
  },
];

const workCards = [
  {
    no: "01 — Connect",
    title: "Connect",
    copy: "We bring First Nations communities, organisations and allies together, building relationships and a shared sense of purpose across Australia.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="10" r="2.4" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M15.5 19c0-2 1.3-3.4 3.2-3.4S22 17 22 19" />
      </svg>
    ),
  },
  {
    no: "02 — Organise",
    title: "Organise",
    copy: "Community organising is about people coming together to build power and act on the issues that matter to them. We share the tools, training and support to make that possible.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h10" />
        <circle cx="19" cy="18" r="2.4" />
      </svg>
    ),
  },
  {
    no: "03 — Take Action",
    title: "Take Action",
    copy: "Through Action Network and hands-on support, communities run campaigns, host events and turn shared purpose into lasting, local impact.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
      </svg>
    ),
  },
];

const people = [
  {
    image: "/images/story1.webp",
    name: "Stephen Mam",
    role: "Founder / Executive Director",
  },
  {
    image: "/images/membership.webp",
    name: "Pablo Teleg",
    role: "Creative Designer",
  },
  {
    image: "/images/training.webp",
    name: "Suzanne Thompson",
    role: "Ambassador (QLD)",
  },
  {
    image: "/images/story2.webp",
    name: "Sharon Wright",
    role: "Ambassador (QLD)",
  },
  {
    image: "/images/allies.webp",
    name: "Peter Murchland",
    role: "Ambassador (SA)",
  },
];

export default function WhoWeArePage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/membership"
        solid
      />

      <main className="home-page who-page">
        {/* ============ SECTION 1 · INTRO ============ */}
        <section className="sec who-intro">
          <div className="wrap split">
            <div data-reveal>
              <span className="kicker">Who we are</span>
              <h1 data-reveal data-delay="1">
                Built by Communities.{" "}
                <span className="em-action">Guided by Purpose.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                The First Nations Action Network is a First Nations–led federal
                network that enables local communities to organise and create
                impact for change — connecting communities, organisations and
                allies through shared learning, collective action and practical
                support.
              </p>
              <div className="actions" data-reveal data-delay="2">
                <Link href="/membership" className="btn btn-primary">
                  Join the Network <Arrow />
                </Link>
                <Link href="/allyship" className="btn btn-ghost">
                  Explore Allyship
                </Link>
              </div>
            </div>
            <div data-reveal data-delay="1">
              <div className="img-frame">
                <ImageSlot
                  src="/images/who.webp"
                  alt="First Nations leaders and community members together"
                  note="First Nations leaders and community members"
                  rounded={18}
                  sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
                  preload
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 2 · WHAT IS THE NETWORK ============ */}
        <section className="sec bg-cream who-what">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">What is the Network</span>
              <h2>Welcome to the First Nations Action Network</h2>
              <p className="lead">
                A communication platform for groups and national subscribers, as
                well as a source of intelligence on their activity. An exciting
                and engaging way to connect.
              </p>
            </div>
          </div>
        </section>

        {/* ============ SECTION 3 · VISION & PURPOSE ============ */}
        <section className="sec who-vision">
          <div className="wrap who-vision-grid">
            <div className="who-vision-copy" data-reveal>
              <div className="who-statement">
                <span className="who-vision-head">Our Vision</span>
                <p>
                  A community built on a foundation of compassion, where the
                  inherent rights of First Nations peoples to self-determination,
                  self-autonomy, and economic independence are fully embraced.
                  Through every action, we are dedicated to mutually empowering
                  each other and strengthening our collective community.
                </p>
              </div>
              <div className="who-statement">
                <span className="who-vision-head">Our Purpose</span>
                <p>
                  To nurture authentic relationships and organise communities
                  through progressive collaboration, driving leadership for
                  change and advocating for community wellbeing.
                </p>
              </div>
            </div>
            <div className="who-vision-media" data-reveal data-delay="1">
              <ImageSlot
                src="/images/hero.webp"
                alt="Community gathering with Elders and young leaders"
                note="Community gathering · shared purpose"
                rounded={18}
                sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
              />
            </div>
          </div>
        </section>

        {/* ============ SECTION 4 · OUR STORY ============ */}
        <section className="sec bg-cream who-story">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Our story</span>
              <h2>From Conversations to a Federal Network</h2>
              <p className="lead">
                The First Nations Action Network grew from community
                conversations into a national movement — one relationship, one
                gathering and one shared step at a time.
              </p>
            </div>
            <ol className="who-timeline">
              {storyStages.map((stage, index) => (
                <li
                  key={stage.title}
                  className="who-timeline-step"
                  data-reveal
                  data-delay={index ? String(Math.min(index, 3)) : undefined}
                >
                  <span className="who-timeline-marker" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="who-timeline-body">
                    <h3>{stage.title}</h3>
                    <p>{stage.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ SECTION 5 · WHAT WE BELIEVE ============ */}
        <section className="sec who-believe">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">What we believe</span>
              <h2 className="who-believe-title">
                Excite and Energise <span className="em-action">Actions</span>
              </h2>
            </div>
            <div className="who-belief-cards">
              {beliefCards.map((card, index) => (
                <article
                  key={card.no}
                  className="who-belief-card"
                  data-reveal
                  data-delay={index ? String(index) : undefined}
                >
                  <span className="who-belief-no" aria-hidden="true">
                    {card.no}
                  </span>
                  <p>{card.statement}</p>
                </article>
              ))}
            </div>
            <div className="who-crumbs" data-reveal>
              <span>First Nations Action Network / 2026</span>
              <span>firstnationsaction.org</span>
            </div>
          </div>
        </section>

        {/* ============ SECTION 6 · HOW WE WORK ============ */}
        <section className="sec bg-cream who-work">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">How we work</span>
              <h2>
                Connect. Organise.{" "}
                <span className="em-action">Take Action.</span>
              </h2>
              <p className="lead">
                Community organising turns shared purpose into community power —
                and we provide the connection, tools and support to make it
                happen.
              </p>
            </div>
            <div className="cards3">
              {workCards.map((card, index) => (
                <article
                  key={card.title}
                  className="card-step"
                  data-reveal
                  data-delay={index ? String(index) : undefined}
                >
                  <span className="edge" />
                  <span className="step-no">{card.no}</span>
                  <div className="step-ico">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 7 · OUR TEAM ============ */}
        <section className="sec who-people">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Our Team</span>
              <h2>The People Behind the Network</h2>
              <p className="lead">
                A First Nations–led team of founders, creatives and ambassadors
                working across the country to connect communities and grow the
                Network.
              </p>
            </div>
            <div className="who-people-grid">
              {people.map((person, index) => (
                <article
                  key={person.name}
                  className="who-person"
                  data-reveal
                  data-delay={index % 3 ? String(index % 3) : undefined}
                >
                  <div className="who-person-photo">
                    <ImageSlot
                      src={person.image}
                      alt="Placeholder portrait of a network member"
                      note="Profile coming soon"
                      rounded={16}
                      sizes="(max-width: 900px) calc(100vw - 48px), 30vw"
                    />
                  </div>
                  <div className="who-person-body">
                    <h3>{person.name}</h3>
                    <span className="who-person-role">{person.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 8 · CLOSING CTA ============ */}
        <section className="sec final who-final">
          <div className="wrap">
            <span className="kicker on-dark centered" data-reveal>
              This is a peoples movement
            </span>
            <h2 data-reveal data-delay="1" style={{ marginTop: 20 }}>
              Real Change Happens When We Show Up{" "}
              <span className="em-action">Together.</span>
            </h2>
            <p data-reveal data-delay="2">
              Every connection made through the Network has the potential to
              strengthen leadership, amplify community voices and create lasting
              change.
            </p>
            <div className="actions" data-reveal data-delay="2">
              <Link href="/membership" className="btn btn-primary">
                Join the Network <Arrow />
              </Link>
              <Link href="/allyship" className="btn btn-ghost on-dark">
                Explore Allyship
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
