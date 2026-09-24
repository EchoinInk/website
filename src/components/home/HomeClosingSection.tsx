import { motion } from "framer-motion";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { CtaOrbitalBackground } from "@/components/ui/CTAOrbitalBackground";
import { primaryCallToAction } from "@/data/siteNavigation";
import {
  blurEmergence,
  dissolveReveal,
  driftUp,
  DURATION,
  EASE_LUXURY,
} from "@/lib/motion-cinematic";

export function ClosingSection() {
  return (
    <Section
      theme="mist"
      spacing="none"
      className="ei-home-closing"
      aria-labelledby="home-closing-heading"
    >
      <CtaOrbitalBackground />
      <div aria-hidden="true" className="ei-home-closing-glow" />

      <motion.div
        className="ei-home-closing-copy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.span
          variants={dissolveReveal}
          transition={{ duration: DURATION.slow, ease: EASE_LUXURY }}
          className="ei-type-label"
        >
          Your next move
        </motion.span>

        <motion.h2
          id="home-closing-heading"
          variants={blurEmergence}
          transition={{
            duration: DURATION.slow,
            ease: EASE_LUXURY,
            delay: 0.05,
          }}
        >
          Let’s make it real.
        </motion.h2>

        <motion.p
          variants={driftUp}
          transition={{
            duration: DURATION.slow,
            ease: EASE_LUXURY,
            delay: 0.1,
          }}
        >
          Bring the challenge, the ambition or the idea still looking for its shape.
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
          </Button>
          <Button to="/booking" variant="secondary">
            Book a Strategy Session
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
