import { Link as NexyLink } from "@nexy/client";
import { useLocalizedHref } from "@/shared/i18n";
import { cn } from "@/shared/utils/cn.util.ts";
import type { AppLinkProps } from "@/shared/types";

export { ErrorBoundary, useTransition } from "@nexy/client";
export type { ErrorBoundaryProps, Href, TransitionState } from "@nexy/client";

export function AppLink({ className, href, language, ...props }: AppLinkProps) {
  const target = useLocalizedHref(href, language);
  return <NexyLink className={cn("app-link cursor-pointer", className)} href={target} {...props} />;
}
