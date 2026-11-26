export type CardIconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
};

export type CardWatermarkProps = {
  name: string;
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
};

export type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
  shape?: string;
};

export type StepTextProps = {
  title: string;
  description: string;
};

export type StepCardProps = {
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
};
