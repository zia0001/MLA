/**
 * Single source of truth for landing-page copy and navigation.
 *
 * Routes for About / Team / Portfolio / Library / Gallery / Blogs / FAQ /
 * Contact are declared here but not yet implemented — the pages land later.
 * Anything marked `ready: false` renders as a link that is visibly present but
 * flagged, so the nav does not silently 404 before those routes exist.
 */

export type NavItem = {
  label: string;
  href: string;
  ready: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", ready: true },
  { label: "About", href: "/about", ready: false },
  { label: "Team", href: "/team", ready: false },
  { label: "Portfolio", href: "/portfolio", ready: false },
  { label: "Library", href: "/library", ready: false },
  { label: "Gallery", href: "/gallery", ready: false },
  { label: "Blogs", href: "/blogs", ready: false },
  { label: "FAQ", href: "/faq", ready: false },
  { label: "Contact", href: "/contact", ready: false },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "About", href: "/about", ready: false },
  { label: "Team", href: "/team", ready: false },
  { label: "Services", href: "#expertise", ready: true },
  { label: "Portfolio", href: "/portfolio", ready: false },
  { label: "Blogs", href: "/blogs", ready: false },
  { label: "Contact", href: "/contact", ready: false },
];

export type PracticeArea = {
  id: string;
  title: string;
  description: string;
  /** Key into the icon registry in `components/ui/PracticeIcon.tsx`. */
  icon:
    | "corporate"
    | "litigation"
    | "criminal"
    | "family"
    | "property"
    | "advisory";
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "corporate",
    title: "Corporate Law",
    description:
      "Formation, governance, contracts, and commercial transactions structured to withstand scrutiny.",
    icon: "corporate",
  },
  {
    id: "litigation",
    title: "Civil Litigation",
    description:
      "Rigorous advocacy before every forum, from first pleading through final appeal.",
    icon: "litigation",
  },
  {
    id: "criminal",
    title: "Criminal Law",
    description:
      "Measured, confidential defence built on evidence, procedure, and constitutional rights.",
    icon: "criminal",
  },
  {
    id: "family",
    title: "Family Law",
    description:
      "Sensitive counsel through matrimonial, custody, and succession matters.",
    icon: "family",
  },
  {
    id: "property",
    title: "Property Law",
    description:
      "Title diligence, transfers, tenancy, and land disputes handled with precision.",
    icon: "property",
  },
  {
    id: "advisory",
    title: "Legal Consultancy",
    description:
      "Ongoing advisory retainers that keep decisions compliant and commercially sound.",
    icon: "advisory",
  },
];

export type Value = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const VALUES: Value[] = [
  {
    id: "experience",
    index: "01",
    title: "Experience",
    description:
      "Professional legal knowledge and strategic thinking, refined across a decade of contested matters.",
  },
  {
    id: "integrity",
    index: "02",
    title: "Integrity",
    description:
      "Transparent and ethical legal representation. Candid advice, even when it is not the easy answer.",
  },
  {
    id: "commitment",
    index: "03",
    title: "Commitment",
    description:
      "Focused on achieving the best possible outcome, with a partner accountable for every file.",
  },
  {
    id: "excellence",
    index: "04",
    title: "Excellence",
    description:
      "Professional service built around every client's needs, standards, and commercial reality.",
  },
];

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export const STATS: Stat[] = [
  { id: "years", value: 10, suffix: "+", label: "Years of Experience" },
  { id: "clients", value: 500, suffix: "+", label: "Clients Served" },
  { id: "cases", value: 300, suffix: "+", label: "Cases Handled" },
  { id: "satisfaction", value: 95, suffix: "%", label: "Client Satisfaction" },
];

export type Advocate = {
  id: string;
  name: string;
  position: string;
  practice: string;
  /** Two-letter monogram used by the portrait placeholder. */
  monogram: string;
};

export const TEAM_PREVIEW: Advocate[] = [
  {
    id: "principal",
    name: "M. L. Ahsan",
    position: "Founding Partner",
    practice: "Corporate & Commercial",
    monogram: "MA",
  },
  {
    id: "litigation-head",
    name: "Sara Qureshi",
    position: "Head of Litigation",
    practice: "Civil & Constitutional",
    monogram: "SQ",
  },
  {
    id: "counsel",
    name: "Daniyal Rehman",
    position: "Senior Counsel",
    practice: "Criminal Defence",
    monogram: "DR",
  },
];

export const SITE = {
  name: "MLA Advocates",
  wordmark: { lead: "MLA", trail: "Advocates" },
  tagline: "Justice. Integrity. Excellence.",
  description:
    "Providing trusted legal expertise, strategic representation, and professional guidance with integrity and excellence.",
  email: "counsel@mla-advocates.com",
  phone: "+92 300 000 0000",
  address: "Chambers 14, Justice Avenue",
} as const;
