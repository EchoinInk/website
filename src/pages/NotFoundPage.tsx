import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { OrbitalVisual } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function NotFoundPage() {
  return (
    <PageShell
      title="Page not found — Echo in Ink"
      description="The page you were looking for could not be found."
      canonicalPath={false}
      robots="noindex,follow"
      atmosphere="default"
      theme="light"
      footerTheme="light"
      footerVariant="compact"
    >
      <Section theme="light" spacing="expansive" className="min-h-[62vh] overflow-hidden">
        <Container size="md">
          <div className="relative grid min-h-[44vh] items-center gap-12 py-10 md:grid-cols-[1fr_0.72fr] md:py-16">
            <div className="relative z-10 max-w-[680px]">
              <SectionLabel label="404" />
              <h1 className="ei-type-editorial-heading mt-8">
                This signal has drifted out of range.
              </h1>
              <p className="ei-type-body-editorial mt-6 max-w-[48ch]">
                The page may have moved, or the address may be incomplete. Choose a clear route back
                into the studio.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button to="/" variant="primary">
                  Return home
                </Button>
                <Button to="/works" variant="secondary">
                  View work
                </Button>
                <Button to="/services" variant="tertiary">
                  Explore services →
                </Button>
              </div>
              <Button to="/contact" variant="tertiary" className="mt-5">
                Start a project →
              </Button>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none relative mx-auto aspect-square w-full max-w-[290px] opacity-75 md:max-w-[360px]"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(var(--ei-violet-rgb)/0.1)_0%,transparent_68%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <OrbitalVisual variant="signalNest" size={250} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
