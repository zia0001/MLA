"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/** Matches the palette cross-fade declared in globals.css. */
const SWITCH_MS = 700;

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme !== "light";

  const toggle = useCallback(() => {
    const root = document.documentElement;
    // Opt every nested surface into one shared transition for the swap only.
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), SWITCH_MS);
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const shell = cn(
    "relative grid h-10 w-10 place-items-center rounded-full border border-line",
    "text-ink/80 transition-colors duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)]",
    className,
  );

  // Pre-hydration the resolved theme is unknown; hold the space, draw nothing.
  if (!mounted) return <div className={shell} aria-hidden />;

  return (
    <button
      type="button"
      onClick={toggle}
      className={shell}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
