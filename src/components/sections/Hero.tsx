"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { HeroStage } from "@/components/three/HeroStage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { useIntroReady } from "@/lib/intro";
import { SITE, STATS } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const HIDDEN = { opacity: 0, y: 24, filter: "blur(8px)" };
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();

  /** One shared curve for the staged entrance, held until the curtain lifts. */
  const rise = (delay: number) => ({
    initial: HIDDEN,
    animate: ready ? SHOWN : HIDDEN,
    transition: { duration: 1.15, delay, ease: EASE },
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The copy layer parallaxes against the 3D stage, which moves on its own.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-[36svh] pt-32 sm:pb-[32svh] lg:pb-0 lg:pt-24"
    >
      <HeroStage />

      <div className="shell relative z-10 w-full">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-2xl lg:max-w-[52%]"
        >
          <motion.div {...rise(0.12)} className="flex items-center gap-3.5">
            <span className="h-px w-10 bg-[var(--gold)]" />
            <span className="eyebrow text-[var(--gold)]">{SITE.name}</span>
          </motion.div>

          {/* Word-by-word, each word rotating up out of its own line box. */}
          <AnimatedText
            as="h1"
            mode="mount"
            play={ready}
            variant="word"
            delay={0.28}
            stagger={0.13}
            text="Justice. Integrity. Excellence."
            accent={["Excellence."]}
            className="display-xl display-3d mt-7 max-w-[13ch] uppercase text-ink-strong"
          />

          <motion.p
            {...rise(0.95)}
            className="mt-8 max-w-xl text-[1.02rem] leading-[1.85] text-muted"
          >
            {SITE.description}
          </motion.p>

          <motion.div {...rise(1.15)} className="mt-11 flex flex-wrap items-center gap-4">
            <MagneticButton href="#expertise">Explore Our Expertise</MagneticButton>
            <MagneticButton href="#consult" variant="outline">
              Contact Us
            </MagneticButton>
          </motion.div>

          {/* Quiet proof line — credibility before the visitor scrolls at all. */}
          <motion.dl
            {...rise(1.4)}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-7"
          >
            {STATS.slice(0, 3).map((stat) => (
              <div key={stat.id} className="flex items-baseline gap-2.5">
                <dt className="font-display text-xl text-[var(--gold)]">
                  {stat.value}
                  {stat.suffix}
                </dt>
                <dd className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                  {stat.label.replace("Years of ", "Years ")}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue, parked in the corner clear of both the copy and the object. */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-9 left-[clamp(1.25rem,4.5vw,4rem)] z-10 hidden lg:block"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex items-center gap-4"
        >
          <span className="relative h-px w-16 overflow-hidden bg-line">
            <span className="scroll-cue-x absolute inset-y-0 left-0 w-6 bg-gold" />
          </span>
          <span className="eyebrow text-[0.6rem] text-muted">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
