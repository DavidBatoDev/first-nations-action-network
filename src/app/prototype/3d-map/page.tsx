import type { Metadata } from "next";
import { NetworkMap } from "@/components/NetworkMap";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseNetworks, type StateNetwork } from "@/components/NetworkMap";

/**
 * TEMPORARY PROTOTYPE — not part of the main site navigation.
 * Explores a stylised 3D map of Australia with per-state network trees for the
 * membership-page rework (pending request #6). Excluded from search engines and
 * the sitemap.
 */
export const metadata: Metadata = {
  title: "Prototype · 3D Map of Australia",
  description:
    "Temporary prototype of a stylised, interactive 3D map of Australia showing state networks, member organisations and the Torres Strait Islands.",
  robots: { index: false, follow: false },
};

/** Same JSON the map fetches, read here so the text list is server-rendered. */
async function readNetworks(): Promise<StateNetwork[]> {
  const file = path.join(process.cwd(), "public", "fnan-networks.json");
  return parseNetworks(JSON.parse(await readFile(file, "utf8")));
}

export default async function Prototype3DMapPage() {
  const STATE_NETWORKS = await readNetworks();
  const totalOrganisations = STATE_NETWORKS.reduce(
    (total, network) => total + network.organisations.length,
    0,
  );

  return (
    <main className="map3d-page">
      <header className="map3d-head">
        <p className="map3d-flag">Prototype · not linked from the site</p>
        <h1>
          A 3D Map of <span className="map3d-em">Australia</span>
        </h1>
        <p className="map3d-lead">
          Extruded landmass from 1:10m GeoJSON, dashed state borders on the top
          surface, state names imprinted into it, and Torres Strait Islands
          marked above Cape York. Hover a pin to balloon it and spring out a
          graph of that network&rsquo;s organisations; click to zoom into the
          state, where the pin becomes the network card and the full tree
          branches out either side.
        </p>
      </header>

      <NetworkMap />

      <section className="map3d-legend" aria-label="State networks and organisations">
        <div className="map3d-links">
          <h2>State networks and member organisations</h2>
          <p>
            The same destinations as the map, listed for keyboard and
            screen-reader access — {totalOrganisations} organisations across{" "}
            {STATE_NETWORKS.length} state and territory networks.
          </p>

          <div className="map3d-statelist">
            {STATE_NETWORKS.map((network) => (
              <section key={network.abbr} className="map3d-statelist-item">
                <h3>
                  {network.groupUrl ? (
                    <a
                      href={network.groupUrl}
                      target="_blank"
                      rel="noopener"
                      aria-label={`First Nations Action Network ${network.abbr} group page (opens in a new tab)`}
                    >
                      First Nations Action Network {network.abbr}
                    </a>
                  ) : (
                    <>First Nations Action Network {network.abbr}</>
                  )}
                </h3>
                {network.organisations.length ? (
                  <ul>
                    {network.organisations.map((organisation) => (
                      <li key={organisation.name}>
                        <span>{organisation.name}</span>
                        {organisation.actionNetworkUrl ? (
                          <a
                            href={organisation.actionNetworkUrl}
                            target="_blank"
                            rel="noopener"
                            aria-label={`${organisation.name} on Action Network (opens in a new tab)`}
                          >
                            Action Network
                          </a>
                        ) : null}
                        {organisation.siteUrl ? (
                          <a
                            href={organisation.siteUrl}
                            target="_blank"
                            rel="noopener"
                            aria-label={`${organisation.name} website (opens in a new tab)`}
                          >
                            Website
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="map3d-statelist-empty">
                    No member organisations listed yet.
                  </p>
                )}
              </section>
            ))}
          </div>

          <p className="map3d-note">
            Data note to confirm: the Noosa entry names two groups (a separate
            Sunshine Coast logo and site also exist). NT, TAS, VIC and WA have no
            member organisations listed yet.
          </p>
        </div>
      </section>
    </main>
  );
}
