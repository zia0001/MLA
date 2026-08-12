"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

import { STATS, type Stat } from "@/lib/content";
import { useCountUp } from "@/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { Reveal } from "@/components/ui/Reveal";

function StatCell({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const reduced = usePrefersReducedMotion();
  const value = useCountUp(stat.value, { active, reduced, duration: 2000 });

  return (
    // Numbers arrive out of depth rather than simply fading up.
    <Reveal variant="depth" delay={delay} className="group relative">
      <div className="relative flex transform-3d flex-col items-center px-4 py-10 text-center transition-transform duration-700 ease-[var(--ease-lux)] group-hover:[transform:rotateX(7deg)_translateZ(26px)]">
        <span className="font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-none text-ink-strong">
          <span className="gold-text tabular-nums">{Math.round(value)}</span>
          <span className="text-[var(--gold)]">{stat.suffix}</span>
        </span>
        <span className="mt-5 h-px w-8 bg-[var(--gold)]/60" />
        <span className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-muted">
          {stat.label}
        </span>
        {/* Reflection: a hint of a polished surface under the numerals. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-16 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, var(--halo), transparent 70%)",
          }}
        />
      </div>
    </Reveal>
  );
}

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <section className="relative py-24">
      <div className="shell">
        <div
          ref={ref}
          className="relative grid grid-cols-2 gap-y-4 rounded-3xl border border-line bg-[color-mix(in_oklab,var(--bg-elev)_70%,transparent)] px-4 py-6 backdrop-blur-[2px] perspective-[1000px] lg:grid-cols-4"
        >
          {/* Dividers sit between columns only — never on the last cell of a row. */}
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              className="relative border-r border-line [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              <StatCell stat={stat} active={inView} delay={i * 0.09} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
