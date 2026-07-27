export type EventFormat = "In person" | "Online";

export type CommunityEvent = {
  id: string;
  date: string;
  title: string;
  type: string;
  format: EventFormat;
  location: string;
  time: string;
  description: string;
};

export const EVENTS: CommunityEvent[] = [
  {
    id: "community-organising-foundations",
    date: "2026-07-12",
    title: "Community Organising Foundations",
    type: "Workshop",
    format: "In person",
    location: "Naarm / Melbourne",
    time: "9:30am–3:00pm",
    description:
      "A practical day for people building relationships, participation and momentum in their communities.",
  },
  {
    id: "leadership-in-practice",
    date: "2026-07-29",
    title: "Leadership in Practice: A National Conversation",
    type: "Forum",
    format: "Online",
    location: "Online",
    time: "1:00pm–2:30pm AEST",
    description:
      "A national conversation on community leadership, shared learning and the work of sustaining collective action.",
  },
  {
    id: "first-nations-allies-yarning-circle",
    date: "2026-08-14",
    title: "First Nations Allies Yarning Circle",
    type: "Gathering",
    format: "In person",
    location: "Meanjin / Brisbane",
    time: "10:00am–1:00pm",
    description:
      "A space for allies to listen, connect and strengthen practical support for First Nations-led change.",
  },
];

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

export function isPastEvent(event: CommunityEvent, today: Date) {
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return dateFromKey(event.date) < startOfToday;
}
