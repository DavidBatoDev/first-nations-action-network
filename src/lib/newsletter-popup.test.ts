import { describe, expect, it, afterEach, vi } from "vitest";

import {
  DISMISS_COOLDOWN_DAYS,
  POPUP_STORAGE_KEY,
  readState,
  shouldShow,
  writeState,
  type PopupState,
} from "./newsletter-popup";

const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 7, 7, 6, 0, 0);

function daysAgo(days: number): number {
  return NOW - days * DAY_MS;
}

/** Minimal in-memory stand-in for `window.localStorage`. */
function stubStorage(initial?: string) {
  const store = new Map<string, string>();
  if (initial !== undefined) store.set(POPUP_STORAGE_KEY, initial);
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    },
  });
  return store;
}

/** Storage that throws on every access, as Safari private mode does. */
function stubThrowingStorage() {
  vi.stubGlobal("window", {
    localStorage: {
      getItem() {
        throw new Error("SecurityError");
      },
      setItem() {
        throw new Error("QuotaExceededError");
      },
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("shouldShow", () => {
  it("shows on a first visit", () => {
    expect(shouldShow(null, NOW)).toBe(true);
  });

  it("never shows again after the visitor followed the sign-up link", () => {
    const state: PopupState = { status: "subscribed", at: daysAgo(900) };
    expect(shouldShow(state, NOW)).toBe(false);
  });

  it("never shows again after the visitor reached a sign-up form", () => {
    const state: PopupState = { status: "suppressed", at: daysAgo(900) };
    expect(shouldShow(state, NOW)).toBe(false);
  });

  it("stays hidden during the cooldown after a dismissal", () => {
    const state: PopupState = { status: "dismissed", at: daysAgo(1) };
    expect(shouldShow(state, NOW)).toBe(false);
  });

  it("stays hidden the day before the cooldown ends", () => {
    const state: PopupState = {
      status: "dismissed",
      at: daysAgo(DISMISS_COOLDOWN_DAYS - 1),
    };
    expect(shouldShow(state, NOW)).toBe(false);
  });

  it("shows again exactly on the cooldown boundary", () => {
    const state: PopupState = {
      status: "dismissed",
      at: daysAgo(DISMISS_COOLDOWN_DAYS),
    };
    expect(shouldShow(state, NOW)).toBe(true);
  });

  it("shows again well after the cooldown", () => {
    const state: PopupState = {
      status: "dismissed",
      at: daysAgo(DISMISS_COOLDOWN_DAYS + 1),
    };
    expect(shouldShow(state, NOW)).toBe(true);
  });

  it("ignores a dismissal timestamped in the future", () => {
    const state: PopupState = { status: "dismissed", at: NOW + DAY_MS };
    expect(shouldShow(state, NOW)).toBe(false);
  });
});

describe("readState", () => {
  it("returns null when nothing is stored", () => {
    stubStorage();
    expect(readState()).toBeNull();
  });

  it("round-trips a stored state", () => {
    stubStorage(JSON.stringify({ status: "dismissed", at: daysAgo(2) }));
    expect(readState()).toEqual({ status: "dismissed", at: daysAgo(2) });
  });

  it("treats malformed JSON as a first visit", () => {
    stubStorage("{not json");
    expect(readState()).toBeNull();
    expect(shouldShow(readState(), NOW)).toBe(true);
  });

  it("rejects a valid JSON value of the wrong shape", () => {
    stubStorage(JSON.stringify({ status: "definitely-not-a-status", at: 1 }));
    expect(readState()).toBeNull();
  });

  it("rejects a state with a missing timestamp", () => {
    stubStorage(JSON.stringify({ status: "dismissed" }));
    expect(readState()).toBeNull();
  });

  it("survives storage that throws on access", () => {
    stubThrowingStorage();
    expect(readState()).toBeNull();
  });
});

describe("writeState", () => {
  it("stores the status and timestamp", () => {
    const store = stubStorage();
    writeState("subscribed", NOW);
    expect(store.get(POPUP_STORAGE_KEY)).toBe(
      JSON.stringify({ status: "subscribed", at: NOW }),
    );
  });

  it("is readable by readState", () => {
    stubStorage();
    writeState("dismissed", NOW);
    expect(readState()).toEqual({ status: "dismissed", at: NOW });
  });

  it("swallows storage failures", () => {
    stubThrowingStorage();
    expect(() => writeState("dismissed", NOW)).not.toThrow();
  });
});
