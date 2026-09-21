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
    description: "Strategy, visual identity and design systems.",
    href: "/identity",
  },
  {
    id: "websites-experiences",
    title: "Websites & Digital Experiences",
    description: "UX/UI, websites and interactive experiences.",
    href: "/services",
  },
  {
    id: "digital-products",
    title: "Digital Products",
    description: "Applications, platforms and product experiences.",
    href: "/services",
  },
  {
    id: "systems-automation",
    title: "Systems & Automation",
    description: "Custom software, integrations, workflow and selective AI.",
    href: "/services",
  },
] as const satisfies readonly ServiceCapability[];

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
      "A focused 60–90 minute engagement for clarity, direction, scoping or solving a specific digital problem.",
    cta: "Explore Sessions",
    href: "/sessions",
  },
  {
    id: "digital-reset",
    title: "Digital Reset",
    description:
      "A bounded transformation for businesses whose digital presence no longer reflects what the business has become.",
    cta: "Explore the Reset",
    href: "/services",
  },
  {
    id: "full-projects",
    title: "Full Projects",
    description:
      "End-to-end strategy, design and development for larger digital work.",
    cta: primaryCallToAction.label,
    href: primaryCallToAction.href,
  },
] as const satisfies readonly EngagementModel[];
