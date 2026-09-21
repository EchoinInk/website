import { motion } from "framer-motion";
import { PageOfferAnchor } from "@/components/sections/PageOfferAnchor";
import { heroReveal } from "@/lib/motion-cinematic";

export function HeroHeading() {
  return (
    <div className="ei-monogram-frame max-w-[640px] md:max-w-[620px] lg:max-w-[680px]">
      <motion.div
        variants={heroReveal}
        className="mb-4 flex items-center gap-4 md:mb-5"
      >
        <span className="ei-type-hero-eyebrow text-[var(--ei-color-text-secondary)]">
          CREATIVE TECHNOLOGY STUDIO
        </span>

        <div className="ei-home-hero-eyebrow-rule" aria-hidden="true" />
      </motion.div>

      <h1
        id="hero-heading"
        className="ei-type-hero-home ei-home-hero-heading"
      >
        We design and build brands, websites, digital products and systems.
      </h1>

      <motion.p
        variants={heroReveal}
        className="ei-type-hero-description ei-home-hero-description"
      >
        Echo in Ink brings strategy, design and development together to create thoughtful digital
        experiences for businesses, products and ideas that are ready for what’s next.
      </motion.p>

      <PageOfferAnchor className="ei-home-hero-philosophy">
        Designing the worlds your work lives in.
      </PageOfferAnchor>
    </div>
  );
}
