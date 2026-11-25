import SectionHeading from "@/components/patterns/section-heading.tsx";
import WorkCard from "@/components/patterns/work-card.tsx";
import Container from "@/components/ui/container.tsx";
import type { SectionAction } from "@/i18n";
import { useContent } from "@/i18n";

type WorksSectionProps = {
  id?: string;
  title: string;
  description: string;
  action?: SectionAction;
};

export default function WorksSection({ id, title, description, action }: WorksSectionProps) {
  const content = useContent();

  return (
    <section className="works" id={id}>
      <Container>
        <SectionHeading title={title} description={description} action={action} />
        <div className="work-grid">
          {content.works.map((work) => (
            <WorkCard
              key={work.slug}
              slug={work.slug}
              name={work.name}
              kind={work.kind}
              caseLabel={work.caseLabel}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
