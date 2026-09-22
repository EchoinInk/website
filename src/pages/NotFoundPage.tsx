import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function NotFoundPage() {
  return (
    <PageShell
      title="Page not found — Echo in Ink"
      description="The page you were looking for could not be found."
      canonicalPath={false}
      robots="noindex,follow"
      atmosphere="default"
      theme="deep"
    >
      <Section spacing="expansive" className="min-h-[62vh]">
        <Container size="md">
          <div className="max-w-[680px]">
            <SectionLabel label="404" />
            <h1 className="ei-type-editorial-heading mt-8">
              This signal has drifted out of range.
            </h1>
            <p className="ei-type-body-editorial mt-6 max-w-[48ch]">
              The page may have moved, or the address may be incomplete.
            </p>
            <Button to="/" variant="secondary" className="mt-10">
              Return home
            </Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
