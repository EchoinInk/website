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
        "Focused guidance for a challenge, opportunity, or decision that needs clarity.",
      metadata: ["60-90 minutes", "Focused & strategic"]
    },
    "digital-reset": {
      title: "Digital Reset",
      description:
        "A contained rethink of an existing brand, website, product, or digital experience.",
      metadata: ["2-8 weeks", "Focused scope"]
    },
    "full-projects": {
      title: "Full Project",
      description:
        "Strategy, design, and development brought together from definition through delivery.",
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
                Three ways to start. One direction forward.
              </h2>
            </div>

            <div className="ei-home-section-support">
              <p className="ei-home-section-intro">
                Not every project starts in the same place. Choose the level of support that meets you where you are.
              </p>
            </div>
          </motion.div>

          <div className="ei-home-engagement-grid">
            {engagementModels.map((model, index) => (
              <motion.article
                key={model.id}
                variants={driftUp}
                className="ei-home-engagement"
              >
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