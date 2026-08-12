import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { SITE } from "@/lib/content";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mla-advocates.com"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "advocates",
    "law firm",
    "legal counsel",
    "corporate law",
    "civil litigation",
    "criminal defence",
    "family law",
    "property law",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04060c" },
    { media: "(prefers-color-scheme: light)", color: "#f8f6f0" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // next-themes writes the theme class here before paint, hence the warning suppression.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-[var(--gold)] focus:px-5 focus:py-2.5 focus:text-[0.7rem] focus:uppercase focus:tracking-[0.2em] focus:text-[#07101f]"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
