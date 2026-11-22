import InfoCard from "@/components/patterns/info-card.tsx";
import SectionHeading from "@/components/patterns/section-heading.tsx";
import Container from "@/components/ui/container.tsx";
import type { InfoCard as InfoCardData } from "@/i18n";

type InfoSectionProps = {
  title: string;
  description: string;
  items: readonly InfoCardData[];
};

export default function InfoSection({ title, description, items }: InfoSectionProps) {
  return (
    <section className="services">
      <Container>
        <SectionHeading title={title} description={description} />
        <div className="info-grid">
          {items.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
