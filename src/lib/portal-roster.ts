export type Role = "student" | "intern";

/**
 * Roster comes from env vars so it can change without a code edit.
 * Format: comma-separated emails.
 */
function list(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function roleFor(email: string): Role | null {
  const normalised = email.trim().toLowerCase();

  if (list(process.env.PORTAL_INTERNS).includes(normalised)) return "intern";
  if (list(process.env.PORTAL_STUDENTS).includes(normalised)) return "student";

  return null;
}

export function isEnrolled(email: string): boolean {
  return roleFor(email) !== null;
}
