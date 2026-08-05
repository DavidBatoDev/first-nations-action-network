import type { Metadata } from "next";
import Link from "next/link";
import ActionNetworkMembershipForm from "@/components/ActionNetworkMembershipForm";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow, Tick } from "@/components/icons";

const APPLICATION_DESCRIPTION =
  "Apply for organisation membership in the First Nations Action Network. Share your organisation's goals and begin a conversation about joining the network.";

export const metadata: Metadata = {
  title: "Membership Application",
  description: APPLICATION_DESCRIPTION,
  alternates: { canonical: "/membership/apply" },
  openGraph: {
    title: "Membership Application · First Nations Action Network",
    description: APPLICATION_DESCRIPTION,
    url: "/membership/apply",
  },
};

const navLinks: NavLink[] = [
  { label: "Membership", href: "/membership" },
  { label: "Who We Are", href: "/#who" },
  { label: "Learn", href: "/#training" },
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
    copy: "The Network considers how membership can support your goals.",
  },
  {
    number: "03",
    title: "Discuss the next steps",
    copy: "The Network contacts your nominated person about membership and onboarding.",
  },
] as const;

export default function MembershipApplicationPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/membership/apply"
      />

      <main className="home-page application-page">
        <header className="application-hero">
          <div className="wrap application-hero-grid">
            <div>
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span>{" "}
                <Link href="/membership">Membership</Link>{" "}
                <span className="sep">/</span> Apply
              </span>
              <span className="kicker on-dark" data-reveal>
                Organisation membership
              </span>
              <h1 data-reveal data-delay="1">
                Start Your Organisation&rsquo;s Membership{" "}
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
                payment, create an account or activate membership.
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
                <span>Membership investment</span>
                <strong>A$1,200 annually</strong>
                <p>or A$150 monthly</p>
              </div>

              <Link href="/membership" className="textlink">
                Review membership details <Arrow />
              </Link>
            </aside>

            <div className="application-form-card" data-reveal data-delay="1">
              <div className="application-form-head">
                <span className="kicker">Membership application</span>
                <h2>Tell Us About Your Organisation</h2>
                <p>
                  The nominated contact should be someone who can discuss the
                  organisation&rsquo;s membership and onboarding with the Network.
                </p>
              </div>

              <div className="application-privacy-note">
                <span aria-hidden="true">●</span>
                <p>
                  Information submitted through the application will be stored
                  in Action Network and used to assess your organisation&rsquo;s
                  interest in membership and contact you about next steps.
                </p>
              </div>

              <ActionNetworkMembershipForm slug={formSlug} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
