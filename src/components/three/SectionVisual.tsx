"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

import { useIsCompact, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { useProgressRef } from "@/hooks/useProgressRef";
import { useWebGL } from "@/hooks/useWebGL";
import { cn } from "@/lib/utils";

const SCENES = {
  intro: dynamic(() => import("./scenes").then((m) => m.IntroScene), {
    ssr: false,
    loading: () => null,
  }),
  why: dynamic(() => import("./scenes").then((m) => m.WhyScene), {
    ssr: false,
    loading: () => null,
  }),
  cta: dynamic(() => import("./scenes").then((m) => m.CtaScene), {
    ssr: false,
    loading: () => null,
  }),
};

type Props = {
  scene: keyof typeof SCENES;
  /** Rendered instead of WebGL when 3D is unavailable or motion is reduced. */
  fallback?: React.ReactNode;
  className?: string;
};

/**
 * Host for a section-level 3D scene. The scene chunk is not even requested
 * until the section is within a screen of the viewport, so the page's initial
 * cost stays with the hero.
 */
export function SectionVisual({ scene, fallback = null, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useProgressRef(wrap);
  const mounted = useMounted();
  const reduced = usePrefersReducedMotion();
  const compact = useIsCompact();
  const webgl = useWebGL();
  const { resolvedTheme } = useTheme();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Scene = SCENES[scene];
  const use3D = mounted && !reduced && webgl === true;

  return (
    <div ref={wrap} className={cn("relative", className)}>
      {use3D && near ? (
        <Scene
          light={resolvedTheme === "light"}
          compact={compact}
          progress={progress}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
