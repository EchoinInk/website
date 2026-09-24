import { motion, useReducedMotion } from "framer-motion";

import sessionsHeroDesktop from "@/assets/imagery/hero/sessions-hero-luminous-threshold-desktop.webp";
import sessionsHeroMobile from "@/assets/imagery/hero/sessions-hero-luminous-threshold-mobile.webp";
import imageOffer from "@/assets/imagery/sections/sessions-offer-desktop.webp";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { strategySessionsEngagement } from "@/data/servicesContent";
import { primaryCallToAction } from "@/data/siteNavigation";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const sessionUseCases = [
  ["Website direction", "Decide what the site needs to communicate, prioritise or change."],
  ["Brand clarity", "Clarify positioning, language or visual direction before expression begins."],
  ["Product direction", "Work through the shape, audience or next decision for a digital product."],
  ["Digital strategy", "Create direction around a defined digital challenge or opportunity."],
  ["UX problems", "Untangle a specific journey, interaction or information problem."],
  ["Technical scoping", "Frame an initiative clearly enough to identify sensible next steps."],
] as const;

const sessionArc = [
  ["Define", "Name the question and what would make the conversation useful."],
  ["Explore", "Examine the context, constraints, references and tensions around it."],
  ["Shape", "Turn the strongest signals into a clearer direction or decision."],
  ["Close", "Identify the next moves worth carrying forward after the room."],
] as const;

const sessionExpectations = [
  ["Format", "A focused 60–90 minute private video session, shaped around one defined question."],
  ["What to bring", "The question plus any useful fragments: a draft, reference, screenshot or short context note."],
  ["What you leave with", "Clearer decisions, language and practical next steps appropriate to the question."],
  ["Notes and recording", "A reflection note may be available; recording only happens when agreed in advance and is never automatic."],
] as const;

export function SessionsPage() {
  const prefersReducedMotion = useReducedMotion();
  const reveal = {
    variants: staggerContainer(STAGGER.loose, 0),
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: VIEWPORT.normal,
  } as const;

  return (
    <PageShell
      title="Strategy Sessions — Echo in Ink"
      description="Focused 60–90 minute Strategy Sessions for resolving a defined question, creating direction or scoping a digital initiative."
      atmosphere="sessions"
      theme="light"
      withTopSpacing={false}
      className="ei-sessions-page ei-phase7-page"
    >
      <PageSectionHero
        eyebrow="STRATEGY SESSIONS"
        title="Clarity before expression."
        italicWord="Clarity"
        description="A Strategy Session is a focused 60–90 minute engagement for resolving a defined question, creating direction, scoping an initiative or working through a specific digital problem."
        offerAnchor={strategySessionsEngagement.description}
        image={sessionsHeroDesktop}
        mobileImage={sessionsHeroMobile}
        imageAlt="A luminous threshold suggesting a clear way forward"
        theme="light"
        tone="editorial"
        ctaLabel={strategySessionsEngagement.cta}
        ctaHref={strategySessionsEngagement.href}
        secondaryCtaLabel={primaryCallToAction.label}
        secondaryCtaHref={primaryCallToAction.href}
        headingId="sessions-heading"
      />

      <Section theme="lightElevated" spacing="none" className="ei-phase7-section ei-sessions-use-cases" aria-labelledby="sessions-use-cases-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="When a session is useful" tone="accent" />
              <div>
                <h2 id="sessions-use-cases-heading">Bring one question that needs a clearer way forward.</h2>
                <p>
                  These are examples of the kinds of questions a session can hold—not six new
                  services. The best fit is a defined problem that benefits from focused strategic
                  and creative attention.
                </p>
              </div>
            </motion.div>
            <div className="ei-phase7-card-grid ei-sessions-use-case-grid">
              {sessionUseCases.map(([title, description], index) => (
                <motion.div key={title} variants={driftUp}>
                  <EchoCard padding="lg" variant={index === 0 ? "feature" : "static"} className="ei-phase7-card">
                    <span className="ei-phase7-card-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section theme="mist" transitionTo="light" spacing="none" className="ei-phase7-section ei-sessions-expectations" aria-labelledby="sessions-expectations-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.div variants={driftUp} className="ei-phase7-heading">
              <SectionLabel label="What to expect" tone="accent" />
              <div>
                <h2 id="sessions-expectations-heading">A practical format with room to think properly.</h2>
                <p>
                  Echo Sessions is the broader brand language for the room. The commercial
                  engagement is Strategy Sessions: focused, one-to-one and centred on the question
                  you bring.
                </p>
              </div>
            </motion.div>
            <dl className="ei-sessions-expectation-list">
              {sessionExpectations.map(([term, description]) => (
                <motion.div key={term} variants={driftUp}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </Container>
      </Section>

      <Section theme="light" transitionTo="lightElevated" spacing="none" className="ei-phase7-section ei-sessions-room" aria-labelledby="sessions-room-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner ei-sessions-room-layout">
            <motion.div variants={driftUp} className="ei-sessions-room-copy">
              <SectionLabel label="Inside the session" />
              <h2 id="sessions-room-heading">Part mirror, part map, part creative direction.</h2>
              <p>
                The conversation follows a simple arc, but it is not a scripted workshop. It stays
                close to the real question and the decisions that can move it forward.
              </p>
              <ol className="ei-sessions-arc">
                {sessionArc.map(([title, description], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{title}</h3><p>{description}</p></div>
                  </li>
                ))}
              </ol>
            </motion.div>
            <motion.figure variants={fadeSoft} className="ei-sessions-room-image">
              <img src={imageOffer} alt="Abstract violet forms creating a calm, focused space" loading="lazy" />
            </motion.figure>
          </motion.div>
        </Container>
      </Section>

      <Section theme="lightElevated" transitionTo="mist" spacing="none" className="ei-phase7-section ei-sessions-standalone" aria-labelledby="sessions-standalone-heading">
        <Container size="xl">
          <motion.div {...reveal} className="ei-phase7-inner">
            <motion.aside variants={driftUp} className="ei-phase7-relationship">
              <div>
                <span>A complete engagement in its own right</span>
                <h2 id="sessions-standalone-heading">A Strategy Session can stand alone.</h2>
                <p>
                  It is not a mandatory discovery call or a sales gateway to a larger project. If
                  the session resolves the question, it has done its job. If you already have a
                  defined project, you can go directly to Start a Project.
                </p>
              </div>
              <Button to={primaryCallToAction.href} variant="secondary">{primaryCallToAction.label}</Button>
            </motion.aside>
          </motion.div>
        </Container>
      </Section>

      <Section theme="mist" spacing="none" className="ei-phase7-closing">
        <CTASection
          variant="editorialInvitation"
          eyebrow="Bring the question"
          heading="Clarity before expression."
          body="The booking flow begins with a request. Share the timing, timezone and context; a session is only confirmed after a real time is offered and accepted."
          actions={
            <>
              <Button to={strategySessionsEngagement.href}>{strategySessionsEngagement.cta}</Button>
              <Button to={primaryCallToAction.href} variant="secondary">{primaryCallToAction.label}</Button>
            </>
          }
          headingId="sessions-cta-heading"
        />
      </Section>
    </PageShell>
  );
}
