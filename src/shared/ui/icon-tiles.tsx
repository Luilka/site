import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn.util.ts";

type IconTileProps = HTMLAttributes<HTMLDivElement>;

export function IconTile({ className, ...props }: IconTileProps) {
  const base = "icon-tile grid size-11 place-content-center rounded-xl border border-gray-900 bg-black text-white";
  return <div className={cn(base, className)} {...props} />;
}
