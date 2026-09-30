import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const credibilityPoints = [
  {
    label: "Solve real problems",
    body: "From complexity to clarity, we start with the problem.",
    visual: "chorusCore"
  },
  {
    label: "Founder-led, collaborative",
    body: "Work directly with senior attention from first question through delivery.",
    visual: "axiomRing"
  },
  {
    label: "Design that survives",
    body: "Considered systems, not fragile artifacts — built to be used, adapted and grown.",
    visual: "quietAxis"
  }
] as const satisfies readonly { label: string; body: string; visual: OrbitalVariant }[];

export function HomeCredibility() {
  return (
    <Section
      theme="lightElevated"
      transition="chapter"
      transitionTo="mist"
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
              <OrbitalVisual variant={point.visual} size={42} />
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
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
