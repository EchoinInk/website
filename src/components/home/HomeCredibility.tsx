import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const credibilityPoints = [
  {
    label: "Solve real problems",
    body: "We start with the challenge, not the deliverable.",
    visual: "chorusCore"
  },
  {
    label: "Founder-led, collaborative",
    body: "Work directly with the person shaping and making the work.",
    visual: "axiomRing"
  },
  {
    label: "Design that survives",
    body: "Built to be used, maintained, and evolved over time.",
    visual: "quietAxis"
  }
] as const satisfies readonly { label: string; body: string; visual: OrbitalVariant }[];

export function HomeCredibility() {
  return (
    <Section
      theme="lightElevated"
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
