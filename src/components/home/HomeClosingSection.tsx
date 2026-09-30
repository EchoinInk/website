import { motion } from "framer-motion";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import {
  blurEmergence,
  dissolveReveal,
  driftUp,
  DURATION,
  EASE_LUXURY
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
        <div>
          <motion.span
            variants={dissolveReveal}
            transition={{ duration: DURATION.slow, ease: EASE_LUXURY }}
            className="ei-type-label"
          >
            Ready to begin
          </motion.span>

          <motion.h2
            id="home-closing-heading"
            variants={blurEmergence}
            transition={{ duration: DURATION.slow, ease: EASE_LUXURY, delay: 0.05 }}
          >
            Bring the challenge. Let’s make it real.
          </motion.h2>
        </div>

        <div>
          <motion.p
            variants={driftUp}
            transition={{ duration: DURATION.slow, ease: EASE_LUXURY, delay: 0.1 }}
          >
            Share the problem, the opportunity, or what you’re trying to make real. You don’t need a
            complete brief — a starting point is enough.
          </motion.p>

          <motion.div
            variants={driftUp}
            transition={{ duration: DURATION.slow, ease: EASE_LUXURY, delay: 0.15 }}
            className="ei-home-closing-actions"
          >
            <Button to={primaryCallToAction.href} variant="primary">
              {primaryCallToAction.label}
              <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
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
