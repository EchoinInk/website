import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const steps = [
  ["01", "Clarify", "Define the real problem, the people it affects and what the work needs to make possible."],
  ["02", "Shape", "Connect strategy and design into a direction clear enough to assess before committing to build."],
  ["03", "Make", "Carry the thinking into implementation, refine the details and keep decisions visible."],
  ["04", "Hand over", "Leave the work understandable, usable and ready for the next stage rather than dependent on mystery."]
] as const;

export function HomeDelivery() {
  return (
    <Section
      theme="lightElevated"
      transitionTo="light"
      spacing="none"
      className="ei-home-delivery"
      aria-labelledby="home-delivery-heading"
    >
      <Container size="xl">
        <motion.div
          className="ei-home-section-inner"
          variants={staggerContainer(STAGGER.loose, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
        >
          <motion.div variants={driftUp} className="ei-home-delivery-heading">
            <SectionLabel label="Why Echo / How it works" tone="accent" />
            <div>
              <h2 id="home-delivery-heading" className="ei-type-section-heading">
                Fewer gaps between the thinking and the thing people use.
              </h2>
              <p className="ei-home-section-intro">
                Echo is useful when brand, experience and technology affect one another. One
                connected process keeps the intent clear as the work moves from decision to detail.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-delivery-steps">
            {steps.map(([number, title, body]) => (
              <motion.article key={title} variants={driftUp}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
