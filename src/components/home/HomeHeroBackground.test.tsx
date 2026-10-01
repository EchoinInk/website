import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBackground } from "@/components/home/HomeHeroBackground";

describe("homepage hero background", () => {
  it("keeps its full-width atmospheric mask instead of the shared right-column crop", () => {
    const { container } = render(<HeroBackground />);
    const picture = container.querySelector("picture");

    expect(picture).toHaveClass("ei-home-hero-picture");
    expect(picture).not.toHaveClass("ei-hero-system-media");
  });
});
