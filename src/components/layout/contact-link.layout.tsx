import { CalendarDays } from "lucide-react";

import { useContent } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";

export default function ContactLink() {
  const { contactAction } = useContent();
  return (
    <AppLink className="btn-outline bg-transparent! border-gray-400!" href="/contact">
      {contactAction}<CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
    </AppLink>
  );
}
