"use client";

import { useMemo, useState } from "react";
import {
  ResourceCourseCard,
  type ResourceCourse,
  type ResourceKind,
} from "@/components/ResourceCourse";

const FILTERS: Array<{ label: string; value: ResourceKind }> = [
  { label: "Guides", value: "Guide" },
  { label: "Articles", value: "Article" },
  { label: "Tools", value: "Tool" },
];

type ResourceCatalogueProps = {
  courses: ResourceCourse[];
};

export default function ResourceCatalogue({
  courses,
}: ResourceCatalogueProps) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ResourceKind | null>(null);

  const visibleCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesKind = kind === null || course.kind === kind;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.summary.toLowerCase().includes(normalizedQuery);

      return matchesKind && matchesQuery;
    });
  }, [courses, kind, query]);

  return (
    <>
      <form
        className="resources-filters"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="resources-search-field">
          <label htmlFor="resources-search">Search resources</label>
          <div className="resources-search-control">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              id="resources-search"
              type="search"
              placeholder="Search guides, articles and tools"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <fieldset className="resources-kind-filters">
          <legend>Resource type</legend>
          {FILTERS.map((filter) => (
            <button
              aria-pressed={kind === filter.value}
              className={kind === filter.value ? "is-active" : ""}
              key={filter.value}
              type="button"
              onClick={() =>
                setKind((current) =>
                  current === filter.value ? null : filter.value,
                )
              }
            >
              {filter.label}
            </button>
          ))}
        </fieldset>
      </form>

      <p className="resources-preview-note">
        Prototype resources based on the current homepage content. Titles,
        durations and lesson material require client approval.
      </p>

      {visibleCourses.length > 0 ? (
        <div className="resources-catalogue-grid">
          {visibleCourses.map((course) => (
            <ResourceCourseCard course={course} key={course.slug} />
          ))}
        </div>
      ) : (
        <div className="resources-no-results" role="status">
          <h3>No resources match your search.</h3>
          <p>Try another keyword or clear the selected resource type.</p>
        </div>
      )}
    </>
  );
}
