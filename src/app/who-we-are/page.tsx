import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow } from "@/components/icons";

const WHO_DESCRIPTION =
  "The First Nations Action Network is a First Nations-led national network connecting communities, organisations and allies through shared learning, collective action and practical support.";

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
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
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
    copy: "Local efforts connected into something larger: a national network organising for change while acting locally.",
  },
  {
    title: "The Network Today",
    copy: "Today the First Nations Action Network connects communities, organisations and allies across Australia in ongoing collective action.",
  },
];

const beliefCards = [
  {
    no: "01",
    title: "Core Values",
    items: ["Listening", "Connection", "Story", "Community"],
  },
  {
    no: "02",
    title: "Strategic Approach",
    items: [
      "First Nations Self-Determination",
      "First Nations Self-Autonomy",
      "Economic Independence",
      "Community organising",
      "Community Wellbeing",
    ],
  },
  {
    no: "03",
    title: "Mottos",
    items: [
      "\u201CThis is a people\u2019s movement.\u201D",
      "\u201CEverything we do empowers each other and community.\u201D",
      "\u201CThink federally, act locally.\u201D",
    ],
  },
];

const workCards = [
  {
    no: "01 — Connect",
    title: "Connect",
    copy: "We bring First Nations communities, organisations and allies together, building relationships and a shared sense of purpose across Australia.",
  },
  {
    no: "02 — Organise",
    title: "Organise",
    copy: "Community organising is about people coming together to build power and act on the issues that matter to them. We share the tools, training and support to make that possible.",
  },
  {
    no: "03 — Take Action",
    title: "Take Action",
    copy: "Through Action Network and hands-on support, communities run campaigns, host events and turn shared purpose into lasting, local impact.",
  },
];

const people = [
  {
    image: "/images/story1.webp",
    name: "Community Leader",
    role: "Network Convenor",
    nation: "Nation / Community",
  },
  {
    image: "/images/membership.webp",
    name: "Community Leader",
    role: "Community Organiser",
    nation: "Nation / Community",
  },
  {
    image: "/images/training.webp",
    name: "Community Leader",
    role: "Learning & Development",
    nation: "Nation / Community",
  },
  {
    image: "/images/story2.webp",
    name: "Community Leader",
    role: "Ally & Partnerships",
    nation: "Nation / Community",
  },
  {
    image: "/images/allies.webp",
    name: "Community Leader",
    role: "Events & Gatherings",
    nation: "Nation / Community",
  },
  {
    image: "/images/story3.webp",
    name: "Community Leader",
    role: "Community Voice",
    nation: "Nation / Community",
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
                The First Nations Action Network is a First Nations–led national
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

        {/* ============ SECTION 2 · VISION & PURPOSE ============ */}
        <section className="sec who-vision">
          <div className="wrap who-vision-grid">
            <div className="who-vision-copy" data-reveal>
              <div className="who-statement">
                <span className="who-vision-head">Our Vision</span>
                <p>
                  Strong communities creating lasting change — a future where
                  First Nations communities across Australia are connected,
                  supported and leading change on their own terms.
                </p>
              </div>
              <div className="who-statement">
                <span className="who-vision-head">Our Purpose</span>
                <p>
                  To help organisations, community leaders and allies connect,
                  organise and take action together — sharing knowledge,
                  resources and support so no community has to do this work
                  alone.
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

        {/* ============ SECTION 3 · OUR STORY ============ */}
        <section className="sec bg-cream who-story">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Our story</span>
              <h2>From Conversations to a National Network</h2>
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

        {/* ============ SECTION 4 · WHAT WE BELIEVE ============ */}
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
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="who-crumbs" data-reveal>
              <span>First Nations Action Network / 2026</span>
              <span>firstnationsaction.org</span>
            </div>
          </div>
        </section>

        {/* ============ SECTION 5 · HOW WE WORK ============ */}
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
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 6 · MEET THE PEOPLE ============ */}
        <section className="sec who-people">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Meet the people</span>
              <h2>The People Behind the Network</h2>
              <p className="lead">
                A First Nations–led community of leaders, organisers and allies.
                Profiles are being gathered — real stories and photos will be
                shared here with permission.
              </p>
            </div>
            <div className="who-people-grid">
              {people.map((person, index) => (
                <article
                  key={`${person.role}-${index}`}
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
                      sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1040px) 44vw, 30vw"
                    />
                  </div>
                  <div className="who-person-body">
                    <h3>{person.name}</h3>
                    <span className="who-person-role">{person.role}</span>
                    <span className="who-person-nation">{person.nation}</span>
                    <p>
                      A short bio will introduce this member — their community,
                      their work and what the Network means to them.
                    </p>
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
              This is a people&rsquo;s movement
            </span>
            <h2 data-reveal data-delay="1" style={{ marginTop: 20 }}>
              It Needs People Like{" "}
              <span className="em-action">You.</span>
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
