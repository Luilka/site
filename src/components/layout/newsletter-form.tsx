import NewsletterField from "@/components/layout/newsletter-field.tsx";
import NewsletterMessage from "@/components/layout/newsletter-message.tsx";
import NewsletterSubmit from "@/components/layout/newsletter-submit.tsx";
import { useNewsletter } from "@/shared/hooks/use-newsletter.ts";

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
