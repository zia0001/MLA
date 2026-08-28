import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal signed-token helpers for the student portal.
 *
 * There is no database behind this yet: a magic link proves the person controls
 * the address, and a signed cookie keeps them signed in afterwards. That is
 * enough for access, but it stores nothing — no roster, no progress, no record
 * of who signed in. Adding those needs a real datastore.
 */

const LINK_TTL_MS = 15 * 60 * 1000; // magic links expire quickly
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export const SESSION_COOKIE = "mla_portal";

function secret(): string {
  const value = process.env.PORTAL_AUTH_SECRET;
  if (!value || value.length < 32) {
    throw new Error("PORTAL_AUTH_SECRET is missing or shorter than 32 characters.");
  }
  return value;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

type Payload = { email: string; exp: number; kind: "link" | "session" };

function sign(payload: Payload): string {
  const body = b64url(JSON.stringify(payload));
  const mac = b64url(createHmac("sha256", secret()).update(body).digest());
  return `${body}.${mac}`;
}

function verify(token: string, kind: Payload["kind"]): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [body, mac] = parts;
  const expected = createHmac("sha256", secret()).update(body).digest();
  const given = fromB64url(mac);

  // Length check first — timingSafeEqual throws on a mismatch.
  if (given.length !== expected.length) return null;
  if (!timingSafeEqual(given, expected)) return null;

  try {
    const payload = JSON.parse(fromB64url(body).toString()) as Payload;
    if (payload.kind !== kind) return null;
    if (Date.now() > payload.exp) return null;
    return payload.email;
  } catch {
    return null;
  }
}

export function createLinkToken(email: string): string {
  return sign({ email, exp: Date.now() + LINK_TTL_MS, kind: "link" });
}

export function readLinkToken(token: string): string | null {
  return verify(token, "link");
}

export function createSessionToken(email: string): string {
  return sign({ email, exp: Date.now() + SESSION_TTL_MS, kind: "session" });
}

export function readSessionToken(token: string): string | null {
  return verify(token, "session");
}

export const SESSION_MAX_AGE = SESSION_TTL_MS / 1000;

/** Deliberately loose — a strict RFC pattern rejects valid addresses. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normaliseEmail(value: unknown): string {
  return String(value ?? "").trim().toLowerCase().slice(0, 200);
}
