import { cn } from "@/shared/utils/cn.util.ts";
import type { PanelProps } from "@/shared/types";

const STRIPED =
  "relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#2b2b30,#0f0f12_55%,#3a3a40)] before:absolute before:inset-0 before:content-[''] before:bg-[repeating-linear-gradient(115deg,rgb(255_255_255/12%)_0_42px,transparent_42px_90px)] after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(160deg,rgb(255_255_255/18%),transparent_40%)]";

/** A dark panel with oblique stripes, shared by the home visual and the featured value of the About page. */
export function StripedPanel({ className, ...props }: PanelProps) {
  return <div className={cn(STRIPED, className)} {...props} />;
}
