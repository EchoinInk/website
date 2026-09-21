import { primaryCallToAction } from "@/data/siteNavigation";

export type ServiceCapabilityId =
  | "brand-identity"
  | "websites-experiences"
  | "digital-products"
  | "systems-automation";

export interface ServiceCapability {
  id: ServiceCapabilityId;
  title: string;
  description: string;
  href: string;
}

export const primaryCapabilities = [
  {
    id: "brand-identity",
    title: "Brand & Identity",
    description: "Brand strategy, visual identity, identity systems and digital expression.",
    href: "/identity",
  },
  {
    id: "websites-experiences",
    title: "Websites & Digital Experiences",
    description:
      "Digital strategy, information architecture, UX/UI, responsive design and development.",
    href: "/services",
  },
  {
    id: "digital-products",
    title: "Products & Apps",
    description:
      "Product strategy, UX/UI, applications, prototypes, platforms and product systems.",
    href: "/services",
  },
  {
    id: "systems-automation",
    title: "Systems & Automation",
    description:
      "Custom software, internal tools, integrations, workflow automation and selective AI implementation.",
    href: "/services",
  },
] as const satisfies readonly ServiceCapability[];

export const brandIdentityCapability = primaryCapabilities[0];

/**
 * An advanced expression of Brand & Identity, intentionally kept outside the
 * four primary capabilities.
 */
export const brandWorldsCapability = {
  id: "brand-worlds",
  title: "Brand Worlds & Creative Direction",
  description:
    "Extends an identity into a coherent creative environment through visual direction, imagery, atmosphere, interaction and expression.",
  href: "/worlds",
} as const;

export type EngagementModelId =
  | "strategy-sessions"
  | "digital-reset"
  | "full-projects";

export interface EngagementModel {
  id: EngagementModelId;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export const engagementModels = [
  {
    id: "strategy-sessions",
    title: "Strategy Sessions",
    description:
      "Focused 60–90 minute engagements for a clearly defined problem.",
    cta: "Book a Strategy Session",
    href: "/booking",
  },
  {
    id: "digital-reset",
    title: "Digital Reset",
    description:
      "A structured engagement for businesses that have grown or changed while their digital presence has not kept pace.",
    cta: "Start a Project",
    href: primaryCallToAction.href,
  },
  {
    id: "full-projects",
    title: "Full Projects",
    description:
      "End-to-end strategy, design and technical implementation for larger or new initiatives.",
    cta: primaryCallToAction.label,
    href: primaryCallToAction.href,
  },
] as const satisfies readonly EngagementModel[];

export const strategySessionsEngagement = engagementModels[0];
