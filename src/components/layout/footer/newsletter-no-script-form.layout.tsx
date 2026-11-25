import { useContent } from "@/shared/i18n";

export default function NewsletterNoScriptForm() {
  const { footer } = useContent();
  return (
    <form action="/" method="post" encType="text/plain">
      <label htmlFor="newsletter-fallback" className="sr-only">{footer.emailLabel}</label>
      <input id="newsletter-fallback" name="email" type="email" required />
      <button type="submit" className="cursor-pointer">{footer.subscribe}</button>
    </form>
  );
}
