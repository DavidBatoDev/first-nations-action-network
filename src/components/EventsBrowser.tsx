"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  dateKey,
  dateParts,
  isPastEvent,
  longDate,
  sortEvents,
  sortEventsNewestFirst,
  type CommunityEvent,
} from "@/lib/events";

type Tab = "events" | "calendar" | "discover";
type EventMode = "upcoming" | "past";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function EventCard({
  event,
  past = false,
  showDate = false,
}: {
  event: CommunityEvent;
  past?: boolean;
  showDate?: boolean;
}) {
  return (
    <article className="event-card">
      <div className="event-card-meta">
        <span>{event.type}</span>
        <span className="event-card-meta-dot" aria-hidden="true" />
        <span>{event.format}</span>
      </div>
      {showDate ? (
        <time className="event-card-date" dateTime={event.date}>
          {longDate(event.date)}
        </time>
      ) : null}
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <div className="event-card-place">
        <span aria-hidden="true">⌖</span>
        {event.location} <span className="event-card-divider">·</span>{" "}
        {event.time}
      </div>
      <a
        href={event.registrationUrl}
        className="event-card-cta textlink"
        target="_blank"
        rel="noopener"
        aria-label={`${past ? "View" : "Register for"} ${event.title} on Action Network (opens in a new tab)`}
      >
        {past ? "View on Action Network" : "Register on Action Network"}{" "}
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

function EmptyEvents({ message }: { message: string }) {
  return (
    <div className="events-empty">
      <div>
        <h3>{message}</h3>
        <p>
          Join the Network to hear about future workshops, forums and community
          gatherings.
        </p>
        <Link href="/membership" className="textlink">
          Join the Network <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function EventsBrowser({
  events,
}: {
  events: CommunityEvent[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [eventMode, setEventMode] = useState<EventMode>("upcoming");
  const [today] = useState(() => new Date());
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [formatFilter, setFormatFilter] = useState("All formats");

  const chronologicalEvents = useMemo(() => sortEvents(events), [events]);
  const newestEvents = useMemo(() => sortEventsNewestFirst(events), [events]);
  const visibleEvents = newestEvents.filter((event) =>
    eventMode === "past" ? isPastEvent(event, today) : !isPastEvent(event, today),
  );
  const types = [...new Set(newestEvents.map((event) => event.type))];
  const formats = [...new Set(newestEvents.map((event) => event.format))];

  const eventDates = useMemo(
    () => new Map(chronologicalEvents.map((event) => [event.date, event])),
    [chronologicalEvents],
  );

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: firstWeekday + totalDays }, (_, index) =>
      index < firstWeekday ? null : index - firstWeekday + 1,
    );
  }, [calendarMonth]);

  const selectedEvents = selectedDate
    ? chronologicalEvents.filter((event) => event.date === selectedDate)
    : [];

  const discoveredEvents = newestEvents.filter((event) => {
    const text = [
      event.title,
      event.type,
      event.format,
      event.location,
      event.description,
    ].join(" ").toLowerCase();

    return (
      text.includes(query.trim().toLowerCase()) &&
      (typeFilter === "All types" || event.type === typeFilter) &&
      (formatFilter === "All formats" || event.format === formatFilter)
    );
  });

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "calendar" && !selectedDate) {
      const firstEventThisMonth = chronologicalEvents.find((event) => {
        const date = new Date(event.date + "T12:00:00");
        return (
          date.getFullYear() === calendarMonth.getFullYear() &&
          date.getMonth() === calendarMonth.getMonth()
        );
      });
      setSelectedDate(firstEventThisMonth?.date ?? null);
    }
  };

  const moveMonth = (direction: number) => {
    const nextMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + direction,
      1,
    );
    const firstEventNextMonth = chronologicalEvents.find((event) => {
      const date = new Date(event.date + "T12:00:00");
      return (
        date.getFullYear() === nextMonth.getFullYear() &&
        date.getMonth() === nextMonth.getMonth()
      );
    });

    setCalendarMonth(nextMonth);
    setSelectedDate(firstEventNextMonth?.date ?? null);
  };

  const monthLabel = calendarMonth.toLocaleString("en-AU", {
    month: "long",
    year: "numeric",
  });

  return (
    <section id="events-browser" className="events-browser sec">
      <div className="wrap">
        <div className="events-tabs" role="tablist" aria-label="Browse events">
          {(
            [
              ["events", "Events"],
              ["calendar", "Calendar"],
              ["discover", "Discover"],
            ] as const
          ).map(([tab, label]) => (
            <button
              key={tab}
              id={tab + "-tab"}
              className={activeTab === tab ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={tab + "-panel"}
              onClick={() => selectTab(tab)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "events" ? (
          <div
            id="events-panel"
            role="tabpanel"
            aria-labelledby="events-tab"
            className="events-panel"
          >
            <div className="events-panel-head">
              <div>
                <span className="kicker">The programme</span>
                <h2>Meet, learn and take <span className="em-action">action.</span></h2>
              </div>
              <div className="event-mode" aria-label="Event timeframe">
                {(
                  [
                    ["upcoming", "Upcoming"],
                    ["past", "Past"],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    className={eventMode === mode ? "is-active" : ""}
                    aria-pressed={eventMode === mode}
                    onClick={() => setEventMode(mode)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {visibleEvents.length ? (
              <div className="events-timeline">
                {visibleEvents.map((event) => {
                  const { day, month } = dateParts(event.date);
                  return (
                    <div className="timeline-event" key={event.id}>
                      <time className="timeline-date" dateTime={event.date}>
                        <span>{day}</span>
                        <small>{month}</small>
                      </time>
                      <span className="timeline-node" aria-hidden="true" />
                      <EventCard event={event} past={eventMode === "past"} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyEvents
                message={
                  eventMode === "upcoming"
                    ? "No events yet. Stay tuned!"
                    : "No past events yet."
                }
              />
            )}
          </div>
        ) : null}

        {activeTab === "calendar" ? (
          <div
            id="calendar-panel"
            role="tabpanel"
            aria-labelledby="calendar-tab"
            className="events-panel calendar-panel"
          >
            <div className="events-panel-head calendar-head">
              <div>
                <span className="kicker">Calendar</span>
                <h2>Find a day to <span className="em-action">gather.</span></h2>
              </div>
              <div className="calendar-controls">
                <button type="button" aria-label="Previous month" onClick={() => moveMonth(-1)}>←</button>
                <strong aria-live="polite">{monthLabel}</strong>
                <button type="button" aria-label="Next month" onClick={() => moveMonth(1)}>→</button>
              </div>
            </div>

            <div className="calendar-layout">
              <div className="calendar-grid" role="grid" aria-label={monthLabel}>
                {WEEKDAYS.map((weekday) => (
                  <span key={weekday} className="calendar-weekday" role="columnheader">
                    {weekday}
                  </span>
                ))}
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <span className="calendar-day is-blank" key={"blank-" + index} />;
                  }

                  const key = dateKey(
                    new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day),
                  );
                  const event = eventDates.get(key);
                  const isSelected = key === selectedDate;

                  return (
                    <button
                      key={key}
                      type="button"
                      role="gridcell"
                      className={"calendar-day" + (event ? " has-event" : "") + (isSelected ? " is-selected" : "")}
                      aria-label={event ? longDate(key) + ": " + event.title : longDate(key)}
                      aria-selected={isSelected}
                      onClick={() => setSelectedDate(key)}
                    >
                      <span>{day}</span>
                      {event ? <i aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>

              <aside className="calendar-selection" aria-live="polite">
                {selectedDate ? (
                  <>
                    <p className="calendar-selection-label">{longDate(selectedDate)}</p>
                    {selectedEvents.length ? (
                      selectedEvents.map((event) => (
                        <EventCard
                          event={event}
                          past={isPastEvent(event, today)}
                          key={event.id}
                        />
                      ))
                    ) : (
                      <p className="calendar-no-events">No events are scheduled for this day.</p>
                    )}
                  </>
                ) : (
                  <p className="calendar-no-events">
                    Select a date to see the programme for that day.
                  </p>
                )}
              </aside>
            </div>
          </div>
        ) : null}

        {activeTab === "discover" ? (
          <div
            id="discover-panel"
            role="tabpanel"
            aria-labelledby="discover-tab"
            className="events-panel"
          >
            <div className="events-panel-head">
              <div>
                <span className="kicker">Discover</span>
                <h2>Find a public FNAN <span className="em-action">event.</span></h2>
              </div>
              <p className="discover-note">
                Browse workshops, forums and gatherings promoted by the First
                Nations Action Network.
              </p>
            </div>

            <div className="discover-filters">
              <label className="discover-search">
                <span>Search events</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by topic or place"
                />
              </label>
              <label>
                <span>Event type</span>
                <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                  <option>All types</option>
                  {types.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label>
                <span>Attendance</span>
                <select value={formatFilter} onChange={(event) => setFormatFilter(event.target.value)}>
                  <option>All formats</option>
                  {formats.map((format) => <option key={format}>{format}</option>)}
                </select>
              </label>
            </div>

            <p className="discover-count" aria-live="polite">
              {discoveredEvents.length} event{discoveredEvents.length === 1 ? "" : "s"} found
            </p>
            {discoveredEvents.length ? (
              <div className="discover-results">
                {discoveredEvents.map((event) => (
                  <EventCard
                    event={event}
                    past={isPastEvent(event, today)}
                    showDate
                    key={event.id}
                  />
                ))}
              </div>
            ) : (
              <EmptyEvents message="No events match those filters." />
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
