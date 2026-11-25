import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

export default function Loading() {
  const copy = useContent().states.loading;

  return (
    <section className="state-panel" role="status" aria-live="polite">
      <Container>
        <span className="state-progress" aria-hidden="true" />
        <h1>{copy.title}</h1>
        <p className="state-text">{copy.description}</p>
      </Container>
    </section>
  );
}
