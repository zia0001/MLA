"use client";

import { useMemo, useRef, useState } from "react";

import { FaqAccordion } from "@/components/ui/FaqAccordion";
import type { FaqGroup } from "@/lib/faq";

/**
 * Filters questions and answers as the visitor types. Groups with no surviving
 * items drop out entirely, so the page collapses toward the answer rather than
 * leaving empty headings behind.
 */
export function FaqSearch({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(term) ||
            item.answer.toLowerCase().includes(term),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const total = filtered.reduce((sum, group) => sum + group.items.length, 0);
  const searching = query.trim().length > 0;

  function jumpTo(id: string) {
    document.getElementById(`faq-group-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <div className="relative mx-auto max-w-[34rem]">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          aria-label="Search frequently asked questions"
          className="w-full rounded-full border border-line bg-[var(--bg-deep)]/50 py-3 pl-11 pr-11 text-[0.95rem] text-ink-strong outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-[var(--gold)]/60"
        />

        {searching && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="h-3.5 w-3.5"
              aria-hidden
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>

      <p aria-live="polite" className="mt-4 text-center text-[0.8rem] text-muted/70">
        {searching
          ? `${total} ${total === 1 ? "question" : "questions"} matching “${query.trim()}”`
          : "\u00A0"}
      </p>

      {/* Jump chips replace the sticky sidebar on narrow screens, where the
          group headings scroll out of view. Hidden while searching, since the
          groups on screen are already the filtered set. */}
      {!searching && (
        <nav aria-label="Jump to section" className="mt-6 lg:hidden">
          <ul className="flex flex-wrap justify-center gap-2">
            {groups.map((group) => (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(group.id)}
                  className="rounded-full border border-line px-4 py-2 text-[0.78rem] text-muted transition-colors duration-300 hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
                >
                  {group.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {total === 0 ? (
        <div className="mt-12 rounded-[1.5rem] border border-line bg-[var(--bg-elev)] px-6 py-12 text-center sm:rounded-[2rem]">
          <h3 className="font-display text-xl text-ink-strong">No matching questions</h3>
          <p className="mx-auto mt-3 max-w-sm text-[0.9rem] leading-7 text-muted">
            Try a different term, or put the question to us directly and we will answer it
            plainly.
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
          {filtered.map((group) => (
            <div
              key={group.id}
              id={`faq-group-${group.id}`}
              className="grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] lg:gap-12"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="font-display text-2xl text-ink-strong sm:text-[1.75rem]">
                  {group.title}
                </h2>
                <div className="mt-3 h-px w-8 bg-[var(--gold)]/50" />
              </div>

              <FaqAccordion items={group.items} query={query} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
