"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { introStore } from "@/lib/intro";
import { SITE } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Total curtain time. Anything longer reads as a slow site, not a premium one. */
const HOLD_MS = 1250;

/**
 * Curtain intro: the wordmark assembles in 3D, a gold rule draws under it, then
 * the panel lifts. The page underneath is fully rendered the whole time — this
 * is an overlay, never a gate on content.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const mounted = useMounted();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    // Reduced motion still schedules rather than setting state inline, so the
    // curtain always leaves through the same code path.
    const timer = window.setTimeout(
      () => {
        setOpen(false);
        introStore.markReady();
      },
      reduced ? 0 : HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [mounted, reduced]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[95] grid place-items-center bg-[var(--bg-deep)] perspective-[900px]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.75, ease: EASE }}
          aria-hidden
        >
          <div
            className="absolute h-[28rem] w-[28rem] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold) 26%, transparent), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            <motion.span
              className="gold-text font-display text-[clamp(3rem,9vw,6rem)] font-semibold leading-none tracking-[0.12em]"
              initial={{ opacity: 0, rotateX: 70, y: 40, filter: "blur(14px)" }}
              animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              {SITE.wordmark.lead}
            </motion.span>

            <motion.span
              className="mt-4 h-px bg-[var(--gold)]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(18rem, 60vw)", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            />

            <motion.span
              className="mt-4 text-[0.7rem] uppercase tracking-[0.52em] text-muted"
              initial={{ opacity: 0, y: 12, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.52em" }}
              transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
            >
              {SITE.wordmark.trail}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
