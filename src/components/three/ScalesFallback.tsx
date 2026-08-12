"use client";

import { cn } from "@/lib/utils";

/**
 * Line-art scales used when WebGL is unavailable or motion is reduced. It is a
 * deliberate, finished drawing rather than a broken-image state.
 */
export function ScalesFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid h-full w-full place-items-center", className)}>
      <div
        aria-hidden
        className="absolute h-[62%] w-[62%] rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 42%, transparent), transparent 68%)",
        }}
      />
      <svg
        viewBox="0 0 400 460"
        fill="none"
        role="img"
        aria-label="Scales of justice"
        className="relative w-[min(78%,30rem)] drop-shadow-[0_28px_50px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="mla-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--gold-deep)" />
            <stop offset="42%" stopColor="var(--gold-bright)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        <g
          stroke="url(#mla-gold)"
          strokeWidth={2.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Pedestal */}
          <path d="M140 404h120" />
          <path d="M156 404v-11h88v11" />
          <path d="M176 393c9-7 13-15 13-24h22c0 9 4 17 13 24" />
          <path d="M200 369V150" />
          <ellipse cx="200" cy="300" rx="10" ry="4" />
          {/* Beam and finial */}
          <path d="M76 150h248" />
          <circle cx="200" cy="150" r="10" />
          <path d="M200 140l9-15-9-15-9 15z" />
          {/* Left pan */}
          <path d="M76 150l-32 74M76 150l32 74" />
          <path d="M34 224h84" />
          <path d="M38 224c4 30 72 30 76 0" />
          {/* Right pan */}
          <path d="M324 150l-32 74M324 150l32 74" />
          <path d="M282 224h84" />
          <path d="M286 224c4 30 72 30 76 0" />
        </g>
      </svg>
    </div>
  );
}
