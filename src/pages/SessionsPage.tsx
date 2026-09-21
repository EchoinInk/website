import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import sessionsHeroDesktop from "@/assets/imagery/hero/sessions-hero-luminous-threshold-desktop.webp";
import sessionsHeroMobile from "@/assets/imagery/hero/sessions-hero-luminous-threshold-mobile.webp";
import imageCTA from "@/assets/imagery/sections/sessions-cta-desktop.webp";
import imageOffer from "@/assets/imagery/sections/sessions-offer-desktop.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { IconWell } from "@/components/ui/IconWell";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  sessionsApproach,
  sessionsAudience,
  sessionsBring,
  sessionsClosing,
  sessionsHero,
  sessionsOrientation,
  sessionsOutcomes,
  sessionsPricing
} from "@/data/sessionsContent";
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT
} from "@/lib/motion-cinematic";

const offerFacts = [
  { label: "Duration", value: "60 or 90 minutes" },
  { label: "Room", value: "Private video session" },
  { label: "Recording", value: "Available by request" },
  { label: "Follow-up", value: "Reflection note optional" },
  { label: "References", value: "Fragments are welcome" }
];

const outcomes: Array<{
  title: string;
  description: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Clarity",
    description:
      "Find the language beneath the noise and name what the work is really trying to become.",
    icon: "focusDial"
  },
  {
    title: "Direction",
    description:
      "Turn scattered references and instincts into a practical creative path you can act on.",
    icon: "signalBridge"
  },
  {
    title: "Coherence",
    description:
      "Align the emotional, visual, and verbal parts of the project around one trustworthy centre.",
    icon: "chorusCore"
  }
];

const process = [
  {
    title: "Prepare",
    description: "Bring the idea, tension, question, or fragment that needs attention."
  },
  {
    title: "Align",
    description: "We define what would make the conversation genuinely useful."
  },
  {
    title: "Explore",
    description: "We listen for patterns across language, references, feeling, and intent."
  },
  {
    title: "Shape",
    description: "We turn the strongest signal into a clear creative direction."
  },
  {
    title: "Close & plan",
    description: "We name the decisions, language, and next moves worth carrying forward."
  }
];

const leaveWith = [
  ...sessionsOutcomes.items.slice(0, 6),
  "A recording of the conversation, when requested",
  "Optional written Session Reflection Note"
];

const notFor = [
  "A generic business coaching call",
  "A done-for-you identity or website",
  "A performance review or pitch session",
  "A substitute for a full creative engagement"
];

function scrollToSessionProcess() {
  const processSection = document.getElementById("inside-the-session");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  processSection?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start"
  });
}

export function SessionsPage() {
  return (
    <PageShell atmosphere="sessions" theme="deep" withTopSpacing={false} className="ei-sessions-page">
      <Helmet>
        <title>Echo Sessions — Echo in Ink</title>
        <meta
          name="description"
          content="One-to-one creative direction sessions for founders, artists, writers, and makers seeking clearer language, identity, structure, and direction."
        />
      </Helmet>

     <PageSectionHero
  eyebrow="Echo Sessions"
  title="Clarity before expression."
  description={sessionsHero.body[0]}
  offerAnchor="A focused creative-direction session for founders and teams who need clarity before committing to a larger build."
  image={sessionsHeroDesktop}
  mobileImage={sessionsHeroMobile}
  imageAlt="Luminous blue-violet threshold over a dark cinematic horizon"
  align="left"
  
  ctaLabel="Request a session"
  ctaHref={sessionsHero.primaryCta.href}
  secondaryCtaLabel="Explore the studio"
  secondaryCtaHref="/studio"
/>

      <Section spacing="none" className="ei-sessions-section ei-sessions-definition">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={fadeSoft}>
              <EchoCard variant="offer" padding="none" className="ei-sessions-definition-panel">
                <div className="ei-sessions-definition-copy">
                  <SectionLabel label="The offer" index="01" />
                  <motion.h2 variants={blurEmergence}>
                    A quiet working room for the real shape of the project.
                  </motion.h2>
                  <div className="ei-sessions-definition-body">
                    {sessionsOrientation.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="ei-type-body-editorial">{paragraph}</p>
                    ))}
                  </div>
                  <p className="ei-sessions-definition-note">
                    Part mirror, part map, part creative direction. You do not need a finished
                    brief; bring whatever feels alive, unresolved, or difficult to name.
                  </p>
                </div>

                <div className="ei-sessions-definition-media" aria-hidden="true">
                  <img src={imageOffer} alt="" loading="lazy" />
                </div>

                <dl className="ei-sessions-facts">
                  {offerFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-sessions-section ei-sessions-outcomes">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-sessions-section-heading">
              <SectionLabel label="Three outcomes" index="02" />
              <h2 className="ei-type-section-heading">Leave with a direction you can trust.</h2>
              <p className="ei-type-body-editorial">
                The session makes the intangible practical without flattening what gives the work
                its meaning.
              </p>
            </motion.div>

            <div className="ei-sessions-outcome-grid">
              {outcomes.map((outcome, index) => (
                <motion.div key={outcome.title} variants={driftUp}>
                  <EchoCard
                    variant={index === 1 ? "feature" : "static"}
                    padding="lg"
                    className="ei-sessions-outcome-card"
                  >
                    <IconWell size="lg" tone={index === 2 ? "magenta" : "violet"} orbital glow>
                      <OrbitalVisual variant={outcome.icon} size={54} />
                    </IconWell>
                    <span className="ei-sessions-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{outcome.title}</h3>
                    <p className="ei-type-body-editorial">{outcome.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="inside-the-session"
        spacing="none"
        className="ei-sessions-section ei-sessions-process"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-sessions-section-heading">
              <SectionLabel label="Inside the session" index="03" />
              <h2 className="ei-type-section-heading">A focused arc, with room to follow the signal.</h2>
            </motion.div>

            <ol className="ei-sessions-process-list">
              {process.map((step, index) => (
                <motion.li key={step.title} variants={driftUp}>
                  <span className="ei-sessions-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ei-sessions-process-dot" aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p className="ei-type-body-editorial">{step.description}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-sessions-section ei-sessions-takeaways">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px] ei-sessions-takeaways-layout"
          >
            <motion.div variants={driftUp} className="ei-sessions-takeaways-copy">
              <SectionLabel label="What you leave with" index="04" />
              <h2 className="ei-type-section-heading">{sessionsOutcomes.heading}</h2>
              <p className="ei-type-body-editorial">{sessionsOutcomes.intro}</p>
              <blockquote>“{sessionsApproach.heading}”</blockquote>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <EchoCard variant="proof" padding="lg" className="ei-sessions-checklist-panel">
                <ul>
                  {leaveWith.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-sessions-section ei-sessions-fit">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp}>
              <SectionLabel label="Fit" index="05" />
            </motion.div>
            <div className="ei-sessions-fit-grid">
              <motion.div variants={driftUp}>
                <h2 className="ei-type-section-heading">This is for you if...</h2>
                <p className="ei-type-body-editorial">{sessionsAudience}</p>
                <ul>
                  {sessionsBring.items.slice(0, 5).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={driftUp}>
                <h2 className="ei-type-section-heading">This is not...</h2>
                <p className="ei-type-body-editorial">
                  The room is intimate and directional. Its value comes from attention, reflection,
                  and honest creative decisions.
                </p>
                <ul>
                  {notFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-sessions-section ei-sessions-formats">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-sessions-section-heading">
              <SectionLabel label="Session formats" index="06" />
              <h2 className="ei-type-section-heading">{sessionsPricing.heading}</h2>
              <p className="ei-type-body-editorial">
                Choose the depth that matches the question. Both formats are one-to-one and shaped
                around the work you bring.
              </p>
            </motion.div>

            <div className="ei-sessions-format-grid">
              {sessionsPricing.tiers.map((tier, index) => (
                <motion.div key={tier.name} variants={driftUp}>
                  <EchoCard
                    variant={index === 1 ? "offer" : "index"}
                    padding="lg"
                    className="ei-sessions-format-card"
                  >
                    <div>
                      <span className="ei-sessions-format-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{tier.duration}</span>
                    </div>
                    <h3>{tier.name}</h3>
                    <p className="ei-type-body-editorial">{tier.description}</p>
                    <strong>{tier.price} NZD</strong>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeSoft} className="ei-sessions-format-note">
              Unsure which format fits? Start with the 60-minute session. The request form gives you
              space to describe what you are carrying before a time is suggested.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="imagePanel"
        eyebrow="Request an Echo Session"
        heading={sessionsClosing.heading}
        body={sessionsClosing.subline}
        image={imageCTA}
        imageAlt=""
        className="ei-sessions-closing"
        actions={
          <Button to={sessionsClosing.cta.href} variant="primary">
            Request a session <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
          </Button>
        }
        secondary="60 or 90 minutes · Private one-to-one creative direction · NZD pricing"
      />
    </PageShell>
  );
}
