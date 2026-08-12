/**
 * Scroll telemetry shared between the DOM and the WebGL frame loop.
 *
 * The 3D hero needs to know where the page is without React re-rendering the
 * canvas on every scroll tick, so Lenis writes into this mutable singleton and
 * `useFrame` reads it. Nothing here should ever be stored in component state.
 */

export type ScrollState = {
  /** 0 → 1 across the whole document. */
  progress: number;
  /** Pixels scrolled from the top. */
  y: number;
  /** Signed scroll velocity, useful for inertial reactions. */
  velocity: number;
};

export const scrollState: ScrollState = { progress: 0, y: 0, velocity: 0 };

export function writeScrollState(next: Partial<ScrollState>) {
  Object.assign(scrollState, next);
}

/** How far the viewport has travelled through the first screen, clamped 0 → 1. */
export function heroProgress() {
  if (typeof window === "undefined") return 0;
  return Math.min(1, Math.max(0, scrollState.y / window.innerHeight));
}
