"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/faq";

/** A user query goes straight into a RegExp, so metacharacters must be neutered. */
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Marks every occurrence of the query inside a string. Returns the plain text
 * untouched when there is no query, so the non-search path costs nothing.
 */
function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  if (!term) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-[0.2em] bg-[var(--gold)]/25 px-0.5 text-[var(--gold)]"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * One question per row. Only a single answer is open at a time within a group,
 * which keeps the column short enough to scan.
 */
export function FaqAccordion({ items, query = "" }: { items: FaqItem[]; query?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-line/60 border-y border-line/60">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              aria-controls={`faq-panel-${item.id}`}
              className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300"
            >
              <span
                className={`font-display text-[1.05rem] leading-snug transition-colors duration-300 sm:text-xl ${
                  open ? "text-[var(--gold)]" : "text-ink-strong group-hover:text-[var(--gold)]"
                }`}
              >
                <Highlight text={item.question} query={query} />
              </span>

              <span
                className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-lux)] ${
                  open
                    ? "rotate-180 border-[var(--gold)] bg-[var(--halo)]"
                    : "border-line group-hover:border-[var(--gold)]/60"
                }`}
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M6 9.5l6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              id={`faq-panel-${item.id}`}
              className={`grid transition-all duration-500 ease-[var(--ease-lux)] ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-[0.925rem] leading-[1.85] text-muted">
                  <Highlight text={item.answer} query={query} />
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
