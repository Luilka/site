import type { DetailImage } from "./detail.type.ts";
import type { PageHref } from "./site.type.ts";
import type { SocialNetwork } from "./social.type.ts";
export type MenuKey = "services" | "products";

export type NavigationItem = {
  label: string;
  href: PageHref;
  menu?: MenuKey;
};

export type SectionAction = {
  label: string;
  href: PageHref;
};

export type HomeCopy = {
  prefix: string;
  design: string;
  middle: string;
  brand: string;
};

export type SectionTitles = {
  services: string;
  products: string;
  works: string;
};

export type SectionDescriptions = {
  services: string;
  products: string;
  works: string;
};

export type PageKey = "about" | "services" | "products" | "works" | "blog" | "job" | "contact";

export type PageIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type BreadcrumbCopy = {
  label: string;
  home: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  github?: string;
};

export type AboutImages = {
  hero: DetailImage;
  mission: DetailImage;
  detailA: DetailImage;
  detailB: DetailImage;
};

export type ValuesCopy = {
  title: string;
  description: string;
  items: readonly ValueItem[];
};

export type TeamCopy = {
  title: string;
  description: string;
  members: readonly TeamMember[];
};

export type AboutPageCopy = {
  mission: string;
  profileLabel: string;
  values: ValuesCopy;
  team: TeamCopy;
  images: AboutImages;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  shape?: string;
};

export type NamedCard = {
  slug: string;
  name: string;
  description: string;
  image: DetailImage;
};

export type Work = {
  slug: string;
  name: string;
  kind: string;
  caseLabel: string;
  image: DetailImage;
};

export type InfoCard = {
  title: string;
  meta: string;
  description: string;
};

export type Post = InfoCard & {
  slug: string;
};

export type DropdownSubLink = {
  label: string;
  href: PageHref;
};

export type DropdownItem = {
  label: string;
  eyebrow: string;
  description: string;
  action: string;
  href: PageHref;
  image: string;
};

export type Dropdown = {
  eyebrow: string;
  title: string;
  linksTitle: string;
  items: readonly DropdownItem[];
  links: readonly DropdownSubLink[];
};

export type FooterLink = {
  label: string;
  href: PageHref | "https://github.com/Luilka/site";
};

export type Dictionary = {
  hero: string;
  quote: string;
  discover: string;
  switchLanguage: string;
  contactAction: string;
  navigationLabel: string;
  homeLabel: string;
  menuLabel: string;
  closeLabel: string;
  reelPause: string;
  reelPlay: string;
  mobileNavigationLabel: string;
  breadcrumb: BreadcrumbCopy;
  home: HomeCopy;
  sectionTitles: SectionTitles;
  sectionDescriptions: SectionDescriptions;
  about: readonly string[];
  contact: {
    title: string;
    description: string;
  };
  aboutPage: AboutPageCopy;
  pages: Record<PageKey, PageIntro>;
  steps: readonly ProcessStep[];
  services: readonly Service[];
  products: readonly NamedCard[];
  works: readonly Work[];
  posts: readonly Post[];
  jobs: readonly InfoCard[];
  dropdowns: Record<MenuKey, Dropdown>;
  states: {
    notfound: {
      code: string;
      title: string;
      description: string;
      action: string;
    };
    error: {
      title: string;
      description: string;
      action: string;
    };
    loading: {
      title: string;
      description: string;
    };
    preview: {
      title: string;
      description: string;
      error: string;
    };
  };
  newsletter: {
    invalid: string;
    valid: string;
  };
  footer: {
    description: string;
    linksTitle: string;
    moreTitle: string;
    newsletterTitle: string;
    newsletterText: string;
    emailLabel: string;
    emailPlaceholder: string;
    social: Record<SocialNetwork, string>;
    subscribe: string;
    copyright: string;
    links: readonly FooterLink[];
    more: readonly FooterLink[];
  };
};

export type DropdownBaseItem = {
  href: PageHref;
  image: string;
};

export type DropdownCopy = {
  eyebrow: string;
  title: string;
  linksTitle: string;
  action: string;
  labels: readonly string[];
  eyebrows: readonly string[];
  links: readonly DropdownSubLink[];
};
