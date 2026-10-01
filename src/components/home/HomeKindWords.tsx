import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { driftUp, VIEWPORT } from "@/lib/motion-cinematic";

const evidenceNotes = [
  {
    label: "CLIENT WORDS — WHEN READY.",
    body: "Client feedback will appear here when it’s ready to share. Until then, the work is presented with clear context and evidence."
  },
  {
    label: "THE WORK — IN CONTEXT.",
    body: "Each project is shown with its provenance, maturity and status made explicit — keeping the work clear without overstating what it is."
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
      className="ei-home-kind-words"
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
