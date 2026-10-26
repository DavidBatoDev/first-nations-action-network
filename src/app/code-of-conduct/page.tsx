import type { Metadata } from "next";
import Link from "next/link";
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
  "The behavioural agreement for everyone who takes part in the First Nations Action Network, in person and online.";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: DESCRIPTION,
  alternates: { canonical: "/code-of-conduct" },
  openGraph: {
    title: "Code of Conduct · First Nations Action Network",
    description: DESCRIPTION,
    url: "/code-of-conduct",
  },
};

export default function CodeOfConductPage() {
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
              Code of Conduct
            </span>
            <h1 data-reveal data-delay="1">
              Code of Conduct
            </h1>
            <p className="lead" data-reveal data-delay="2">
              How everyone in the Network is expected to show up &mdash; for
              community, for Country and for each other.
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
                Draft for review. This Code of Conduct is being developed
                with the network and has not yet been adopted.
              </p>
            </div>
            <nav className="doc-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                <li><a href="#who-this-applies-to">Who this applies to</a></li>
                <li><a href="#our-shared-commitments">Our shared commitments</a></li>
                <li><a href="#cultural-respect-and-protocol">Cultural respect and protocol</a></li>
                <li><a href="#allyship-expectations">Allyship expectations</a></li>
                <li><a href="#unacceptable-behaviour">Unacceptable behaviour</a></li>
                <li><a href="#reporting-a-concern">Reporting a concern</a></li>
                <li><a href="#how-reports-are-handled">How reports are handled</a></li>
                <li><a href="#review">Review</a></li>
              </ol>
            </nav>
            <div className="doc-body">
              <h2 id="who-this-applies-to">Who this applies to</h2>
              <p>
                This Code of Conduct applies to everyone who takes part in
                the First Nations Action Network &mdash; member and partner
                organisations, allies, and participants at events, training
                and on-Country experiences. It applies in person and online,
                including in the community directory and anywhere people
                represent the Network.
              </p>

              <h2 id="our-shared-commitments">Our shared commitments</h2>
              <p>Everyone in the Network is expected to:</p>
              <ul>
                <li>Respect First Nations leadership and self-determination.</li>
                <li>Listen before acting.</li>
                <li>Be honest about intent.</li>
                <li>
                  Follow local cultural protocol and the direction of
                  Traditional Custodians and Elders.
                </li>
                <li>Keep the commitments they make to communities.</li>
              </ul>

              <h2 id="cultural-respect-and-protocol">
                Cultural respect and protocol
              </h2>
              <p>
                Ask permission before photographing, recording, or sharing
                stories about people and communities. Respect restrictions on
                culturally sensitive material, and defer to local authority
                on Country. See our{" "}
                <Link href="/acknowledgement-of-country">
                  Acknowledgement of Country
                </Link>{" "}
                for how we recognise the Traditional Custodians of the lands
                we work on.
              </p>

              <h2 id="allyship-expectations">Allyship expectations</h2>
              <p>
                The Network includes non-Indigenous allies. Good allyship
                here looks like:
              </p>
              <ul>
                <li>Following rather than leading.</li>
                <li>Not speaking for communities.</li>
                <li>Sharing resources without conditions attached.</li>
                <li>Accepting correction gracefully.</li>
              </ul>

              <h2 id="unacceptable-behaviour">Unacceptable behaviour</h2>
              <p>The following will not be tolerated in the Network:</p>
              <ul>
                <li>Racism and racial vilification.</li>
                <li>Discrimination and harassment of any kind.</li>
                <li>Sexual harassment.</li>
                <li>Intimidation, bullying or retaliation.</li>
                <li>
                  Misrepresenting your authority to speak for a community.
                </li>
                <li>Misusing directory contact details.</li>
                <li>
                  Appropriating cultural material or misusing images and
                  stories.
                </li>
                <li>Breaching confidentiality.</li>
              </ul>

              <h2 id="reporting-a-concern">Reporting a concern</h2>
              <p>
                If you experience or witness a breach of this Code, tell us
                through <Link href="/contact">Book a conversation</Link>.
              </p>
              <p>
                TODO: name the contact person responsible for receiving
                reports, an alternative contact for concerns that involve
                that person, and the timeframe you can expect a response in.
              </p>

              <h2 id="how-reports-are-handled">How reports are handled</h2>
              <p>
                Reports are treated confidentially. We support the person
                raising a concern and do not tolerate retaliation against
                them. Outcomes can range from a conversation through to
                removal from the Network or a listing, depending on what
                happened.
              </p>
              <p>
                TODO: confirm who makes final decisions on reported concerns
                once the Network&rsquo;s governance is formalised.
              </p>

              <h2 id="review">Review</h2>
              <p>
                This Code of Conduct will be reviewed with the Network as it
                grows.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
