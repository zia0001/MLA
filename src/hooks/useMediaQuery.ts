"use client";

import { useEffect, useState } from "react";

/**
 * Media queries always start `false` on the server and on the first client
 * render so hydration matches, then settle on the real value in an effect.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setMatches(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** Phones and small tablets — the tier where 3D and effects get trimmed. */
export const useIsCompact = () => useMediaQuery("(max-width: 900px)");

/** Touch devices: no hover states, no cursor effects, no magnetic buttons. */
export const useIsTouch = () => useMediaQuery("(hover: none), (pointer: coarse)");

/**
 * True where pointer-driven motion should be switched off entirely — touch
 * hardware or a reduced-motion preference. Both queries are always evaluated,
 * so the hook order never changes.
 */
export function useStaticPointer() {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  return touch || reduced;
}
