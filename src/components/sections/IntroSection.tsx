"use client";

import { ArrowRight } from "lucide-react";

import { SectionVisual } from "@/components/three/SectionVisual";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { OrbitalRings } from "@/components/ui/OrbitalRings";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IntroSection() {
  return (
    <section id="about" className="relative py-28 lg:py-40">
      <div className="shell grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Bound volumes in 3D — the reading half of the practice. */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <div
              aria-hidden
              className="absolute inset-[6%] rounded-full border border-line"
              style={{ animation: "orbit-spin 70s linear infinite" }}
            />
            <div
              aria-hidden
              className="absolute inset-[26%] rounded-full border border-line/60"
            />
            <div
              aria-hidden
              className="absolute inset-[12%] rounded-full blur-[70px]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)",
              }}
            />

            <SectionVisual
              scene="intro"
              className="absolute inset-0"
              fallback={
                <div className="grid h-full w-full place-items-center">
                  <OrbitalRings size={320} />
                </div>
              }
            />

            <div className="absolute bottom-1 left-0 rounded-xl border border-line bg-[var(--bg-elev)]/80 px-5 py-4 backdrop-blur-md">
              <p className="font-display text-2xl text-ink-strong">Est. 2014</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                Chambers &amp; Counsel
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          {/* Blur-to-sharp: the section is about clarity. */}
          <SectionHeading
            eyebrow="Who We Are"
            title="Legal Excellence Built on Trust."
            accent={["Trust."]}
            variant="blur"
          />

          <Reveal
            delay={0.1}
            className="mt-7 space-y-5 text-[0.975rem] leading-[1.9] text-muted"
          >
            <p>
              MLA Advocates is committed to delivering strategic legal solutions with
              integrity, professionalism, and a deep understanding of our clients&apos;
              needs.
            </p>
            <p>
              We act for individuals, founders, and institutions across corporate,
              civil, criminal, and family matters — pairing rigorous preparation with
              plain-spoken advice, so every client understands not only what we are
              doing, but why.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10">
            <MagneticButton href="#expertise" variant="outline">
              Learn More
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-[var(--ease-lux)] group-hover:translate-x-1"
              />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
