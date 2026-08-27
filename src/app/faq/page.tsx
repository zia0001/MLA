import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { FaqSearch } from "@/components/ui/FaqSearch";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FAQ_GROUPS } from "@/lib/faq";

export const metadata = {
  title: "Frequently Asked Questions — MLA Advocates",
  description:
    "Answers to common questions about fees, process, jurisdiction, and confidentiality when instructing MLA Advocates.",
};

/**
 * schema.org FAQPage markup. Google reads this to render the questions as
 * expandable rows in search results, which is most of the reason this page
 * earns its place.
 */
function faqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  // Escaping `<` keeps a stray closing tag in the copy from breaking out of the script.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
      />

      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pt-24">
        <section className="shell !mx-auto w-full max-w-[76rem]">
          <div className="mb-6 sm:mb-8">
            <div className="inline-block">
              <span className="eyebrow text-[var(--gold)]">FAQ</span>
              <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            </div>
          </div>

          <div className="max-w-[46rem]">
            <h1 className="display-lg text-ink-strong">
              Questions clients ask before instructing counsel.
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              Straight answers on fees, process, and confidentiality. If your question is
              not here, put it to us directly and we will answer it plainly.
            </p>
          </div>
        </section>

        <section className="shell !mx-auto mt-14 w-full max-w-[76rem] sm:mt-16">
          <FaqSearch groups={FAQ_GROUPS} />
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--gold)]/25 bg-[var(--bg-deep)] px-5 py-10 text-center sm:rounded-[2rem] sm:px-6 sm:py-12 md:px-10">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/12 blur-[100px]" />
            <div className="relative">
              <h2 className="font-display text-3xl leading-tight text-ink-strong sm:text-4xl">
                Still have a question?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted md:text-lg">
                Describe your matter and we will tell you plainly whether we can help.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-[1.03] sm:px-6 sm:tracking-[0.22em] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
