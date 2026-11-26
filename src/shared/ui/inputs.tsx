import { cn } from "@/shared/utils/cn.util.ts";
import type { InputProps } from "@/shared/types";

export function Input({ className, ...props }: InputProps) {
  return <input className={cn("field", className)} {...props} />;
}
