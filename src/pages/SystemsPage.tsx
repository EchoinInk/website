import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import systemsHeroDesktop from "@/assets/imagery/hero/systems-hero-signal-grid-desktop.webp";
import systemsHeroMobile from "@/assets/imagery/hero/systems-hero-signal-grid-mobile.webp";
import systemsCTAImage from "@/assets/imagery/sections/cta-signal-convergence-desktop.webp";
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
  featuredSystem,
  latestSystems,
  systemPathway,
  systemsCategories,
  systemsClosing,
  systemsHero,
  systemsUseCases,
} from "@/data/systemsContent";
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

export function SystemsPage() {
  return (
    <PageShell atmosphere="works" theme="deep" withTopSpacing={false} className="ei-systems-page">
      <Helmet>
        <title>Systems — Echo in Ink</title>
        <meta name="description" content={systemsHero.description} />
      </Helmet>

     <PageSectionHero
  eyebrow={systemsHero.eyebrow}
  title="Atmosphere, made usable."
  italicWord="usable."
  description={systemsHero.description}
  offerAnchor="Reusable design frameworks and decision tools for teams building products, platforms, and brands with more clarity."
  image={systemsHeroDesktop}
  mobileImage={systemsHeroMobile}
  imageAlt="Dark cinematic systems blueprint with luminous signal grids and modular framework lines"
  align="left"

  ctaLabel="Explore a system"
  ctaHref="#featured-system"
  secondaryCtaLabel="Start a conversation"
  secondaryCtaHref="/contact?inquiry=project"
/>

      <Section
        id="systems-categories"
        spacing="none"
        className="ei-systems-section ei-systems-section-anchor ei-systems-categories"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="System architecture" index="02" />
              <div>
                <h2 className="ei-type-editorial-heading">Four layers. One coherent creative ecosystem.</h2>
                <p className="ei-type-body-editorial">
                  Start with the layer you need now, or combine them into a complete path from
                  early signal to finished world.
                </p>
              </div>
            </motion.div>

            <div className="ei-systems-category-grid">
              {systemsCategories.map((category, index) => (
                <motion.div key={category.title} variants={driftUp}>
                  <EchoCard
                    variant={index === 1 ? "feature" : "index"}
                    padding="lg"
                    className="ei-systems-category-card"
                  >
                    <div className="ei-systems-category-topline">
                      <IconWell
                        size="md"
                        tone={index === 3 ? "magenta" : "violet"}
                        orbital
                        glow
                      >
                        <OrbitalVisual variant={category.icon} size={42} />
                      </IconWell>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <p className="ei-systems-category-layer">{category.layer}</p>
                    <h3>{category.title}</h3>
                    <p className="ei-type-body-editorial">{category.description}</p>

                    <dl className="ei-systems-category-facts">
                      <div>
                        <dt>Best for</dt>
                        <dd className="ei-type-body-small">{category.bestFor}</dd>
                      </div>
                      <div>
                        <dt>Output</dt>
                        <dd className="ei-type-body-small">{category.output}</dd>
                      </div>
                    </dl>

                    <ul>
                      {category.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="featured-system"
        spacing="none"
        className="ei-systems-section ei-systems-section-anchor ei-systems-featured-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="offer"
                padding="none"
                className="ei-systems-featured"
              >
                <div className="ei-systems-featured-copy">
                  <SectionLabel label="Featured system" index="03" />
                  <p className="ei-systems-featured-category">
                    {featuredSystem.category}
                  </p>

                  <motion.h2 variants={blurEmergence}>
                    {featuredSystem.title}
                  </motion.h2>

                  <p className="ei-systems-featured-description ei-type-body-editorial">
                    {featuredSystem.description}
                  </p>

                  <dl className="ei-systems-featured-facts">
                    <div>
                      <dt>Best for</dt>
                      <dd className="ei-type-body-small">{featuredSystem.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Output</dt>
                      <dd className="ei-type-body-small">{featuredSystem.output}</dd>
                    </div>
                  </dl>

                  <div className="ei-systems-featured-parts">
                    <span>Inside the system</span>
                    <ul>
                      {featuredSystem.features.map((feature) => (
                        <li key={feature}>
                          <span aria-hidden="true">+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ei-systems-featured-actions">
                    <Button to={featuredSystem.cta.href} variant="secondary">
                      {featuredSystem.cta.label} <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                    </Button>
                    <span>{featuredSystem.format}</span>
                  </div>
                </div>

                <div className="ei-systems-featured-media" aria-hidden="true">
                  <img src={systemsCTAImage} alt="" loading="lazy" />

                  <div className="ei-systems-featured-map">
                    <span className="ei-systems-map-node ei-systems-map-node-signal">
                      Signal
                    </span>
                    <span className="ei-systems-map-node ei-systems-map-node-core">
                      Identity
                      <strong>Clarity</strong>
                    </span>
                    <span className="ei-systems-map-node ei-systems-map-node-voice">
                      Voice
                    </span>
                    <span className="ei-systems-map-node ei-systems-map-node-world">
                      World
                    </span>
                    <span className="ei-systems-map-line ei-systems-map-line-one" />
                    <span className="ei-systems-map-line ei-systems-map-line-two" />
                    <span className="ei-systems-map-line ei-systems-map-line-three" />
                  </div>
                </div>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        className="ei-systems-section ei-systems-section-anchor ei-systems-modules"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="Tools and modules" index="04" />
              <div>
                <h2 className="ei-type-editorial-heading">Use one module. Build a larger system.</h2>
                <p className="ei-type-body-editorial">
                  Focused tools for a specific creative decision, designed to remain useful when
                  the work grows.
                </p>
              </div>
            </motion.div>

            <div className="ei-systems-module-grid">
              {latestSystems.map((system, index) => (
                <motion.div
                  key={system.title}
                  variants={driftUp}
                  className={index === 0 ? "ei-systems-module-featured" : undefined}
                >
                  <EchoCard
                    variant="interactive"
                    padding="none"
                    className="ei-systems-module-card"
                  >
                    <Link to="/contact" aria-label={`Enquire about ${system.title}`}>
                      <div className="ei-systems-module-media">
                        <img
                          src={system.image}
                          alt=""
                          loading="lazy"
                          style={{ objectPosition: system.imagePosition }}
                        />
                      </div>

                      <div className="ei-systems-module-copy">
                        <div className="ei-systems-module-meta">
                          <span>{system.type}</span>
                          <span>{system.status}</span>
                        </div>

                        <h3>{system.title}</h3>
                        <p className="ei-type-body-editorial">{system.description}</p>

                        <dl>
                          <div>
                            <dt>Best for</dt>
                            <dd className="ei-type-body-small">{system.useCase}</dd>
                          </div>
                          <div>
                            <dt>Output</dt>
                            <dd className="ei-type-body-small">{system.output}</dd>
                          </div>
                        </dl>

                        <div className="ei-systems-module-action">
                          <span>{system.price}</span>
                          <span>
                            Explore <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        className="ei-systems-section ei-systems-section-anchor ei-systems-use-cases"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="Built for" index="05" />
              <div>
                <h2 className="ei-type-editorial-heading">Practical support for work with depth.</h2>
                <p className="ei-type-body-editorial">
                  Each system helps turn an intuitive creative challenge into a clearer decision,
                  direction, or deliverable.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="index"
                padding="none"
                className="ei-systems-use-case-table"
              >
                {systemsUseCases.map((useCase) => (
                  <div key={useCase.audience} className="ei-systems-use-case-row">
                    <h3>{useCase.audience}</h3>
                    <p className="ei-type-body-editorial">{useCase.need}</p>
                    <span>{useCase.fit}</span>
                  </div>
                ))}
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        className="ei-systems-section ei-systems-section-anchor ei-systems-pathway"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="A larger pathway" index="06" />
              <div>
                <h2 className="ei-type-editorial-heading">From first signal to a world people can enter.</h2>
                <p className="ei-type-body-editorial">
                  Systems can stand alone, or connect with Echo Sessions and studio work as the
                  project becomes more defined.
                </p>
              </div>
            </motion.div>

            <ol className="ei-systems-pathway-list">
              {systemPathway.map((step, index) => (
                <motion.li key={step.title} variants={driftUp}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <IconWell size="sm" tone={index === 3 ? "magenta" : "blue"}>
                    <OrbitalVisual variant={step.icon} size={26} />
                  </IconWell>
                  <div>
                    <h3>{step.title}</h3>
                    <p className="ei-type-body-editorial">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="imagePanel"
        eyebrow="Choose your next layer"
        heading={
          <>
            Build the structure that lets the <em>atmosphere hold.</em>
          </>
        }
        body={`${systemsClosing.title} ${systemsClosing.description}`}
        image={systemsCTAImage}
        imageAlt=""
        className="ei-systems-closing"
        actions={
          <>
            <Button to={systemsClosing.cta.href} variant="primary">
              {systemsClosing.cta.label}
            </Button>
            <Button to="/sessions" variant="tertiary">
              Start with a session <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
            </Button>
          </>
        }
        secondary={
          <Link to="/contact">
            Not sure where to begin? Tell us what you are shaping{" "}
            <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
          </Link>
        }
      />
    </PageShell>
  );
}
