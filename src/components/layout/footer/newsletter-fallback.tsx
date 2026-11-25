import NewsletterNoScriptForm from "@/components/layout/footer/newsletter-no-script-form.tsx";

export default function NewsletterFallback() {
  return (
    <noscript>
      <NewsletterNoScriptForm />
    </noscript>
  );
}
