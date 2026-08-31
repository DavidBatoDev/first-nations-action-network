/**
 * The membership page's ecosystem graph: the eight categories that make up the
 * network, and the member organisations filed under each one.
 *
 * Pure module: no React, no DOM, no fetching. The organisation data itself
 * lives in `public/fnan-networks.json` (grouped by state, for the map) and is
 * read server-side; this module only reshapes it into the category-first form
 * the graph needs, so it stays easy to unit test.
 *
 * The category of each organisation is editorial, not derived — it comes from
 * the `category` field in the JSON so it can be corrected without touching code.
 */

import type { StateNetwork } from "@/components/NetworkMap";

/**
 * The eight ecosystem categories, in the order they ring the hub.
 *
 * Single source of truth: the membership page renders both the `ally-tags`
 * pills and the graph's first ring from this list, so the two cannot drift
 * apart. Source: docs/Membership Page Messaging Architecture v3.md, section 8.
 */
export const ECOSYSTEM_CATEGORIES = [
  "First Nations organisations",
  "Ally organisations",
  "Reconciliation groups",
  "Community groups",
  "Advocacy organisations",
  "Cultural organisations",
  "Workplace networks",
  "Social enterprises",
] as const;

export type EcosystemCategory = (typeof ECOSYSTEM_CATEGORIES)[number];

/**
 * Short captions for the graph's category nodes.
 *
 * "First Nations organisations" does not fit inside a 56px disc; the pills
 * beside the graph carry the full wording, so the node only needs enough to be
 * recognised. Keys must stay in step with `ECOSYSTEM_CATEGORIES`.
 */
export const ECOSYSTEM_SHORT_LABELS: Record<EcosystemCategory, string> = {
  "First Nations organisations": "First Nations",
  "Ally organisations": "Allies",
  "Reconciliation groups": "Reconciliation",
  "Community groups": "Community",
  "Advocacy organisations": "Advocacy",
  "Cultural organisations": "Cultural",
  "Workplace networks": "Workplace",
  "Social enterprises": "Social enterprise",
};

/** One member organisation, flattened out of its state and ready to draw. */
export type EcosystemOrg = {
  name: string;
  category: EcosystemCategory;
  /** Logo asset path under /public. Absent organisations draw as a plain dot. */
  logo?: string;
  /** Where the node links to: the organisation's own site, else Action Network. */
  href?: string;
  /** State/territory abbreviation, used in the accessible label. */
  state: string;
};

function isEcosystemCategory(value: unknown): value is EcosystemCategory {
  return (ECOSYSTEM_CATEGORIES as readonly string[]).includes(value as string);
}

/**
 * Flatten state networks into a flat list of categorised organisations.
 *
 * Organisations with no `category`, or one that is not a known category, are
 * left out — an uncategorised organisation is not a claim we want the graph to
 * make on its behalf.
 */
export function ecosystemOrgs(networks: StateNetwork[]): EcosystemOrg[] {
  const orgs: EcosystemOrg[] = [];

  for (const network of networks) {
    for (const organisation of network.organisations) {
      if (!isEcosystemCategory(organisation.category)) continue;
      orgs.push({
        name: organisation.name,
        category: organisation.category,
        logo: organisation.logo,
        href: organisation.siteUrl ?? organisation.actionNetworkUrl,
        state: network.abbr,
      });
    }
  }

  return orgs;
}

/**
 * Group organisations under their category.
 *
 * Every category is present in the returned map, in `ECOSYSTEM_CATEGORIES`
 * order, even when it has no members yet — the graph draws all eight either
 * way, and an empty category is a truthful "no members here yet".
 */
export function groupByCategory(
  orgs: EcosystemOrg[],
): Map<EcosystemCategory, EcosystemOrg[]> {
  const grouped = new Map<EcosystemCategory, EcosystemOrg[]>(
    ECOSYSTEM_CATEGORIES.map((category) => [category, []]),
  );

  for (const org of orgs) {
    grouped.get(org.category)?.push(org);
  }

  return grouped;
}
