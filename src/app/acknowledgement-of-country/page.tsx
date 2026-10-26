import type { Metadata } from "next";
import Link from "next/link";
import Nav, { type NavLink } from "@/components/Nav";
import Footer from "@/components/Footer";
import { DECEASED_PERSONS_NOTICE } from "@/lib/site-pages";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

const DESCRIPTION =
  "First Nations Action Network acknowledges Country, and sets out the cultural protocols that guide how we work with communities, stories and images.";

export const metadata: Metadata = {
  title: "Acknowledgement of Country",
  description: DESCRIPTION,
  alternates: { canonical: "/acknowledgement-of-country" },
  openGraph: {
    title: "Acknowledgement of Country · First Nations Action Network",
    description: DESCRIPTION,
    url: "/acknowledgement-of-country",
  },
};

export default function AcknowledgementOfCountryPage() {
  return (
    <>
      <Nav brandHref="/" links={navLinks} exploreHref="/allyship" joinHref="/contributors" solid />
      <main className="home-page doc-page">
        <header className="doc-hero">
          <div className="wrap">
            <span className="kicker" data-reveal>Acknowledgement of Country</span>
            <h1 data-reveal data-delay="1">Acknowledgement of Country</h1>
            <p className="lead" data-reveal data-delay="2">
              First Nations Action Network acknowledges Country — the lands, the
              waters, the skies and the winds — connected to the Traditional
              Custodians and all that live, work and play on the sacred places
              of the ancestors that have walked before, that walk today and
              those that will emerge to walk into the future.
            </p>
            <div className="doc-meta">
              <span><strong>Last updated</strong> 4 September 2026</span>
              <span><strong>Status</strong> Working draft — in consultation</span>
            </div>
          </div>
        </header>
        <section className="sec">
          <div className="wrap">
            <div className="doc-draft">
              <span className="mark" aria-hidden="true">●</span>
              <p>
                This page is being developed in consultation with community.
                The cultural protocols below are a working draft.
              </p>
            </div>
            <div className="doc-draft">
              <span className="mark" aria-hidden="true">●</span>
              <p>{DECEASED_PERSONS_NOTICE}</p>
            </div>
            <nav className="doc-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                <li><a href="#what-it-means">What acknowledging Country means to us</a></li>
                <li><a href="#cultural-protocols">Cultural protocols</a></li>
                <li><a href="#stories-and-permission">Community stories, images and permission</a></li>
                <li><a href="#icip">Indigenous Cultural and Intellectual Property (ICIP)</a></li>
                <li><a href="#raising-a-concern">Raising a concern</a></li>
              </ol>
            </nav>
            <div className="doc-body">
              <h2 id="what-it-means">What acknowledging Country means to us</h2>
              <p>
                An Acknowledgement of Country is not a formality we place at
                the top of a page and move past. First Nations Action Network
                exists to support First Nations organisations and communities,
                and everything else on this site sits on top of that
                relationship to Country and to the people who have cared for
                it since time immemorial.
              </p>
              <p>
                We say this acknowledgement at the start of our events, in our
                footer, and here, because it is a standing statement, not a
                one-off. It names the debt this organisation carries: to the
                Traditional Custodians of the lands we work on, to the Elders
                who hold and pass on knowledge, and to the generations still
                to come who will inherit what we do now.
              </p>

              <h2 id="cultural-protocols">Cultural protocols</h2>
              <p>
                We work across many different Countries and communities, and
                protocols are not the same in every one of them. Some things
                hold everywhere we work:
              </p>
              <ul>
                <li>
                  We seek permission before we speak about, publish, or act on
                  behalf of a community — we do not assume it.
                </li>
                <li>
                  We follow local direction when we are on Country, including
                  from Traditional Custodians whose protocols may differ from
                  those of a neighbouring community or from what we have done
                  elsewhere.
                </li>
                <li>
                  We defer to Elders and Traditional Custodians on cultural
                  matters. Their authority on their own Country and culture is
                  not something we override or substitute with our own
                  judgement.
                </li>
                <li>
                  We treat protocols as specific to each community, not as a
                  single set of rules that applies everywhere. What is
                  appropriate in one place may not be appropriate in another.
                </li>
              </ul>

              <h2 id="stories-and-permission">Community stories, images and permission</h2>
              <p>
                This site publishes photographs and stories of named people
                and organisations, and lists organisations in our directory.
                We only publish this material with the permission of the
                people and organisations it concerns.
              </p>
              <p>
                Permission can be withdrawn at any time. If you appear in a
                story or photograph on this site, or your organisation is
                listed, and you want that material corrected, removed, or
                amended, contact us through{" "}
                <Link href="/contact">our contact page</Link>. We will act on
                that request.
              </p>

              <h2 id="icip">Indigenous Cultural and Intellectual Property (ICIP)</h2>
              <p>
                Cultural knowledge, stories, designs and images shared with us
                remain the property of the communities and individuals they
                belong to. Publishing this material on our website does not
                transfer ownership of it to First Nations Action Network, and
                we do not treat it as ours to use beyond the purpose it was
                shared for.
              </p>
              <p>
                We are developing a fuller ICIP protocol to set this out in
                more detail. Until that work is complete, any question about
                how a specific piece of cultural material is used should be
                directed to us through <Link href="/contact">our contact
                page</Link>.
              </p>

              <h2 id="raising-a-concern">Raising a concern</h2>
              <p>
                If something on this site does not sit right with you
                culturally, or a protocol has not been followed the way it
                should have been, tell us. Contact us through{" "}
                <Link href="/contact">our contact page</Link> and we will
                follow up directly. Our{" "}
                <Link href="/code-of-conduct">Code of Conduct</Link> also sets
                out how we handle concerns raised about the network more
                broadly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
