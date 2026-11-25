import { ArrowUpRight } from "lucide-react";

import { useContent } from "@/shared/i18n";
import Button from "@/shared/ui/button.tsx";

type NewsletterSubmitProps = {
  pending: boolean;
};

export default function NewsletterSubmit({ pending }: NewsletterSubmitProps) {
  const { footer } = useContent();
  return (
    <Button type="submit" disabled={pending}>
      {footer.subscribe}
      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
    </Button>
  );
}
