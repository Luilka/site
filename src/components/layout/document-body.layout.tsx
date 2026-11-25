import type { ReactNode } from "react";

import Footer from "@/components/layout/footer.layout.tsx";
import Header from "@/components/layout/header.layout.tsx";
import IconSprite from "@/components/layout/icon-sprite.layout.tsx";

type DocumentBodyProps = {
  children: ReactNode;
};

export default function DocumentBody({ children }: DocumentBodyProps) {
  return (
    <body>
      <IconSprite />
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
