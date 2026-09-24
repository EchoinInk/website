import { motion, useReducedMotion } from "framer-motion";

import worldsHeroDesktop from "@/assets/imagery/hero/worlds-hero-vertical-portal-desktop.webp";
import worldsHeroMobile from "@/assets/imagery/hero/worlds-hero-vertical-portal-mobile.webp";
import worldsImageDesktop from "@/assets/imagery/sections/worlds-image-1-desktop.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { brandIdentityCapability, brandWorldsCapability, primaryCapabilities } from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
import { worldsLayers, worldsProcess } from "@/data/worldsContent";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const worldExpressions = [
  ["Visual direction", "A distinct art direction for how the brand is seen and composed."],
  ["Imagery", "A coherent image language, reference field and approach to visual storytelling."],
  ["Atmosphere", "The emotional qualities created through colour, texture, light, pacing and sound."],
  ["Interaction", "Principles for how the environment moves, responds and feels in digital space."],
  ["Expression", "Direction for launches, campaigns, content and other moments where the world appears."],
] as const;

export function WorldsPage() {
  const prefersReducedMotion = useReducedMotion();
  const reveal = {
    variants: staggerContainer(STAGGER.loose, 0),
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: VIEWPORT.normal,
  } as const;

  return (
    <PageShell
      title="Brand Worlds & Creative Direction — Echo in Ink"
      description={brandWorldsCapability.description}
      atmosphere="worlds"
      theme="light"
      withTopSpacing={false}
      className="ei-worlds-page ei-phase7-page"
    >
      <PageSectionHero
        eyebrow="BRAND WORLDS & CREATIVE DIRECTION"
        title="Build the world your work belongs to."
        italicWord="world"
        description="Brand Worlds extends an identity into a coherent creative environment—visual direction, imagery, atmosphere, interaction and expression working together around the brand."
        offerAnchor={brandWorldsCapability.description}
        image={worldsHeroDesktop}
        mobileImage={worldsHeroMobile}
        imageAlt="A vertical portal suggesting entry into an immersive brand environment"
        theme="light"
        tone="editorial"
        ctaLabel={primaryCallToAction.label}
        ctaHref={primaryCallToAction.href}
        secondaryCtaLabel="Explore Brand & Identity"
        secondaryCtaHref={brandIdentityCapability.href}
        headingId="worlds-heading"
      />

      <Section theme="lightElevated" transitionTo="atmospheric" spacing="none" className="ei-phase7-section ei-worlds-relationship" aria-labelledby="worlds-relationship-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="Identity, extended" tone="accent" />
              <div>
                <h2 id="worlds-relationship-heading">A creative-direction layer around the identity.</h2>
                <p>
                  Brand &amp; Identity establishes the system. Brand Worlds explores how that system
                  becomes an environment. It is an advanced secondary capability for work that
                  needs deeper atmosphere and continuity—not a fifth core service, and not a
                  required step for every identity project.
                </p>
              </div>
            </motion.div>
            <div className="ei-worlds-expression-grid">
              {worldExpressions.map(([title, description], index) => (
                <motion.div key={title} variants={driftUp}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section theme="atmospheric" transitionTo="light" spacing="none" className="ei-phase7-section ei-worlds-architecture" aria-labelledby="worlds-architecture-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="World Architecture" />
              <div>
                <h2 id="worlds-architecture-heading">The environment is built through connected layers.</h2>
                <p>
                  World Architecture is Echo’s language for organising creative direction. Each
                  layer names a real decision the brand can use across its presence.
                </p>
              </div>
            </motion.div>
            <div className="ei-phase7-card-grid ei-worlds-layer-grid">
              {worldsLayers.items.map((layer, index) => (
                <motion.div key={layer.title} variants={driftUp}>
                  <EchoCard padding="lg" variant={index === 2 ? "feature" : "static"} className="ei-phase7-card">
                    <span className="ei-phase7-card-index">{layer.number}</span>
                    <h3>{layer.title}</h3>
                    <p>{layer.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
            <motion.figure variants={fadeSoft} className="ei-worlds-atmosphere-image">
              <img src={worldsImageDesktop} alt="Layered violet light and texture evoking a coherent creative environment" loading="lazy" />
              <figcaption>Meaning, image, motion and interaction held around one creative centre.</figcaption>
            </motion.figure>
          </motion.div>
        </Container>
      </Section>

      <Section theme="mist" transitionTo="deep" spacing="none" className="ei-phase7-section ei-worlds-process" aria-labelledby="worlds-process-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="From signal to expression" tone="accent" />
              <div>
                <h2 id="worlds-process-heading">A world becomes useful when it can guide real creative choices.</h2>
                <p>
                  The existing World Architecture progression moves from understanding the work to
                  a direction that can inform a site, product, launch, campaign or content system.
                  Scope depends on the engagement.
                </p>
              </div>
            </motion.div>
            <ol className="ei-phase7-process">
              {worldsProcess.steps.map((step) => (
                <motion.li key={step.title} variants={driftUp}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.li>
              ))}
            </ol>
            <motion.aside variants={fadeSoft} className="ei-phase7-relationship">
              <div>
                <span>Choose the right starting point</span>
                <h2>Need the core identity first?</h2>
                <p>
                  Start with {brandIdentityCapability.title} for {brandIdentityCapability.description.toLowerCase()} Brand Worlds is there when the work needs a more immersive creative-direction layer.
                </p>
              </div>
              <Button to={brandIdentityCapability.href} variant="secondary">Explore Brand & Identity</Button>
            </motion.aside>
          </motion.div>
        </Container>
      </Section>

      <Section theme="deep" spacing="none" className="ei-phase7-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="Build with depth and continuity"
          heading="Some identities need a whole environment around them."
          body="If the work needs creative direction across imagery, atmosphere, interaction and expression, begin with the project and the context it needs to hold."
          actions={
            <>
              <Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>
              <Button to={brandIdentityCapability.href} variant="secondary">Explore Brand & Identity</Button>
              <Button to="/works" variant="tertiary">View Work</Button>
            </>
          }
          secondary={<p>Brand Worlds remains outside the four primary capabilities: {primaryCapabilities.map((item) => item.title).join(" · ")}</p>}
          headingId="worlds-cta-heading"
        />
      </Section>
    </PageShell>
  );
}
