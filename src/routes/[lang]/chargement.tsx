import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

export default function LoadingPreview() {
  const copy = useContent().states;

  return (
    <section className="state-panel" role="status" aria-live="polite">
      <Container>
        <span className="state-progress" aria-hidden="true" />
        <h1>{copy.loading.title}</h1>
        <p className="state-text">{copy.loading.description}</p>
      </Container>
    </section>
  );
}
