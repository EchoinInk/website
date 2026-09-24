import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { primaryCallToAction } from "@/data/siteNavigation";
import { engagementModels, primaryCapabilities } from "@/data/servicesContent";
import { HomePage } from "@/pages/HomePage";

function renderHomePage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("homepage reference implementation", () => {
  it("leads with the commercial proposition and shared capability contracts", () => {
    renderHomePage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "We design and build brands, websites, digital products and systems.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Designing the worlds your work lives in.")).toBeInTheDocument();

    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).getByRole("link", { name: primaryCallToAction.label })).toHaveAttribute(
      "href",
      primaryCallToAction.href,
    );
    expect(within(hero).getByRole("link", { name: "View Our Work" })).toHaveAttribute(
      "href",
      "/works",
    );

    primaryCapabilities.forEach((capability) => {
      expect(screen.getByRole("heading", { level: 3, name: capability.title })).toBeInTheDocument();
      expect(screen.getByText(capability.description)).toBeInTheDocument();
    });

    engagementModels.forEach((model) => {
      expect(screen.getByRole("heading", { level: 3, name: model.title })).toBeInTheDocument();
      expect(screen.getByText(model.description)).toBeInTheDocument();
    });
  });

  it("publishes the semantic section rhythm and current flagship selection", () => {
    const { container } = renderHomePage();
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-home-page > div > .ei-section"),
    );

    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "mist",
      "light",
      "mist",
      "light",
      "mist",
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      undefined,
      "light",
      "light",
      "light",
      "light",
      "light",
      undefined,
    ]);

    const selectedWork = container.querySelector<HTMLElement>(".ei-home-selected-work")!;
    expect(selectedWork.querySelectorAll(".ei-home-flagship-card")).toHaveLength(2);
    expect(within(selectedWork).getByRole("heading", { level: 3, name: "Keystone" })).toBeInTheDocument();
    expect(within(selectedWork).getByRole("heading", { level: 3, name: "Codexia" })).toBeInTheDocument();
    expect(within(selectedWork).queryByText("Aurora Payments")).not.toBeInTheDocument();
    expect(within(selectedWork).queryByText("Obsidian")).not.toBeInTheDocument();
    expect(within(selectedWork).queryByText("Verde")).not.toBeInTheDocument();

    const lumo = container.querySelector<HTMLElement>(".ei-home-lumo")!;
    expect(within(lumo).getByText("Independent Product")).toBeInTheDocument();
    expect(within(lumo).getByText("React Native")).toBeInTheDocument();
    expect(within(lumo).getByAltText("LUMO — atmospheric UI exploration")).toBeInTheDocument();
    expect(screen.queryByText("The Vortex Group")).not.toBeInTheDocument();

    const closing = container.querySelector<HTMLElement>(".ei-home-closing")!;
    expect(within(closing).getByRole("link", { name: primaryCallToAction.label })).toHaveAttribute(
      "href",
      primaryCallToAction.href,
    );
    expect(within(closing).getByRole("link", { name: "Book a Strategy Session" })).toHaveAttribute(
      "href",
      "/booking",
    );
  });
});
