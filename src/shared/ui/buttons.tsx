import { cn } from "@/shared/utils/cn.util.ts";
import type { ButtonProps, ButtonVariant } from "@/shared/types";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn bg-gray text-text",
  outline: "btn-outline",
  dark: "btn btn-dark",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn("cursor-pointer", VARIANTS[variant], className);
}

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
