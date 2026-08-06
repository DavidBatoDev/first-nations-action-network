"use client";

import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type FormStatus = "loading" | "ready" | "error";

type ActionNetworkFormProps = {
  /** Public Action Network widget slug (never the API key). */
  slug?: string;
  loadingLabel?: string;
  errorTitle?: string;
  errorBody?: string;
  unavailableTitle?: string;
  unavailableBody?: ReactNode;
  unavailableAction?: { href: string; label: string };
};

export default function ActionNetworkForm({
  slug,
  loadingLabel = "Loading the secure form\u2026",
  errorTitle = "The form could not load",
  errorBody = "Refresh the page to try again. Your information has not been sent.",
  unavailableTitle = "This form is not available yet",
  unavailableBody = "This form is being connected. No information can be submitted from this page yet.",
  unavailableAction,
}: ActionNetworkFormProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("loading");

  const detectForm = useCallback(() => {
    if (targetRef.current?.querySelector("form")) {
      setStatus("ready");
    }
  }, []);

  useEffect(() => {
    if (!slug || !targetRef.current) return;

    const target = targetRef.current;
    const observer = new MutationObserver(detectForm);
    observer.observe(target, { childList: true, subtree: true });
    detectForm();

    const timeout = window.setTimeout(() => {
      if (!target.querySelector("form")) setStatus("error");
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [detectForm, slug]);

  if (!slug) {
    return (
      <div className="application-unavailable" role="status">
        <span className="application-state-mark" aria-hidden="true">
          ○
        </span>
        <h3>{unavailableTitle}</h3>
        <p>{unavailableBody}</p>
        {unavailableAction ? (
          <Link href={unavailableAction.href} className="btn btn-ghost">
            {unavailableAction.label}
          </Link>
        ) : null}
      </div>
    );
  }

  const targetId = `can-form-area-${slug}`;

  return (
    <div className={`application-widget is-${status}`}>
      {status === "loading" ? (
        <div className="application-loading" role="status" aria-live="polite">
          <span className="application-loader" aria-hidden="true" />
          {loadingLabel}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="application-unavailable" role="alert">
          <span className="application-state-mark" aria-hidden="true">
            !
          </span>
          <h3>{errorTitle}</h3>
          <p>{errorBody}</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => window.location.reload()}
          >
            Reload the form
          </button>
        </div>
      ) : null}

      <div
        ref={targetRef}
        id={targetId}
        className="action-network-form-target"
        aria-hidden={status === "error" ? true : undefined}
      />
      <Script
        id={`action-network-form-${slug}`}
        src={`https://actionnetwork.org/widgets/v2/form/${slug}?format=js&source=widget`}
        strategy="afterInteractive"
        onLoad={detectForm}
        onReady={detectForm}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
