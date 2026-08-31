/**
 * State network + member organisation data for the NetworkMap component.
 *
 * The data itself lives in `public/fnan-networks.json` so it can be edited (or
 * replaced at deploy time) without touching code — the map fetches it at
 * runtime. This module only holds the types and a small parser.
 *
 * Sources: docs/Links.md (state group pages), docs/Groups.md (organisations),
 * and the homepage logo carousel (logo assets + organisation websites).
 *
 * Data note to confirm:
 *  - The Noosa entry names two groups ("Noosa First Nations Allies e Sunshine
 *    Coast Reconciliation Group"); a separate Sunshine Coast logo/site exists.
 */

export const NETWORKS_URL = "/fnan-networks.json";

export type Organisation = {
  name: string;
  /** Action Network group page. */
  actionNetworkUrl?: string;
  /** The organisation's own website, where one exists. */
  siteUrl?: string;
  /** Logo asset path under /public. Omitted when we have no logo. */
  logo?: string;
  /**
   * Ecosystem category, used by the membership ecosystem graph. One of the
   * strings in `ECOSYSTEM_CATEGORIES` (src/lib/ecosystem.ts); anything else is
   * ignored. Omitted while an organisation is still to be categorised.
   */
  category?: string;
};

export type StateNetwork = {
  /** Must match the feature name in the GeoJSON. */
  name: string;
  /** Postal abbreviation, e.g. QLD. */
  abbr: string;
  /** Capital city, where the map pin is planted. */
  capital: { name: string; lngLat: [number, number] };
  /** Action Network page for the state network itself. */
  groupUrl?: string;
  organisations: Organisation[];
};

export type NetworksFile = { networks: StateNetwork[] };

/** Narrow the fetched JSON, dropping anything without the required fields. */
export function parseNetworks(value: unknown): StateNetwork[] {
  if (!value || typeof value !== "object") return [];
  const networks = (value as NetworksFile).networks;
  if (!Array.isArray(networks)) return [];

  return networks.filter(
    (network): network is StateNetwork =>
      Boolean(network) &&
      typeof network.name === "string" &&
      typeof network.abbr === "string" &&
      Array.isArray(network.organisations) &&
      Array.isArray(network.capital?.lngLat) &&
      network.capital.lngLat.length === 2,
  );
}

export function networksByName(networks: StateNetwork[]) {
  return new Map(networks.map((network) => [network.name, network]));
}

export async function fetchNetworks(
  url: string = NETWORKS_URL,
): Promise<StateNetwork[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseNetworks(await response.json());
}
