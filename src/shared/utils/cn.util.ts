import type { ClassValue } from "@/shared/types";

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
