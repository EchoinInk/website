import { motion } from "framer-motion";

import approachArtwork from "@/assets/imagery/sections/lumo-featured-bg.webp";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const steps = [
  ["01", "Clarify", "Understand the problem, constraints and opportunity."],
  ["02", "Shape", "Define direction, structure and the path forward."],
  ["03", "Make", "Design and build together."],
  ["04", "Hand over", "Leave behind a maintainable system and clear documentation."]
] as const;

export function HomeDelivery() {
  return (
    <Section
      theme="light"
      transitionTo="light"
      spacing="none"
      className="ei-home-delivery"
      aria-labelledby="home-delivery-heading"
    >
      <Container size="xl">
        <motion.div
          className="ei-home-section-inner"
          data-theme="deep"
          variants={staggerContainer(STAGGER.loose, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
        >
          <img
            src={approachArtwork}
            alt=""
            aria-hidden="true"
            className="ei-home-delivery-artwork"
          />
          <motion.div variants={driftUp} className="ei-home-delivery-heading">
            <div>
              <SectionLabel label="Our Approach" tone="accent" />
              <h2 id="home-delivery-heading" className="ei-type-section-heading">
                <span>Fewer gaps between</span> <span>the thinking and the thing</span>{" "}
                <span>people use.</span>
              </h2>
            </div>
            <div className="ei-home-delivery-copy">
              <p className="ei-home-section-intro">
                Strategy, design and development move together through four connected stages —
                keeping decisions clear, quality high, and momentum real.
              </p>
              <Button to="/studio" variant="secondary">
                Our way of working
                <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                  →
                </span>
              </Button>
            </div>
          </motion.div>

          <div className="ei-home-delivery-steps">
            {steps.map(([number, title, body]) => (
              <motion.article key={title} variants={driftUp}>
                <div className="ei-home-delivery-stage-heading">
                  <span>{number}</span>
                  <h3>{title}</h3>
                </div>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
