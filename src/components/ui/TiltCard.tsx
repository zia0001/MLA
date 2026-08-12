"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

import { useStaticPointer } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Keep it small — this should read as depth, not novelty. */
  intensity?: number;
  glare?: boolean;
};

const SPRING = { stiffness: 150, damping: 18, mass: 0.5 } as const;

/**
 * Pointer-driven card tilt with a sheen that tracks the cursor.
 *
 * The card body establishes a 3D context; content is stacked inside it with
 * `CardLayer`, so the icon, title and arrow each sit at their own depth and
 * separate as the card turns. That parallax is what sells the effect — a flat
 * face that merely rotates reads as a gimmick.
 */
export function TiltCard({ children, className, intensity = 7, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStaticPointer();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING);
  const rotateY = useSpring(rawY, SPRING);

  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${px}% ${py}%, var(--halo), transparent 60%)`;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || still) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    px.set(nx * 100);
    py.set(ny * 100);
    rawY.set((nx - 0.5) * intensity * 2);
    rawX.set(-(ny - 0.5) * intensity * 2);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
    px.set(50);
    py.set(50);
  };

  return (
    <div className="perspective-[1100px] h-full">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        whileHover={still ? undefined : { z: 40, transition: { duration: 0.5 } }}
        className={cn(
          "group relative h-full transform-3d rounded-2xl border border-line",
          "bg-[color-mix(in_oklab,var(--bg-elev)_82%,transparent)] backdrop-blur-[2px]",
          "transition-[border-color,box-shadow] duration-700 ease-[var(--ease-lux)]",
          "hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-soft)] will-change-transform",
          className,
        )}
      >
        {glare && (
          <motion.span
            aria-hidden
            style={{ background: sheen }}
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

/**
 * One depth plane inside a TiltCard. `z` is its resting depth; `hoverZ` is
 * where it travels to while the card is hovered.
 */
export function CardLayer({
  children,
  z = 20,
  hoverZ,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  z?: number;
  hoverZ?: number;
  className?: string;
  as?: "div" | "span" | "h3" | "p";
}) {
  return (
    <Tag
      className={cn(
        "transform-3d transition-transform duration-700 ease-[var(--ease-lux)]",
        "[transform:translateZ(var(--z))] group-hover:[transform:translateZ(var(--zh))]",
        className,
      )}
      style={
        {
          "--z": `${z}px`,
          "--zh": `${hoverZ ?? z * 1.6}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
