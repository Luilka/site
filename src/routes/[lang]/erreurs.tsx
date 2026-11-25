import { useState } from "react";

import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

export default function ErrorPreview() {
  const copy = useContent().states.preview;
  const [broken, setBroken] = useState(false);

  if (broken) {
    throw new Error("Preview error");
  }

  return (
    <section className="state-panel">
      <Container>
        <h1>{copy.title}</h1>
        <p className="state-text">{copy.description}</p>
        <button className="btn btn-dark state-action" type="button" onClick={() => setBroken(true)}>
          {copy.error}
        </button>
      </Container>
    </section>
  );
}
