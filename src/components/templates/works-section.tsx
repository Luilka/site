import SectionHeading from "@/components/patterns/section-heading.tsx";
import WorkCard from "@/components/patterns/work-card.tsx";
import Container from "@/components/ui/container.tsx";
import type { SectionAction } from "@/content/site.ts";
import { useContent } from "@/content/useContent.ts";

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
          {content.works.map((work, index) => (
            <WorkCard
              key={`${work.name}-${index}`}
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
