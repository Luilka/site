import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn.ts";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export default function Badge({ className, ...props }: BadgeProps) {
  return <span className={cn("badge", className)} {...props} />;
}
