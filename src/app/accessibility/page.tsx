import type { Metadata } from "next";
import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

const DESCRIPTION =
  "How the First Nations Action Network approaches web accessibility, what we've done, what's still limited, and how to tell us about a barrier.";

export const metadata: Metadata = {
  title: "Accessibility",
  description: DESCRIPTION,
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility · First Nations Action Network",
    description: DESCRIPTION,
    url: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors"
        solid
      />
      <main className="home-page doc-page">
        <header className="doc-hero">
          <div className="wrap">
            <span className="kicker" data-reveal>
              Accessibility
            </span>
            <h1 data-reveal data-delay="1">
              Accessibility
            </h1>
            <p className="lead" data-reveal data-delay="2">
              We want this site to work for everyone, including people using
              assistive technology, and we&rsquo;re open about where it falls
              short.
            </p>
            <div className="doc-meta">
              <span>
                <strong>Last updated</strong> 4 September 2026
              </span>
              <span>
                <strong>Status</strong> Draft for review
              </span>
            </div>
          </div>
        </header>
        <section className="sec">
          <div className="wrap">
            <div className="doc-draft">
              <span className="mark" aria-hidden="true">
                ●
              </span>
              <p>
                Draft for review. This statement has not yet been approved.
              </p>
            </div>
            <nav className="doc-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                <li>
                  <a href="#commitment">Our commitment</a>
                </li>
                <li>
                  <a href="#what-we-have-done">What we have done</a>
                </li>
                <li>
                  <a href="#known-limitations">Known limitations</a>
                </li>
                <li>
                  <a href="#assistive-technology-and-browsers">
                    Assistive technology and browsers
                  </a>
                </li>
                <li>
                  <a href="#feedback">Feedback</a>
                </li>
                <li>
                  <a href="#formal-review-status">Formal review status</a>
                </li>
              </ol>
            </nav>
            <div className="doc-body">
              <h2 id="commitment">Our commitment</h2>
              <p>
                The First Nations Action Network wants people to be able to
                find events, read stories and connect with the Network no
                matter how they browse the web. We&rsquo;re aiming for our
                site to meet{" "}
                <strong>Web Content Accessibility Guidelines (WCAG) 2.1
                Level AA</strong>. That&rsquo;s our target, not a claim that
                we&rsquo;ve already reached it — this site has not been
                through an independent accessibility audit, so we can&rsquo;t
                say it fully conforms. What we can say is that accessibility
                is something we actively build for and keep working on.
              </p>

              <h2 id="what-we-have-done">What we have done</h2>
              <p>
                Some of the concrete measures already built into this site:
              </p>
              <ul>
                <li>
                  <strong>Visible keyboard focus.</strong> Every interactive
                  element — links, buttons, form fields — shows a clear
                  outline when it&rsquo;s reached by keyboard, so you can see
                  where you are on the page without a mouse.
                </li>
                <li>
                  <strong>A mobile menu that behaves.</strong> The mobile
                  navigation menu keeps keyboard focus inside itself while
                  it&rsquo;s open and closes when you press Escape, so
                  it&rsquo;s not possible to get lost behind it.
                </li>
                <li>
                  <strong>Reduced motion is respected.</strong> If your
                  device is set to prefer reduced motion, the scroll-reveal
                  animations across the site and the mailing-list pop-up
                  animation are switched off.
                </li>
                <li>
                  <strong>Descriptive alt text.</strong> Images carry
                  alternative text that describes what&rsquo;s in them, for
                  people using screen readers or with images turned off.
                </li>
                <li>
                  <strong>New-tab links say so.</strong> Where a link opens
                  in a new tab, its accessible label announces that, so it
                  doesn&rsquo;t catch anyone by surprise.
                </li>
                <li>
                  <strong>Semantic structure and colour.</strong> Pages use
                  proper headings and landmarks, and colours are chosen with
                  AA contrast in mind.
                </li>
              </ul>

              <h2 id="known-limitations">Known limitations</h2>
              <p>
                We&rsquo;d rather tell you where this site is weak than let
                you find out the hard way:
              </p>
              <ul>
                <li>
                  <strong>The interactive network map and ecosystem graph.</strong>{" "}
                  These are visual, canvas/SVG-style components, and they may
                  be difficult or impossible to use with a screen reader. A
                  text alternative to the map is something we&rsquo;re
                  working on.
                </li>
                <li>
                  <strong>Embedded Action Network forms.</strong> The forms
                  on <code>/contact</code> and <code>/contributors/apply</code>{" "}
                  are built and hosted by a third party, Action Network. We
                  don&rsquo;t control their markup, so we can&rsquo;t
                  guarantee their accessibility the way we can for the rest
                  of the site.
                </li>
                <li>
                  <strong>Draft content.</strong> Some pages, including this
                  one, are still marked as drafts while we finish writing and
                  reviewing them.
                </li>
              </ul>

              <h2 id="assistive-technology-and-browsers">
                Assistive technology and browsers
              </h2>
              <p>
                We build this site using standard, semantic HTML and modern
                browser features, with the aim of it working well with
                current screen readers (such as NVDA, JAWS and VoiceOver),
                screen magnification, voice control and keyboard-only
                navigation, on up-to-date versions of major browsers. We
                haven&rsquo;t run a formal set of assistive-technology test
                results and don&rsquo;t want to claim results we don&rsquo;t
                have — see{" "}
                <a href="#formal-review-status">Formal review status</a>{" "}
                below.
              </p>

              <h2 id="feedback">Feedback</h2>
              <p>
                If you hit a barrier anywhere on this site — something you
                can&rsquo;t reach, read, or operate — we want to know.
                Please tell us through{" "}
                <a href="/contact">/contact</a>, describing the page and what
                happened. TODO: confirm the response timeframe we commit to
                for accessibility feedback before publication. If you need
                information from this site in another format, ask us through
                the same form and we&rsquo;ll do our best to help.
              </p>

              <h2 id="formal-review-status">Formal review status</h2>
              <p>
                An independent accessibility audit of this site has not yet
                been carried out. TODO: confirm a planned audit date before
                publication. Until then, this statement describes our intent
                and the measures we&rsquo;ve put in place, not a verified
                conformance result.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
