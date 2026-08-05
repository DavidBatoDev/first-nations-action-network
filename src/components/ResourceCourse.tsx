export type ResourceKind = "Guide" | "Article" | "Tool";

export type ResourceContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "video"; title: string; durationMinutes: number };

export type ResourceLesson = {
  id: string;
  title: string;
  durationMinutes: number;
  content: ResourceContentBlock[];
};

export type ResourceCourseSection = {
  id: string;
  title: string;
  lessons: ResourceLesson[];
};

export type ResourceCourse = {
  slug: string;
  title: string;
  summary: string;
  kind: ResourceKind;
  durationMinutes: number;
  sections: ResourceCourseSection[];
};

type ResourceCourseCardProps = {
  course: ResourceCourse;
};

type ResourceLearningLayoutProps = {
  course: ResourceCourse;
  activeLessonId?: string;
  hasMemberAccess?: boolean;
};

export function formatResourceDuration(durationMinutes: number) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return String(minutes) + " min";
  }

  return minutes > 0
    ? String(hours) + " hr " + String(minutes) + " min"
    : String(hours) + " hr";
}

/**
 * Presentation structure for approved catalogue records. It is intentionally
 * not rendered until the Network supplies courses and their public-preview rules.
 */
export function ResourceCourseCard({ course }: ResourceCourseCardProps) {
  return (
    <Link
      className="resource-course-card"
      href={"/resources/" + course.slug}
    >
      <span className="resource-course-kind">{course.kind}</span>
      <h3>{course.title}</h3>
      <p>{course.summary}</p>
      <span className="resource-course-duration">
        {formatResourceDuration(course.durationMinutes)}
      </span>
      <span className="resource-course-open">
        View resource <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

/**
 * Future member-learning structure. Public visitors see the access state until
 * authentication and approved course material are available.
 */
export function ResourceLearningLayout({
  course,
  activeLessonId,
  hasMemberAccess = false,
}: ResourceLearningLayoutProps) {
  const lessons = course.sections.flatMap((section) => section.lessons);
  const activeLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];

  return (
    <article className="resource-learning-layout">
      <aside className="resource-learning-sidebar">
        <p className="resource-course-kind">{course.kind}</p>
        <h2>{course.title}</h2>
        {course.sections.map((section) => (
          <section key={section.id}>
            <h3>{section.title}</h3>
            <ol>
              {section.lessons.map((lesson) => (
                <li
                  className={lesson.id === activeLesson?.id ? "is-active" : ""}
                  key={lesson.id}
                >
                  <Link
                    href={
                      "/resources/" +
                      course.slug +
                      "?lesson=" +
                      lesson.id
                    }
                    scroll={false}
                  >
                    <span>{lesson.title}</span>
                    <small>
                      {formatResourceDuration(lesson.durationMinutes)}
                    </small>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </aside>
      <section className="resource-learning-content">
        {hasMemberAccess && activeLesson ? (
          <>
            <p className="resource-course-kind">Current lesson</p>
            <h1>{activeLesson.title}</h1>
            {activeLesson.content.map((block, index) =>
              block.type === "video" ? (
                <div className="resource-video-placeholder" key={block.title + "-" + index}>
                  <span>Video lesson</span>
                  <strong>{block.title}</strong>
                  <small>{formatResourceDuration(block.durationMinutes)}</small>
                </div>
              ) : (
                <p key={block.text + "-" + index}>{block.text}</p>
              ),
            )}
          </>
        ) : (
          <div className="resource-member-gate">
            <span className="eyebrow">Member learning</span>
            <h1>This lesson is available to Network members.</h1>
            <p>
              Member access will be available once the Network learning library and
              sign-in experience are ready.
            </p>
          </div>
        )}
      </section>
    </article>
  );
}
import Link from "next/link";
