import { CalendarDays } from "lucide-react";

import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";
import { useContent } from "@/shared/i18n";
import { buttonClasses, type ButtonVariant } from "@/shared/ui/button.ui.tsx";

type QuoteLinkProps = {
  variant?: ButtonVariant;
  className?: string;
};

export default function QuoteLink({ variant = "primary", className }: QuoteLinkProps) {
  const { quote } = useContent();
  return (
    <a className={buttonClasses(variant, className)} href={CONTACT_MAILTO}>
      {quote}
      <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}
