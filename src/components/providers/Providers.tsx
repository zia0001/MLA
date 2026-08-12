"use client";

import { ThemeProvider } from "next-themes";

import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="mla-theme"
      // Transitions are wanted here: the palette cross-fades on theme change.
      disableTransitionOnChange={false}
    >
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
