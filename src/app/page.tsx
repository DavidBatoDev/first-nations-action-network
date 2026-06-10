import Link from "next/link";
import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import LogoCarousel from "@/components/LogoCarousel";
import { Tick, Arrow } from "@/components/icons";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "#who" },
  { label: "Contribute", href: "#membership" },
  { label: "Learn", href: "#training" },
  { label: "Events", href: "#events" },
  { label: "Directory", href: "#resources" },
];

export default function Home() {
  return (
    <>
      <Nav
        brandHref="#top"
        links={navLinks}
        exploreHref="#allies"
        joinHref="/membership"
      />

      <span id="top" />

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
              develop leadership, share resources and create positive change
              through collective action.
            </p>
            <div className="hero-cta" data-reveal data-delay="2">
              <Link href="/membership" className="btn btn-primary">
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
                <h4>Develop</h4>
                <p>Leadership and capacity that lasts.</p>
              </div>
              <div className="pill">
                <h4>Act</h4>
                <p>Shared resources driving impact for change.</p>
              </div>
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
            <span className="kicker">How the network works</span>
            <h2>
              Connect. Organise. <span className="em-action">Take Action.</span>
            </h2>
            <p className="lead">
              Three simple ways the Network turns shared purpose into community
              power.
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
                Become part of a growing network of First Nations and ally
                organisations committed to creating positive change.
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
                Access training, resources and community organising support that
                helps strengthen engagement and participation.
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
                Build campaigns, host events, develop leaders and create
                meaningful impact in your community.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ MEMBERSHIP ============ */}
      <section id="membership" className="sec bg-cream">
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
                alt="Members at a network gathering"
                note="Members at a network gathering"
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
                <Link href="/membership" className="btn btn-primary">
                  Become a Contributor <Arrow />
                </Link>
                <Link href="#contact" className="textlink">
                  Book a conversation <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRAINING ============ */}
      <section id="training" className="sec">
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
              <Link href="#contact" className="btn btn-ghost">
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
              <Link href="#join" className="btn btn-primary">
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
          <div className="support-grid">
            {/* Donation */}
            <article className="support-card" data-reveal>
              <div className="sc-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/support-group.png"
                  alt="Community members and an ally wearing First Nations Action Network merchandise, smiling together"
                />
              </div>
              <div className="sc-body">
                <div className="sc-head">
                  <span className="sc-icon sc-icon-yellow">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
                    </svg>
                  </span>
                  <div>
                    <h3>Make a Donation</h3>
                    <p className="sc-sub">Help keep the work moving</p>
                  </div>
                </div>
                <p className="sc-copy">
                  Every contribution supports practical community organising,
                  leadership development and advocacy work that strengthens
                  communities across Australia.
                </p>
                <ul className="sc-bullets">
                  {[
                    "Community organising",
                    "Educational resources",
                    "Leadership development",
                    "Advocacy initiatives",
                    "Community events",
                  ].map((b) => (
                    <li key={b}>
                      <span className="tick">
                        <Tick size={12} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="#" className="btn btn-primary sc-cta">
                  Make a Donation <Arrow />
                </a>
              </div>
            </article>
            {/* Merchandise */}
            <article className="support-card" data-reveal data-delay="1">
              <div className="sc-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/support-merch.png"
                  alt="Two people seen from behind wearing First Nations Action Network and First Nations Allies merchandise at a community gathering"
                />
              </div>
              <div className="sc-body">
                <div className="sc-head">
                  <span className="sc-icon sc-icon-ochre">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3 4 6l2.5 3L8 8v13h8V8l1.5 1L20 6l-4-3-1.8 1.4a3 3 0 0 1-4.4 0z" />
                    </svg>
                  </span>
                  <div>
                    <h3>Shop</h3>
                    <p className="sc-sub">Wear your values</p>
                  </div>
                </div>
                <p className="sc-copy">
                  Wear your values and help grow the movement through First
                  Nations Action Network and First Nations Allies merchandise.
                  Every purchase supports the work.
                </p>
                <div className="merch-row">
                  <figure className="merch-item">
                    <div className="m-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/merch-fnan-tee.jpg" alt="First Nations Action Network black t-shirt" />
                    </div>
                  </figure>
                  <figure className="merch-item">
                    <div className="m-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/merch-hoodie.jpg" alt="First Nations Action Network black zip hoodie" />
                    </div>
                  </figure>
                  <figure className="merch-item">
                    <div className="m-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/merch-allies-tee.jpg" alt="First Nations Allies white t-shirt" />
                    </div>
                  </figure>
                </div>
                <a href="#" className="btn btn-ochre sc-cta">
                  Support the Network <Arrow />
                </a>
              </div>
            </article>
          </div>
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
              <ImageSlot src="/images/story1.webp" alt="Young leaders stepping forward" />
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
              <ImageSlot src="/images/story2.webp" alt="Many groups, one shared campaign" />
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
              <ImageSlot src="/images/story3.webp" alt="Culture at the centre of change" />
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
                  Shared with permission · representative of member voices
                </span>
              </p>
            </div>
          </div>
          <div style={{ marginTop: 40 }} data-reveal>
            <a href="#" className="btn btn-ghost">
              Read Community Stories <Arrow />
            </a>
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
            <a href="#" className="textlink">
              View Upcoming Events <Arrow />
            </a>
          </div>
          <div className="events-list">
            <div className="ev-row" data-reveal>
              <div className="ev-date">
                <div className="d">12</div>
                <div className="m">Jul</div>
              </div>
              <div className="ev-main">
                <div className="ev-type">Workshop · In person</div>
                <h3>Community Organising Foundations</h3>
                <div className="ev-loc">Naarm / Melbourne · 9:30am–3:00pm</div>
              </div>
              <a href="#" className="ev-cta">
                Register <span>→</span>
              </a>
            </div>
            <div className="ev-row" data-reveal>
              <div className="ev-date">
                <div className="d">29</div>
                <div className="m">Jul</div>
              </div>
              <div className="ev-main">
                <div className="ev-type">Online forum</div>
                <h3>Leadership in Practice: A National Conversation</h3>
                <div className="ev-loc">Online · 1:00pm–2:30pm AEST</div>
              </div>
              <a href="#" className="ev-cta">
                Register <span>→</span>
              </a>
            </div>
            <div className="ev-row" data-reveal>
              <div className="ev-date">
                <div className="d">14</div>
                <div className="m">Aug</div>
              </div>
              <div className="ev-main">
                <div className="ev-type">Gathering · In person</div>
                <h3>First Nations Allies Yarning Circle</h3>
                <div className="ev-loc">Meanjin / Brisbane · 10:00am–1:00pm</div>
              </div>
              <a href="#" className="ev-cta">
                Register <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RESOURCES ============ */}
      <section id="resources" className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="kicker">Resources</span>
            <h2>Shared Learning and Resources</h2>
            <p className="lead">
              Access articles, guides, tools and educational resources developed
              to support community leaders, organisations and changemakers.
            </p>
          </div>
          <div className="res-grid">
            <article className="res-card" data-reveal>
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h13v15H6a2 2 0 0 1-2-2z" />
                  <path d="M17 5h3v13a2 2 0 0 1-2 2" />
                  <path d="M8 9h6M8 13h6" />
                </svg>
              </div>
              <span className="r-cat">Guide</span>
              <h3>Starting a Community Campaign</h3>
              <p>
                A practical, step-by-step guide to planning and launching a
                campaign that builds momentum.
              </p>
              <span className="more">
                Open guide <span>→</span>
              </span>
            </article>
            <article className="res-card" data-reveal data-delay="1">
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19V6a2 2 0 0 1 2-2h8l6 6v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                  <path d="M14 4v6h6" />
                </svg>
              </div>
              <span className="r-cat">Article</span>
              <h3>Why Connection Sustains Change</h3>
              <p>
                Reflections on how relationships and belonging keep communities
                engaged for the long term.
              </p>
              <span className="more">
                Read article <span>→</span>
              </span>
            </article>
            <article className="res-card" data-reveal data-delay="2">
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z" />
                </svg>
              </div>
              <span className="r-cat">Tool</span>
              <h3>Engagement Planning Template</h3>
              <p>
                A ready-to-use template to map supporters, plan outreach and
                track community participation.
              </p>
              <span className="more">
                Download tool <span>→</span>
              </span>
            </article>
          </div>
          <div style={{ marginTop: 40 }} data-reveal>
            <a href="#" className="btn btn-ghost">
              Explore Resources <Arrow />
            </a>
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
            working together to build stronger communities, develop leadership
            and create positive change.
          </p>
          <div className="actions" data-reveal data-delay="2">
            <Link href="/membership" className="btn btn-primary">
              Join the Network <Arrow />
            </Link>
            <Link href="#contact" className="btn btn-ghost on-dark">
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
