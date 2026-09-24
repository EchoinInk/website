import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi } from "vitest";

import {
  brandIdentityCapability,
  brandWorldsCapability,
  primaryCapabilities,
  strategySessionsEngagement,
} from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
import { IdentityPage } from "@/pages/IdentityPage";
import { SessionsPage } from "@/pages/SessionsPage";
import { WorldsPage } from "@/pages/WorldsPage";

function renderPage(page: React.ReactNode) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>,
  );
}

function directThemes(container: HTMLElement, pageClass: string) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(`.${pageClass} > div > [data-theme]`),
  ).map((section) => ({
    theme: section.dataset.theme,
    transitionTo: section.dataset.transitionTo,
  }));
}

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Phase 7 capability and engagement contracts", () => {
  it("makes Identity the shared Brand & Identity capability", () => {
    const { container } = renderPage(<IdentityPage />);
    const page = container.querySelector<HTMLElement>(".ei-identity-page")!;

    expect(within(page).getByText(brandIdentityCapability.description)).toBeInTheDocument();
    expect(within(page).getByRole("heading", { level: 1, name: "Every world begins with a feeling." })).toBeInTheDocument();
    ["Brand strategy", "Visual identity", "Identity systems", "Digital expression"].forEach((label) => {
      expect(within(page).getByRole("heading", { level: 3, name: label })).toBeInTheDocument();
    });
    expect(within(page).getAllByRole("link", { name: primaryCallToAction.label })[0]).toHaveAttribute(
      "href",
      primaryCallToAction.href,
    );
  });

  it("presents Strategy Sessions as a concrete standalone engagement with the booking destination", () => {
    const { container } = renderPage(<SessionsPage />);
    const page = container.querySelector<HTMLElement>(".ei-sessions-page")!;

    expect(within(page).getByText(strategySessionsEngagement.description)).toBeInTheDocument();
    expect(within(page).getByRole("heading", { level: 2, name: "A Strategy Session can stand alone." })).toBeInTheDocument();
    expect(within(page).getAllByRole("link", { name: strategySessionsEngagement.cta })[0]).toHaveAttribute(
      "href",
      "/booking",
    );
    expect(within(page).getAllByRole("link", { name: primaryCallToAction.label })[0]).toHaveAttribute(
      "href",
      primaryCallToAction.href,
    );

    ["Website direction", "Brand clarity", "Product direction", "Digital strategy", "UX problems", "Technical scoping"].forEach((label) => {
      expect(within(page).getByRole("heading", { level: 3, name: label })).toBeInTheDocument();
    });
  });

  it("keeps Brand Worlds outside the four primary capabilities", () => {
    expect(primaryCapabilities).toHaveLength(4);
    expect(primaryCapabilities.some((capability) => capability.title === brandWorldsCapability.title)).toBe(false);

    const { container } = renderPage(<WorldsPage />);
    const page = container.querySelector<HTMLElement>(".ei-worlds-page")!;
    expect(within(page).getByText(brandWorldsCapability.description)).toBeInTheDocument();
    expect(within(page).getByText(/not a fifth core service/i)).toBeInTheDocument();
  });

  it("makes the Identity and Worlds relationship explicit in both directions", () => {
    const identity = renderPage(<IdentityPage />);
    const identityPage = identity.container.querySelector<HTMLElement>(".ei-identity-page")!;
    expect(within(identityPage).getByText(/Brand & Identity establishes the system/i)).toBeInTheDocument();
    expect(within(identityPage).getByRole("link", { name: "Explore Brand Worlds" })).toHaveAttribute("href", "/worlds");
    identity.unmount();

    const worlds = renderPage(<WorldsPage />);
    const worldsPage = worlds.container.querySelector<HTMLElement>(".ei-worlds-page")!;
    expect(within(worldsPage).getByText(/Brand & Identity establishes the system/i)).toBeInTheDocument();
    expect(within(worldsPage).getAllByRole("link", { name: "Explore Brand & Identity" })[0]).toHaveAttribute("href", "/identity");
  });

  it("uses the intended semantic theme and transition sequences", () => {
    const identity = renderPage(<IdentityPage />);
    expect(directThemes(identity.container, "ei-identity-page")).toEqual([
      { theme: "light", transitionTo: undefined },
      { theme: "lightElevated", transitionTo: "mist" },
      { theme: "mist", transitionTo: "light" },
      { theme: "light", transitionTo: "lightElevated" },
      { theme: "lightElevated", transitionTo: undefined },
    ]);
    identity.unmount();

    const sessions = renderPage(<SessionsPage />);
    expect(directThemes(sessions.container, "ei-sessions-page")).toEqual([
      { theme: "light", transitionTo: undefined },
      { theme: "lightElevated", transitionTo: undefined },
      { theme: "mist", transitionTo: "light" },
      { theme: "light", transitionTo: "lightElevated" },
      { theme: "lightElevated", transitionTo: "mist" },
      { theme: "mist", transitionTo: undefined },
    ]);
    sessions.unmount();

    const worlds = renderPage(<WorldsPage />);
    expect(directThemes(worlds.container, "ei-worlds-page")).toEqual([
      { theme: "light", transitionTo: undefined },
      { theme: "lightElevated", transitionTo: "mist" },
      { theme: "mist", transitionTo: "light" },
      { theme: "light", transitionTo: "lightElevated" },
      { theme: "lightElevated", transitionTo: undefined },
    ]);
  });
});
