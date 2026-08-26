import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const contactDetails = [
  {
    title: "Email",
    value: "oopsy32@gmail.com",
    href: "mailto:oopsy32@gmail.com",
  },
  {
    title: "Phone",
    value: "+923343400292",
    href: "tel:+923343400292",
  },
  {
    title: "LinkedIn",
    value: "Mohsin (Abbasi) Ali",
    href: "https://www.linkedin.com/in/mohsin-ali-abbasi-05017b211/",
  },
];

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pt-24">
        <section className="shell !mx-auto w-full max-w-[76rem]">
          <div className="mb-6 sm:mb-8">
            <div className="inline-block">
              <span className="eyebrow text-[var(--gold)]">Contact</span>
              <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            </div>
          </div>

          <div className="grid items-center gap-6 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-16">
            <div className="w-full max-w-[46rem] lg:justify-self-start">
              <h1 className="display-lg max-w-full text-ink-strong">
                Let’s discuss your matter with clarity and confidence.
              </h1>

              <p className="mt-5 max-w-full text-[0.9375rem] leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
                MLA Advocates provides practical, dependable legal guidance across civil,
                criminal, family, labour, services, and arbitration matters. If you need prompt
                counsel, a clear legal opinion, or representation in a contested matter, we are
                ready to listen and advise.
              </p>
            </div>

            <div className="w-full rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-4 sm:rounded-[2rem] sm:p-6 md:max-w-[28rem] lg:justify-self-end">
              <div className="mb-4">
                <p className="eyebrow text-[var(--gold)]">Consultation</p>
              </div>

              <div className="space-y-3">
                {contactDetails.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block rounded-[1.25rem] border border-line bg-[var(--bg-deep)]/50 p-2.5 transition-colors duration-300 hover:border-[var(--gold)]/40 sm:p-3"
                  >
                    <div className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                      {item.title}
                    </div>
                    <div className="mt-1.5 break-words font-display text-lg leading-tight text-ink-strong sm:mt-2 sm:text-2xl">{item.value}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-12 md:mt-14 lg:mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="min-w-0 rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[1.75rem] sm:p-6 md:p-7">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)] text-sm font-medium text-[var(--gold)]">
                01
              </div>
              <h2 className="break-words font-display text-2xl text-ink-strong sm:text-3xl">Legal Advice</h2>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Honest, practical guidance built around your facts, risks, and objectives.
              </p>
            </article>

            <article className="min-w-0 rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[1.75rem] sm:p-6 md:p-7">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)] text-sm font-medium text-[var(--gold)]">
                02
              </div>
              <h2 className="break-words font-display text-2xl text-ink-strong sm:text-3xl">Representation</h2>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Firm advocacy before courts, tribunals, and administrative forums when it matters most.
              </p>
            </article>

            <article className="min-w-0 rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[1.75rem] sm:p-6 md:p-7">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)] text-sm font-medium text-[var(--gold)]">
                03
              </div>
              <h2 className="break-words font-display text-2xl text-ink-strong sm:text-3xl">Follow Through</h2>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                We stay engaged through strategy, negotiation, hearing, and final resolution.
              </p>
            </article>
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--gold)]/25 bg-[var(--bg-deep)] px-5 py-10 text-center sm:rounded-[2rem] sm:px-6 sm:py-12 md:px-10">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/12 blur-[100px]" />
            <div className="relative">
              <h2 className="font-display text-3xl leading-tight text-ink-strong sm:text-4xl">
                Discuss your case with us.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted md:text-lg">
                Strategic, practical legal guidance for complex disputes and consequential decisions.
              </p>
              <Link
                href="mailto:oopsy32@gmail.com"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-[1.03] sm:px-6 sm:tracking-[0.22em] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
