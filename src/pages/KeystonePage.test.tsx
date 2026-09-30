import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { KeystonePage } from "@/pages/KeystonePage";

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <KeystonePage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Keystone case study", () => {
  it("publishes a substantive internal study with an explicit evidence boundary", () => {
    const { container } = renderPage();

    expect(screen.getByRole("heading", { level: 1, name: /calmer control centre/i })).toBeInTheDocument();

    const details = container.querySelector<HTMLElement>('[aria-label="Project details"]')!;
    expect(within(details).getByText("Internal Project")).toBeInTheDocument();
    expect(within(details).getByText("Exploratory Study")).toBeInTheDocument();
    expect(within(details).getByText("Exploratory evidence")).toBeInTheDocument();

    const localNav = screen.getByRole("navigation", { name: "Keystone case study sections" });
    expect(within(localNav).getByRole("link", { name: /Context/i })).toHaveAttribute("href", "#context");
    expect(within(localNav).getByRole("link", { name: /Evidence boundary/i })).toHaveAttribute("href", "#evidence-boundary");

    expect(screen.getByRole("heading", { name: "Context" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Problem / opportunity" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Constraints" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Echo's role" })).toBeInTheDocument();
    expect(screen.getByText("Documented artifact set")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /developed product direction/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Strategic product thinking/i })).toBeInTheDocument();
    expect(screen.getByText(/It is not client work/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "View Codexia case study" })).toHaveAttribute("href", "/works/codexia");
    expect(screen.getByRole("navigation", { name: "Explore other projects" })).toBeInTheDocument();
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it("uses semantic, text-based artifacts without the fictional dashboard image", () => {
    const { container } = renderPage();

    expect(screen.getByRole("figure")).toHaveTextContent("Interface composition study");
    expect(screen.getByLabelText("Keystone information architecture")).toBeInTheDocument();
    expect(container.querySelector('img[src*="keystone-home"]')).not.toBeInTheDocument();
    expect(screen.queryByText(/Total Revenue|Riverside Studio|Active Clients/i)).not.toBeInTheDocument();
  });
});
