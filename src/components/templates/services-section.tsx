import SectionHeading from "@/components/patterns/section-heading.tsx";
import ServiceCard from "@/components/patterns/service-card.tsx";
import Container from "@/components/ui/container.tsx";
import type { SectionAction } from "@/i18n";
import { useContent } from "@/i18n";

type ServicesSectionProps = {
  id?: string;
  title: string;
  description: string;
  action?: SectionAction;
};

export default function ServicesSection({ id, title, description, action }: ServicesSectionProps) {
  const content = useContent();

  return (
    <section className="services" id={id}>
      <Container>
        <SectionHeading title={title} description={description} action={action} />
        <div className="svc-grid">
          {content.services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              shape={service.shape}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
