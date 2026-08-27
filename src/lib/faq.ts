/**
 * FAQ copy for the /faq route.
 *
 * IMPORTANT — the answers below are DRAFTS written from general practice.
 * Every one marked with TODO states something about this firm's fees, timings,
 * or coverage and MUST be confirmed by the principal before this page ships.
 * Publishing an unverified answer here is a statement the firm is bound by.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "fees",
    title: "Fees & Costs",
    items: [
      {
        id: "fee-structure",
        question: "How are your fees structured?",
        answer:
          "TODO — confirm with the firm. Fees are typically arranged as an hourly rate, a fixed fee for defined work, or a retainer for ongoing advisory matters. The structure is agreed in writing before work begins, so there are no surprises.",
      },
      {
        id: "first-consultation",
        question: "Is the first consultation free?",
        answer:
          "TODO — confirm with the firm. The initial discussion is intended to understand your matter and explain the options available to you.",
      },
      {
        id: "payment",
        question: "When is payment due?",
        answer:
          "TODO — confirm with the firm. Payment terms are set out in the engagement letter at the outset of the matter.",
      },
    ],
  },
  {
    id: "process",
    title: "Working With Us",
    items: [
      {
        id: "after-enquiry",
        question: "What happens after I make an enquiry?",
        answer:
          "Your enquiry is reviewed by the chambers and, where the matter falls within our practice, we arrange an initial consultation to discuss the facts, the options open to you, and the likely course of action.",
      },
      {
        id: "response-time",
        question: "How long until someone responds?",
        answer:
          "TODO — confirm the firm's actual commitment before publishing a timeframe.",
      },
      {
        id: "first-meeting",
        question: "What should I bring to a first meeting?",
        answer:
          "Bring any documents relevant to the matter — contracts, notices, court papers, correspondence, identification, and a short written timeline of events if you have one. Incomplete papers are not a reason to delay; bring what you have.",
      },
      {
        id: "duration",
        question: "How long do matters typically take?",
        answer:
          "This varies considerably. An advisory opinion may take days, while contested litigation depends on court schedules and the conduct of the opposing party. We give a realistic estimate once we have reviewed the facts, and update it as the matter develops.",
      },
    ],
  },
  {
    id: "scope",
    title: "Practice & Jurisdiction",
    items: [
      {
        id: "areas",
        question: "Which practice areas do you handle?",
        answer:
          "Corporate law, civil litigation, criminal law, family law, property law, and ongoing legal consultancy. If your matter falls outside these areas, we will say so and, where possible, point you toward appropriate counsel.",
      },
      {
        id: "courts",
        question: "Which courts and forums do you appear in?",
        answer:
          "TODO — confirm the specific courts, tribunals, and jurisdictions before publishing.",
      },
      {
        id: "outside-city",
        question: "Do you take matters outside your city?",
        answer:
          "TODO — confirm the firm's geographic coverage.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    items: [
      {
        id: "private",
        question: "Is what I tell you private?",
        answer:
          "Communications with counsel are treated as confidential. This applies from the first consultation, and it is what allows you to describe your situation fully and receive advice based on the complete picture rather than a partial one.",
      },
      {
        id: "not-hiring",
        question: "What if I decide not to instruct you?",
        answer:
          "Confidentiality is not conditional on engaging us. Anything discussed during an initial consultation remains confidential whether or not you proceed.",
      },
    ],
  },
  {
    id: "practical",
    title: "Practical Matters",
    items: [
      {
        id: "online",
        question: "Are consultations available online?",
        answer:
          "TODO — confirm whether remote consultations are offered and by which platform.",
      },
      {
        id: "hours",
        question: "What are your office hours?",
        answer: "TODO — confirm the chambers' working hours and days.",
      },
      {
        id: "languages",
        question: "Do you work in Urdu and English?",
        answer:
          "TODO — confirm the languages in which the firm advises and drafts.",
      },
    ],
  },
];
