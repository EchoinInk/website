import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EchoCardVariant = "static" | "interactive" | "feature" | "offer" | "index" | "proof";

type EchoCardElement = "article" | "aside" | "div" | "li" | "section";

interface EchoCardProps extends HTMLAttributes<HTMLElement> {
  as?: EchoCardElement;
  children: ReactNode;
  variant?: EchoCardVariant;
  interactive?: boolean;
  padding?: "xs" | "none" | "sm" | "md" | "lg";
}

export function EchoCard({
  as: Component = "article",
  children,
  variant = "static",
  interactive,
  padding = "md",
  className,
  ...props
}: EchoCardProps) {
  const isInteractive = variant === "interactive" || interactive === true;

  return (
    <Component
      className={cn("ei-echo-card", className)}
      data-variant={variant}
      data-interactive={isInteractive ? "true" : "false"}
      data-padding={padding}
      {...props}
    >
      {children}
    </Component>
  );
}
