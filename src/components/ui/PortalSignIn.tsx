"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Requests a magic link. Nothing is stored client-side — the session arrives as
 * an httpOnly cookie once the link in the email is opened.
 */
export function PortalSignIn({ linkExpired = false }: { linkExpired?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const busy = status === "sending";

  async function submit() {
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/portal/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-[30rem] rounded-[1.5rem] border border-[var(--gold)]/30 bg-[var(--bg-elev)] p-8 text-center sm:rounded-[2rem]">
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
            <rect x="3" y="5.5" width="18" height="13" rx="2" />
            <path d="M3.5 7l8.5 6 8.5-6" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-ink-strong">Check your inbox</h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.9rem] leading-7 text-muted">
          A sign-in link has been sent to {email.trim()}. It expires in 15 minutes.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setEmail("");
          }}
          className="mt-6 rounded-full border border-line px-4 py-2 text-[0.78rem] text-muted transition-colors duration-300 hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
        >
          Use a different address
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[30rem] rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-6 sm:rounded-[2rem] sm:p-8">
      <p className="eyebrow text-[var(--gold)]">Portal Access</p>
      <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />

      <h2 className="mt-6 font-display text-2xl text-ink-strong">Sign in</h2>
      <p className="mt-3 text-[0.9rem] leading-7 text-muted">
        Enter your email and we will send you a sign-in link. No password required.
      </p>

      {linkExpired && (
        <p className="mt-5 rounded-[1rem] border border-red-500/40 bg-red-500/5 px-4 py-3 text-[0.85rem] leading-6 text-red-400">
          That link has expired or is invalid. Request a new one below.
        </p>
      )}

      <label
        className="mt-6 block text-[0.7rem] uppercase tracking-[0.22em] text-muted"
        htmlFor="portal-email"
      >
        Email Address
      </label>
      <input
        id="portal-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        onKeyDown={(e) => e.key === "Enter" && !busy && submit()}
        placeholder="you@example.com"
        autoComplete="email"
        disabled={busy}
        className={`mt-2 w-full rounded-[1rem] border bg-[var(--bg-deep)]/50 px-4 py-3 text-[0.95rem] text-ink-strong outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-[var(--gold)]/60 disabled:opacity-60 ${
          error ? "border-red-500/60" : "border-line"
        }`}
      />
      {error && <p className="mt-2 text-[0.8rem] text-red-400">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={busy}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--gold)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {busy ? "Sending…" : "Send sign-in link"}
      </button>
    </div>
  );
}
