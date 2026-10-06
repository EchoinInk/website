import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SemanticTheme } from "@/components/layout/PageShell";

const spacingMap = {
  none: "",
  compact: "ei-section-compact",
  intimate: "ei-section-intimate",
  standard: "ei-section-standard",
  expansive: "ei-section-expansive",
  pause: "ei-section-pause",
  closing: "ei-section-closing"
} as const;

export type SectionSpacing = keyof typeof spacingMap;
export type SectionTransitionTarget = "light" | "lightElevated" | "mist" | "atmospheric" | "deep";
export type SectionTransition = "soft" | "chapter" | "atmospheric" | "motif";
export type SectionTransitionDirection = "forward" | "reverse";
export type SectionTransitionMotif = "node";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "id" | "className"> {
  children: ReactNode;
  id?: string;
  className?: string;
  spacing?: SectionSpacing;
  theme?: SemanticTheme;
  transition?: SectionTransition;
  transitionDirection?: SectionTransitionDirection;
  transitionMotif?: SectionTransitionMotif;
  transitionTo?: SectionTransitionTarget;
}

export function Section({
  children,
  id,
  className,
  spacing = "standard",
  theme,
  transition,
  transitionDirection,
  transitionMotif,
  transitionTo,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      data-transition={transition}
      data-transition-direction={transitionDirection}
      data-transition-motif={transitionMotif}
      data-transition-to={transitionTo}
      className={cn("ei-section", spacingMap[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
