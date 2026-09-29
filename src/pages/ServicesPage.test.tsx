import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import {
  engagementModels,
  primaryCapabilities,
  strategySessionPricingPolicy,
} from "@/data/servicesContent";
import { ServicesPage } from "@/pages/ServicesPage";

function renderServicesPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Services engagement guidance", () => {
  it("keeps the four canonical practice areas and distinguishes all three engagement paths", () => {
    const { container } = renderServicesPage();
    const page = container.querySelector<HTMLElement>(".ei-services-page")!;

    expect(primaryCapabilities).toHaveLength(4);
    primaryCapabilities.forEach((capability) => {
      expect(
        within(page).getByRole("heading", { level: 3, name: capability.title }),
      ).toBeInTheDocument();
    });

    engagementModels.forEach((model) => {
      const heading = within(page).getByRole("heading", { level: 3, name: model.title });
      const card = heading.closest("article, [data-variant]")!;

      expect(within(card).getByText(model.bestFor)).toBeInTheDocument();
      expect(within(card).getByText(model.typicalScope)).toBeInTheDocument();
      expect(within(card).getByText(model.possibleOutcomes)).toBeInTheDocument();
      expect(within(card).getByText(model.nextAction)).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: model.cta })).toHaveAttribute(
        "href",
        model.href,
      );
    });

    expect(
      within(page).getByText(/smallest engagement that can move it forward properly/i),
    ).toBeInTheDocument();
    expect(within(page).getByText(strategySessionPricingPolicy)).toBeInTheDocument();
    expect(
      within(page).getByText(/no session or fee is accepted at this stage/i),
    ).toBeInTheDocument();
  });
});
