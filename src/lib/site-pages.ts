/**
 * Registry for the site's utility and policy routes.
 *
 * These pages are declared here rather than inline so the footer legal row and
 * the XML sitemap stay in step with one another automatically. Adding a route
 * to this list is enough to publish it in both places — page files themselves
 * never need to touch `Footer.tsx` or `sitemap.ts`.
 *
 * Content routes are not listed here; they remain enumerated in
 * `src/app/sitemap.ts` because they carry their own priorities and change
 * frequencies.
 */
export type UtilityPage = {
  /** Route path, used for both the footer link and the sitemap URL. */
  href: string;
  /** Short label for the footer legal row. */
  label: string;
  /** Full document title, used for <title> and the page heading. */
  title: string;
  /** Sitemap priority. Policy pages sit below content pages. */
  priority: number;
};

export const UTILITY_PAGES: readonly UtilityPage[] = [
  {
    href: "/privacy",
    label: "Privacy",
    title: "Privacy Policy",
    priority: 0.3,
  },
  {
    href: "/terms",
    label: "Terms",
    title: "Terms of Use",
    priority: 0.3,
  },
  {
    href: "/accessibility",
    label: "Accessibility",
    title: "Accessibility",
    priority: 0.3,
  },
  {
    href: "/code-of-conduct",
    label: "Code of Conduct",
    title: "Code of Conduct",
    priority: 0.4,
  },
  {
    href: "/acknowledgement-of-country",
    label: "Acknowledgement of Country",
    title: "Acknowledgement of Country",
    priority: 0.4,
  },
] as const;

/**
 * Shown wherever the site displays photographs, recordings or names of
 * community members. Kept here so the footer and the Acknowledgement of
 * Country page use identical wording.
 */
export const DECEASED_PERSONS_NOTICE =
  "Aboriginal and Torres Strait Islander peoples are advised that this website may contain images, voices and names of people who have died.";
