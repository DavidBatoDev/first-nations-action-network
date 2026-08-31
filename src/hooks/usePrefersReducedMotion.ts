"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor has asked the operating system to reduce motion.
 *
 * Lives here because three places need it — the 3D map, the logo carousel and
 * the membership ecosystem graph — and each had grown its own copy. Server
 * renders get `false` so the markup matches, then the real value arrives on
 * hydration; subscribe rather than read once, so toggling the OS setting takes
 * effect without a reload.
 */
export function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const query = window.matchMedia(QUERY);
    query.addEventListener("change", onStoreChange);
    return () => query.removeEventListener("change", onStoreChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export default usePrefersReducedMotion;
