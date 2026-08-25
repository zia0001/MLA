"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Statistics } from "@/components/sections/Statistics";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

/**
 * Landing page only. Every section below is self-contained, so the About /
 * Team / Portfolio / Library / Gallery / Blogs / FAQ / Contact routes can be
 * added later without touching this composition.
 */
export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <IntroSection />
        <PracticeAreas />
        <WhyChooseUs />
        <Statistics />
        <TeamPreview />
        <FinalCTA />
      </main>

      {showBackToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)] bg-[var(--bg-elev)] text-[var(--ink-strong)] shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-105"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <Footer />
    </>
  );
}
