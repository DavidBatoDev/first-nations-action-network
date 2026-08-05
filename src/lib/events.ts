export type EventFormat = "In person" | "Online";

export type CommunityEvent = {
  id: string;
  date: string;
  endDate?: string;
  title: string;
  type: string;
  format: EventFormat;
  location: string;
  time: string;
  description: string;
  imageUrl?: string;
  registrationUrl: string;
};

export type EventFeedStatus = "ready" | "unconfigured" | "error";

export type EventFeed = {
  events: CommunityEvent[];
  status: EventFeedStatus;
};

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function dateFromKey(date: string) {
  return new Date(`${date}T12:00:00`);
}

export function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function dateParts(date: string) {
  const parsed = dateFromKey(date);
  return {
    day: parsed.getDate(),
    month: MONTHS_SHORT[parsed.getMonth()],
    monthLong: MONTHS_LONG[parsed.getMonth()],
    year: parsed.getFullYear(),
  };
}

export function longDate(date: string) {
  const { day, monthLong, year } = dateParts(date);
  return `${day} ${monthLong} ${year}`;
}

export function sortEvents(events: CommunityEvent[]) {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}

export function sortEventsNewestFirst(events: CommunityEvent[]) {
  return [...events].sort((a, b) => b.date.localeCompare(a.date));
}

export function isPastEvent(event: CommunityEvent, today: Date) {
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return dateFromKey(event.endDate ?? event.date) < startOfToday;
}
