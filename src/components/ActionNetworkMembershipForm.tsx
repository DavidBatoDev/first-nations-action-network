"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type FormStatus = "loading" | "ready" | "error";

type ActionNetworkMembershipFormProps = {
  slug?: string;
};

export default function ActionNetworkMembershipForm({
  slug,
}: ActionNetworkMembershipFormProps) {
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
        <h3>Online applications are not open yet</h3>
        <p>
          The membership application is being connected to the Network&rsquo;s review
          process. No information can be submitted from this page yet.
        </p>
        <Link href="/membership" className="btn btn-ghost">
          Return to membership
        </Link>
      </div>
    );
  }

  const targetId = `can-form-area-${slug}`;

  return (
    <div className={`application-widget is-${status}`}>
      {status === "loading" ? (
        <div className="application-loading" role="status" aria-live="polite">
          <span className="application-loader" aria-hidden="true" />
          Loading the secure application form&hellip;
        </div>
      ) : null}

      {status === "error" ? (
        <div className="application-unavailable" role="alert">
          <span className="application-state-mark" aria-hidden="true">
            !
          </span>
          <h3>The application form could not load</h3>
          <p>
            Refresh the page to try again. Your information has not been sent.
          </p>
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
        id={`action-network-membership-${slug}`}
        src={`https://actionnetwork.org/widgets/v2/form/${slug}?format=js&source=widget`}
        strategy="afterInteractive"
        onLoad={detectForm}
        onReady={detectForm}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
