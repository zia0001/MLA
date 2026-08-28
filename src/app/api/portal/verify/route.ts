import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  readLinkToken,
} from "@/lib/portal-auth";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  let email: string | null = null;
  try {
    email = readLinkToken(token);
  } catch (err) {
    console.error("Portal verify failed:", err);
  }

  if (!email) {
    return NextResponse.redirect(`${origin}/student?error=link`);
  }

  const response = NextResponse.redirect(`${origin}/student`);

  response.cookies.set(SESSION_COOKIE, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
