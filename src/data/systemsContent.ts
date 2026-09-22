import type { OrbitalVariant } from "@/components/orbitals/orbitals";

import atmosphereReferenceImage from "@/assets/imagery/sections/works-image-3.webp";
import toneOfVoiceImage from "@/assets/imagery/sections/ei-lightwave-work-card.png";
import worldLoreImage from "@/assets/imagery/backgrounds/planet-rings-desktop.webp";
import clientOnboardingImage from "@/assets/imagery/sections/nexus-work-card.png";

export const systemsHero = {
  eyebrow: "Creative Systems & Tools",
  title: "Frameworks for making creative decisions clearer.",
  description:
    "A working collection of prompt systems, reference frameworks, direction kits, and practical experiments from Echo in Ink.",
  clarification:
    "These are creative resources and experiments. Custom software, integrations, workflow automation, and selective AI implementation sit within Systems & Automation on Services.",
} as const;

export interface SystemsCategory {
  layer: string;
  title: string;
  description: string;
  usefulFor: string;
  form: string;
  includes: string[];
  icon: OrbitalVariant;
}

export const systemsCategories: SystemsCategory[] = [
  {
    layer: "Question",
    title: "Prompt systems",
    description:
      "Sequences of questions for finding the centre of an identity, idea, or creative problem.",
    usefulFor: "Early ideas and unclear direction",
    form: "Guided questions and reflection structure",
    includes: ["Identity prompts", "Clarity prompts"],
    icon: "chorusCore",
  },
  {
    layer: "Reference",
    title: "Reference frameworks",
    description:
      "Ways to collect and compare tone, texture, language, and visual signals without losing the reason behind them.",
    usefulFor: "Aligning a shared creative language",
    form: "Reference maps and comparison tools",
    includes: ["Atmosphere mapping", "Voice references"],
    icon: "focusDial",
  },
  {
    layer: "Direction",
    title: "Direction kits",
    description:
      "Working structures for turning instinct and references into a connected creative direction.",
    usefulFor: "Projects ready to move from exploration to direction",
    form: "Working documents and direction prompts",
    includes: ["Creative workbooks", "Worldbuilding frameworks"],
    icon: "synthesisStar",
  },
  {
    layer: "Practice",
    title: "Practice tools",
    description:
      "Repeatable templates for carrying a clear direction into day-to-day creative work.",
    usefulFor: "Keeping decisions coherent as work develops",
    form: "Reusable working templates",
    includes: ["Decision records", "Project templates"],
    icon: "vectorLattice",
  },
];

export const featuredSystem = {
  category: "Experimental prompt framework",
  title: "The Identity Clarity Prompt Kit",
  description:
    "A working prompt structure for examining the purpose, audience, values, tone, and central idea behind an emerging identity.",
  usefulFor: "Founders and makers clarifying an early brand or product idea",
  form: "Working framework — not a downloadable product",
  features: [
    "Questions for purpose and audience",
    "Prompts for tone, values, and distinction",
    "A short structure for turning reflection into a creative brief",
  ],
  cta: {
    label: "Discuss a related project",
    href: "/contact?inquiry=project",
  },
} as const;

export interface CreativeResource {
  title: string;
  description: string;
  type: string;
  status: "Concept" | "Working framework";
  usefulFor: string;
  form: string;
  image: string;
  imagePosition?: string;
}

export const creativeResources: CreativeResource[] = [
  {
    title: "Atmosphere Reference Atlas",
    description:
      "A concept for gathering atmosphere references around tone, texture, pace, and mood.",
    type: "Reference framework",
    status: "Concept",
    usefulFor: "Finding a shared emotional language",
    form: "Curated reference structure",
    image: atmosphereReferenceImage,
    imagePosition: "center",
  },
  {
    title: "Tone of Voice Builder",
    description:
      "A working framework for comparing voice principles and testing how an idea should sound.",
    type: "Prompt system",
    status: "Working framework",
    usefulFor: "Clarifying a consistent verbal direction",
    form: "Voice prompts and comparison notes",
    image: toneOfVoiceImage,
    imagePosition: "62% center",
  },
  {
    title: "World Lore Blueprint",
    description:
      "An experimental structure for connecting story, symbols, atmosphere, and internal logic.",
    type: "Direction kit",
    status: "Concept",
    usefulFor: "Giving an emerging creative world more coherence",
    form: "Worldbuilding framework",
    image: worldLoreImage,
    imagePosition: "center",
  },
  {
    title: "Client Onboarding Toolkit",
    description:
      "A concept for making the first stage of a creative engagement clearer and more considered.",
    type: "Practice tool",
    status: "Concept",
    usefulFor: "Structuring early project information",
    form: "Onboarding template concept",
    image: clientOnboardingImage,
    imagePosition: "center",
  },
];

export const systemsUseCases = [
  {
    audience: "Founders",
    need: "Clarify the identity before investing in expression.",
    fit: "Prompt systems + direction kits",
  },
  {
    audience: "Artists & writers",
    need: "Give an emerging world a stronger internal logic.",
    fit: "Reference frameworks + direction kits",
  },
  {
    audience: "Creative teams",
    need: "Create repeatable structure without making the work generic.",
    fit: "Direction kits + practice tools",
  },
  {
    audience: "Independent makers",
    need: "Move from scattered references to a coherent next step.",
    fit: "Prompt systems + reference frameworks",
  },
] as const;

export const systemPathway: Array<{
  title: string;
  description: string;
  icon: OrbitalVariant;
}> = [
  {
    title: "Notice",
    description: "Name the question, tension, or inconsistency that needs attention.",
    icon: "signalBridge",
  },
  {
    title: "Explore",
    description: "Use a prompt or reference framework to make the underlying signals visible.",
    icon: "focusDial",
  },
  {
    title: "Shape",
    description: "Turn the useful findings into a clearer direction or decision.",
    icon: "prismMirror",
  },
  {
    title: "Apply",
    description: "Carry the direction into the brand, product, experience, or project itself.",
    icon: "haloGate",
  },
];

export const systemsClosing = {
  title: "Use the right level of system for the work.",
  description:
    "Explore experimental creative tools here. For custom software, integrations, workflow automation, or selective AI implementation, see Systems & Automation under Services.",
  cta: {
    label: "Explore Systems & Automation",
    href: "/services",
  },
} as const;
