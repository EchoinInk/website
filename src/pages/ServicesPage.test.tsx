import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { primaryCapabilities } from "@/data/servicesContent";
import { ServicesPage } from "@/pages/ServicesPage";

function renderServicesPage() {
  return render(
    <HelmetProvider><MemoryRouter><ServicesPage /></MemoryRouter></HelmetProvider>
  );
}

describe("Services page", () => {
  it("keeps the four canonical practices and explains their outputs", () => {
    const { container } = renderServicesPage();
    const capabilities = container.querySelector<HTMLElement>("#capabilities")!;

    expect(primaryCapabilities).toHaveLength(4);
    primaryCapabilities.forEach((capability) => {
      expect(within(capabilities).getByRole("heading", { level: 3, name: capability.title })).toBeInTheDocument();
    });
    expect(within(capabilities).getAllByRole("heading", { level: 4, name: "Typical outputs" })).toHaveLength(4);
    expect(within(capabilities).getByText("Naming & verbal direction")).toBeInTheDocument();
    expect(within(capabilities).getByText("Operational interfaces")).toBeInTheDocument();
  });

  it("provides distinct proof, engagement guidance and valid primary routes", () => {
    const { container } = renderServicesPage();
    const page = container.querySelector<HTMLElement>(".ei-services-page")!;
    const jumpNavigation = within(page).getByRole("navigation", { name: "On this page" });

    expect(within(jumpNavigation).getByRole("link", { name: "Proof" })).toHaveAttribute("href", "#evidence");
    const evidence = page.querySelector<HTMLElement>("#evidence")!;
    expect(within(evidence).getAllByRole("article")).toHaveLength(4);
    expect(within(evidence).getAllByText("What you receive")).toHaveLength(4);
    expect(within(evidence).getAllByText("What you can inspect")).toHaveLength(4);
    expect(within(evidence).getAllByText("What success looks like")).toHaveLength(4);

    expect(within(page).getByRole("heading", { level: 3, name: "Strategy Session" })).toBeInTheDocument();
    expect(within(page).getByRole("heading", { level: 3, name: "Digital Reset" })).toBeInTheDocument();
    expect(within(page).getByRole("heading", { level: 3, name: "Full Project" })).toBeInTheDocument();
    expect(within(page).getByRole("link", { name: "Request a Strategy Session" })).toHaveAttribute("href", "/booking");
    expect(screen.getByText(/pure production overflow/i)).toBeInTheDocument();
  });
});
