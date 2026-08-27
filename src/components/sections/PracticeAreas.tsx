"use client";

import { ArrowUpRight } from "lucide-react";

import { PRACTICE_AREAS } from "@/lib/content";
import { PracticeIcon } from "@/components/ui/PracticeIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardLayer, TiltCard } from "@/components/ui/TiltCard";

export function PracticeAreas() {
  return (
    <section id="expertise" className="relative py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--line-strong) 30%, var(--line-strong) 70%, transparent)",
        }}
      />

      <div className="shell">
        {/* Letter-by-letter: short enough to carry it, important enough to earn it. */}
        <SectionHeading
          eyebrow="Practice Areas"
          title="Our Expertise"
          accent={["Expertise"]}
          variant="char"
          description="Six disciplines, one standard of preparation. Each matter is led by a partner and staffed to the question actually in dispute."
        />

        <div className="mt-16 grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {PRACTICE_AREAS.map((area, i) => (
            <Reveal
              key={area.id}
              variant="depth"
              delay={(i % 3) * 0.09}
              className="h-full"
            >
              <TiltCard className="h-full">
                {/* Each element sits at its own depth, so the card has interior parallax. */}
                <div className="relative flex h-full transform-3d flex-col p-3 sm:p-5 lg:p-8">
                  <CardLayer
                    z={12}
                    className="absolute right-3 top-3 hidden font-display text-sm text-muted/50 sm:right-6 sm:top-6 sm:block lg:right-7 lg:top-7"
                    as="span"
                  >
                    0{i + 1}
                  </CardLayer>

                  <CardLayer z={34} hoverZ={58}>
                    <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-line text-gold transition-all duration-700 ease-[var(--ease-lux)] group-hover:border-gold/60 group-hover:shadow-[0_0_36px_-10px_var(--gold)] sm:h-12 sm:w-12 sm:rounded-xl lg:h-14 lg:w-14">
                      <PracticeIcon
                        name={area.icon}
                        className="h-4 w-4 transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-110 group-hover:-rotate-6 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                      />
                    </span>
                  </CardLayer>

                  <CardLayer z={24} className="mt-4 sm:mt-6 lg:mt-7">
                    <h3 className="font-display text-sm leading-tight text-ink-strong sm:text-[1.15rem] lg:text-[1.35rem]">
                      {area.title}
                    </h3>
                  </CardLayer>

                  <CardLayer z={14} className="mt-2 flex-1 sm:mt-3">
                    <p className="text-[0.65rem] leading-4 text-muted sm:text-[0.9rem] sm:leading-[1.8]">
                      {area.description}
                    </p>
                  </CardLayer>

                  <CardLayer z={40} hoverZ={64} className="mt-7 hidden sm:block">
                    <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-gold">
                      Discuss this matter
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 ease-[var(--ease-lux)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </CardLayer>

                  <span
                    aria-hidden
                    className="absolute inset-x-3 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-x-100 sm:inset-x-6 lg:inset-x-8"
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
