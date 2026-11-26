import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn.util.ts";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return <span className={cn("badge", className)} {...props} />;
}
