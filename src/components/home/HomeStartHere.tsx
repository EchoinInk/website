import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { engagementModels } from "@/data/servicesContent";
import {
  driftUp,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

export function HomeStartHere() {
  return (
    <Section
      theme="light"
      transitionTo="atmospheric"
      spacing="none"
      className="ei-home-engagements"
      aria-labelledby="home-engagements-heading"
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
            <SectionLabel label="Ways to Work Together" tone="accent" />
            <div>
              <h2 id="home-engagements-heading" className="ei-type-section-heading">
                Choose the shape that fits the work.
              </h2>
              <p className="ei-home-section-intro">
                Each engagement can stand on its own. Start with the level of focus and momentum
                the problem needs now.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-engagement-grid">
            {engagementModels.map((model, index) => (
              <motion.article
                key={model.id}
                variants={driftUp}
                className="ei-home-engagement"
              >
                <span className="ei-home-engagement-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <Button to={model.href} variant="tertiary">
                  {model.cta}
                  <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                    →
                  </span>
                </Button>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
