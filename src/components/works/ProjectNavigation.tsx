import { Link } from "react-router-dom";

import { getAdjacentWorkProjects } from "@/data/worksProjects";

interface ProjectNavigationProps {
  currentProject: string;
  className?: string;
}

export function ProjectNavigation({ currentProject, className = "" }: ProjectNavigationProps) {
  const adjacent = getAdjacentWorkProjects(currentProject);

  if (!adjacent?.previous.href || !adjacent.next.href) return null;

  return (
    <nav
      className={`ei-project-navigation ${className}`}
      aria-label="Explore other projects"
      data-theme="deep"
    >
      <Link to={adjacent.previous.href} className="ei-project-navigation-link" data-direction="previous">
        <span className="ei-project-navigation-direction">← Previous project</span>
        <strong>{adjacent.previous.title}</strong>
        <span>{adjacent.previous.classification.provenance} · {adjacent.previous.classification.status}</span>
      </Link>
      <Link to={adjacent.next.href} className="ei-project-navigation-link" data-direction="next">
        <span className="ei-project-navigation-direction">Next project →</span>
        <strong>{adjacent.next.title}</strong>
        <span>{adjacent.next.classification.provenance} · {adjacent.next.classification.status}</span>
      </Link>
    </nav>
  );
}
