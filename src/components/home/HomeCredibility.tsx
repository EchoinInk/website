import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const credibilityPoints = [
  {
    label: "One connected practice",
    body: "Strategy, design and development are considered together, so the direction survives implementation."
  },
  {
    label: "Direct senior collaboration",
    body: "You work with the founder responsible for shaping and delivering the work."
  },
  {
    label: "Proof with boundaries",
    body: "Every selected project names what it is, what it demonstrates and what is not being claimed."
  }
] as const;

export function HomeCredibility() {
  return (
    <Section
      theme="lightElevated"
      transitionTo="light"
      spacing="none"
      className="ei-home-credibility"
      aria-label="How Echo in Ink works"
    >
      <Container size="xl">
        <motion.div
          className="ei-home-credibility-grid"
          variants={staggerContainer(STAGGER.normal, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
        >
          {credibilityPoints.map((point, index) => (
            <motion.article key={point.label} variants={driftUp}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{point.label}</h2>
                <p>{point.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
