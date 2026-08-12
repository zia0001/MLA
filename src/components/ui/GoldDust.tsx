"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Multiplier on the area-derived particle count. */
  density?: number;
};

/**
 * 2D canvas gold dust for DOM sections. Cheaper than a second WebGL context and
 * it idles completely whenever the section is off screen.
 */
export function GoldDust({ className, density = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Mote = { x: number; y: number; r: number; a: number; speed: number; phase: number };
    let motes: Mote[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const seed = () => {
      const count = Math.min(150, Math.round(((width * height) / 24000) * density));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.5,
        a: 0.12 + Math.random() * 0.45,
        speed: 4 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const m of motes) {
        m.y -= m.speed * dt;
        m.phase += dt * 0.6;
        if (m.y < -6) {
          m.y = height + 6;
          m.x = Math.random() * width;
        }
        const x = m.x + Math.sin(m.phase) * 9;
        const twinkle = 0.65 + Math.sin(m.phase * 1.7) * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 164, 77, ${m.a * twinkle})`;
        ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;
        if (visible) {
          last = performance.now();
          frame = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [density, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
