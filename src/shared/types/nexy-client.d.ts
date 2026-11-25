import type { AnchorHTMLAttributes, Component, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export type Href = string;

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Href;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: "intent" | "viewport" | true | false;
  activeClassName?: string;
  exact?: boolean;
};

export declare const Link: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>;

export declare function usePathname(): string;

export type TransitionState = { pending: boolean; next: string | null };

export declare function useTransition(): TransitionState;

export type ErrorBoundaryProps = {
  fallback: (error: Error, reset: () => void) => ReactNode;
  children?: ReactNode;
};

export declare class ErrorBoundary extends Component<ErrorBoundaryProps> {}
