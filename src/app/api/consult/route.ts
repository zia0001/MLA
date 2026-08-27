import { NextResponse } from "next/server";

import { SITE } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strip angle brackets so submitted text cannot inject markup into the email. */
function clean(value: unknown, max = 4000): string {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a filled `company` field means a bot. Return 200 so it learns nothing.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const area = clean(body.area, 120) || "General enquiry";
  const message = clean(body.message);

  if (name.length < 2 || !EMAIL_RE.test(email) || phone.length < 7 || message.length < 20) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONSULT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("Consultation email is not configured: missing RESEND_API_KEY or CONSULT_FROM_EMAIL.");
    return NextResponse.json(
      { error: "The enquiry service is unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Practice area: ${area}`,
    "",
    "Message:",
    message,
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
        to: [SITE.email],
        reply_to: email,
        subject: `Consultation enquiry — ${name} (${area})`,
        text: lines,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the message:", res.status, detail);
      return NextResponse.json(
        { error: "We could not send your enquiry. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Consultation email failed:", err);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please email us directly." },
      { status: 500 },
    );
  }
}
