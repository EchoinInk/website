import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

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

  it("publishes optional atmospheric direction without changing the default contract", () => {
    const { rerender } = render(
      <Section theme="light" transition="atmospheric" transitionTo="mist">
        Directional transition
      </Section>,
    );

    const section = screen.getByText("Directional transition").closest("section");
    expect(section).toHaveAttribute("data-transition", "atmospheric");
    expect(section).toHaveAttribute("data-transition-to", "mist");
    expect(section).not.toHaveAttribute("data-transition-direction");

    rerender(
      <Section
        theme="light"
        transition="atmospheric"
        transitionDirection="forward"
        transitionTo="mist"
      >
        Directional transition
      </Section>,
    );
    expect(section).toHaveAttribute("data-transition-direction", "forward");

    rerender(
      <Section
        theme="light"
        transition="atmospheric"
        transitionDirection="reverse"
        transitionTo="mist"
      >
        Directional transition
      </Section>,
    );
    expect(section).toHaveAttribute("data-transition-direction", "reverse");
  });
});
