import type { SectionProps } from "@/components/sections/section-props.section.ts";
import Container from "@/shared/ui/container.ui.tsx";
import { Fragment, type ReactNode } from "react";
import ActionLink from "@/components/patterns/action-link.pattern.tsx";
import type { SectionAction } from "@/shared/i18n";

type HeadingTextProps = {
  title: string;
  description?: string;
};

function HeadingText({ title, description }: HeadingTextProps) {
  return (
    <div>
      <h2 className="sec">{title}</h2>
      {description ? <p className="sec-p">{description}</p> : null}
    </div>
  );
}

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: SectionAction;
};

function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <HeadingText title={title} description={description} />
      {action ? <ActionLink action={action} className="section-action" /> : null}
    </div>
  );
}

type CardGridProps<T> = {
  className: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

function CardGrid<T>({ className, items, getKey, render }: CardGridProps<T>) {
  return (
    <div className={className}>
      {items.map((item) => <Fragment key={getKey(item)}>{render(item)}</Fragment>)}
    </div>
  );
}

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
