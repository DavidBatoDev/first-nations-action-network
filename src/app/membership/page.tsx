import type { Metadata } from "next";
import Link from "next/link";
import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import { Tick, Arrow } from "@/components/icons";

const MEMBERSHIP_DESCRIPTION =
  "Join a national network building stronger communities. Membership connects First Nations and ally organisations across Australia through shared resources, community organising tools and collective action.";

export const metadata: Metadata = {
  title: "Membership",
  description: MEMBERSHIP_DESCRIPTION,
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "Membership · First Nations Action Network",
    description: MEMBERSHIP_DESCRIPTION,
    url: "/membership",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
  { label: "FAQ", href: "#faq" },
];

export default function Membership() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="#pricing"
      />

      <span id="top" />

      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="crumb" data-reveal>
              <Link href="/">Home</Link> <span className="sep">/</span>{" "}
              Membership
            </span>
            <span className="kicker on-dark" data-reveal>
              Membership
            </span>
            <h1 data-reveal data-delay="1">
              Join A National Network Building Stronger{" "}
              <span className="em-action">Communities</span>
            </h1>
            <p className="lead" data-reveal data-delay="2">
              The First Nations Action Network brings together organisations
              across Australia to strengthen communities, increase participation
              and create positive change through collaboration, shared learning
              and collective action.
            </p>
            <div className="hero-cta" data-reveal data-delay="2">
              <Link href="#pricing" className="btn btn-primary">
                Join The Network <Arrow />
              </Link>
              <Link href="#benefits" className="btn btn-ghost on-dark">
                See What&rsquo;s Included
              </Link>
            </div>
            <div className="hero-trust" data-reveal data-delay="3">
              <span className="dot" /> First Nations &amp; ally organisations
              <span className="dot" /> Community-led
              <span className="dot" /> Nationwide
            </div>
          </div>
          <div className="hero-media" data-reveal data-delay="2">
            <div className="img-frame">
              <ImageSlot
                src="/images/membership.webp"
                alt="Community leaders and organisations together"
                note="Community leaders & organisations together"
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

      {/* ============ YOU DON'T HAVE TO DO THIS ALONE ============ */}
      <section className="sec bg-cream">
        <div className="wrap why-grid">
          <div data-reveal>
            <span className="kicker">The challenge</span>
            <h2 style={{ fontSize: "clamp(32px,3.8vw,48px)", marginTop: 18 }}>
              You Don&rsquo;t Have To Do This Work Alone
            </h2>
            <div
              className="body"
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "#403a32",
                maxWidth: "52ch",
                marginTop: 24,
              }}
            >
              <p>
                Across Australia, organisations are doing important work in their
                communities.
              </p>
            </div>
            <p className="why-statement">
              The First Nations Action Network exists to help organisations
              overcome these challenges through{" "}
              <em>connection, collaboration and shared opportunities.</em>
            </p>
          </div>
          <div className="why-side" data-reveal data-delay="1">
            <p className="label">Many face similar challenges</p>
            <ul className="challenge-list">
              {(
                [
                  ["01", "Limited capacity"],
                  ["02", "Volunteer burnout"],
                  ["03", "Community disengagement"],
                  ["04", "Limited visibility"],
                  ["05", "Difficulty reaching new audiences"],
                  ["06", "Difficulty maintaining momentum"],
                ] as const
              ).map(([n, t]) => (
                <li key={n}>
                  <span className="cn">{n}</span>
                  <span className="ct">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ BENEFIT CARDS ============ */}
      <section id="benefits" className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="kicker">Membership benefits</span>
            <h2>
              Membership That Strengthens Community{" "}
              <span className="em-action">Impact</span>
            </h2>
            <p className="lead">
              Six ways being part of the Network helps your organisation reach
              further and do more — together.
            </p>
          </div>
          <div className="benefit-grid">
            <article className="benefit-card" data-reveal>
              <span className="edge" />
              <div className="b-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="17" cy="10" r="2.4" />
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
                  <path d="M15.5 19c0-2 1.3-3.4 3.2-3.4S22 17 22 19" />
                </svg>
              </div>
              <h3>Connect</h3>
              <p>Build relationships with organisations across Australia.</p>
            </article>
            <article className="benefit-card" data-reveal data-delay="1">
              <span className="edge" />
              <div className="b-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" />
                  <path d="M16 9a3.5 3.5 0 0 1 0 6" />
                  <path d="M19 6.5a7 7 0 0 1 0 11" />
                </svg>
              </div>
              <h3>Amplify</h3>
              <p>Increase visibility for your stories, events and initiatives.</p>
            </article>
            <article className="benefit-card" data-reveal data-delay="2">
              <span className="edge" />
              <div className="b-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <path d="M9 7h6M9 11h6M9 15h3" />
                </svg>
              </div>
              <h3>Organise</h3>
              <p>
                Access tools that support engagement, participation and community
                action.
              </p>
            </article>
            <article className="benefit-card" data-reveal>
              <span className="edge" />
              <div className="b-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5C9 3 5 3 3 4v14c2-1 6-1 9 1 3-2 7-2 9-1V4c-2-1-6-1-9 1z" />
                  <path d="M12 5v15" />
                </svg>
              </div>
              <h3>Learn</h3>
              <p>Access resources, guidance and shared learning.</p>
            </article>
            <article className="benefit-card" data-reveal data-delay="1">
              <span className="edge" />
              <div className="b-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 13l-2.5 2.5a3 3 0 0 0 4.2 4.2L12 17.5" />
                  <path d="M16 11l2.5-2.5a3 3 0 0 0-4.2-4.2L12 6.5" />
                  <path d="M9 15l6-6" />
                </svg>
              </div>
              <h3>Collaborate</h3>
              <p>Discover opportunities to work with other organisations.</p>
            </article>
            <article className="benefit-card" data-reveal data-delay="2">
              <span className="edge" />
              <div className="b-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l5-5 4 4 8-8" />
                  <path d="M16 4h5v5" />
                </svg>
              </div>
              <h3>Grow</h3>
              <p>
                Strengthen leadership, participation and community engagement.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ AMPLIFY / CONTENT FLOW ============ */}
      <section className="sec bg-cream">
        <div className="wrap amplify-grid">
          <div data-reveal>
            <span className="kicker">Visibility</span>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 18 }}>
              Help More People Discover Your Work
            </h2>
            <div
              className="body"
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "#403a32",
                maxWidth: "50ch",
                marginTop: 22,
              }}
            >
              <p>
                Membership provides opportunities to publish stories, promote
                events and share community initiatives through the First Nations
                Action Network ecosystem.
              </p>
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--grey)",
                marginTop: 34,
              }}
            >
              Members may submit
            </p>
            <ul className="submit-types">
              <li>
                <span className="dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19V6a2 2 0 0 1 2-2h8l6 6v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                  </svg>
                </span>
                Community stories
              </li>
              <li>
                <span className="dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4" />
                  </svg>
                </span>
                Event announcements
              </li>
              <li>
                <span className="dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" />
                    <path d="M17 9a3.5 3.5 0 0 1 0 6" />
                  </svg>
                </span>
                Campaign updates
              </li>
              <li>
                <span className="dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 21h8M12 17v4M6 4h12v6a6 6 0 0 1-12 0z" />
                    <path d="M6 6H4a2 2 0 0 0 2 4M18 6h2a2 2 0 0 1-2 4" />
                  </svg>
                </span>
                Community achievements
              </li>
              <li>
                <span className="dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                Opinion pieces
              </li>
              <li>
                <span className="dot">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="15" height="14" rx="2" />
                    <path d="M17 9l5-3v12l-5-3z" />
                  </svg>
                </span>
                Webinar recordings
              </li>
            </ul>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "#403a32",
                marginTop: 30,
                maxWidth: "46ch",
              }}
            >
              Increase awareness of your work and reach audiences{" "}
              <b style={{ color: "var(--ink)" }}>
                beyond your immediate community
              </b>
              .
            </p>
          </div>
          <div data-reveal data-delay="1">
            <div className="flow">
              <div className="flow-node">
                <span className="fn-step s-cream">1</span>
                <span className="fn-text">
                  <h4>Submit</h4>
                  <p>Share your story, event or update.</p>
                </span>
              </div>
              <div className="flow-connector" />
              <div className="flow-node">
                <span className="fn-step s-cream">2</span>
                <span className="fn-text">
                  <h4>Publish</h4>
                  <p>Approved content goes live on the network website.</p>
                </span>
              </div>
              <div className="flow-connector" />
              <div className="flow-node">
                <span className="fn-step s-cream">3</span>
                <span className="fn-text">
                  <h4>Amplify</h4>
                  <p>Shared across the wider network ecosystem.</p>
                </span>
              </div>
              <div className="flow-connector" />
              <div className="flow-node is-final">
                <span className="fn-step">4</span>
                <span className="fn-text">
                  <h4>Reach More People</h4>
                  <p>Made available for broader community visibility.</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NATIONAL DIRECTORY ============ */}
      <section className="sec">
        <div className="wrap map-grid">
          <div className="map-stage" data-reveal>
            <svg viewBox="0 0 520 470" role="img" aria-label="Map of Australia with connected member organisations">
              <defs>
                <radialGradient id="mapfill" cx="42%" cy="38%" r="75%">
                  <stop offset="0%" stopColor="#F7EFDF" />
                  <stop offset="100%" stopColor="#EFE3CC" />
                </radialGradient>
              </defs>
              <path d="M78,150 C74,124 100,96 138,104 C166,94 186,86 209,96 C223,90 234,104 230,124 C246,124 256,138 270,141 C275,124 290,78 311,82 C320,103 328,131 340,148 C372,164 392,200 406,238 C426,288 434,338 423,376 C416,406 399,424 374,426 C332,433 304,424 276,428 C234,433 196,426 158,433 C126,439 94,425 82,397 C69,360 71,314 69,268 C67,226 70,184 78,150 Z" fill="url(#mapfill)" stroke="rgba(217,124,0,.35)" strokeWidth="1.5" />
              <path d="M356,448 C366,442 380,447 382,460 C384,474 372,482 360,478 C348,474 346,455 356,448 Z" fill="url(#mapfill)" stroke="rgba(217,124,0,.35)" strokeWidth="1.5" />
              <g stroke="rgba(217,124,0,.4)" strokeWidth="1.3" strokeDasharray="3 5" fill="none">
                <path d="M250,250 L120,320" />
                <path d="M250,250 L300,170" />
                <path d="M250,250 L370,300" />
                <path d="M250,250 L350,380" />
                <path d="M250,250 L290,400" />
                <path d="M250,250 L160,200" />
              </g>
              <circle cx="250" cy="250" r="9" fill="var(--ochre)" />
              <circle cx="250" cy="250" r="16" fill="none" stroke="var(--ochre)" strokeWidth="1.5" opacity=".5" />
              <g className="map-pin">
                <path d="M120,320 c0,-9 -7,-15 -15,-15 c-8,0 -15,6 -15,15 c0,11 15,24 15,24 c0,0 15,-13 15,-24 z" transform="translate(105,305)" fill="var(--ink)" />
                <circle cx="105" cy="313" r="4.5" fill="var(--yellow)" />
              </g>
              <g className="map-pin" style={{ animationDelay: ".4s" }}>
                <path d="M0,0 c0,-9 -7,-15 -15,-15 c-8,0 -15,6 -15,15 c0,11 15,24 15,24 c0,0 15,-13 15,-24 z" transform="translate(300,170)" fill="var(--ink)" />
                <circle cx="285" cy="163" r="4.5" fill="var(--yellow)" />
              </g>
              <g className="map-pin" style={{ animationDelay: ".8s" }}>
                <path d="M0,0 c0,-9 -7,-15 -15,-15 c-8,0 -15,6 -15,15 c0,11 15,24 15,24 c0,0 15,-13 15,-24 z" transform="translate(370,300)" fill="var(--ink)" />
                <circle cx="355" cy="293" r="4.5" fill="var(--yellow)" />
              </g>
              <g className="map-pin" style={{ animationDelay: "1.2s" }}>
                <path d="M0,0 c0,-9 -7,-15 -15,-15 c-8,0 -15,6 -15,15 c0,11 15,24 15,24 c0,0 15,-13 15,-24 z" transform="translate(350,380)" fill="var(--ink)" />
                <circle cx="335" cy="373" r="4.5" fill="var(--yellow)" />
              </g>
              <g className="map-pin" style={{ animationDelay: "1.6s" }}>
                <path d="M0,0 c0,-9 -7,-15 -15,-15 c-8,0 -15,6 -15,15 c0,11 15,24 15,24 c0,0 15,-13 15,-24 z" transform="translate(290,400)" fill="var(--ink)" />
                <circle cx="275" cy="393" r="4.5" fill="var(--yellow)" />
              </g>
              <g className="map-pin" style={{ animationDelay: "2s" }}>
                <path d="M0,0 c0,-9 -7,-15 -15,-15 c-8,0 -15,6 -15,15 c0,11 15,24 15,24 c0,0 15,-13 15,-24 z" transform="translate(160,200)" fill="var(--ink)" />
                <circle cx="145" cy="193" r="4.5" fill="var(--yellow)" />
              </g>
            </svg>
            <div className="dir-card" style={{ top: "6%", right: -10 }}>
              <span className="dc-logo">WC</span>
              <div>
                <div className="dc-name">Waterhole Collective</div>
                <div className="dc-meta">Community group · Naarm</div>
              </div>
            </div>
            <div className="dir-card" style={{ bottom: "8%", left: -14 }}>
              <span className="dc-logo">RG</span>
              <div>
                <div className="dc-name">Reconciliation Group</div>
                <div className="dc-meta">Ally organisation · Meanjin</div>
              </div>
            </div>
          </div>
          <div data-reveal data-delay="1">
            <span className="kicker">National directory</span>
            <h2 style={{ fontSize: "clamp(30px,3.4vw,44px)", marginTop: 18 }}>
              Be Part Of A Growing National Directory
            </h2>
            <div
              className="body"
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "#403a32",
                maxWidth: "48ch",
                marginTop: 22,
              }}
            >
              <p>
                The First Nations Action Network is building one of
                Australia&rsquo;s most comprehensive directories of First Nations
                and community-focused organisations.
              </p>
              <p style={{ marginTop: 16 }}>
                Members gain visibility through enhanced directory profiles that
                help communities, organisations and supporters discover their
                work.
              </p>
            </div>
            <ul className="dir-benefits">
              {[
                "Increased discoverability",
                "Stronger online presence",
                "Greater credibility",
                "Collaboration opportunities",
                "Referral opportunities",
              ].map((b) => (
                <li key={b}>
                  <span className="tick">
                    <Tick />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ COMMUNITY TOOLS ============ */}
      <section className="sec bg-cream">
        <div className="wrap split media-left">
          <div className="img-frame" data-reveal>
            <ImageSlot
              src="/images/who.webp"
              alt="Volunteers coordinating community action"
              note="Volunteers coordinating community action"
              rounded={18}
            />
          </div>
          <div data-reveal data-delay="1">
            <span className="kicker">Community organising</span>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 18 }}>
              Tools That Help You Engage Your Community
            </h2>
            <div
              className="body"
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "#403a32",
                maxWidth: "50ch",
                marginTop: 22,
              }}
            >
              <p>
                Membership includes access to community organising infrastructure
                designed to help organisations build stronger relationships and
                coordinate community action.
              </p>
            </div>
            <div className="chips">
              <span className="chip">Email communications</span>
              <span className="chip">Events</span>
              <span className="chip">Campaigns</span>
              <span className="chip">Surveys</span>
              <span className="chip">Forms</span>
              <span className="chip">Volunteer engagement</span>
            </div>
            <div className="note-card">
              <span className="ni">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              <p>
                Membership includes <b>onboarding and platform training</b> to
                help organisations effectively use available tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LEARN ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="kicker">Shared learning</span>
            <h2>Learn From Shared Experience</h2>
            <p className="lead">
              Access resources, templates, guides and practical knowledge
              developed to support community engagement and organisational
              growth.
            </p>
          </div>
          <div className="res-grid">
            <article className="res-card" data-reveal>
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="17" cy="10" r="2.4" />
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
                  <path d="M15.5 19c0-2 1.3-3.4 3.2-3.4S22 17 22 19" />
                </svg>
              </div>
              <h3>Community organising resources</h3>
              <p>Practical approaches to building participation and momentum.</p>
            </article>
            <article className="res-card" data-reveal data-delay="1">
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19V6a2 2 0 0 1 2-2h8l6 6v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                  <path d="M14 4v6h6" />
                </svg>
              </div>
              <h3>Engagement templates</h3>
              <p>Ready-to-use frameworks for outreach and participation.</p>
            </article>
            <article className="res-card" data-reveal data-delay="2">
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 17l.9-5.4L4.2 7.7l5.4-.8z" />
                </svg>
              </div>
              <h3>Best practice guides</h3>
              <p>Lessons drawn from organisations across the network.</p>
            </article>
            <article className="res-card" data-reveal>
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Communication resources</h3>
              <p>Tools to tell your story and reach your audience.</p>
            </article>
            <article className="res-card" data-reveal data-delay="1">
              <div className="res-ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 2 7l10 5 10-5z" />
                  <path d="M2 7v6M6 9.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V9.5" />
                </svg>
              </div>
              <h3>Leadership development materials</h3>
              <p>Support for developing the next generation of leaders.</p>
            </article>
            <article
              className="res-card"
              data-reveal
              data-delay="2"
              style={{
                background: "var(--ink)",
                borderColor: "var(--ink)",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: 23 }}>A growing library</h3>
              <p style={{ color: "#C9C2B6" }}>
                New resources are added as the network learns and grows — shared
                knowledge, freely available to members.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ BE PART OF SOMETHING BIGGER ============ */}
      <section className="sec network">
        <div className="wrap net-grid">
          <div data-reveal>
            <span className="kicker on-dark">The ecosystem</span>
            <h2
              style={{
                fontSize: "clamp(34px,4.4vw,58px)",
                marginTop: 18,
                lineHeight: 1.05,
              }}
            >
              Be Part Of Something <span className="em-action">Bigger</span>
            </h2>
            <p
              className="body"
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "#C9C2B6",
                maxWidth: "46ch",
                marginTop: 24,
              }}
            >
              Membership connects organisations to a growing ecosystem committed
              to strengthening communities and creating positive change.
            </p>
            <div className="ally-tags" style={{ marginTop: 30 }}>
              {[
                "First Nations organisations",
                "Ally organisations",
                "Reconciliation groups",
                "Community groups",
                "Advocacy organisations",
                "Cultural organisations",
                "Workplace networks",
                "Social enterprises",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="net-stage" data-reveal data-delay="1">
            <svg viewBox="0 0 540 470" role="img" aria-label="Network of connected organisations around the First Nations Action Network">
              <g stroke="rgba(255,218,0,.32)" strokeWidth="1.4" fill="none">
                <path d="M270,235 L270,70" />
                <path d="M270,235 L420,120" />
                <path d="M270,235 L470,235" />
                <path d="M270,235 L420,350" />
                <path d="M270,235 L270,400" />
                <path d="M270,235 L120,350" />
                <path d="M270,235 L70,235" />
                <path d="M270,235 L120,120" />
              </g>
              <g fill="#231f19" stroke="rgba(255,255,255,.18)" strokeWidth="1.4">
                <circle className="map-pin" cx="270" cy="70" r="26" />
                <circle className="map-pin" style={{ animationDelay: ".3s" }} cx="420" cy="120" r="22" />
                <circle className="map-pin" style={{ animationDelay: ".6s" }} cx="470" cy="235" r="26" />
                <circle className="map-pin" style={{ animationDelay: ".9s" }} cx="420" cy="350" r="22" />
                <circle className="map-pin" style={{ animationDelay: "1.2s" }} cx="270" cy="400" r="26" />
                <circle className="map-pin" style={{ animationDelay: "1.5s" }} cx="120" cy="350" r="22" />
                <circle className="map-pin" style={{ animationDelay: "1.8s" }} cx="70" cy="235" r="26" />
                <circle className="map-pin" style={{ animationDelay: "2.1s" }} cx="120" cy="120" r="22" />
              </g>
              <g fill="var(--yellow)">
                <circle cx="270" cy="70" r="6" />
                <circle cx="420" cy="120" r="6" />
                <circle cx="470" cy="235" r="6" />
                <circle cx="420" cy="350" r="6" />
                <circle cx="270" cy="400" r="6" />
                <circle cx="120" cy="350" r="6" />
                <circle cx="70" cy="235" r="6" />
                <circle cx="120" cy="120" r="6" />
              </g>
              <circle cx="270" cy="235" r="56" fill="var(--yellow)" />
              <text x="270" y="228" textAnchor="middle" className="net-center" fontSize="30">
                FNAN
              </text>
              <text x="270" y="252" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="var(--ink)" letterSpacing="1.5">
                NETWORK
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ============ JOURNEY TIMELINE ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head centered" data-reveal>
            <span className="kicker centered">Getting started</span>
            <h2>
              Joining The Network Is <span className="em-action">Simple</span>
            </h2>
            <p className="lead">
              Five steps from joining to growing your impact across the national
              network.
            </p>
          </div>
          <div className="journey">
            <div className="journey-track">
              {(
                [
                  ["1", "Join The Network", "Sign up your organisation and become a member.", ""],
                  ["2", "Complete Onboarding", "Get set up with guidance and platform training.", "1"],
                  ["3", "Access Resources & Tools", "Unlock resources and community organising tools.", "2"],
                  ["4", "Share Stories & Participate", "Publish your work and join the conversation.", "3"],
                  ["5", "Grow Your Impact", "Build momentum and strengthen your community.", "4"],
                ] as const
              ).map(([num, title, desc, delay]) => (
                <div
                  key={num}
                  className="j-step"
                  data-reveal
                  data-delay={delay || undefined}
                >
                  <div className="j-dot">{num}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="sec bg-cream">
        <div className="wrap">
          <div className="sec-head centered" data-reveal>
            <span className="kicker centered">Who can join</span>
            <h2>Membership For Organisations Creating Positive Change</h2>
            <p className="lead">
              The Network welcomes a wide range of organisations working to
              strengthen communities.
            </p>
          </div>
          <div className="orgtype-grid">
            <div className="orgtype" data-reveal>
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" />
                </svg>
              </div>
              <h4>First Nations organisations</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="1">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l9-5 9 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <h4>Native Title groups</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="2">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" />
                </svg>
              </div>
              <h4>Ally organisations</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="3">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 13l-2.5 2.5a3 3 0 0 0 4.2 4.2L12 17.5M16 11l2.5-2.5a3 3 0 0 0-4.2-4.2L12 6.5M9 15l6-6" />
                </svg>
              </div>
              <h4>Reconciliation groups</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="4">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="17" cy="10" r="2.4" />
                  <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
                  <path d="M15.5 19c0-2 1.3-3.4 3.2-3.4S22 17 22 19" />
                </svg>
              </div>
              <h4>Community groups</h4>
            </div>
            <div className="orgtype" data-reveal>
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-8 9 8M5 10v10h14V10" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <h4>Advocacy organisations</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="1">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 17l.9-5.4L4.2 7.7l5.4-.8z" />
                </svg>
              </div>
              <h4>Cultural organisations</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="2">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <h4>Workplace networks</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="3">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l5-5 4 4 8-8" />
                  <path d="M16 4h5v5" />
                </svg>
              </div>
              <h4>Social enterprises</h4>
            </div>
            <div className="orgtype" data-reveal data-delay="4">
              <div className="ot-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
                </svg>
              </div>
              <h4>Community-led initiatives</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="sec">
        <div className="wrap">
          <div className="sec-head centered" data-reveal>
            <span className="kicker centered">Membership</span>
            <h2>Network Membership</h2>
            <p className="lead">
              Membership belongs to the organisation and includes participation
              opportunities for designated team members under a nominated
              Captain.
            </p>
          </div>
          <div className="pricing" data-reveal data-delay="1">
            <div className="price-left">
              <span className="kicker on-dark">
                One membership · whole organisation
              </span>
              <h3>Network Membership</h3>
              <div className="price-amounts">
                <div className="price-main">
                  <span className="num">$1,200</span>
                  <span className="per">per year</span>
                </div>
              </div>
              <div
                className="price-amounts"
                style={{ marginTop: 18, alignItems: "center" }}
              >
                <span className="price-or">or</span>
                <span className="price-alt">
                  $150 <span>per month</span>
                </span>
              </div>
              <p className="price-note">
                Membership belongs to the organisation and includes
                participation opportunities for designated team members under a
                nominated Captain.
              </p>
            </div>
            <div className="price-right">
              <h4>Your membership includes</h4>
              <ul className="incl">
                {[
                  "Enhanced national directory profile",
                  "Publish stories, events & initiatives",
                  "Community organising tools",
                  "Resources & shared learning library",
                  "Onboarding & platform training",
                  "Collaboration across the network",
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
                <span className="captain-tag">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5z" />
                  </svg>{" "}
                  Led by a nominated Captain
                </span>
                <a href="#" className="btn btn-primary">
                  Join The Network <Arrow />
                </a>
                <Link href="/#contact" className="textlink">
                  Have questions? Start a conversation <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="sec bg-cream">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="kicker">Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <details className="faq-item" data-reveal open>
              <summary>
                What type of organisations can join?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                First Nations organisations, Native Title groups, ally
                organisations, reconciliation groups, community groups, advocacy
                organisations, cultural organisations, workplace networks, social
                enterprises and community-led initiatives are all welcome to
                join.
              </div>
            </details>
            <details className="faq-item" data-reveal data-delay="1">
              <summary>
                What happens after joining?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                After joining, your organisation completes onboarding, then gains
                access to resources, community organising tools, and the
                opportunity to share stories and participate across the network.
              </div>
            </details>
            <details className="faq-item" data-reveal>
              <summary>
                How many team members can participate?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                Membership belongs to the organisation and includes participation
                opportunities for designated team members under a nominated
                Captain who coordinates your organisation&rsquo;s involvement.
              </div>
            </details>
            <details className="faq-item" data-reveal data-delay="1">
              <summary>
                Is onboarding included?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                Yes. Membership includes onboarding and platform training to help
                your organisation effectively use the available tools.
              </div>
            </details>
            <details className="faq-item" data-reveal>
              <summary>
                Can we publish stories and events?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                Yes. Members may submit community stories, event announcements,
                campaign updates, achievements, opinion pieces and webinar
                recordings. Approved content can be published on the network
                website for broader community visibility.
              </div>
            </details>
            <details className="faq-item" data-reveal data-delay="1">
              <summary>
                How does the directory work?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                Members gain visibility through enhanced directory profiles within
                one of Australia&rsquo;s most comprehensive directories of First
                Nations and community-focused organisations — helping
                communities, organisations and supporters discover your work.
              </div>
            </details>
            <details className="faq-item" data-reveal>
              <summary>
                Do we need to be a First Nations organisation?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                No. The network brings together both First Nations and ally
                organisations. Ally organisations, reconciliation groups,
                community groups and others committed to positive change are
                welcome.
              </div>
            </details>
            <details className="faq-item" data-reveal data-delay="1">
              <summary>
                What community organising tools are included?{" "}
                <span className="faq-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq-a">
                Membership includes infrastructure supporting email
                communications, events, campaigns, surveys, forms and volunteer
                engagement — designed to help organisations build stronger
                relationships and coordinate community action.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec final">
        <div className="wrap">
          <span className="kicker on-dark centered" data-reveal>
            Join the network
          </span>
          <h2 data-reveal data-delay="1" style={{ marginTop: 20 }}>
            Join A Growing National <span className="em-action">Network</span>
          </h2>
          <p data-reveal data-delay="2">
            Connect with organisations across Australia, increase visibility for
            your work and access the tools, resources and support needed to
            strengthen community participation and create lasting positive
            change.
          </p>
          <div className="actions" data-reveal data-delay="2">
            <Link href="#pricing" className="btn btn-primary">
              Join The Network <Arrow />
            </Link>
            <Link href="/#contact" className="btn btn-ghost on-dark">
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
