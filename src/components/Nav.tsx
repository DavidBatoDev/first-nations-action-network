"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type NavLink = { label: string; href: string };

type NavProps = {
  brandHref: string;
  links: NavLink[];
  exploreHref: string;
  joinHref: string;
};

export default function Nav({
  brandHref,
  links,
  exploreHref,
  joinHref,
}: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <Link
          href={brandHref}
          className="brand"
          aria-label="First Nations Action Network home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-on-dark.png"
            alt="First Nations Action Network"
            className="brand-img brand-dark"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-on-light.png"
            alt="First Nations Action Network"
            className="brand-img brand-light"
          />
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-cta">
          <Link href={exploreHref} className="btn btn-sm nav-ghost">
            Explore Allyship
          </Link>
          <Link href={joinHref} className="btn btn-primary btn-sm">
            Join the Network
          </Link>
        </div>
      </div>
    </nav>
  );
}
