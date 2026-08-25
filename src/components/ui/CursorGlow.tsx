"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useStaticPointer } from "@/hooks/useMediaQuery";

const HALO = { stiffness: 90, damping: 22, mass: 0.8 } as const;

/**
 * A single broad gold halo trailing well behind the pointer. It reads as the
 * page being lit from wherever the user is looking, not as a cursor — the
 * cursor itself is the gold arrow set in CSS.
 */
export function CursorGlow() {
  const disabled = useStaticPointer();

  const rawX = useMotionValue(-600);
  const rawY = useMotionValue(-600);

  const haloX = useSpring(rawX, HALO);
  const haloY = useSpring(rawY, HALO);

  useEffect(() => {
    if (disabled) return;

    const move = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [disabled, rawX, rawY]);

  if (disabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      {/* Ambient light — reads as the page being lit, not as a cursor. */}
      <motion.div
        style={{ x: haloX, y: haloY }}
        className="absolute left-0 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--halo),transparent_62%)] opacity-70 blur-[40px]" />
      </motion.div>
    </div>
  );
}