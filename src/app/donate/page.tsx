import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DonationChooser from "@/components/DonationChooser";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow } from "@/components/icons";

const DONATE_DESCRIPTION =
  "Support First Nations Action Network community organising, leadership development, learning resources, events and advocacy.";

export const metadata: Metadata = {
  title: "Donate",
  description: DONATE_DESCRIPTION,
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Donate · First Nations Action Network",
    description: DONATE_DESCRIPTION,
    url: "/donate",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Allyship", href: "/allyship" },
  { label: "Events", href: "/events" },
  { label: "Shop", href: "/shop" },
];

const tiers = [
  {
    amount: "$15",
    title: "Keep people connected",
    outcome:
      "Helps sustain supporter communication and practical resources that keep people informed and ready to act.",
  },
  {
    amount: "$20",
    title: "Strengthen local action",
    outcome:
      "Helps community organisers share learning, coordinate participation and build momentum around local priorities.",
  },
  {
    amount: "$100",
    title: "Back community leadership",
    outcome:
      "Helps strengthen the events, leadership development and advocacy work that connect communities across Australia.",
  },
] as const;

export default function DonatePage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/membership"
      />

      <main className="home-page donation-page">
        <header className="donation-hero">
          <div className="wrap donation-hero-grid">
            <div className="donation-image" data-reveal>
              <Image
                src="/assets/support-group.png"
                alt="Community members and an ally wearing First Nations Action Network merchandise, smiling together"
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 48px), 52vw"
              />
              <p>
                Stronger communities are built by people choosing to show up,
                together.
              </p>
            </div>
            <div className="donation-intro">
              <span className="kicker on-dark" data-reveal>
                Give practical support
              </span>
              <h1 data-reveal data-delay="1">
                Help Community-Led{" "}
                <span className="em-action">Action Continue.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                Your donation helps First Nations Action Network connect
                communities, develop leaders, share learning and support
                collective action across Australia.
              </p>
              <DonationChooser />
            </div>
          </div>
        </header>

        <section className="sec bg-cream">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">What your support helps make possible</span>
              <h2>
                Every Amount Helps Build{" "}
                <span className="em-action">Shared Capacity.</span>
              </h2>
              <p className="lead">
                These outcomes show the areas each contribution helps sustain.
                Funds support the Network&rsquo;s work as a whole and are not
                assigned to one fixed item.
              </p>
            </div>
            <div className="donation-tiers">
              {tiers.map((tier, index) => (
                <article
                  className="donation-tier"
                  key={tier.amount}
                  data-reveal
                  data-delay={index === 0 ? undefined : String(index)}
                >
                  <span>{tier.amount}</span>
                  <h3>{tier.title}</h3>
                  <p>{tier.outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec donation-assurance">
          <div className="wrap split">
            <div data-reveal>
              <span className="kicker">Give in your own rhythm</span>
              <h2>
                One Contribution Or{" "}
                <span className="em-action">Ongoing Support.</span>
              </h2>
            </div>
            <div className="body" data-reveal data-delay="1">
              <p>
                Choose a one-time gift or contribute weekly, monthly or every
                three months. Recurring support helps the Network plan community
                organising and learning work with greater continuity.
              </p>
              <p>
                Online payments are not connected in this mockup. Until the
                approved donation system is live, no payment or personal details
                are collected here.
              </p>
              <Link href="/allyship" className="textlink">
                Learn more about allyship <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
