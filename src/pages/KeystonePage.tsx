import { KeystoneCaseStudy } from "@/components/keystone/KeystoneCaseStudy";
import { PageShell } from "@/components/layout/PageShell";
import { getWorkProject } from "@/data/worksProjects";
import { createProjectStructuredData } from "@/lib/structuredData";

const keystoneProject = getWorkProject("Keystone");

export function KeystonePage() {
  return (
    <PageShell
      title="Keystone — Echo in Ink"
      description="Keystone is an internal exploratory product study into a calmer control centre for studio projects, tasks, content and operational signals."
      structuredData={
        keystoneProject ? createProjectStructuredData(keystoneProject, "/works/keystone") : undefined
      }
      atmosphere="works"
      theme="deep"
      footerTheme="deep"
      footerVariant="compact"
      withTopSpacing={false}
      className="ei-keystone-page"
    >
      <KeystoneCaseStudy />
    </PageShell>
  );
}
