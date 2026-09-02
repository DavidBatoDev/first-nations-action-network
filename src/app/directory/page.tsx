import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import DirectoryBrowser, {
  type DirectoryEntry,
} from "@/components/DirectoryBrowser";
import { parseNetworks } from "@/components/NetworkMap";

const DIRECTORY_DESCRIPTION =
  "A public directory of organisations, groups, networks and initiatives working to strengthen communities and create positive change across Australia.";

export const metadata: Metadata = {
  title: "Community Directory",
  description: DIRECTORY_DESCRIPTION,
  alternates: { canonical: "/directory" },
  openGraph: {
    title: "Community Directory · First Nations Action Network",
    description: DIRECTORY_DESCRIPTION,
    url: "/directory",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

/** Flatten the shared network data into directory listings. */
async function readEntries(): Promise<DirectoryEntry[]> {
  const file = path.join(process.cwd(), "public", "fnan-networks.json");
  const networks = parseNetworks(JSON.parse(await readFile(file, "utf8")));

  return networks
    .flatMap((network) =>
      network.organisations.map((organisation) => ({
        name: organisation.name,
        stateName: network.name,
        stateAbbr: network.abbr,
        actionNetworkUrl: organisation.actionNetworkUrl,
        siteUrl: organisation.siteUrl,
        logo: organisation.logo,
      })),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default async function DirectoryPage() {
  const entries = await readEntries();
  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/contributors"
      />

      <main className="home-page directory-page">
        <header className="hero directory-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="crumb" data-reveal>
                <Link href="/">Home</Link> <span className="sep">/</span>{" "}
                Community Directory
              </span>
              <span className="kicker on-dark" data-reveal>
                Community directory
              </span>
              <h1 data-reveal data-delay="1">
                Find Community. Build{" "}
                <span className="em-action">Connection.</span>
              </h1>
              <p className="lead" data-reveal data-delay="2">
                A public directory of organisations, groups, networks and
                initiatives working to strengthen communities and create
                positive change across Australia.
              </p>
            </div>

            <aside className="directory-purpose" data-reveal data-delay="2">
              <span className="directory-purpose-mark" aria-hidden="true">
                01
              </span>
              <div>
                <span className="eyebrow">A public resource</span>
                <p>
                  The directory makes community leadership and action more
                  visible, helping people discover organisations and build
                  stronger relationships.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <section className="sec bg-cream directory-discovery-section">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Discover organisations</span>
              <h2>
                A Directory Built For{" "}
                <span className="em-action">Connection.</span>
              </h2>
              <p className="lead">
                Search {entries.length} organisations across the state and
                territory networks, and follow each one through to Action Network
                or its own website.
              </p>
            </div>

            <DirectoryBrowser entries={entries} />

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
