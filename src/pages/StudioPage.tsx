import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import {
  OrbitalVisual,
  type OrbitalVariant,
} from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";

import studioHeroDesktop from "@/assets/imagery/hero/studio-hero-desktop.webp";
import studioHeroMobile from "@/assets/imagery/hero/studio-hero-mobile.webp";
import lumoFeaturedBg from "@/assets/imagery/sections/lumo-featured-bg.webp";
import studioPhilosophyArtifact from "@/assets/imagery/sections/studio-philosophy-artifact.webp";

import {
  driftUp,
  fadeSoft,
  blurEmergence,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const principles: Array<{
  title: string;
  body: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Meaning over noise",
    body: "We strip away the unnecessary to reveal what matters.\nClarity is not minimalism — it is emotional precision.",
    icon: "vectorLattice",
  },
  {
    title: "Design with feeling",
    body: "Strategy is held with care.\nIdentity becomes coherent when the inner world is acknowledged, not avoided.",
    icon: "chorusCore",
  },
  {
    title: "Built to resonate",
    body: "We craft systems and digital worlds designed to endure —\nnot louder, but deeper.",
    icon: "vectorLattice",
  },
];

const pillars: Array<{
  number: string;
  title: string;
  body: string;
  output: string;
  href: string;
  imageClass: string;
  icon: OrbitalVariant;
}> = [
  {
    number: "01",
    title: "Identity Systems",
    body: "Strategic identity frameworks that reveal essence, build recognition, and create emotional resonance.",
    output: "Output: identity strategy, visual language, and practical guidance.",
    href: "/identity",
    imageClass:
      "bg-[radial-gradient(circle_at_50%_28%,rgb(var(--ei-electric-blue-rgb)/0.22),transparent_38%),radial-gradient(circle_at_52%_62%,rgb(var(--ei-halo-blue-rgb)/0.08),transparent_54%)]",
    icon: "vectorLattice",
  },
  {
    number: "02",
    title: "Immersive Websites",
    body: "Digital experiences that blend story, design, and atmosphere into seamless worlds.",
    output: "Output: a responsive website and coherent digital experience.",
    href: "/works",
    imageClass:
      "bg-[radial-gradient(circle_at_50%_30%,rgb(var(--ei-halo-blue-rgb)/0.18),transparent_42%),linear-gradient(145deg,rgb(var(--ei-midnight-rgb)/0.7),rgb(var(--ei-void-rgb)/0.95))]",
    icon: "memoryComet",
  },
  {
    number: "03",
    title: "Narrative Architecture",
    body: "Story systems that align your message, audience, and transformation.",
    output: "Output: positioning, messaging architecture, and a story framework.",
    href: "/worlds",
    imageClass:
      "bg-[radial-gradient(circle_at_70%_30%,rgb(var(--ei-electric-blue-rgb)/0.18),transparent_42%),radial-gradient(circle_at_38%_68%,rgb(var(--ei-halo-blue-rgb)/0.16),transparent_48%)]",
    icon: "focusDial",
  },
  {
    number: "04",
    title: "Creative Direction",
    body: "Art direction and visual strategy that bring coherence, depth, and vision to every touchpoint.",
    output: "Output: art direction, reference systems, and touchpoint guidance.",
    href: "/worlds",
    imageClass:
      "bg-[radial-gradient(circle_at_35%_30%,rgb(var(--ei-halo-blue-rgb)/0.2),transparent_38%),radial-gradient(circle_at_75%_62%,rgb(var(--ei-electric-blue-rgb)/0.11),transparent_50%)]",
    icon: "innerTide",
  },
];

const process = [
  {
    number: "01",
    title: "Foundation",
    body: "We listen, explore, and uncover the essence beneath the surface.",
  },
  {
    number: "02",
    title: "Resonance",
    body: "We shape strategy, narrative, and identity with emotional clarity.",
  },
  {
    number: "03",
    title: "Embodiment",
    body: "We design systems, experiences, and touchpoints that bring it to life.",
  },
  {
    number: "04",
    title: "Atmosphere",
    body: "We refine the details, create cohesion, and launch your world with intention.",
  },
] as const;

export function StudioPage() {
  return (
    <PageShell atmosphere="studio" theme="deep" withTopSpacing={false} className="ei-studio-page">
      <Helmet>
        <title>Studio | Echo In Ink</title>
        <meta
          name="description"
          content="The philosophy, principles, and creative direction behind Echo In Ink."
        />
      </Helmet>

      <PageSectionHero
        eyebrow="Studio"
        title={"High-touch work.\nMeaningful worlds."}
        italicWord="worlds"
        description="We partner with founders, artists, and cultural projects to design identity systems, digital experiences, and narrative direction that make meaningful work feel coherent and distinct."
        offerAnchor="A selective creative studio for identity, digital experience, and worldbuilding work that needs depth and usable structure."
        ctaLabel="Discuss a project"
        ctaHref="/contact?inquiry=project"
        secondaryCtaLabel="Explore how we work"
        secondaryCtaHref="#studio-process"
        image={studioHeroDesktop}
        mobileImage={studioHeroMobile}
        imageAlt="Atmospheric cosmic portal in violet, blue, and magenta light"
        align="left"
      />

      {/* PHILOSOPHY */}
      <Section
        spacing="none"
        className="ei-studio-major-section relative pb-0 will-change-transform"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-content-rail"
          >
            <motion.div variants={driftUp} className="relative">
              <SectionLabel label="Our Philosophy" />
            </motion.div>

            <motion.div
              variants={fadeSoft}
              className="mt-8 grid gap-10 rounded-[var(--ei-card-radius-xl)] border border-[rgb(var(--ei-moonlit-rgb)/0.1)] bg-[rgb(var(--ei-void-rgb)/0.12)] p-6 shadow-[inset_0_1px_0_rgb(var(--ei-ice-white-rgb)/0.025),0_0_72px_rgb(var(--ei-violet-rgb)/0.04)] md:-translate-y-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)_minmax(18rem,0.82fr)] md:items-center md:gap-10 md:px-8 md:pb-7 md:pt-9 lg:px-10 lg:pb-8 lg:pt-12"
            >
              <motion.div variants={driftUp} className="relative">
                <motion.h2
                  variants={blurEmergence}
                  className="ei-type-studio-philosophy max-w-[18ch] whitespace-pre-line"
                >
                  {"We design with\n"}
                  <em className="ei-type-studio-philosophy-emphasis">
                    feeling
                  </em>
                  ,{" "}
                  <em className="ei-type-studio-philosophy-emphasis">
                    intention
                  </em>
                  ,<br /> and{" "}
                  <em className="ei-type-studio-philosophy-emphasis-blue">
                    clarity
                  </em>
                  .
                </motion.h2>
              </motion.div>

              <motion.div
                variants={driftUp}
                className="relative max-w-[62ch] md:-top-4"
              >
                <p className="ei-type-body mt-16 text-[var(--ei-color-text-secondary)]">
                  Design is not decoration — it is meaning made visible. Every
                  decision is rooted in understanding, shaped by emotion, and
                  refined through story.
                </p>
                <p className="ei-type-studio-body mt-5 text-[var(--ei-color-text-secondary)]">
                  We do not just build brands or websites. We build identity,
                  atmosphere, and transformation.
                </p>
              </motion.div>

              <motion.div
                variants={fadeSoft}
                className="ei-studio-philosophy-visual relative hidden justify-self-end md:block"
                aria-hidden="true"
              >
                <img
                  src={studioPhilosophyArtifact}
                  alt="Philosophy artifact"
                  className="rounded-[32px] object-cover object-center opacity-90 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_56%,transparent_82%)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* WHAT WE MAKE */}
     <Section
        spacing="none"
        className="ei-studio-major-section relative pb-0 will-change-transform"
      >
   <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgb(var(--ei-violet-rgb) / 0.025) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-content-rail"
          >
            <motion.div variants={driftUp} className="relative">
              <SectionLabel label="What We Make" />
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <motion.article key={pillar.title} variants={driftUp}>
                  <Link
                    to={pillar.href}
                    className="ei-card relative block h-[380px] overflow-hidden px-7 pb-7 pt-6 text-inherit no-underline transition-colors duration-500 lg:px-8 lg:pb-8 lg:pt-7"
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 opacity-72 transition-opacity duration-700 ${pillar.imageClass}`}
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--ei-void-rgb)/0.2),rgb(var(--ei-void-rgb)/0.88))]"
                    />

                    <div className="ei-studio-pillar-card-inner relative z-10">
                      <div className="flex h-10 items-center">
                        <OrbitalVisual
                          variant={pillar.icon}
                          size={54}
                          className="opacity-98"
                        />
                      </div>

                      <h3 className="ei-type-card-title mt-9 min-h-[4.5rem] max-w-[12ch]">
                        {pillar.title}
                      </h3>

                      <p className="ei-type-body-small mt-4 min-h-[4.75rem] max-w-[32ch]">
                        {pillar.body}
                      </p>

                      <p className="ei-type-meta mt-[1.35rem] min-h-[4.4rem] pt-1">
                        {pillar.output}
                      </p>

                      <span className="ei-card-action group/explore pt-3">
                        Explore{" "}
                        <span className="ei-card-action-arrow ei-cta-arrow-right transition-transform duration-300 group-hover/explore:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* PROCESS */}
      <Section id="studio-process" spacing="none" className="ei-studio-major-section relative pb-2 md:pb-4">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-content-rail"
          >
            <motion.div variants={driftUp} className="relative">
              <SectionLabel label="Our Process" />
            </motion.div>

            <motion.div
              variants={fadeSoft}
              className="mt-8 grid gap-10 py-2 md:grid-cols-[0.9fr_1.6fr] md:gap-14 md:py-3"
            >
              <motion.div variants={driftUp}>
                <motion.h2
                  variants={blurEmergence}
                  className="ei-type-section-heading max-w-[15ch]"
                >
                  A thoughtful journey from essence to world.
                </motion.h2>
                <div className="mt-8">
                  <Button
                    to="/contact"
                    variant="secondary"
                    className="min-h-[42px] gap-3 px-6 py-3"
                  >
                    See How We Work
                    <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-down">↓</span>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer(STAGGER.loose, 0)}
                className="relative grid gap-8 md:grid-cols-4 md:gap-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 right-0 top-[1.18rem] hidden h-px bg-[linear-gradient(90deg,transparent,rgb(var(--ei-halo-blue-rgb)/0.45),rgb(var(--ei-violet-rgb)/0.52),transparent)] md:block"
                />

                {process.map((step) => (
                  <motion.article
                    key={step.number}
                    variants={driftUp}
                    className="ei-studio-process-step relative"
                  >
                    <div className="ei-type-studio-process-number">
                      {step.number}
                    </div>

                    <h3 className="ei-type-card-title">
                      {step.title}
                    </h3>

                    <p className="ei-type-body-small mt-3 max-w-[23ch]">
                      {step.body}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* FEATURED WORK */}
      <Section spacing="none" className="ei-studio-major-section relative pb-2 md:pb-4">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-content-rail"
          >
            <motion.div variants={driftUp} className="relative">
              <SectionLabel label="Featured Work" />
            </motion.div>

            <motion.div variants={fadeSoft} className="mt-8">
              <EchoCard variant="feature" padding="none" className="ei-card-world">
                <Link to="/works/lumo" className="ei-card-world-link group">
                  <motion.div
                    variants={fadeSoft}
                    className="ei-card-world-media"
                    aria-hidden="true"
                  >
                    <img
                      src={lumoFeaturedBg}
                      alt=""
                      className="object-[57%_50%]"
                    />
                  </motion.div>

                  <div className="ei-card-studio-overlay" aria-hidden="true" />

                  <motion.div variants={driftUp} className="ei-card-world-copy">
                    <div className="ei-studio-feature-copy">
                      <h2 className="ei-type-feature-title uppercase tracking-[0.02em]">
                        LUMO
                      </h2>

                      <p className="ei-type-card-title mt-5 max-w-[18ch]">
                        A world built for overwhelmed humans.
                      </p>

                      <p className="ei-type-body-small mt-7 max-w-[38ch] text-[var(--ei-color-text-secondary)]">
                        Lumo takes softness, care, and emotional regulation into
                        an emotionally intelligent app and cinematic digital
                        identity system — an interface shaped to calm cognitive
                        noise through atmosphere, rhythm, and restraint.
                      </p>
                    </div>

                    <span className="ei-card-action">
                      View Case Study{" "}
                      <span className="ei-card-action-arrow ei-cta-arrow-right">→</span>
                    </span>
                  </motion.div>
                </Link>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* SLIM CTA */}
      <Section
        spacing="none"
        className="ei-studio-major-section relative pb-10 md:pb-12"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="ei-studio-content-rail"
          >
            <motion.div variants={driftUp} className="relative">
              <SectionLabel label="BEGIN" />
            </motion.div>

            <motion.div
              variants={fadeSoft}
              className="relative mt-8 flex flex-col items-center gap-6 overflow-hidden rounded-[var(--ei-card-radius-lg)] border border-[rgb(var(--ei-moonlit-rgb)/0.16)] bg-[linear-gradient(100deg,rgb(var(--ei-midnight-rgb)/0.64),rgb(var(--ei-void-rgb)/0.9)_58%,rgb(var(--ei-violet-rgb)/0.13))] px-7 py-8 text-center shadow-[inset_0_1px_0_rgb(var(--ei-ice-white-rgb)/0.045),0_0_76px_rgb(var(--ei-violet-rgb)/0.075)] md:px-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 top-1/2 hidden h-28 w-44 -translate-y-1/2 text-[rgb(var(--ei-halo-blue-rgb)/0.28)] opacity-75 md:block"
              >
                <svg
                  viewBox="0 0 180 112"
                  fill="none"
                  className="h-full w-full"
                >
                  {Array.from({ length: 7 }).map((_, index) => (
                    <path
                      key={index}
                      d={`M0 ${28 + index * 7}C32 ${2 + index * 3} 58 ${6 + index * 4} 82 ${32 + index * 5}C108 ${60 + index * 4} 136 ${62 + index * 2} 180 ${38 + index * 6}`}
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity={0.38 - index * 0.035}
                    />
                  ))}
                </svg>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-full w-36 bg-[radial-gradient(circle_at_0%_42%,rgb(var(--ei-violet-rgb)/0.16),transparent_62%)]"
              />

              <motion.div
                variants={driftUp}
                className="ei-studio-slim-cta-copy relative z-10 max-w-[40rem]"
              >
                <h2 className="ei-type-section-heading">
                  Let&apos;s build your world.
                </h2>
                <p className="mx-auto mt-3 max-w-[60ch] text-[15px] leading-[1.8] tracking-[-0.006em] text-[var(--ei-color-text-secondary)] md:text-[16px]">
                  Through strategy, story, and identity systems that give ambitious work clarity, coherence, and a world to live in.
                </p>
              </motion.div>

              <motion.div
                variants={driftUp}
                className="relative z-10"
              >
                <Button
                  to="/contact"
                  variant="primary"
                >
                  Discuss a project{" "}
                  <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
                    →
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </PageShell>
  );
}

export default StudioPage;
