import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import LogoCarousel from "@/components/LogoCarousel";
import NewsletterPopup from "@/components/NewsletterPopup";
import { Tick, Arrow } from "@/components/icons";
import SupportCards from "@/components/SupportCards";
import { NetworkMap, parseNetworks } from "@/components/NetworkMap";
import {
  getActionNetworkActions,
  getActionNetworkEvents,
} from "@/lib/action-network";
import { dateParts, isPastEvent, sortEvents } from "@/lib/events";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are", spy: "#who" },
  { label: "Contribute", href: "#contributors" },
  { label: "Learn", href: "/learn", spy: "#learn" },
  { label: "Events", href: "/events", spy: "#events" },
  { label: "Directory", href: "/directory", spy: "#directory" },
];

/** Same data the map fetches, read here so the counts are server-rendered. */
async function readNetworks() {
  const file = path.join(process.cwd(), "public", "fnan-networks.json");
  return parseNetworks(JSON.parse(await readFile(file, "utf8")));
}

export default async function Home() {
  const networks = await readNetworks();
  const organisationCount = networks.reduce(
    (total, network) => total + network.organisations.length,
    0,
  );
  const eventFeed = await getActionNetworkEvents();
  const actionFeed = await getActionNetworkActions();
  const upcomingEvents = sortEvents(eventFeed.events)
    .filter((event) => !isPastEvent(event, new Date()))
    .slice(0, 3);

  return (
    <>
      <Nav
        brandHref="#top"
        links={navLinks}
        exploreHref="#allies"
        joinHref="/contributors"
      />

      <span id="top" />
      <main className="home-page">

        {/* ============ HERO ============ */}
        <header className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="kicker on-dark" data-reveal>
                A First Nations–led national network
              </span>
              <h1 data-reveal data-delay="1">
                Building Stronger Communities Through Connection, Collaboration and{" "}
                <span className="em-action">Action</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                The First Nations Action Network brings together First Nations and
                ally organisations across Australia to strengthen communities,
                grow leadership, share resources and create positive change
                through collective action.
              </p>
              <div className="hero-cta" data-reveal data-delay="2">
                <Link href="/contributors" className="btn btn-primary">
                  Join the Network <Arrow />
                </Link>
                <Link href="#allies" className="btn btn-ghost on-dark">
                  Explore Allyship
                </Link>
              </div>
            </div>
            <div className="hero-media" data-reveal data-delay="2">
              <div className="img-frame">
                <ImageSlot
                  src="/images/hero.webp"
                  alt="Community gathering with Elders and young leaders"
                  note="Community gathering · Elders and young leaders"
                  rounded={20}
                  sizes="(max-width: 980px) calc(100vw - 48px), 42vw"
                  preload
                />
              </div>
              <div className="hero-badge">
                <span className="num">10K+</span>
                <span className="lbl">
                  First Nations peoples and allies in the network
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Connected organisations · logo carousel */}
        <LogoCarousel />

        {/* ============ WHO WE ARE ============ */}
        <section id="who" className="sec">
          <div className="wrap split media-left">
            <div className="img-frame" data-reveal>
              <ImageSlot
                src="/images/who.webp"
                alt="Workshop circle with leaders in conversation"
                note="Workshop circle · leaders in conversation"
                rounded={18}
                sizes="(max-width: 900px) calc(100vw - 48px), 50vw"
              />
            </div>
            <div data-reveal data-delay="1">
              <span className="kicker">Who we are</span>
              <h2 style={{ fontSize: "clamp(32px,3.8vw,48px)", marginTop: 18 }}>
                A National Network Supporting Community-Led Change
              </h2>
              <div className="body" style={{ marginTop: 24 }}>
                <p>
                  Communities are strongest when people come together with a
                  shared purpose.
                </p>
                <p>
                  The First Nations Action Network supports organisations,
                  community leaders and allies by providing opportunities to
                  connect, learn, collaborate and take action together.
                </p>
                <p>
                  Through community organising, leadership development and shared
                  resources, we help build stronger foundations for lasting
                  impact.
                </p>
              </div>
              <div className="pillars">
                <div className="pill">
                  <h4>Connect</h4>
                  <p>A growing community of organisations and allies.</p>
                </div>
                <div className="pill">
                  <h4>Grow</h4>
                  <p>Leadership and capacity that lasts.</p>
                </div>
                <div className="pill">
                  <h4>Act</h4>
                  <p>Shared resources driving impact for change.</p>
                </div>
              </div>
              <div className="actions" style={{ marginTop: 28 }}>
                <Link href="/who-we-are" className="btn btn-ghost">
                  Explore Who We Are <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHY IT MATTERS ============ */}
        <section id="why" className="sec bg-cream">
          <div className="wrap why-grid">
            <div data-reveal>
              <span className="kicker">Why it matters</span>
              <h2 style={{ fontSize: "clamp(32px,3.8vw,48px)", marginTop: 18 }}>
                Strong Communities Create Lasting Change
              </h2>
              <div className="body" style={{ marginTop: 24 }}>
                <p>
                  Across Australia, community groups are working hard to support
                  their people, strengthen culture, advocate for change and create
                  opportunities for future generations.
                </p>
              </div>
              <p className="why-statement">
                The Network helps organisations turn shared challenges into{" "}
                <em>shared strength</em> — through support, connection and
                practical tools.
              </p>
            </div>
            <div data-reveal data-delay="1">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--grey)",
                  marginBottom: 8,
                }}
              >
                The challenges many face
              </p>
              <ul className="challenge-list">
                {(
                  [
                    ["01", "Limited capacity", "Doing more with fewer hands and hours."],
                    ["02", "Volunteer burnout", "Sustaining the people who hold communities together."],
                    ["03", "Disconnected supporters", "Keeping people engaged between moments of action."],
                    ["04", "Limited access to resources", "Tools, training and funding that are hard to reach."],
                    ["05", "Difficulty sustaining momentum", "Turning a campaign into lasting change."],
                    ["06", "First Nations engagement", "Culturally appropriate touch points."],
                  ] as const
                ).map(([n, t, d]) => (
                  <li key={n}>
                    <span className="cn">{n}</span>
                    <span>
                      <span className="ct">{t}</span>
                      <div className="cd">{d}</div>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">How we work</span>
              <h2>
                Connect. Organise. <span className="em-action">Take Action.</span>
              </h2>
              <p className="lead">
                Community organising turns shared purpose into community power —
                and we provide the connection, tools and support to make it
                happen.
              </p>
            </div>
            <div className="cards3">
              <article className="card-step" data-reveal>
                <span className="edge" />
                <span className="step-no">01 — Connect</span>
                <div className="step-ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="7" r="3" />
                    <circle cx="17" cy="10" r="2.4" />
                    <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
                    <path d="M15.5 19c0-2 1.3-3.4 3.2-3.4S22 17 22 19" />
                  </svg>
                </div>
                <h3>Connect</h3>
                <p>
                  We bring First Nations communities, organisations and allies
                  together, building relationships and a shared sense of purpose
                  across Australia.
                </p>
              </article>
              <article className="card-step" data-reveal data-delay="1">
                <span className="edge" />
                <span className="step-no">02 — Organise</span>
                <div className="step-ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h10" />
                    <circle cx="19" cy="18" r="2.4" />
                  </svg>
                </div>
                <h3>Organise</h3>
                <p>
                  Community organising is about people coming together to build
                  power and act on the issues that matter to them. We share the
                  tools, training and support to make that possible.
                </p>
              </article>
              <article className="card-step" data-reveal data-delay="2">
                <span className="edge" />
                <span className="step-no">03 — Take Action</span>
                <div className="step-ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
                  </svg>
                </div>
                <h3>Take Action</h3>
                <p>
                  Through Action Network and hands-on support, communities run
                  campaigns, host events and turn shared purpose into lasting,
                  local impact.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ============ CONTRIBUTORS ============ */}
        <section id="contributors" className="sec bg-cream">
          <div className="wrap">
            <div className="sec-head" data-reveal style={{ marginBottom: 46 }}>
              <span className="kicker">Contributors</span>
              <h2>Join a Network That Helps Communities Thrive</h2>
              <p className="lead">
                Become a Contributor and gain access to community organising
                support, leadership development opportunities, shared resources and
                national collaboration.
              </p>
            </div>
            <div className="member" data-reveal data-delay="1">
              <div className="m-img">
                <ImageSlot
                  src="/images/membership.webp"
                  alt="Contributors at a network gathering"
                  note="Contributors at a network gathering"
                  sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
                />
              </div>
              <div className="m-body">
                <span className="kicker">What contributors receive</span>
                <h2>Everything you need to organise and lead</h2>
                <ul className="benefits">
                  {[
                    "Community Organising Support",
                    "Leadership Development",
                    "National Collaboration",
                    "Community Engagement Tools",
                    "Shared Resources",
                    "Learning and Development Opportunities",
                  ].map((b) => (
                    <li key={b}>
                      <span className="tick">
                        <Tick />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="actions">
                  <Link href="/contributors" className="btn btn-primary">
                    Become a Contributor <Arrow />
                  </Link>
                  <Link href="/contact" className="textlink">
                    Book a conversation <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TRAINING ============ */}
        <section id="learn" className="sec">
          <div className="wrap split">
            <div data-reveal>
              <span className="kicker">Learning and development</span>
              <h2 style={{ fontSize: "clamp(32px,3.8vw,46px)", marginTop: 18 }}>
                Learning Through Experience. Leading Through Understanding.
              </h2>
              <div className="body" style={{ marginTop: 24 }}>
                <p>
                  Our learning and development programs support organisations,
                  businesses and government agencies seeking to build stronger
                  relationships with First Nations communities through practical
                  learning and meaningful engagement.
                </p>
              </div>
              <div className="chips">
                <span className="chip">First Nations Engagement</span>
                <span className="chip">Cultural Responsiveness</span>
                <span className="chip">Campaign Development</span>
                <span className="chip">Community Organising</span>
                <span className="chip">Leadership Development</span>
              </div>
              <div className="actions">
                <Link href="/learn" className="btn btn-ghost">
                  Explore Learning <Arrow />
                </Link>
              </div>
            </div>
            <div data-reveal data-delay="1">
              <div className="img-frame">
                <ImageSlot
                  src="/images/training.webp"
                  alt="Facilitated session on Country"
                  note="Facilitated session on Country"
                  rounded={18}
                  sizes="(max-width: 900px) calc(100vw - 48px), 50vw"
                />
              </div>
              <div className="train-stat">
                <div>
                  <div className="s-num">5</div>
                  <div className="s-lbl">core learning pathways</div>
                </div>
                <div>
                  <div className="s-num">100%</div>
                  <div className="s-lbl">First Nations-led &amp; designed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FIRST NATIONS ALLIES ============ */}
        <section id="allies" className="sec allies">
          <div className="wrap allies-grid">
            <div data-reveal>
              <span className="kicker on-dark">First Nations Allies</span>
              <h2 style={{ marginTop: 18 }}>
                Walk <span className="em-action">Alongside</span> Community
              </h2>
              <p className="body">
                First Nations Allies is a growing community of individuals,
                organisations and businesses committed to building respectful
                relationships and supporting positive outcomes for First Nations
                peoples.
              </p>
              <p className="pull">
                Being an ally is more than a statement. It is an ongoing commitment
                to <b>learning, listening and taking action.</b>
              </p>
              <div className="ally-tags">
                <span>Individuals</span>
                <span>Organisations</span>
                <span>Businesses</span>
                <span>Community supporters</span>
              </div>
              <div className="actions">
                <Link href="/allyship" className="btn btn-primary">
                  Learn About First Nations Allies <Arrow />
                </Link>
              </div>
            </div>
            <div className="a-img" data-reveal data-delay="1">
              <ImageSlot
                src="/images/allies.webp"
                alt="Allies and community together"
                note="Allies & community together"
                rounded={16}
                sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
              />
            </div>
          </div>
        </section>

        {/* ============ SUPPORT THE MOVEMENT ============ */}
        <section id="support" className="sec bg-cream">
          <div className="wrap">
            <div className="support-head" data-reveal>
              <span className="kicker centered">Support the movement</span>
              <h2>
                Support Community-Led <span className="em-action">Action</span>{" "}
                Across Australia
              </h2>
              <p className="lead">
                The First Nations Action Network is powered by people who believe
                in stronger communities, stronger relationships and meaningful
                action. Your support helps strengthen community organising,
                leadership development, educational resources, events and advocacy
                initiatives.
              </p>
            </div>
            <SupportCards />
          </div>
        </section>

        {/* ============ COMMUNITY STORIES ============ */}
        <section id="stories" className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Community stories</span>
              <h2>Communities Leading Change</h2>
              <p className="lead">
                Across Australia, community groups are creating positive outcomes
                through leadership, collaboration and local action. Discover the
                stories, initiatives and projects strengthening communities.
              </p>
            </div>
            <div className="story-grid">
              <article className="story-card" data-reveal>
                <ImageSlot
                  src="/images/story1.webp"
                  alt="Young leaders stepping forward"
                  sizes="(max-width: 880px) calc(100vw - 48px), 31vw"
                />
                <div className="s-body">
                  <span className="s-tag">Leadership</span>
                  <h3>Young leaders stepping forward</h3>
                  <p>
                    A regional youth program turning emerging voices into community
                    organisers and decision-makers.
                  </p>
                  <span className="more">
                    Read the story <span>→</span>
                  </span>
                </div>
              </article>
              <article className="story-card" data-reveal data-delay="1">
                <ImageSlot
                  src="/images/story2.webp"
                  alt="Many groups, one shared campaign"
                  sizes="(max-width: 880px) calc(100vw - 48px), 31vw"
                />
                <div className="s-body">
                  <span className="s-tag">Collaboration</span>
                  <h3>Many groups, one shared campaign</h3>
                  <p>
                    How neighbouring organisations pooled resources to sustain
                    momentum and reach more people.
                  </p>
                  <span className="more">
                    Read the story <span>→</span>
                  </span>
                </div>
              </article>
              <article className="story-card" data-reveal data-delay="2">
                <ImageSlot
                  src="/images/story3.webp"
                  alt="Culture at the centre of change"
                  sizes="(max-width: 880px) calc(100vw - 48px), 31vw"
                />
                <div className="s-body">
                  <span className="s-tag">Local action</span>
                  <h3>Culture at the centre of change</h3>
                  <p>
                    A community-led initiative strengthening connection to culture
                    while creating lasting local impact.
                  </p>
                  <span className="more">
                    Read the story <span>→</span>
                  </span>
                </div>
              </article>
            </div>
            <div className="quote-band" data-reveal>
              <div className="qmark">“</div>
              <div>
                <blockquote>
                  When communities organise together, the change we create belongs
                  to everyone — and it lasts.
                </blockquote>
                <p className="qby">
                  A community leader in the Network
                  <span>
                    Shared with permission · representative of contributor voices
                  </span>
                </p>
              </div>
            </div>
            <div style={{ marginTop: 40 }} data-reveal>
              <Link href="/stories" className="btn btn-ghost">
                Read Community Stories <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ EVENTS ============ */}
        <section id="events" className="sec bg-cream">
          <div className="wrap">
            <div className="events-head" data-reveal>
              <div className="sec-head" style={{ margin: 0 }}>
                <span className="kicker">Events</span>
                <h2>Bringing Communities Together</h2>
                <p className="lead" style={{ marginTop: 18 }}>
                  Workshops, forums and gatherings designed to strengthen
                  relationships, build capacity and support collaboration.
                </p>
              </div>
              <Link href="/events" className="textlink">
                View Upcoming Events <Arrow />
              </Link>
            </div>
            <div className="events-list">
              {upcomingEvents.map((event, index) => {
                const { day, month } = dateParts(event.date);
                return (
                  <div
                    key={event.id}
                    className="ev-row"
                    data-reveal
                    data-delay={index ? String(index) : undefined}
                  >
                    <div className="ev-date">
                      <div className="d">{day}</div>
                      <div className="m">{month}</div>
                    </div>
                    <div className="ev-main">
                      <div className="ev-type">
                        {event.type} · {event.format}
                      </div>
                      <h3>{event.title}</h3>
                      <div className="ev-loc">
                        {event.location} · {event.time}
                      </div>
                    </div>
                    <a
                      href={event.registrationUrl}
                      className="ev-cta"
                      target="_blank"
                      rel="noopener"
                      aria-label={`Register for ${event.title} on Action Network (opens in a new tab)`}
                    >
                      Register <span>→</span>
                    </a>
                  </div>
                );
              })}
              {!upcomingEvents.length ? (
                <div className="home-events-empty" role="status">
                  <strong>No events yet. Stay tuned!</strong>
                  <span>
                    Join the Network to hear about future workshops, forums and
                    community gatherings.
                  </span>
                  <Link href="/contributors" className="textlink">
                    Join the Network <Arrow />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ============ TAKE ACTION ============ */}
      <section id="take-action" className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="kicker">Take action</span>
            <h2>
              Add Your <span className="em-action">Voice</span>
            </h2>
            <p className="lead">
              Sign open petitions and share your views through community
              surveys — every voice strengthens the movement.
            </p>
          </div>
          {actionFeed.actions.length ? (
            <div className="action-list">
              {actionFeed.actions.map((action, index) => (
                <a
                  key={action.id}
                  href={action.actionUrl}
                  className="action-row"
                  target="_blank"
                  rel="noopener"
                  data-reveal
                  data-delay={index ? String(Math.min(index, 3)) : undefined}
                  aria-label={`${
                    action.kind === "Petition" ? "Sign" : "Respond to"
                  } ${action.title} on Action Network (opens in a new tab)`}
                >
                  <span
                    className={`action-tag action-tag-${action.kind.toLowerCase()}`}
                  >
                    {action.kind}
                  </span>
                  <span className="action-main">
                    <h3>{action.title}</h3>
                    {action.supporterCount ? (
                      <span className="action-meta">
                        {action.supporterCount.toLocaleString()}{" "}
                        {action.kind === "Petition" ? "signatures" : "responses"}
                      </span>
                    ) : null}
                  </span>
                  <span className="action-cta">
                    {action.kind === "Petition" ? "Sign" : "Respond"}{" "}
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="home-events-empty" role="status">
              <strong>Nothing open right now — stay tuned.</strong>
              <span>
                Join the Network to hear about new petitions, surveys and ways
                to take action.
              </span>
              <Link href="/contributors" className="textlink">
                Join the Network <Arrow />
              </Link>
            </div>
          )}
        </div>
      </section>

        {/* ============ COMMUNITY DIRECTORY ============ */}
        <section id="directory" className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Community directory</span>
              <h2>
                Find the Network <span className="em-action">Near You</span>
              </h2>
              <p className="lead">
                State and territory networks connect organisations, groups and
                initiatives working to strengthen communities across Australia.
                Click a state on the map to see who is organising there.
              </p>
            </div>
          </div>

          {/* Live state-network map. Hover a pin for that network's
              organisations; click to zoom into the state. */}
          <NetworkMap height="min(62vh, 540px)" showLegend={false} />

          <div className="wrap">
            <div className="dir-highlight-foot" data-reveal>
              <dl className="dir-highlight-stats">
                <div>
                  <dt>State and territory networks</dt>
                  <dd>{networks.length}</dd>
                </div>
                <div>
                  <dt>Organisations listed</dt>
                  <dd>{organisationCount}</dd>
                </div>
              </dl>
              <Link href="/directory" className="btn btn-ghost">
                Explore the Directory <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section id="join" className="sec final">
          <div className="wrap">
            <span className="kicker on-dark centered" data-reveal>
              Join the movement
            </span>
            <h2 data-reveal data-delay="1" style={{ marginTop: 20 }}>
              Stronger Communities Start With Stronger{" "}
              <span className="em-action">Connections</span>
            </h2>
            <p data-reveal data-delay="2">
              Join a growing network of First Nations and ally organisations
              working together to build stronger communities, grow leadership
              and create positive change.
            </p>
            <div className="actions" data-reveal data-delay="2">
              <Link href="/contributors" className="btn btn-primary">
                Join the Network <Arrow />
              </Link>
              <Link href="/contact" className="btn btn-ghost on-dark">
                Start the Conversation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <NewsletterPopup />
    </>
  );
}
