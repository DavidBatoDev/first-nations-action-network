import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommunityStoryDetail } from "@/components/CommunityStory";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { getStory, STORIES } from "@/lib/stories";
import "@/styles/stories.css";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Contribute", href: "/contributors" },
  { label: "Learn", href: "/learn" },
  { label: "Events", href: "/events" },
  { label: "Directory", href: "/directory" },
];

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return STORIES.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return {
    title: story.title,
    description: story.summary,
    authors: null,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.summary,
      url: `/stories/${story.slug}`,
      siteName: "First Nations Action Network",
      images: [{ url: story.image.src, width: story.image.width, height: story.image.height, alt: story.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.summary,
      images: [{ url: story.image.src, alt: story.image.alt }],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <>
      <Nav brandHref="/" links={navLinks} exploreHref="/allyship" joinHref="/contributors" solid />
      <main className="story-article-page">
        <div className="wrap">
          <div className="story-article-topbar"><Link href="/stories">← All stories</Link></div>
          <CommunityStoryDetail story={story} />
        </div>
      </main>
      <Footer />
    </>
  );
}
