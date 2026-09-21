import lumoFeatured from '@/assets/imagery/sections/lumo-featured-bg.webp';
import auroraImage from '@/assets/imagery/sections/works-image-6.webp';
import obsidianImage from '@/assets/imagery/sections/works-image-5.webp';
import verdeImage from '@/assets/imagery/sections/works-image-4.webp';
import nexusImage from '@/assets/imagery/sections/works-image-1.webp';
import {
  primaryCapabilities,
  type ServiceCapabilityId
} from '@/data/servicesContent';

export type ProjectPresentation = 'study' | 'fragment';

export type ProjectProvenance = 'Independent Product' | 'Concept Project' | 'Internal Project';

export type ProjectStatus = 'Prototype' | 'Exploratory Study';

export interface ProjectClassification {
  provenance: ProjectProvenance;
  status: ProjectStatus;
}

export interface WorkProject {
  title: string;
  category: string;
  description: string;
  proofLine: string;
  challenge: string;
  scope: string;
  output: string;
  result: string;
  image: string;
  href?: string;
  capabilities: readonly ServiceCapabilityId[];
  presentation: ProjectPresentation;
  featured?: boolean;
  classification: ProjectClassification;
}

export const worksProjects: WorkProject[] = [
  {
    title: 'LUMO',
    category: 'Emotionally supportive companion app concept',
    description:
      'An emotionally supportive companion app concept shaped around gentle planning, reduced cognitive load, and emotionally safe interaction.',
    proofLine:
      'Turning an emotionally supportive product concept into a calmer, more coherent digital world for overwhelmed humans.',
    challenge: 'Translate emotional safety into a clear, credible product world.',
    scope: 'Identity system, digital atmosphere, and interface direction.',
    output: 'A connected visual language and modular experience system.',
    result: 'A calmer, more recognisable expression of Lumo across its core touchpoints.',
    image: lumoFeatured,
    href: '/works/lumo',
    capabilities: ['brand-identity', 'websites-experiences', 'digital-products'],
    presentation: 'study',
    featured: true,
    classification: {
      provenance: 'Independent Product',
      status: 'Prototype',
    },
  },
  {
    title: 'Aurora Payments',
    category: 'Premium financial identity system',
    description:
      'An independent fintech identity concept exploring how a payments platform could feel clearer and more credible.',
    proofLine:
      'Clarifying positioning, architecture, and trust signals for a more confident financial experience.',
    challenge: 'Make seamless global transactions feel clear, modern, and trustworthy.',
    scope: 'Identity concept and visual direction.',
    output: 'A focused fintech identity concept with a distinct trust signal.',
    result: 'A concept demonstrating how clarity and confidence can coexist without visual noise.',
    image: auroraImage,
    capabilities: ['brand-identity'],
    presentation: 'study',
    classification: {
      provenance: 'Concept Project',
      status: 'Exploratory Study',
    },
  },
  {
    title: 'Obsidian',
    category: 'Private investment digital experience concept',
    description:
      'An independent digital experience concept exploring a more coherent presence for long-term, trust-led investment work.',
    proofLine:
      'Creating a more confident digital presence built around clarity, patience, and quiet confidence.',
    challenge: 'Express privacy, patience, and long-term vision without financial clichés.',
    scope: 'Brand experience concept and web direction.',
    output: 'A restrained digital prototype with an editorial investment atmosphere.',
    result: 'A concept demonstrating a quieter, more tangible expression of long-term value.',
    image: obsidianImage,
    capabilities: ['websites-experiences'],
    presentation: 'study',
    classification: {
      provenance: 'Concept Project',
      status: 'Prototype',
    },
  },
  {
    title: 'Verde',
    category: 'Luxury skincare identity concept',
    description:
      'A skincare identity concept balancing natural purity with quiet luxury and long-term recognition.',
    proofLine:
      'Building a more coherent identity for a skincare concept shaped by restraint, texture, and lasting recognition.',
    challenge: 'Connect sustainability and luxury without relying on familiar category signals.',
    scope: 'Brand identity concept.',
    output: 'A material-led visual direction for a premium skincare world.',
    result: 'A concept demonstrating quiet recognition through restraint and natural texture.',
    image: verdeImage,
    capabilities: ['brand-identity'],
    presentation: 'fragment',
    classification: {
      provenance: 'Concept Project',
      status: 'Exploratory Study',
    },
  },
  {
    title: 'Nexus Design System',
    category: 'Scalable UI system prototype',
    description:
      'A modular interface system prototype built to keep digital products coherent as they expand.',
    proofLine:
      'Turning an early design system into a clearer interface language teams can reuse with confidence.',
    challenge: 'Create consistency across a growing interface without flattening its character.',
    scope: 'UI system prototype.',
    output: 'A modular component and interaction language.',
    result: 'A prototype demonstrating how reusable patterns can support clarity at scale.',
    image: nexusImage,
    capabilities: ['digital-products', 'systems-automation'],
    presentation: 'fragment',
    classification: {
      provenance: 'Internal Project',
      status: 'Prototype',
    },
  },
];

export const lumoProject = worksProjects[0];

export function getCapabilityLabels(capabilities: readonly ServiceCapabilityId[]) {
  return primaryCapabilities
    .filter((capability) => capabilities.includes(capability.id))
    .map((capability) => capability.title);
}

export const workFilters = [
  'All Work',
  ...primaryCapabilities.map((capability) => capability.title),
] as const;

export type WorkFilter = (typeof workFilters)[number];
