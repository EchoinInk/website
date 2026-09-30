import { KeystoneCaseStudy } from "@/components/keystone/KeystoneCaseStudy";
import { PageShell } from "@/components/layout/PageShell";

export function KeystonePage() {
  return (
    <PageShell
      title="Keystone — Echo in Ink"
      description="Keystone is an internal exploratory product study into a calmer control centre for studio projects, tasks, content and operational signals."
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
