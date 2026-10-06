import { motion, useReducedMotion } from "framer-motion";

import worksHeroDesktop from "@/assets/imagery/hero/works-hero-desktop.png";
import worksHeroMobile from "@/assets/imagery/hero/works-hero-mobile.png";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { CtaOrbitalBackground } from "@/components/ui/CTAOrbitalBackground";
import { EchoCard } from "@/components/ui/EchoCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectContext } from "@/components/works/ProjectContext";
import { WorksGrid } from "@/components/works/WorksGrid";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import { lumoProject, provenanceTaxonomy } from "@/data/worksProjects";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const displayedProvenance = provenanceTaxonomy.filter(({ id }) => id !== "exploratory-study");

export function WorksPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageShell
      title="Selected Work — Echo in Ink"
      description="Selected product and system work shown with its thinking, constraints, provenance and maturity intact."
      atmosphere="works"
      theme="light"
      withTopSpacing={false}
      className="ei-works-page"
    >
      <PageSectionHero
        eyebrow="SELECTED WORK"
        title="Work shown with its context intact."
        description={
          <>
            <span>Every project represents more than a finished screen, visual identity or system.</span>
            <span>
              The work shown here includes the thinking behind the outcome, the constraints it
              responded to and the role it was designed to play. The goal is not simply to display
              results, but to demonstrate how strategy, design and technology come together in
              practice.
            </span>
          </>
        }
        offerAnchor="Evidence, not highlights."
        ctaLabel={siteActionLabels.viewWork}
        ctaHref="#selected-work"
        secondaryCtaLabel={primaryCallToAction.label}
        secondaryCtaHref={primaryCallToAction.href}
        image={worksHeroDesktop}
        mobileImage={worksHeroMobile}
        imageAlt="Lumo, Keystone and Codexia product concepts arranged across a violet mountain landscape"
        theme="light"
        tone="editorial"
        transition="atmospheric"
        transitionTo="lightElevated"
        headingId="works-heading"
        supportingContent={
          <div className="ei-works-trust-signal" role="note" aria-label="Project provenance commitment">
            <span className="ei-works-trust-icon" aria-hidden="true">◇</span>
            <span>
              <strong>No speculative work presented as client work.</strong>
              <small>Every project is labelled with its purpose, provenance and maturity.</small>
            </span>
          </div>
        }
      />

      <Section
        theme="lightElevated"
        transition="chapter"
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
              <SectionLabel label="Featured case study" />
            </motion.div>

            <motion.div variants={fadeSoft}>
              <EchoCard variant="proof" padding="none" className="ei-works-featured-panel">
                <div className="ei-works-featured-media">
                  <img
                    src={lumoProject.image}
                    alt="Lumo mobile interface concepts with the supportive cloud companion"
                  />
                  <div className="ei-works-featured-scrim" aria-hidden="true" />
                </div>
                <div className="ei-works-featured-copy">
                  <p className="ei-works-featured-kicker">01 · Featured project</p>
                  <h2 id="works-featured-heading">Lumo</h2>
                  <p className="ei-works-featured-category">{lumoProject.category}</p>
                  <div className="ei-works-featured-summary">
                    {lumoProject.description.split(". ").map((sentence) => (
                      <p key={sentence}>{sentence.endsWith(".") ? sentence : `${sentence}.`}</p>
                    ))}
                  </div>
                  <ProjectContext
                    classification={lumoProject.classification}
                    capabilities={lumoProject.capabilities}
                    className="ei-works-featured-context"
                  />
                  <dl className="ei-works-featured-evidence" aria-label="Lumo project summary">
                    <div>
                      <dt>Challenge</dt>
                      <dd>{lumoProject.challenge}</dd>
                    </div>
                    <div className="ei-works-featured-outcome">
                      <dt>Outcome</dt>
                      <dd>{lumoProject.result}</dd>
                    </div>
                  </dl>
                  <Button to={lumoProject.href ?? "/works/lumo"} variant="tertiary">
                    View Lumo Case Study <span aria-hidden="true">→</span>
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
        transition="soft"
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
                <h2 id="works-collection-heading">Different challenges. Different answers.</h2>
                <p>No two projects begin in the same place.</p>
                <p>
                  Some require clearer positioning. Others need stronger systems, better experiences
                  or more deliberate product thinking. The outcome changes. The underlying approach
                  remains consistent.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <WorksGrid />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="lightElevated"
        transition="atmospheric"
        transitionTo="deep"
        spacing="none"
        className="ei-works-reading-guide ei-transition-closing"
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
              <SectionLabel label="How the work is labelled" tone="accent" />
              <div>
                <h2 id="works-reading-guide-heading">Clear categories. Clear expectations.</h2>
                <p>Practice work, internal products and commercial projects are not the same thing.</p>
                <p>
                  Each project is labelled accordingly so the context is always visible and the
                  nature of the work remains clear.
                </p>
              </div>
            </motion.div>

            <div className="ei-works-guide-grid">
              {displayedProvenance.map((provenance, index) => (
                <motion.div key={provenance.id} variants={driftUp}>
                  <EchoCard padding="lg" className="ei-works-guide-card">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{provenance.label}</h3>
                    <p>{provenance.description}</p>
                    <p>{provenance.supporting}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeSoft} className="ei-works-guide-note">
              Every project includes context about its purpose, scope and role within the broader
              body of work.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section
        theme="deep"
        transition="soft"
        transitionTo="light"
        spacing="none"
        className="ei-works-closing"
      >
        <CTASection
          variant="editorialInvitation"
          panelTheme="deep"
          eyebrow="Start something real"
          heading={<>Bring the challenge.<br />We&apos;ll explore the shape of the answer.</>}
          body={
            <>
              <p>The best projects don&apos;t begin with a solution.</p>
              <p>They begin with a problem worth understanding.</p>
              <p>
                If the work requires strategy, design and technology to move together, Echo in Ink
                can help bring the pieces into alignment.
              </p>
            </>
          }
          decoration={<CtaOrbitalBackground />}
          actions={<Button to={primaryCallToAction.href}>{primaryCallToAction.label}</Button>}
          secondary={
            <Button to="/studio" variant="secondary">
              How the Studio Works
            </Button>
          }
        />
      </Section>
    </PageShell>
  );
}
