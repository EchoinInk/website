import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import worksHeroDesktop from "@/assets/imagery/hero/works-hero-signal-stream-desktop.webp";
import worksHeroMobile from "@/assets/imagery/hero/works-hero-signal-stream-mobile.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectContext } from "@/components/works/ProjectContext";
import { WorkFilterBar } from "@/components/works/WorkFilterBar";
import { WorksGrid } from "@/components/works/WorksGrid";
import { primaryCallToAction } from "@/data/siteNavigation";
import {
  lumoProject,
  worksProjects,
  type ProjectProvenance,
  type WorkFilter,
} from "@/data/worksProjects";
import {
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const provenanceDescriptions: Record<ProjectProvenance, string> = {
  "Independent Product": "A product initiated and developed independently by Echo in Ink.",
  "Concept Project": "A self-directed concept used to explore and demonstrate a specific direction.",
  "Internal Project": "A studio-initiated system or tool developed for internal exploration.",
};

const displayedProvenance = Array.from(
  new Set(worksProjects.map((project) => project.classification.provenance)),
);

export function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All Work");
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageShell
      title="Selected Work — Echo in Ink"
      description="Independent products, concepts, prototypes and exploratory work across brands, digital experiences, products and systems."
      atmosphere="works"
      theme="light"
      withTopSpacing={false}
      className="ei-works-page"
    >
      <PageSectionHero
        eyebrow="SELECTED WORK"
        title="Work across brands, digital experiences, products and systems."
        description="A selected collection of independent products, concept projects, prototypes and exploratory studies—each labelled so what it demonstrates is clear without implying commissioned client work."
        offerAnchor="Proof, shaped as atmosphere."
        ctaLabel="Explore the Work"
        ctaHref="#selected-work"
        secondaryCtaLabel={primaryCallToAction.label}
        secondaryCtaHref={primaryCallToAction.href}
        image={worksHeroDesktop}
        mobileImage={worksHeroMobile}
        imageAlt="A blue-violet signal stream moving through a dark atmospheric field"
        theme="light"
        tone="editorial"
        headingId="works-heading"
      />

      <Section
        theme="lightElevated"
        transitionTo="mist"
        spacing="none"
        className="ei-works-reading-guide"
        aria-labelledby="works-reading-guide-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-works-section-inner"
          >
            <motion.div variants={driftUp} className="ei-works-section-heading">
              <SectionLabel label="How to read the work" tone="accent" />
              <div>
                <h2 id="works-reading-guide-heading">Context before claims.</h2>
                <p>
                  Every project separates provenance, status and capability. Provenance says what
                  kind of project it actually was. Status describes its level of maturity.
                  Capabilities show which part of Echo&apos;s shared commercial practice it demonstrates.
                </p>
              </div>
            </motion.div>

            <div className="ei-works-guide-grid">
              {displayedProvenance.map((provenance, index) => (
                <motion.div key={provenance} variants={driftUp}>
                  <EchoCard padding="lg" className="ei-works-guide-card">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{provenance}</h3>
                    <p>{provenanceDescriptions[provenance]}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeSoft} className="ei-works-guide-note">
              No project in the current collection is presented as client work. If verified client
              work is added later, it should be labelled just as explicitly.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="mist"
        transitionTo="light"
        spacing="none"
        className="ei-works-featured"
        aria-labelledby="works-featured-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-works-section-inner"
          >
            <motion.div variants={driftUp} className="ei-works-featured-label">
              <SectionLabel label="Featured project" />
            </motion.div>

            <motion.div variants={fadeSoft}>
              <EchoCard variant="proof" padding="none" className="ei-works-featured-panel" data-theme="deep">
                <div className="ei-works-featured-media">
                  <img src={lumoProject.image} alt="" aria-hidden="true" />
                  <div className="ei-works-featured-scrim" aria-hidden="true" />
                </div>
                <div className="ei-works-featured-copy">
                  <p className="ei-works-featured-kicker">Independent product evidence</p>
                  <h2 id="works-featured-heading">{lumoProject.title}</h2>
                  <p className="ei-works-featured-category">{lumoProject.category}</p>
                  <ProjectContext
                    classification={lumoProject.classification}
                    capabilities={lumoProject.capabilities}
                    scope={lumoProject.scope}
                    className="ei-works-featured-context"
                  />
                  <p className="ei-works-featured-proof">{lumoProject.proofLine}</p>
                  <p className="ei-works-featured-boundary">
                    The case study presents prototype-level product, identity and interface
                    direction. It does not claim a commissioned engagement or launched product.
                  </p>
                  <Button to={lumoProject.href ?? "/works/lumo"} variant="secondary">
                    View Lumo Case Study
                  </Button>
                </div>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="selected-work"
        theme="light"
        transitionTo="lightElevated"
        spacing="none"
        className="ei-works-collection-section"
        aria-labelledby="works-collection-heading"
      >
        <Container size="xl">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-works-section-inner"
          >
            <motion.div variants={driftUp} className="ei-works-section-heading">
              <SectionLabel label="Project collection" />
              <div>
                <h2 id="works-collection-heading">What each project demonstrates.</h2>
                <p>
                  Filter by the same four capability areas used on Services. Projects without a
                  complete case study remain intentionally non-clickable.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-works-filter-wrap">
              <WorkFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </motion.div>

            <motion.div variants={fadeSoft}>
              <WorksGrid activeFilter={activeFilter} />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section theme="lightElevated" spacing="none" className="ei-works-closing">
        <CTASection
          variant="editorialInvitation"
          panelTheme="deep"
          eyebrow="Start something real"
          heading="Bring the challenge. Build the evidence."
          body="If the work needs strategy, design and technology to move together, tell Echo what you are trying to make."
          actions={<Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>}
          secondary={
            <Button to="/studio" variant="tertiary">How the Studio Works</Button>
          }
        />
      </Section>
    </PageShell>
  );
}
