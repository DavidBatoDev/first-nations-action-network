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
  "How the First Nations Action Network collects, stores and protects personal information submitted through this website.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · First Nations Action Network",
    description: DESCRIPTION,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav brandHref="/" links={navLinks} exploreHref="/allyship" joinHref="/contributors" solid />
      <main className="home-page doc-page">
        <header className="doc-hero">
          <div className="wrap">
            <span className="kicker" data-reveal>Privacy</span>
            <h1 data-reveal data-delay="1">Privacy Policy</h1>
            <p className="lead" data-reveal data-delay="2">
              How we collect, use and protect the personal information you share
              with the First Nations Action Network through this website.
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
                <li><a href="#scope">Scope</a></li>
                <li><a href="#what-we-collect">What we collect</a></li>
                <li><a href="#how-we-collect-it">How we collect it</a></li>
                <li><a href="#overseas-disclosure">Action Network and overseas disclosure</a></li>
                <li><a href="#cookies-and-local-storage">Cookies and local storage</a></li>
                <li><a href="#donations-and-merchandise">Donations and merchandise</a></li>
                <li><a href="#how-we-use-your-information">How we use your information</a></li>
                <li><a href="#disclosure">Disclosure</a></li>
                <li><a href="#community-directory-and-stories">Community directory and stories</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#access-and-correction">Access and correction</a></li>
                <li><a href="#complaints">Complaints</a></li>
                <li><a href="#changes-to-this-policy">Changes to this policy</a></li>
                <li><a href="#contact-us">Contact us</a></li>
              </ol>
            </nav>
            <div className="doc-body">
              <h2 id="scope">Scope</h2>
              <p>
                This policy explains how the First Nations Action Network (the
                Network, we, us) handles personal information collected through
                this website, fnan.org.au and its subpages. It is written to
                meet the Australian Privacy Act 1988 and the Australian Privacy
                Principles (APPs). It does not cover information handled by
                other organisations, including the third-party services
                described below.
              </p>
              <p>
                TODO: confirm registered legal entity name and ABN before
                publication.
              </p>

              <h2 id="what-we-collect">What we collect</h2>
              <p>
                We only collect personal information that you choose to give
                us. Depending on which form you use, this may include your
                name, email address, phone number, organisation and the
                content of your message or application. We do not collect any
                other personal information directly through this website.
              </p>

              <h2 id="how-we-collect-it">How we collect it</h2>
              <p>
                We collect personal information only when someone submits one
                of the forms embedded on this site: the &ldquo;Book a
                conversation&rdquo; form at{" "}
                <Link href="/contact">/contact</Link> and the contributor
                application form at{" "}
                <Link href="/contributors/apply">/contributors/apply</Link>.
                Both forms are hosted by the third-party platform Action
                Network, embedded directly in the page. We do not otherwise
                collect personal information through browsing, and we do not
                run analytics or tracking software on this site.
              </p>

              <h2 id="overseas-disclosure">Action Network and overseas disclosure</h2>
              <p>
                Both forms on this site are provided by Action Network
                (actionnetwork.org), a third-party platform based in the
                United States. When you submit either form, the information
                you enter is sent directly to Action Network and stored on
                its servers there &mdash; it is not stored on this website or
                on any server we control.
              </p>
              <p>
                Under Australian Privacy Principle 8, we are required to tell
                you about likely overseas recipients of your personal
                information. Action Network, in the United States, is that
                recipient for anything submitted through our contact or
                contributor application forms. Action Network&rsquo;s own
                privacy policy governs how it handles that information once
                received. We encourage you to review it before submitting a
                form if you have concerns about overseas storage.
              </p>

              <h2 id="cookies-and-local-storage">Cookies and local storage</h2>
              <p>
                This website does not use advertising or tracking cookies, and
                we do not run any analytics package. The only browser storage
                we set is a single <code>localStorage</code> key,{" "}
                <code>newsletter-popup-state</code>, which simply remembers
                whether you have already been shown the mailing-list pop-up so
                we do not show it to you twice. It does not identify you and
                is never sent to us or to any third party. You can clear it at
                any time through your browser&rsquo;s site data settings,
                which will reset the pop-up.
              </p>

              <h2 id="donations-and-merchandise">Donations and merchandise</h2>
              <p>
                Donations and merchandise purchases happen entirely on
                external websites: an Action Network fundraiser for donations,
                and a Print Bar store for merchandise. Each is governed by its
                own privacy policy. No payment or card details are ever
                handled, transmitted through, or stored on this website.
              </p>

              <h2 id="how-we-use-your-information">How we use your information</h2>
              <p>We use the personal information you submit to:</p>
              <ul>
                <li>respond to your enquiry or conversation request;</li>
                <li>assess and process contributor applications; and</li>
                <li>send you updates, where you have opted in to receive them.</li>
              </ul>

              <h2 id="disclosure">Disclosure</h2>
              <p>
                Aside from Action Network, which stores form submissions on
                our behalf as described above, we do not disclose your
                personal information to other third parties, and we never
                sell personal information.
              </p>

              <h2 id="community-directory-and-stories">Community directory and stories</h2>
              <p>
                This site publishes community stories, photographs of named
                people, and an organisation directory. Organisations and
                individuals appear only with permission. If you would like
                something about you or your organisation corrected, updated or
                removed, contact us at <Link href="/contact">/contact</Link>.
              </p>
              <p>
                Content relating to First Nations peoples, communities and
                cultural material is handled according to the protocols set
                out on our{" "}
                <Link href="/acknowledgement-of-country">
                  Acknowledgement of Country
                </Link>{" "}
                page.
              </p>

              <h2 id="security">Security</h2>
              <p>
                We take reasonable steps to protect the personal information
                we handle from misuse, interference, loss, and unauthorised
                access, modification or disclosure. Because form submissions
                are stored by Action Network rather than on this website, its
                security measures also apply &mdash; see its privacy policy
                for details.
              </p>

              <h2 id="access-and-correction">Access and correction</h2>
              <p>
                You can ask us for access to the personal information we hold
                about you, or ask us to correct it, at any time. Contact us
                using the details below and we will respond within a
                reasonable period.
              </p>
              <p>TODO: confirm postal address for written privacy requests.</p>

              <h2 id="complaints">Complaints</h2>
              <p>
                If you believe we have mishandled your personal information,
                contact us first so we can try to resolve it directly. If
                you&rsquo;re not satisfied with our response, you can lodge a
                complaint with the Office of the Australian Information
                Commissioner (OAIC) at{" "}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">
                  oaic.gov.au
                </a>
                .
              </p>
              <p>
                TODO: confirm name and title of the privacy contact officer.
              </p>

              <h2 id="changes-to-this-policy">Changes to this policy</h2>
              <p>
                We may update this policy from time to time as our services or
                obligations change. The date at the top of this page shows
                when it was last updated.
              </p>

              <h2 id="contact-us">Contact us</h2>
              <p>
                For any privacy question, access request or correction, get in
                touch via <Link href="/contact">/contact</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
