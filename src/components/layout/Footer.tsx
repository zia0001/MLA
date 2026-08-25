import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { FOOTER_LINKS, SITE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/** lucide v1 dropped brand marks, so the LinkedIn glyph is drawn here. */
function LinkedinIcon({
  size = 15,
  strokeWidth = 1.4,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V17" />
      <path d="M8 7.4v.1" />
      <path d="M12.2 17v-3.7a2.6 2.6 0 0 1 5.2 0V17" />
    </svg>
  );
}

const CONTACT = [
  { icon: Mail, value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { icon: LinkedinIcon, value: SITE.linkedinName, href: SITE.linkedin },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    glyph: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
        <path d="M8 10.5V17" />
        <path d="M8 7.4v.1" />
        <path d="M12.2 17v-3.7a2.6 2.6 0 0 1 5.2 0V17" />
      </>
    ),
  },
  {
    label: "X",
    href: "#",
    glyph: (
      <>
        <path d="M5.5 5.5l13 13" />
        <path d="M18.5 5.5l-13 13" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    glyph: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.9" />
        <path d="M16.9 7.1v.1" />
      </>
    ),
  },
];

/** Only real web links leave the site; mailto and tel must stay in the tab. */
const isExternal = (href: string) => href.startsWith("http");

/** Shared gold rule that sweeps in from the left on hover. */
function Underline() {
  return (
    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-500 ease-[var(--ease-lux)] group-hover:scale-x-100" />
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full blur-[130px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal>
            <Link
              href="/"
              className="flex items-baseline gap-2 font-display text-lg uppercase tracking-[0.26em] text-ink-strong"
            >
              <span className="gold-text font-semibold">{SITE.wordmark.lead}</span>
              <span className="text-[0.78rem] tracking-[0.4em] text-muted">
                {SITE.wordmark.trail}
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[0.9rem] leading-[1.85] text-muted">
              A practice built on preparation, candour, and results — representing
              clients across corporate, civil, criminal, and family matters.
            </p>

            <ul className="mt-8 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    target={isExternal(social.href) ? "_blank" : undefined}
                    rel={isExternal(social.href) ? "noopener noreferrer" : undefined}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-500 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-[1.05rem] w-[1.05rem]"
                      aria-hidden
                    >
                      {social.glyph}
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="eyebrow text-muted">Quick Links</h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  {link.ready ? (
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-[0.9rem] text-muted transition-colors duration-400 hover:text-ink"
                    >
                      <span className="relative">
                        {link.label}
                        <Underline />
                      </span>
                    </Link>
                  ) : (
                    <span
                      className="inline-flex cursor-default items-center gap-2 text-[0.9rem] text-muted/70"
                      title="Coming soon"
                    >
                      {link.label}
                      <span className="h-1 w-1 rounded-full bg-[var(--gold)]/60" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <h3 className="eyebrow text-muted">Contact</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {CONTACT.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3 text-[0.9rem] text-muted">
                  <Icon
                    size={15}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-[var(--gold)]"
                  />
                  <Link
                    href={href}
                    target={isExternal(href) ? "_blank" : undefined}
                    rel={isExternal(href) ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center transition-colors duration-400 hover:text-ink"
                  >
                    <span className="relative">
                      {value}
                      <Underline />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="hairline mt-16" />

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-[0.72rem] tracking-[0.06em] text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em]">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}