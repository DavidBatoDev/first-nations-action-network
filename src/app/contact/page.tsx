import type { Metadata } from "next";
import Link from "next/link";
import ActionNetworkForm from "@/components/ActionNetworkForm";
import Footer from "@/components/Footer";
import NewsletterPopupSuppressor from "@/components/NewsletterPopupSuppressor";
import Nav, { type NavLink } from "@/components/Nav";
import { Tick } from "@/components/icons";

const CONTACT_DESCRIPTION =
  "Book a conversation with the First Nations Action Network. Send a message about contributing, training, partnerships or general enquiries.";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · First Nations Action Network",
    description: CONTACT_DESCRIPTION,
    url: "/contact",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

const rawContactSlug = process.env.ACTION_NETWORK_CONTACT_FORM_SLUG?.trim();
const contactSlug =
  rawContactSlug && /^[a-z0-9-]+$/.test(rawContactSlug)
    ? rawContactSlug
    : undefined;

const contactSteps = [
  {
    number: "01",
    title: "Send your message",
    copy: "Tell us a little about you and what you would like to talk about.",
  },
  {
    number: "02",
    title: "It reaches the team",
    copy: "Your details are captured securely so the right person can respond.",
  },
  {
    number: "03",
    title: "We start the conversation",
    copy: "Someone from the Network follows up to continue the conversation.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/contributors"
      />

      <main className="home-page application-page">
        <header className="application-hero">
          <div className="wrap application-hero-grid">
            <div>
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span> Contact
              </span>
              <span className="kicker on-dark" data-reveal>
                Start the conversation
              </span>
              <h1 data-reveal data-delay="1">
                Book A <span className="em-action">Conversation.</span>
              </h1>
            </div>
            <div className="application-hero-copy" data-reveal data-delay="2">
              <p className="lead">
                Whether you are exploring contributing, training, a partnership or
                just want to talk, send us a message and the team will be in
                touch.
              </p>
              <div className="application-trust" aria-label="Contact assurances">
                <span>
                  <Tick size={12} /> Goes straight to the team
                </span>
                <span>
                  <Tick size={12} /> No obligation
                </span>
                <span>
                  <Tick size={12} /> A real conversation
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="sec bg-cream application-section">
          <div className="wrap application-layout">
            <aside className="application-rail" data-reveal>
              <span className="kicker">What happens next</span>
              <h2>A Conversation, Not A Sales Pitch.</h2>
              <p className="application-rail-intro">
                This is the best way to reach us. Your message is captured
                securely and a real person follows up.
              </p>

              <ol className="application-steps">
                {contactSteps.map((step) => (
                  <li key={step.number}>
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="application-form-card" data-reveal data-delay="1">
              <div className="application-form-head">
                <span className="kicker">Send a message</span>
                <h2>Tell Us How We Can Help</h2>
                <p>
                  Share your enquiry and the best way to reach you, and we will
                  get back to you.
                </p>
              </div>

              <div className="application-privacy-note">
                <span aria-hidden="true">●</span>
                <p>
                  Information submitted through this form is stored in Action
                  Network and used only to respond to your enquiry.
                </p>
              </div>

              <ActionNetworkForm
                slug={contactSlug}
                loadingLabel={"Loading the secure contact form\u2026"}
                errorTitle="The contact form could not load"
                unavailableTitle="The contact form is not open yet"
                unavailableBody={
                  "We are connecting the contact form so your message reaches us directly. In the meantime you can join the Network or explore the site."
                }
                unavailableAction={{ href: "/", label: "Return home" }}
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
