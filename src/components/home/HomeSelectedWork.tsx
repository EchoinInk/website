import { motion } from "framer-motion";

import lumoProjectVisual from "@/assets/imagery/hero/lumo-page-hero-desktop.webp";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { worksProjects } from "@/data/worksProjects";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const homeProjectTheses: Record<(typeof worksProjects)[number]["title"], string> = {
  LUMO: "A calmer, more supportive way to plan daily life without adding more overwhelm.",
  Keystone: "A calmer operating model for the work behind the studio.",
  Codexia: "A governed engineering platform for authority, evidence and discovery."
};

export function HomeSelectedWork() {
  return (
    <Section
      theme="mist"
      transition="atmospheric"
      transitionDirection="forward"
      transitionTo="lightElevated"
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
            <div>
              <SectionLabel label="Selected Work" tone="accent" />
              <h2 id="home-selected-work-heading" className="ei-type-section-heading">
                Selected projects, shown in meaningful context.
              </h2>
            </div>

            <div className="ei-home-section-support">
              <p className="ei-home-section-intro">
                Different problems. Different shapes. Each project is presented with its provenance,
                challenge and outcome — <strong>no speculative work posed as client work.</strong>
              </p>

              <Button to="/works" variant="tertiary">
                View all work
                <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                  →
                </span>
              </Button>
            </div>
          </motion.div>

          <div className="ei-home-selected-grid">
            {worksProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                title={project.title === "LUMO" ? "Lumo" : project.title}
                image={project.title === "LUMO" ? lumoProjectVisual : project.image}
                proofLine={homeProjectTheses[project.title]}
                index={index}
                homeCompact
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}