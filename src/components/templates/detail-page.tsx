import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import Container from "@/components/ui/container.tsx";
import AppLink, { type Href } from "@/components/ui/link.tsx";
import type { DetailModel } from "@/types";

type DetailPageProps = {
  detail: DetailModel;
};

export default function DetailPage({ detail }: DetailPageProps) {
  return (
    <>
      <PageHero eyebrow={detail.eyebrow} title={detail.title} description={detail.description} />
      <section className="services">
        <Container>
          <div className="info-grid">
            <article className="card info-card">
              <h3>{detail.title}</h3>
              <p>{detail.body}</p>
            </article>
          </div>
          <AppLink className="btn-outline" href={detail.backHref as Href}>
            {detail.backLabel}
          </AppLink>
        </Container>
      </section>
      <ContactPanel />
    </>
  );
}
