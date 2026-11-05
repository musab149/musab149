import { z } from "zod";

/** Shared contact schema — used by the client form and the API route. */

export const enquiryTypes = [
  "AI project",
  "Software product",
  "Partnership",
  "Investment",
  "Media & speaking",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .max(200, "Please use a shorter email address.")
    .pipe(z.email("Please enter a valid work email, like name@company.com.")),
  company: z.string().trim().max(120, "Please keep the company name under 120 characters.").optional(),
  type: z.enum(enquiryTypes, { error: "Please choose what your enquiry is about." }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Extra fields sent with the request for spam protection. */
export const contactRequestSchema = contactSchema.extend({
  /** Honeypot — must stay empty. */
  website: z.string().optional(),
  /** Epoch ms when the form was first rendered. */
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().optional(),
});

/** Minimum time a human needs to fill the form (ms). */
export const MIN_SUBMIT_MS = 3000;

export function fieldErrors(error: z.ZodError) {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
