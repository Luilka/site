import { isValidEmail } from "./validate-email.util.ts";
import type { NewsletterCopy, NewsletterState } from "@/shared/types";

export const INITIAL_NEWSLETTER_STATE: NewsletterState = { message: "", valid: false };

/** Turns a submitted address into the message the person should read. */
export function newsletterState(email: string, copy: NewsletterCopy): NewsletterState {
  const valid = isValidEmail(email);
  return { message: valid ? copy.valid : copy.invalid, valid };
}
