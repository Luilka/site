import type { ReactNode } from "react";

import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import { useContent, type PageKey } from "@/shared/i18n";

type PageFrameProps = {
  page: PageKey;
  children: ReactNode;
};

export default function PageFrame({ page, children }: PageFrameProps) {
  const intro = useContent().pages[page];
  return (
    <>
      <PageHero {...intro} />
      {children}
      <ContactPanel />
    </>
  );
}
