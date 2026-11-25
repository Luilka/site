import InfoCard from "@/components/patterns/info-card.tsx";
import SectionHeading from "@/components/patterns/section-heading.tsx";
import Container from "@/components/ui/container.tsx";
import { type Href } from "@/components/ui/link.tsx";
import type { InfoCard as InfoCardData } from "@/i18n";
import type { DetailKind } from "@/types";

type InfoSectionProps = {
  title: string;
  description: string;
  items: readonly InfoCardData[];
  detail?: DetailKind;
};

export default function InfoSection({ title, description, items, detail }: InfoSectionProps) {
  return (
    <section className="services">
      <Container>
        <SectionHeading title={title} description={description} />
        <div className="info-grid">
          {items.map((item) => {
            const slug = detail && "slug" in item ? String(item.slug) : null;
            const href = detail && slug ? (`/${detail}/${slug}` as Href) : undefined;
            return <InfoCard key={item.title} {...item} href={href} />;
          })}
        </div>
      </Container>
    </section>
  );
}
