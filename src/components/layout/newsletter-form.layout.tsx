import { useNewsletter } from "@/shared/hooks/use-newsletter.hook.ts";
import { useId } from "react";
import { useContent } from "@/shared/i18n";
import Input from "@/shared/ui/input.ui.tsx";
import { CircleAlert, CircleCheck, ArrowUpRight } from "lucide-react";
import type { NewsletterState } from "@/shared/utils/newsletter-state.util.ts";
import Button from "@/shared/ui/button.ui.tsx";

type NewsletterSubmitProps = {
  pending: boolean;
};

function NewsletterSubmit({ pending }: NewsletterSubmitProps) {
  const { footer } = useContent();
  return (
    <Button type="submit" disabled={pending}>
      {footer.subscribe}
      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
    </Button>
  );
}

type NewsletterMessageProps = {
  state: NewsletterState;
};

function NewsletterMessage({ state }: NewsletterMessageProps) {
  if (!state.message) return null;
  const Icon = state.valid ? CircleCheck : CircleAlert;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm" role={state.valid ? "status" : "alert"}>
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />{state.message}
    </p>
  );
}

function NewsletterField() {
  const id = useId();
  const { footer } = useContent();
  return (
    <>
      <label htmlFor={id} className="sr-only">{footer.emailLabel}</label>
      <Input id={id} name="email" type="email" placeholder="pixi@domaine.com" autoComplete="email" />
    </>
  );
}

export default function NewsletterForm() {
  const [state, submit, pending] = useNewsletter();
  return (
    <form action={submit} noValidate>
      <NewsletterField />
      <NewsletterSubmit pending={pending} />
      <NewsletterMessage state={state} />
    </form>
  );
}
