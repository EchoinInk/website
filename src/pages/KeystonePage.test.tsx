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
    </HelmetProvider>
  );
}

describe("Keystone case study", () => {
  it("publishes a substantive internal study with an explicit evidence boundary", () => {
    const { container } = renderPage();

    expect(
      screen.getByRole("heading", { level: 1, name: /calmer control centre/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Internal project")).toBeInTheDocument();
    expect(screen.getByText("Exploratory / high-fidelity prototype")).toBeInTheDocument();
    expect(screen.getByText("Product model and interface composition")).toBeInTheDocument();

    const localNav = screen.getByRole("navigation", { name: "Keystone case study sections" });
    expect(within(localNav).getByRole("link", { name: /Opportunity/i })).toHaveAttribute(
      "href",
      "#opportunity"
    );
    expect(within(localNav).getByRole("link", { name: /Evidence/i })).toHaveAttribute(
      "href",
      "#evidence"
    );

    expect(screen.getAllByRole("heading", { name: "Commitments" })).toHaveLength(2);
    expect(screen.getByRole("heading", { name: /Build the operating model/i })).toBeInTheDocument();
    expect(
      screen.getByLabelText("Keystone before and after information model")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /What must you know in 10 seconds/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /A product system built in a deliberate sequence/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Strategic product thinking/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/No client, live data layer/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "View Codexia case study" })).toHaveAttribute(
      "href",
      "/works/codexia"
    );
    expect(screen.getByRole("navigation", { name: "Explore other projects" })).toBeInTheDocument();
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it("uses semantic, text-based artifacts without the fictional dashboard image", () => {
    const { container } = renderPage();

    expect(screen.getAllByRole("figure")[0]).toHaveTextContent(
      "High-fidelity interface composition"
    );
    expect(
      screen.getByLabelText("Keystone before and after information model")
    ).toBeInTheDocument();
    expect(container.querySelector('img[src*="keystone-home"]')).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Total Revenue|Riverside Studio|Active Clients/i)
    ).not.toBeInTheDocument();
  });
});
