import type { InputProps } from "@/shared/types";

export function Input({ className, ...props }: InputProps) {
  return <input className={className} {...props} />;
}
