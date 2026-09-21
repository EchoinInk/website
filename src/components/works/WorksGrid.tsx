import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { ProjectCard } from '@/components/cards/ProjectCard';
import { primaryCapabilities } from '@/data/servicesContent';
import {
  worksProjects,
  type WorkFilter,
  type WorkProject
} from '@/data/worksProjects';
import { fadeSoft, VIEWPORT } from '@/lib/motion-cinematic';

interface WorksGridProps {
  activeFilter: WorkFilter;
}

function filterProjects(projects: WorkProject[], filter: WorkFilter): WorkProject[] {
  if (filter === 'All Work') return projects;
  const capability = primaryCapabilities.find((item) => item.title === filter);
  return capability
    ? projects.filter((project) => project.capabilities.includes(capability.id))
    : projects;
}

export function WorksGrid({ activeFilter }: WorksGridProps) {
  const visibleProjects = useMemo(() => {
    const nonFeaturedProjects = worksProjects.filter((project) => !project.featured);
    return filterProjects(nonFeaturedProjects, activeFilter);
  }, [activeFilter]);

  if (visibleProjects.length === 0) {
    return (
      <motion.p
        variants={fadeSoft}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT.normal}
        className="ei-works-empty"
      >
        No projects match this filter yet.
      </motion.p>
    );
  }

  return (
    <div className="ei-works-collection">
      <div className="ei-works-selected-grid">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
