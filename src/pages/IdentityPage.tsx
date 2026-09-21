import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import identityHeroDesktop from "@/assets/imagery/hero/identity-hero-orbital-system-desktop.webp";
import identityHeroMobile from "@/assets/imagery/hero/identity-hero-orbital-system-mobile.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { IconWell } from "@/components/ui/IconWell";
import { OrbitalVisual } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  identityApplications,
  identityAudience,
  identityClosing,
  identityDeliverables,
  identityHero,
  identityPricing,
  identityProcess,
  identityTransformation,
  identityUseCases,
} from "@/data/identityContent";
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

function scrollToProcess() {
  const processSection = document.getElementById("identity-process");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  processSection?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function IdentityPage() {
  return (
    <PageShell
      atmosphere="identity"
      theme="deep"
      withTopSpacing={false}
      className="ei-identity-page"
    >
      <Helmet>
        <title>Atmospheric Identity Direction — Echo in Ink</title>
        <meta
          name="description"
          content="Atmospheric Identity Kits translate the emotional shape of your work into clear creative direction — palette, typography, mood, tone, and visual notes."
        />
      </Helmet>

      <PageSectionHero
        eyebrow="01  IDENTITY"
        title="Every world begins with a feeling."
        italicWord="feeling."
        description="Before a name. Before a logo. Before the visuals.

Identity begins as a feeling — an atmosphere waiting to be understood, shaped, and expressed.

I translate that feeling into visual language, rhythm, and voice."
        offerAnchor="Identity direction, visual language, and digital foundations for teams becoming more recognisable and more coherent."
        image={identityHeroDesktop}
        mobileImage={identityHeroMobile}
        imageAlt="Orbital violet identity system over a dark cinematic field"
        align="left" 
        ctaLabel="Discuss identity direction"
        ctaHref="/contact?inquiry=project"
        secondaryCtaLabel="View selected work"
        secondaryCtaHref="/works"
      />
      <Section
        spacing="none"
        className="ei-identity-section ei-identity-section-anchor ei-identity-orientation"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px] ei-identity-orientation-grid"
          >
            <motion.div
              variants={driftUp}
              className="ei-identity-orientation-copy"
            >
              <SectionLabel label="Who it is for" index="02" />
              <h2 className="ei-type-section-heading">
                For the creator who can <em>feel</em> the world, but cannot yet
                see it clearly.
              </h2>
              <div>
                {identityAudience.intro.map((paragraph) => (
                  <p key={paragraph} className="ei-type-body-editorial">{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="index"
                padding="lg"
                className="ei-identity-use-cases"
              >
                <p className="ei-identity-overline">
                  This may be the right moment if
                </p>
                <ul>
                  {identityUseCases.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        className="ei-identity-section ei-identity-section-anchor ei-identity-kit"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-identity-section-heading"
            >
              <SectionLabel label="What you receive" index="03" />
              <div>
                <h2 className="ei-type-section-heading">{identityDeliverables.heading}</h2>
                <p className="ei-type-body-editorial">
                  A concise direction system covering palette, type, tone,
                  visual references, usage principles, and launch guidance.
                </p>
              </div>
            </motion.div>

            <div className="ei-identity-kit-grid">
              {identityDeliverables.items.map((item, index) => (
                <motion.div key={item.title} variants={driftUp}>
                  <EchoCard
                    variant={index === 0 || index === 3 ? "feature" : "static"}
                    padding="lg"
                    className="ei-identity-kit-card"
                  >
                    <div className="ei-identity-kit-card-heading">
                      <IconWell
                        size="md"
                        tone={index === 4 ? "magenta" : "violet"}
                        orbital
                        glow
                      >
                        <OrbitalVisual variant={item.icon} size={40} />
                      </IconWell>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="ei-type-body-editorial">{item.description}</p>
                    <ul>
                      {item.includes.map((include) => (
                        <li key={include}>{include}</li>
                      ))}
                    </ul>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeSoft} className="ei-identity-kit-note">
              {identityDeliverables.closing}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        className="ei-identity-section ei-identity-section-anchor ei-identity-coherence"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-identity-section-heading"
            >
              <SectionLabel label="From signal to world" index="04" />
              <div>
                <h2 className="ei-type-section-heading">{identityTransformation.heading}</h2>
                <p className="ei-type-body-editorial">{identityTransformation.intro}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="offer"
                padding="none"
                className="ei-identity-coherence-panel"
              >
                <div className="ei-identity-signal-cloud">
                  <p>Scattered signals</p>
                  {identityTransformation.signals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>

                <div className="ei-identity-coherence-core" aria-hidden="true">
                  <span className="ei-identity-coherence-line" />
                  <IconWell size="lg" tone="violet" orbital glow>
                    <OrbitalVisual variant="chorusCore" size={58} />
                  </IconWell>
                  <strong>One centre</strong>
                </div>

                <div className="ei-identity-world-output">
                  <p>Coherent expression</p>
                  <strong>{identityTransformation.output}</strong>
                  <span>{identityTransformation.divider}</span>
                </div>
              </EchoCard>
            </motion.div>

            <div className="ei-identity-application-grid">
              {identityApplications.map((application, index) => (
                <motion.div key={application.title} variants={driftUp}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{application.title}</h3>
                  <p className="ei-type-body-editorial">{application.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="identity-process"
        spacing="none"
        className="ei-identity-section ei-identity-section-anchor ei-identity-process"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-identity-section-heading"
            >
              <SectionLabel label="The process" index="05" />
              <div>
                <h2 className="ei-type-section-heading">{identityProcess.heading}</h2>
                <p className="ei-type-body-editorial">
                  A deliberate progression from instinct to a direction you can
                  use.
                </p>
              </div>
            </motion.div>

            <ol className="ei-identity-process-list">
              {identityProcess.steps.map((step, index) => (
                <motion.li key={step.title} variants={driftUp}>
                  <span className="ei-identity-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="ei-identity-process-dot"
                    aria-hidden="true"
                  />
                  <h3>{step.title}</h3>
                  <p className="ei-type-body-editorial">{step.description}</p>
                </motion.li>
              ))}
            </ol>

            <motion.p
              variants={fadeSoft}
              className="ei-identity-process-closing"
            >
              {identityProcess.closing}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        className="ei-identity-section ei-identity-section-anchor ei-identity-engagement"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-identity-section-heading"
            >
              <SectionLabel label={identityPricing.eyebrow} index="06" />
              <div>
                <h2 className="ei-type-section-heading">{identityPricing.heading}</h2>
                <p className="ei-type-body-editorial">{identityPricing.intro}</p>
              </div>
            </motion.div>

            <div className="ei-identity-engagement-grid">
              {identityPricing.tiers.map((tier, index) => (
                <motion.div key={tier.name} variants={driftUp}>
                  <EchoCard
                    variant={tier.featured ? "feature" : "static"}
                    padding="lg"
                    className="ei-identity-engagement-card"
                  >
                    <div className="ei-identity-engagement-topline">
                      <p>{tier.name}</p>
                      <span>{index === 0 ? "Focused" : "Expanded"}</span>
                    </div>
                    <p className="ei-identity-price">
                      {tier.price} <span>{tier.currency}</span>
                    </p>
                    <p className="ei-identity-engagement-summary ei-type-body-editorial">
                      {tier.summary}
                    </p>
                    <ul>
                      {tier.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <Button
                      to={tier.cta.href}
                      variant={tier.featured ? "primary" : "secondary"}
                    >
                      {tier.cta.label} <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                    </Button>
                  </EchoCard>
                </motion.div>
              ))}

              <motion.aside
                variants={blurEmergence}
                className="ei-identity-engagement-anchor"
              >
                <span aria-hidden="true">✦</span>
                <p>{identityPricing.anchor}</p>
              </motion.aside>
            </div>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="editorialInvitation"
        eyebrow="Begin with the feeling"
        heading={identityClosing.heading}
        body={identityClosing.subline}
        actions={
          <Button to={identityClosing.cta.href} variant="primary">
            Discuss identity direction <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
          </Button>
        }
        className="ei-identity-cta"
        headingId="identity-cta-heading"
      />
    </PageShell>
  );
}
