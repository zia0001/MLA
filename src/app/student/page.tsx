import { cookies } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CourseGrid } from "@/components/ui/CourseGrid";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { PortalActions } from "@/components/ui/PortalActions";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { StudentPortal } from "@/components/ui/StudentPortal";
import { SESSION_COOKIE, readSessionToken } from "@/lib/portal-auth";

export const metadata = {
  title: "Student Portal — MLA Advocates",
  description:
    "Course programme and chambers material for students and interns at MLA Advocates.",
};

export default async function StudentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value ?? "";

  let email: string | null = null;
  try {
    email = readSessionToken(token);
  } catch {
    // A missing or malformed secret means nobody is signed in; the gate shows.
    email = null;
  }

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main id="main" className="relative overflow-hidden pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pt-24">
        <section className="shell !mx-auto w-full max-w-[76rem]">
          <div className="mb-6 sm:mb-8">
            <div className="inline-block">
              <span className="eyebrow text-[var(--gold)]">Student Portal</span>
              <div className="mt-3 h-px w-10 bg-[var(--gold)]/50" />
            </div>
          </div>

          <div className="max-w-[46rem]">
            <h1 className="display-lg text-ink-strong">
              Training that starts where the textbook stops.
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              The chambers programme covers procedure, drafting, and advocacy as they are
              actually practised. Interns carry additional obligations alongside the course
              work.
            </p>
            {!email && <PortalActions linkExpired={error === "link"} />}
          </div>
        </section>

        {!email && (
          <section className="shell !mx-auto mt-14 w-full max-w-[76rem] sm:mt-16">
            <h2 className="font-display text-2xl text-ink-strong sm:text-[1.75rem]">
              Course Programme
            </h2>
            <div className="mt-3 h-px w-8 bg-[var(--gold)]/50" />
            <div className="mt-8">
              <CourseGrid />
            </div>
          </section>
        )}

        {email && (
          <section className="shell !mx-auto mt-14 w-full max-w-[76rem] sm:mt-16">
            <StudentPortal email={email} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
