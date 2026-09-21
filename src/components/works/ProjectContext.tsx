import type { ServiceCapabilityId } from '@/data/servicesContent';
import {
  getCapabilityLabels,
  type ProjectClassification
} from '@/data/worksProjects';

interface ProjectContextProps {
  classification: ProjectClassification;
  capabilities: readonly ServiceCapabilityId[];
  scope?: string;
  className?: string;
  compact?: boolean;
}

export function ProjectContext({
  classification,
  capabilities,
  scope,
  className = '',
  compact = false
}: ProjectContextProps) {
  const items = [
    { label: 'Provenance', value: classification.provenance },
    { label: 'Status', value: classification.status },
    { label: 'Capabilities', value: getCapabilityLabels(capabilities).join(' · ') },
    scope ? { label: 'Project scope', value: scope } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <dl
      className={`ei-project-context ${className}`}
      data-compact={compact ? 'true' : undefined}
      aria-label="Project details"
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
