import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { driftUp, VIEWPORT } from "@/lib/motion-cinematic";

const evidenceNotes = [
  {
    label: "Real feedback, when it can be shared.",
    body: "Approved client words will appear here when attributable feedback is available for public use. Echo does not publish invented endorsements or imply client work where none has been verified."
  },
  {
    label: "Project evidence, clearly labelled.",
    body: "Case studies distinguish commissioned, independent, internal, and exploratory work so the provenance of every project remains clear."
  }
] as const;

export function HomeKindWords() {
  return (
    <Section
      theme="light"
      transition="atmospheric"
      transitionDirection="forward"
      transitionTo="light"
      spacing="none"
      className="ei-home-kind-words ei-transition-closing"
      aria-labelledby="home-kind-words-heading"
    >
      <Container size="xl">
        <motion.div
          className="ei-home-kind-words-inner"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
        >
          <motion.div variants={driftUp} className="ei-home-kind-words-heading">
            <SectionLabel label="Kind Words" tone="accent" />
            <h2 id="home-kind-words-heading" className="ei-type-section-heading">
              Real people. Meaningful work.
            </h2>
          </motion.div>

          <div className="ei-home-evidence-grid" aria-label="Client words and project evidence">
            {evidenceNotes.map((note) => (
              <motion.article key={note.label} variants={driftUp} className="ei-home-evidence-card">
                <span>{note.label}</span>
                <p>{note.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
