"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { VALUES } from "@/lib/content";
import { SectionVisual } from "@/components/three/SectionVisual";
import { OrbitalRings } from "@/components/ui/OrbitalRings";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardLayer, TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

/**
 * A timeline rather than a grid: the gold spine fills as the section is read,
 * which gives four short values a sense of sequence and weight.
 */
export function WhyChooseUs() {
  const track = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 78%", "end 62%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 70, damping: 26, restDelta: 0.001 });

  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[150px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 20%, transparent), transparent 68%)",
        }}
      />

      {/* Gimbal rings turning behind the timeline, driven by section scroll. */}
      <SectionVisual
        scene="why"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-70"
        fallback={
          <div className="grid h-full w-full place-items-center opacity-60">
            <OrbitalRings size={520} />
          </div>
        }
      />

      <div className="shell relative">
        {/* Letter-spacing contracts as the line arrives. */}
        <SectionHeading
          eyebrow="The Difference"
          title="Why Choose MLA Advocates?"
          accent={["MLA"]}
          align="center"
          variant="tracking"
          description="Four commitments that shape how every file is opened, argued, and closed."
        />

        <ul ref={track} className="relative mt-14 grid grid-cols-2 gap-2.5 sm:mt-16 sm:gap-5 lg:mt-20 lg:flex lg:flex-col lg:gap-20">
          {/* Spine */}
          <span
            aria-hidden
            className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-line lg:block"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[var(--gold-bright)] via-[var(--gold)] to-transparent lg:block"
          />

          {VALUES.map((value, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={value.id}
                className="relative min-w-0 lg:grid lg:items-center lg:gap-16 lg:grid-cols-2"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[var(--gold)] bg-[var(--bg)] lg:block"
                  style={{ boxShadow: "0 0 22px -4px var(--gold)" }}
                />

                <Reveal
                  variant="depth"
                  distance={34}
                  className={cn(
                    "min-w-0 lg:pl-0",
                    right ? "lg:col-start-2 lg:pl-14" : "lg:pr-14",
                  )}
                >
                  <TiltCard intensity={6}>
                    <div className="relative transform-3d p-3 sm:p-5 lg:p-10">
                      <CardLayer
                        z={8}
                        as="span"
                        className="pointer-events-none absolute right-3 top-2 font-display text-3xl leading-none text-transparent opacity-60 sm:right-5 sm:top-3 sm:text-5xl lg:right-6 lg:top-4 lg:text-6xl"
                      >
                        <span style={{ WebkitTextStroke: "1px var(--line-strong)" }}>
                          {value.index}
                        </span>
                      </CardLayer>
                      <CardLayer z={30} hoverZ={48}>
                        <h3 className="font-display text-base leading-tight text-ink-strong sm:text-xl lg:text-[1.6rem]">
                          {value.title}
                        </h3>
                        <span className="mt-3 block h-px w-7 bg-gold/70 sm:mt-4 sm:w-10" />
                      </CardLayer>
                      <CardLayer z={16} className="mt-3 sm:mt-4 lg:mt-5">
                        <p className="max-w-md text-[0.65rem] leading-4 text-muted sm:text-[0.925rem] sm:leading-[1.85]">
                          {value.description}
                        </p>
                      </CardLayer>
                    </div>
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
