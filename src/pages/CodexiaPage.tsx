import { PageShell } from "@/components/layout/PageShell";
import { CodexiaCaseStudy } from "@/components/codexia/CodexiaCaseStudy";
import { getWorkProject } from "@/data/worksProjects";
import { createProjectStructuredData } from "@/lib/structuredData";

const codexiaProject = getWorkProject("Codexia");

export function CodexiaPage() {
  return (
    <PageShell
      title="Codexia — Echo in Ink"
      description="Codexia is an independent engineering-platform prototype exploring governed planning, execution, validation and reporting for software work."
      structuredData={
        codexiaProject ? createProjectStructuredData(codexiaProject, "/works/codexia") : undefined
      }
      atmosphere="works"
      theme="deep"
      footerTheme="deep"
      footerVariant="compact"
      withTopSpacing={false}
      className="ei-codexia-page"
    >
      <CodexiaCaseStudy />
    </PageShell>
  );
}
