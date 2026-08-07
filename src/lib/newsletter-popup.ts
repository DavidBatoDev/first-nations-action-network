/**
 * State for the homepage mailing-list pop-up.
 *
 * Pure module: no React, no side effects beyond the one `localStorage` key.
 * The browser is only touched through the guarded helpers below, so this file
 * is safe to import from a server component and easy to unit test.
 */

/** The single `localStorage` key holding the visitor's pop-up history. */
export const POPUP_STORAGE_KEY = "newsletter-popup-state";

/** How long a dismissal lasts before the visitor is asked again. */
export const DISMISS_COOLDOWN_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

export type PopupStatus =
  /** Followed the sign-up link. Never ask again. */
  | "subscribed"
  /** Closed the pop-up. Ask again after the cooldown. */
  | "dismissed"
  /** Reached a sign-up form by another route. Never ask again. */
  | "suppressed";

export type PopupState = {
  status: PopupStatus;
  /** When the status was recorded, epoch milliseconds. */
  at: number;
};

const PERMANENT: PopupStatus[] = ["subscribed", "suppressed"];

function isPopupState(value: unknown): value is PopupState {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<PopupState>;
  return (
    (candidate.status === "subscribed" ||
      candidate.status === "dismissed" ||
      candidate.status === "suppressed") &&
    typeof candidate.at === "number" &&
    Number.isFinite(candidate.at)
  );
}

/**
 * Decide whether the pop-up may be shown.
 *
 * Unknown, missing or malformed state counts as a first visit: better to ask a
 * visitor twice than to silently never ask at all.
 */
export function shouldShow(state: PopupState | null, now: number): boolean {
  if (!state) return true;
  if (PERMANENT.includes(state.status)) return false;
  return now - state.at >= DISMISS_COOLDOWN_DAYS * DAY_MS;
}

/**
 * Read the stored state.
 *
 * Returns `null` when there is nothing stored, when the value cannot be parsed,
 * or when storage is unavailable (Safari private browsing throws on access).
 */
export function readState(): PopupState | null {
  try {
    const raw = window.localStorage.getItem(POPUP_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isPopupState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Record a status, ignoring storage failures. */
export function writeState(status: PopupStatus, now: number = Date.now()): void {
  try {
    window.localStorage.setItem(
      POPUP_STORAGE_KEY,
      JSON.stringify({ status, at: now } satisfies PopupState),
    );
  } catch {
    // Storage unavailable or full: the pop-up simply may reappear later.
  }
}
