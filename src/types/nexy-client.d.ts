import type { AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

export type Href = string;

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Href;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: "intent" | "viewport" | true | false;
  activeClassName?: string;
  exact?: boolean;
};

export const Link: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>;
