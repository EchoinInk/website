import { useLayoutEffect, useRef, useState } from "react";

import type { SemanticTheme } from "@/components/layout/PageShell";

const semanticThemes = new Set<SemanticTheme>([
  "light",
  "lightElevated",
  "mist",
  "atmospheric",
  "deep"
]);

function readSemanticTheme(value?: string): SemanticTheme | undefined {
  return value && semanticThemes.has(value as SemanticTheme) ? (value as SemanticTheme) : undefined;
}

export function getThemeBelowHeader(header: HTMLElement) {
  const headerRect = header.getBoundingClientRect();
  const probeY =
    headerRect.height > 0
      ? headerRect.top + headerRect.height * 0.75
      : Math.max(headerRect.bottom - 1, 0);
  let detectedTheme: SemanticTheme | undefined;

  document
    .querySelectorAll<HTMLElement>("main[data-theme], main [data-theme]")
    .forEach((surface) => {
      const theme = readSemanticTheme(surface.dataset.theme);
      const rect = surface.getBoundingClientRect();

      if (theme && rect.top <= probeY && rect.bottom > probeY) {
        // The query is in document order, so a nested section naturally wins
        // over its containing PageShell when both occupy the probe line.
        detectedTheme = theme;
      }
    });

  return detectedTheme;
}

export function useSectionAwareTheme() {
  const headerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number>();
  const [theme, setTheme] = useState<SemanticTheme>(() => {
    return readSemanticTheme(document.documentElement.dataset.pageTheme) ?? "light";
  });

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const sampleTheme = () => {
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(() => {
        const surfaceTheme = getThemeBelowHeader(header);
        const pageTheme = readSemanticTheme(document.documentElement.dataset.pageTheme);

        // Retaining the current value when neither surface exists avoids a
        // light/dark flash while AnimatePresence swaps route trees.
        setTheme((currentTheme) => surfaceTheme ?? pageTheme ?? currentTheme);
        frameRef.current = undefined;
      });
    };

    sampleTheme();
    window.addEventListener("scroll", sampleTheme, { passive: true });
    window.addEventListener("resize", sampleTheme);

    const resizeObserver = new ResizeObserver(sampleTheme);
    resizeObserver.observe(header);

    const mutationObserver = new MutationObserver(sampleTheme);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-page-theme", "data-theme"],
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener("scroll", sampleTheme);
      window.removeEventListener("resize", sampleTheme);
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    headerRef,
    theme,
    family: theme === "atmospheric" || theme === "deep" ? "dark" : "light"
  } as const;
}
