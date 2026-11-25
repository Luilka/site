import type { ReactNode } from "react";

import Footer from "@/components/layout/footer.tsx";
import Header from "@/components/layout/header.tsx";
import IconSprite from "@/components/layout/icon-sprite.tsx";

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
