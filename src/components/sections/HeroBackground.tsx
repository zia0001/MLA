"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Four quiet layers — ground gradient, two halos, light rays, a hairline grid —
 * each drifting at its own rate so the hero has depth without visible busyness.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const haloY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const raysY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ opacity: fade }}
      className="grain pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Ground */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(118% 82% at 50% -8%, var(--bg-elev) 0%, var(--bg) 46%, var(--bg-deep) 100%)",
        }}
      />

      {/* Gold key halo, behind the 3D object */}
      <motion.div
        style={{
          y: haloY,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 26%, transparent), transparent 66%)",
        }}
        className="absolute -top-[18%] right-[-10%] h-[52rem] w-[52rem] rounded-full blur-[120px] opacity-70"
      />

      {/* Cool counter-halo, low left */}
      <motion.div
        style={{
          y: gridY,
          background:
            "radial-gradient(circle, color-mix(in oklab, #3f60c8 20%, transparent), transparent 68%)",
        }}
        className="absolute bottom-[-24%] left-[-14%] h-[44rem] w-[44rem] rounded-full blur-[130px] opacity-45 dark:opacity-60"
      />

      {/* Light rays */}
      <motion.div
        style={{ y: raysY }}
        className="absolute -top-1/4 left-[6%] h-[150%] w-[70%] origin-top -rotate-[16deg] opacity-[0.5]"
      >
        {[
          { left: "4%", width: "5.5rem", delay: "0s", opacity: 0.5 },
          { left: "26%", width: "2.5rem", delay: "-6s", opacity: 0.32 },
          { left: "48%", width: "8rem", delay: "-11s", opacity: 0.26 },
          { left: "72%", width: "3.5rem", delay: "-3s", opacity: 0.4 },
        ].map((ray, i) => (
          <span
            key={i}
            className="absolute top-0 h-full ray"
            style={{
              left: ray.left,
              width: ray.width,
              opacity: ray.opacity,
              animationDelay: ray.delay,
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--gold-bright) 30%, transparent), transparent 62%)",
              filter: "blur(22px)",
            }}
          />
        ))}
      </motion.div>

      {/* Hairline grid with a single travelling highlight */}
      <motion.div style={{ y: gridY }} className="absolute inset-0">
        {[16, 33, 50, 67, 84].map((left) => (
          <span
            key={left}
            className="absolute top-0 h-full w-px"
            style={{
              left: `${left}%`,
              background:
                "linear-gradient(to bottom, transparent, var(--line) 22%, var(--line) 62%, transparent)",
              opacity: 0.55,
            }}
          />
        ))}
        <span
          className="sweep absolute top-0 h-full w-px"
          style={{
            left: "50%",
            background:
              "linear-gradient(to bottom, transparent, var(--gold), transparent)",
          }}
        />
      </motion.div>

      {/* Horizon: hands the eye down into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />
    </motion.div>
  );
}
