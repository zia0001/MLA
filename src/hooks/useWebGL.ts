"use client";

import { useSyncExternalStore } from "react";

import { supportsWebGL } from "@/lib/webgl";

const NEVER_CHANGES = () => () => {};

// Probed once per document: the check allocates a context, and `getSnapshot`
// is called on every render, so the result has to be cached.
let cached: boolean | null = null;
const probe = () => {
  if (cached === null) cached = supportsWebGL();
  return cached;
};

/** False during SSR and the first paint, then the real capability. */
export function useWebGL() {
  return useSyncExternalStore(NEVER_CHANGES, probe, () => false);
}
