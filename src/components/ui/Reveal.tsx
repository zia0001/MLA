"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled during the reveal, in pixels. */
  distance?: number;
  /**
   * `rise` is the house reveal. `depth` brings the element forward out of the
   * page instead, for cards that should read as objects rather than panels.
   */
  variant?: "rise" | "depth";
  as?: "div" | "section" | "li" | "span" | "p";
};

/**
 * The scroll-reveal primitive used site-wide: a slow rise with a slight blur
 * lift. Keeping one primitive is what makes the page feel of a piece.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  variant = "rise",
  as = "div",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as];

  const shownTransition = { duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] as const };

  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.3 } } }
    : variant === "depth"
      ? {
          hidden: { opacity: 0, z: -140, y: distance * 0.7, rotateX: 12 },
          shown: {
            opacity: 1,
            z: 0,
            y: 0,
            rotateX: 0,
            transition: { ...shownTransition, duration: 1.25 },
          },
        }
      : {
          hidden: { opacity: 0, y: distance, filter: "blur(6px)" },
          shown: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: shownTransition,
          },
        };

  const element = (
    <Tag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </Tag>
  );

  // Perspective has to live on the parent for the depth travel to be visible.
  if (variant === "depth" && !reduced) {
    return <div className="perspective-[1200px] h-full">{element}</div>;
  }

  return element;
}
