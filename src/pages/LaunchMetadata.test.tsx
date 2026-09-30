import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "@/App";

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("launch metadata", () => {
  it("publishes complete homepage metadata", async () => {
    renderRoute("/");
    await screen.findByRole("heading", {
      level: 1,
      name: "We design and build brands, websites, digital products and systems.",
    });

    await waitFor(() => {
      expect(document.title).toBe("Echo in Ink — Creative Technology Studio in Auckland");
      expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
        "content",
        expect.stringMatching(/Auckland.*New Zealand/),
      );
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://echoin.ink/",
      );
      expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
        "content",
        "https://echoin.ink/home-hero-desktop.webp",
      );
      expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );

      const structuredData = JSON.parse(
        document.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}",
      );
      expect(structuredData["@graph"]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "@type": ["Organization", "ProfessionalService"],
            sameAs: ["https://github.com/EchoinInk"],
          }),
          expect.objectContaining({ "@type": "Person", name: "Alexandria Farley" }),
        ]),
      );
    });
  });

  it("publishes truthful project schema on case studies", async () => {
    renderRoute("/works/codexia");
    await screen.findByRole("heading", {
      level: 1,
      name: "Engineering work with authority, evidence and recovery built in.",
    });

    await waitFor(() => {
      const structuredData = JSON.parse(
        document.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}",
      );
      expect(structuredData).toEqual(
        expect.objectContaining({
          "@type": "CreativeWork",
          name: "Codexia",
          url: "https://echoin.ink/works/codexia",
        }),
      );
    });
  });

  it("canonicalises the Archive alias to Insights", async () => {
    renderRoute("/archive");
    await screen.findByRole("heading", { level: 1, name: "Writing, notes, and observations." });

    await waitFor(() => {
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://echoin.ink/insights",
      );
      expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
        "content",
        "https://echoin.ink/insights",
      );
    });
  });

  it("keeps wildcard responses out of search indexes", async () => {
    renderRoute("/not-a-public-route");
    await screen.findByRole("heading", { level: 1, name: "This signal has drifted out of range." });

    await waitFor(() => {
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex,follow",
      );
      expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    });
  });
});
