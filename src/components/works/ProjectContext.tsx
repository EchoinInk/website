import type { ServiceCapabilityId } from '@/data/servicesContent';
import { getCapabilityLabels, type ProjectClassification } from '@/data/worksProjects';

interface ProjectContextProps {
  classification: ProjectClassification;
  capabilities: readonly ServiceCapabilityId[];
  scope?: string;
  scopeLabel?: string;
  className?: string;
  compact?: boolean;
}

export function ProjectContext({
  classification,
  capabilities,
  scope,
  scopeLabel = 'Project scope',
  className = '',
  compact = false,
}: ProjectContextProps) {
  const items = [
    { label: 'Provenance', value: classification.provenance },
    { label: 'Status', value: classification.status },
    { label: 'Evidence', value: classification.evidence },
    { label: 'Capabilities', value: getCapabilityLabels(capabilities).join(' · ') },
    scope ? { label: scopeLabel, value: scope } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <dl
      className={`ei-project-context ${className}`}
      data-compact={compact ? 'true' : undefined}
      aria-label="Project details"
    >
      {items.map((item) => (
        <div key={item.label} data-field={item.label.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
