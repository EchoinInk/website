import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";

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

export type EngagementModelId = "strategy-sessions" | "digital-reset" | "full-projects";

export interface EngagementModel {
  id: EngagementModelId;
  title: string;
  description: string;
  bestFor: string;
  typicalScope: string;
  possibleOutcomes: string;
  nextAction: string;
  cta: string;
  href: string;
}

export const strategySessionPricingPolicy =
  "The session fee is confirmed in writing with the proposed time, before you decide whether to accept.";

export const engagementModels = [
  {
    id: "strategy-sessions",
    title: "Strategy Sessions",
    description: "Focused 60–90 minute engagements for a clearly defined problem.",
    bestFor:
      "One defined question that needs clarity, direction, scoping or a practical next step.",
    typicalScope: "A private video session centred on the question you bring.",
    possibleOutcomes: "Clearer decisions, language, direction or practical next steps.",
    nextAction:
      "Send a request with your question, preferred week and timezone. No session or fee is accepted at this stage.",
    cta: siteActionLabels.requestStrategySession,
    href: "/booking",
  },
  {
    id: "digital-reset",
    title: "Digital Reset",
    description:
      "A structured engagement for businesses that have grown or changed while their digital presence has not kept pace.",
    bestFor:
      "An existing business whose brand, website, product or systems no longer fit the business as it is now.",
    typicalScope:
      "A bounded reset of the connected parts that are causing confusion, friction or inconsistency.",
    possibleOutcomes:
      "Clearer digital direction and focused changes across the relevant experience or system.",
    nextAction: "Send a project enquiry describing what has changed and what no longer fits.",
    cta: primaryCallToAction.label,
    href: "/contact?inquiry=project",
  },
  {
    id: "full-projects",
    title: "Full Projects",
    description:
      "End-to-end strategy, design and technical implementation for larger or new initiatives.",
    bestFor:
      "A larger or new initiative that needs strategy, design and technical implementation to work together.",
    typicalScope:
      "End-to-end work across the relevant combination of brand, website, product or systems.",
    possibleOutcomes:
      "A new or substantially rebuilt identity, digital experience, product or system shaped around the initiative.",
    nextAction:
      "Send a project enquiry with the initiative, its context and what the work needs to make possible.",
    cta: primaryCallToAction.label,
    href: "/contact?inquiry=project",
  },
] as const satisfies readonly EngagementModel[];

export const strategySessionsEngagement = engagementModels[0];

export const projectInquiryTypeOptions = [
  ...primaryCapabilities.map(({ title }) => title),
  "Digital Reset",
  "Something else / Not sure yet",
] as const;
