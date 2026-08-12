"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useStaticPointer } from "@/hooks/useMediaQuery";

const HALO = { stiffness: 90, damping: 22, mass: 0.8 } as const;
const RING = { stiffness: 380, damping: 32, mass: 0.6 } as const;
const DOT = { stiffness: 900, damping: 45, mass: 0.4 } as const;

/** Anything that should make the cursor react. */
const INTERACTIVE = 'a, button, [role="button"], [data-cursor="hover"]';

/**
 * Three tracking layers at different speeds: an instant dot, a ring that trails
 * slightly, and a broad gold halo well behind both. The ring opens up over
 * interactive elements, which is the only feedback this cursor gives.
 */
export function CursorGlow() {
  const disabled = useStaticPointer();
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-600);
  const rawY = useMotionValue(-600);

  const haloX = useSpring(rawX, HALO);
  const haloY = useSpring(rawY, HALO);
  const ringX = useSpring(rawX, RING);
  const ringY = useSpring(rawY, RING);
  const dotX = useSpring(rawX, DOT);
  const dotY = useSpring(rawY, DOT);

  useEffect(() => {
    if (disabled) return;

    const move = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      if (!visible) setVisible(true);
      const target = event.target as HTMLElement | null;
      setHot(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [disabled, rawX, rawY, visible]);

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

      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          className="block rounded-full border border-gold"
          animate={{
            width: hot ? 46 : 26,
            height: hot ? 46 : 26,
            opacity: visible ? (hot ? 0.9 : 0.5) : 0,
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          className="block rounded-full bg-gold"
          animate={{
            width: hot ? 4 : 6,
            height: hot ? 4 : 6,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
    </div>
  );
}
