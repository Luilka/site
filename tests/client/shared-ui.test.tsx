import { render } from "@testing-library/react";
import { buttonClasses } from "@/shared/ui/buttons.tsx";
import { describe, expect, it } from "vitest";
import { PageLead, PageTitle } from "@/components/patterns.tsx";
import { Picture } from "@/shared/ui/images.tsx";
import { StripedPanel } from "@/shared/ui/panels.tsx";
import { SAMPLE_IMAGE } from "./fixtures.ts";

describe("accent button", () => {
  it("is the single green action, and the dark button turns green on hover", () => {
    expect(buttonClasses("accent")).toContain("bg-accent text-paper");
    expect(buttonClasses("dark")).toContain("hover:bg-accent");
  });
});

describe("Picture", () => {
  it("shows a decorative image with the size of its file, loaded late", () => {
    const { container } = render(<Picture image={SAMPLE_IMAGE} />);
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("/images/work/sample.svg");
    expect(img?.getAttribute("width")).toBe("1200");
    expect(img?.getAttribute("height")).toBe("750");
    expect(img?.getAttribute("alt")).toBe("");
    expect(img?.getAttribute("loading")).toBe("lazy");
  });

  it("fills its box and keeps the class it receives", () => {
    const { container } = render(<Picture image={SAMPLE_IMAGE} className="rounded-[28px]" />);
    const className = container.querySelector("img")?.className ?? "";
    expect(className).toContain("w-full");
    expect(className).toContain("object-cover");
    expect(className).toContain("rounded-[28px]");
  });

  it("passes the loading hints through", () => {
    const { container } = render(<Picture image={SAMPLE_IMAGE} loading="eager" fetchPriority="high" />);
    const img = container.querySelector("img");
    expect(img?.getAttribute("loading")).toBe("eager");
    expect(img?.getAttribute("fetchpriority")).toBe("high");
  });
});

describe("StripedPanel", () => {
  it("draws a dark panel with oblique stripes and keeps the class it receives", () => {
    const { container } = render(<StripedPanel className="h-10">texte</StripedPanel>);
    const panel = container.firstElementChild;
    expect(panel?.className).toContain("repeating-linear-gradient(115deg");
    expect(panel?.className).toContain("h-10");
    expect(panel?.textContent).toBe("texte");
  });
});

describe("page title and lead", () => {
  it("gives the page title the display size and the lead its reading size", () => {
    const { container } = render(<><PageTitle className="mt-8">Titre</PageTitle><PageLead>Phrase</PageLead></>);
    const title = container.querySelector("h1");
    expect(title?.className).toContain("text-(length:--text-3xl)");
    expect(title?.className).toContain("mt-8");
    expect(container.querySelector("p")?.className).toContain("text-muted");
  });
});
