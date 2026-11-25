import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn.ts";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return <input className={cn("field", className)} {...props} />;
}
