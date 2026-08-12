"use client";

import { useSyncExternalStore } from "react";

const NEVER_CHANGES = () => () => {};

/**
 * True only after hydration — gate anything that reads browser-only state.
 *
 * Implemented with `useSyncExternalStore` rather than a setState-in-effect, so
 * there is no cascading render on mount: the server snapshot is `false` and the
 * client snapshot is `true`.
 */
export function useMounted() {
  return useSyncExternalStore(
    NEVER_CHANGES,
    () => true,
    () => false,
  );
}
