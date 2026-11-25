import NewsletterFallback from "@/components/layout/footer/newsletter-fallback.tsx";
import NewsletterForm from "@/components/layout/newsletter-form.tsx";
import NewsletterIntro from "@/components/layout/footer/newsletter-intro.tsx";

export default function FooterNewsletter() {
  return (
    <div className="news">
      <NewsletterIntro />
      <NewsletterForm />
      <NewsletterFallback />
    </div>
  );
}
