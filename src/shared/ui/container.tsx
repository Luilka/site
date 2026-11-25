import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn.ts";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("container", className)} {...props} />;
}
