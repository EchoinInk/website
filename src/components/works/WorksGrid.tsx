import { ProjectCard } from '@/components/cards/ProjectCard';
import { worksProjects } from '@/data/worksProjects';

export function WorksGrid() {
  const visibleProjects = worksProjects.filter((project) => !project.featured);

  return (
    <div className="ei-works-collection">
      <div className="ei-works-selected-grid">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            index={index + 1}
            showEvidence
          />
        ))}
      </div>
    </div>
  );
}
