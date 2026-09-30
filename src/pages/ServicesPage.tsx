import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { PageJumpLinks } from "@/components/navigation/PageJumpLinks";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  engagementModels,
  primaryCapabilities,
  strategySessionPricingPolicy,
  type ServiceCapabilityId
} from "@/data/servicesContent";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

import codexiaWorkspace from "@/assets/projects/codexia/execution-workspace.jpg";
import lumoInterface from "@/assets/imagery/sections/lumo-featured-bg.webp";

const capabilityVisuals: Record<ServiceCapabilityId, OrbitalVariant> = {
  "brand-identity": "axiomRing",
  "websites-experiences": "memoryComet",
  "digital-products": "focusDial",
  "systems-automation": "quietAxis"
};

const serviceEvidence = [
  {
    id: "brand-identity",
    eyebrow: "Identity system",
    title: "From signals to a recognisable system",
    description:
      "Position, voice and visual decisions are connected to the touchpoints where the identity has to work.",
    href: "/identity",
    linkLabel: "See the identity system",
    labels: ["Position", "Voice", "Visual language", "Digital expression"]
  },
  {
    id: "websites-experiences",
    eyebrow: "Annotated interface",
    title: "A journey made visible before it is built",
    description:
      "Page hierarchy, interaction and responsive behaviour are reviewed as one connected experience.",
    href: "/works/lumo",
    linkLabel: "View interface evidence",
    labels: ["01 Entry", "02 Orientation", "03 Action", "04 Response"],
    image: lumoInterface
  },
  {
    id: "digital-products",
    eyebrow: "Product flow",
    title: "Concept, state and prototype in one product loop",
    description:
      "The product is shaped through the decisions, states and feedback people need—not a collection of isolated screens.",
    href: "/works/codexia",
    linkLabel: "View prototype evidence",
    labels: ["Intent", "Flow", "Interface", "Prototype", "Validation"],
    image: codexiaWorkspace
  },
  {
    id: "systems-automation",
    eyebrow: "Workflow architecture",
    title: "Authority and automation stay legible",
    description:
      "Inputs, decisions, integrations and human checkpoints are mapped before implementation changes the workflow.",
    href: "/works/codexia",
    linkLabel: "View systems evidence",
    labels: ["Request", "Rules", "Execution", "Evidence"]
  }
] as const;

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
        className="ei-services-hero ei-hero-system"
        aria-labelledby="services-heading"
      >
        <div className="ei-services-hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <Container size="xl" className="ei-hero-system-container relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="ei-services-hero-layout"
          >
            <motion.div variants={driftUp} className="ei-services-hero-copy ei-hero-system-copy">
              <SectionLabel label="Services" tone="accent" className="ei-hero-system-eyebrow" />
              <p className="ei-services-hero-kicker">What you can hire Echo in Ink to do</p>
              <h1 id="services-heading" className="ei-hero-system-heading">
                Shape the idea and the infrastructure together.
              </h1>
              <p className="ei-services-hero-description ei-hero-system-description">
                Echo combines strategy, design and development to create or improve brands,
                websites, digital products and operational tools.
              </p>
              <div className="ei-services-hero-actions ei-hero-system-actions">
                <Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button>
                <Button to="/works" variant="secondary">
                  {siteActionLabels.viewWork}
                </Button>
              </div>
            </motion.div>

            <motion.ol
              variants={fadeSoft}
              className="ei-services-hero-index ei-hero-system-aside"
              aria-label="Services"
            >
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

      <Container size="xl" className="ei-services-jump-container">
        <PageJumpLinks
          label="On this page"
          links={[
            { href: "#capabilities", label: "Capabilities" },
            { href: "#evidence", label: "Evidence" },
            { href: "#ways-to-work", label: "Ways to work" }
          ]}
        />
      </Container>

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
                <h2 id="services-capabilities-heading">
                  Four areas of practice, combined as needed.
                </h2>
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
                    <a href="#evidence" className="ei-services-capability-link">
                      See the evidence pattern <span aria-hidden="true">↓</span>
                    </a>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeSoft} className="ei-services-capability-note">
              <span>One studio, one accountable lead.</span>
              <p>
                Echo can lead a complete engagement or focus on the part that is holding the wider
                work back.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="evidence"
        theme="light"
        transitionTo="mist"
        spacing="none"
        className="ei-services-evidence"
        aria-labelledby="services-evidence-heading"
      >
        <Container size="xl">
          <motion.div
            {...{
              variants: staggerContainer(STAGGER.loose, 0),
              initial: prefersReducedMotion ? false : "hidden",
              whileInView: "visible",
              viewport: VIEWPORT.normal
            }}
            className="ei-services-section-inner"
          >
            <motion.div variants={driftUp} className="ei-services-section-heading">
              <SectionLabel label="Evidence, not atmosphere" tone="accent" />
              <div>
                <h2 id="services-evidence-heading">
                  Each practice leaves a different kind of proof.
                </h2>
                <p>
                  These are working artefacts and prototype examples from Echo’s own projects—not
                  client outcomes or invented performance claims.
                </p>
              </div>
            </motion.div>

            <div className="ei-services-evidence-list">
              {serviceEvidence.map((item, index) => (
                <motion.article
                  key={item.id}
                  variants={driftUp}
                  className={`ei-service-evidence ei-service-evidence-${item.id}`}
                >
                  <div className="ei-service-evidence-copy">
                    <span>
                      {String(index + 1).padStart(2, "0")} / {item.eyebrow}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Button to={item.href} variant="tertiary">
                      {item.linkLabel} →
                    </Button>
                  </div>
                  {"image" in item ? (
                    <figure className="ei-service-evidence-interface">
                      <img src={item.image} alt="" loading="lazy" />
                      <figcaption>{item.labels.join(" · ")}</figcaption>
                    </figure>
                  ) : (
                    <ol className="ei-service-evidence-flow" aria-label={`${item.eyebrow} stages`}>
                      {item.labels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ol>
                  )}
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="ways-to-work"
        theme="mist"
        transitionTo="lightElevated"
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
                      <dl className="ei-services-engagement-details">
                        <div>
                          <dt>Best when</dt>
                          <dd>{model.bestFor}</dd>
                        </div>
                        <div>
                          <dt>Typical scope</dt>
                          <dd>{model.typicalScope}</dd>
                        </div>
                        <div>
                          <dt>Possible outcomes</dt>
                          <dd>{model.possibleOutcomes}</dd>
                        </div>
                        <div>
                          <dt>Next action</dt>
                          <dd>{model.nextAction}</dd>
                        </div>
                        {model.id === "strategy-sessions" ? (
                          <div>
                            <dt>Pricing</dt>
                            <dd>{strategySessionPricingPolicy}</dd>
                          </div>
                        ) : null}
                      </dl>
                      <Button to={model.href} variant="tertiary">
                        {model.cta}
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

      <Section theme="lightElevated" spacing="none" className="ei-services-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="Begin with the work"
          heading="Bring the challenge. We’ll find the right shape for it."
          body="Whether you need one clear decision or an end-to-end build, the first step is a straightforward conversation about what needs to change."
          actions={
            <>
              <Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button>
              <Button to="/booking" variant="secondary">
                {siteActionLabels.requestStrategySession}
              </Button>
              <Button to="/works" variant="tertiary">
                {siteActionLabels.viewWork}
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
