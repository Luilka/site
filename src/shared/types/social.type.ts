export type SocialNetwork = "linkedin" | "tiktok" | "youtube";

export type BrandIcon = SocialNetwork | "github";

export type SocialProfile = {
  network: SocialNetwork;
  href: string;
};

export type SocialLink = SocialProfile & {
  label: string;
};

export type SocialIconProps = {
  network: BrandIcon;
  className?: string;
};
