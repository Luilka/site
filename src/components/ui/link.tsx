import { Link as NexyLink, type Href, type LinkProps } from "@nexy/client";

import { cn } from "@/lib/cn.ts";

type AppLinkProps = Omit<LinkProps, "href"> & {
  href: Href;
};

export default function AppLink({ className, children, ...props }: AppLinkProps) {
  return (
    <NexyLink className={cn("app-link cursor-pointer", className)} {...props}>
      {children}
    </NexyLink>
  );
}
