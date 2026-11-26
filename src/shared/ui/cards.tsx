import { cn } from "@/shared/utils/cn.util.ts";
import type { CardProps } from "@/shared/types";

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("card", className)} {...props} />;
}
