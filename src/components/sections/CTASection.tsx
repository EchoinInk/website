import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import type { SemanticTheme } from "@/components/layout/PageShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

export type CTASectionVariant = "slim" | "imagePanel" | "editorialInvitation";

interface CTASectionProps {
  variant?: CTASectionVariant;
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  actions: ReactNode;
  secondary?: ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
  headingId?: string;
  theme?: SemanticTheme;
  panelTheme?: SemanticTheme;
}

export function CTASection({
  variant = "slim",
  eyebrow,
  heading,
  body,
  actions,
  secondary,
  image,
  imageAlt = "",
  className,
  headingId = "echo-cta-heading",
  theme,
  panelTheme,
}: CTASectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={staggerContainer(STAGGER.loose, 0)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT.loose}
      className={cn("ei-cta-section", className)}
      data-variant={variant}
      data-theme={theme}
      aria-labelledby={headingId}
    >
      <Container size="xl" className="relative z-10">
        <div className="ei-layout-page-rail">
          <div className="ei-cta-section-panel" data-theme={panelTheme}>
            {image ? <img className="ei-cta-section-image" src={image} alt={imageAlt} /> : null}
            {image ? <div className="ei-cta-section-scrim" aria-hidden="true" /> : null}
            <motion.div variants={driftUp} className="ei-cta-section-copy">
              {eyebrow ? (
                <SectionLabel label={eyebrow} align={variant === "slim" ? "left" : "center"} />
              ) : null}
              <h2 id={headingId} className="ei-cta-section-heading">
                {heading}
              </h2>
              {body ? <div className="ei-cta-section-body">{body}</div> : null}
              <motion.div variants={fadeSoft} className="ei-cta-section-actions">
                {actions}
              </motion.div>
              {secondary ? <div className="ei-cta-section-secondary">{secondary}</div> : null}
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
