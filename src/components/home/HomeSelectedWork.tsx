import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import codexiaHome from "@/assets/projects/codexia-home.png";
import keystoneHome from "@/assets/projects/keystone-home.png";
import {
  driftUp,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const selectedProjects = [
  { name: "Keystone", image: keystoneHome },
  { name: "Codexia", image: codexiaHome },
] as const;

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
            <SectionLabel label="Proof, shaped as atmosphere" tone="accent" />
            <div>
              <h2 id="home-selected-work-heading" className="ei-type-section-heading">
                Selected Work
              </h2>
              <p className="ei-home-section-intro">
                Current flagship work from Echo in Ink.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-selected-grid">
            {selectedProjects.map((project, index) => (
              <motion.article
                key={project.name}
                variants={driftUp}
                className="ei-home-flagship-card"
                data-project={project.name.toLowerCase()}
              >
                <div className="ei-home-flagship-visual">
                  <img
                    src={project.image}
                    alt={`${project.name} project interface`}
                    loading="lazy"
                  />
                </div>
                <div className="ei-home-flagship-meta">
                  <span>Selected work</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{project.name}</h3>
              </motion.article>
            ))}
          </div>

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
