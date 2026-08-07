"use client";

import { useEffect } from "react";

import { writeState } from "@/lib/newsletter-popup";

/**
 * Renders nothing; records that this visitor has already reached a sign-up
 * form. Mounted on the membership and contact pages so the homepage pop-up
 * does not interrupt someone who is part-way through joining.
 */
export default function NewsletterPopupSuppressor() {
  useEffect(() => {
    writeState("suppressed");
  }, []);

  return null;
}
