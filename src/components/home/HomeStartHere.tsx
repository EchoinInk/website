import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { engagementModels } from "@/data/servicesContent";
import { driftUp, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

export function HomeStartHere() {
  const engagementPresentation = {
    "strategy-sessions": {
      title: "Strategy Session",
      description:
        "A focused 60–90 minute session to bring clarity to a specific question or challenge.",
      metadata: ["60–90 minutes", "Focused & strategic"]
    },
    "digital-reset": {
      title: "Digital Reset",
      description:
        "A contained redesign or rethink of an existing brand, website or product experience.",
      metadata: ["2–8 weeks", "Focused scope"]
    },
    "full-projects": {
      title: "Full Project",
      description: "Strategy through to design and implementation for complex or ambitious work.",
      metadata: ["Tailored timeline", "End-to-end"]
    }
  } as const;

  return (
    <Section
      theme="light"
      transition="atmospheric"
      transitionDirection="reverse"
      transitionTo="light"
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
            <div>
              <SectionLabel label="Ways to Engage" tone="accent" />
              <h2 id="home-engagements-heading" className="ei-type-section-heading">
                Different starting points. Three ways forward.
              </h2>
            </div>
            <div className="ei-home-section-support">
              <p className="ei-home-section-intro">
                Not every project needs the same shape. We adapt the work to what you need, where you are, and what comes next.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-engagement-grid">
            {engagementModels.map((model, index) => (
              <motion.article key={model.id} variants={driftUp} className="ei-home-engagement">
                <Link
                  to={model.href}
                  aria-label={`${model.cta}: ${engagementPresentation[model.id].title}`}
                >
                  <span className="ei-home-engagement-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ei-home-card-arrow" aria-hidden="true">
                    →
                  </span>
                  <h3>{engagementPresentation[model.id].title}</h3>
                  <p>{engagementPresentation[model.id].description}</p>
                  <div className="ei-home-engagement-meta">
                    {engagementPresentation[model.id].metadata.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
