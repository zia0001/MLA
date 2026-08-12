"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { useIsCompact, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { useWebGL } from "@/hooks/useWebGL";
import { qualityFor } from "@/lib/scene";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { ScalesFallback } from "./ScalesFallback";

// The WebGL bundle is the heaviest thing on the page: keep it out of the
// server render and off the critical path entirely.
const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

/**
 * Full-bleed 3D stage behind the hero copy. When WebGL is unavailable or motion
 * is reduced it falls back to the layered CSS background plus line-art scales,
 * which is a finished design in its own right rather than a degraded one.
 */
export function HeroStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  const compact = useIsCompact();
  const webgl = useWebGL();
  const { resolvedTheme } = useTheme();

  const [active, setActive] = useState(true);

  // Pause the render loop whenever the hero scrolls out of view.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const use3D = mounted && webgl === true && !reduced;

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      {use3D ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroScene
            light={resolvedTheme === "light"}
            quality={qualityFor(compact)}
            active={active}
          />
        </motion.div>
      ) : (
        <>
          <HeroBackground />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 items-center lg:flex">
            <ScalesFallback />
          </div>
        </>
      )}

      {/* Readability scrims: the copy must never fight the stage behind it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg) 2%, color-mix(in oklab, var(--bg) 62%, transparent) 34%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg, var(--bg) 4%, color-mix(in oklab, var(--bg) 72%, transparent) 30%, transparent 58%)",
        }}
      />
      {/* Hand-off into the next section — the canvas is opaque, so it must fade. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />
    </div>
  );
}
