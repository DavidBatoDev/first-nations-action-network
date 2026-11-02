import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import StoriesBrowser from "@/components/StoriesBrowser";
import { getStorySummaries, STORY_REGIONS, STORY_TAXONOMY } from "@/lib/stories";
import { normaliseStoryFilters } from "@/lib/story-filters";
import "@/styles/stories.css";

const STORIES_DESCRIPTION =
  "Read stories of First Nations leadership, Country, justice and collective action, shared by First Nations Action Network.";

export const metadata: Metadata = {
  title: "Community Stories",
  description: STORIES_DESCRIPTION,
  alternates: { canonical: "/stories" },
  openGraph: {
    title: "Community Stories · First Nations Action Network",
    description: STORIES_DESCRIPTION,
    url: "/stories",
  },
};

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

type StoriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;
  const value = (key: string) => {
    const entry = params[key];
    return Array.isArray(entry) ? entry[0] ?? "" : entry ?? "";
  };
  const initialFilters = normaliseStoryFilters({
    query: value("q"),
    category: value("category"),
    subcategory: value("subcategory"),
    region: value("region"),
  });

  return (
    <>
      <Nav brandHref="/" links={navLinks} exploreHref="/allyship" joinHref="/contributors" />
      <main className="home-page stories-page">
        <header className="hero stories-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="kicker on-dark" data-reveal>Community stories</span>
              <h1 data-reveal data-delay="1">Stories That Strengthen <span className="em-action">Communities.</span></h1>
              <p className="lead" data-reveal data-delay="2">First Nations leadership, the protection of Country and the work of collective change, in Australia and around the world.</p>
            </div>
            <aside className="stories-purpose" data-reveal data-delay="2">
              <span className="stories-purpose-mark" aria-hidden="true"><span /><span /><span /></span>
              <div>
                <span className="eyebrow">Leadership in action</span>
                <p>Read perspectives on justice, treaty, allyship and the decisions shaping First Nations communities.</p>
              </div>
            </aside>
          </div>
        </header>
        <section className="sec bg-cream stories-library-section" aria-labelledby="stories-library-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">Stories library</span>
              <h2 id="stories-library-title">Community-Led Change, <span className="em-action">Shared.</span></h2>
              <p className="lead">Explore the stories, or search by keyword, topic or organisation. Filter by category and region to find the work that matters to you.</p>
            </div>
            <StoriesBrowser stories={getStorySummaries()} taxonomy={STORY_TAXONOMY} regions={STORY_REGIONS} initialFilters={initialFilters} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
