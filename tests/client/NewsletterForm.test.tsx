import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NewsletterForm from "@/components/patterns/newsletter-form.tsx";

describe("newsletter form", () => {
  it("refuses an invalid address", () => {
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText("Adresse email"), { target: { value: "nope" } });
    fireEvent.click(screen.getByRole("button", { name: /S'abonner/ }));
    expect(screen.getByRole("alert").textContent).toContain("Entrez une adresse email valide.");
  });

  it("accepts a valid address", () => {
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText("Adresse email"), { target: { value: "pixi@domaine.com" } });
    fireEvent.click(screen.getByRole("button", { name: /S'abonner/ }));
    expect(screen.getByRole("status").textContent).toContain("Adresse valide.");
  });
});
