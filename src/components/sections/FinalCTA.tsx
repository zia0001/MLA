"use client";

import { SectionVisual } from "@/components/three/SectionVisual";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GoldDust } from "@/components/ui/GoldDust";
import { OrbitalRings } from "@/components/ui/OrbitalRings";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SITE } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="consult" className="relative py-24 lg:py-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-line px-6 py-24 text-center lg:px-16 lg:py-32">
          {/* Ground */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, color-mix(in oklab, var(--gold) 13%, var(--bg-elev)), var(--bg-deep) 72%)",
            }}
          />
          <div className="grain absolute inset-0" />

          {/* Standing tablet, held well back so the headline stays dominant. */}
          <SectionVisual
            scene="cta"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-45 sm:block"
            fallback={
              <div className="grid h-full w-full place-items-center opacity-60">
                <OrbitalRings size={460} />
              </div>
            }
          />

          <GoldDust density={0.9} />

          <div className="relative">
            <Reveal className="flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[var(--gold)]/70" />
              <span className="eyebrow text-[var(--gold)]">Consultation</span>
              <span className="h-px w-9 bg-[var(--gold)]/70" />
            </Reveal>

            {/* Clip wipe: the closing line should arrive like a title card. */}
            <AnimatedText
              variant="mask"
              text="Your Case Deserves the Right Legal Strategy."
              className="display-lg mx-auto mt-7 max-w-4xl text-balance text-ink-strong"
            />

            <Reveal delay={0.12} as="p" className="mx-auto mt-7 max-w-xl text-[0.975rem] leading-[1.85] text-muted">
              Speak with our legal team and take the next step with confidence.
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex flex-col items-center gap-6">
              <MagneticButton href="/contact" strength={0.35}>
                Schedule a Consultation
              </MagneticButton>
              <a
                href={`mailto:${SITE.email}`}
                className="group text-[0.72rem] uppercase tracking-[0.2em] text-muted transition-colors duration-500 hover:text-ink"
              >
                or write to
                <span className="relative ml-2 text-[var(--gold)]">
                  {SITE.email}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-500 ease-[var(--ease-lux)] group-hover:scale-x-100" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
