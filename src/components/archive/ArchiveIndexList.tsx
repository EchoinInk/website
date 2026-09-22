import { Link } from 'react-router-dom';

import { EchoCard } from '@/components/ui/EchoCard';
import { IconWell } from '@/components/ui/IconWell';
import { OrbitalVisual } from '@/components/ui/OrbitalVisual';
import type { ArchiveIndexEntry } from '@/data/archiveContent';
import { cn } from '@/lib/utils';

interface ArchiveIndexListProps {
  entries: readonly ArchiveIndexEntry[];
  emptyMessage?: string;
  className?: string;
}

export function ArchiveIndexList({
  entries,
  emptyMessage = 'No indexed entries currently sit under this signal.',
  className,
}: ArchiveIndexListProps) {
  return (
    <EchoCard variant="index" padding="none" className={cn('ei-archive-index-table', className)}>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <Link
            key={entry.title}
            to={entry.href}
            className="ei-archive-index-row"
          >
            <IconWell size="sm" tone="violet" className="ei-archive-index-icon">
              <OrbitalVisual variant={entry.icon} size={22} />
            </IconWell>
            <span className="ei-archive-index-copy">
              <span className="ei-archive-index-title">{entry.title}</span>
              <span className="ei-archive-index-descriptor ei-type-body-small">{entry.descriptor}</span>
            </span>
            <span className="ei-archive-index-category ei-type-meta">{entry.category}</span>
            <span className="ei-archive-index-read ei-type-meta">{entry.format}</span>
            <span className="ei-archive-index-arrow ei-cta-arrow ei-cta-arrow-right" aria-hidden="true">→</span>
          </Link>
        ))
      ) : (
        <p className="ei-archive-index-empty ei-type-body">{emptyMessage}</p>
      )}
    </EchoCard>
  );
}
