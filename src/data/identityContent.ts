import type { OrbitalVariant } from "@/components/ui/OrbitalVisual";

export const identityHero = {
  eyebrow: "Identity",
  title: "Every world begins with a feeling.",
  italicWord: "feeling",
  subheading: "Atmospheric Identity Direction",
  body: [
    "Before a name. Before a logo. Before the visuals.",
    "Identity begins as a feeling — an atmosphere waiting to be understood, shaped, and expressed.",
    "I translate that feeling into visual language, rhythm, and voice."
  ],
  primaryCta: { label: "Start an Identity project", href: "/contact" },
  secondaryCta: { label: "Explore Sessions", href: "/sessions" },
  atmosphereRail: ["Atmosphere", "Language", "Rhythm", "Voice", "Presence"]
};

export const identityAudience = {
  eyebrow: "For the creator who can feel the world, but cannot yet see it clearly.",
  intro: [
    "Some creators begin with clarity. Others begin with a feeling. This is for the second kind.",
    "For founders, artists, writers, makers, and independent creatives building something with emotional weight — but still seeking clarity around how it should look, sound, and feel."
  ]
};

export const identityUseCases = [
  "You are starting a new project and need its aesthetic direction.",
  "Your current brand feels scattered or generic.",
  "You know the emotion, but not the visual language.",
  "You need palette, type, tone, and mood before building.",
  "You want every expression to belong to the same world.",
  "You want your work to feel authored, not assembled."
];

export const identityDeliverables: {
  heading: string;
  closing: string;
  items: Array<{
    title: string;
    description: string;
    includes: string[];
    icon: OrbitalVariant;
  }>;
} = {
  heading: "A concise identity direction you can use.",
  closing:
    "Each piece is focused on purpose — together they form the emotional architecture of your world.",
  items: [
    {
      title: "Atmosphere Direction",
      description: "The emotional field the identity should create before the details are understood.",
      includes: ["Visual references", "Texture and light", "Reference rhythm"],
      icon: "innerTide"
    },
    {
      title: "Tone & Language",
      description: "A clear verbal character for how the world speaks, names, and introduces itself.",
      includes: ["Tone direction", "Key language", "Micro-manifesto"],
      icon: "signalBridge"
    },
    {
      title: "Visual Language",
      description: "A refined direction for the visible qualities that make the work recognisable.",
      includes: ["Palette", "Type direction", "Image direction"],
      icon: "prismMirror"
    },
    {
      title: "Identity System",
      description: "A coherent centre that keeps separate decisions working as one identity.",
      includes: ["Usage principles", "Hierarchy", "Consistency notes"],
      icon: "chorusCore"
    },
    {
      title: "Launch Direction",
      description: "Guidance for the first public expression of the identity and the feeling it should leave.",
      includes: ["Launch guidance", "Priority moments", "Entry touchpoints"],
      icon: "memoryComet"
    },
    {
      title: "Expression Framework",
      description: "Practical notes for carrying the direction into future creative decisions.",
      includes: ["Layout and pacing", "Digital expression", "Usage guidance"],
      icon: "vectorLattice"
    }
  ]
};

export const identityTransformation = {
  heading: "From scattered references to a coherent world.",
  intro:
    "The work is not forced into a style. Its strongest signals are clarified, connected, and made usable.",
  divider: "Identity is not created — it is clarified.",
  signals: ["Instinct", "References", "Ambition", "Voice", "Tension"],
  output: "A world people can recognise, remember, and return to."
};

export const identityApplications = [
  {
    title: "Type & palette",
    description: "A visual temperature and hierarchy that gives the work an immediate character."
  },
  {
    title: "Language",
    description: "Words, tone, and recurring ideas that make the identity sound like itself."
  },
  {
    title: "Identity guidance",
    description: "Principles that keep future decisions connected without making the system rigid."
  },
  {
    title: "Digital touchpoints",
    description: "Direction for websites, launches, social expression, and other public moments."
  }
];

export const identityProcess = {
  heading: "Quiet, precise, and intuitive.",
  closing:
    "The result is a direction you can build from — without second-guessing the feeling.",
  steps: [
    {
      title: "Signal",
      description: "Share the project, its intent, references, audience, and what currently feels unresolved."
    },
    {
      title: "Feeling",
      description: "Find the emotional pattern beneath the references: the tone, tension, rhythm, and pull."
    },
    {
      title: "Identity",
      description: "Shape that pattern into a distinct visual and verbal character."
    },
    {
      title: "System",
      description: "Connect palette, typography, language, imagery, and principles around one centre."
    },
    {
      title: "Expression",
      description: "Translate the direction into guidance for the places where the identity will live."
    }
  ]
};

export const identityClosing = {
  heading: "Give the work a world to belong to.",
  subline: "Identity begins here — quietly, clearly, and with intention.",
  cta: { label: "Begin an Identity Kit", href: "/contact" }
};
