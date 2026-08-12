"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Text reveal styles. Sections use different ones deliberately: repeating a
 * single reveal down a long page reads as a template, while varying it keeps
 * each section feeling authored.
 */
export type TextVariant =
  /** Words rise out of a clipped line box, rotating in 3D. */
  | "word"
  /** Per-character stagger — reserved for short, important headings. */
  | "char"
  /** Whole block resolves from a blur. */
  | "blur"
  /** Letter-spacing contracts as the line fades in. */
  | "tracking"
  /** Left-to-right clip wipe. */
  | "mask"
  /** Plain staggered slide-up, no mask. */
  | "slide";

type Props = {
  text: string;
  className?: string;
  /** Words rendered in gold, matched case-insensitively without punctuation. */
  accent?: string[];
  delay?: number;
  stagger?: number;
  variant?: TextVariant;
  /** `mount` for above-the-fold copy, `inView` for everything further down. */
  mode?: "mount" | "inView";
  /** Holds a `mount` reveal back — used while the intro curtain is still up. */
  play?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const bare = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

const SPLIT_ITEM: Record<"word" | "char" | "slide", Variants> = {
  word: {
    hidden: { y: "115%", opacity: 0, rotateX: 48 },
    shown: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1.15, ease: EASE },
    },
  },
  char: {
    hidden: { y: "110%", opacity: 0, rotateX: 62 },
    shown: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  },
  slide: {
    hidden: { y: 30, opacity: 0 },
    shown: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
  },
};

const BLOCK_ITEM: Record<"blur" | "tracking" | "mask", Variants> = {
  blur: {
    hidden: { opacity: 0, filter: "blur(16px)", scale: 1.035, y: 14 },
    shown: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      transition: { duration: 1.5, ease: EASE },
    },
  },
  tracking: {
    hidden: { opacity: 0, letterSpacing: "0.34em" },
    shown: {
      opacity: 1,
      letterSpacing: "-0.025em",
      transition: { duration: 1.6, ease: EASE },
    },
  },
  mask: {
    hidden: { clipPath: "inset(0 100% -20% 0)", opacity: 0.4, y: 18 },
    shown: {
      clipPath: "inset(0 0% -20% 0)",
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: EASE },
    },
  },
};

const FADE: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.4 } },
};

export function AnimatedText({
  text,
  className,
  accent = [],
  delay = 0,
  stagger,
  variant = "word",
  mode = "inView",
  play = true,
  as: Tag = "h2",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const accents = new Set(accent.map(bare));
  const words = text.split(" ");

  const animation =
    mode === "mount"
      ? { animate: play ? ("shown" as const) : ("hidden" as const) }
      : {
          whileInView: "shown" as const,
          viewport: { once: true, margin: "-12% 0px" },
        };

  // --- single-block variants ------------------------------------------------
  if (reduced || variant === "blur" || variant === "tracking" || variant === "mask") {
    const variants = reduced ? FADE : BLOCK_ITEM[variant as "blur" | "tracking" | "mask"];
    return (
      <Tag className={className}>
        <motion.span
          className="inline-block"
          variants={variants}
          initial="hidden"
          transition={{ delay }}
          {...animation}
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              <span className={cn(accents.has(bare(word)) && "gold-text")}>{word}</span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // --- split variants -------------------------------------------------------
  const split = variant as "word" | "char" | "slide";
  const item = SPLIT_ITEM[split];
  const step = stagger ?? (split === "char" ? 0.028 : 0.085);
  const masked = split !== "slide";

  const container: Variants = {
    hidden: {},
    shown: { transition: { delayChildren: delay, staggerChildren: step } },
  };

  return (
    <Tag className={cn("perspective-[900px]", className)}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        {...animation}
      >
        {words.map((word, wi) => {
          const gold = accents.has(bare(word));
          const units = split === "char" ? Array.from(word) : [word];

          return (
            <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
              {units.map((unit, ui) => (
                <span
                  key={ui}
                  className={cn(
                    "inline-block align-bottom",
                    masked && "overflow-hidden pb-[0.14em]",
                  )}
                >
                  <motion.span
                    variants={item}
                    className={cn("inline-block will-change-transform", gold && "gold-text")}
                  >
                    {unit}
                  </motion.span>
                </span>
              ))}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
