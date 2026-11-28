import type { CaptionedImage, DetailCover, DetailImage } from "./detail.type.ts";
import type { DetailFact, DetailSection } from "./content.type.ts";
import type { TeamMember, ValueItem } from "./dictionaries.type.ts";

export type CardIconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
};

export type ValueCardProps = ValueItem & {
  index: number;
};

export type ValueIconProps = {
  index: number;
  featured: boolean;
};

export type ValueTextProps = ValueItem & {
  featured: boolean;
};

export type TeamCardProps = TeamMember;

export type TeamPortraitProps = {
  name: string;
  github?: string;
};

export type TeamProfileLinkProps = {
  name: string;
  github: string;
};

export type TeamNameProps = {
  name: string;
  role: string;
};

export type TeamLabelProps = {
  name: string;
  role: string;
  github?: string;
};

export type CardCoverProps = {
  image: DetailImage;
  name: string;
};

export type ProductInfoProps = {
  name: string;
  description: string;
};

export type ProductTitleProps = {
  name: string;
};

export type ProductHeaderProps = {
  name: string;
};

export type ProductCardProps = {
  slug: string;
  name: string;
  description: string;
  image: DetailImage;
};

export type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
};

export type StepTextProps = {
  title: string;
  description: string;
};

export type StepCardProps = {
  index?: number;
  number: string;
  title: string;
  description: string;
};

export type WorkWhoProps = {
  name: string;
  kind: string;
};

export type WorkInfoProps = {
  name: string;
  kind: string;
  caseLabel: string;
};

export type WorkCardProps = {
  slug: string;
  name: string;
  kind?: string;
  caseLabel?: string;
  image: DetailImage;
};

export type ParagraphsProps = {
  items: readonly string[];
};

export type PointsProps = {
  items: readonly string[];
};

export type StoryTextProps = {
  section: DetailSection;
};

export type StoryCardProps = {
  section: DetailSection;
  index: number;
};

export type GalleryCardProps = {
  image: CaptionedImage;
  pair: boolean;
};

export type FactPillProps = {
  fact: DetailFact;
};

export type FactPillsProps = {
  facts: readonly DetailFact[];
};

export type DetailPosterProps = {
  cover: DetailCover;
  facts: readonly DetailFact[];
};
