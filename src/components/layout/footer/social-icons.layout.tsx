import { Mail } from "lucide-react";

import { useContent } from "@/shared/i18n";
import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";

export default function SocialIcons() {
  const { quote } = useContent();
  return (
    <div className="soc">
      <a href={CONTACT_MAILTO} aria-label={quote}>
        <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
