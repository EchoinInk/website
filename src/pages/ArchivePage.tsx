import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import { ArchiveConstellation } from '@/components/archive/ArchiveConstellation';
import { ArchiveIndexList } from '@/components/archive/ArchiveIndexList';
import { Container } from '@/components/layout/Container';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { CTASection } from '@/components/sections/CTASection';
import { PageSectionHero } from '@/components/sections/PageSectionHero';
import { Button } from '@/components/ui/Button';
import { EchoCard } from '@/components/ui/EchoCard';
import { EchoSelect } from '@/components/ui/EchoSelect';
import { FilterBar } from '@/components/ui/FilterBar';
import { IconWell } from '@/components/ui/IconWell';
import { OrbitalVisual } from '@/components/ui/OrbitalVisual';
import { SectionLabel } from '@/components/ui/SectionLabel';
import {
  archiveCta,
  archiveFeatured,
  archiveFilters,
  archiveHero,
  archiveIndex,
  archiveNotes,
  archivePhilosophy,
  archiveSortOptions,
  type ArchiveFilter,
  type ArchiveSort,
} from '@/data/archiveContent';
import archiveImageDesktop from '@/assets/imagery/hero/archive-hero-nebula-spiral-desktop.webp';
import archiveImageMobile from '@/assets/imagery/hero/archive-hero-nebula-spiral-mobile.webp';
import archiveEssayDesktop from '@/assets/imagery/sections/archive-essay-desktop.webp';
import archiveEssayMobile from '@/assets/imagery/sections/archive-essay-mobile.webp';
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from '@/lib/motion-cinematic';

function EmphasizedText({
  text,
  emphasis,
}: {
  text: string;
  emphasis?: string;
}) {
  if (!emphasis || !text.includes(emphasis)) {
    return <>{text}</>;
  }

  const [before, after] = text.split(emphasis);

  return (
    <>
      {before}
      <em>{emphasis}</em>
      {after}
    </>
  );
}

function scrollToArchiveIndex() {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  document.getElementById('archive-index')?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

const archivePathways = archiveFilters.filter((filter) => filter !== 'All');

export function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>('All');
  const [sortBy, setSortBy] = useState<ArchiveSort>('Latest');
  const visibleEntries =
    activeFilter === 'All'
      ? archiveIndex
      : archiveIndex.filter((entry) => entry.category === activeFilter);

  return (
    <PageShell atmosphere="default" theme="deep" withTopSpacing={false} className="ei-archive-page">
      <Helmet>
        <title>Archive — Echo in Ink</title>
        <meta name="description" content={archiveHero.description} />
      </Helmet>

      <PageSectionHero
  eyebrow={archiveHero.eyebrow}
  title="Thoughts. Notes. Worlds."
  italicWord="Worlds."
  description={archiveHero.description}
  image={archiveImageDesktop}
  mobileImage={archiveImageMobile}
  imageAlt="Dark cinematic living archive with luminous fragments, constellation threads, and nebula-like ink clouds"
  align="left"
  
  ctaLabel="Browse the Archive"
  ctaHref="#archive-index"
  secondaryCtaLabel="Open the index"
  secondaryCtaHref="/archive/map"
/>

      <Section
        id="archive-featured"
        spacing="none"
        className="ei-archive-section ei-archive-featured-section"
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
              <EchoCard variant="feature" padding="none" className="ei-archive-featured">
                <picture className="ei-archive-featured-media" aria-hidden="true">
                  <source media="(min-width: 768px)" srcSet={archiveEssayDesktop} />
                  <img src={archiveEssayMobile} alt="" />
                </picture>

                <div className="ei-archive-featured-copy">
                  <SectionLabel label={archiveFeatured.label} index="02" tone="accent" />

                  <div className="ei-archive-card-meta ei-type-meta">
                    <span>{archiveFeatured.category}</span>
                    <span>{archiveFeatured.readTime}</span>
                  </div>

                  <motion.h2 variants={blurEmergence}>
                    <EmphasizedText
                      text={archiveFeatured.title}
                      emphasis={archiveFeatured.emphasis}
                    />
                  </motion.h2>

                  <p className="ei-type-body-editorial">{archiveFeatured.excerpt}</p>

                  <Button to={archiveFeatured.href} variant="secondary">
                    {archiveFeatured.action} <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                  </Button>
                </div>
              </EchoCard>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-archive-section ei-archive-categories">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-archive-section-heading">
              <SectionLabel label="Ways into the archive" index="03" />
              <div>
                <h2 className="ei-type-editorial-heading">Follow a subject, or follow the signal.</h2>
                <p className="ei-type-body-editorial">
                  Essays hold the longer argument. Notes and fragments keep the unfinished edges
                  visible. Case signals show where ideas became form.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-archive-pathway-grid">
              {archivePathways.map((pathway, index) => {
                const entryCount = archiveIndex.filter(
                  (entry) => entry.category === pathway,
                ).length;

                return (
                  <EchoCard
                    key={pathway}
                    variant={index === 0 ? 'feature' : 'index'}
                    padding="md"
                    className="ei-archive-pathway-card"
                  >
                    <div className="ei-archive-pathway-topline ei-type-meta">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>
                        {entryCount} {entryCount === 1 ? 'entry' : 'entries'}
                      </span>
                    </div>
                    <strong>{pathway}</strong>
                    <p className="ei-type-body-editorial">
                      {pathway === 'Philosophy'
  ? 'Long-form arguments, atmospheric theory, and the deeper logic beneath the work.'
  : pathway === 'Notes'
    ? 'Studio fragments, observations, and unfinished edges.'
    : pathway === 'Worldbuilding'
      ? 'Creative worlds, narrative systems, and the environments ideas belong inside.'
      : pathway === 'Case Fragments'
        ? 'Where ideas became visual, strategic, or emotional form.'
        : pathway === 'Experiments'
          ? 'Tests, prototypes, prompts, and partial forms still becoming useful.'
          : 'Reusable tools, structures, and frameworks for building with more clarity.'}
                    </p>
                  </EchoCard>
                );
              })}
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-archive-filter-wrap">
              <FilterBar
                filters={archiveFilters}
                activeFilter={activeFilter}
                onFilterChange={(filter) => setActiveFilter(filter as ArchiveFilter)}
                ariaLabel="Filter archive entries by category"
                tone="editorial"
                className="ei-archive-filter-bar"
                sort={
                  <EchoSelect
                    id="archive-sort"
                    name="archive-sort"
                    label="Order"
                    variant="editorial"
                    value={sortBy}
                    options={[...archiveSortOptions]}
                    onChange={(event) =>
                      setSortBy((event.target.value || 'Latest') as ArchiveSort)
                    }
                    className="ei-archive-sort"
                  />
                }
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-archive-section ei-archive-notes-section">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-archive-section-heading">
              <SectionLabel label="Recent notes" index="04" />
              <div>
                <h2 className="ei-type-editorial-heading">Shorter observations. Quiet points of return.</h2>
                <p className="ei-type-body-editorial">
                  Small pieces with a visible signal: fragments, questions,
                  and working notes from the archive floor.
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerContainer(STAGGER.normal, 0)} className="ei-archive-notes">
              {archiveNotes.map((note, index) => (
                <motion.div key={note.title} variants={driftUp}>
                  <EchoCard variant="interactive" padding="lg" className="ei-archive-note-card">
                    <div className="ei-archive-note-topline ei-type-meta">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>
                        {note.category} · {note.readTime}
                      </span>
                    </div>

                    <IconWell
                      size="sm"
                      tone={index === 2 ? 'magenta' : 'violet'}
                      orbital
                      className="ei-archive-note-icon"
                    >
                      <OrbitalVisual
                        variant={index === 1 ? 'axiomRing' : 'synthesisStar'}
                        size={26}
                      />
                    </IconWell>

                    <h3>
                      <EmphasizedText text={note.title} emphasis={note.emphasis} />
                    </h3>
                    <p className="ei-type-body-editorial">{note.excerpt}</p>

                    <Button to="/archive/notes" variant="tertiary">
                      {note.action} <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                    </Button>
                  </EchoCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="archive-index"
        spacing="none"
        className="ei-archive-section ei-archive-index-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-archive-index-heading">
              <div className="ei-archive-section-heading">
                <SectionLabel label="Archive index" index="05" />
                <div>
                  <h2 className="ei-type-editorial-heading">Ideas, arranged for discovery.</h2>
                  <p className="ei-type-body-editorial">Read across disciplines, or trace one recurring concern through the index.</p>
                </div>
              </div>
              <span className="ei-archive-index-count ei-type-meta">
                {activeFilter === 'All'
                  ? `${archiveIndex.length} Entries`
                  : `${visibleEntries.length} ${visibleEntries.length === 1 ? 'Entry' : 'Entries'}`}
              </span>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <ArchiveIndexList entries={visibleEntries} />
            </motion.div>
            <motion.div variants={fadeSoft} className="ei-archive-index-action">
              <Button to="/archive/map" variant="secondary">
                Open the full index <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="none" className="ei-archive-section ei-archive-philosophy-section">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.loose, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <EchoCard variant="offer" padding="none" className="ei-archive-philosophy">
              <div className="ei-archive-philosophy-copy">
                <SectionLabel label="A living constellation" index="06" tone="accent" />
                <motion.h2 variants={blurEmergence} className="ei-type-editorial-heading">{archivePhilosophy.title}</motion.h2>
                <p className="ei-type-body-editorial">{archivePhilosophy.description}</p>
              </div>

              <motion.div variants={fadeSoft}>
                <ArchiveConstellation />
              </motion.div>
            </EchoCard>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="editorialInvitation"
        eyebrow="Follow the signal"
        heading={archiveCta.title}
        body={archiveCta.description}
        className="ei-archive-closing"
        headingId="archive-cta-heading"
        actions={
          <>
            <Button to="/archive/map" variant="secondary">
              Explore the index <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
            </Button>
            <Button to={archiveCta.href} variant="tertiary">
              {archiveCta.action} <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
            </Button>
          </>
        }
      />
    </PageShell>
  );
}
