import { motion } from "framer-motion";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { worksProjects } from "@/data/worksProjects";
import {
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const selectedProjects = worksProjects
  .filter((project) => !project.featured)
  .slice(0, 3);

export function HomeSelectedWork() {
  return (
    <Section
      theme="atmospheric"
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
            <SectionLabel label="Proof, shaped as atmosphere" tone="accent" />
            <div>
              <h2 id="home-selected-work-heading" className="ei-type-section-heading">
                Selected Work
              </h2>
              <p className="ei-home-section-intro">
                A selection of independent concepts and prototype studies showing how strategy,
                identity and digital experience come together.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeSoft} className="ei-home-selected-grid">
            {selectedProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </motion.div>

          <motion.div variants={driftUp} className="ei-home-section-action">
            <Button to="/works" variant="secondary">
              View Our Work
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
