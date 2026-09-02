"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavLink = {
  label: string;
  href: string;
  /** Same-page section (e.g. "#who") the scroll-spy tracks for this link
   *  when it differs from href. Hash hrefs are tracked automatically. */
  spy?: string;
};

type NavProps = {
  brandHref: string;
  links: NavLink[];
  exploreHref: string;
  joinHref: string;
  /** Force the solid/light appearance (for pages that open on a light section). */
  solid?: boolean;
};

export default function Nav({
  brandHref,
  links,
  exploreHref,
  joinHref,
  solid = false,
}: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link whose same-page section is in view.
  useEffect(() => {
    const sections = links
      .map((l) => {
        const hash = l.spy ?? (l.href.startsWith("#") ? l.href : null);
        return hash
          ? { href: l.href, el: document.getElementById(hash.slice(1)) }
          : null;
      })
      .filter(
        (s): s is { href: string; el: HTMLElement } => s !== null && s.el !== null,
      );
    if (sections.length === 0) return;

    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const s of sections) {
        const r = s.el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = s.href;
      }
      setActiveHash(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [links]);

  const linkProps = (href: string) =>
    href === activeHash
      ? { className: "is-active", "aria-current": "location" as const }
      : {};

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeAndRestoreFocus = () => {
      setMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAndRestoreFocus();
      if (event.key === "Tab") {
        const links = Array.from(
          menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
        );
        const focusable: HTMLElement[] = [
          ...(menuButtonRef.current ? [menuButtonRef.current] : []),
          ...links,
        ];
        const activeIndex = focusable.indexOf(
          document.activeElement as HTMLElement,
        );

        if (!event.shiftKey && activeIndex === focusable.length - 1) {
          event.preventDefault();
          focusable[0]?.focus();
        } else if (event.shiftKey && activeIndex === 0) {
          event.preventDefault();
          focusable.at(-1)?.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1080) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`nav${solid || scrolled ? " scrolled" : ""}${
        menuOpen ? " menu-open" : ""
      }`}
    >
      <div className="wrap nav-inner">
        <Link
          href={brandHref}
          className="brand"
          aria-label="First Nations Action Network home"
          onNavigate={closeMenu}
        >
          <Image
            src="/assets/logo-on-dark.png"
            alt="First Nations Action Network"
            className="brand-img brand-dark"
            width={1201}
            height={794}
            sizes="96px"
          />
          <Image
            src="/assets/logo-on-light.png"
            alt="First Nations Action Network"
            className="brand-img brand-light"
            width={1202}
            height={794}
            sizes="96px"
          />
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.label} href={l.href} {...linkProps(l.href)}>
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
        <div className="mobile-nav-actions">
          <Link
            href={joinHref}
            className="btn btn-primary btn-sm mobile-join"
            onNavigate={closeMenu}
          >
            Join
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div
        className="mobile-nav-backdrop"
        aria-hidden="true"
        onClick={() => {
          setMenuOpen(false);
          window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        }}
      />
      <div
        ref={menuRef}
        id="mobile-navigation"
        className="mobile-nav-menu"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-links">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onNavigate={closeMenu}
              onClick={closeMenu}
              {...linkProps(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={exploreHref}
            className="mobile-explore"
            tabIndex={menuOpen ? 0 : -1}
            onNavigate={closeMenu}
            onClick={closeMenu}
          >
            Explore Allyship
          </Link>
        </div>
      </div>
    </nav>
  );
}
