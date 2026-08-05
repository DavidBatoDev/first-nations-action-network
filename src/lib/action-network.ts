import type { CommunityEvent, EventFeed, EventFormat } from "@/lib/events";
import type {
  ActionFeed,
  ActionKind,
  CommunityAction,
} from "@/lib/community-actions";

const API_BASE_URL = "https://actionnetwork.org/api/v2";
const EVENTS_URL = `${API_BASE_URL}/events?per_page=25`;
const PETITIONS_URL = `${API_BASE_URL}/petitions?per_page=25`;
const SURVEYS_URL = `${API_BASE_URL}/surveys?per_page=25`;
const REQUEST_TIMEOUT_MS = 10_000;
const PAGE_DELAY_MS = 260;
const MAX_PAGES = 200;
const MAX_RETRIES = 2;

type HalLink = { href?: unknown };

type ActionNetworkCollection = {
  _embedded?: Record<string, unknown>;
  _links?: {
    next?: HalLink;
  };
};

type ActionNetworkAction = {
  identifiers?: unknown;
  title?: unknown;
  name?: unknown;
  description?: unknown;
  browser_url?: unknown;
  total_signatures?: unknown;
  total_responses?: unknown;
  "action_network:hidden"?: unknown;
};

type ActionNetworkEvent = {
  identifiers?: unknown;
  title?: unknown;
  description?: unknown;
  browser_url?: unknown;
  featured_image_url?: unknown;
  start_date?: unknown;
  end_date?: unknown;
  location?: unknown;
  status?: unknown;
  visibility?: unknown;
  capacity?: unknown;
  total_accepted?: unknown;
  tag_list?: unknown;
  "action_network:hidden"?: unknown;
};

type ActionNetworkLocation = {
  venue?: unknown;
  locality?: unknown;
  region?: unknown;
  address_lines?: unknown;
};

class ActionNetworkRequestError extends Error {
  constructor(public readonly status: number) {
    super(`Action Network request failed with status ${status}`);
  }
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function nativeIdentifier(identifiers: unknown) {
  const identifier = stringArray(identifiers).find((item) =>
    item.startsWith("action_network:"),
  );
  return identifier?.slice("action_network:".length);
}

function plainText(value: string) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function summary(value: string, maximumLength = 360) {
  if (value.length <= maximumLength) return value;
  const shortened = value.slice(0, maximumLength + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : maximumLength).trim()}…`;
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function taggedValue(tags: string[], prefix: string) {
  const tag = tags.find((item) =>
    item.toLowerCase().startsWith(prefix.toLowerCase()),
  );
  return tag?.slice(prefix.length).trim();
}

function eventFormat(tags: string[], location: ActionNetworkLocation): EventFormat {
  const configuredFormat = taggedValue(tags, "format:")?.toLowerCase();
  if (configuredFormat === "online") return "Online";
  if (configuredFormat === "in-person" || configuredFormat === "in person") {
    return "In person";
  }

  const hasPhysicalLocation = Boolean(
    stringValue(location.venue) ||
      stringValue(location.locality) ||
      stringArray(location.address_lines).length,
  );
  return hasPhysicalLocation ? "In person" : "Online";
}

function eventLocation(location: ActionNetworkLocation, format: EventFormat) {
  if (format === "Online") return "Online";
  const parts = [
    stringValue(location.venue),
    stringValue(location.locality),
    stringValue(location.region),
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Location to be announced";
}

function datePart(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1];
}

function clockPart(value: string) {
  const match = value.match(/T(\d{2}):(\d{2})/);
  if (!match) return undefined;
  const hour = Number(match[1]);
  const minute = match[2];
  const suffix = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute}${suffix}`;
}

function eventTime(start: string, end?: string) {
  const startTime = clockPart(start);
  const endTime = end ? clockPart(end) : undefined;
  if (startTime && endTime) return `${startTime}–${endTime}`;
  return startTime ?? "Time to be announced";
}

function isPublicEvent(event: ActionNetworkEvent) {
  return (
    event.status === "confirmed" &&
    event.visibility === "public" &&
    event["action_network:hidden"] === false &&
    Boolean(stringValue(event.browser_url))
  );
}

export function mapActionNetworkEvent(value: unknown): CommunityEvent | null {
  if (!value || typeof value !== "object") return null;
  const event = value as ActionNetworkEvent;
  if (!isPublicEvent(event)) return null;

  const id = nativeIdentifier(event.identifiers);
  const title = stringValue(event.title);
  const start = stringValue(event.start_date);
  const registrationUrl = stringValue(event.browser_url);
  const date = start ? datePart(start) : undefined;

  if (!id || !title || !start || !date || !registrationUrl) return null;

  const rawLocation =
    event.location && typeof event.location === "object"
      ? (event.location as ActionNetworkLocation)
      : {};
  const tags = stringArray(event.tag_list);
  const format = eventFormat(tags, rawLocation);
  const end = stringValue(event.end_date);
  const typeTag = taggedValue(tags, "type:");
  const description = stringValue(event.description);

  return {
    id,
    date,
    endDate: end ? datePart(end) : undefined,
    title,
    type: typeTag ? titleCase(typeTag) : "Event",
    format,
    location: eventLocation(rawLocation, format),
    time: eventTime(start, end),
    description: description
      ? summary(plainText(description))
      : "More information is available on the Action Network event page.",
    imageUrl: stringValue(event.featured_image_url),
    registrationUrl,
  };
}

async function fetchCollectionPage(url: string, apiKey: string) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        Accept: "application/hal+json, application/json",
        "OSDI-API-Token": apiKey,
      },
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (response.ok) {
      return (await response.json()) as ActionNetworkCollection;
    }

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === MAX_RETRIES) {
      throw new ActionNetworkRequestError(response.status);
    }
    await wait(500 * 2 ** attempt);
  }

  throw new ActionNetworkRequestError(500);
}

export async function getActionNetworkEvents(): Promise<EventFeed> {
  if (typeof window !== "undefined") {
    throw new Error("Action Network data can only be loaded on the server.");
  }

  const apiKey = process.env.ACTION_NETWORK_API_KEY?.trim();
  if (!apiKey) return { events: [], status: "unconfigured" };

  try {
    const records: unknown[] = [];
    const visited = new Set<string>();
    let nextUrl: string | undefined = EVENTS_URL;

    while (nextUrl && visited.size < MAX_PAGES) {
      if (visited.has(nextUrl)) break;
      visited.add(nextUrl);

      const page = await fetchCollectionPage(nextUrl, apiKey);
      const events = page._embedded?.["osdi:events"];
      if (Array.isArray(events)) records.push(...events);

      const nextHref = stringValue(page._links?.next?.href);
      nextUrl = nextHref?.startsWith(API_BASE_URL) ? nextHref : undefined;
      if (nextUrl) await wait(PAGE_DELAY_MS);
    }

    const events = records
      .map(mapActionNetworkEvent)
      .filter((event): event is CommunityEvent => event !== null);

    return { events, status: "ready" };
  } catch (error) {
    const status =
      error instanceof ActionNetworkRequestError ? error.status : "network";
    console.error(`Action Network events could not be loaded (${status}).`);
    return { events: [], status: "error" };
  }
}


function isPublicAction(action: ActionNetworkAction) {
  return (
    action["action_network:hidden"] === false &&
    Boolean(stringValue(action.browser_url))
  );
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function mapActionNetworkAction(
  value: unknown,
  kind: ActionKind,
): CommunityAction | null {
  if (!value || typeof value !== "object") return null;
  const action = value as ActionNetworkAction;
  if (!isPublicAction(action)) return null;

  const id = nativeIdentifier(action.identifiers);
  const title = stringValue(action.title) ?? stringValue(action.name);
  const actionUrl = stringValue(action.browser_url);
  if (!id || !title || !actionUrl) return null;

  const description = stringValue(action.description);
  const supporterCount =
    kind === "Petition"
      ? numberValue(action.total_signatures)
      : numberValue(action.total_responses);

  return {
    id,
    kind,
    title,
    description: description ? summary(plainText(description), 200) : undefined,
    actionUrl,
    supporterCount,
  };
}

async function collectRecords(
  startUrl: string,
  embeddedKey: string,
  apiKey: string,
) {
  const records: unknown[] = [];
  const visited = new Set<string>();
  let nextUrl: string | undefined = startUrl;

  while (nextUrl && visited.size < MAX_PAGES) {
    if (visited.has(nextUrl)) break;
    visited.add(nextUrl);

    const page = await fetchCollectionPage(nextUrl, apiKey);
    const items = page._embedded?.[embeddedKey];
    if (Array.isArray(items)) records.push(...items);

    const nextHref = stringValue(page._links?.next?.href);
    nextUrl = nextHref?.startsWith(API_BASE_URL) ? nextHref : undefined;
    if (nextUrl) await wait(PAGE_DELAY_MS);
  }

  return records;
}

export async function getActionNetworkActions(): Promise<ActionFeed> {
  if (typeof window !== "undefined") {
    throw new Error("Action Network data can only be loaded on the server.");
  }

  const apiKey = process.env.ACTION_NETWORK_API_KEY?.trim();
  if (!apiKey) return { actions: [], status: "unconfigured" };

  try {
    const [petitions, surveys] = await Promise.all([
      collectRecords(PETITIONS_URL, "osdi:petitions", apiKey),
      collectRecords(SURVEYS_URL, "osdi:surveys", apiKey),
    ]);

    const actions = [
      ...petitions.map((record) => mapActionNetworkAction(record, "Petition")),
      ...surveys.map((record) => mapActionNetworkAction(record, "Survey")),
    ].filter((action): action is CommunityAction => action !== null);

    return { actions, status: "ready" };
  } catch (error) {
    const status =
      error instanceof ActionNetworkRequestError ? error.status : "network";
    console.error(`Action Network actions could not be loaded (${status}).`);
    return { actions: [], status: "error" };
  }
}
