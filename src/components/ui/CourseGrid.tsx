import { COURSES } from "@/lib/portal";

const LEVEL_TONE: Record<string, string> = {
  Foundation: "border-[var(--gold)]/30 text-[var(--gold)]",
  Intermediate: "border-[var(--gold)]/45 text-[var(--gold)]",
  Advanced: "border-[var(--gold)]/70 text-[var(--gold)]",
};

export function CourseGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {COURSES.map((course) => (
        <article
          key={course.id}
          className="group min-w-0 rounded-[1.5rem] border border-line bg-[var(--bg-elev)] p-6 transition-colors duration-500 hover:border-[var(--gold)]/40 sm:rounded-[1.75rem]"
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] ${
                LEVEL_TONE[course.level]
              }`}
            >
              {course.level}
            </span>
            <span className="text-[0.75rem] text-muted">{course.duration}</span>
          </div>

          <h3 className="mt-5 font-display text-xl text-ink-strong transition-colors duration-300 group-hover:text-[var(--gold)] sm:text-2xl">
            {course.title}
          </h3>
          <p className="mt-3 text-[0.9rem] leading-7 text-muted">{course.description}</p>
        </article>
      ))}
    </div>
  );
}