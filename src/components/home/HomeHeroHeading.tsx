import { motion } from "framer-motion";
import { PageOfferAnchor } from "@/components/sections/PageOfferAnchor";
import { heroReveal } from "@/lib/motion-cinematic";

export function HeroHeading() {
  return (
    <div className="ei-monogram-frame ei-hero-system-text">
      <motion.div
        variants={heroReveal}
        className="ei-hero-system-eyebrow mb-4 flex items-center gap-4 md:mb-5"
      >
        <span className="ei-type-hero-eyebrow text-[var(--ei-color-text-secondary)]">
          CREATIVE TECHNOLOGY STUDIO
        </span>

        <div className="ei-home-hero-eyebrow-rule" aria-hidden="true" />
      </motion.div>

      <h1
        id="hero-heading"
        className="ei-type-hero-home ei-home-hero-heading ei-hero-system-heading"
      >
        We design and build brands, websites, digital products and systems.
      </h1>

      <motion.p
        variants={heroReveal}
        className="ei-type-hero-description ei-home-hero-description ei-hero-system-description"
      >
        For founders and teams whose next move needs more than a surface-level fix, Echo brings
        strategy, design and development together to create a clearer brand, stronger digital
        experience and a practical path from idea to implementation.
      </motion.p>

      <PageOfferAnchor className="ei-home-hero-philosophy">
        Designing the worlds your work lives in.
      </PageOfferAnchor>
    </div>
  );
}
