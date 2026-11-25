import ContactPanel from "@/components/patterns/contact-panel.pattern.tsx";
import PageHero from "@/components/patterns/page-hero.pattern.tsx";
import type { DetailModel } from "@/shared/types";
import Container from "@/shared/ui/container.ui.tsx";
import { ArrowLeft } from "lucide-react";
import AppLink from "@/shared/ui/link.ui.tsx";

type DetailBackLinkProps = {
  detail: DetailModel;
};

function DetailBackLink({ detail }: DetailBackLinkProps) {
  return (
    <AppLink className="btn-outline" href={detail.backHref}>
      <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />{detail.backLabel}
    </AppLink>
  );
}

type DetailCardProps = {
  title: string;
  body: string;
};

function DetailCard({ title, body }: DetailCardProps) {
  return (
    <div className="info-grid">
      <article className="card info-card">
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    </div>
  );
}

type DetailBodyProps = {
  detail: DetailModel;
};

function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className="services">
      <Container>
        <DetailCard title={detail.title} body={detail.body} />
        <DetailBackLink detail={detail} />
      </Container>
    </section>
  );
}

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
