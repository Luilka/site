import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/routes/[lang]/index.tsx";

describe("landing page", () => {
  it("renders one main heading with the reference promise", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText(/Agence de/).textContent).toContain("reliant produit et");
  });

  it("uses the reference section classes", () => {
    const { container } = render(<Home />);
    for (const name of ["hero-grid", "grid-cols-4", "grid-cols-3", "grid-cols-2", "bg-gray-300"]) {
      expect(container.querySelector(`.${name}`)).not.toBeNull();
    }
  });

  it("shows the four design steps with their own copy", () => {
    render(<Home />);
    for (const label of ["Cadrage", "Direction visuelle", "Design d'interface", "Livraison"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(
      screen.getAllByText(
        "Nous clarifions le problème, les personnes concernées et ce que le produit doit accomplir.",
      ),
    ).toHaveLength(1);
  });

  it("shows the four design services", () => {
    render(<Home />);
    for (const label of ["UX Design", "UI design", "Software", "COM"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows the three products", () => {
    render(<Home />);
    for (const label of ["Tala", "Vuga", "Pro"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows the four case studies with their subtitles", () => {
    render(<Home />);
    for (const label of ["Yano", "Vox Congo", "Mitemo", "Privatis Capital Invest"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    for (const subtitle of [
      "UX Design: mobile App",
      "UX Design & UI design : Mobile App",
      "Full Projet & all Service",
      "Rebranding, et Design système , charte graphique",
    ]) {
      expect(screen.getAllByText(subtitle).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText("AyLen")).toBeNull();
    expect(screen.getAllByText("Voir le projet")).toHaveLength(4);
  });

  it("limits the home page to four works and three products", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("a[href*='/work/']")).toHaveLength(4);
    expect(container.querySelectorAll("a[href*='/products/']")).toHaveLength(3);
    expect(container.querySelectorAll("a[href*='/work/'] p")).toHaveLength(0);
  });

  it("offers two quote actions", () => {
    render(<Home />);
    expect(screen.getAllByText("J'ai besoin d'un devis")).toHaveLength(2);
  });

  it("keeps the contact section", () => {
    render(<Home />);
    expect(screen.getByText(/Donnons forme/)).toBeTruthy();
  });

  it("exposes the reference section anchors", () => {
    const { container } = render(<Home />);
    for (const id of ["about", "services", "products", "works", "contact"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});
