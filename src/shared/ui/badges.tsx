import { cn } from "@/shared/utils/cn.util.ts";
import type { BadgeProps } from "@/shared/types";

export function Badge({ className, ...props }: BadgeProps) {
  return <span className={cn("badge", className)} {...props} />;
}
