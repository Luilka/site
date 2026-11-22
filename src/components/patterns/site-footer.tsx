import { AtSign, Globe, MessageCircle } from "lucide-react";

import BrandMark from "@/components/patterns/brand-mark.tsx";
import NewsletterForm from "@/components/patterns/newsletter-form.tsx";
import Container from "@/components/ui/container.tsx";
import AppLink from "@/components/ui/link.tsx";
import { useContent } from "@/content/useContent.ts";

export default function SiteFooter() {
  const content = useContent();

  return (
    <>
      <footer>
        <Container className="foot">
          <div className="about-f">
            <BrandMark />
            <p>{content.footer.description}</p>
            <div className="soc" aria-hidden="true">
              <Globe size={14} strokeWidth={1.5} />
              <MessageCircle size={14} strokeWidth={1.5} />
              <AtSign size={14} strokeWidth={1.5} />
            </div>
          </div>
          <div className="fcol">
            <h4>{content.footer.linksTitle}</h4>
            {content.footer.links.map((link) => (
              <AppLink key={link.label} href={link.href}>
                {link.label}
              </AppLink>
            ))}
          </div>
          <div className="fcol">
            <h4>{content.footer.moreTitle}</h4>
            {content.footer.more.map((link) => (
              <AppLink key={link.label} href={link.href}>
                {link.label}
              </AppLink>
            ))}
          </div>
          <div className="news">
            <h4>{content.footer.newsletterTitle}</h4>
            <p>{content.footer.newsletterText}</p>
            <NewsletterForm />
            <noscript>
              <form action="mailto:bonjour@luilka.cd" method="post" encType="text/plain">
                <label htmlFor="newsletter-fallback" className="sr-only">
                  {content.footer.emailLabel}
                </label>
                <input id="newsletter-fallback" name="email" type="email" required />
                <button type="submit" className="cursor-pointer">
                  {content.footer.subscribe}
                </button>
              </form>
            </noscript>
          </div>
        </Container>
      </footer>
      <div className="copy">
        <Container>{content.footer.copyright}</Container>
      </div>
    </>
  );
}
