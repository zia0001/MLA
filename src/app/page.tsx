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

      <Footer />
    </>
  );
}
