import { ClosingSection } from "@/components/home/HomeClosingSection";
import { HomeCredibility } from "@/components/home/HomeCredibility";
import { HomeDelivery } from "@/components/home/HomeDelivery";
import { LumoCaseStudyTeaser } from "@/components/home/HomeFeaturedLumo";
import { Hero } from "@/components/home/HomeHero";
import { Philosophy } from "@/components/home/HomePhilosophySection";
import { HomeSelectedWork } from "@/components/home/HomeSelectedWork";
import { HomeStartHere } from "@/components/home/HomeStartHere";
import { WhatWeCreate } from "@/components/home/HomeWhatWeCreate";
import { PageShell } from "@/components/layout/PageShell";
import { homepageStructuredData } from "@/lib/structuredData";

export function HomePage() {
  return (
    <PageShell
      id="main-content"
      title="Echo in Ink — Creative Technology Studio in Auckland"
      description="Auckland creative technology studio bringing strategy, design and development together for thoughtful brands, websites, digital products and systems across New Zealand."
      structuredData={homepageStructuredData}
      atmosphere="default"
      theme="light"
      footerTheme="light"
      withTopSpacing={false}
      className="ei-home-page"
    >
      <Hero />
      <HomeCredibility />
      <HomeSelectedWork />
      <WhatWeCreate />
      <HomeStartHere />
      <LumoCaseStudyTeaser />
      <HomeDelivery />
      <Philosophy />
      <ClosingSection />
    </PageShell>
  );
}
