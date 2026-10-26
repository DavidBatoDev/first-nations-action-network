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
  "The terms of use — sometimes called our user agreement — for the First Nations Action Network website.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use · First Nations Action Network",
    description: DESCRIPTION,
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Nav brandHref="/" links={navLinks} exploreHref="/allyship" joinHref="/contributors" solid />
      <main className="home-page doc-page">
        <header className="doc-hero">
          <div className="wrap">
            <span className="kicker" data-reveal>Terms</span>
            <h1 data-reveal data-delay="1">Terms of Use</h1>
            <p className="lead" data-reveal data-delay="2">
              The rules for using this website — what some people call our user agreement.
            </p>
            <div className="doc-meta">
              <span><strong>Last updated</strong> 4 September 2026</span>
              <span><strong>Status</strong> Draft for review</span>
            </div>
          </div>
        </header>
        <section className="sec">
          <div className="wrap">
            <div className="doc-draft">
              <span className="mark" aria-hidden="true">●</span>
              <p>Draft for review. This document has not yet been approved and does not constitute legal advice.</p>
            </div>
            <nav className="doc-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                <li><a href="#about-these-terms">About these terms</a></li>
                <li><a href="#who-we-are">Who we are</a></li>
                <li><a href="#using-this-website">Using this website</a></li>
                <li><a href="#accounts-and-applications">Accounts and applications</a></li>
                <li><a href="#intellectual-property">Intellectual property</a></li>
                <li><a href="#community-content-and-permissions">Community content and permissions</a></li>
                <li><a href="#external-links-and-third-party-services">External links and third-party services</a></li>
                <li><a href="#conduct">Conduct</a></li>
                <li><a href="#accuracy-and-availability">Accuracy and availability</a></li>
                <li><a href="#limitation-of-liability">Limitation of liability</a></li>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#changes-to-these-terms">Changes to these terms</a></li>
                <li><a href="#governing-law">Governing law</a></li>
                <li><a href="#contact">Contact</a></li>
              </ol>
            </nav>
            <div className="doc-body">
              <h2 id="about-these-terms">About these terms</h2>
              <p>
                These terms of use — what we sometimes call our user agreement — govern your use
                of this website. By browsing the site, submitting a form or applying to
                contribute, you accept these terms. If you don&apos;t agree with them, please
                don&apos;t use the site.
              </p>

              <h2 id="who-we-are">Who we are</h2>
              <p>
                This website is operated by First Nations Action Network (FNAN), also trading as
                First Nations Allies, an Australian, First Nations–led organisation.
              </p>
              <p>TODO: confirm registered legal entity name and ABN before publication.</p>

              <h2 id="using-this-website">Using this website</h2>
              <p>You agree to use this website only for its intended purpose. In particular, you must not:</p>
              <ul>
                <li>scrape, harvest or systematically extract content or data from the site;</li>
                <li>attempt to disrupt, overload or interfere with the site&apos;s normal operation;</li>
                <li>misuse the community directory, including using organisation contact details published in it for unsolicited marketing, spam or any purpose other than the one the directory is provided for; or</li>
                <li>attempt to gain unauthorised access to any part of the site or its underlying systems.</li>
              </ul>

              <h2 id="accounts-and-applications">Accounts and applications</h2>
              <p>
                Applying to contribute at <Link href="/contributors/apply">/contributors/apply</Link>{" "}
                is an enquiry, not an application for a formal account. Submitting the form does
                not create a contract between you and FNAN and does not guarantee acceptance as a
                contributor.
              </p>
              <p>
                Contributor pricing is indicative: A$1,200 per year or A$150 per month. Final
                terms are arranged separately and are subject to confirmation.
              </p>

              <h2 id="intellectual-property">Intellectual property</h2>
              <p>
                The site&apos;s design, text and other original content, together with the names
                &ldquo;First Nations Action Network&rdquo; and &ldquo;First Nations Allies,&rdquo;
                belong to FNAN unless stated otherwise.
              </p>
              <p>
                Community stories, photographs and organisation listings remain the property of
                the people and organisations they belong to. Cultural and intellectual property
                protocols for this material are set out at{" "}
                <Link href="/acknowledgement-of-country">/acknowledgement-of-country</Link>.
              </p>

              <h2 id="community-content-and-permissions">Community content and permissions</h2>
              <p>
                Stories, photographs and directory listings are published with the permission of
                the people and organisations concerned. Permission can be withdrawn at any time —
                contact us at <Link href="/contact">/contact</Link> to have material removed or
                corrected.
              </p>

              <h2 id="external-links-and-third-party-services">External links and third-party services</h2>
              <p>
                Some parts of this site connect to services run by others. The contact and
                contributor application forms are Action Network forms hosted in the United
                States. Donations and merchandise are handled by an external fundraiser and an
                external store. No payments are taken on this website, and each of these
                third-party services operates under its own terms and privacy practices, not
                ours.
              </p>

              <h2 id="conduct">Conduct</h2>
              <p>
                Participation in the network, including at events, is governed by our{" "}
                <Link href="/code-of-conduct">Code of Conduct</Link>. It applies alongside these
                terms.
              </p>

              <h2 id="accuracy-and-availability">Accuracy and availability</h2>
              <p>
                We try to keep this site accurate and available, but content, event listings and
                directory data can change without notice and may not always be up to date or
                accessible. The site is provided as is, without warranty as to accuracy,
                completeness or availability.
              </p>

              <h2 id="limitation-of-liability">Limitation of liability</h2>
              <p>
                To the extent permitted by law, FNAN is not liable for any loss or damage arising
                from your use of this website or reliance on its content. Nothing in these terms
                limits any right or remedy you have under the Australian Consumer Law that cannot
                be excluded, restricted or modified.
              </p>

              <h2 id="privacy">Privacy</h2>
              <p>
                Information about how we handle personal information is set out in our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>

              <h2 id="changes-to-these-terms">Changes to these terms</h2>
              <p>
                We may update these terms from time to time. The &ldquo;Last updated&rdquo; date
                at the top of this page shows when they last changed. Continuing to use the site
                after an update means you accept the revised terms.
              </p>

              <h2 id="governing-law">Governing law</h2>
              <p>
                These terms are governed by the laws of TODO: confirm the applicable Australian
                state or territory.
              </p>

              <h2 id="contact">Contact</h2>
              <p>
                Questions about these terms? Get in touch via{" "}
                <Link href="/contact">/contact</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
