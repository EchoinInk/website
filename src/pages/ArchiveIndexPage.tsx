import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';

import archiveImageDesktop from '@/assets/imagery/hero/archive-index-hero-orbital-map-desktop.webp';
import archiveImageMobile from '@/assets/imagery/hero/archive-index-hero-orbital-map-mobile.webp';
import { ArchiveConstellation } from '@/components/archive/ArchiveConstellation';
import { ArchiveIndexList } from '@/components/archive/ArchiveIndexList';
import { Container } from '@/components/layout/Container';
import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import { CTASection } from '@/components/sections/CTASection';
import { PageSectionHero } from '@/components/sections/PageSectionHero';
import { Button } from '@/components/ui/Button';
import { EchoCard } from '@/components/ui/EchoCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { IconWell } from '@/components/ui/IconWell';
import { OrbitalVisual } from '@/components/ui/OrbitalVisual';
import { SectionLabel } from '@/components/ui/SectionLabel';
import {
  archiveFilters,
  archiveIndex,
  archivePhilosophy,
  type ArchiveFilter,
} from '@/data/archiveContent';
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from '@/lib/motion-cinematic';

const featuredEntries = archiveIndex.slice(0, 3);

function scrollToIndex() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('full-index')?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

export function ArchiveIndexPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>('All');
  const [query, setQuery] = useState('');

  const visibleEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = archiveIndex.filter((entry) => {
      const matchesFilter = activeFilter === 'All' || entry.category === activeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${entry.title} ${entry.descriptor} ${entry.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });

    return filtered;
  }, [activeFilter, query]);

  return (
    <PageShell atmosphere="default" theme="light" withTopSpacing={false} className="ei-editorial-page ei-index-page">
      <Helmet>
        <title>Archive Index — Echo in Ink</title>
        <meta
          name="description"
          content="A structured map of the essays and studio notes currently published in Echo in Ink's Archive."
        />
      </Helmet>

      <PageSectionHero
        eyebrow="The Archive · Index"
        title="A map of what is here."
        italicWord="here."
        description="A simple index of Echo in Ink's current essay and studio notes, arranged by format and recurring concern."
        image={archiveImageDesktop}
        mobileImage={archiveImageMobile}
        imageAlt="Editorial index cards connected by constellation lines"
        align="left"
        theme="light"
        tone="editorial"
        ctaLabel="Enter the index"
        ctaHref="#full-index"
        headingId="archive-index-heading"
      />

      <Section theme="light" spacing="none" className="ei-editorial-page-section ei-index-featured-section">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-editorial-section-heading">
              <SectionLabel label="Featured entries" index="02" />
              <h2 className="ei-type-editorial-heading">Three points of entry into the current field.</h2>
            </motion.div>
            <div className="ei-index-featured-grid">
              {featuredEntries.map((entry, index) => (
                <motion.div key={entry.title} variants={fadeSoft}>
                  <EchoCard variant="proof" padding="lg" className="ei-index-featured-card">
                    <div className="ei-index-featured-topline">
                      <IconWell size="sm" tone={index === 2 ? 'magenta' : 'violet'} orbital>
                        <OrbitalVisual variant={entry.icon} size={24} />
                      </IconWell>
                      <span className="ei-type-meta">{entry.category} · {entry.format}</span>
                    </div>
                    <h3>{entry.title}</h3>
                    <p className="ei-type-body-editorial">{entry.descriptor}</p>
                    <Button to={entry.href} variant="tertiary">
                      Locate entry <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                    </Button>
                  </EchoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section theme="lightElevated" spacing="none" className="ei-editorial-page-section ei-index-map-section">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-editorial-section-heading">
              <SectionLabel label="Category map" index="03" />
              <h2 className="ei-type-editorial-heading">Different forms, connected by the same questions.</h2>
            </motion.div>
            <motion.div variants={blurEmergence} className="ei-index-category-map">
              {archiveFilters.slice(1).map((category, index) => {
                const entryCount = archiveIndex.filter(
                  (entry) => entry.category === category,
                ).length;

                return (
                  <EchoCard key={category} variant="index" padding="md" className="ei-index-category">
                    <span className="ei-type-meta">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{category}</strong>
                    <small className="ei-type-meta">{entryCount} {entryCount === 1 ? 'entry' : 'entries'}</small>
                  </EchoCard>
                );
              })}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section id="full-index" theme="mist" spacing="none" className="ei-editorial-page-section">
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div variants={driftUp} className="ei-archive-index-heading">
              <div className="ei-editorial-section-heading">
                <SectionLabel label="Full index" index="04" />
                <h2 className="ei-type-editorial-heading">Read across disciplines, or trace one concern.</h2>
              </div>
              <span className="ei-archive-index-count ei-type-meta">
                {visibleEntries.length} {visibleEntries.length === 1 ? 'entry' : 'entries'}
              </span>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-index-discovery-tools">
              <label className="ei-index-search">
                <span className="ei-type-meta">Search the index</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, descriptions, or categories"
                />
              </label>
              <FilterBar<ArchiveFilter>
                filters={archiveFilters}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                ariaLabel="Filter archive index by category"
                tone="editorial"
                className="ei-archive-filter-bar"
              />
            </motion.div>

            <motion.div variants={fadeSoft}>
              <ArchiveIndexList
                entries={visibleEntries}
                emptyMessage="No entries match this combination of signal and search."
              />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section theme="atmospheric" transitionTo="deep" spacing="none" className="ei-editorial-page-section ei-index-constellation-section">
        <Container size="xl" className="relative z-10">
          <motion.div className="mx-auto max-w-[1180px]">
            <EchoCard variant="offer" padding="none" className="ei-archive-philosophy">
              <div className="ei-archive-philosophy-copy">
                <SectionLabel label="Themes and constellations" index="05" tone="accent" />
                <h2 className="ei-type-editorial-heading">{archivePhilosophy.title}</h2>
                <p className="ei-type-body-editorial">{archivePhilosophy.description}</p>
              </div>
              <ArchiveConstellation />
            </EchoCard>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="editorialInvitation"
        theme="deep"
        eyebrow="Return to the living archive"
        heading="The index is a map. The Archive is the field."
        body="Move back into featured essays, recent notes, and ideas still taking shape."
        actions={
          <>
            <Button to="/insights" variant="primary">Return to Insights</Button>
            <Button to="/archive/notes" variant="secondary">Read studio notes</Button>
          </>
        }
        headingId="index-cta-heading"
        className="ei-editorial-cta"
      />
    </PageShell>
  );
}
