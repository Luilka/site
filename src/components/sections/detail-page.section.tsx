import ContactPanel from "@/components/patterns/contact-panel.pattern.tsx";
import PageHero from "@/components/patterns/page-hero.pattern.tsx";
import DetailBody from "@/components/sections/detail-body.section.tsx";
import type { DetailModel } from "@/shared/types";

type DetailPageProps = {
  detail: DetailModel;
};

export default function DetailPage({ detail }: DetailPageProps) {
  return (
    <>
      <PageHero eyebrow={detail.eyebrow} title={detail.title} description={detail.description} />
      <DetailBody detail={detail} />
      <ContactPanel />
    </>
  );
}
