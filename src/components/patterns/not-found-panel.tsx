import Container from "@/components/ui/container.tsx";
import AppLink from "@/components/ui/link.tsx";
import { useContent } from "@/i18n";

export default function NotFoundPanel() {
  const copy = useContent().states.notfound;

  return (
    <section className="state-panel">
      <Container>
        <span className="state-code" aria-hidden="true">
          {copy.code}
        </span>
        <h1>{copy.title}</h1>
        <p className="state-text">{copy.description}</p>
        <AppLink className="btn btn-dark state-action" href="/">
          {copy.action}
        </AppLink>
      </Container>
    </section>
  );
}
