"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CommunityStoryRow } from "@/components/CommunityStory";
import { filterStories, normaliseStoryFilters } from "@/lib/story-filters";
import type { StoryCategory, StoryFilters, StoryRegion, StorySummary } from "@/lib/story-types";

type StoriesBrowserProps = {
  stories: readonly StorySummary[];
  taxonomy: Record<StoryCategory, readonly string[]>;
  regions: readonly { value: StoryRegion; label: string }[];
  initialFilters: StoryFilters;
};

const EMPTY_FILTERS: StoryFilters = { query: "", category: "", subcategory: "", region: "" };

function filtersFromLocation(): StoryFilters {
  const params = new URLSearchParams(window.location.search);
  return normaliseStoryFilters({
    query: params.get("q") ?? "",
    category: params.get("category") ?? "",
    subcategory: params.get("subcategory") ?? "",
    region: params.get("region") ?? "",
  });
}

export default function StoriesBrowser({ stories, taxonomy, regions, initialFilters }: StoriesBrowserProps) {
  const [filters, setFilters] = useState(initialFilters);
  const searchHistoryStarted = useRef(false);
  const categories = Object.keys(taxonomy) as StoryCategory[];
  const visibleStories = useMemo(() => filterStories(stories, filters), [stories, filters]);
  const hasFilters = Boolean(filters.query.trim() || filters.category || filters.subcategory || filters.region);

  useEffect(() => {
    const restoreFilters = () => {
      searchHistoryStarted.current = false;
      setFilters(filtersFromLocation());
    };
    window.addEventListener("popstate", restoreFilters);
    return () => window.removeEventListener("popstate", restoreFilters);
  }, []);

  function updateFilters(next: StoryFilters, search = false) {
    setFilters(next);
    const url = new URL(window.location.href);
    const values = { q: next.query, category: next.category, subcategory: next.subcategory, region: next.region };
    for (const [key, value] of Object.entries(values)) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    if (url.href !== window.location.href) {
      const method = search && searchHistoryStarted.current ? "replaceState" : "pushState";
      window.history[method](null, "", `${url.pathname}${url.search}${url.hash}`);
    }
    searchHistoryStarted.current = search;
  }

  function changeCategory(category: string) {
    const subcategory = category && taxonomy[category as StoryCategory].includes(filters.subcategory)
      ? filters.subcategory
      : "";
    updateFilters(normaliseStoryFilters({ ...filters, category, subcategory }));
  }

  function changeSubcategory(subcategory: string) {
    const category = subcategory
      ? categories.find((parent) => taxonomy[parent].includes(subcategory)) ?? ""
      : filters.category;
    updateFilters(normaliseStoryFilters({ ...filters, category, subcategory }));
  }

  function resetFilters() {
    updateFilters({ ...EMPTY_FILTERS });
  }

  return (
    <div className="story-browser">
      <form
        className="story-browser-controls"
        aria-label="Filter stories"
        aria-describedby="story-browser-count"
        onSubmit={(event) => {
          event.preventDefault();
          searchHistoryStarted.current = false;
        }}
      >
        <div className="story-browser-search">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.2 4.2" />
          </svg>
          <input
            type="search"
            name="q"
            aria-label="Search stories"
            placeholder="Search stories, topics or organisations"
            value={filters.query}
            onChange={(event) => updateFilters({ ...filters, query: event.target.value }, true)}
            onBlur={() => { searchHistoryStarted.current = false; }}
          />
        </div>
        <select aria-label="Category" name="category" value={filters.category} onChange={(event) => changeCategory(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <select aria-label="Subcategory" name="subcategory" value={filters.subcategory} onChange={(event) => changeSubcategory(event.target.value)}>
          <option value="">All subcategories</option>
          {filters.category
            ? taxonomy[filters.category as StoryCategory].map((subcategory) => <option key={subcategory} value={subcategory}>{subcategory}</option>)
            : categories.map((category) => (
              <optgroup key={category} label={category}>
                {taxonomy[category].map((subcategory) => <option key={subcategory} value={subcategory}>{subcategory}</option>)}
              </optgroup>
            ))}
        </select>
        <select
          aria-label="Region"
          name="region"
          value={filters.region}
          onChange={(event) => updateFilters({ ...filters, region: event.target.value })}
        >
          <option value="">All regions</option>
          {regions.map((region) => <option key={region.value} value={region.value}>{region.label}</option>)}
        </select>
      </form>

      <div className="story-browser-status">
        <p id="story-browser-count" role="status" aria-live="polite" aria-atomic="true">
          {visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"}{hasFilters ? ` of ${stories.length}` : ""}
        </p>
        <button className="story-browser-reset" type="button" onClick={resetFilters} disabled={!hasFilters}>Clear filters</button>
      </div>

      {visibleStories.length ? (
        <div className="story-browser-results">
          {visibleStories.map((story) => <CommunityStoryRow key={story.slug} story={story} />)}
        </div>
      ) : (
        <div className="story-browser-empty">
          <h3>No stories match these filters.</h3>
          <p>Try another keyword, choose a different category or region, or clear the filters to see all stories.</p>
          <button className="btn btn-primary" type="button" onClick={resetFilters}>Show all stories</button>
        </div>
      )}
    </div>
  );
}
