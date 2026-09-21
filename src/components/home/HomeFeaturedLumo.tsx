import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import lumoinkdrift from "@/assets/imagery/sections/lumo-featured-bg.webp";
import lumoinkdriftMobile from "@/assets/imagery/sections/lumo-featured-mobile.webp";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { EchoCard } from "@/components/ui/EchoCard";
import { ProjectContext } from "@/components/works/ProjectContext";
import {
  blurEmergence,
  driftUp,
  staggerContainer,
  orchestratedReveal,
  STAGGER,
  VIEWPORT,
  DURATION,
} from "@/lib/motion-cinematic";

const disciplines = [
  "Product Strategy",
  "UX/UI",
  "React Native",
  "Design Systems",
  "Product Architecture",
  "Brand / Character System",
];

const lumoContext = {
  status: "Independent product concept",
  scope: "Identity direction, interface concept, visual system",
  type: "Prototype case study",
} as const;

export function LumoCaseStudyTeaser() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawImageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [10, -10],
  );

  const imageY = useSpring(rawImageY, {
    stiffness: 28,
    damping: 44,
    restDelta: 0.001,
  });

  return (
    <Section
      theme="atmospheric"
      transitionTo="light"
      spacing="none"
      className="ei-home-lumo relative overflow-hidden"
      aria-labelledby="home-lumo-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 28% at 66% 48%, rgb(var(--ei-violet-rgb) / 0.045) 0%, transparent 68%)",
          filter: "blur(70px)",
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT.loose}
          className="mx-auto max-w-6xl"
        >
          <motion.div
            variants={driftUp}
            className="ei-home-lumo-header"
          >
            <span className="ei-type-label">Featured product concept</span>
            <span aria-hidden="true" className="ei-home-lumo-header-rule" />
            <p>
              An independent concept demonstrating how product strategy, interface design and
              technical architecture can become one coherent experience.
            </p>
          </motion.div>

          <motion.div variants={blurEmergence}>
            <EchoCard variant="feature" padding="none" className="ei-card-world">
              <Link to="/works/lumo" className="ei-card-world-link group">
                <div className="ei-card-world-media">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      y: imageY,
                      scale: 1.04,
                    }}
                  >
                    <picture className="absolute inset-0 block">
                      <source media="(max-width: 768px)" srcSet={lumoinkdriftMobile} />

                      <img
                        src={lumoinkdrift}
                        alt="LUMO — atmospheric UI exploration"
                        className="h-full w-full object-cover object-[57%_50%]"
                      />
                    </picture>
                  </motion.div>

                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay"
                    style={{
                      opacity: 0.025,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                    animate={
                      prefersReduced ? undefined : { opacity: [0.015, 0.03, 0.015] }
                    }
                    transition={
                      prefersReduced
                        ? undefined
                        : {
                            duration: DURATION.breath,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                          }
                    }
                  />
                </div>

                <div className="ei-card-world-overlay" aria-hidden="true" />

                <div className="ei-card-world-copy">
                  <motion.div variants={staggerContainer(STAGGER.normal, 0.15)}>
                    <motion.h2
                      id="home-lumo-heading"
                      variants={orchestratedReveal(0, 3)}
                      className="
                        ei-card-world-title font-editorial
                        text-[3.75rem]
                        leading-[0.92]
                        tracking-[-0.045em]
                        md:text-[4.6rem]
                        lg:text-[5.15rem]
                      "
                    >
                      LUMO
                    </motion.h2>

                    <motion.p
                      variants={orchestratedReveal(1, 3)}
                      className="
                        ei-card-world-subtitle mt-5
                        max-w-[18ch]
                        font-editorial
                        text-[1.35rem]
                        leading-[1.18]
                        tracking-[-0.025em]
                        md:text-[1.5rem]
                      "
                    >
                      A world built for overwhelmed humans.
                    </motion.p>

                    <motion.p
                      variants={orchestratedReveal(2, 3)}
                      className="
                        ei-card-world-copy-text mt-7
                        max-w-[38ch]
                        font-[var(--ei-font-copy)]
                        text-[0.8125rem]
                        leading-[1.75]
                        tracking-[-0.004em]
                      "
                    >
                      An independent companion app concept shaped to reduce cognitive load through
                      calm planning, emotional safety and a coherent digital atmosphere.
                    </motion.p>

                    <motion.div variants={orchestratedReveal(2, 3)}>
                      <ProjectContext
                        context={lumoContext}
                        compact
                        className="ei-card-world-context"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={driftUp}>
                    <span className="ei-card-action">
                      View prototype case study{" "}
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </motion.div>
                </div>
              </Link>
            </EchoCard>
          </motion.div>

          <motion.div
            variants={driftUp}
            className="mt-5 flex flex-wrap items-center gap-y-2 md:justify-end"
          >
            {disciplines.map((tag, i) => (
              <span key={tag} className="flex items-center">
                <span className="ei-type-studio-label tracking-[0.18em]">
                  {tag}
                </span>

                {i < disciplines.length - 1 && (
                  <span className="mx-4 font-mono text-[10px] text-[var(--ei-color-text-faint)]">
                    +
                  </span>
                )}
              </span>
            ))}
          </motion.div>

        </motion.div>
      </Container>
    </Section>
  );
}
