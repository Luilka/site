import { useContent } from "@/shared/i18n";
import Container from "@/shared/ui/container.ui.tsx";
import BrandMark from "@/components/layout/brand-mark.layout.tsx";
import type { FooterLink } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";
import NewsletterForm from "@/components/layout/newsletter-form.layout.tsx";
import { Mail } from "lucide-react";
import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";

function SocialIcons() {
  const { quote } = useContent();
  return (
    <div className="soc">
      <a href={CONTACT_MAILTO} aria-label={quote}>
        <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}

function NewsletterNoScriptForm() {
  const { footer } = useContent();
  return (
    <form action="/" method="post" encType="text/plain">
      <label htmlFor="newsletter-fallback" className="sr-only">{footer.emailLabel}</label>
      <input id="newsletter-fallback" name="email" type="email" required />
      <button type="submit" className="cursor-pointer">{footer.subscribe}</button>
    </form>
  );
}

function NewsletterIntro() {
  const { footer } = useContent();
  return (
    <>
      <h4>{footer.newsletterTitle}</h4>
      <p>{footer.newsletterText}</p>
    </>
  );
}

function NewsletterFallback() {
  return (
    <noscript>
      <NewsletterNoScriptForm />
    </noscript>
  );
}

function FooterNewsletter() {
  return (
    <div className="news">
      <NewsletterIntro />
      <NewsletterForm />
      <NewsletterFallback />
    </div>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly FooterLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="fcol">
      <h4>{title}</h4>
      {links.map((link) => <AppLink key={link.label} href={link.href}>{link.label}</AppLink>)}
    </div>
  );
}

function FooterColumns() {
  const { footer } = useContent();
  return (
    <>
      <FooterColumn title={footer.linksTitle} links={footer.links} />
      <FooterColumn title={footer.moreTitle} links={footer.more} />
    </>
  );
}

function FooterBrand() {
  const { footer } = useContent();
  return (
    <div className="about-f">
      <BrandMark />
      <p>{footer.description}</p>
      <SocialIcons />
    </div>
  );
}

function FooterCells() {
  return (
    <>
      <FooterBrand />
      <FooterColumns />
      <FooterNewsletter />
    </>
  );
}

function FooterMain() {
  return (
    <footer>
      <Container className="foot">
        <FooterCells />
      </Container>
    </footer>
  );
}

function FooterCopyright() {
  const { footer } = useContent();
  return (
    <div className="copy">
      <Container>{footer.copyright}</Container>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <FooterMain />
      <FooterCopyright />
    </>
  );
}
