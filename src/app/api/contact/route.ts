import { NextResponse } from "next/server";
import { contactRequestSchema, fieldErrors, MIN_SUBMIT_MS } from "@/lib/validation";
import { isContactConfigured, rateLimit, sendEnquiry, verifyTurnstile } from "@/lib/contact";

/**
 * POST /api/contact
 * 200 { ok: true }                      — Resend accepted the message
 * 400 { error: "invalid", fields }      — validation failed
 * 400 { error: "rejected" }             — spam checks failed
 * 429 { error: "rate_limited" }
 * 503 { error: "not_configured" }       — env vars missing
 * 502 { error: "delivery_failed" }      — provider did not accept the message
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = contactRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid", fields: fieldErrors(parsed.error) }, { status: 400 });
  }
  const { website, startedAt, turnstileToken, ...input } = parsed.data;

  // Spam: honeypot + minimum time-to-submit
  if (website || Date.now() - startedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ error: "rejected" }, { status: 400 });
  }

  if (!isContactConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const limit = await rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: "rejected" }, { status: 400 });
  }

  const sent = await sendEnquiry(input);
  if (!sent.ok) {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
