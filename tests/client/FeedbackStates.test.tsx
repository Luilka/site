import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import FeedbackBoundary from "@/components/patterns/feedback-boundary.tsx";
import LoadingPreview from "@/routes/[lang]/chargement.tsx";
import ErrorPreview from "@/routes/[lang]/erreurs.tsx";
import Errors from "@/routes/errors.tsx";
import Loading from "@/routes/loading.tsx";
import NotFound from "@/routes/notfound.tsx";

function setPathname(pathname: string): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname,
    search: "",
    hash: "",
    params: {},
  };
}

afterEach(() => {
  delete (globalThis as Record<string, unknown>).__NEXY_LOCATION__;
  vi.restoreAllMocks();
});

describe("feedback states", () => {
  it("shows a designed 404 for an unknown path", () => {
    setPathname("/fr/introuvable");
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: "Cette page n'existe pas" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Retour à l'accueil" }).getAttribute("href")).toBe("/fr");
  });

  it("shows the 404 in English", () => {
    setPathname("/en/missing");
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: "This page does not exist" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Back to home" }).getAttribute("href")).toBe("/en");
  });

  it("offers a retry action on the error state", () => {
    setPathname("/fr");
    const reset = vi.fn();
    render(<Errors reset={reset} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Cette page n'a pas pu s'afficher" }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(reset).toHaveBeenCalledOnce();
  });

  it("announces the loading state to assistive technology", () => {
    setPathname("/fr");
    render(<Loading />);
    expect(screen.getByRole("status").textContent).toContain("Chargement en cours");
  });

  it("recovers from a rendering error through the feedback boundary", () => {
    setPathname("/fr/erreurs");
    render(
      <FeedbackBoundary>
        <ErrorPreview />
      </FeedbackBoundary>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Provoquer une erreur" }));
    expect(
      screen.getByRole("heading", { level: 1, name: "Cette page n'a pas pu s'afficher" }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(screen.getByRole("button", { name: "Provoquer une erreur" })).toBeTruthy();
  });

  it("exposes a preview page for the loading state", () => {
    setPathname("/fr/chargement");
    render(<LoadingPreview />);
    expect(screen.getByRole("status").textContent).toContain("Chargement en cours");
  });
});
