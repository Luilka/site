import { cn } from "@/shared/utils/cn.util.ts";
import type { IconTileProps } from "@/shared/types";

export function IconTile({ className, ...props }: IconTileProps) {
  const base = "icon-tile grid size-11 place-content-center rounded-xl border border-gray-900 bg-black text-white";
  return <div className={cn(base, className)} {...props} />;
}
