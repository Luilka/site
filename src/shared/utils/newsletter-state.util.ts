import { isValidEmail } from "./validate-email.util.ts";

export type NewsletterState = {
  message: string;
  valid: boolean;
};

export type NewsletterCopy = {
  invalid: string;
  valid: string;
};

export const INITIAL_NEWSLETTER_STATE: NewsletterState = { message: "", valid: false };

/** Turns a submitted address into the message the person should read. */
export function newsletterState(email: string, copy: NewsletterCopy): NewsletterState {
  const valid = isValidEmail(email);
  return { message: valid ? copy.valid : copy.invalid, valid };
}
