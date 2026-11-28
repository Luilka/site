import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProcessBand } from "@/components/patterns.tsx";
import { Footer, NewsletterForm } from "@/components/layout.tsx";
import { DetailPage } from "@/components/sections.tsx";
import type { DetailModel } from "@/shared/types";

const detail: DetailModel = {
  eyebrow: "Produit",
  title: "Tala",
  description: "Texte",
  backHref: "/products",
  backLabel: "Produits",
};

describe("icons", () => {
  it("separates the process stages with a motorbike instead of a chevron", () => {
    const { container } = render(<ProcessBand />);
    expect(container.querySelectorAll("svg.lucide-motorbike")).toHaveLength(8);
    expect(container.querySelectorAll("svg.lucide-chevron-right")).toHaveLength(0);
    expect(container.querySelectorAll("svg")).toHaveLength(8);
  });

  it("points the motorbikes the way the band scrolls", () => {
    const forward = render(<ProcessBand />).container;
    expect(forward.querySelector("svg.lucide-motorbike")?.getAttribute("class")).not.toContain("-scale-x-100");
    const reversed = render(<ProcessBand reverse />).container;
    expect(reversed.querySelector("svg.lucide-motorbike")?.getAttribute("class")).toContain("-scale-x-100");
  });

  it("shows a check icon with the valid newsletter message", () => {
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText("Adresse email"), { target: { value: "pixi@domaine.com" } });
    fireEvent.click(screen.getByRole("button", { name: /S'abonner/ }));
    expect(screen.getByRole("status").querySelector(".lucide-circle-check")).not.toBeNull();
  });

  it("shows an alert icon with the invalid newsletter message", () => {
    render(<NewsletterForm />);
    fireEvent.click(screen.getByRole("button", { name: /S'abonner/ }));
    expect(screen.getByRole("alert").querySelector(".lucide-circle-alert")).not.toBeNull();
  });

  it("offers a real mail link in the footer", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /email/i });
    expect(link.getAttribute("href")).toBe("mailto:bonjour@luilka.cd");
    expect(link.querySelector(".lucide-mail")).not.toBeNull();
  });

  it("puts a back arrow before the label of the back link", () => {
    render(<DetailPage detail={detail} />);
    const link = screen.getByRole("link", { name: "Produits" });
    expect(link.querySelector(".lucide-arrow-left")).not.toBeNull();
  });

  it("hides decorative icons from assistive technology", () => {
    const { container } = render(<ProcessBand />);
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();
  });
});
