import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";

describe("semantic theme primitives", () => {
  it("uses Moonlight as the PageShell default and exposes it to document chrome", () => {
    const { unmount } = render(
      <HelmetProvider>
        <MemoryRouter>
          <PageShell withFooter={false}>Moonlight</PageShell>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("data-theme", "light");
    expect(document.documentElement).toHaveAttribute("data-page-theme", "light");

    unmount();
    expect(document.documentElement).not.toHaveAttribute("data-page-theme");
  });

  it("keeps section contrast separate from PageShell atmosphere", () => {
    render(
      <Section theme="mist" spacing="compact">
        <span>Muted surface</span>
      </Section>,
    );

    expect(screen.getByText("Muted surface").closest("section")).toHaveAttribute(
      "data-theme",
      "mist",
    );
  });
});
