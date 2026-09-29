import { Navigate } from "react-router-dom";

import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { PageSectionHero } from "@/components/sections/PageSectionHero";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectContext } from "@/components/works/ProjectContext";
import { getWorkProject } from "@/data/worksProjects";

interface ProjectOverviewPageProps {
  projectTitle: "Keystone" | "Codexia";
}

export function ProjectOverviewPage({ projectTitle }: ProjectOverviewPageProps) {
  const project = getWorkProject(projectTitle);

  if (!project) {
    return <Navigate to="/works" replace />;
  }

  return (
    <PageShell
      title={`${project.title} — Echo in Ink`}
      description={project.description}
      atmosphere="works"
      theme="light"
      footerTheme="light"
      footerVariant="compact"
      withTopSpacing={false}
      className="ei-project-overview-page"
    >
      <PageSectionHero
        eyebrow={`${project.classification.provenance} · ${project.classification.status}`}
        title={project.title}
        description={project.description}
        offerAnchor={project.category}
        ctaLabel="View all work"
        ctaHref="/works"
        ctaVariant="secondary"
        secondaryCtaLabel="Start a project"
        secondaryCtaHref="/contact"
        image={project.image}
        mobileImage={project.image}
        imageAlt={`${project.title} interface concept`}
        theme="light"
        tone="editorial"
        headingId={`${project.title.toLowerCase()}-heading`}
      />

      <Section
        theme="lightElevated"
        transitionTo="mist"
        spacing="none"
        className="ei-project-overview-summary"
        aria-labelledby={`${project.title.toLowerCase()}-summary-heading`}
      >
        <Container size="xl" className="ei-project-overview-inner">
          <div className="ei-project-overview-heading">
            <SectionLabel label="Project overview" tone="accent" />
            <div>
              <h2 id={`${project.title.toLowerCase()}-summary-heading`}>{project.proofLine}</h2>
              <p>{project.challenge}</p>
            </div>
          </div>

          <EchoCard padding="lg" className="ei-project-overview-card">
            <ProjectContext
              classification={project.classification}
              capabilities={project.capabilities}
              scope={project.scope}
            />
            <dl className="ei-project-overview-facts">
              <div>
                <dt>Output</dt>
                <dd>{project.output}</dd>
              </div>
              <div>
                <dt>Evidence boundary</dt>
                <dd>{project.result}</dd>
              </div>
            </dl>
          </EchoCard>
        </Container>
      </Section>

      <Section theme="mist" spacing="none" className="ei-project-overview-next">
        <CTASection
          variant="editorialInvitation"
          panelTheme="deep"
          eyebrow="Continue exploring"
          heading="See the wider project collection."
          body="Browse the reviewed Work collection, or bring Echo a challenge that needs strategy, design and technology to move together."
          actions={<Button to="/works">View all work</Button>}
          secondary={<Button to="/contact" variant="tertiary">Start a project</Button>}
        />
      </Section>
    </PageShell>
  );
}
