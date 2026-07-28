import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import Nav, { type NavLink } from "@/components/Nav";

const ALLYSHIP_DESCRIPTION =
  "Learn about First Nations Allies, a growing community committed to respectful relationships and positive outcomes for First Nations peoples.";

export const metadata: Metadata = {
  title: "First Nations Allies",
  description: ALLYSHIP_DESCRIPTION,
  alternates: { canonical: "/allyship" },
  openGraph: {
    title: "First Nations Allies · First Nations Action Network",
    description: ALLYSHIP_DESCRIPTION,
    url: "/allyship",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
];

export default function AllyshipPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/membership"
      />

      <main className="home-page allyship-page">
        <section className="sec allies">
          <div className="wrap allies-grid">
            <div data-reveal>
              <span className="kicker on-dark">First Nations Allies</span>
              <h1 style={{ marginTop: 18 }} data-reveal data-delay="1">
                Walk <span className="em-action">Alongside</span> Community
              </h1>
              <p className="body" data-reveal data-delay="2">
                First Nations Allies is a growing community of individuals,
                organisations and businesses committed to building respectful
                relationships and supporting positive outcomes for First Nations
                peoples.
              </p>
              <p className="pull" data-reveal data-delay="3">
                Being an ally is more than a statement. It is an ongoing
                commitment to <b>learning, listening and taking action.</b>
              </p>
              <div className="ally-tags" aria-label="First Nations Allies community">
                <span>Individuals</span>
                <span>Organisations</span>
                <span>Businesses</span>
                <span>Community supporters</span>
              </div>
            </div>
            <div className="a-img" data-reveal data-delay="1">
              <ImageSlot
                src="/images/allies.webp"
                alt="Allies and community together"
                note="Allies & community together"
                rounded={16}
                sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
              />
            </div>
          </div>
        </section>

        <section className="sec bg-cream">
          <div className="wrap split media-left">
            <div className="allyship-mark-panel" data-reveal>
              <Image
                src="/assets/logos/first-nations-allies.png"
                alt="First Nations Allies mark"
                className="allyship-mark"
                width={501}
                height={251}
                sizes="(max-width: 900px) min(360px, calc(100vw - 96px)), 40vw"
              />
            </div>
            <div data-reveal data-delay="1">
              <span className="kicker">What First Nations Allies is</span>
              <h2 style={{ fontSize: "clamp(32px,3.8vw,48px)", marginTop: 18 }}>
                A Shared Sign Of <span className="em-action">Support.</span>
              </h2>
              <div className="body" style={{ marginTop: 24 }}>
                <p>
                  First Nations Allies is the First Nations Action Network&rsquo;s
                  registered trading name and a shared identification brand for
                  ally groups, businesses and community supporters.
                </p>
                <p>
                  It helps people visibly signal support for First Nations peoples
                  while building a shared identity across independently branded
                  groups.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Allyship in practice</span>
              <h2>
                Relationships Built Through <span className="em-action">Action.</span>
              </h2>
              <p className="lead">
                Allyship begins with a commitment to respectful relationships and
                continues through learning, listening and meaningful action.
              </p>
            </div>
            <div className="pillars allyship-principles">
              <article className="pill" data-reveal>
                <h4>Respectful relationships</h4>
                <p>
                  Build authentic relationships that support positive outcomes for
                  First Nations peoples.
                </p>
              </article>
              <article className="pill" data-reveal data-delay="1">
                <h4>Learning and listening</h4>
                <p>
                  Make space for ongoing learning and listening alongside
                  community.
                </p>
              </article>
              <article className="pill" data-reveal data-delay="2">
                <h4>Meaningful action</h4>
                <p>
                  Support community wellbeing, leadership and First Nations
                  self-determination through action.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sec bg-cream">
          <div className="wrap split">
            <div data-reveal>
              <span className="kicker">Using the mark</span>
              <h2 style={{ fontSize: "clamp(32px,3.8vw,48px)", marginTop: 18 }}>
                Carry Your Own Identity, <span className="em-action">Together.</span>
              </h2>
              <div className="body" style={{ marginTop: 24 }}>
                <p>
                  The First Nations Allies mark can be displayed in places such
                  as shop windows and on T-shirts to show support for First
                  Nations peoples.
                </p>
                <p>
                  Groups keep their own branding. The Allies mark connects that
                  work to a wider community of support.
                </p>
              </div>
            </div>
            <aside className="allyship-use-note" data-reveal data-delay="1">
              <span className="kicker">Free to adopt</span>
              <p>
                The mark is a shared expression of support. Formal brand and
                participation guidance will be published once it is approved.
              </p>
            </aside>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Participation and conduct</span>
              <h2>Community Participation, Not A Fee.</h2>
              <p className="lead">
                First Nations Allies is free to adopt. Its value comes from the
                community that chooses to participate.
              </p>
            </div>
            <div className="allyship-guidance" data-reveal data-delay="1">
              <div>
                <h3>Shared participation</h3>
                <p>
                  FNAN&rsquo;s Code of Conduct will guide participation when the
                  approved guidance is published.
                </p>
              </div>
              <div>
                <h3>Separate from membership</h3>
                <p>
                  Adopting the Allies mark is separate from FNAN&rsquo;s paid
                  organisation membership, which provides tools, training,
                  resources and national connections.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
