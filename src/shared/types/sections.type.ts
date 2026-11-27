import type { AboutImages, FilmCopy, InfoCard, PageIntro, TeamCopy, TeamMember, ValueItem, ValuesCopy } from "./dictionaries.type.ts";
import type { DetailCover, DetailImage, DetailKind, DetailModel, DetailRouteProps } from "./detail.type.ts";
import type { SectionProps } from "./section-props.type.ts";
import type { SectionAction } from "./dictionaries.type.ts";
import type { Href } from "@/shared/ui/links.tsx";
import type { ReactNode } from "react";

export type BandProps = {
  children: ReactNode;
  className?: string;
};

export type AboutHeroProps = PageIntro & {
  image: DetailImage;
};

export type FilmSectionProps = {
  title: string;
  description: string;
  film: FilmCopy;
};

export type FilmPlayerProps = {
  title: string;
  film: FilmCopy;
};

export type FilmTranscriptProps = {
  film: FilmCopy;
};

export type MissionSectionProps = {
  title: string;
  paragraphs: readonly string[];
  images: AboutImages;
};

export type MissionDetailsProps = {
  images: AboutImages;
};

export type ValuesSectionProps = ValuesCopy;

export type ValueGridProps = {
  items: readonly ValueItem[];
};

export type TeamSectionProps = TeamCopy;

export type TeamGridProps = {
  members: readonly TeamMember[];
};

export type AboutTextProps = {
  title?: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export type AboutSectionProps = {
  id?: string;
  title?: string;
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
  title?: string;
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

export type DetailMediaProps = {
  cover: DetailCover;
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
