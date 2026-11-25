import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn.util.ts";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return <input className={cn("field", className)} {...props} />;
}
