import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi } from "vitest";

import { LumoPage } from "@/pages/LumoPage";
import { StudioPage } from "@/pages/StudioPage";
import { WorksPage } from "@/pages/WorksPage";
import { primaryCapabilities } from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
import { lumoProject, worksProjects } from "@/data/worksProjects";

function renderPage(page: React.ReactNode) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>,
  );
}

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Phase 6 Studio and Work contracts", () => {
  it("models every displayed project with separate provenance, status and shared capabilities", () => {
    expect(
      worksProjects.map(({ title, classification, capabilities, href }) => ({
        title,
        provenance: classification.provenance,
        status: classification.status,
        capabilities,
        href,
      })),
    ).toEqual([
      {
        title: "LUMO",
        provenance: "Independent Product",
        status: "Prototype",
        capabilities: ["brand-identity", "websites-experiences", "digital-products"],
        href: "/works/lumo",
      },
      {
        title: "Aurora Payments",
        provenance: "Concept Project",
        status: "Exploratory Study",
        capabilities: ["brand-identity"],
        href: undefined,
      },
      {
        title: "Obsidian",
        provenance: "Concept Project",
        status: "Prototype",
        capabilities: ["websites-experiences"],
        href: undefined,
      },
      {
        title: "Verde",
        provenance: "Concept Project",
        status: "Exploratory Study",
        capabilities: ["brand-identity"],
        href: undefined,
      },
      {
        title: "Nexus Design System",
        provenance: "Internal Project",
        status: "Prototype",
        capabilities: ["digital-products", "systems-automation"],
        href: undefined,
      },
    ]);

    const capabilityIds = new Set(primaryCapabilities.map((capability) => capability.id));
    worksProjects.forEach((project) => {
      expect(project.capabilities.length).toBeGreaterThan(0);
      project.capabilities.forEach((capability) => expect(capabilityIds.has(capability)).toBe(true));
    });
  });

  it("presents Studio as founder-led and consumes the shared capability taxonomy", () => {
    const { container } = renderPage(<StudioPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A creative technology studio for ambitious digital work.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/founder-led creative technology studio/i)).toBeInTheDocument();

    primaryCapabilities.forEach((capability) => {
      expect(screen.getByRole("heading", { level: 3, name: capability.title })).toBeInTheDocument();
      expect(screen.getByText(capability.description)).toBeInTheDocument();
    });

    expect(screen.getAllByRole("link", { name: primaryCallToAction.label })[0]).toHaveAttribute(
      "href",
      primaryCallToAction.href,
    );
    expect(screen.getAllByRole("link", { name: "View Work" })[0]).toHaveAttribute("href", "/works");
    expect(screen.getByRole("link", { name: "Explore Services" })).toHaveAttribute(
      "href",
      "/services",
    );

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-studio-page > div > [data-theme]"),
    );
    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "atmospheric",
      "mist",
      "deep",
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      undefined,
      "atmospheric",
      "light",
      "deep",
      undefined,
    ]);
  });

  it("makes Work provenance explicit, omits unsupported testimony and preserves non-links", () => {
    const { container } = renderPage(<WorksPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Work across brands, digital experiences, products and systems.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No project in the current collection is presented as client work/i)).toBeInTheDocument();
    expect(screen.queryByText("The Vortex Group")).not.toBeInTheDocument();

    const cards = container.querySelectorAll(".ei-works-project-card");
    expect(cards).toHaveLength(4);
    cards.forEach((card) => expect(card.querySelector("a")).toBeNull());
    expect(screen.getByRole("link", { name: "View Lumo Case Study" })).toHaveAttribute(
      "href",
      "/works/lumo",
    );

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-works-page > div > [data-theme]"),
    );
    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "atmospheric",
      "deep",
      "deep",
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      undefined,
      "atmospheric",
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("uses the same Lumo provenance contract on Work and the protected case study", () => {
    const work = renderPage(<WorksPage />);
    const workFeature = work.container.querySelector<HTMLElement>(".ei-works-featured-panel")!;
    expect(within(workFeature).getByText(lumoProject.classification.provenance)).toBeInTheDocument();
    expect(within(workFeature).getByText(lumoProject.classification.status)).toBeInTheDocument();
    work.unmount();

    const lumo = renderPage(<LumoPage />);
    const lumoHero = lumo.container.querySelector<HTMLElement>(".ei-lumo-dashboard-hero")!;
    expect(within(lumoHero).getByText(lumoProject.classification.provenance)).toBeInTheDocument();
    expect(within(lumoHero).getByText(lumoProject.classification.status)).toBeInTheDocument();
    expect(within(lumo.container).getAllByRole("main")).toHaveLength(1);
    expect(
      within(lumo.container).getByRole("region", { name: "Lumo case study content" }),
    ).toBeInTheDocument();
  });
});
