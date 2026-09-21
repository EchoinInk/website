import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Footer from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { primaryCallToAction, primaryNavigation } from "@/data/siteNavigation";

const primaryContract = [
  ["Studio", "/studio"],
  ["Work", "/works"],
  ["Services", "/services"],
  ["Insights", "/insights"],
  ["Contact", "/contact"]
];

function rect(top: number, bottom: number): DOMRect {
  return {
    top,
    bottom,
    left: 0,
    right: 1200,
    width: 1200,
    height: bottom - top,
    x: 0,
    y: top,
    toJSON: () => ({})
  };
}

describe("site navigation", () => {
  it("keeps the primary labels and destinations in one shared contract", () => {
    expect(primaryNavigation.map(({ label, href }) => [label, href])).toEqual(primaryContract);
    expect(primaryCallToAction).toMatchObject({
      label: "Start a Project",
      href: "/contact"
    });
  });

  it("renders the same primary taxonomy in the header and footer", () => {
    render(
      <MemoryRouter initialEntries={["/archive/notes"]}>
        <Header />
        <main data-theme="deep" />
        <Footer />
      </MemoryRouter>
    );

    const headerNav = screen.getByRole("navigation", {
      name: "Primary navigation"
    });
    const footerNav = screen.getByRole("navigation", {
      name: "Footer primary navigation"
    });

    primaryContract.forEach(([label, href]) => {
      expect(within(headerNav).getByRole("link", { name: label })).toHaveAttribute("href", href);
      expect(within(footerNav).getByRole("link", { name: label })).toHaveAttribute("href", href);
    });

    expect(within(headerNav).getByRole("link", { name: "Insights" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(within(headerNav).getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("switches contrast when a nested semantic section passes below the header", async () => {
    render(
      <MemoryRouter>
        <Header />
        <main data-theme="deep">
          <section data-theme="mist">Alternating surface</section>
        </main>
      </MemoryRouter>
    );

    const header = screen.getByRole("banner");
    const main = document.querySelector("main") as HTMLElement;
    const section = screen.getByText("Alternating surface").closest("section")!;
    let mainTop = 0;
    let sectionTop = 120;

    vi.spyOn(header, "getBoundingClientRect").mockImplementation(() => rect(0, 80));
    vi.spyOn(main, "getBoundingClientRect").mockImplementation(() =>
      rect(mainTop, mainTop + 1000)
    );
    vi.spyOn(section, "getBoundingClientRect").mockImplementation(() =>
      rect(sectionTop, sectionTop + 500)
    );

    fireEvent.scroll(window);
    await waitFor(() => {
      expect(header).toHaveAttribute("data-theme", "deep");
      expect(header).toHaveAttribute("data-header-surface", "dark");
    });

    sectionTop = 0;
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(header).toHaveAttribute("data-theme", "mist");
      expect(header).toHaveAttribute("data-header-surface", "light");
    });

    mainTop = 1000;
    sectionTop = 1000;
    delete document.documentElement.dataset.pageTheme;
    fireEvent.scroll(window);
    await waitFor(() => {
      expect(header).toHaveAttribute("data-theme", "mist");
    });
  });

  it("locks scrolling and restores focus when the mobile dialog closes", async () => {
    render(
      <MemoryRouter>
        <Header />
        <main data-theme="deep" />
      </MemoryRouter>
    );

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu"
    });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.body.style.overflow).toBe("hidden");

    await waitFor(() => {
      expect(within(dialog).getByRole("link", { name: "Studio" })).toHaveFocus();
    });

    const firstFocusable = within(dialog).getByRole("link", {
      name: "Echo in Ink home"
    });
    const lastFocusable = within(dialog).getByRole("link", {
      name: "Start a Project"
    });

    lastFocusable.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(firstFocusable).toHaveFocus();

    firstFocusable.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(lastFocusable).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveFocus();
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("uses the reduced-motion presentation when the user requests it", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    });

    render(
      <MemoryRouter>
        <Header />
        <main data-theme="deep" />
      </MemoryRouter>
    );

    expect(screen.getByRole("banner")).toHaveAttribute("data-reduced-motion", "true");

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByRole("dialog", { name: "Navigation" })).toHaveAttribute(
      "data-reduced-motion",
      "true"
    );
  });
});
