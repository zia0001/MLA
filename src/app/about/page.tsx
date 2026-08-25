import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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

      <main id="main" className="relative overflow-hidden pb-20 pt-32">
        <section className="shell">
          <div className="mb-8">
            <span className="eyebrow text-[var(--gold)]">About Us</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="display-lg max-w-2xl text-ink-strong">
                Advocacy shaped by <span className="gold-text">integrity</span> and driven by results.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
                MLA Advocates is a legal practice built on thoughtful preparation, rigorous
                advocacy, and a steadfast commitment to the people we represent. We work
                closely with clients across commercial, civil, criminal, and family matters,
                helping them navigate complexity with direction and confidence.
              </p>
            </div>

            <div className="rounded-[2rem] border border-line bg-[var(--bg-elev)] p-6 shadow-[var(--shadow-soft)] md:p-8">
              <div className="mb-4 h-px w-16 bg-[var(--gold)]" />
              <p className="font-display text-3xl leading-tight text-ink-strong md:text-4xl">
                “We believe good legal advice is clear, honest, and resolute.”
              </p>
              <p className="mt-5 text-sm uppercase tracking-[0.22em] text-muted">
                MLA Advocates
              </p>
            </div>
          </div>
        </section>

        <section className="shell mt-20 md:mt-28">
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-line bg-[var(--bg-elev)] p-6 md:p-7"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--halo)] text-sm font-medium text-[var(--gold)]">
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

        <section className="shell mt-20 md:mt-28">
          <div className="rounded-[2rem] border border-line bg-[var(--bg-deep)] p-6 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <span className="eyebrow text-[var(--gold)]">Our Practice</span>
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
      </main>

      <Footer />
    </>
  );
}
