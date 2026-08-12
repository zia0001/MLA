"use client";

import type { PracticeArea } from "@/lib/content";
import { cn } from "@/lib/utils";

export type PracticeIconName = PracticeArea["icon"];

/**
 * Hand-drawn line icons on a 32px grid. Bespoke rather than a shipped icon set
 * so the weight and geometry match the rest of the identity.
 */
const GLYPHS: Record<PracticeIconName, React.ReactNode> = {
  corporate: (
    <>
      <path d="M4 12 16 5l12 7" />
      <path d="M5.5 12h21" />
      <path d="M9 14.5v9.5M13.5 14.5v9.5M18.5 14.5v9.5M23 14.5v9.5" />
      <path d="M6 24h20M4 27.2h24" />
    </>
  ),
  litigation: (
    <>
      <g transform="rotate(-40 16 14)">
        <rect x="6" y="10" width="13" height="6.4" rx="1.4" />
        <path d="M19 13.2h8.5" />
      </g>
      <path d="M5.5 26.6h21" />
      <path d="M9 23.2h14" />
    </>
  ),
  criminal: (
    <>
      <path d="M16 4.2 26 8.4v6.8c0 6.2-4.2 10.9-10 12.6-5.8-1.7-10-6.4-10-12.6V8.4l10-4.2Z" />
      <path d="M11.6 15.6 15 19l6-6.4" />
    </>
  ),
  family: (
    <>
      <circle cx="12.4" cy="11.2" r="3.4" />
      <circle cx="21.4" cy="13.4" r="2.7" />
      <path d="M5.6 25.6c0-4 3-6.9 6.8-6.9s6.8 2.9 6.8 6.9" />
      <path d="M20.4 19.2c3.3 0 5.8 2.5 6 6.4" />
    </>
  ),
  property: (
    <>
      <path d="M4.6 15.4 16 6.2l11.4 9.2" />
      <path d="M8 14v12h16V14" />
      <path d="M13.6 26v-6.2h4.8V26" />
      <path d="M3.2 26h25.6" />
    </>
  ),
  advisory: (
    <>
      <path d="M16 10c-2.4-2-5.3-3-8.6-3H5v16.6h2.4c3.3 0 6.2 1 8.6 3" />
      <path d="M16 10c2.4-2 5.3-3 8.6-3H27v16.6h-2.4c-3.3 0-6.2 1-8.6 3" />
      <path d="M16 10v16.6" />
    </>
  ),
};

export function PracticeIcon({
  name,
  className,
}: {
  name: PracticeIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-8 w-8", className)}
    >
      {GLYPHS[name]}
    </svg>
  );
}
