import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { Arrow } from "@/components/icons";

const SHOP_DESCRIPTION =
  "Preview First Nations Action Network and First Nations Allies merchandise that helps support the Network's work.";

export const metadata: Metadata = {
  title: "Shop",
  description: SHOP_DESCRIPTION,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop · First Nations Action Network",
    description: SHOP_DESCRIPTION,
    url: "/shop",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/#who" },
  { label: "Allyship", href: "/allyship" },
  { label: "Donate", href: "/donate" },
  { label: "Events", href: "/events" },
];

const products = [
  {
    name: "First Nations Action Network Tee",
    price: "$40",
    image: "/assets/merch-fnan-tee.jpg",
    alt: "First Nations Action Network black t-shirt",
    detail: "Black · Double-sided print",
  },
  {
    name: "First Nations Action Network Hoodie",
    price: "$65",
    image: "/assets/merch-hoodie.jpg",
    alt: "First Nations Action Network black zip hoodie",
    detail: "Black · Zip front",
  },
  {
    name: "First Nations Allies Tee",
    price: "$40",
    image: "/assets/merch-allies-tee.jpg",
    alt: "First Nations Allies white t-shirt",
    detail: "White · Allies mark",
  },
] as const;

export default function ShopPage() {
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/allyship"
        joinHref="/membership"
      />

      <main className="home-page shop-page">
        <header className="shop-hero">
          <div className="wrap shop-hero-grid">
            <div>
              <span className="kicker on-dark" data-reveal>
                Shop the movement
              </span>
              <h1 data-reveal data-delay="1">
                Wear The Message.{" "}
                <span className="em-action">Support The Work.</span>
              </h1>
            </div>
            <div data-reveal data-delay="2">
              <p className="lead">
                First Nations Action Network and First Nations Allies
                merchandise creates a visible sign of support while helping
                strengthen community-led work.
              </p>
              <p className="mockup-callout">
                Shop preview — ordering and payment are not yet connected.
              </p>
            </div>
          </div>
        </header>

        <section className="sec">
          <div className="wrap">
            <div className="shop-toolbar" data-reveal>
              <div>
                <span className="kicker">Current range</span>
                <h2>Made To Carry A Shared Message.</h2>
              </div>
              <p>3 items · Indicative pricing in AUD</p>
            </div>

            <div className="product-grid">
              {products.map((product, index) => (
                <article
                  className="product-card"
                  key={product.name}
                  data-reveal
                  data-delay={index === 0 ? undefined : String(index)}
                >
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(max-width: 760px) calc(100vw - 48px), 31vw"
                    />
                    <span>Preview</span>
                  </div>
                  <div className="product-info">
                    <p className="product-detail">{product.detail}</p>
                    <h3>{product.name}</h3>
                    <div className="product-price">
                      <strong>{product.price}</strong>
                      <span>Indicative</span>
                    </div>
                    <div className="product-size" aria-label="Size preview">
                      <span>Size</span>
                      <div>
                        <span>S</span>
                        <span>M</span>
                        <span>L</span>
                        <span>XL</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn product-button"
                      disabled
                    >
                      Ordering coming soon
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec bg-cream shop-support-band">
          <div className="wrap split">
            <div data-reveal>
              <span className="kicker">Another way to contribute</span>
              <h2>
                Support Without{" "}
                <span className="em-action">Buying A Thing.</span>
              </h2>
            </div>
            <div className="body" data-reveal data-delay="1">
              <p>
                A direct contribution helps sustain community organising,
                leadership development, educational resources, events and
                advocacy across the Network.
              </p>
              <Link href="/donate" className="btn btn-primary">
                Make a Donation <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
