import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  blurEmergence,
  driftUp,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

export function Philosophy() {
  return (
    <Section
      theme="light"
      transitionTo="light"
      spacing="none"
      className="ei-home-studio"
      aria-labelledby="home-studio-heading"
    >
      <Container size="xl" className="relative z-10">
        <motion.div
          className="ei-home-section-inner ei-home-studio-inner"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
        >
          <motion.div variants={driftUp}>
            <SectionLabel label="Studio" tone="accent" />
          </motion.div>

          <div className="ei-home-studio-layout">
            <motion.div variants={staggerContainer(STAGGER.loose, 0)}>
              <motion.h2
                id="home-studio-heading"
                variants={blurEmergence}
                className="ei-type-section-heading"
              >
                Echo in Ink is a founder-led creative technology studio combining strategy,
                design and development.
              </motion.h2>

              <motion.p variants={driftUp} className="ei-home-studio-body">
                We work closely with people building businesses, products and ideas that need
                clearer positioning, stronger design or thoughtful technical implementation.
              </motion.p>

              <motion.div variants={driftUp}>
                <Button to="/studio" variant="secondary">
                  Meet the Studio
                  <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                    →
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={driftUp} className="ei-home-studio-editorial">
              <p>Close collaboration. Deliberate outcomes.</p>
              <span>Every engagement connects the idea to what people see, use and understand.</span>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
