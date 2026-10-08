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

const capabilityProblems: Record<
  ServiceCapabilityId,
  { prompt: string; outcome: string; mobileOutcome: string }
> = {
  "brand-identity": {
    prompt: "When what you've become no longer matches how you're seen.",
    outcome:
      "Strategy, positioning, messaging, and visual identity systems that reflect what the organisation has become—and where it is headed.",
    mobileOutcome:
      "Strategy, positioning, messaging, and identity systems that reflect what the organisation has become."
  },
  "websites-experiences": {
    prompt: "When your digital presence needs more than a refresh.",
    outcome:
      "Websites, interfaces, and digital experiences that make the business clearer, easier to use, and more effective.",
    mobileOutcome:
      "Websites and digital experiences that make the business clearer, easier to use, and more effective."
  },
  "digital-products": {
    prompt: "When an idea needs structure and momentum.",
    outcome:
      "Product strategy, UX, interaction design, and implementation that turn promising ideas into coherent, usable products.",
    mobileOutcome:
      "Product strategy, UX, and implementation that turn promising ideas into coherent, usable products."
  },
  "systems-automation": {
    prompt: "When manual work creates unnecessary friction.",
    outcome:
      "Operational systems, tools, workflows, and automation that reduce repetitive work and make complexity easier to manage.",
    mobileOutcome:
      "Systems, workflows, and automation that reduce repetitive work and make complexity easier to manage."
  }
};

interface WhatWeCreateProps {
  capabilities?: readonly ServiceCapability[];
}

export function WhatWeCreate({ capabilities = primaryCapabilities }: WhatWeCreateProps) {
  return (
    <Section
      theme="lightElevated"
      transition="chapter"
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
                <span>Different challenges.</span> <span>One connected practice.</span>
              </h2>
            </div>

            <div className="ei-home-section-support">
              <p className="ei-home-section-intro">
                Brand, experience, product, and systems rarely exist in isolation. Bringing them
                together creates work that is more cohesive, useful, and built to last.
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
                    </div>

                    <h3>{capability.title}</h3>

                    <span className="ei-home-capability-label">
                      {capabilityProblems[capability.id].prompt}
                    </span>

                    <p>
                      <span className="ei-home-capability-outcome-full">
                        {capabilityProblems[capability.id].outcome}
                      </span>
                      <span className="ei-home-capability-outcome-mobile">
                        {capabilityProblems[capability.id].mobileOutcome}
                      </span>
                    </p>

                    <span className="sr-only">{capability.description}</span>

                    <span className="ei-card-action">
                      Explore{" "}
                      {capability.id === "websites-experiences"
                        ? "Experiences"
                        : capability.title.split(" ")[0]}
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
