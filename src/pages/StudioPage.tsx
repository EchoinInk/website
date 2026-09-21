import { motion, useReducedMotion } from "framer-motion";

import studioHeroDesktop from "@/assets/imagery/hero/studio-hero-desktop.webp";
import studioHeroMobile from "@/assets/imagery/hero/studio-hero-mobile.webp";
import studioPhilosophyArtifact from "@/assets/imagery/sections/studio-philosophy-artifact.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  primaryCapabilities,
  type ServiceCapabilityId,
} from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
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

const principles = [
  {
    title: "Meaning over noise",
    body: "Clarity is not the absence of character. It is the discipline of making what matters easier to see and feel.",
  },
  {
    title: "Design with feeling",
    body: "Atmosphere carries meaning. Strategy, story and interaction become more coherent when they are shaped together.",
  },
  {
    title: "Systems with soul",
    body: "Craft should survive the first impression. Reusable structures give the work consistency without flattening its character.",
  },
] as const;

const workingModel = [
  {
    title: "Direct involvement",
    body: "The founder stays close to the work, the decisions and the details throughout the engagement.",
  },
  {
    title: "Continuity through execution",
    body: "Strategy, design and development remain connected instead of being handed between disconnected departments.",
  },
  {
    title: "Specialist support with purpose",
    body: "Specialist collaborators are brought in selectively when the work genuinely benefits from their expertise.",
  },
  {
    title: "Technology in service of the work",
    body: "Tools and platforms are selected for the problem, the people using them and what the work needs to become.",
  },
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
        title="A creative technology studio for ambitious digital work."
        description="Echo in Ink brings strategy, design and development together to shape brands, digital experiences, products and systems."
        offerAnchor="High-touch work. Meaningful worlds."
        ctaLabel={primaryCallToAction.label}
        ctaHref={primaryCallToAction.href}
        secondaryCtaLabel="View Work"
        secondaryCtaHref="/works"
        image={studioHeroDesktop}
        mobileImage={studioHeroMobile}
        imageAlt="Atmospheric violet and blue light forming an open, luminous space"
        theme="light"
        tone="editorial"
        headingId="studio-heading"
      />

      <Section
        theme="lightElevated"
        transitionTo="atmospheric"
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
                <h2 id="studio-capabilities-heading">One studio, four connected capabilities.</h2>
                <p>
                  The work can move across strategy, identity, experience and technology according
                  to the problem. These are the same four areas used across Echo&apos;s commercial
                  offer—not a separate Studio taxonomy.
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
                    <p>{capability.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeSoft} className="ei-studio-services-link">
              <p>For the complete capability and engagement-model explanation:</p>
              <Button to="/services" variant="secondary">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="atmospheric"
        transitionTo="light"
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
                <h2 id="studio-philosophy-heading">High-touch work. Meaningful worlds.</h2>
              </div>
              <div>
                <p className="ei-studio-philosophy-lead">
                  Design is not decoration—it is meaning made visible. Atmosphere is how that
                  meaning is felt.
                </p>
                <p>
                  Echo looks for the point where message, form and function become one coherent
                  experience. The goal is not more noise, but work with enough clarity and craft to
                  hold attention.
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
        theme="mist"
        transitionTo="deep"
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
                <h2 id="studio-model-heading">Direct thinking, carried through the work.</h2>
                <p>
                  Echo in Ink is a founder-led creative technology studio. That keeps the line from
                  the first strategic question to the final implementation clear, considered and
                  accountable.
                </p>
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

      <Section theme="deep" spacing="none" className="ei-studio-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="Continue"
          heading="See what this way of working can make."
          body="Explore selected work and its project context, or bring Echo the challenge you are ready to shape."
          actions={
            <>
              <Button to="/works" variant="secondary">View Work</Button>
              <Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>
            </>
          }
        />
      </Section>
    </PageShell>
  );
}

export default StudioPage;
