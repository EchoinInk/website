import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "@/App";
import Footer from "@/components/navigation/Footer";
import { archiveIndex, archiveNotes } from "@/data/archiveContent";
import { engagementModels, primaryCapabilities } from "@/data/servicesContent";
import { primaryNavigation } from "@/data/siteNavigation";
import { creativeResources } from "@/data/systemsContent";
import { lumoProject } from "@/data/worksProjects";
import { ArchivePage } from "@/pages/ArchivePage";
import { SystemsPage } from "@/pages/SystemsPage";

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

function renderPage(page: React.ReactNode, path = "/") {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {page}
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Phase 9 editorial, systems, and public-route contracts", () => {
  it.each(["/insights", "/archive"])(
    "keeps %s compatible with the shared Insights and Archive experience",
    async (path) => {
      renderRoute(path);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: "Writing, notes, and observations.",
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(/The Archive is Echo in Ink's editorial collection/i))
        .toBeInTheDocument();
    },
  );

  it.each([
    ["/archive/atmosphere-is-information", "Atmosphere is information."],
    ["/archive/notes", "Short observations from the studio."],
    ["/archive/map", "A map of what is here."],
  ])("preserves the editorial route %s", async (path, heading) => {
    renderRoute(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading }))
      .toBeInTheDocument();
  });

  it("indexes only editorial material that has a real public destination", () => {
    expect(archiveIndex).toHaveLength(4);
    expect(archiveIndex.map((entry) => entry.href)).toEqual([
      "/archive/atmosphere-is-information",
      ...archiveNotes.map((note) => `/archive/notes#${note.id}`),
    ]);
    expect(archiveIndex.every((entry) => !("date" in entry))).toBe(true);
  });

  it("publishes an intentional semantic sequence for Insights", () => {
    const { container } = renderPage(<ArchivePage />, "/insights");
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-archive-page > div > [data-theme]"),
    );

    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "light",
      "lightElevated",
      "lightElevated",
      "mist",
      "lightElevated",
      "mist",
    ]);
    expect(sections.map((section) => section.dataset.transitionTo)).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
      "lightElevated",
      "mist",
      undefined,
    ]);
  });

  it("keeps Creative Systems & Tools distinct from Systems & Automation", () => {
    const { container } = renderPage(<SystemsPage />, "/systems");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Frameworks for making creative decisions clearer.",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Creative Systems & Tools").length).toBeGreaterThan(0);
    expect(screen.getByText(/These are creative resources and experiments/i)).toBeInTheDocument();
    expect(container.querySelectorAll(".ei-systems-module-card")).toHaveLength(
      creativeResources.length,
    );
    container.querySelectorAll(".ei-systems-module-card").forEach((card) => {
      expect(card.querySelector("a")).toBeNull();
    });
    expect(screen.queryByText(/\$\d+/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Available$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/PDF|Notion|50\+/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View Systems & Automation/i }),
    ).toHaveAttribute("href", "/services");
    expect(
      screen.getByRole("link", { name: "Explore Systems & Automation" }),
    ).toHaveAttribute("href", "/services");

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".ei-systems-page > div > [data-theme]"),
    );
    expect(sections.map((section) => section.dataset.theme)).toEqual([
      "light",
      "lightElevated",
      "mist",
      "lightElevated",
      "light",
      "mist",
      "lightElevated",
    ]);
  });

  it("preserves the commercial taxonomy and canonical Lumo provenance", () => {
    expect(primaryCapabilities).toHaveLength(4);
    expect(primaryCapabilities.map((capability) => capability.title)).toEqual([
      "Brand & Identity",
      "Websites & Digital Experiences",
      "Products & Apps",
      "Systems & Automation",
    ]);
    expect(engagementModels).toHaveLength(3);
    expect(engagementModels.map((model) => model.title)).toEqual([
      "Strategy Sessions",
      "Digital Reset",
      "Full Projects",
    ]);
    expect(lumoProject.classification).toEqual({
      provenance: "Independent Product",
      status: "Prototype",
    });
  });

  it("keeps public navigation canonical and removes placeholder social destinations", () => {
    renderPage(<Footer />);
    const footer = screen.getByRole("contentinfo");

    primaryNavigation.forEach((item) => {
      expect(within(footer).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    });
    expect(
      within(footer).getByRole("link", { name: /Explore frameworks and experiments/i }),
    ).toHaveAttribute("href", "/systems");
    expect(footer.querySelector('a[href="https://instagram.com"]')).toBeNull();
    expect(footer.querySelector('a[href="https://linkedin.com"]')).toBeNull();
    expect(footer.querySelector('a[href="https://x.com"]')).toBeNull();
  });
});
