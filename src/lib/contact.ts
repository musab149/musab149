import "server-only";
import { Resend } from "resend";
import type { ContactInput } from "./validation";

/**
 * Contact delivery (server only). Keys never reach the client.
 * Required: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * Optional: TURNSTILE_SECRET_KEY, UPSTASH_REDIS_REST_URL/TOKEN.
 */

export function isContactConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

export const turnstileEnabled = () =>
  Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

/* ── Rate limiting ───────────────────────────────────────────────────────── */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
// Best-effort fallback: on serverless each instance has its own memory, so this
// only limits bursts that hit the same warm instance. Configure Upstash for a real limit.
const memory = new Map<string, number[]>();

export async function rateLimit(key: string): Promise<{ ok: boolean }> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const [{ Ratelimit }, { Redis }] = await Promise.all([import("@upstash/ratelimit"), import("@upstash/redis")]);
    const limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
      prefix: "contact",
    });
    const res = await limiter.limit(key);
    return { ok: res.success };
  }
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) {
    memory.set(key, hits);
    return { ok: false };
  }
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) memory.clear();
  return { ok: true };
}

/* ── Turnstile ───────────────────────────────────────────────────────────── */

export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!turnstileEnabled()) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token, remoteip: ip });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/* ── Delivery ────────────────────────────────────────────────────────────── */

export async function sendEnquiry(input: ContactInput): Promise<{ ok: true; id: string } | { ok: false }> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "—"}`,
    `Enquiry type: ${input.type}`,
    "",
    input.message,
  ];
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
      replyTo: input.email,
      subject: `New enquiry (${input.type}) from ${input.name}`,
      text: lines.join("\n"),
    });
    if (error || !data?.id) return { ok: false };
    return { ok: true, id: data.id };
  } catch {
    return { ok: false };
  }
}
