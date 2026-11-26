import { Link as NexyLink, type Href, type LinkProps } from "@nexy/client";
import { useLocalizedHref, type Language } from "@/shared/i18n";
import { cn } from "@/shared/utils/cn.util.ts";

export { ErrorBoundary, useTransition } from "@nexy/client";
export type { ErrorBoundaryProps, Href, TransitionState } from "@nexy/client";

type AppLinkProps = Omit<LinkProps, "href"> & {
  href: Href;
  language?: Language;
};

export function AppLink({ className, href, language, ...props }: AppLinkProps) {
  const target = useLocalizedHref(href, language);
  return <NexyLink className={cn("app-link cursor-pointer", className)} href={target} {...props} />;
}
