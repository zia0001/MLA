import { NextResponse } from "next/server";

import { EMAIL_RE, createLinkToken, normaliseEmail } from "@/lib/portal-auth";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = normaliseEmail(body.email);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONSULT_FROM_EMAIL;
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  if (!apiKey || !from) {
    console.error("Portal sign-in is not configured: missing RESEND_API_KEY or CONSULT_FROM_EMAIL.");
    return NextResponse.json(
      { error: "Sign-in is unavailable at the moment. Please contact chambers." },
      { status: 503 },
    );
  }

  let link: string;
  try {
    link = `${origin}/api/portal/verify?token=${encodeURIComponent(createLinkToken(email))}`;
  } catch (err) {
    console.error("Portal sign-in secret is not configured:", err);
    return NextResponse.json(
      { error: "Sign-in is unavailable at the moment. Please contact chambers." },
      { status: 503 },
    );
  }

  const text = [
    "You asked to sign in to the MLA Advocates student portal.",
    "",
    "Open this link to continue:",
    link,
    "",
    "The link expires in 15 minutes and can only be used from this message.",
    "If you did not request it, ignore this email — no action is taken.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Your sign-in link — MLA Advocates portal",
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the sign-in link:", res.status, detail);
      return NextResponse.json(
        { error: "We could not send the link. Please contact chambers." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Portal sign-in email failed:", err);
    return NextResponse.json(
      { error: "We could not send the link. Please contact chambers." },
      { status: 500 },
    );
  }
}
