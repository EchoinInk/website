import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  driftUp,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const proofItems = [
  {
    label: "Selected proof",
    body: "Lumo leads as an independent product concept and prototype case study, with status made explicit before the deeper story.",
  },
  {
    label: "Evidence with context",
    body: "Provenance, status, and demonstrated capabilities stay separate so concepts and prototypes are never presented as client delivery.",
  },
  {
    label: "Clear taxonomy",
    body: "Independent products, concept projects, internal projects, prototypes, and exploratory studies are separated instead of blurred together.",
  },
] as const;

export function HomeProofStrip() {
  return (
    <Section spacing="none" className="relative overflow-hidden pt-4 pb-2 md:pt-6 md:pb-4">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(STAGGER.normal, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.normal}
          className="ei-home-proof-strip mx-auto max-w-6xl"
        >
          {proofItems.map((item) => (
            <motion.article
              key={item.label}
              variants={driftUp}
              className="ei-home-proof-strip-item"
            >
              <span className="ei-home-proof-strip-label">{item.label}</span>
              <p className="ei-home-proof-strip-copy">{item.body}</p>
            </motion.article>
          ))}
          <motion.div variants={driftUp} className="ei-home-proof-strip-action">
            <Link to="/works">
              Start with selected work{" "}
              <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
