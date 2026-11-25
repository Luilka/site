import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn.util.ts";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return <div className={cn("card", className)} {...props} />;
}
