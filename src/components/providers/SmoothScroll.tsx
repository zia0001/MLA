"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { writeScrollState } from "@/lib/scroll";

/** Offset so anchored sections clear the fixed navbar. */
const ANCHOR_OFFSET = -84;

function useAnchorInterception(scrollTo?: (el: HTMLElement) => void) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      if (scrollTo) scrollTo(target);
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);
}

/** Publishes Lenis' scroll telemetry to the singleton the 3D scene reads. */
function LenisBridge() {
  const lenis = useLenis((instance) =>
    writeScrollState({
      progress: instance.progress,
      y: instance.scroll,
      velocity: instance.velocity,
    }),
  );

  useAnchorInterception(
    lenis
      ? // `force` so an anchor still resolves while the mobile menu has Lenis stopped.
        (el) => lenis.scrollTo(el, { offset: ANCHOR_OFFSET, duration: 1.4, force: true })
      : undefined,
  );

  return null;
}

/** Reduced-motion path: no inertia, but the 3D scene still needs telemetry. */
function NativeScrollBridge() {
  useEffect(() => {
    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      writeScrollState({
        y: window.scrollY,
        progress: max > 0 ? window.scrollY / max : 0,
        velocity: 0,
      });
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useAnchorInterception();
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <>
        <NativeScrollBridge />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        // Native touch scrolling stays native — synthesised touch inertia
        // feels wrong on phones and costs frames next to the WebGL hero.
        syncTouch: false,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
