"use client";

import { Reveal } from "./Reveal";
import { AnimatedText, type TextVariant } from "./AnimatedText";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  accent?: string[];
  description?: string;
  align?: "left" | "center";
  /** Each section gets its own reveal so the page never repeats itself. */
  variant?: TextVariant;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  variant = "word",
  className,
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal className={cn("flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-9 bg-gold/70" />
          <span className="eyebrow text-gold">{eyebrow}</span>
        </Reveal>
      )}

      <AnimatedText
        as="h2"
        variant={variant}
        text={title}
        accent={accent}
        className={cn("display-lg mt-5 text-ink-strong", centered && "text-center")}
      />

      {description && (
        <Reveal
          delay={0.12}
          as="p"
          className="mt-6 max-w-2xl text-[0.975rem] leading-[1.85] text-muted"
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
