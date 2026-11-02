import { describe, expect, it } from "vitest";
import { getStorySummaries } from "./stories";
import { filterStories, normaliseStoryFilters } from "./story-filters";
import type { StoryFilters } from "./story-types";

const all: StoryFilters = { query: "", category: "", subcategory: "", region: "" };
const summaries = getStorySummaries();

function matches(filters: Partial<StoryFilters>) {
  return filterStories(summaries, { ...all, ...filters }).map(({ slug }) => slug);
}

describe("story filtering", () => {
  it("matches national articles across their explicit Australian regions but isolates Global", () => {
    expect(matches({ region: "QLD" })).toEqual([
      "indigenous-led-reform", "national-allyship-summit", "state-and-territory-treaties",
    ]);
    expect(matches({ region: "VIC" })).toContain("djab-wurrung-country");
    expect(matches({ region: "Federal" })).not.toContain("djab-wurrung-country");
    expect(matches({ region: "Global" })).toEqual(["25th-unpfii-session"]);
  });

  it("combines category, subcategory, region and query with AND", () => {
    expect(matches({ category: "Country", subcategory: "Heritage", region: "VIC", query: "birthing" }))
      .toEqual(["djab-wurrung-country"]);
    expect(matches({ category: "Country", subcategory: "Heritage", region: "Global" })).toEqual([]);
    expect(matches({ category: "Enterprise" })).toEqual([]);
  });

  it("searches full prose and metadata without case or surrounding whitespace", () => {
    expect(matches({ query: "  FIRST NATIONS ACTION NETWORK  " })).toHaveLength(5);
    expect(matches({ query: "Fetal Alcohol Spectrum Disorder" })).toEqual(["indigenous-led-reform"]);
    expect(matches({ query: "Negotiations Register" })).toEqual(["state-and-territory-treaties"]);
  });

  it("selects a subcategory's parent and clears an incompatible dependent selection", () => {
    expect(normaliseStoryFilters({ ...all, subcategory: "Justice" }))
      .toEqual({ ...all, category: "Wellbeing", subcategory: "Justice" });
    expect(normaliseStoryFilters({ ...all, category: "Governance", subcategory: "Justice" }))
      .toEqual({ ...all, category: "Governance" });
    expect(normaliseStoryFilters({ ...all, category: "unknown", subcategory: "unknown", region: "unknown" }))
      .toEqual(all);
  });
});
