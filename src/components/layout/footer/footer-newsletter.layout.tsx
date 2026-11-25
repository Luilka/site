import NewsletterFallback from "@/components/layout/footer/newsletter-fallback.layout.tsx";
import NewsletterForm from "@/components/layout/newsletter-form.layout.tsx";
import NewsletterIntro from "@/components/layout/footer/newsletter-intro.layout.tsx";

export default function FooterNewsletter() {
  return (
    <div className="news">
      <NewsletterIntro />
      <NewsletterForm />
      <NewsletterFallback />
    </div>
  );
}
