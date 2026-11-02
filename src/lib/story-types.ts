export type StoryCategory = "Governance" | "Country" | "Wellbeing" | "Enterprise" | "Culture";
export type StoryRegion = "Federal" | "VIC" | "QLD" | "NSW" | "SA" | "WA" | "NT" | "TAS" | "ACT" | "Global";

export type StoryInline = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
};

export type StoryListItem = {
  content: StoryInline[];
  children?: { ordered: boolean; items: StoryListItem[] };
};

export type StoryBlock =
  | { type: "paragraph"; content: StoryInline[] }
  | { type: "heading"; level: 2 | 3; id: string; content: StoryInline[] }
  | { type: "list"; ordered: boolean; items: StoryListItem[] }
  | { type: "table"; caption: string; headers: StoryInline[][]; rows: StoryInline[][][] }
  | { type: "callout"; title: string; items: StoryInline[][] }
  | { type: "blockquote"; content: StoryInline[] }
  | { type: "figure"; src: string; alt: string; width: number; height: number; caption?: StoryInline[] };

export type Story = {
  slug: string;
  title: string;
  summary: string;
  category: StoryCategory;
  subcategory: string;
  regions: StoryRegion[];
  organisation: string;
  topics: string[];
  image: {
    src: string;
    thumbnail: string;
    alt: string;
    width: number;
    height: number;
    thumbnailWidth: number;
    thumbnailHeight: number;
  };
  featuredOrder?: number;
  content: StoryBlock[];
};

export type StorySummary = Omit<Story, "content"> & { searchText: string };

export type StoryFilters = {
  query: string;
  category: string;
  subcategory: string;
  region: string;
};
