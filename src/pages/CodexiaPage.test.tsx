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
  it("publishes the complete, evidence-bounded Codexia narrative", () => {
    const { container } = renderPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Engineering authority, evidence and recovery built into the work itself.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The opportunity was never another code generator." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Make the lifecycle visible. Keep each authority in its lane." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One engineering lifecycle. Multiple working surfaces." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Define" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Complete" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What is shown. And what is not claimed." })).toBeInTheDocument();
    expect(screen.getByText("Advanced Working Prototype")).toBeInTheDocument();
    expect(screen.getByText("Enterprise certification")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /Codexia/i }).length).toBeGreaterThanOrEqual(4);
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it("keeps local and lower project navigation legible", () => {
    renderPage();

    const localNav = screen.getByRole("navigation", { name: "Codexia case study sections" });
    expect(within(localNav).getByRole("link", { name: /Lifecycle/i })).toHaveAttribute(
      "href",
      "#system-model",
    );
    expect(within(localNav).getByRole("link", { name: /Current state/i })).toHaveAttribute(
      "href",
      "#current-state",
    );

    const projectNav = screen.getByRole("navigation", { name: "Explore other projects" });
    expect(within(projectNav).getByText("Keystone", { exact: false })).toBeInTheDocument();
    expect(within(projectNav).getByText("LUMO", { exact: false })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Lumo/i })).toHaveAttribute(
      "href",
      "/works/lumo",
    );
  });
});
