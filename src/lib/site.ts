/**
 * Shared site constants used across metadata, robots and sitemap.
 *
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.fnan.org.au) so that
 * Open Graph / canonical / sitemap URLs resolve to absolute links. Falls back
 * to a placeholder domain for local development.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.firstnationsactionnetwork.org.au";

export const SITE_NAME = "First Nations Action Network";

export const SITE_DESCRIPTION =
  "A First Nations–led national network bringing together First Nations and ally organisations across Australia to strengthen communities, develop leadership, share resources and create positive change through collective action.";
