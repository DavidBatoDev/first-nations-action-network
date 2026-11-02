import type { StoryCategory, StoryFilters, StoryRegion, StorySummary } from "./story-types";

export const STORY_TAXONOMY: Record<StoryCategory, readonly string[]> = {
  Governance: ["Treaty", "Title", "Policy", "Leadership"],
  Country: ["Rangers", "Heritage", "Sustainability", "Conservation"],
  Wellbeing: ["Health", "Justice", "Housing", "Healing"],
  Enterprise: ["Business", "Training", "Procurement", "Employment"],
  Culture: ["Arts", "Histories", "Elders", "Events"],
};

export const STORY_REGIONS: readonly { value: StoryRegion; label: string }[] = [
  { value: "Federal", label: "Federal" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "NSW", label: "New South Wales" },
  { value: "SA", label: "South Australia" },
  { value: "WA", label: "Western Australia" },
  { value: "NT", label: "Northern Territory" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "Global", label: "Global" },
];

export function normaliseStoryFilters(filters: StoryFilters): StoryFilters {
  const categories = Object.keys(STORY_TAXONOMY) as StoryCategory[];
  let category = categories.find((value) => value === filters.category) ?? "";
  const parent = categories.find((value) => STORY_TAXONOMY[value].includes(filters.subcategory));
  const subcategory = parent && (!category || parent === category) ? filters.subcategory : "";
  if (!category && subcategory && parent) category = parent;
  return {
    query: filters.query.trim().toLowerCase(),
    category,
    subcategory,
    region: STORY_REGIONS.some(({ value }) => value === filters.region) ? filters.region : "",
  };
}

export function filterStories(stories: readonly StorySummary[], filters: StoryFilters): StorySummary[] {
  const selected = normaliseStoryFilters(filters);
  return stories.filter((story) =>
    (!selected.category || story.category === selected.category) &&
    (!selected.subcategory || story.subcategory === selected.subcategory) &&
    (!selected.region || story.regions.some((region) => region === selected.region)) &&
    (!selected.query || [story.title, story.summary, story.category, story.subcategory,
      story.organisation, ...story.topics, ...story.regions, story.searchText]
      .join(" ").toLowerCase().includes(selected.query)),
  );
}
