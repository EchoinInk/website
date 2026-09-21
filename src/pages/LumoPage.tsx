import { Helmet } from 'react-helmet-async';
import { PageShell } from '@/components/layout/PageShell';
import { SignatureCaseStudy } from '@/components/lumo/LumoSignatureCaseStudy';

export function LumoPage() {
  return (
    <PageShell atmosphere="works" theme="deep" withTopSpacing={false} className="ei-lumo-page">
      <Helmet>
        <title>Lumo — Echo in Ink</title>
        <meta
          name="description"
          content="Lumo: an atmospheric identity and digital experience shaped around clarity, emotional safety, and coherent expression."
        />
      </Helmet>

      <SignatureCaseStudy />
    </PageShell>
  );
}
