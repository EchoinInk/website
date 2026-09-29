import { PageShell } from "@/components/layout/PageShell";
import { CodexiaCaseStudy } from "@/components/codexia/CodexiaCaseStudy";

export function CodexiaPage() {
  return (
    <PageShell
      title="Codexia — Echo in Ink"
      description="Codexia is an independent engineering-platform prototype exploring governed planning, execution, validation and reporting for software work."
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
