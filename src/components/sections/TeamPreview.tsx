"use client";

import { ArrowRight } from "lucide-react";

import { TEAM_PREVIEW, type Advocate } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardLayer, TiltCard } from "@/components/ui/TiltCard";

/**
 * Portrait placeholder: a monogram plate rather than a grey box, so the card
 * looks finished until real photography is supplied.
 */
function Portrait({ advocate }: { advocate: Advocate }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, color-mix(in oklab, var(--gold) 16%, var(--bg-elev)), var(--bg-deep) 72%)",
        }}
      />
      <div className="grain absolute inset-0" />
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-transform duration-1000 ease-[var(--ease-lux)] group-hover:scale-125"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)",
        }}
      />
      <span className="absolute inset-0 grid place-items-center font-display text-6xl tracking-[0.08em] text-ink-strong/85 transition-transform duration-1000 ease-[var(--ease-lux)] group-hover:scale-105">
        {advocate.monogram}
      </span>
      <span className="absolute inset-x-5 bottom-5 h-px bg-[var(--gold)]/40" />
    </div>
  );
}

export function TeamPreview() {
  return (
    <section id="team" className="relative py-28 lg:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Counsel"
            title="Meet Our Legal Experts"
            accent={["Experts"]}
            variant="slide"
            className="lg:max-w-xl"
          />
          <Reveal delay={0.1} className="shrink-0">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              Full team page
              <span className="ml-2 text-[var(--gold)]">arriving soon</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-2.5 sm:gap-5 md:gap-6">
          {TEAM_PREVIEW.map((advocate, i) => (
            <Reveal key={advocate.id} variant="depth" delay={i * 0.1}>
              <TiltCard intensity={8}>
                <div className="transform-3d p-2.5 sm:p-4 md:p-5">
                  <CardLayer z={18} hoverZ={34}>
                    <Portrait advocate={advocate} />
                  </CardLayer>
                  <CardLayer z={32} hoverZ={52} className="px-0.5 pb-0.5 pt-3 sm:px-1 sm:pt-4 md:px-2 md:pb-2 md:pt-6">
                    <h3 className="font-display text-sm leading-tight text-ink-strong sm:text-lg md:text-[1.3rem]">
                      {advocate.name}
                    </h3>
                    <p className="mt-1.5 text-[0.55rem] uppercase leading-tight tracking-[0.1em] text-gold sm:text-[0.72rem] sm:tracking-[0.2em]">
                      {advocate.position}
                    </p>
                    <p className="mt-2 text-[0.62rem] leading-4 text-muted sm:mt-3 sm:text-[0.875rem]">{advocate.practice}</p>
                  </CardLayer>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-12">
          <span
            className="group inline-flex cursor-default items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted"
            title="The team page is not published yet"
          >
            View Our Team
            <ArrowRight size={14} strokeWidth={1.5} className="text-[var(--gold)]" />
            <span className="h-px w-10 bg-[var(--gold)]/50" />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
