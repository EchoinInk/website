import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ServicesPage() {
  return (
    <PageShell
      title="Services — Echo in Ink"
      description="Explore how Echo in Ink helps shape brands, digital experiences, products, and creative systems."
      atmosphere="default"
      theme="deep"
    >
      <Section spacing="expansive" className="min-h-[62vh]">
        <Container size="md">
          <div className="max-w-[760px]">
            <SectionLabel label="Services" />
            <h1 className="ei-type-editorial-heading mt-8">Clear ways to shape what comes next.</h1>
            <p className="ei-type-body-editorial mt-6 max-w-[54ch]">
              Echo works across brand, digital experiences, products, and creative systems. The
              complete services overview is being shaped for the next phase; project enquiries are
              open now.
            </p>
            <Button to="/contact" className="mt-10">
              Start a Project
            </Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
