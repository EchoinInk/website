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
                Four connected areas of practice.
              </h2>
              <p className="ei-home-section-intro">
                Strategy, design and development are shaped together, so the idea and the thing
                people experience stay connected.
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
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
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
