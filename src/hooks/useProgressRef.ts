"use client";

import { useRef, type RefObject } from "react";
import { useMotionValueEvent, useScroll, type UseScrollOptions } from "motion/react";

/**
 * Scroll progress for a section, delivered as a mutable ref instead of state.
 *
 * WebGL scenes read this inside `useFrame`, so pushing it through React state
 * would re-render the whole canvas subtree on every scroll tick.
 */
export function useProgressRef(
  target: RefObject<HTMLElement | null>,
  offset: UseScrollOptions["offset"] = ["start end", "end start"],
) {
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({ target, offset });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progress.current = value;
  });

  return progress;
}
