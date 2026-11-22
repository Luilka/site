import { ArrowUpRight } from "lucide-react";

import AppLink from "@/components/ui/link.tsx";
import { buttonClasses } from "@/components/ui/button.tsx";
import type { SectionAction } from "@/i18n";

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: SectionAction;
};

export default function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <div>
        <h2 className="sec">{title}</h2>
        {description ? <p className="sec-p">{description}</p> : null}
      </div>
      {action ? (
        <AppLink className={buttonClasses("outline", "section-action")} href={action.href}>
          {action.label}
          <ArrowUpRight size={10} strokeWidth={1.8} aria-hidden="true" />
        </AppLink>
      ) : null}
    </div>
  );
}
