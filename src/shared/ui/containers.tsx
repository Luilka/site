import { cn } from "@/shared/utils/cn.util.ts";
import type { ContainerProps } from "@/shared/types";

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("container mx-auto px-[64px] max-[1000px]:px-[24px]", className)} {...props} />;
}
