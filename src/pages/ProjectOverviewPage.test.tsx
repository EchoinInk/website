import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { ProjectOverviewPage } from "@/pages/ProjectOverviewPage";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";

function renderProject(projectTitle: "Keystone" | "Codexia") {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <ProjectOverviewPage projectTitle={projectTitle} />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("compact project overviews", () => {
  it.each([
    ["Keystone", "Internal Project", "Exploratory Study", "/works"],
    ["Codexia", "Independent Product", "Prototype", "/works"],
  ] as const)("publishes truthful context and onward paths for %s", (title, provenance, status, workHref) => {
    const { container } = renderProject(title);

    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    const details = container.querySelector<HTMLElement>('[aria-label="Project details"]')!;
    expect(within(details).getByText(provenance)).toBeInTheDocument();
    expect(within(details).getByText(status)).toBeInTheDocument();
    expect(screen.getByText("Evidence boundary")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: siteActionLabels.viewWork })[0]).toHaveAttribute("href", workHref);
    expect(screen.getAllByRole("link", { name: primaryCallToAction.label })[0]).toHaveAttribute("href", "/contact");
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });
});
