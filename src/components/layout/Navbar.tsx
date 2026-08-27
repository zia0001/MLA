"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";

import { NAV_ITEMS, SITE, type NavItem } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
// import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-baseline gap-2 font-display text-[1.0625rem] uppercase tracking-[0.26em] text-ink-strong"
      aria-label={`${SITE.name} — home`}
    >
      <span className="gold-text font-semibold">{SITE.wordmark.lead}</span>
      <span className="text-[0.78rem] tracking-[0.4em] text-muted transition-colors duration-500 group-hover:text-ink">
        {SITE.wordmark.trail}
      </span>
    </Link>
  );
}

/**
 * Routes that do not exist yet stay visible but inert — a link that 404s would
 * be worse than one that plainly says it is not open.
 */
function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const label = (
    <span className="relative inline-block">
      {item.label}
      <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-500 ease-[var(--ease-lux)] group-hover:scale-x-100" />
    </span>
  );

  const base =
    "group relative px-1 py-1 text-[0.8125rem] tracking-[0.02em] text-muted transition-colors duration-400 hover:text-ink";

  if (!item.ready) {
    return (
      <span className={cn(base, "cursor-default")} aria-disabled title="Coming soon">
        {label}
        <span className="pointer-events-none absolute -right-2 -top-1 h-1 w-1 rounded-full bg-[var(--gold)]/70" />
      </span>
    );
  }

  return (
    <Link href={item.href} onClick={onNavigate} className={base}>
      {label}
    </Link>
  );
}

function Hamburger({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const bar = "absolute left-1/2 h-px w-5 -translate-x-1/2 bg-current";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors duration-500 hover:border-[var(--gold)] lg:hidden"
    >
      <motion.span
        className={bar}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
        transition={{ duration: 0.42, ease: EASE }}
      />
      <motion.span
        className={bar}
        animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.28 }}
      />
      <motion.span
        className={bar}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
        transition={{ duration: 0.42, ease: EASE }}
      />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const portalTarget = typeof window === "undefined" ? null : document.body;
  const lenis = useLenis();

  const toggleMobileMenu = () => {
    if (open) {
      setOpen(false);
      return;
    }

    window.requestAnimationFrame(() => setOpen(true));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page behind the mobile overlay, including Lenis' own loop.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const mobileMenu = open ? (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-0 z-[120] bg-[var(--bg-deep)]/97 backdrop-blur-2xl lg:hidden"
      style={{ pointerEvents: "auto" }}
    >
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 26%, transparent), transparent 70%)",
        }}
      />
      <div className="shell flex h-full flex-col justify-center pb-16 pt-24">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.06 * i + 0.1, ease: EASE }}
              className="border-b border-line/60"
            >
              {item.ready ? (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-display text-2xl text-ink-strong touch-manipulation"
                >
                  {item.label}
                  <span className="eyebrow text-[0.6rem] text-[var(--gold)]">0{i + 1}</span>
                </Link>
              ) : (
                <span className="flex items-baseline justify-between py-4 font-display text-2xl text-muted">
                  {item.label}
                  <span className="eyebrow text-[0.6rem] text-muted/70">soon</span>
                </span>
              )}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.66, ease: EASE }}
          className="mt-10"
        >
          <MagneticButton href="/contact" onClick={() => setOpen(false)}>
            Book a Consultation
          </MagneticButton>
        </motion.div>
      </div>
    </motion.div>
  ) : null;

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter,padding] duration-700 ease-[var(--ease-lux)]",
          scrolled
            ? "border-b border-[var(--glass-line)] bg-[var(--glass)] py-2.5 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <nav className="shell flex items-center justify-between gap-6">
          <Wordmark />

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <MagneticButton
              href="/contact"
              className="hidden md:inline-flex"
              strength={0.22}
            >
              Consultation
            </MagneticButton>
            <Hamburger open={open} onToggle={toggleMobileMenu} />
          </div>
        </nav>
      </motion.header>

      {open && portalTarget ? createPortal(mobileMenu, portalTarget) : mobileMenu}
    </>
  );
}
