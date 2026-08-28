import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/lib/portal-auth";

export async function POST(request: Request) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const response = NextResponse.redirect(`${origin}/student`, { status: 303 });

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
