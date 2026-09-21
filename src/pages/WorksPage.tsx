import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import worksHeroDesktop from '@/assets/imagery/hero/works-hero-signal-stream-desktop.webp';
import worksHeroMobile from '@/assets/imagery/hero/works-hero-signal-stream-mobile.webp';
import { Container } from '@/components/layout/Container';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { CTASection } from '@/components/sections/CTASection';
import { PageSectionHero } from '@/components/sections/PageSectionHero';
import { Button } from '@/components/ui/Button';
import { EchoCard } from '@/components/ui/EchoCard';
import { IconWell } from '@/components/ui/IconWell';
import { OrbitalVisual, type OrbitalVariant } from '@/components/ui/OrbitalVisual';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectContext } from '@/components/works/ProjectContext';
import { WorkFilterBar } from '@/components/works/WorkFilterBar';
import { WorksGrid } from '@/components/works/WorksGrid';
import { worksProjects, type WorkFilter, type WorkSort } from '@/data/worksProjects';
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT
} from '@/lib/motion-cinematic';

const featuredProject = worksProjects.find((project) => project.featured);

const selectedSignals = [
  {
    title: 'Identity Systems',
    description:
      'Distinct foundations for ambitious work that needs to be understood, trusted, and remembered.'
  },
  {
    title: 'Narrative Frameworks',
    description: 'Case-study narratives structured around problem, system, and outcome.'
  },
  {
    title: 'Digital Experiences',
    description:
      'Editorial digital environments designed to make complex offers feel clearer and more usable.'
  },
  {
    title: 'Living Design Systems',
    description:
      'Reusable visual and content patterns built to carry clarity forward over time.'
  }
];

const vortexTestimonial = {
  quote:
    'Echo in Ink has changed the way we think about our entire digital presence. They didn’t just give us a new identity — they gave us clarity. The system Aly built feels precise, intelligent, and unmistakably aligned with who we are. Every interaction now carries this quiet confidence and sense of momentum. It’s the first time our brand has truly felt like a reflection of our ambition.',
  name: 'Forrest Reynolds',
  title: 'Managing Director, The Vortex Group'
} as const;

const lumoProofStrip = [
  {
    title: 'Challenge',
    anchor: 'Create',
    description:
      'a coherent product identity for an emotionally supportive planning product.'
  },
  {
    title: 'Solution',
    anchor: 'Use',
    description:
      'atmosphere, narrative, and reusable systems to unify the brand, interface, and case-study journey.'
  },
  {
    title: 'Outcome',
    anchor: 'Make',
    description: 'the value easier to understand, navigate, and remember.'
  }
];

const processValues: Array<{
  step: string;
  title: string;
  description: string;
  icon: OrbitalVariant;
  tone: 'blue' | 'violet' | 'magenta';
}> = [
  {
    step: '01',
    title: 'Observe',
    description: 'Understand the market, audience, offer, and pressures shaping the work.',
    icon: 'innerTide',
    tone: 'violet'
  },
  {
    step: '02',
    title: 'Distill',
    description:
      'Clarify the positioning, narrative, and trust signals people need to follow.',
    icon: 'vectorLattice',
    tone: 'blue'
  },
  {
    step: '03',
    title: 'Shape',
    description:
      'Translate the direction into identity, interface structure, and a coherent system.',
    icon: 'signalBridge',
    tone: 'magenta'
  },
  {
    step: '04',
    title: 'Embody',
    description:
      'Deliver the assets, guidance, and launch-ready patterns needed to carry it forward.',
    icon: 'quietAxis',
    tone: 'violet'
  }
];

export function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('All Works');
  const [sortBy, setSortBy] = useState<WorkSort>('Latest');

  return (
    <PageShell atmosphere="works" theme="deep" withTopSpacing={false} className="ei-works-page">
      <Helmet>
        <title>Works | Echo In Ink</title>
        <meta
          name="description"
          content="Selected identity systems, immersive websites, and atmospheric digital experiences by Echo In Ink."
        />
      </Helmet>
      <PageSectionHero
        eyebrow="Selected proof"
        title="Proof, shaped as atmosphere."
        italicWord="atmosphere."
        description="Identity systems, digital experiences, and visual worlds built to make ambitious ideas easier to understand, trust, and act on."
        offerAnchor="Selected identity, product, and digital-experience work shaped to make ambitious ideas clearer, calmer, and more distinct."
        image={worksHeroDesktop}
        mobileImage={worksHeroMobile}
        imageAlt="Dark cinematic signal stream with luminous blue-violet atmosphere"
        align="left"
        ctaLabel="Discuss a project"
        ctaHref="/contact?inquiry=project"
        secondaryCtaLabel="Explore systems"
        secondaryCtaHref="/systems"
      />

      <Section spacing="none" className="ei-works-section ei-works-signals">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-works-section-heading">
              <SectionLabel label="Selected signals" index="02" />
              <div>
                <h2 className="ei-type-section-heading">Evidence that the atmosphere is doing its job.</h2>
                <p className="ei-type-studio-body">
                  Brand systems, product stories, and digital experiences designed to make complex
                  value easier to trust, understand, and act on.
                </p>
                <p className="ei-type-studio-body ei-works-audience-note">
                  Partnering with startups, software companies, and ambitious teams seeking clarity
                  through design.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-works-proof-stats" role="note">
              <p className="ei-works-proof-framing">
                Distinct systems for work that needs to be understood, trusted, and remembered.
              </p>
              <p className="ei-works-proof-availability">
                Select 2026 project availability for identity, digital experience, and system work.
              </p>
            </motion.div>

            <div className="ei-works-signal-grid">
              {selectedSignals.map((signal, index) => (
                <motion.div key={signal.title} variants={driftUp}>
                  <EchoCard
                    variant={index === 0 ? 'proof' : 'static'}
                    padding="lg"
                    className="ei-works-signal-card"
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{signal.title}</h3>
                    <p className="ei-type-body-small">{signal.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {featuredProject ? (
        <Section spacing="none" className="ei-works-section ei-works-featured">
          <Container size="xl" className="relative z-10">
            <motion.div
              variants={staggerContainer(STAGGER.loose, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT.normal}
              className="mx-auto max-w-[1180px]"
            >
              <motion.div variants={fadeSoft}>
                <EchoCard variant="proof" padding="none" className="ei-works-featured-panel">
                  <div className="ei-works-featured-media">
                    <img src={featuredProject.image} alt="" aria-hidden="true" />
                    <div className="ei-works-featured-scrim" aria-hidden="true" />
                  </div>

                  <div className="ei-works-featured-copy">
                    <SectionLabel label="Credibility anchor" index="03" />
                    <div className="ei-works-featured-meta ei-type-meta">
                      <span>{featuredProject.context?.status ?? 'Selected study'}</span>
                      <span>{featuredProject.category}</span>
                    </div>
                    <ProjectContext
                      context={featuredProject.context}
                      compact
                      className="ei-works-featured-context"
                    />
                    <motion.h2 variants={blurEmergence}>{featuredProject.title}</motion.h2>
                    <p className="ei-works-featured-disciplines ei-type-meta">
                      {featuredProject.disciplines.join(' · ')}
                    </p>
                    <p className="ei-works-featured-outcome">{featuredProject.proofLine}</p>
                    <p className="ei-works-featured-description ei-type-studio-body">
                      {featuredProject.description}
                    </p>

                    <dl className="ei-works-featured-proof-strip">
                      {lumoProofStrip.map((item) => (
                        <div key={item.title}>
                          <dt>{item.title}</dt>
                          <dd className="ei-type-body-small">
                            <strong>{item.anchor}</strong> {item.description}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Button to={featuredProject.href ?? '/works/lumo'} variant="secondary">
                      View case study <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                    </Button>
                  </div>
                </EchoCard>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="none" className="ei-works-section ei-works-testimonial">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={fadeSoft} className="ei-works-testimonial-panel">
              <motion.div variants={driftUp}>
                <SectionLabel label="Client reflection" index="04" />
              </motion.div>

              <motion.figure variants={driftUp} className="ei-works-testimonial-figure">
                <blockquote className="ei-works-testimonial-quote ei-type-quote">
                  “Echo in Ink has changed the way we think about our entire digital presence.
                  They didn’t just give us a new identity — they <span>gave us clarity</span>.
                  The system Aly built feels precise, intelligent, and unmistakably aligned with
                  who we are. Every interaction now carries this quiet confidence and sense of
                  momentum. It’s the first time our brand has truly felt like a{' '}
                  <span>reflection of our ambition</span>.”
                </blockquote>
                <figcaption className="ei-works-testimonial-attribution">
                  <span>{vortexTestimonial.name}</span>
                  <span>{vortexTestimonial.title}</span>
                </figcaption>
              </motion.figure>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section id="selected-works" spacing="none" className="ei-works-section ei-works-selected">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-works-section-heading">
              <SectionLabel label="Selected works" index="05" />
              <div>
                <h2 className="ei-type-section-heading">Curated by the weight of the proof.</h2>
                <p className="ei-type-studio-body">
                  Full case studies lead. Concepts and fragments follow in a quieter register, so
                  every piece stays honest about what it demonstrates and why it mattered.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-works-filter-wrap">
              <WorkFilterBar
                activeFilter={activeFilter}
                sortBy={sortBy}
                onFilterChange={setActiveFilter}
                onSortChange={setSortBy}
              />
            </motion.div>

            <motion.div variants={fadeSoft}>
              <WorksGrid activeFilter={activeFilter} sortBy={sortBy} />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-works-section ei-works-proof">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-works-section-heading">
              <SectionLabel label="Process framework" index="08" />
              <div>
                <h2 className="ei-type-section-heading">From atmosphere to usable system.</h2>
                <p className="ei-type-studio-body">
                  A practical sequence for turning emotional direction into identity, interface,
                  content, and launch-ready patterns.
                </p>
              </div>
            </motion.div>

            <div className="ei-works-proof-grid">
              {processValues.map((value, index) => (
                <motion.div key={value.title} variants={driftUp}>
                  <EchoCard
                    variant={index === 1 ? 'feature' : 'static'}
                    padding="lg"
                    className="ei-works-proof-card"
                  >
                    <IconWell size="md" tone={value.tone} orbital glow>
                      <OrbitalVisual variant={value.icon} size={42} />
                    </IconWell>
                    <span>{value.step}</span>
                    <h3>{value.title}</h3>
                    <p className="ei-type-body-small">{value.description}</p>
                  </EchoCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeSoft} className="ei-works-proof-note ei-type-body">
              Looking for the thinking behind the work?{' '}
              <Link to="/studio">
                Explore the studio approach <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
              </Link>
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="editorialInvitation"
        eyebrow="Begin a project"
        heading={
          <>
            Make the value <em>felt.</em>
          </>
        }
        body="If you are building something meaningful, let’s give it the clarity, shape, and presence it deserves."
        className="ei-works-closing"
        actions={
          <Button to="/contact" variant="primary">
            Discuss a project
          </Button>
        }
      />
    </PageShell>
  );
}
