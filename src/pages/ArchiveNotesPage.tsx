import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

import archiveImageDesktop from "@/assets/imagery/hero/notes-hero-light-ribbon-desktop.webp";
import archiveImageMobile from "@/assets/imagery/hero/notes-hero-light-ribbon-mobile.webp";
import { ArchiveIndexList } from "@/components/archive/ArchiveIndexList";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { IconWell } from "@/components/ui/IconWell";
import { OrbitalVisual } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  archiveIndex,
  archiveNotes,
  archivePhilosophy,
} from "@/data/archiveContent";
import {
  blurEmergence,
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

const noteIndexEntries = archiveIndex.filter(
  (entry) => entry.category === "Notes",
);

const previewNotes = archiveNotes.slice(0, 3);

function scrollToSection(id: string) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function ArchiveNotesPage() {
  const { hash } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!hash) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <PageShell
      title="Notes — Echo in Ink"
      description="Short studio-thinking fragments on identity, atmosphere, systems, memory, and creative worldbuilding."
      atmosphere="default"
      theme="light"
      withTopSpacing={false}
      className="ei-editorial-page ei-notes-page"
    >
     <PageSectionHero
        eyebrow="The Archive · Notes"
        title="Short observations from the studio."
        italicWord="studio."
        description="Three concise notes on identity, atmosphere, and memory—presented as working observations rather than dated publications."
        image={archiveImageDesktop}
        mobileImage={archiveImageMobile}
        imageAlt="Editorial notebook fragments connected by a soft luminous ribbon"
        align="left"
        theme="light"
        tone="editorial"
        ctaLabel="Read the first note"
        ctaHref="#identity-is-not-decoration"
        secondaryCtaLabel="Open the index"
        secondaryCtaHref="/archive/map"
        headingId="archive-notes-heading"
      />

      <Section
        id="featured-note"
        spacing="none"
        theme="light"
        className="ei-editorial-page-section ei-notes-featured-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={blurEmergence}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <EchoCard
              variant="feature"
              padding="none"
              className="ei-notes-featured"
            >
              <div className="ei-notes-featured-mark" aria-hidden="true">
                <div className="ei-notes-editorial-stack">
                  <span className="ei-notes-paper ei-notes-paper-one" />
                  <span className="ei-notes-paper ei-notes-paper-two" />
                  <span className="ei-notes-paper ei-notes-paper-three" />
                  <span className="ei-notes-ribbon" />
                  <OrbitalVisual variant="quietAxis" size={150} />
                </div>
              </div>

              <div className="ei-notes-featured-copy">
                <SectionLabel label="Featured note" index="02" tone="accent" />

                <span className="ei-type-meta">
                  {archiveNotes[0].thread} · {archiveNotes[0].format}
                </span>

                <h2>{archiveNotes[0].title}</h2>
                <p className="ei-type-body-editorial">{archiveNotes[0].excerpt}</p>

                <Button
                  onClick={() => scrollToSection(archiveNotes[0].id)}
                  variant="secondary"
                >
                  Continue reading <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-down">↓</span>
                </Button>
              </div>
            </EchoCard>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        theme="lightElevated"
        className="ei-editorial-page-section ei-notes-preview-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-editorial-section-heading"
            >
              <SectionLabel label="Start here" index="03" />
              <h2 className="ei-type-editorial-heading">Three openings into the notebook.</h2>
            </motion.div>

            <div className="ei-notes-preview-grid">
              {previewNotes.map((note, index) => (
                <motion.article key={note.id} variants={fadeSoft}>
                  <EchoCard
                    variant={index === 0 ? "feature" : "index"}
                    padding="lg"
                    className="ei-notes-preview-card"
                  >
                    <div className="ei-notes-preview-topline ei-type-meta">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        {note.thread} · {note.format}
                      </span>
                    </div>

                    <h3>{note.title}</h3>
                    <p className="ei-type-body-editorial">{note.excerpt}</p>

                    <Button
                      onClick={() => scrollToSection(note.id)}
                      variant="tertiary"
                    >
                      Read note <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-down">↓</span>
                    </Button>
                  </EchoCard>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        id="recent-notes"
        spacing="none"
        theme="lightElevated"
        className="ei-editorial-page-section ei-notes-recent-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-editorial-section-heading"
            >
              <SectionLabel label="Recent notes" index="04" />
              <h2 className="ei-type-editorial-heading">Small pieces with enough room to resonate.</h2>
            </motion.div>

            <div className="ei-notes-list">
              {archiveNotes.map((note, index) => (
                <motion.article
                  key={note.id}
                  id={note.id}
                  variants={fadeSoft}
                  className="ei-notes-row"
                >
                  <div className="ei-notes-row-number ei-type-meta">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <IconWell
                    size="sm"
                    tone={index === 2 ? "magenta" : "violet"}
                    orbital
                  >
                    <OrbitalVisual
                      variant={index === 1 ? "innerTide" : "synthesisStar"}
                      size={24}
                    />
                  </IconWell>

                  <div className="ei-notes-row-copy">
                    <span className="ei-type-meta">
                      {note.thread} · {note.format}
                    </span>
                    <h3>{note.title}</h3>
                    <p className="ei-type-body-editorial">{note.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        theme="mist"
        className="ei-editorial-page-section ei-notes-threads-section"
      >
        <Container size="xl" className="relative z-10">
          <motion.div
            variants={staggerContainer(STAGGER.normal, 0)}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            className="mx-auto max-w-[1180px]"
          >
            <motion.div
              variants={driftUp}
              className="ei-editorial-section-heading"
            >
              <SectionLabel label="Browse threads" index="05" />
              <h2 className="ei-type-editorial-heading">Recurring questions, gathered by signal.</h2>
            </motion.div>

            <motion.div variants={fadeSoft} className="ei-notes-thread-map">
              {archivePhilosophy.themes.map((theme, index) => (
                <EchoCard
                  key={theme}
                  variant="index"
                  padding="md"
                  className="ei-notes-thread"
                >
                  <span className="ei-type-meta">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{theme}</strong>
                </EchoCard>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section
        spacing="none"
        theme="mist"
        transitionTo="deep"
        className="ei-editorial-page-section ei-notes-index-section"
      >
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
                <SectionLabel label="Note index" index="06" />
                <h2 className="ei-type-editorial-heading">Notes inside the larger archive.</h2>
              </div>

              <Button to="/archive/map" variant="tertiary">
                View full index <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
              </Button>
            </motion.div>

            <motion.div variants={fadeSoft}>
              <ArchiveIndexList entries={noteIndexEntries} />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        variant="editorialInvitation"
        theme="deep"
        eyebrow="Keep following"
        heading="Notes are one path through the Archive."
        body="Move into longer essays, case fragments, systems thinking, and worldbuilding."
        actions={
          <>
            <Button to="/insights" variant="primary">
              Return to Insights
            </Button>
            <Button to="/archive/map" variant="secondary">
              Open the index
            </Button>
          </>
        }
        headingId="notes-cta-heading"
        className="ei-editorial-cta"
      />
    </PageShell>
  );
}
