import { cn } from "@/shared/utils/cn.util.ts";
import type { ContainerProps } from "@/shared/types";

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("container", className)} {...props} />;
}
