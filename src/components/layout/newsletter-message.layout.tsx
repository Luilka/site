import { CircleAlert, CircleCheck } from "lucide-react";

import type { NewsletterState } from "@/shared/utils/newsletter-state.util.ts";

type NewsletterMessageProps = {
  state: NewsletterState;
};

export default function NewsletterMessage({ state }: NewsletterMessageProps) {
  if (!state.message) return null;
  const Icon = state.valid ? CircleCheck : CircleAlert;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm" role={state.valid ? "status" : "alert"}>
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />{state.message}
    </p>
  );
}
