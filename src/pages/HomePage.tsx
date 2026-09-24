import { ClosingSection } from "@/components/home/HomeClosingSection";
import { LumoCaseStudyTeaser } from "@/components/home/HomeFeaturedLumo";
import { Hero } from "@/components/home/HomeHero";
import { Philosophy } from "@/components/home/HomePhilosophySection";
import { HomeSelectedWork } from "@/components/home/HomeSelectedWork";
import { HomeStartHere } from "@/components/home/HomeStartHere";
import { WhatWeCreate } from "@/components/home/HomeWhatWeCreate";
import { PageShell } from "@/components/layout/PageShell";

export function HomePage() {
  return (
    <PageShell
      id="main-content"
      title="Echo in Ink — Creative Technology Studio"
      description="Echo in Ink brings strategy, design and development together to create thoughtful brands, websites, digital products and systems."
      atmosphere="default"
      theme="light"
      footerTheme="light"
      withTopSpacing={false}
      className="ei-home-page"
    >
      <Hero />
      <WhatWeCreate />
      <HomeSelectedWork />
      <HomeStartHere />
      <LumoCaseStudyTeaser />
      <Philosophy />
      <ClosingSection />
    </PageShell>
  );
}
