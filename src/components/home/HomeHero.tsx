import { motion } from "framer-motion";
import { HeroBackground } from "./HomeHeroBackground";
import { HeroCTA } from "./HomeHeroCTA";
import { HeroHeading } from "./HomeHeroHeading";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";

import { heroReveal } from "@/lib/motion-cinematic";

export function Hero() {
  return (
    <Section
      theme="light"
      transition="soft"
      transitionTo="lightElevated"
      spacing="none"
      className="ei-section-hero ei-home-hero ei-hero-system"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <Container
        size="xl"
        className="ei-home-hero-container ei-hero-system-container relative z-10"
      >
        <motion.div className="ei-home-hero-copy ei-hero-system-copy">
          <motion.div variants={heroReveal}>
            <HeroHeading />
          </motion.div>

          <motion.div variants={heroReveal} transition={{ delay: 0.2 }}>
            <HeroCTA />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
