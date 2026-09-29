import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { CodexiaPage } from "@/pages/CodexiaPage";

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <CodexiaPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Codexia case study", () => {
  it("publishes a complete, truthful project narrative with repository-backed evidence", () => {
    const { container } = renderPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Engineering work with authority, evidence and recovery built in.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Problem / opportunity")).toBeInTheDocument();
    expect(screen.getByText("Constraints")).toBeInTheDocument();
    expect(screen.getByText("Echo's role")).toBeInTheDocument();
    expect(screen.getByText("Product / system architecture")).toBeInTheDocument();
    expect(screen.getByText("Interface and implementation evidence")).toBeInTheDocument();
    expect(screen.getByText("Current development state")).toBeInTheDocument();
    expect(screen.getByText("What the project demonstrates")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What is shown—and what is not claimed." })).toBeInTheDocument();
    expect(screen.getByText(/No public launch, customer adoption, commercial outcome/i)).toBeInTheDocument();
    expect(screen.getAllByText(/approved implementation target/i).length).toBeGreaterThan(0);
    expect(screen.getByText("app/api/engineering/route.ts")).toBeInTheDocument();
    expect(screen.getByText("lib/platform-integration/service.ts")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /Codexia/i }).length).toBeGreaterThanOrEqual(4);
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it("keeps local and lower project navigation legible", () => {
    renderPage();

    const localNav = screen.getByRole("navigation", { name: "Codexia case study sections" });
    expect(within(localNav).getByRole("link", { name: /Architecture/i })).toHaveAttribute(
      "href",
      "#architecture",
    );
    expect(within(localNav).getByRole("link", { name: /Evidence boundary/i })).toHaveAttribute(
      "href",
      "#evidence-boundary",
    );

    const projectNav = screen.getByRole("navigation", { name: "Explore other projects" });
    expect(within(projectNav).getByText("Keystone", { exact: false })).toBeInTheDocument();
    expect(within(projectNav).getByText("LUMO", { exact: false })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Lumo case study" })).toHaveAttribute(
      "href",
      "/works/lumo",
    );
  });
});
