import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/shared/ui/badges.tsx";
import { Button } from "@/shared/ui/buttons.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Container } from "@/shared/ui/containers.tsx";
import { Input } from "@/shared/ui/inputs.tsx";
import { Link } from "@/shared/ui/links.tsx";
import { cn } from "@/shared/utils/cn.util.ts";

describe("design system atoms", () => {
  it("joins class names without empty values", () => {
    expect(cn("base", false, null, undefined, "extra")).toBe("base extra");
  });

  it("renders the outline button with the reference class", () => {
    render(<Button variant="outline">En savoir plus</Button>);
    expect(screen.getByRole("button", { name: "En savoir plus" }).className).toContain("btn-outline");
  });

  it("renders a badge inside a card inside a container", () => {
    const { container } = render(
      <Container>
        <Card>
          <Badge>Design</Badge>
        </Card>
      </Container>,
    );
    expect(container.querySelector(".container .card .badge")).not.toBeNull();
  });

  it("renders a typed email input", () => {
    render(<Input type="email" aria-label="Adresse email" />);
    expect(screen.getByLabelText("Adresse email").getAttribute("type")).toBe("email");
  });

  it("renders internal links as semantic anchors", () => {
    render(<Link href="/about">A propos</Link>);
    expect(screen.getByRole("link", { name: "A propos" }).getAttribute("href")).toBe("/fr/about");
  });
});
