import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  OrbitalVisual,
  type OrbitalVariant,
} from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  primaryCapabilities,
  type ServiceCapability,
  type ServiceCapabilityId,
} from "@/data/servicesContent";
import {
  driftUp,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const capabilityVisuals: Record<
  ServiceCapabilityId,
  { variant: OrbitalVariant; tone: "halo" | "violet" | "magenta" | "ice" }
> = {
  "brand-identity": { variant: "axiomRing", tone: "halo" },
  "websites-experiences": { variant: "memoryComet", tone: "violet" },
  "digital-products": { variant: "focusDial", tone: "magenta" },
  "systems-automation": { variant: "quietAxis", tone: "ice" },
};

const capabilityProblems: Record<ServiceCapabilityId, { prompt: string; outcome: string }> = {
  "brand-identity": {
    prompt: "Your brand no longer says what the business has become.",
    outcome: "Clarify the positioning, identity and digital expression so people understand and recognise it."
  },
  "websites-experiences": {
    prompt: "Your website looks present, but it is not doing enough.",
    outcome: "Turn it into a clear, useful experience that helps the right people understand and act."
  },
  "digital-products": {
    prompt: "The product idea is strong, but the experience is still unresolved.",
    outcome: "Shape the strategy, interface and product system into something coherent enough to test or build."
  },
  "systems-automation": {
    prompt: "Manual work and disconnected tools are slowing the team down.",
    outcome: "Design focused software, integrations or automation around the way the work actually needs to move."
  }
};

interface WhatWeCreateProps {
  capabilities?: readonly ServiceCapability[];
}

export function WhatWeCreate({
  capabilities = primaryCapabilities,
}: WhatWeCreateProps) {
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
            <SectionLabel label="What Echo Does" tone="accent" />
            <div>
              <h2 id="home-capabilities-heading" className="ei-type-section-heading">
                Start with the problem, then combine the right capabilities.
              </h2>
              <p className="ei-home-section-intro">
                You do not need to diagnose the discipline before getting in touch. Echo connects
                brand, digital experience, product and systems work around the outcome you need.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-capability-grid">
            {capabilities.map((capability, index) => {
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
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <OrbitalVisual variant={visual.variant} size={62} />
                    </div>
                    <span className="ei-home-capability-label">{capability.title}</span>
                    <h3>{capabilityProblems[capability.id].prompt}</h3>
                    <p>{capabilityProblems[capability.id].outcome}</p>
                    <span className="sr-only">{capability.description}</span>
                    <span className="ei-card-action">
                      Explore
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
