"use client";

import { useState } from "react";

import { PRACTICE_AREAS } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-[1rem] border border-line bg-[var(--bg-deep)]/50 px-4 py-3 text-[0.95rem] text-ink-strong outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-[var(--gold)]/60";

const LABEL = "block text-[0.7rem] uppercase tracking-[0.22em] text-muted";

/** Deliberately loose — a strict RFC pattern rejects valid addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export function ConsultForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    message: "",
    company: "", // honeypot — real people leave this empty
  });

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  function validate(): boolean {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a contact number.";
    if (form.message.trim().length < 20) {
      next.message = "Please describe your matter in at least 20 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    setServerError("");
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.5rem] border border-[var(--gold)]/30 bg-[var(--bg-elev)] p-8 text-center sm:rounded-[2rem]">
        <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-ink-strong">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-sm text-[0.9rem] leading-7 text-muted">
          Thank you. Your details have been sent to chambers and you will receive a
          response shortly.
        </p>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <div className="rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[2rem] sm:p-7">
      <div className="mb-6">
        <p className="eyebrow text-[var(--gold)]">Request a Consultation</p>
        <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
      </div>

      <div className="space-y-5">
        <div>
          <label className={LABEL} htmlFor="cf-name">
            Full Name
          </label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            disabled={busy}
            className={`mt-2 ${FIELD} ${errors.name ? "border-red-500/60" : ""}`}
          />
          {errors.name && <p className="mt-2 text-[0.8rem] text-red-400">{errors.name}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="cf-email">
              Email
            </label>
            <input
              id="cf-email"
              type="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={busy}
              className={`mt-2 ${FIELD} ${errors.email ? "border-red-500/60" : ""}`}
            />
            {errors.email && <p className="mt-2 text-[0.8rem] text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor="cf-phone">
              Phone
            </label>
            <input
              id="cf-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              placeholder="+92 300 0000000"
              autoComplete="tel"
              disabled={busy}
              className={`mt-2 ${FIELD} ${errors.phone ? "border-red-500/60" : ""}`}
            />
            {errors.phone && <p className="mt-2 text-[0.8rem] text-red-400">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-area">
            Practice Area
          </label>
          <select
            id="cf-area"
            value={form.area}
            onChange={(e) => set("area")(e.target.value)}
            disabled={busy}
            className={`mt-2 ${FIELD}`}
          >
            <option value="">Not sure / General enquiry</option>
            {PRACTICE_AREAS.map((area) => (
              <option key={area.id} value={area.title}>
                {area.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-message">
            Brief Description
          </label>
          <textarea
            id="cf-message"
            rows={5}
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder="Outline the matter you would like to discuss."
            disabled={busy}
            className={`mt-2 resize-y ${FIELD} ${errors.message ? "border-red-500/60" : ""}`}
          />
          {errors.message && (
            <p className="mt-2 text-[0.8rem] text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Honeypot: hidden from people, filled by bots. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={form.company}
          onChange={(e) => set("company")(e.target.value)}
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {serverError && (
          <p className="rounded-[1rem] border border-red-500/40 bg-red-500/5 px-4 py-3 text-[0.85rem] text-red-400">
            {serverError}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={busy}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {busy ? "Sending…" : "Send Enquiry"}
        </button>

        <p className="text-center text-[0.75rem] leading-6 text-muted/70">
          Your enquiry is confidential and used solely to respond to your matter.
        </p>
      </div>
    </div>
  );
}
