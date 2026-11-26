import { useActionState } from "react";
import { useContent } from "@/shared/i18n";
import { INITIAL_NEWSLETTER_STATE, newsletterState } from "@/shared/utils/newsletter-state.util.ts";
import type { NewsletterState } from "@/shared/types";

/** Validates the newsletter address with the React 19 action state. */
export function useNewsletter() {
  const copy = useContent().newsletter;
  const submit = (_previous: NewsletterState, data: FormData) =>
    newsletterState(String(data.get("email") ?? ""), copy);
  return useActionState(submit, INITIAL_NEWSLETTER_STATE);
}
