import type { ReactNode } from "react";

import Document from "@/components/layout/document.layout.tsx";
import { useUrlLanguage } from "@/shared/i18n";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return <Document language={useUrlLanguage()}>{children}</Document>;
}
