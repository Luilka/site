import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

type ErrorsProps = {
  reset?: () => void;
};

export default function Errors({ reset }: ErrorsProps) {
  const copy = useContent().states.error;

  return (
    <section className="state-panel">
      <Container>
        <h1>{copy.title}</h1>
        <p className="state-text">{copy.description}</p>
        <button className="btn btn-dark state-action" type="button" onClick={reset}>
          {copy.action}
        </button>
      </Container>
    </section>
  );
}
