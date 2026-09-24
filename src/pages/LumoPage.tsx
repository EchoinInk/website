import { PageShell } from "@/components/layout/PageShell";
import { SignatureCaseStudy } from "@/components/lumo/LumoSignatureCaseStudy";

export function LumoPage() {
  return (
    <PageShell
      title="Lumo — Echo in Ink"
      description="Lumo is an independent product prototype exploring calm planning, emotional safety and coherent digital expression."
      atmosphere="works"
      theme="light"
      footerTheme="light"
      footerVariant="compact"
      withTopSpacing={false}
      className="ei-lumo-page"
    >
      <SignatureCaseStudy />
    </PageShell>
  );
}
