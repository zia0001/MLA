"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Ring = { tilt: number; turn: number; scale: number; duration: number; bright?: boolean };

const RINGS: Ring[] = [
  { tilt: 72, turn: 8, scale: 1, duration: 34, bright: true },
  { tilt: 62, turn: -26, scale: 0.82, duration: 26 },
  { tilt: 78, turn: 40, scale: 0.63, duration: 20, bright: true },
  { tilt: 18, turn: 12, scale: 0.44, duration: 44 },
];

/**
 * An abstract orbital sculpture built from real CSS 3D transforms — used where a
 * second WebGL context would cost more than the moment is worth.
 */
export function OrbitalRings({
  className,
  size = 440,
}: {
  className?: string;
  size?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none relative", className)}
      style={{ width: size, height: size, perspective: `${size * 2}px` }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {RINGS.map((ring, i) => (
          <div
            key={i}
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{
              transform: `rotateX(${ring.tilt}deg) rotateY(${ring.turn}deg) scale(${ring.scale})`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: ring.bright
                  ? "color-mix(in oklab, var(--gold) 62%, transparent)"
                  : "color-mix(in oklab, var(--gold) 26%, transparent)",
                boxShadow: ring.bright
                  ? "0 0 44px -14px var(--gold), inset 0 0 34px -18px var(--gold)"
                  : undefined,
                animation: reduced
                  ? undefined
                  : `orbit-spin ${ring.duration}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }}
            >
              {/* A single bead riding the ring gives the rotation something to read against. */}
              <span
                className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: "var(--gold-bright)",
                  boxShadow: "0 0 14px 2px var(--halo)",
                  opacity: ring.bright ? 0.95 : 0.5,
                }}
              />
            </div>
          </div>
        ))}

        <div
          className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[26px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--gold-bright) 70%, transparent), transparent 68%)",
            animation: reduced ? undefined : "core-pulse 7s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
