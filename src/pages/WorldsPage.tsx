import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import worldsHeroDesktop from "@/assets/imagery/hero/worlds-hero-vertical-portal-desktop.webp";
import worldsHeroMobile from "@/assets/imagery/hero/worlds-hero-vertical-portal-mobile.webp";
import worldsImageDesktop from "@/assets/imagery/sections/worlds-image-1-desktop.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { IconWell } from "@/components/ui/IconWell";
import {
  OrbitalVisual,
  type OrbitalVariant,
} from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  worldsClosing,
  worldsDeliverables,
  worldsHero,
  worldsIntro,
  worldsLayers,
  worldsPricing,
  worldsProcess,
  worldsUseCases,
} from "@/data/worldsContent";
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const worldMeaning = [
  {
    title: "Atmosphere",
    description:
      "The emotional field people enter before they understand the details.",
  },
  {
    title: "Narrative",
    description:
      "The deeper story, tension, and philosophy that give the work meaning.",
  },
  {
    title: "Identity",
    description:
      "A distinct visual and verbal character that belongs to this work alone.",
  },
  {
    title: "Tone",
    description:
      "The rhythm, language, imagery, and behaviour that make expression feel coherent.",
  },
  {
    title: "System",
    description:
      "Principles that keep every touchpoint connected as the world grows.",
  },
  {
    title: "Expression",
    description:
      "A usable direction for digital presence, launches, content, and experience.",
  },
];

const needStates = [
  {
    title: "Brand launch",
    description:
      "Create a distinct emotional position before the identity reaches the world.",
  },
  {
    title: "Repositioning",
    description:
      "Give an existing brand or offer a clearer narrative, atmosphere, and reason to matter.",
  },
  {
    title: "Artist universe",
    description:
      "Connect the work, voice, imagery, releases, and audience experience around one centre.",
  },
  {
    title: "Cultural platform",
    description:
      "Build a coherent world that can hold many voices, formats, and future expressions.",
  },
  {
    title: "Campaign world",
    description:
      "Create a distinct narrative and visual environment for a launch, season, or cultural moment.",
  },
  {
    title: "Product atmosphere",
    description:
      "Shape how a digital or physical product feels, behaves, and becomes recognisable.",
  },
];

const worldTypes: Array<{
  title: string;
  description: string;
  outcome: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Brand World",
    description:
      "For founder-led brands and studios that need more than a visual identity: a recognisable point of view with emotional depth.",
    outcome:
      "A coherent identity, voice, digital atmosphere, and launch direction.",
    icon: "axiomRing",
  },
  {
    title: "Product World",
    description:
      "For products whose value depends on how the experience feels, behaves, and becomes part of someone’s life.",
    outcome:
      "A product narrative, experience principles, interface atmosphere, and expression system.",
    icon: "focusDial",
  },
  {
    title: "Artist World",
    description:
      "For artists, writers, musicians, and makers building a public universe around a body of work.",
    outcome:
      "A narrative centre, visual language, release atmosphere, and continuity across eras.",
    icon: "threadBeacon",
  },
  {
    title: "Cultural World",
    description:
      "For platforms, movements, and creative ecosystems designed to hold participation and evolve over time.",
    outcome:
      "A shared mythology, cultural codes, participation logic, and expansion framework.",
    icon: "chorusCore",
  },
];

const process = [
  {
    title: "Signal",
    description:
      "Find the emotional truth, tension, and ambition already alive in the work.",
  },
  {
    title: "Architecture",
    description:
      "Define the narrative centre and organise the world around a clear internal logic.",
  },
  {
    title: "Atmosphere",
    description:
      "Shape the visual, verbal, sensory, and behavioural qualities people will feel.",
  },
  {
    title: "System",
    description:
      "Translate the direction into principles that remain coherent across touchpoints.",
  },
  {
    title: "Expression",
    description:
      "Apply the world to the site, product, launch, content, or next creative phase.",
  },
];

function scrollToDefinition() {
  const definition = document.getElementById("worldbuilding-definition");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  definition?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function WorldsPage() {
  return (
    <PageShell
      atmosphere="worlds"
      theme="deep"
      withTopSpacing={false}
      className="ei-worlds-page"
    >
      <Helmet>
        <title>World Architecture — Echo in Ink</title>
        <meta
          name="description"
          content="Premium worldbuilding for brands, products, artists, and cultural projects that need narrative architecture, atmosphere, identity, and a coherent digital presence."
        />
      </Helmet>

      <PageSectionHero
        eyebrow="World Architecture"
        title="Build the world your work belongs to."
        italicWord="world"
        description={worldsHero.description}
        offerAnchor="Narrative architecture, identity direction, and immersive digital presence for brands and cultural projects becoming more distinct."
        image={worldsHeroDesktop}
        mobileImage={worldsHeroMobile}
        imageAlt="Dark cinematic vertical portal suggesting an immersive creative world"
        align="left"

        ctaLabel="Discuss a world"
        ctaHref="/contact?inquiry=project"
        secondaryCtaLabel="Explore selected work"
        secondaryCtaHref="/works"
      />

      <Section
        spacing="none"
        className="ei-worlds-section ei-worlds-definition"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="offer"
                padding="none"
                className="ei-worlds-definition-panel"
              >
                <div className="ei-worlds-definition-copy">
                  <SectionLabel label="What worldbuilding means" index="02" />
                  <motion.h2 variants={blurEmergence}>
                    A creative service for shaping the whole environment around
                    an idea.
                  </motion.h2>
                  <p className="ei-type-body-editorial">{worldsIntro.body}</p>
                  <p className="ei-type-body-editorial">
                    Worldbuilding aligns what the work means with how it looks,
                    speaks, moves, and meets people. The result is not a
                    collection of assets. It is a direction your team can use.
                  </p>
                </div>

                <div className="ei-worlds-definition-visual" aria-hidden="true">
                  <OrbitalVisual variant="vectorLattice" size={172} />
                  <span>Meaning</span>
                  <span>Memory</span>
                  <span>Presence</span>
                </div>

                <dl className="ei-worlds-meaning-grid">
                  {worldMeaning.map((item) => (
                    <div key={item.title}>
                      <dt>{item.title}</dt>
                      <dd>{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-worlds-section ei-worlds-needs">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-worlds-section-heading"
            >
              <SectionLabel label="This is for" index="03" />
              <div>
                <h2>
                  When the idea is strong, but the world around it is not yet
                  coherent.
                </h2>
                <p className="ei-type-body-editorial">
                  World Architecture is for meaningful work that needs a clearer
                  centre and a practical way to express it.
                </p>
              </div>
            </motion.div>

            <ol className="ei-worlds-need-list">
              {needStates.map((item, index) => (
                <motion.li key={item.title} variants={driftUp}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p className="ei-type-body-editorial">{item.description}</p>
                </motion.li>
              ))}
            </ol>

            <motion.p variants={fadeSoft} className="ei-worlds-needs-note">
              Also suited to: {worldsUseCases.slice(0, 4).join(" · ")}.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="layers"
        spacing="none"
        className="ei-worlds-section ei-worlds-architecture"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-worlds-section-heading"
            >
              <SectionLabel label="What a world includes" index="04" />
              <div>
                <h2>{worldsLayers.heading}</h2>
                <p className="ei-type-body-editorial">
                  Each layer makes the offer tangible: a set of decisions,
                  principles, and directions that can guide real creative work.
                </p>
              </div>
            </motion.div>

            <div className="ei-worlds-layer-layout">
              <div className="ei-worlds-layer-grid">
                {worldsLayers.items.map((layer, index) => (
                  <motion.div key={layer.title} variants={driftUp}>
                    <EchoCard
                      variant={
                        index === 1 || index === 4 ? "feature" : "static"
                      }
                      padding="lg"
                      className="ei-worlds-layer-card"
                    >
                      <span>{layer.number}</span>
                      <h3>{layer.title}</h3>
                      <p className="ei-type-body-editorial">{layer.description}</p>
                    </EchoCard>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeSoft}>
                <EchoCard
                  variant="proof"
                  padding="lg"
                  className="ei-worlds-output-panel"
                >
                  <SectionLabel label="Possible outputs" rule="none" />
                  <h3>{worldsDeliverables.heading}</h3>
                  <ul>
                    {worldsDeliverables.items.slice(0, 10).map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="ei-type-body-editorial">{worldsDeliverables.note}</p>
                </EchoCard>
              </motion.div>
            </div>

            <motion.div variants={fadeSoft}>
              <EchoCard
                variant="offer"
                padding="lg"
                className="ei-worlds-investment"
              >
                <div>
                  <SectionLabel label="Selective collaboration" rule="none" />
                  <h3>{worldsPricing.heading}</h3>
                  <p className="ei-type-body-editorial">{worldsPricing.intro[0]}</p>
                </div>
                <dl>
                  {worldsPricing.tiers.map((tier) => (
                    <div key={tier.name}>
                      <dt>{tier.name}</dt>
                      <dd>{tier.price}</dd>
                      <p className="ei-type-body-editorial">{tier.description}</p>
                    </div>
                  ))}
                </dl>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-worlds-section ei-worlds-types">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-worlds-section-heading"
            >
              <SectionLabel label="World types" index="05" />
              <div>
                <h2>Different forms. The same need for coherence.</h2>
                <p className="ei-type-body-editorial">
                  The engagement is shaped around what you are building, who
                  needs to enter it, and where the world must become visible.
                </p>
              </div>
            </motion.div>

            <div className="ei-worlds-type-grid">
              {worldTypes.map((world, index) => (
                <motion.div key={world.title} variants={driftUp}>
                  <EchoCard
                    variant={index === 0 ? "feature" : "static"}
                    padding="lg"
                    className="ei-worlds-type-card"
                  >
                    <div className="ei-worlds-type-topline">
                      <IconWell
                        size="lg"
                        tone={index === 3 ? "magenta" : "violet"}
                        orbital
                        glow
                      >
                        <OrbitalVisual variant={world.icon} size={54} />
                      </IconWell>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{world.title}</h3>
                    <p className="ei-type-body-editorial">{world.description}</p>
                    <div>
                      <span>Practical outcome</span>
                      <p className="ei-type-body-editorial">{world.outcome}</p>
                    </div>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-worlds-section ei-worlds-process">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-worlds-section-heading"
            >
              <SectionLabel label="The process" index="06" />
              <div>
                <h2>{worldsProcess.heading}</h2>
                <p className="ei-type-body-editorial">
                  The work moves from discovery to application without rushing
                  the decisions that give the world its integrity.
                </p>
              </div>
            </motion.div>

            <ol className="ei-worlds-process-list">
              {process.map((step, index) => (
                <motion.li key={step.title} variants={driftUp}>
                  <span className="ei-worlds-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ei-worlds-process-node" aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p className="ei-type-body-editorial">{step.description}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="imagePanel"
        eyebrow="Begin a world"
        heading={
          <>
            Some projects are not brands. They are <em>worlds.</em>
          </>
        }
        body={worldsClosing.heading}
        image={worldsImageDesktop}
        imageAlt=""
        className="ei-worlds-closing"
        headingId="worlds-closing-heading"
        actions={
          <Button to={worldsClosing.cta.href} variant="primary">
            Discuss a world
          </Button>
        }
        secondary={
          <p>
            For founders, artists, studios, and cultural projects ready to build
            with depth and continuity.
          </p>
        }
      />
    </PageShell>
  );
}
