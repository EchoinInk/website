import { Helmet } from "react-helmet-async";

import { ClosingSection } from "@/components/home/HomeClosingSection";
import { LumoCaseStudyTeaser } from "@/components/home/HomeFeaturedLumo";
import { Hero } from "@/components/home/HomeHero";
import { Philosophy } from "@/components/home/HomePhilosophySection";
import { HomeProofStrip } from "@/components/home/HomeProofStrip";
import { HomeStartHere } from "@/components/home/HomeStartHere";
import { EmergingSystems } from "@/components/home/HomeOurSystems";
import { WhatWeCreate } from "@/components/home/HomeWhatWeCreate";
import { PageShell } from "@/components/layout/PageShell";

export function HomePage() {
  return (
    <PageShell id="main-content" atmosphere="default" theme="deep" withTopSpacing={false}>
      <Helmet>
        <title>Echo in Ink — We design worlds</title>
        <meta
          name="description"
          content="Echo in Ink is a cinematic design studio crafting identity systems, immersive websites, and atmospheric digital worlds for founders, artists, and emerging brands."
        />
      </Helmet>

      {/* ── HERO — Cinematic world entry ─────────────────────── */}
      <Hero />

      {/* ── PROOF STRIP — Early evidence without metrics ─────── */}
      <HomeProofStrip />

      {/* ── START HERE — Practical decision point ────────────── */}
      <HomeStartHere />

      {/* ── PHILOSOPHY — Atmospheric worldview ───────────────── */}
      <Philosophy />

      {/* ── WHAT WE CREATE — 4 transformation card types ─────── */}
      <WhatWeCreate />

      {/* ── FEATURED WORK — LUMO proof anchor ────────────────── */}
      <LumoCaseStudyTeaser />

      {/* ── OUR SYSTEMS — Infrastructure signal ──────────────── */}
      <EmergingSystems />

      {/* ── CLOSING CTA — Ecosystem invitation ───────────────── */}
      <ClosingSection />
    </PageShell>
  );
}
