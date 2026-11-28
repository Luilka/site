import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useUrlLanguage } from "@/shared/i18n";
import { usePageMeta } from "@/shared/hooks/use-page-meta.hook.ts";
import { Footer, Header } from "@/components/layout.tsx";
import type { DocumentProps, MetaLinksProps, MetaTagsProps, RootLayoutProps, StructuredDataProps } from "@/shared/types";

const INTER = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
const SPACE = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&display=swap";

function FontLinks() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={INTER} rel="stylesheet" />
      <link href={SPACE} rel="stylesheet" />
    </>
  );
}

function MetaTags({ meta }: MetaTagsProps) {
  return <><title>{meta.title}</title>{meta.tags.map((tag) => <meta key={tag.name ?? tag.property} name={tag.name} property={tag.property} content={tag.content} />)}</>;
}

function MetaLinks({ links }: MetaLinksProps) {
  return <>{links.map((link) => <link key={`${link.rel}${link.hrefLang ?? ""}`} rel={link.rel} hrefLang={link.hrefLang} href={link.href} />)}</>;
}

function StructuredData({ json }: StructuredDataProps) {
  return json ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} /> : null;
}

function PageHead() {
  const meta = usePageMeta();
  return (
    <>
      <MetaTags meta={meta} />
      <MetaLinks links={meta.links} />
      <StructuredData json={meta.jsonLd} />
    </>
  );
}

function BasicMeta() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}

function IconLinks() {
  return (
    <>
      <link rel="icon" href="/luilka.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </>
  );
}

function DocumentHead() {
  return (
    <head>
      <BasicMeta />
      <IconLinks />
      <PageHead />
      <FontLinks />
    </head>
  );
}

function DocumentBody({ children }: { children: ReactNode }) {
  return (
    <body>
      <Header />
      <main><MotionConfig reducedMotion="user">{children}</MotionConfig></main>
      <Footer />
    </body>
  );
}

function Document({ language, children }: DocumentProps) {
  return (
    <html lang={language}>
      <DocumentHead />
      <DocumentBody>{children}</DocumentBody>
    </html>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <Document language={useUrlLanguage()}>{children}</Document>;
}
