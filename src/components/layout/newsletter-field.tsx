import { useId } from "react";

import { useContent } from "@/shared/i18n";
import Input from "@/shared/ui/input.tsx";

export default function NewsletterField() {
  const id = useId();
  const { footer } = useContent();
  return (
    <>
      <label htmlFor={id} className="sr-only">{footer.emailLabel}</label>
      <Input id={id} name="email" type="email" placeholder="pixi@domaine.com" autoComplete="email" />
    </>
  );
}
