import { useActionState, useId } from "react";
import { ArrowUpRight } from "lucide-react";

import Button from "@/components/ui/button.tsx";
import Input from "@/components/ui/input.tsx";
import { useContent } from "@/i18n";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterState = {
  message: string;
  valid: boolean;
};

const INITIAL_STATE: NewsletterState = { message: "", valid: false };

export default function NewsletterForm() {
  const id = useId();
  const content = useContent();

  function validateAddress(_previous: NewsletterState, formData: FormData): NewsletterState {
    const email = String(formData.get("email") ?? "").trim();
    if (!EMAIL.test(email)) {
      return { message: content.newsletter.invalid, valid: false };
    }
    return { message: content.newsletter.valid, valid: true };
  }

  const [state, submit, pending] = useActionState(validateAddress, INITIAL_STATE);

  return (
    <div>
      <form action={submit} noValidate>
        <label htmlFor={id} className="sr-only">
          {content.footer.emailLabel}
        </label>
        <Input id={id} name="email" type="email" placeholder="pixi@domaine.com" autoComplete="email" />
        <Button type="submit" disabled={pending} className="h-8!">
          {content.footer.subscribe}
          <ArrowUpRight size={9} strokeWidth={2} aria-hidden="true" />
        </Button>
      </form>
      {state.message ? (
        <p role={state.valid ? "status" : "alert"} className="news-message">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
