"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

export type DirectoryEntry = {
  name: string;
  /** State/territory network the organisation belongs to. */
  stateName: string;
  stateAbbr: string;
  actionNetworkUrl?: string;
  siteUrl?: string;
  logo?: string;
};

/**
 * Searchable directory of organisations across the state networks.
 *
 * Search and the state filter are live. Organisation type and focus area are
 * shown but disabled: those fields do not exist on the listings yet, so
 * offering the filters would imply data we do not have.
 */
export default function DirectoryBrowser({
  entries,
}: {
  entries: DirectoryEntry[];
}) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const searchId = useId();
  const stateId = useId();
  const typeId = useId();
  const focusId = useId();

  const states = useMemo(() => {
    const seen = new Map<string, string>();
    for (const entry of entries) seen.set(entry.stateAbbr, entry.stateName);
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [entries]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesState = !state || entry.stateAbbr === state;
      const matchesQuery =
        !needle ||
        `${entry.name} ${entry.stateName} ${entry.stateAbbr}`
          .toLowerCase()
          .includes(needle);
      return matchesState && matchesQuery;
    });
  }, [entries, query, state]);

  return (
    <>
      <form
        className="directory-filters"
        aria-describedby="directory-status"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="directory-search-field">
          <label htmlFor={searchId}>Search the directory</label>
          <div className="directory-search-control">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              id={searchId}
              type="search"
              placeholder="Search by organisation or keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="directory-filter-field">
          <label htmlFor={stateId}>State or territory</label>
          <select
            id={stateId}
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="">All states and territories</option>
            {states.map(([abbr, name]) => (
              <option key={abbr} value={abbr}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="directory-filter-field">
          <label htmlFor={typeId}>Organisation type</label>
          <select id={typeId} defaultValue="" disabled>
            <option value="">All organisation types</option>
          </select>
        </div>

        <div className="directory-filter-field">
          <label htmlFor={focusId}>Focus area</label>
          <select id={focusId} defaultValue="" disabled>
            <option value="">All focus areas</option>
          </select>
        </div>

        <p id="directory-status" className="directory-filter-status">
          Organisation type and focus area are being added to the listings and
          will become filterable once available.
        </p>
      </form>

      <p className="directory-count" aria-live="polite">
        {results.length} organisation{results.length === 1 ? "" : "s"}
        {state ? ` in ${states.find(([abbr]) => abbr === state)?.[1]}` : ""}
      </p>

      {results.length ? (
        <div className="directory-grid">
          {results.map((entry) => (
            <article className="directory-card" key={`${entry.stateAbbr}-${entry.name}`}>
              <div className="directory-card-heading">
                {entry.logo ? (
                  <span className="directory-card-logo-slot">
                    <Image
                      src={entry.logo}
                      alt=""
                      width={501}
                      height={251}
                      sizes="96px"
                    />
                  </span>
                ) : null}
                <div>
                  <p className="directory-card-type">{entry.stateAbbr}</p>
                  <h3>{entry.name}</h3>
                </div>
              </div>

              <div className="directory-card-links">
                {entry.actionNetworkUrl ? (
                  <a
                    href={entry.actionNetworkUrl}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${entry.name} on Action Network (opens in a new tab)`}
                  >
                    Action Network
                  </a>
                ) : null}
                {entry.siteUrl ? (
                  <a
                    href={entry.siteUrl}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${entry.name} website (opens in a new tab)`}
                  >
                    Website
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="directory-empty" role="status">
          <div className="directory-empty-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <span className="eyebrow">No matches</span>
            <h3>No organisations match that search.</h3>
            <p>
              Try a different keyword, or clear the state filter to see every
              organisation in the network.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
