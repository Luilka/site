import { cn } from "@/shared/utils/cn.util.ts";
import type { BadgeProps } from "@/shared/types";

export function Badge({ className, ...props }: BadgeProps) {
  return <span className={cn("pill-shape border border-[var(--border-ui)] text-(length:--text-xs) py-[2px] px-[9px] text-muted mb-[34px]", className)} {...props} />;
}
