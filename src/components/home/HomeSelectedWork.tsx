import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { worksProjects } from "@/data/worksProjects";
import { siteActionLabels } from "@/data/siteNavigation";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

export function HomeSelectedWork() {
  return (
    <Section
      theme="mist"
      transitionTo="light"
      spacing="none"
      className="ei-home-selected-work"
      aria-labelledby="home-selected-work-heading"
    >
      <Container size="xl" className="relative z-10">
        <motion.div
          variants={staggerContainer(STAGGER.loose, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
          className="ei-home-section-inner"
        >
          <motion.div variants={driftUp} className="ei-home-section-header">
            <SectionLabel label="Selected project evidence" tone="accent" />
            <div>
              <h2 id="home-selected-work-heading" className="ei-type-section-heading">
                Selected Work
              </h2>
              <p className="ei-home-section-intro">
                Three real studio projects, each presented with its provenance, current maturity
                and evidence boundary intact.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-selected-grid">
            {worksProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} highlightOutcome />
            ))}
          </div>

          <motion.div variants={driftUp} className="ei-home-section-action">
            <p>Explore the complete three-project collection and the evidence behind each study.</p>
            <Button to="/works" variant="secondary">
              {siteActionLabels.viewWork}
              <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                →
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
