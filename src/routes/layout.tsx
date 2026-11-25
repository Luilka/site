import type { ReactNode } from "react";

import DocumentBody from "@/components/layout/document-body.tsx";
import DocumentHead from "@/components/layout/document-head.tsx";
import { useUrlLanguage } from "@/shared/i18n";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const language = useUrlLanguage();
  return (
    <html lang={language}>
      <DocumentHead />
      <DocumentBody>{children}</DocumentBody>
    </html>
  );
}
