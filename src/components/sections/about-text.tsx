import ActionLink from "@/components/patterns/action-link.tsx";
import type { SectionAction } from "@/shared/i18n";

type AboutTextProps = {
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export default function AboutText({ title, paragraphs, action }: AboutTextProps) {
  return (
    <div className="about-txt">
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {action ? <ActionLink action={action} /> : null}
    </div>
  );
}
