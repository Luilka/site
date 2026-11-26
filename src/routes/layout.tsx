import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useUrlLanguage } from "@/shared/i18n";
import { Footer, Header, IconSprite } from "@/components/layout.tsx";
import type { DocumentProps, RootLayoutProps } from "@/shared/types";

const INTER = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

function FontLinks() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={INTER} rel="stylesheet" />
    </>
  );
}

function DocumentHead() {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Luilka | Design agency</title>
      <FontLinks />
    </head>
  );
}

function DocumentBody({ children }: { children: ReactNode }) {
  return (
    <body>
      <IconSprite />
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
