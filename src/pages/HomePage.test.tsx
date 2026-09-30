import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import { engagementModels, primaryCapabilities } from "@/data/servicesContent";
import { HomePage } from "@/pages/HomePage";

function renderHomePage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe("homepage reference implementation", () => {
  it("leads with the commercial proposition and shared capability contracts", () => {
    renderHomePage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "We design and build brands, websites, digital products and systems."
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Strategy, identity, product design and development/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("From complexity to clarity, we start with the problem.")
    ).toBeInTheDocument();

    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).getByRole("link", { name: primaryCallToAction.label })).toHaveAttribute(
      "href",
      primaryCallToAction.href
    );
    expect(within(hero).getByRole("link", { name: "Explore our work" })).toHaveAttribute(
      "href",
      "/works"
    );

    const capabilities = document.querySelector<HTMLElement>(".ei-home-capabilities")!;
    primaryCapabilities.forEach((capability) => {
      expect(within(capabilities).getByText(capability.title)).toBeInTheDocument();
      expect(within(capabilities).getByText(capability.description)).toBeInTheDocument();
    });

    const engagementTitles = ["Strategy Session", "Digital Reset", "Full Project"];
    engagementModels.forEach((model, index) => {
      const heading = screen.getByRole("heading", { level: 3, name: engagementTitles[index] });
      const card = heading.closest("article")!;

      expect(within(card).getByRole("link", { name: new RegExp(model.cta) })).toHaveAttribute(
        "href",
        model.href
      );
    });

    expect(screen.getByText(/Not every project needs the same approach/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Fewer gaps between/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Real people/i })).toBeInTheDocument();
    expect(
      screen.getByText(/project provenance and evidence remain explicit/i)
    ).toBeInTheDocument();
    expect(screen.queryByText("Best when:")).not.toBeInTheDocument();
  });

  it("publishes the semantic section rhythm and current flagship selection", () => {
    const { container } = renderHomePage();
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-home-page > div > .ei-section")
    );

    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "mist",
      "lightElevated",
      "light",
      "light",
      "light",
      "light"
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      "lightElevated",
      "mist",
      "lightElevated",
      "light",
      "light",
      "light",
      "light",
      undefined
    ]);
    expect(sections.map((section) => section.dataset.transition)).toEqual([
      "soft",
      "chapter",
      "soft",
      "chapter",
      "atmospheric",
      "atmospheric",
      "motif",
      undefined
    ]);
    expect(sections.map((section) => section.dataset.transitionMotif)).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "node",
      undefined,
      undefined
    ]);

    const selectedWork = container.querySelector<HTMLElement>(".ei-home-selected-work")!;
    expect(selectedWork.querySelectorAll(".ei-works-project-card")).toHaveLength(3);
    selectedWork.querySelectorAll(".ei-works-project-card").forEach((card) => {
      expect(card.querySelectorAll("a")).toHaveLength(1);
      expect(card.querySelector("a")).toHaveClass("ei-works-project-link");
    });
    expect(
      within(selectedWork).getByRole("heading", { level: 3, name: "Lumo" })
    ).toBeInTheDocument();
    expect(
      within(selectedWork).getByRole("heading", { level: 3, name: "Keystone" })
    ).toBeInTheDocument();
    expect(
      within(selectedWork).getByRole("heading", { level: 3, name: "Codexia" })
    ).toBeInTheDocument();
    expect(
      within(selectedWork).getByRole("link", {
        name: /Keystone — Internal Project, Exploratory Study/i
      })
    ).toHaveAttribute("href", "/works/keystone");
    expect(
      within(selectedWork).getByRole("link", { name: /Codexia — Independent Product, Prototype/i })
    ).toHaveAttribute("href", "/works/codexia");
    expect(
      within(selectedWork).getByText(/A calmer operating model for the work behind the studio/i)
    ).toBeInTheDocument();
    expect(within(selectedWork).getByRole("link", { name: "View all work" })).toHaveAttribute(
      "href",
      "/works"
    );
    expect(container.querySelector(".ei-home-lumo")).not.toBeInTheDocument();
    expect(container.querySelector(".ei-home-studio")).not.toBeInTheDocument();
    expect(screen.queryByText("The Vortex Group")).not.toBeInTheDocument();

    const evidence = container.querySelector<HTMLElement>(".ei-home-evidence-grid")!;
    expect(evidence.querySelectorAll(".ei-home-evidence-card")).toHaveLength(2);
    expect(within(evidence).getByText("Client words — when shareable.")).toBeInTheDocument();
    expect(within(evidence).getByText("Project evidence — clearly labelled.")).toBeInTheDocument();

    const heroPicture = container.querySelector<HTMLPictureElement>(".ei-home-hero-picture")!;
    expect(heroPicture.querySelector("source")).toHaveAttribute("srcset", "/home-hero-mobile.webp");
    expect(heroPicture.querySelector("source")).toHaveAttribute("media", "(max-width: 768px)");
    expect(heroPicture.querySelector("img")).toHaveAttribute("src", "/home-hero-desktop.webp");

    const footer = container.querySelector<HTMLElement>("footer")!;
    expect(within(footer).queryByText("Explore deeper")).not.toBeInTheDocument();
    expect(
      within(footer).queryByText("Explore frameworks and experiments")
    ).not.toBeInTheDocument();

    const closing = container.querySelector<HTMLElement>(".ei-home-closing")!;
    expect(within(closing).getByRole("link", { name: primaryCallToAction.label })).toHaveAttribute(
      "href",
      primaryCallToAction.href
    );
    expect(
      within(closing).getByRole("link", { name: siteActionLabels.requestStrategySession })
    ).toHaveAttribute("href", "/booking");
  });
});
