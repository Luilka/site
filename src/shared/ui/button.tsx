import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn.ts";

export type ButtonVariant = "primary" | "outline" | "dark";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn btn-gray",
  outline: "btn-outline",
  dark: "btn btn-dark",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn("cursor-pointer", VARIANTS[variant], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
