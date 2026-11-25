import type { NewsletterState } from "@/shared/lib/newsletter-state.ts";

type NewsletterMessageProps = {
  state: NewsletterState;
};

export default function NewsletterMessage({ state }: NewsletterMessageProps) {
  if (!state.message) return null;
  return <p className="mt-2 text-sm" role={state.valid ? "status" : "alert"}>{state.message}</p>;
}
