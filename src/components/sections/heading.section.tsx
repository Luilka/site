import ActionLink from "@/components/patterns/action-link.pattern.tsx";
import HeadingText from "@/components/sections/heading-text.section.tsx";
import type { SectionAction } from "@/shared/i18n";

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: SectionAction;
};

export default function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <HeadingText title={title} description={description} />
      {action ? <ActionLink action={action} className="section-action" /> : null}
    </div>
  );
}
