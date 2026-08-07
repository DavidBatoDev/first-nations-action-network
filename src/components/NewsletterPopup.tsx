"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { EXTERNAL_LINKS } from "@/lib/external-links";
import { readState, shouldShow, writeState } from "@/lib/newsletter-popup";

/** Delay before the pop-up appears unprompted. */
const DELAY_MS = 10_000;
/** Share of the scrollable page that counts as real engagement. */
const SCROLL_FRACTION = 0.4;
/** How soon to try again when the mobile nav is covering the page. */
const NAV_RETRY_MS = 1_500;

/**
 * Homepage mailing-list invitation.
 *
 * Sign-up itself happens on Action Network: this is only an invitation that
 * links out, so no form data or API credentials ever touch the browser.
 */
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  /** Guards against a second appearance in the same page view. */
  const shownRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  /** Element focused before the dialog opened, so focus can be handed back. */
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const headingId = useId();
  const bodyId = useId();

  const close = useCallback(() => {
    // Closing is a soft no: ask again after the cooldown.
    writeState("dismissed");
    setOpen(false);
  }, []);

  /** Following the sign-up link retires the pop-up for good. */
  const acceptAndClose = useCallback(() => {
    writeState("subscribed");
    setOpen(false);
  }, []);

  /**
   * Whichever of the three triggers fires first opens the pop-up; the rest are
   * then torn down so it can never appear twice.
   */
  useEffect(() => {
    // Storage is only read here, never during render, so the server and client
    // markup always agree.
    if (!shouldShow(readState(), Date.now())) return;

    let timer = 0;
    let disposed = false;

    const scrolledFarEnough = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return false;
      return window.scrollY / scrollable >= SCROLL_FRACTION;
    };

    const onScroll = () => {
      if (scrolledFarEnough()) attempt();
    };

    const onMouseOut = (event: MouseEvent) => {
      // Leaving through the top of the window, not merely crossing elements.
      if (event.relatedTarget || event.clientY > 0) return;
      attempt();
    };

    const teardown = () => {
      window.clearTimeout(timer);
      timer = 0;
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };

    function attempt() {
      if (disposed || shownRef.current) return;

      // The mobile nav drawer already owns the screen and the scroll lock.
      // Wait for it rather than stacking a second overlay on top.
      if (document.querySelector(".nav.menu-open")) {
        window.clearTimeout(timer);
        timer = window.setTimeout(attempt, NAV_RETRY_MS);
        return;
      }

      shownRef.current = true;
      teardown();
      setOpen(true);
    }

    timer = window.setTimeout(attempt, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Exit intent needs a real cursor: on touch devices `mouseout` fires in
    // ways that have nothing to do with leaving the page.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ??
          [],
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      // Keep Tab inside the dialog: wrap at both ends, and pull focus back in
      // if it somehow escaped to the page behind.
      const activeIndex = items.indexOf(document.activeElement as HTMLElement);
      if (activeIndex === -1) {
        event.preventDefault();
        items[event.shiftKey ? items.length - 1 : 0]?.focus();
      } else if (!event.shiftKey && activeIndex === items.length - 1) {
        event.preventDefault();
        items[0]?.focus();
      } else if (event.shiftKey && activeIndex === 0) {
        event.preventDefault();
        items.at(-1)?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      50,
    );

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      // This cleanup runs after React has removed the dialog, so focus can be
      // handed back immediately. (Deferring with requestAnimationFrame would
      // silently do nothing whenever the page is not being painted.)
      const returnTo = returnFocusRef.current;
      returnFocusRef.current = null;
      if (returnTo?.isConnected) returnTo.focus();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="nlpop-backdrop"
      // Only a click on the backdrop itself dismisses; clicks inside the
      // dialog bubble up here too, so the target has to be checked.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="nlpop"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="nlpop-close"
          aria-label="Close"
          onClick={close}
        >
          <span aria-hidden="true">×</span>
        </button>

        <p className="kicker nlpop-kicker">Stay in the loop</p>
        <h2 id={headingId} className="nlpop-title">
          Get updates from the Network
        </h2>
        <p id={bodyId} className="nlpop-body">
          We’ll let you know what’s happening across the Network and how to get
          involved. Unsubscribe any time.
        </p>

        <div className="nlpop-actions">
          <a
            className="btn btn-primary nlpop-cta"
            href={EXTERNAL_LINKS.subscribe}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sign up for updates (opens in a new tab)"
            onClick={acceptAndClose}
          >
            Sign up for updates
          </a>
          <button type="button" className="nlpop-dismiss" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
