import { motion } from "framer-motion";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import {
  dissolveReveal,
  driftUp,
  DURATION,
  EASE_LUXURY,
} from "@/lib/motion-cinematic";

export function ClosingSection() {
  return (
    <Section
      theme="light"
      spacing="none"
      className="ei-home-closing"
      aria-labelledby="home-closing-heading"
    >
      <motion.div
        className="ei-home-closing-copy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="ei-home-closing-heading">
          <motion.div
            variants={dissolveReveal}
            transition={{
              duration: DURATION.slow,
              ease: EASE_LUXURY,
            }}
          >
            <SectionLabel label="Ready to begin" tone="accent" />
          </motion.div>

          <motion.h2
            id="home-closing-heading"
            variants={dissolveReveal}
            transition={{
              duration: DURATION.slow,
              ease: EASE_LUXURY,
              delay: 0.05,
            }}
            className="ei-type-section-heading"
          >
            Make the mark. Let it echo.
          </motion.h2>
        </div>

        <div className="ei-home-closing-support">
          <motion.p
            variants={driftUp}
            transition={{
              duration: DURATION.slow,
              ease: EASE_LUXURY,
              delay: 0.1,
            }}
          >
            Bring the challenge, the opportunity, or the idea — even if it’s still taking shape. We can help turn the starting point into something clear, considered and ready to move forward.
          </motion.p>

          <motion.div
            variants={driftUp}
            transition={{
              duration: DURATION.slow,
              ease: EASE_LUXURY,
              delay: 0.15,
            }}
            className="ei-home-closing-actions"
          >
            <Button to={primaryCallToAction.href} variant="primary">
              {primaryCallToAction.label}
              <span
                aria-hidden="true"
                className="ei-cta-arrow ei-cta-arrow-right"
              >
                →
              </span>
            </Button>

            <Button to="/booking" variant="secondary">
              {siteActionLabels.requestStrategySession}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}