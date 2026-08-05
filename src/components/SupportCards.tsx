import Image from "next/image";
import { Arrow, Tick } from "@/components/icons";
import { EXTERNAL_LINKS } from "@/lib/external-links";

export default function SupportCards() {
  return (
    <div className="support-grid">
      <article className="support-card" data-reveal>
        <div className="sc-media">
          <Image
            src="/assets/support-group.png"
            alt="Community members and an ally wearing First Nations Action Network merchandise, smiling together"
            fill
            sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
          />
        </div>
        <div className="sc-body">
          <div className="sc-head">
            <span className="sc-icon sc-icon-yellow">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
              </svg>
            </span>
            <div>
              <h3>Make a Donation</h3>
              <p className="sc-sub">Help keep the work moving</p>
            </div>
          </div>
          <p className="sc-copy">
            Every contribution supports practical community organising,
            leadership development and advocacy work that strengthens
            communities across Australia.
          </p>
          <ul className="sc-bullets">
            {[
              "Community organising",
              "Educational resources",
              "Leadership development",
              "Advocacy initiatives",
              "Community events",
            ].map((item) => (
              <li key={item}>
                <span className="tick">
                  <Tick size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href={EXTERNAL_LINKS.donate}
            className="btn btn-primary sc-cta"
            target="_blank"
            rel="noopener"
            aria-label="Make a Donation (opens in a new tab)"
          >
            Make a Donation <Arrow />
          </a>
        </div>
      </article>

      <article className="support-card" data-reveal data-delay="1">
        <div className="sc-media">
          <Image
            src="/assets/support-merch.png"
            alt="Two people seen from behind wearing First Nations Action Network and First Nations Allies merchandise at a community gathering"
            fill
            sizes="(max-width: 900px) calc(100vw - 48px), 46vw"
          />
        </div>
        <div className="sc-body">
          <div className="sc-head">
            <span className="sc-icon sc-icon-ochre">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3 4 6l2.5 3L8 8v13h8V8l1.5 1L20 6l-4-3-1.8 1.4a3 3 0 0 1-4.4 0z" />
              </svg>
            </span>
            <div>
              <h3>Shop</h3>
              <p className="sc-sub">Wear your values</p>
            </div>
          </div>
          <p className="sc-copy">
            Wear your values and help grow the movement through First Nations
            Action Network and First Nations Allies merchandise. Every purchase
            supports the work.
          </p>
          <div className="merch-row" aria-label="Merchandise preview">
            <figure className="merch-item">
              <div className="m-thumb">
                <Image
                  src="/assets/merch-network-tee.jpg"
                  alt="First Nations Action Network black t-shirt"
                  fill
                  sizes="(max-width: 900px) 28vw, 14vw"
                />
              </div>
            </figure>
            <figure className="merch-item">
              <div className="m-thumb">
                <Image
                  src="/assets/merch-hoodie.jpg"
                  alt="First Nations Action Network black zip hoodie"
                  fill
                  sizes="(max-width: 900px) 28vw, 14vw"
                />
              </div>
            </figure>
            <figure className="merch-item">
              <div className="m-thumb">
                <Image
                  src="/assets/merch-allies-tee.jpg"
                  alt="First Nations Allies white t-shirt"
                  fill
                  sizes="(max-width: 900px) 28vw, 14vw"
                />
              </div>
            </figure>
          </div>
          <a
            href={EXTERNAL_LINKS.shop}
            className="btn btn-ochre sc-cta"
            target="_blank"
            rel="noopener"
            aria-label="Visit the Shop (opens in a new tab)"
          >
            Visit the Shop <Arrow />
          </a>
        </div>
      </article>
    </div>
  );
}
