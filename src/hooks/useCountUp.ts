"use client";

import { useEffect, useState } from "react";

type Options = {
  /** Counting only starts once the section is actually on screen. */
  active: boolean;
  duration?: number;
  reduced?: boolean;
};

/**
 * Eased count-up driven by rAF rather than a timer, so the curve stays smooth
 * on high-refresh displays and the final frame always lands exactly on target.
 */
export function useCountUp(
  target: number,
  { active, duration = 1900, reduced = false }: Options,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration, reduced]);

  // With motion reduced the final figure is simply reported, never counted.
  return reduced ? target : value;
}
