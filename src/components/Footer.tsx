import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/external-links";
import { UTILITY_PAGES, DECEASED_PERSONS_NOTICE } from "@/lib/site-pages";

export default function Footer() {
  return (
    <footer id="contact" className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Image
              src="/assets/logo-on-dark.png"
              alt="First Nations Action Network"
              className="foot-logo-img"
              width={1201}
              height={794}
              sizes="160px"
            />
            <p className="foot-blurb">
              A national network supporting First Nations and ally organisations
              through community organising, leadership development and
              collective action.
            </p>
            <a
              href={EXTERNAL_LINKS.subscribe}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-sm foot-subscribe"
              aria-label="Subscribe to updates (opens in a new tab)"
            >
              Subscribe to updates
            </a>
          </div>
          <div>
            <h5>Network</h5>
            <ul>
              <li>
                <Link href="/who-we-are">Who We Are</Link>
              </li>
              <li>
                <Link href="/#how">How It Works</Link>
              </li>
              <li>
                <Link href="/contributors">Become a Contributor</Link>
              </li>
              <li>
                <Link href="/allyship">First Nations Allies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Learn</h5>
            <ul>
              <li>
                <Link href="/learn">Learning and Development</Link>
              </li>
              <li>
                <Link href="/stories">Community Stories</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/directory">Community Directory</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li>
                <Link href="/contributors">Join the Network</Link>
              </li>
              <li>
                <Link href="/contact">Book a Conversation</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/#take-action">Take Action</Link>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.donate}
                  target="_blank"
                  rel="noopener"
                  aria-label="Donate (opens in a new tab)"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.shop}
                  target="_blank"
                  rel="noopener"
                  aria-label="Shop (opens in a new tab)"
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-close">
          <p className="foot-ack">
            First Nations Action Network
            acknowledges Country — the lands, the waters, the skies and the
            winds — connected to the Traditional Custodians and all that live,
            work and play on the sacred places of the ancestors that have walked
            before, that walk today and those that will emerge to walk into the
            future.
          </p>
          <p className="foot-notice">{DECEASED_PERSONS_NOTICE}</p>
        </div>
        <div className="foot-bottom">
          <span>© 2026 First Nations Action Network. All rights reserved.</span>
          <ul className="foot-legal">
            {UTILITY_PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href}>{page.label}</Link>
              </li>
            ))}
          </ul>
          <div className="socials">
            <a
              href={EXTERNAL_LINKS.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href={EXTERNAL_LINKS.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={EXTERNAL_LINKS.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.6 4.75 6V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9s-2.05 1.38-2.05 2.8V21h-4z" />
              </svg>
            </a>
            <a
              href={EXTERNAL_LINKS.youtube}
              target="_blank"
              rel="noopener"
              aria-label="YouTube (opens in a new tab)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.76-1.76C19.34 5.13 12 5.13 12 5.13s-7.34 0-8.84.4A2.5 2.5 0 0 0 1.4 7.3 26 26 0 0 0 1 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.76 1.76c1.5.4 8.84.4 8.84.4s7.34 0 8.84-.4a2.5 2.5 0 0 0 1.76-1.76C23 15.2 23 12 23 12zM9.75 15.5v-7l6 3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
