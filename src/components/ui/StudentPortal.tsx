"use client";

import { useState } from "react";

import { INTERN_RESOURCES, INTERN_TASKS } from "@/lib/portal";
import { CourseGrid } from "@/components/ui/CourseGrid";

type Tab = "students" | "interns";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M12 4v11" />
      <path d="M7.5 10.5L12 15l4.5-4.5" />
      <path d="M5 19h14" />
    </svg>
  );
}

function ResourceList() {
  return (
    <ul className="mt-7 grid gap-4 sm:grid-cols-2">
      {INTERN_RESOURCES.map((resource) => (
        <li key={resource.id}>
          {/* `download` asks the browser to save rather than navigate. The file
              must exist at public/resources/<file> or this 404s. */}
          <a
            href={`/resources/${resource.file}`}
            download
            className="group flex h-full flex-col rounded-[1.25rem] border border-line bg-[var(--bg-deep)]/40 p-5 transition-colors duration-500 hover:border-[var(--gold)]/45"
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-display text-lg leading-snug text-ink-strong transition-colors duration-300 group-hover:text-[var(--gold)]">
                {resource.title}
              </h4>
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-[var(--gold)]/60 group-hover:text-[var(--gold)]"
                aria-hidden
              >
                <DownloadIcon />
              </span>
            </div>

            <p className="mt-3 flex-1 text-[0.875rem] leading-7 text-muted">
              {resource.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--gold)]/80">
              {resource.size}
              <span className="h-px w-6 bg-[var(--gold)]/40" aria-hidden />
              Download
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function InternPanel() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="font-display text-2xl text-ink-strong sm:text-[1.75rem]">
          Ongoing Obligations
        </h3>
        <div className="mt-3 h-px w-8 bg-[var(--gold)]/50" />

        <ul className="mt-7 divide-y divide-line/60 border-y border-line/60">
          {INTERN_TASKS.map((task) => (
            <li
              key={task.id}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="min-w-0">
                <p className="font-display text-lg text-ink-strong">{task.title}</p>
                <p className="mt-1.5 text-[0.9rem] leading-7 text-muted">{task.detail}</p>
              </div>
              <span className="shrink-0 rounded-full border border-[var(--gold)]/30 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--gold)]">
                {task.due}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-2xl text-ink-strong sm:text-[1.75rem]">
          Chambers Material
        </h3>
        <div className="mt-3 h-px w-8 bg-[var(--gold)]/50" />
        <ResourceList />
      </div>
    </div>
  );
}

/** Posts to the sign-out route, which clears the httpOnly cookie server-side. */
async function signOut() {
  await fetch("/api/portal/signout", { method: "POST" });
  window.location.href = "/student";
}

export function StudentPortal({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>("students");

  const tabs: { id: Tab; label: string }[] = [
    { id: "students", label: "Students" },
    { id: "interns", label: "Interns" },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-[var(--gold)]">Signed in as</p>
          <p className="mt-2 break-all font-display text-xl text-ink-strong sm:text-2xl">{email}</p>
        </div>

        <button
          type="button"
          onClick={signOut}
          className="self-start rounded-full border border-line px-4 py-2 text-[0.78rem] text-muted transition-colors duration-300 hover:border-[var(--gold)]/60 hover:text-[var(--gold)] sm:self-auto"
        >
          Sign out
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Portal sections"
        className="mt-10 flex gap-2 border-b border-line/60"
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

      <div className="mt-10">
        {tab === "students" ? (
          <>
            <h3 className="font-display text-2xl text-ink-strong sm:text-[1.75rem]">
              Course Programme
            </h3>
            <div className="mt-3 h-px w-8 bg-[var(--gold)]/50" />
            <div className="mt-8">
              <CourseGrid />
            </div>
          </>
        ) : (
          <InternPanel />
        )}
      </div>
    </>
  );
}
