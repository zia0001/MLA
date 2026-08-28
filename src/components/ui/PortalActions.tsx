"use client";

import { useState } from "react";

import { PortalModal } from "@/components/ui/PortalModal";

export function PortalActions({ linkExpired = false }: { linkExpired?: boolean }) {
  const [open, setOpen] = useState(linkExpired);
  const [tab, setTab] = useState<"signin" | "apply">("signin");

  function show(next: "signin" | "apply") {
    setTab(next);
    setOpen(true);
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => show("apply")}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={() => show("signin")}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
        >
          Sign in
        </button>
      </div>

      <PortalModal
        open={open}
        initialTab={tab}
        linkExpired={linkExpired}
        onClose={() => setOpen(false)}
      />
    </>
  );
}