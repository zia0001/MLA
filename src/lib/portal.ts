/**
 * PLACEHOLDER data for the /student route.
 *
 * None of this is real. It exists so the portal UI can be reviewed before any
 * decision is taken on authentication, storage, or where course records
 * actually live. Replace wholesale once that is settled.
 */

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Foundation" | "Intermediate" | "Advanced";
};

export type InternTask = {
  id: string;
  title: string;
  detail: string;
  due: string;
};

/**
 * Each `file` must exist at `public/resources/<file>` or the download 404s.
 * The firm supplies these documents — nothing here is drafted by the site.
 */
export type Resource = {
  id: string;
  title: string;
  description: string;
  file: string;
  size: string;
};

export const COURSES: Course[] = [
  {
    id: "civil-procedure",
    title: "Civil Procedure",
    description:
      "Pleadings, limitation, interim relief, and the mechanics of a suit from institution to decree.",
    duration: "6 weeks",
    level: "Foundation",
  },
  {
    id: "contract-drafting",
    title: "Contract Drafting",
    description:
      "Structuring commercial agreements that survive scrutiny — clauses, warranties, and dispute mechanisms.",
    duration: "4 weeks",
    level: "Intermediate",
  },
  {
    id: "criminal-advocacy",
    title: "Criminal Advocacy",
    description:
      "Bail applications, examination-in-chief, cross-examination, and the constitutional safeguards that frame them.",
    duration: "8 weeks",
    level: "Advanced",
  },
  {
    id: "legal-research",
    title: "Legal Research & Writing",
    description:
      "Locating authority, reading judgments critically, and producing opinions a partner can rely on.",
    duration: "3 weeks",
    level: "Foundation",
  },
  {
    id: "property-title",
    title: "Property & Title Diligence",
    description:
      "Chain of title, encumbrance checks, mutation records, and the questions that catch defective transfers.",
    duration: "5 weeks",
    level: "Intermediate",
  },
  {
    id: "corporate-governance",
    title: "Corporate Governance",
    description:
      "Company formation, board procedure, statutory filings, and the compliance calendar.",
    duration: "6 weeks",
    level: "Advanced",
  },
];

export const INTERN_TASKS: InternTask[] = [
  {
    id: "case-notes",
    title: "Weekly case notes",
    detail: "Summarise two reported judgments and circulate to your supervising counsel.",
    due: "Every Friday",
  },
  {
    id: "court-attendance",
    title: "Court attendance log",
    detail: "Record hearings attended, the forum, and the point of procedure observed.",
    due: "Rolling",
  },
  {
    id: "drafting-exercise",
    title: "Drafting exercise",
    detail: "Prepare a plaint or written statement from the file provided, for review.",
    due: "Fortnightly",
  },
];

export const INTERN_RESOURCES: Resource[] = [
  {
    id: "style-guide",
    title: "Chambers Style Guide",
    description: "Drafting conventions, citation format, and house standards for written work.",
    file: "chambers-style-guide.pdf",
    size: "PDF",
  },
  {
    id: "conduct",
    title: "Court Conduct & Dress",
    description: "Expectations for appearance, address, and bearing before each forum.",
    file: "court-conduct.pdf",
    size: "PDF",
  },
  {
    id: "filing-checklist",
    title: "Filing Checklist",
    description: "Documents, annexures, and fees required by forum, with common omissions flagged.",
    file: "filing-checklist.pdf",
    size: "PDF",
  },
  {
    id: "confidentiality",
    title: "Confidentiality Undertaking",
    description: "To be read, signed, and returned before access to any client file.",
    file: "confidentiality-undertaking.pdf",
    size: "PDF",
  },
];
