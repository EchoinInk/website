import { motion, useReducedMotion } from "framer-motion";

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
  creativeResources,
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageShell
      title="Creative Systems & Tools — Echo in Ink"
      description={systemsHero.description}
      atmosphere="works"
      theme="light"
      withTopSpacing={false}
      className="ei-systems-page"
    >

      <PageSectionHero
        eyebrow={systemsHero.eyebrow}
        title={systemsHero.title}
        italicWord="clearer."
        description={systemsHero.description}
        offerAnchor={systemsHero.clarification}
        image={systemsHeroDesktop}
        mobileImage={systemsHeroMobile}
        imageAlt="Creative framework cards connected by a restrained signal grid"
        align="left"
        theme="light"
        tone="editorial"
        ctaLabel="Explore the collection"
        ctaHref="#systems-categories"
        secondaryCtaLabel="View Systems & Automation"
        secondaryCtaHref="/services"
        headingId="creative-systems-heading"
      />

      <Section
        id="systems-categories"
        spacing="none"
        theme="lightElevated"
        transitionTo="mist"
        className="ei-systems-section ei-systems-section-anchor ei-systems-categories"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="Collection structure" index="02" tone="accent" />
              <div>
                <h2 className="ei-type-editorial-heading">Four ways to make an unclear direction more usable.</h2>
                <p className="ei-type-body-editorial">
                  These are working structures rather than a product catalogue. Start with the
                  form that matches the decision in front of you.
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
                        <dt>Useful for</dt>
                        <dd className="ei-type-body-small">{category.usefulFor}</dd>
                      </div>
                      <div>
                        <dt>Form</dt>
                        <dd className="ei-type-body-small">{category.form}</dd>
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
        theme="mist"
        transitionTo="lightElevated"
        className="ei-systems-section ei-systems-section-anchor ei-systems-featured-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="offer"
                padding="none"
                className="ei-systems-featured"
                data-theme="deep"
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
                      <dt>Useful for</dt>
                      <dd className="ei-type-body-small">{featuredSystem.usefulFor}</dd>
                    </div>
                    <div>
                      <dt>Current form</dt>
                      <dd className="ei-type-body-small">{featuredSystem.form}</dd>
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
                    <span>Experimental resource</span>
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
        theme="lightElevated"
        className="ei-systems-section ei-systems-section-anchor ei-systems-modules"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="Tools and experiments" index="04" tone="accent" />
              <div>
                <h2 className="ei-type-editorial-heading">Ideas in different stages of becoming useful.</h2>
                <p className="ei-type-body-editorial">
                  Each item below is a concept or working framework. None is presented as a
                  finished, available, or downloadable product.
                </p>
              </div>
            </motion.div>

            <div className="ei-systems-module-grid">
              {creativeResources.map((system, index) => (
                <motion.div
                  key={system.title}
                  variants={driftUp}
                  className={index === 0 ? "ei-systems-module-featured" : undefined}
                >
                  <EchoCard as="div" variant="static" padding="none" className="ei-systems-module-card">
                    <article>
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
                            <dt>Useful for</dt>
                            <dd className="ei-type-body-small">{system.usefulFor}</dd>
                          </div>
                          <div>
                            <dt>Form</dt>
                            <dd className="ei-type-body-small">{system.form}</dd>
                          </div>
                        </dl>

                        <div className="ei-systems-module-action">
                          <span>{system.status}</span>
                          <span>{system.type}</span>
                        </div>
                      </div>
                    </article>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        theme="light"
        className="ei-systems-section ei-systems-section-anchor ei-systems-use-cases"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="Potential uses" index="05" tone="accent" />
              <div>
                <h2 className="ei-type-editorial-heading">Creative questions these structures can support.</h2>
                <p className="ei-type-body-editorial">
                  The collection is most useful when there is a specific decision to make, not
                  when a tool is being sought for its own sake.
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
        theme="mist"
        transitionTo="lightElevated"
        className="ei-systems-section ei-systems-section-anchor ei-systems-pathway"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-systems-section-heading">
              <SectionLabel label="A practical pathway" index="06" tone="accent" />
              <div>
                <h2 className="ei-type-editorial-heading">From an unclear signal to a decision you can use.</h2>
                <p className="ei-type-body-editorial">
                  A prompt or framework can stand alone. When the need becomes a custom brand,
                  digital experience, product, or operational system, it becomes project work.
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
        theme="lightElevated"
        panelTheme="deep"
        eyebrow="Keep the distinction clear"
        heading={
          <>
            Creative tools here. Custom systems through <em>Services.</em>
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
            <Button to="/contact?inquiry=project" variant="tertiary">
              Start a Project <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
            </Button>
          </>
        }
        secondary="Systems & Automation remains one of Echo's four commercial capabilities; this page remains an editorial and experimental resource collection."
      />
    </PageShell>
  );
}
