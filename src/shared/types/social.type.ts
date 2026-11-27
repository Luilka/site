export type SocialNetwork = "linkedin" | "tiktok" | "youtube";

export type SocialProfile = {
  network: SocialNetwork;
  href: string;
};

export type SocialLink = SocialProfile & {
  label: string;
};

export type SocialIconProps = {
  network: SocialNetwork;
  className?: string;
};
