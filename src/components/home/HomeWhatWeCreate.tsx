import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  primaryCapabilities,
  type ServiceCapability,
  type ServiceCapabilityId
} from "@/data/servicesContent";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const capabilityVisuals: Record<
  ServiceCapabilityId,
  { variant: OrbitalVariant; tone: "halo" | "violet" | "magenta" | "ice" }
> = {
  "brand-identity": { variant: "axiomRing", tone: "halo" },
  "websites-experiences": { variant: "memoryComet", tone: "violet" },
  "digital-products": { variant: "focusDial", tone: "magenta" },
  "systems-automation": { variant: "quietAxis", tone: "ice" }
};

const capabilityProblems: Record<ServiceCapabilityId, { prompt: string; outcome: string }> = {
  "brand-identity": {
    prompt: "When the company has evolved",
    outcome: "Strategy, positioning and identity systems that reflect what you’ve become."
  },
  "websites-experiences": {
    prompt: "When the website no longer fits",
    outcome: "Digital strategy, UX/UI and development for clearer, more effective experiences."
  },
  "digital-products": {
    prompt: "When an idea needs structure",
    outcome: "Product strategy, interface design and implementation for real-world use."
  },
  "systems-automation": {
    prompt: "When manual work creates friction",
    outcome: "Internal tools, workflow design, integrations and automation to reduce complexity."
  }
};

interface WhatWeCreateProps {
  capabilities?: readonly ServiceCapability[];
}

export function WhatWeCreate({ capabilities = primaryCapabilities }: WhatWeCreateProps) {
  return (
    <Section
      theme="lightElevated"
      transitionTo="light"
      spacing="none"
      className="ei-home-capabilities"
      aria-labelledby="home-capabilities-heading"
    >
      <Container size="xl" className="relative z-10">
        <motion.div
          variants={staggerContainer(STAGGER.loose, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
          className="ei-home-section-inner"
        >
          <motion.div variants={driftUp} className="ei-home-section-header">
            <div>
              <SectionLabel label="Areas of Practice" tone="accent" />
              <h2 id="home-capabilities-heading" className="ei-type-section-heading">
                <span>Different challenges.</span> <span>A connected approach.</span>
              </h2>
            </div>
            <div className="ei-home-section-support">
              <p className="ei-home-section-intro">
                Brand, experience, product and systems are deeply connected. We shape the visible
                and the structural together — from strategy and design through to implementation —
                so the work feels coherent and works in the real world.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-capability-grid">
            {capabilities.map((capability) => {
              const visual = capabilityVisuals[capability.id];

              return (
                <motion.article key={capability.id} variants={driftUp}>
                  <Link
                    to={capability.href}
                    className="ei-home-capability-item"
                    data-tone={visual.tone}
                    aria-label={`Explore ${capability.title}`}
                  >
                    <div className="ei-home-capability-meta">
                      <OrbitalVisual variant={visual.variant} size={62} />
                      <span aria-hidden="true">→</span>
                    </div>
                    <h3>{capability.title}</h3>
                    <span className="ei-home-capability-label">
                      {capabilityProblems[capability.id].prompt}
                    </span>
                    <p>{capabilityProblems[capability.id].outcome}</p>
                    <span className="sr-only">{capability.description}</span>
                    <span className="ei-card-action">
                      Explore {capability.title.split(" ")[0]}
                      <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                        →
                      </span>
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
