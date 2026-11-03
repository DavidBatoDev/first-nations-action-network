"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Whether the viewport is at least `px` wide.
 *
 * Follows the same shape as `usePrefersReducedMotion`: subscribe rather than
 * read once, so resizing or rotating the device takes effect without a reload.
 *
 * The server snapshot is `false`, which means the first paint always uses the
 * narrow (mobile) branch. That is deliberate. Markup has to be identical on the
 * server and the client or React discards it and warns about a hydration
 * mismatch, and of the two possible guesses, treating an unknown viewport as
 * small is the one that never ships a large download to a phone. A desktop gets
 * the wide branch a tick later, after hydration, which is invisible for media
 * that starts loading anyway.
 */
export function useMinWidth(px: number): boolean {
  const query = `(min-width: ${px}px)`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default useMinWidth;
