import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const principles = [
  {
    title: "Preparation",
    text: "We build each case around facts, law, and risk — leaving no critical issue unexamined.",
  },
  {
    title: "Courage",
    text: "We advocate firmly, with clarity and conviction, when the stakes are high and the pressure is real.",
  },
  {
    title: "Trust",
    text: "Clients come to us for honest guidance, steady counsel, and consistent communication from start to finish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--gold)]/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[var(--gold)]/8 blur-[120px]" />
        </div>

        <section className="shell !mx-auto w-full max-w-[76rem]">
          <div className="mb-6 sm:mb-8">
            <div className="inline-block">
              <span className="eyebrow text-[var(--gold)]">About Us</span>
              <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            </div>
          </div>

          <div className="grid items-center gap-6 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-20">
            <div className="w-full max-w-[46rem] lg:justify-self-start">
              <h1 className="display-lg max-w-full text-ink-strong">
                Advocacy shaped by <span className="gold-text">integrity</span> and driven by results.
              </h1>

              <p className="mt-5 max-w-full text-[0.9375rem] leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
                Led by Mohsin Ali Abbasi, Advocate High Court, MLA Advocates is a legal
                practice built on more than 12 years of courtroom experience and 500+ cases
                across civil, criminal, family, labour, services, and arbitration matters. We
                work closely with clients, helping them navigate complexity with direction and
                confidence — backed by thoughtful preparation, rigorous advocacy, and a
                steadfast commitment to the people we represent.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-[22rem] items-start gap-3 sm:max-w-[18rem] sm:flex-col sm:gap-0 lg:block lg:max-w-[17rem] xl:max-w-[19rem] lg:justify-self-end lg:translate-x-1">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-[var(--gold)]/12 blur-3xl" />
              <div className="relative w-28 shrink-0 overflow-hidden rounded-[1.5rem] bg-[var(--bg-elev)] p-0 shadow-[0_28px_70px_-36px_rgba(0,0,0,0.9)] sm:w-full sm:rounded-[2rem]">
                <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-[var(--gold)]/0" />
                <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 rounded-tl-[0.8rem] border-l border-t border-[var(--gold)]/0" />
                <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 rounded-br-[0.8rem] border-b border-r border-[var(--gold)]/0" />
                <div className="group overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/personal-image.jpg"
                    alt="Mohsin Ali Abbasi, Advocate High Court, MLA Advocates"
                    className="block aspect-square h-auto w-full object-cover object-[50%_10%] transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-105 sm:aspect-[4/5] sm:object-[50%_12%] md:object-center will-change-transform motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
              </div>

              <div className="relative flex-1 pb-1 pt-1 sm:px-2 sm:pb-2 sm:pt-3 lg:pb-2 lg:pt-3">
                <div className="mb-2 h-px w-10 bg-[var(--gold)] sm:mb-3 sm:w-16" />
                <p className="font-display text-base leading-tight text-ink-strong sm:text-2xl md:text-3xl xl:text-4xl">
                  “We believe good legal advice is clear, honest, and resolute.”
                </p>
                <p className="mt-2 text-[0.55rem] uppercase tracking-[0.16em] text-muted sm:mt-4 sm:text-sm sm:tracking-[0.22em]">
                  MLA Advocates
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="shell !mx-auto mt-28 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="grid grid-cols-1 border-y border-[var(--gold)]/15 divide-y divide-[var(--gold)]/15 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0">
            <div className="px-2 py-8 text-center first:pl-0 last:pr-0 md:px-8">
              <div className="font-display text-4xl text-[var(--gold)] md:text-5xl">12+</div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                Years in Practice
              </div>
            </div>
            <div className="px-2 py-8 text-center first:pl-0 last:pr-0 md:px-8">
              <div className="font-display text-4xl text-[var(--gold)] md:text-5xl">500+</div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                Cases Handled
              </div>
            </div>
            <div className="px-2 py-8 text-center first:pl-0 last:pr-0 md:px-8">
              <div className="font-display text-4xl text-[var(--gold)] md:text-5xl">3</div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                Institutional Panels
              </div>
            </div>
            <div className="px-2 py-8 text-center first:pl-0 last:pr-0 md:px-8">
              <div className="font-display text-4xl text-[var(--gold)] md:text-5xl">6</div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                Practice Areas
              </div>
            </div>
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="group rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40 hover:shadow-[0_24px_60px_-32px_rgba(212,175,55,0.35)] sm:rounded-[1.75rem] sm:p-6 motion-reduce:transition-none motion-reduce:hover:-translate-y-0"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)] text-sm font-medium text-[var(--gold)] transition-colors duration-300 group-hover:border-[var(--gold)] motion-reduce:transition-none">
                  {item.title.slice(0, 1)}
                </div>
                <h2 className="font-display text-3xl text-ink-strong">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="rounded-[1.5rem] border border-line bg-[var(--bg-deep)] p-5 sm:rounded-[2rem] sm:p-6 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:text-right">
                <span className="eyebrow text-[var(--gold)]">Our Practice</span>
                <div className="mt-3 h-px w-10 bg-[var(--gold)]/50 lg:ml-auto" />
              </div>

              <div className="space-y-5 text-base leading-8 text-muted md:text-lg">
                <p>
                  Our team combines legal knowledge with practical judgment. We advise clients
                  on risk, strategy, and next steps, always with an eye toward the long-term
                  consequences of each decision.
                </p>
                <p>
                  Whether representing individuals, families, or businesses, we approach every
                  matter with discretion, responsiveness, and diligence. The aim is simple: to
                  protect interests, resolve disputes effectively, and provide counsel clients can
                  trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="mb-8">
            <div className="inline-block">
              <span className="eyebrow text-[var(--gold)]">Institutional Trust</span>
              <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            </div>
          </div>

          <div className="mb-8 max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-ink-strong sm:text-4xl">
              Panel Advocate for national institutions.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted md:text-lg">
              Alongside private practice, we are entrusted with panel advocacy for government and
              institutional bodies — a mark of consistency, reliability, and standing in
              institutional litigation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[1.75rem] sm:p-6 md:p-7">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--bg-deep)]">
                <span className="h-3.5 w-3.5 rotate-45 border border-[var(--gold)]/70" />
              </div>
              <h3 className="font-display text-2xl text-ink-strong">National Highway Authority (NHA)</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Serving as Panel Advocate on litigation involving the country&apos;s highway network.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[1.75rem] sm:p-6 md:p-7">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--bg-deep)]">
                <span className="h-3.5 w-3.5 rotate-45 border border-[var(--gold)]/70" />
              </div>
              <h3 className="font-display text-2xl text-ink-strong">Pakistan Housing Authority (PHA)</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Representing PHA in matters connected to housing development and administration.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-5 sm:rounded-[1.75rem] sm:p-6 md:p-7">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--bg-deep)]">
                <span className="h-3.5 w-3.5 rotate-45 border border-[var(--gold)]/70" />
              </div>
              <h3 className="font-display text-2xl text-ink-strong">Candidate Testing Services (CTS)</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Acting as Panel Advocate on CTS&apos;s institutional legal matters.
              </p>
            </article>
          </div>
        </section>

        <section className="shell !mx-auto mt-20 w-full max-w-[76rem] sm:mt-24 md:mt-32">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="border-l-2 border-l-[var(--gold)]/40 bg-[var(--bg-elev)]/60 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-l-[var(--gold)] motion-reduce:transition-none">
              <h3 className="font-display text-2xl text-ink-strong">Civil</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Property disputes, contracts, recovery suits, and other civil litigation matters.
              </p>
            </article>
            <article className="border-l-2 border-l-[var(--gold)]/40 bg-[var(--bg-elev)]/60 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-l-[var(--gold)] motion-reduce:transition-none">
              <h3 className="font-display text-2xl text-ink-strong">Criminal</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Defense and prosecution across criminal trials and appeals.
              </p>
            </article>
            <article className="border-l-2 border-l-[var(--gold)]/40 bg-[var(--bg-elev)]/60 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-l-[var(--gold)] motion-reduce:transition-none">
              <h3 className="font-display text-2xl text-ink-strong">Family</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Custody, guardianship, maintenance, and other family court matters.
              </p>
            </article>
            <article className="border-l-2 border-l-[var(--gold)]/40 bg-[var(--bg-elev)]/60 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-l-[var(--gold)] motion-reduce:transition-none">
              <h3 className="font-display text-2xl text-ink-strong">Labour</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Employment disputes, termination cases, and labour tribunal representation.
              </p>
            </article>
            <article className="border-l-2 border-l-[var(--gold)]/40 bg-[var(--bg-elev)]/60 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-l-[var(--gold)] motion-reduce:transition-none">
              <h3 className="font-display text-2xl text-ink-strong">Services</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Service matters involving government and institutional employees.
              </p>
            </article>
            <article className="border-l-2 border-l-[var(--gold)]/40 bg-[var(--bg-elev)]/60 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-l-[var(--gold)] motion-reduce:transition-none">
              <h3 className="font-display text-2xl text-ink-strong">Arbitration</h3>
              <p className="mt-3 text-sm leading-7 text-muted md:text-[0.95rem]">
                Dispute resolution outside the courtroom through arbitration proceedings.
              </p>
            </article>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
