import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';

import archiveEssayDesktop from '@/assets/imagery/hero/essay-hero-atmosphere-wave-desktop.webp';
import archiveEssayMobile from '@/assets/imagery/hero/essay-hero-atmosphere-wave-mobile.webp';
import { EditorialArticleLayout } from '@/components/layout/EditorialArticleLayout';
import { PageShell } from '@/components/layout/PageShell';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/Button';
import { EchoCard } from '@/components/ui/EchoCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { archiveFeatured, archiveNotes } from '@/data/archiveContent';
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from '@/lib/motion-cinematic';

export function ArchiveEssayPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageShell atmosphere="default" theme="light" withTopSpacing={false} className="ei-editorial-page">
      <Helmet>
        <title>Atmosphere is information — Echo in Ink</title>
        <meta name="description" content={archiveFeatured.excerpt} />
      </Helmet>

      <EditorialArticleLayout
        className="ei-essay-page"
        eyebrow="The Archive · Essay"
        title="Atmosphere is information."
        subtitle="Before an audience understands what something means, they have already felt what kind of world they have entered."
        metadata={
          <div className="ei-editorial-meta-row ei-type-meta">
            <span>{archiveFeatured.category}</span>
            <span>{archiveFeatured.format}</span>
            <span>Echo in Ink</span>
          </div>
        }
        lead={
          <p className="ei-type-body-large">
            Atmosphere is not decoration. It is the first data your audience receives.
            Before words, before identity, before logic, there is feeling.
          </p>
        }
        aside={
          <EchoCard variant="offer" padding="lg" className="ei-essay-aside-card">
            <SectionLabel label="A working principle" rule="none" tone="accent" />
            <p>
              If the atmosphere says one thing and the language says another, people
              trust the atmosphere first.
            </p>
          </EchoCard>
        }
        footer={
          <>
            <section data-theme="lightElevated" className="ei-essay-related" aria-labelledby="essay-related-heading">
              <div className="ei-content-frame ei-content-frame-standard ei-content-frame-gutters">
                <motion.div
                  variants={staggerContainer(STAGGER.normal, 0)}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={VIEWPORT.normal}
                >
                  <motion.div variants={driftUp} className="ei-editorial-section-heading">
                    <SectionLabel label="Continue through the archive" index="02" />
                    <h2 id="essay-related-heading">Related notes on identity, feeling, and memory.</h2>
                  </motion.div>
                  <div className="ei-essay-related-grid">
                    {archiveNotes.map((note) => (
                      <motion.div key={note.id} variants={fadeSoft}>
                        <EchoCard variant="interactive" padding="lg" className="ei-editorial-related-card">
                          <span className="ei-type-meta">{note.thread} · {note.format}</span>
                          <h3>{note.title}</h3>
                          <p className="ei-type-body-editorial">{note.excerpt}</p>
                          <Button to="/archive/notes" variant="tertiary">
                            Read note <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">→</span>
                          </Button>
                        </EchoCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
            <CTASection
              variant="editorialInvitation"
              theme="deep"
              eyebrow="Return to the field"
              heading="Follow the thought back into the Archive."
              body="Continue through essays, notes, fragments, and recurring themes."
              actions={
                <>
                  <Button to="/insights" variant="primary">Back to Insights</Button>
                  <Button to="/archive/map" variant="secondary">Open the index</Button>
                </>
              }
              headingId="essay-cta-heading"
              className="ei-editorial-cta"
            />
          </>
        }
      >
        <figure className="ei-essay-atmospheric-field">
          <picture>
            <source media="(min-width: 768px)" srcSet={archiveEssayDesktop} />
            <img src={archiveEssayMobile} alt="" />
          </picture>
          <figcaption>Atmosphere carries orientation before explanation arrives.</figcaption>
        </figure>

        <h2>The first message is rarely verbal.</h2>
        <p>
          We often speak about identity as if it begins with a mark, a palette, or a
          sentence. In practice, the encounter starts earlier. It starts with distance,
          density, pace, contrast, silence, and the quality of attention a space asks
          from us.
        </p>
        <p>
          These decisions are not a layer placed over meaning. They are part of the
          meaning. They tell us whether to move quickly or slowly, whether to feel held
          or tested, and whether the world in front of us has been authored with care.
        </p>

        <blockquote>
          “Atmosphere is the part of the message people understand before they have
          found the words for it.”
        </blockquote>

        <h2>Feeling creates the frame for understanding.</h2>
        <p>
          Information never arrives in a neutral container. A restrained page can make
          an idea feel deliberate. A crowded interface can make even gentle language
          feel demanding. Rhythm changes comprehension because rhythm changes the state
          in which comprehension happens.
        </p>
        <p>
          This is why emotional design cannot be reduced to decoration. Colour,
          typography, motion, and spatial composition establish the conditions in which
          content is received. They help an audience decide what matters, what belongs
          together, and whether there is enough clarity to stay.
        </p>

        <h2>Coherence is a form of care.</h2>
        <p>
          A coherent atmosphere does not require every surface to look the same. It
          requires every decision to feel related to the same underlying truth. The
          system can stretch because its centre remains legible.
        </p>
        <p>
          When that centre is clear, identity becomes more than recognition. It becomes
          orientation. The audience knows where they are, how to move, and what kind of
          relationship the work is asking them to enter.
        </p>

        <h2>Design the state, not only the surface.</h2>
        <p>
          The practical question is not simply, “What should this look like?” It is,
          “What state should this make possible?” From there, atmosphere becomes a
          system of intentional signals: enough contrast to guide, enough quiet to
          notice, enough structure to trust, and enough mystery to remain alive.
        </p>
        <p>
          The surface still matters. But it matters because it carries a deeper
          instruction: this is how to be here.
        </p>
      </EditorialArticleLayout>
    </PageShell>
  );
}
