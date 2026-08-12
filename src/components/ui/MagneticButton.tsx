"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

import { useStaticPointer } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  /** How far the button drifts toward the cursor, as a fraction of the offset. */
  strength?: number;
  onClick?: () => void;
  ariaLabel?: string;
};

const MOVE = { stiffness: 190, damping: 17, mass: 0.55 } as const;
const TILT = { stiffness: 220, damping: 20, mass: 0.4 } as const;

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-gold text-[#07101f] border border-transparent hover:bg-[var(--gold-bright)]",
  outline:
    "border border-[var(--line-strong)] text-ink hover:border-gold bg-[color-mix(in_oklab,var(--bg-elev)_55%,transparent)]",
  ghost: "border border-transparent text-ink hover:text-gold",
};

/**
 * Magnetic, and genuinely three-dimensional: the button drifts toward the
 * cursor, tips on two axes as the pointer crosses it, lifts toward the viewer
 * on hover, and presses back in on click.
 */
export function MagneticButton({
  children,
  href,
  variant = "solid",
  className,
  strength = 0.3,
  onClick,
  ariaLabel,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const still = useStaticPointer();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, MOVE);
  const y = useSpring(rawY, MOVE);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const rotateX = useSpring(rawTiltX, TILT);
  const rotateY = useSpring(rawTiltY, TILT);

  // Pointer position inside the button, used to park the sheen under the cursor.
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(130px circle at ${glowX}% ${glowY}%, rgb(255 255 255 / 0.3), transparent 62%)`;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    glowX.set(nx * 100);
    glowY.set(ny * 100);
    if (still) return;
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    rawTiltY.set((nx - 0.5) * 16);
    rawTiltX.set(-(ny - 0.5) * 14);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
    rawTiltX.set(0);
    rawTiltY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const inner = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
    "px-7 py-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.2em]",
    "transition-[background-color,border-color,color,box-shadow] duration-500 ease-lux",
    "hover:shadow-[0_22px_50px_-20px_var(--halo)]",
    VARIANTS[variant],
    className,
  );

  return (
    <div className="inline-flex perspective-[700px]">
      <motion.div
        ref={wrapRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={still ? undefined : { z: 26 }}
        whileTap={still ? undefined : { z: -10, scale: 0.975 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex will-change-transform"
      >
        {href ? (
          <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
            {inner}
          </Link>
        ) : (
          <button type="button" className={classes} aria-label={ariaLabel} onClick={onClick}>
            {inner}
          </button>
        )}
      </motion.div>
    </div>
  );
}
