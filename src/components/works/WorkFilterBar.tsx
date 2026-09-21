import { FilterBar } from '@/components/ui/FilterBar';
import { workFilters, type WorkFilter } from '@/data/worksProjects';

interface WorkFilterBarProps {
  activeFilter: WorkFilter;
  onFilterChange: (filter: WorkFilter) => void;
}

export function WorkFilterBar({
  activeFilter,
  onFilterChange,
}: WorkFilterBarProps) {
  return (
    <FilterBar
      filters={workFilters}
      activeFilter={activeFilter}
      onFilterChange={onFilterChange}
      ariaLabel="Filter projects by category"
      tone="editorial"
      className="ei-works-filter-bar"
    />
  );
}
