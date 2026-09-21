import { Button } from "../ui/Button";
import { primaryCallToAction } from "@/data/siteNavigation";

export function HeroCTA() {
  return (
    <div className="ei-home-hero-actions ei-page-section-hero-actions mt-8 mb-10 flex w-full flex-col items-stretch gap-3 sm:mb-12 sm:flex-row sm:items-center md:mt-10 md:mb-0 md:gap-4">
      <Button
        to={primaryCallToAction.href}
        variant="primary"
        className="ei-page-section-hero-button ei-page-section-hero-button-primary self-stretch sm:self-start"
      >
        {primaryCallToAction.label}
      </Button>

      <Button
        to="/works"
        variant="secondary"
        className="ei-page-section-hero-button ei-page-section-hero-button-secondary self-stretch sm:self-start"
      >
        View Our Work
        <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
          →
        </span>
      </Button>
    </div>
  );
}
