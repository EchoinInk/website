import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import {
  OrbitalVisual,
  type OrbitalVariant,
} from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  engagementModels,
  primaryCapabilities,
  type EngagementModelId,
  type ServiceCapabilityId,
} from "@/data/servicesContent";
import {
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const capabilityVisuals: Record<ServiceCapabilityId, OrbitalVariant> = {
  "brand-identity": "axiomRing",
  "websites-experiences": "memoryComet",
  "digital-products": "focusDial",
  "systems-automation": "quietAxis",
};

const engagementActions: Record<EngagementModelId, { label: string; href: string }> = {
  "strategy-sessions": { label: "Book a Strategy Session", href: "/booking" },
  "digital-reset": { label: "Start a Project", href: "/contact?inquiry=project" },
  "full-projects": { label: "Start a Project", href: "/contact?inquiry=project" },
};

export function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageShell
      title="Services — Echo in Ink"
      description="Brand identity, websites, digital products, custom systems and automation—shaped through strategy, design and technical implementation."
      atmosphere="default"
      theme="light"
      withTopSpacing={false}
      className="ei-services-page"
    >
      <Section
        theme="light"
        spacing="none"
        className="ei-services-hero"
        aria-labelledby="services-heading"
      >
        <div className="ei-services-hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="ei-services-hero-layout"
          >
            <motion.div variants={driftUp} className="ei-services-hero-copy">
              <SectionLabel label="Services" tone="accent" />
              <p className="ei-services-hero-kicker">What you can hire Echo in Ink to do</p>
              <h1 id="services-heading">
                Strategy, design and technology—shaped as one connected system.
              </h1>
              <p className="ei-services-hero-description">
                Echo helps founders, teams and growing businesses turn unclear ideas, outdated
                digital presence and operational friction into brands, experiences and systems
                that work.
              </p>
              <div className="ei-services-hero-actions">
                <Button to="/contact?inquiry=project">Start a Project</Button>
                <Button to="/works" variant="secondary">
                  View Work
                </Button>
              </div>
            </motion.div>

            <motion.ol variants={fadeSoft} className="ei-services-hero-index" aria-label="Services">
              {primaryCapabilities.map((capability, index) => (
                <li key={capability.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {capability.title}
                </li>
              ))}
            </motion.ol>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="capabilities"
        theme="lightElevated"
        spacing="none"
        className="ei-services-capabilities"
        aria-labelledby="services-capabilities-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-services-section-inner"
          >
            <motion.div variants={driftUp} className="ei-services-section-heading">
              <SectionLabel label="Primary capabilities" tone="accent" />
              <div>
                <h2 id="services-capabilities-heading">Four connected areas of practice.</h2>
                <p>
                  The work begins with the problem, not a predetermined deliverable. Strategy,
                  design and implementation are combined as the project requires.
                </p>
              </div>
            </motion.div>

            <div className="ei-services-capability-grid">
              {primaryCapabilities.map((capability, index) => (
                <motion.div key={capability.id} variants={driftUp}>
                  <EchoCard
                    variant={index === 1 ? "feature" : "static"}
                    padding="lg"
                    className="ei-services-capability-card"
                  >
                    <div className="ei-services-card-meta">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <OrbitalVisual variant={capabilityVisuals[capability.id]} size={66} />
                    </div>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeSoft} className="ei-services-capability-note">
              <span>One studio, one connected view.</span>
              <p>
                Echo can lead a complete engagement or focus on the part that is holding the wider
                work back.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="ways-to-work"
        theme="mist"
        transitionTo="deep"
        spacing="none"
        className="ei-services-engagements"
        aria-labelledby="services-engagements-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-services-section-inner"
          >
            <motion.div variants={driftUp} className="ei-services-section-heading">
              <SectionLabel label="Ways to work with Echo" tone="accent" />
              <div>
                <h2 id="services-engagements-heading">Choose the shape that fits the problem.</h2>
                <p>
                  Start with a focused decision, reset what no longer fits, or build something new
                  from end to end.
                </p>
              </div>
            </motion.div>

            <div className="ei-services-engagement-grid">
              {engagementModels.map((model, index) => {
                const action = engagementActions[model.id];

                return (
                  <motion.div key={model.id} variants={driftUp}>
                    <EchoCard
                      variant={index === 1 ? "offer" : "static"}
                      padding="lg"
                      className="ei-services-engagement-card"
                    >
                      <span className="ei-services-engagement-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{model.title}</h3>
                      <p>{model.description}</p>
                      <Button to={action.href} variant="tertiary">
                        {action.label}
                        <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                          →
                        </span>
                      </Button>
                    </EchoCard>
                  </motion.div>
                );
              })}
            </div>

            <motion.p variants={fadeSoft} className="ei-services-engagement-note">
              Not sure which shape is right? Start with the problem. Echo will recommend the
              smallest engagement that can move it forward properly.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section theme="deep" spacing="none" className="ei-services-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="Begin with the work"
          heading="Bring the challenge. We’ll find the right shape for it."
          body="Whether you need one clear decision or an end-to-end build, the first step is a straightforward conversation about what needs to change."
          actions={
            <>
              <Button to="/contact?inquiry=project">Start a Project</Button>
              <Button to="/booking" variant="secondary">
                Book a Strategy Session
              </Button>
              <Button to="/works" variant="tertiary">
                View Work
                <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                  →
                </span>
              </Button>
            </>
          }
        />
      </Section>
    </PageShell>
  );
}
