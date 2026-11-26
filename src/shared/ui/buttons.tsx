import { cn } from "@/shared/utils/cn.util.ts";
import type { ButtonProps, ButtonVariant } from "@/shared/types";

const SOLID = "pill-shape gap-[10px] border-0 py-[14px] px-[22px] text-[length:14px] font-medium";
const OUTLINE = "pill-shape gap-[8px] border border-text bg-paper py-[8px] px-[18px] text-(length:--text-sm) font-medium";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: `${SOLID} bg-gray text-text`,
  outline: OUTLINE,
  dark: `${SOLID} bg-[var(--night)] text-paper`,
  light: `${SOLID} bg-paper text-text`,
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn("cursor-pointer", VARIANTS[variant], className);
}

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
