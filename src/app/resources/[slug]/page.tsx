import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Nav, { type NavLink } from "@/components/Nav";
import { ResourceLearningLayout } from "@/components/ResourceCourse";
import { getResourceCourse, RESOURCE_COURSES } from "@/lib/resources";

const navLinks: NavLink[] = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Learn", href: "/#training" },
  { label: "Events", href: "/#events" },
  { label: "Directory", href: "/#resources" },
];

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lesson?: string | string[] }>;
};

export function generateStaticParams() {
  return RESOURCE_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getResourceCourse(slug);

  if (!course) {
    return { title: "Resource not found" };
  }

  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: "/resources/" + course.slug },
    robots: { index: false, follow: false },
  };
}

export default async function ResourceDetailPage({
  params,
  searchParams,
}: ResourcePageProps) {
  const { slug } = await params;
  const { lesson } = await searchParams;
  const activeLessonId = Array.isArray(lesson) ? lesson[0] : lesson;
  const course = getResourceCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Nav
        brandHref="/"
        links={navLinks}
        exploreHref="/#allies"
        joinHref="/membership"
      />
      <main className="resource-course-page">
        <div className="wrap">
          <div className="resource-course-topbar">
            <Link href="/resources">← All resources</Link>
            <span>Prototype learning content · Client approval required</span>
          </div>
          <ResourceLearningLayout
            activeLessonId={activeLessonId}
            course={course}
            hasMemberAccess
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
