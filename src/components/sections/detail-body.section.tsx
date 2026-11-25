import DetailCard from "@/components/sections/detail-card.section.tsx";
import type { DetailModel } from "@/shared/types";
import Container from "@/shared/ui/container.ui.tsx";
import AppLink from "@/shared/ui/link.ui.tsx";

type DetailBodyProps = {
  detail: DetailModel;
};

export default function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className="services">
      <Container>
        <DetailCard title={detail.title} body={detail.body} />
        <AppLink className="btn-outline" href={detail.backHref}>{detail.backLabel}</AppLink>
      </Container>
    </section>
  );
}
