import NewsletterField from "@/components/layout/newsletter-field.layout.tsx";
import NewsletterMessage from "@/components/layout/newsletter-message.layout.tsx";
import NewsletterSubmit from "@/components/layout/newsletter-submit.layout.tsx";
import { useNewsletter } from "@/shared/hooks/use-newsletter.hook.ts";

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
