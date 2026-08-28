"use client";

import { useEffect, useState } from "react";

import { PortalSignIn } from "@/components/ui/PortalSignIn";

type Tab = "signin" | "apply";

export function PortalModal({
  open,
  initialTab = "signin",
  linkExpired = false,
  onClose,
}: {
  open: boolean;
  initialTab?: Tab;
  linkExpired?: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  // Close on Escape, and stop the page scrolling behind the modal.
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "signin", label: "Sign in" },
    { id: "apply", label: "Apply" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Portal access"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[32rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-2 right-0 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-[var(--bg-elev)] text-muted transition-colors duration-300 hover:border-[var(--gold)]/60 hover:text-[var(--gold)] sm:-right-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div
          role="tablist"
          aria-label="Portal access"
          className="mb-4 flex gap-2 border-b border-line/60"
        >
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={`relative px-5 py-3 text-[0.85rem] tracking-[0.04em] transition-colors duration-300 ${
                  active ? "text-[var(--gold)]" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-px left-0 h-px w-full origin-left bg-[var(--gold)] transition-transform duration-500 ease-[var(--ease-lux)] ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        {tab === "signin" ? (
          <PortalSignIn linkExpired={linkExpired} />
        ) : (
          <div className="mx-auto max-w-[30rem] rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-6 sm:rounded-[2rem] sm:p-8">
            <p className="eyebrow text-[var(--gold)]">Programme Application</p>
            <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            <h2 className="mt-6 font-display text-2xl text-ink-strong">Apply</h2>
            <p className="mt-3 text-[0.9rem] leading-7 text-muted">
              Applications open shortly. Approved applicants receive a student or intern
              identifier and portal access by email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}