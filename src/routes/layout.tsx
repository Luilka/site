import type { ReactNode } from "react";

import FeedbackBoundary from "@/components/patterns/feedback-boundary.tsx";
import IconSprite from "@/components/patterns/icon-sprite.tsx";
import SiteFooter from "@/components/patterns/site-footer.tsx";
import SiteHeader from "@/components/patterns/site-header.tsx";
import { useTransition } from "@/components/ui/link.tsx";
import { useUrlLanguage } from "@/i18n";
import Loading from "./loading.tsx";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const language = useUrlLanguage();

  return (
    <html lang={language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Luilka</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <IconSprite />
        <SiteHeader />
        <main>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
