"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import {
  contactSchema,
  enquiryTypes,
  fieldErrors,
  type ContactField,
} from "@/lib/validation";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error" | "not_configured" | "rate_limited";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; callback: (t: string) => void; "expired-callback"?: () => void; theme?: string }) => string;
      reset: (id?: string) => void;
    };
  }
}

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Contact form (brief §9): shared Zod validation, inline errors with
 * aria-describedby, honeypot + minimum time-to-submit, optional Turnstile.
 * Success is only shown when the API confirms the provider accepted the message.
 */
export function ContactForm({ email, configured }: { email?: string; configured: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [startedAt] = useState(() => Date.now());
  const [token, setToken] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Cloudflare Turnstile (only when a site key is configured)
  useEffect(() => {
    if (!TURNSTILE_KEY || !turnstileRef.current) return;
    const el = turnstileRef.current;
    const render = () => {
      if (window.turnstile && !widgetId.current) {
        widgetId.current = window.turnstile.render(el, {
          sitekey: TURNSTILE_KEY,
          callback: setToken,
          "expired-callback": () => setToken(undefined),
          theme: "light",
        });
      }
    };
    if (window.turnstile) return render();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactSchema.safeParse({
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      type: data.type || undefined,
      message: data.message,
    });
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = (Object.keys(errs) as ContactField[])[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: data.website ?? "", startedAt, turnstileToken: token }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: typeof errors };
      if (res.ok && body.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503) {
        setStatus("not_configured");
      } else if (res.status === 429) {
        setStatus("rate_limited");
      } else if (res.status === 400 && body.fields) {
        setErrors(body.fields);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
        setToken(undefined);
      }
    }
  }

  useEffect(() => {
    if (status !== "idle" && status !== "submitting") statusRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] border border-line bg-card p-8 outline-none xl:p-12">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
          <Check aria-hidden="true" className="size-5" />
        </span>
        <h2 className="mt-8 text-h3 text-fg">Thank you. Your message is on its way.</h2>
        <p className="mt-3 max-w-[48ch] text-muted">It has been delivered to my inbox. I&apos;ll reply to the email address you gave.</p>
        <button type="button" onClick={() => setStatus("idle")} className="link-draw mt-8 font-semibold text-fg">
          <span className="link-text">Send another message</span>
        </button>
      </div>
    );
  }

  const field = (name: ContactField) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });

  const inputCls = (name: ContactField) =>
    cn(
      "mt-2 block w-full rounded-[6px] border bg-paper px-4 py-3.5 text-base text-ink placeholder:text-slate-strong/70 transition-colors",
      "focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
      errors[name] ? "border-[#B42318]" : "border-line-strong hover:border-ink/40",
    );

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={!configured ? "form-config" : undefined} className="flex flex-col gap-6">
      {!configured && process.env.NODE_ENV === "development" && (
        <p id="form-config" className="flex items-start gap-3 rounded-[6px] border border-dashed border-[#B54708] bg-[#FFFAEB] px-4 py-3 text-sm text-[#7A2E0E]">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            <strong>Form requires configuration.</strong> Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL
            (see .env.example). Until then the API returns 503. This banner only shows in development.
          </span>
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="text-sm font-semibold text-fg">
            Name
          </label>
          <input type="text" autoComplete="name" className={inputCls("name")} {...field("name")} />
          <FieldError name="name" error={errors.name} />
        </div>
        <div>
          <label htmlFor="f-email" className="text-sm font-semibold text-fg">
            Work email
          </label>
          <input type="email" autoComplete="email" inputMode="email" className={inputCls("email")} {...field("email")} />
          <FieldError name="email" error={errors.email} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="f-company" className="text-sm font-semibold text-fg">
            Company <span className="font-normal text-muted">(optional)</span>
          </label>
          <input type="text" autoComplete="organization" className={inputCls("company")} {...field("company")} />
          <FieldError name="company" error={errors.company} />
        </div>
        <div>
          <label htmlFor="f-type" className="text-sm font-semibold text-fg">
            Enquiry type
          </label>
          <select defaultValue="" className={cn(inputCls("type"), "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2317191D' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} {...field("type")}>
            <option value="" disabled>
              Choose one…
            </option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError name="type" error={errors.type} />
        </div>
      </div>

      <div>
        <label htmlFor="f-message" className="text-sm font-semibold text-fg">
          Message
        </label>
        <textarea rows={7} className={cn(inputCls("message"), "resize-y")} placeholder="What are you building, and where could I help?" {...field("message")} />
        <FieldError name="message" error={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {TURNSTILE_KEY && <div ref={turnstileRef} className="min-h-[65px]" />}

      {(status === "error" || status === "not_configured" || status === "rate_limited") && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="flex items-start gap-3 rounded-[6px] border border-[#B42318]/40 bg-[#FEF3F2] px-4 py-3 text-sm text-[#7A271A] outline-none">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>
            {status === "not_configured" && (
              <>
                The form isn&apos;t connected yet. Please email me directly
                {email ? (
                  <>
                    {" "}
                    at{" "}
                    <a className="font-semibold underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </>
                ) : null}
                .
              </>
            )}
            {status === "rate_limited" && "You've sent a few messages in a short time. Please wait a few minutes and try again."}
            {status === "error" && (
              <>
                Something went wrong and your message was not sent. Please try again
                {email ? (
                  <>
                    {" "}
                    or email{" "}
                    <a className="font-semibold underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </>
                ) : null}
                .
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          I only use your details to reply. See the{" "}
          <a href="/privacy" className="link-inline text-fg">
            privacy notice
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-disabled={status === "submitting"}
          className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight aria-hidden="true" className="btn-arrow size-4" />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your message…" : ""}
      </p>
    </form>
  );
}

function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`f-${name}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#B42318]">
      <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0" />
      {error}
    </p>
  );
}
