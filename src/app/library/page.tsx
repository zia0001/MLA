import Link from "next/link";
import { BookOpen, FileText, Landmark, Scale } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const collections = [
  {
    title: "Legal References",
    text: "Core texts and practical reference material for navigating legal questions with care.",
    icon: BookOpen,
    index: "01",
  },
  {
    title: "Practice Insights",
    text: "Guides and explanatory resources shaped around the areas in which we advise clients.",
    icon: Scale,
    index: "02",
  },
  {
    title: "Court & Procedure",
    text: "Useful material on legal process, forums, and the preparation a matter may require.",
    icon: Landmark,
    index: "03",
  },
];

export default function LibraryPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--gold)]/10 blur-[140px]" />
          <div className="absolute bottom-24 left-0 h-72 w-72 rounded-full bg-[var(--gold)]/8 blur-[120px]" />
        </div>

        <section className="shell !mx-auto w-full max-w-[76rem]">
          <div className="mb-6 sm:mb-8">
            <div className="inline-block">
              <span className="eyebrow text-[var(--gold)]">The Library</span>
              <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            </div>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.7fr)] lg:gap-16">
            <div className="max-w-[48rem]">
              <h1 className="display-lg text-ink-strong">
                Legal knowledge, gathered for <span className="gold-text">clearer decisions.</span>
              </h1>
              <p className="mt-5 max-w-[43rem] text-[0.9375rem] leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
                Our library will bring together selected books, practical guides, and legal resources
                relevant to the matters we handle. It is being thoughtfully prepared to remain useful,
                clear, and current.
              </p>
            </div>

            <div className="border-l border-[var(--gold)]/35 pl-5 sm:pl-6 lg:mb-1">
              <p className="eyebrow text-[var(--gold)]">A growing collection</p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-[0.95rem]">
                New resources will be introduced here as they are selected for the collection.
              </p>
            </div>
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-28">
          <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
            <div>
              <span className="eyebrow text-[var(--gold)]">Collection focus</span>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink-strong sm:text-4xl">
                A considered place to begin.
              </h2>
            </div>
            <span className="hidden text-[0.7rem] uppercase tracking-[0.22em] text-muted sm:block">
              MLA Advocates
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
            {collections.map(({ title, text, icon: Icon, index }) => (
              <article
                key={title}
                className="group min-w-0 rounded-xl border border-line bg-[var(--bg-elev)] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-[0_24px_60px_-32px_rgba(212,175,55,0.35)] sm:rounded-[1.5rem] sm:p-5 md:rounded-[1.75rem] md:p-7 motion-reduce:transition-none motion-reduce:hover:-translate-y-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)] text-[var(--gold)] transition-colors duration-300 group-hover:border-[var(--gold)] sm:h-10 sm:w-10 motion-reduce:transition-none">
                    <Icon className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" strokeWidth={1.35} aria-hidden />
                  </div>
                  <span className="hidden eyebrow text-[0.6rem] text-muted sm:inline">{index}</span>
                </div>
                <h3 className="mt-5 font-display text-base leading-tight text-ink-strong sm:mt-7 sm:text-2xl md:text-[1.75rem]">{title}</h3>
                <p className="mt-2 hidden text-sm leading-7 text-muted sm:block md:text-[0.95rem]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--gold)]/25 bg-[var(--bg-deep)] px-5 py-9 sm:rounded-[2rem] sm:px-8 sm:py-11 md:px-10 md:py-12">
            <div aria-hidden className="absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--gold)]/10 blur-[90px]" />
            <div className="relative grid gap-7 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/45 bg-[var(--halo)] text-[var(--gold)] sm:h-14 sm:w-14">
                <FileText size={23} strokeWidth={1.3} aria-hidden />
              </div>
              <div>
                <p className="eyebrow text-[var(--gold)]">Collection in progress</p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-ink-strong sm:text-4xl">
                  Resources will appear here soon.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  We are curating the first titles and materials for the library. For advice on a
                  specific matter in the meantime, our team is available to help.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--gold)]/55 px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--gold)] transition-colors duration-300 hover:bg-[var(--gold)] hover:text-[#07101f] sm:px-6 sm:tracking-[0.22em] motion-reduce:transition-none"
                >
                  Speak with our team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
