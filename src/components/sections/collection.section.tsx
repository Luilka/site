import type { ReactNode } from "react";

import CardGrid from "@/components/sections/card-grid.section.tsx";
import SectionHeading from "@/components/sections/heading.section.tsx";
import type { SectionProps } from "@/components/sections/section-props.section.ts";
import Container from "@/shared/ui/container.ui.tsx";

type CollectionSectionProps<T> = SectionProps & {
  className: string;
  gridClassName: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

export default function CollectionSection<T>({ id, className, gridClassName, items, getKey, render, ...heading }: CollectionSectionProps<T>) {
  return (
    <section className={className} id={id}>
      <Container>
        <SectionHeading {...heading} />
        <CardGrid className={gridClassName} items={items} getKey={getKey} render={render} />
      </Container>
    </section>
  );
}
