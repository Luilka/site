import type { HTMLAttributes } from "react";

import Container from "@/shared/ui/container.tsx";

export default function StatePanel({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className="state-panel" {...props}>
      <Container>{children}</Container>
    </section>
  );
}
