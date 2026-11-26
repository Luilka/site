import type { InfoCard } from "./dictionaries.type.ts";
import type { DetailKind, DetailModel, DetailRouteProps } from "./detail.type.ts";
import type { SectionProps } from "./section-props.type.ts";
import type { SectionAction } from "./dictionaries.type.ts";
import type { Href } from "@/shared/ui/links.tsx";
import type { ReactNode } from "react";

export type AboutTextProps = {
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export type AboutSectionProps = {
  id?: string;
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export type InfoCardBodyProps = {
  title: string;
  meta: string;
  description: string;
};

export type InfoCardProps = {
  title: string;
  meta: string;
  description: string;
  href?: Href;
};

export type InfoSectionProps = SectionProps & {
  items: readonly InfoCard[];
  detail?: DetailKind;
};

export type ProcessSectionProps = {
  id?: string;
};

export type HeadingTextProps = {
  title: string;
  description?: string;
};

export type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: SectionAction;
};

export type CardGridProps<T> = {
  className: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

export type CollectionSectionProps<T> = SectionProps & {
  className: string;
  gridClassName: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

export type DetailBackLinkProps = {
  detail: DetailModel;
};

export type DetailCardProps = {
  title: string;
  body: string;
};

export type DetailBodyProps = {
  detail: DetailModel;
};

export type DetailPageProps = {
  detail: DetailModel;
};

export type DetailRouteViewProps = DetailRouteProps & {
  kind: DetailKind;
};
