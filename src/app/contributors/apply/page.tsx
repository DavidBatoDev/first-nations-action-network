import type { Metadata } from "next";
import Link from "next/link";
import ActionNetworkForm from "@/components/ActionNetworkForm";
import Footer from "@/components/Footer";
import NewsletterPopupSuppressor from "@/components/NewsletterPopupSuppressor";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow, Tick } from "@/components/icons";

const APPLICATION_DESCRIPTION =
  "Apply to become a contributor organisation in the First Nations Action Network. Share your organisation's goals and begin a conversation about joining the network.";

export const metadata: Metadata = {
  title: "Contributor Application",
  description: APPLICATION_DESCRIPTION,
  alternates: { canonical: "/contributors/apply" },
  openGraph: {
    title: "Contributor Application · First Nations Action Network",
    description: APPLICATION_DESCRIPTION,
    url: "/contributors/apply",
  },
};

const navLinks: NavLink[] = [
  { label: "Contributors", href: "/contributors" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
];

const rawFormSlug = process.env.ACTION_NETWORK_MEMBERSHIP_FORM_SLUG?.trim();
const formSlug =
  rawFormSlug && /^[a-z0-9-]+$/.test(rawFormSlug) ? rawFormSlug : undefined;

const applicationSteps = [
  {
    number: "01",
    title: "Tell us about your organisation",
    copy: "Share your work, priorities and primary contact details.",
  },
  {
    number: "02",
    title: "The Network reviews your application",
    copy: "The Network considers how contributing can support your goals.",
  },
  {
    number: "03",
    title: "Discuss the next steps",
    copy: "The Network contacts your nominated person about contributing and onboarding.",
  },
] as const;

export default function ContributorApplicationPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors/apply"
      />

      <main className="home-page application-page">
        <header className="application-hero">
          <div className="wrap application-hero-grid">
            <div>
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span>{" "}
                <Link href="/contributors">Contributors</Link>{" "}
                <span className="sep">/</span> Apply
              </span>
              <span className="kicker on-dark" data-reveal>
                Become a contributor
              </span>
              <h1 data-reveal data-delay="1">
                Start Your Organisation&rsquo;s Contributor{" "}
                <span className="em-action">Conversation.</span>
              </h1>
            </div>
            <div className="application-hero-copy" data-reveal data-delay="2">
              <p className="lead">
                Tell us about your organisation, the communities you work with
                and what you hope to strengthen through the Network.
              </p>
              <div className="application-trust" aria-label="Application assurances">
                <span><Tick size={12} /> Organisation-first</span>
                <span><Tick size={12} /> No payment today</span>
                <span><Tick size={12} /> Reviewed by the Network</span>
              </div>
            </div>
          </div>
        </header>

        <section className="sec bg-cream application-section">
          <div className="wrap application-layout">
            <aside className="application-rail" data-reveal>
              <span className="kicker">What happens next</span>
              <h2>A Human Review, From The Start.</h2>
              <p className="application-rail-intro">
                This application begins a conversation. It does not take a
                payment, create an account or activate contributor access.
              </p>

              <ol className="application-steps">
                {applicationSteps.map((step) => (
                  <li key={step.number}>
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="application-price-note">
                <span>Contributor investment</span>
                <strong>A$1,200 annually</strong>
                <p>or A$150 monthly</p>
              </div>

              <Link href="/contributors" className="textlink">
                Review contributor details <Arrow />
              </Link>
            </aside>

            <div className="application-form-card" data-reveal data-delay="1">
              <div className="application-form-head">
                <span className="kicker">Contributor application</span>
                <h2>Tell Us About Your Organisation</h2>
                <p>
                  The nominated contact should be someone who can discuss the
                  organisation&rsquo;s contributor access and onboarding with the Network.
                </p>
              </div>

              <div className="application-privacy-note">
                <span aria-hidden="true">●</span>
                <p>
                  Information submitted through the application will be stored
                  in Action Network and used to assess your organisation&rsquo;s
                  interest in contributing and contact you about next steps.
                </p>
              </div>

              <ActionNetworkForm
                slug={formSlug}
                loadingLabel={"Loading the secure application form\u2026"}
                errorTitle="The application form could not load"
                unavailableTitle="Online applications are not open yet"
                unavailableBody={
                  "The contributor application is being connected to the Network\u2019s review process. No information can be submitted from this page yet."
                }
                unavailableAction={{ href: "/contributors", label: "Return to contributors" }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <NewsletterPopupSuppressor />
    </>
  );
}
