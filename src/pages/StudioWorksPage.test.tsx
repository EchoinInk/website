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
    </HelmetProvider>
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
      dispatchEvent: vi.fn()
    }))
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
        href
      }))
    ).toEqual([
      {
        title: "LUMO",
        provenance: "Independent Product",
        status: "Prototype",
        capabilities: ["brand-identity", "websites-experiences", "digital-products"],
        href: "/works/lumo"
      },
      {
        title: "Keystone",
        provenance: "Internal Project",
        status: "Exploratory Study",
        capabilities: ["digital-products", "systems-automation"],
        href: "/works/keystone"
      },
      {
        title: "Codexia",
        provenance: "Independent Product",
        status: "Prototype",
        capabilities: ["digital-products", "systems-automation"],
        href: "/works/codexia"
      }
    ]);

    const capabilityIds = new Set(primaryCapabilities.map((capability) => capability.id));
    worksProjects.forEach((project) => {
      expect(project.capabilities.length).toBeGreaterThan(0);
      project.capabilities.forEach((capability) =>
        expect(capabilityIds.has(capability)).toBe(true)
      );
    });
  });

  it("presents Studio as founder-led and consumes the shared capability taxonomy", () => {
    const { container } = renderPage(<StudioPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Where strategy, design and technology speak the same language."
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/intentionally founder-led/i)).toBeInTheDocument();

    primaryCapabilities.forEach((capability) => {
      expect(screen.getByRole("heading", { level: 3, name: capability.title })).toBeInTheDocument();
    });

    expect(
      screen.getByLabelText("How Echo in Ink's disciplines influence one another")
    ).toBeInTheDocument();
    expect(screen.getByText("Identity shapes experiences")).toBeInTheDocument();
    expect(screen.getByText("Experiences inform products")).toBeInTheDocument();
    expect(screen.getByText("Products require systems")).toBeInTheDocument();
    expect(screen.getByText("Systems unlock new possibilities")).toBeInTheDocument();

    expect(screen.getByLabelText("Echo in Ink working relationship")).toBeInTheDocument();
    expect(screen.getByLabelText("Comparison of project handoffs")).toBeInTheDocument();
    expect(screen.getByText("Traditional model")).toBeInTheDocument();

    expect(screen.getAllByRole("link", { name: primaryCallToAction.label })[0]).toHaveAttribute(
      "href",
      primaryCallToAction.href
    );
    expect(screen.getAllByRole("link", { name: "View Work" })[0]).toHaveAttribute("href", "/works");

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-studio-page > div > [data-theme]")
    );
    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "mist",
      "light",
      "lightElevated"
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      undefined,
      "mist",
      "light",
      "lightElevated",
      "deep"
    ]);
    expect(sections.map((section) => section.dataset.transition)).toEqual([
      undefined,
      "soft",
      "chapter",
      "soft",
      "atmospheric"
    ]);
  });

  it("presents only the three reviewed projects with working detail links", () => {
    const { container } = renderPage(<WorksPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Work shown with its context intact."
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No speculative work presented as client work/i)
    ).toBeInTheDocument();
    expect(screen.queryByText("The Vortex Group")).not.toBeInTheDocument();

    const cards = container.querySelectorAll(".ei-works-project-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("A calmer operating model for creative work.")).toBeInTheDocument();
    expect(
      screen.getByText("A governed engineering system for authority and progression.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Keystone — Internal Project, Exploratory Study/i })
    ).toHaveAttribute("href", "/works/keystone");
    expect(
      screen.getByRole("link", { name: /Codexia — Independent Product, Prototype/i })
    ).toHaveAttribute("href", "/works/codexia");
    expect(screen.getByText("View Keystone case study")).toBeInTheDocument();
    expect(screen.getByText("View Codexia case study")).toBeInTheDocument();
    expect(screen.queryByText("Preview only · No case study")).not.toBeInTheDocument();
    expect(screen.getAllByText("Outcome")).toHaveLength(3);
    expect(screen.getAllByText("Focus areas")).toHaveLength(2);
    expect(cards[0]).toHaveAttribute("data-link-state", "linked");
    expect(cards[1]).toHaveAttribute("data-link-state", "linked");
    expect(screen.getByRole("link", { name: "View Lumo Case Study" })).toHaveAttribute(
      "href",
      "/works/lumo"
    );

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-works-page > div > [data-theme]")
    );
    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "light",
      "lightElevated",
      "deep"
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      "lightElevated",
      "light",
      "lightElevated",
      "deep",
      "light"
    ]);
    expect(sections.map((section) => section.dataset.transition)).toEqual([
      "atmospheric",
      "chapter",
      "soft",
      "atmospheric",
      "soft"
    ]);
  });

  it("uses the same Lumo provenance contract on Work and the protected case study", () => {
    const work = renderPage(<WorksPage />);
    const workFeature = work.container.querySelector<HTMLElement>(".ei-works-featured-panel")!;
    expect(
      within(workFeature).getByText(lumoProject.classification.provenance)
    ).toBeInTheDocument();
    expect(within(workFeature).getByText(lumoProject.classification.status)).toBeInTheDocument();
    work.unmount();

    const lumo = renderPage(<LumoPage />);
    const lumoHero = lumo.container.querySelector<HTMLElement>(".ei-lumo-dashboard-hero")!;
    expect(within(lumoHero).getByText(lumoProject.classification.provenance)).toBeInTheDocument();
    expect(within(lumoHero).getByText(lumoProject.classification.status)).toBeInTheDocument();
    expect(within(lumo.container).getAllByRole("main")).toHaveLength(1);
    expect(
      within(lumo.container).getByRole("region", { name: "Lumo case study content" })
    ).toBeInTheDocument();
    expect(within(lumo.container).getByText("Echo’s role")).toBeInTheDocument();
    expect(within(lumo.container).getByText(/no launch, clinical validation/i)).toBeInTheDocument();
    expect(within(lumo.container).getByRole("link", { name: "Explore Services" })).toHaveAttribute(
      "href",
      "/services"
    );
    expect(within(lumo.container).getByRole("link", { name: "Interface screens" })).toHaveAttribute(
      "href",
      "#product-screens"
    );
    const projectNavigation = within(lumo.container).getByRole("navigation", {
      name: "Explore other projects"
    });
    expect(within(projectNavigation).getByText("CODEXIA", { exact: false })).toBeInTheDocument();
    expect(within(projectNavigation).getByText("Keystone", { exact: false })).toBeInTheDocument();
  });
});
