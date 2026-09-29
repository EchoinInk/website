import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import { EchoCard } from '@/components/ui/EchoCard';
import { ProjectContext } from '@/components/works/ProjectContext';
import type { WorkProject } from '@/data/worksProjects';
import { DURATION, EASE_CINEMATIC, VIEWPORT } from '@/lib/motion-cinematic';

interface ProjectCardProps extends WorkProject {
  index?: number;
  showEvidence?: boolean;
  highlightOutcome?: boolean;
}

export function ProjectCard({
  title,
  category,
  description,
  proofLine,
  challenge,
  image,
  href,
  result,
  presentation,
  capabilities,
  classification,
  scope,
  index = 0,
  showEvidence = false,
  highlightOutcome = false,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLinked = Boolean(href);
  const number = String(index + 1).padStart(2, '0');

  const hoverMotion =
    !prefersReducedMotion && isLinked
      ? {
          y: -3,
          transition: { duration: DURATION.instant, ease: EASE_CINEMATIC },
        }
      : undefined;

  const content = (
    <>
      <div className="ei-works-project-media">
        <img src={image} alt="" aria-hidden="true" loading="lazy" />
        <div className="ei-works-project-media-scrim" aria-hidden="true" />
      </div>

      <div className="ei-works-project-copy">
        <div className="ei-works-project-header">
          <div className="ei-works-project-meta">
            <span>{classification.provenance} · {classification.status}</span>
            <span>{number}</span>
          </div>
          <h3>{title}</h3>
          <p className="ei-works-project-category">{category}</p>
          {showEvidence ? <p className="ei-works-project-description">{description}</p> : null}
        </div>

        <ProjectContext
          classification={classification}
          capabilities={capabilities}
          compact
          className="ei-works-project-context"
        />
        {showEvidence ? (
          <dl className="ei-works-project-summary" aria-label={`${title} project summary`}>
            <div>
              <dt>Challenge / opportunity</dt>
              <dd>{challenge}</dd>
            </div>
            <div>
              <dt>Echo&apos;s role</dt>
              <dd>{scope}</dd>
            </div>
          </dl>
        ) : highlightOutcome ? (
          <div className="ei-works-project-outcome">
            <span>Evidence boundary</span>
            <p>{result}</p>
          </div>
        ) : (
          <p className="ei-works-project-proof">{proofLine}</p>
        )}

        <span className="ei-card-action" data-link-state={isLinked ? 'linked' : 'preview'}>
          {isLinked ? `View ${title} case study` : 'Preview only · No case study'}
          {isLinked ? <span className="ei-card-action-arrow ei-cta-arrow-right">→</span> : null}
        </span>
      </div>
    </>
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT.normal}
      transition={{
        duration: DURATION.slow,
        ease: EASE_CINEMATIC,
        delay: index * 0.06,
      }}
      whileHover={hoverMotion}
      className="ei-works-project-motion"
    >
      <EchoCard
        variant={presentation === 'study' ? 'feature' : 'index'}
        interactive={isLinked}
        padding="none"
        className="ei-works-project-card"
        data-theme="deep"
        data-presentation={presentation}
        data-outcome-highlighted={highlightOutcome ? 'true' : undefined}
        data-link-state={isLinked ? 'linked' : 'preview'}
        aria-label={
          !isLinked
            ? `${title} — ${classification.provenance}, ${classification.status}`
            : undefined
        }
      >
        {href ? (
          <Link
            to={href}
            className="ei-works-project-link"
            aria-label={`${title} — ${classification.provenance}, ${classification.status}. ${proofLine}`}
          >
            {content}
          </Link>
        ) : (
          content
        )}
      </EchoCard>
    </motion.div>
  );
}
