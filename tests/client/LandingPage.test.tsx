import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/routes/index.tsx";

describe("landing page", () => {
  it("renders one main heading with the reference promise", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText(/Agence de/).textContent).toContain("reliant produit et");
  });

  it("uses the reference section classes", () => {
    const { container } = render(<Home />);
    for (const name of ["hero-grid", "marquee", "steps-grid", "prod-grid", "work-grid"]) {
      expect(container.querySelector(`.${name}`)).not.toBeNull();
    }
  });

  it("shows the four process stages with the reference copy", () => {
    render(<Home />);
    for (const label of ["Cadrage", "Conception", "Developpement", "Maintenance"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByText(/PossaCode a déjà accompagné plus de 300 développeurs/)).toHaveLength(4);
  });

  it("shows the reference services", () => {
    render(<Home />);
    for (const label of ["Design", "Software", "Maintenance", "Devops"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows the three products", () => {
    render(<Home />);
    for (const label of ["Tala", "Vuga", "Pro"]) {
      expect(screen.getByText(label)).toBeTruthy();
    }
  });

  it("shows the four case studies", () => {
    render(<Home />);
    for (const label of ["Yano", "Vox Congo", "AyLen"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByText("Cas d'étude")).toHaveLength(4);
  });

  it("offers two quote actions", () => {
    render(<Home />);
    expect(screen.getAllByText("J'ai besoin d'un devis")).toHaveLength(2);
  });

  it("keeps the contact section", () => {
    render(<Home />);
    expect(screen.getByText(/Ne grandissez plus seul\./)).toBeTruthy();
  });

  it("exposes the reference section anchors", () => {
    const { container } = render(<Home />);
    for (const id of ["about", "services", "products", "works", "contact"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});
