import { motion, useReducedMotion } from "framer-motion";

import studioHeroDesktop from "@/assets/imagery/hero/studio-hero-desktop.png";
import studioHeroMobile from "@/assets/imagery/hero/studio-hero-mobile.png";
import studioPhilosophyArtifact from "@/assets/imagery/sections/studio-philosophy-artifact.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { CtaOrbitalBackground } from "@/components/ui/CTAOrbitalBackground";
import { EchoCard } from "@/components/ui/EchoCard";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { primaryCapabilities, type ServiceCapabilityId } from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const capabilityVisuals: Record<ServiceCapabilityId, OrbitalVariant> = {
  "brand-identity": "axiomRing",
  "websites-experiences": "memoryComet",
  "digital-products": "focusDial",
  "systems-automation": "quietAxis"
};

const studioCapabilityCopy: Record<
  ServiceCapabilityId,
  { summary: string; scope: string; relationship: string }
> = {
  "brand-identity": {
    summary: "Creating identities with clarity, character and staying power.",
    scope: "Positioning, brand foundations, messaging, visual systems and expression.",
    relationship: "Identity shapes experiences"
  },
  "websites-experiences": {
    summary: "Designing digital experiences that feel intuitive, useful and unmistakably yours.",
    scope: "Websites, customer journeys, content architecture and interactive experiences.",
    relationship: "Experiences inform products"
  },
  "digital-products": {
    summary: "Turning ideas into products people can understand and use.",
    scope: "Product strategy, UX/UI, prototyping, validation and product systems.",
    relationship: "Products require systems"
  },
  "systems-automation": {
    summary: "Building the frameworks that help work scale without losing quality.",
    scope: "Operational systems, workflows, automation, internal tools and AI-assisted processes.",
    relationship: "Systems unlock new possibilities"
  }
};

const principles = [
  {
    title: "Signal over noise",
    body: "Clarity creates confidence. Every element should have a reason to exist."
  },
  {
    title: "Craft with intention",
    body: "Visual decisions carry meaning. Atmosphere, interaction and language should work together, not compete for attention."
  },
  {
    title: "Systems with character",
    body: "Consistency shouldn't come at the expense of personality. Strong systems make creativity easier to sustain."
  }
] as const;

const workingModel = [
  {
    title: "Direct involvement",
    body: "No unnecessary layers of account management. Work directly with the person shaping the work."
  },
  {
    title: "Connected execution",
    body: "Strategy, design and development stay aligned from beginning to end."
  },
  {
    title: "Purposeful collaboration",
    body: "Specialists are brought in selectively when they add genuine value."
  },
  {
    title: "Technology that serves the outcome",
    body: "Tools support the goal. They don’t become the goal."
  }
] as const;

export function StudioPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageShell
      title="Studio — Echo in Ink"
      description="Echo in Ink is a founder-led creative technology studio bringing strategy, design and development together for ambitious digital work."
      atmosphere="studio"
      theme="light"
      withTopSpacing={false}
      className="ei-studio-page"
    >
      <PageSectionHero
        eyebrow="THE STUDIO"
        title="Where strategy, design and technology speak the same language."
        description="Echo in Ink is a founder-led studio creating brands, digital experiences, products and systems with equal attention to thinking, craft and execution."
        offerAnchor="Made with care. Built with purpose."
        ctaLabel={primaryCallToAction.label}
        ctaHref={primaryCallToAction.href}
        secondaryCtaLabel="View Work"
        secondaryCtaHref="/works"
        image={studioHeroDesktop}
        mobileImage={studioHeroMobile}
        imageAlt="An atmospheric creative workstation surrounded by violet cosmic imagery and design studies"
        theme="light"
        tone="editorial"
        headingId="studio-heading"
      />

      <Section
        theme="lightElevated"
        transitionTo="mist"
        transition="soft"
        spacing="none"
        className="ei-studio-capabilities"
        aria-labelledby="studio-capabilities-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-section-inner"
          >
            <motion.div variants={driftUp} className="ei-studio-section-heading">
              <SectionLabel label="Connected practice" tone="accent" />
              <div>
                <h2 id="studio-capabilities-heading">
                  One studio. Multiple disciplines. One connected practice.
                </h2>
                <p>
                  Every project requires a different balance of strategy, design and technology.
                  Rather than treating these as separate services, Echo brings them together around
                  the problem that needs solving.
                </p>
              </div>
            </motion.div>

            <div className="ei-studio-capability-grid">
              {primaryCapabilities.map((capability, index) => (
                <motion.div key={capability.id} variants={driftUp}>
                  <EchoCard padding="lg" className="ei-studio-capability-card">
                    <div className="ei-studio-capability-meta">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <OrbitalVisual variant={capabilityVisuals[capability.id]} size={54} />
                    </div>
                    <h3>{capability.title}</h3>
                    <p className="ei-studio-capability-summary">
                      {studioCapabilityCopy[capability.id].summary}
                    </p>
                    <p className="ei-studio-capability-scope">
                      {studioCapabilityCopy[capability.id].scope}
                    </p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeSoft}
              className="ei-studio-capability-relationships"
              aria-label="How Echo in Ink's disciplines influence one another"
            >
              <div className="ei-studio-relationship-line" aria-hidden="true">
                <svg viewBox="0 0 1000 72" preserveAspectRatio="none">
                  <path d="M0 24 C125 24 125 58 250 58 S375 24 500 24 S625 58 750 58 S875 24 1000 24" />
                </svg>
              </div>
              {primaryCapabilities.map((capability) => (
                <div key={capability.id} className="ei-studio-relationship">
                  <span aria-hidden="true" />
                  <p>{studioCapabilityCopy[capability.id].relationship}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="mist"
        transitionTo="light"
        transition="chapter"
        spacing="none"
        className="ei-studio-philosophy"
        aria-labelledby="studio-philosophy-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-section-inner"
          >
            <motion.div variants={driftUp} className="ei-studio-philosophy-intro">
              <div>
                <SectionLabel label="Studio philosophy" />
                <h2 id="studio-philosophy-heading">Meaning first. Everything else follows.</h2>
              </div>
              <div>
                <p className="ei-studio-philosophy-lead">
                  The goal isn&apos;t simply to make something look better. It&apos;s to create
                  alignment between what something is, what it does and how it feels.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-studio-philosophy-layout">
              <div className="ei-studio-philosophy-art" aria-hidden="true">
                <img src={studioPhilosophyArtifact} alt="" />
              </div>
              <div className="ei-studio-principles">
                {principles.map((principle, index) => (
                  <article key={principle.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="light"
        transitionTo="lightElevated"
        transition="soft"
        spacing="none"
        className="ei-studio-model"
        aria-labelledby="studio-model-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-section-inner"
          >
            <motion.div variants={driftUp} className="ei-studio-section-heading">
              <SectionLabel label="Founder-led by design" tone="accent" />
              <div>
                <h2 id="studio-model-heading">Small by design. Close by choice.</h2>
                <p>
                  Echo in Ink is intentionally founder-led. The person helping define the strategy
                  is the same person shaping the design, building the system and guiding
                  implementation. That continuity keeps decisions connected and reduces unnecessary
                  complexity.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-studio-founder-diagram">
              <div
                className="ei-studio-founder-primary"
                aria-label="Echo in Ink working relationship"
              >
                <div className="ei-studio-founder-node">
                  <span className="ei-studio-founder-node-mark" aria-hidden="true">
                    01
                  </span>
                  <div>
                    <strong>Client</strong>
                    <small>Your problem, opportunity or idea.</small>
                  </div>
                </div>
                <span className="ei-studio-founder-arrow" aria-hidden="true">
                  ↔
                </span>
                <div className="ei-studio-founder-node ei-studio-founder-node-lead">
                  <span className="ei-studio-founder-node-mark" aria-hidden="true">
                    ✦
                  </span>
                  <div>
                    <strong>Founder / Lead</strong>
                    <small>Strategy, design and development, directly involved.</small>
                  </div>
                </div>
                <span className="ei-studio-founder-arrow" aria-hidden="true">
                  ↔
                </span>
                <div className="ei-studio-founder-node">
                  <span className="ei-studio-founder-node-mark" aria-hidden="true">
                    03
                  </span>
                  <div>
                    <strong>Specialists when needed</strong>
                    <small>A trusted network for additional expertise and scale.</small>
                  </div>
                </div>
              </div>

              <div className="ei-studio-handoffs" aria-label="Comparison of project handoffs">
                <p className="ei-studio-handoffs-label">Fewer handoffs</p>
                <div className="ei-studio-handoff-row ei-studio-handoff-row-echo">
                  <strong>Echo in Ink</strong>
                  <ol>
                    <li>Client</li>
                    <li>Founder / Lead</li>
                    <li>
                      Specialists <span>(when needed)</span>
                    </li>
                  </ol>
                </div>
                <div className="ei-studio-handoff-row">
                  <strong>Traditional model</strong>
                  <ol>
                    <li>Client</li>
                    <li>Account</li>
                    <li>Strategy</li>
                    <li>Design</li>
                    <li>Development</li>
                    <li>Handover</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            <div className="ei-studio-model-grid">
              {workingModel.map((item, index) => (
                <motion.article key={item.title} variants={driftUp}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="lightElevated"
        transitionTo="deep"
        transition="atmospheric"
        spacing="none"
        className="ei-studio-closing"
      >
        <CTASection
          variant="editorialInvitation"
          panelTheme="deep"
          eyebrow="Continue"
          heading="Let's make something thoughtful."
          body="Whether you're building a brand, refining a product or creating better systems, Echo in Ink helps bring ideas into focus and turn them into work that lasts."
          decoration={<CtaOrbitalBackground />}
          actions={
            <>
              <Button to="/works" variant="secondary">
                View Work
              </Button>
              <Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>
            </>
          }
        />
      </Section>
    </PageShell>
  );
}

export default StudioPage;
