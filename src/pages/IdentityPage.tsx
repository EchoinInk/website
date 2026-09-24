import { motion, useReducedMotion } from "framer-motion";

import identityHeroDesktop from "@/assets/imagery/hero/identity-hero-orbital-system-desktop.webp";
import identityHeroMobile from "@/assets/imagery/hero/identity-hero-orbital-system-mobile.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { identityApplications, identityProcess, identityTransformation } from "@/data/identityContent";
import { brandIdentityCapability, brandWorldsCapability } from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const identityAreas: Array<{ title: string; description: string; icon: OrbitalVariant }> = [
  {
    title: "Brand strategy",
    description: "Clarify the position, audience, purpose and central idea the identity needs to carry.",
    icon: "focusDial",
  },
  {
    title: "Visual identity",
    description: "Shape a distinctive visual language through typography, colour, imagery and composition.",
    icon: "prismMirror",
  },
  {
    title: "Identity systems",
    description: "Create principles and patterns that keep expression consistent without making it rigid.",
    icon: "chorusCore",
  },
  {
    title: "Digital expression",
    description: "Carry the identity into websites, products, launches and the other places people meet it.",
    icon: "signalBridge",
  },
];

export function IdentityPage() {
  const prefersReducedMotion = useReducedMotion();
  const reveal = {
    variants: staggerContainer(STAGGER.loose, 0),
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: VIEWPORT.normal,
  } as const;

  return (
    <PageShell
      title="Brand & Identity — Echo in Ink"
      description="Brand strategy, visual identity, identity systems and digital expression shaped into a coherent, recognisable whole."
      atmosphere="identity"
      theme="light"
      withTopSpacing={false}
      className="ei-identity-page ei-phase7-page"
    >
      <PageSectionHero
        eyebrow="BRAND & IDENTITY"
        title="Every world begins with a feeling."
        italicWord="feeling."
        description="Echo shapes brand strategy, visual identity, identity systems and digital expression into a coherent presence people can recognise and trust."
        offerAnchor={brandIdentityCapability.description}
        image={identityHeroDesktop}
        mobileImage={identityHeroMobile}
        imageAlt="Orbital violet identity system suggesting connected brand elements"
        theme="light"
        tone="editorial"
        ctaLabel={primaryCallToAction.label}
        ctaHref={primaryCallToAction.href}
        secondaryCtaLabel="Explore Services"
        secondaryCtaHref="/services"
        headingId="identity-heading"
      />

      <Section
        theme="lightElevated"
        transitionTo="atmospheric"
        spacing="none"
        className="ei-phase7-section ei-identity-capability"
        aria-labelledby="identity-capability-heading"
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="What the work can involve" tone="accent" />
              <div>
                <h2 id="identity-capability-heading">More than a logo. A system for being recognised.</h2>
                <p>
                  Identity creates coherence across the places a brand appears. The exact scope is
                  shaped around the problem; these are connected areas of the same capability, not
                  separate packages or guaranteed deliverables.
                </p>
              </div>
            </motion.div>

            <div className="ei-phase7-card-grid ei-phase7-card-grid-four">
              {identityAreas.map((area, index) => (
                <motion.div key={area.title} variants={driftUp}>
                  <EchoCard padding="lg" variant={index === 1 ? "feature" : "static"} className="ei-phase7-card">
                    <div className="ei-phase7-card-meta">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <OrbitalVisual variant={area.icon} size={54} />
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="atmospheric"
        transitionTo="light"
        spacing="none"
        className="ei-phase7-section ei-identity-coherence"
        aria-labelledby="identity-coherence-heading"
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="Coherent expression" />
              <div>
                <h2 id="identity-coherence-heading">From scattered signals to one recognisable centre.</h2>
                <p>{identityTransformation.intro}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-identity-system-map">
              <div>
                <span>Inputs</span>
                {identityTransformation.signals.map((signal) => <p key={signal}>{signal}</p>)}
              </div>
              <div className="ei-identity-system-core">
                <OrbitalVisual variant="chorusCore" size={78} />
                <strong>Identity system</strong>
              </div>
              <div>
                <span>Expression</span>
                {identityApplications.map((application) => <p key={application.title}>{application.title}</p>)}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="mist"
        transitionTo="deep"
        spacing="none"
        className="ei-phase7-section ei-identity-method"
        aria-labelledby="identity-method-heading"
      >
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="How the direction takes shape" tone="accent" />
              <div>
                <h2 id="identity-method-heading">Feeling becomes a usable visual and verbal system.</h2>
                <p>
                  The existing Echo method moves from the signals already present in the work to
                  principles that can guide consistent expression in real contexts.
                </p>
              </div>
            </motion.div>

            <ol className="ei-phase7-process">
              {identityProcess.steps.map((step, index) => (
                <motion.li key={step.title} variants={driftUp}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.li>
              ))}
            </ol>

            <motion.aside variants={fadeSoft} className="ei-phase7-relationship">
              <div>
                <span>Go deeper when the work needs it</span>
                <h2>{brandWorldsCapability.title}</h2>
                <p>
                  Brand &amp; Identity establishes the system. Brand Worlds explores how that system
                  becomes an environment. A Brand World is an optional advanced layer—not a
                  requirement for an identity project.
                </p>
              </div>
              <Button to={brandWorldsCapability.href} variant="secondary">Explore Brand Worlds</Button>
            </motion.aside>
          </motion.div>
        </Container>
      </Section>

      <Section theme="deep" spacing="none" className="ei-phase7-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="Build a coherent identity"
          heading="Make the brand recognisable wherever it appears."
          body="Begin with the business, audience and feeling the identity needs to hold. Echo will shape the right scope from there."
          actions={
            <>
              <Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>
              <Button to="/services" variant="secondary">Explore Services</Button>
            </>
          }
          headingId="identity-cta-heading"
        />
      </Section>
    </PageShell>
  );
}
