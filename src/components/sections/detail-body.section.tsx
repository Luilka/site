import DetailBackLink from "@/components/sections/detail-back-link.section.tsx";
import DetailCard from "@/components/sections/detail-card.section.tsx";
import type { DetailModel } from "@/shared/types";
import Container from "@/shared/ui/container.ui.tsx";

type DetailBodyProps = {
  detail: DetailModel;
};

export default function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className="services">
      <Container>
        <DetailCard title={detail.title} body={detail.body} />
        <DetailBackLink detail={detail} />
      </Container>
    </section>
  );
}
