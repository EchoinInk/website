import lumoFeatured from "@/assets/imagery/sections/lumo-featured-bg.webp";
import codexiaHome from "@/assets/projects/codexia-home.png";
import keystoneHome from "@/assets/projects/keystone-home.png";
import { primaryCapabilities, type ServiceCapabilityId } from "@/data/servicesContent";

export type ProjectPresentation = "study" | "fragment";

export const provenanceTaxonomy = [
  {
    id: "independent-product",
    label: "Independent Product",
    description: "A product conceived, designed and developed internally by Echo in Ink.",
    supporting: "Used to explore ideas, test systems and investigate new opportunities."
  },
  {
    id: "internal-project",
    label: "Internal Project",
    description:
      "A studio tool, framework or operational system created to support the practice itself.",
    supporting: "Designed for internal use rather than commercial deployment."
  },
  {
    id: "commercial-project",
    label: "Commercial Project",
    description: "Work undertaken in partnership with a client, organisation or external team.",
    supporting: "Focused on solving real-world business, operational or product challenges."
  },
  {
    id: "exploratory-study",
    label: "Exploratory Study",
    description: "A self-initiated exercise investigating a problem, medium or emerging idea.",
    supporting: "Used to test new directions and develop the studio's thinking."
  }
] as const;

export type ProvenanceTaxonomyLabel = (typeof provenanceTaxonomy)[number]["label"];
export type ProjectProvenance = ProvenanceTaxonomyLabel | "Concept Project";

export type ProjectStatus = "Prototype" | "Exploratory Study";

export interface ProjectClassification {
  provenance: ProjectProvenance;
  status: ProjectStatus;
  evidence: "Prototype evidence" | "Exploratory evidence";
}

export interface WorkProject {
  title: string;
  category: string;
  thesis: string;
  description: string;
  proofLine: string;
  challenge: string;
  scope: string;
  output: string;
  result: string;
  focusAreas: readonly string[];
  image: string;
  href?: string;
  capabilities: readonly ServiceCapabilityId[];
  presentation: ProjectPresentation;
  featured?: boolean;
  classification: ProjectClassification;
}

export const worksProjects: WorkProject[] = [
  {
    title: "LUMO",
    category: "Emotionally supportive companion product concept",
    thesis: "A calmer digital world for overwhelmed humans.",
    description:
      "An exploration into what happens when emotional support, product design and digital experience design are treated as part of the same conversation. Rather than focusing solely on features, the work explores how clarity, atmosphere, interaction and behavioural design combine to create a calmer experience.",
    proofLine:
      "Turning an emotionally supportive product concept into a calmer, more coherent digital world for overwhelmed humans.",
    challenge:
      "Transform a broad product vision into something that felt focused, understandable and emotionally coherent.",
    scope: "Identity system, digital atmosphere, and interface direction.",
    output: "A connected visual language and modular experience system.",
    result:
      "A complete concept direction spanning product thinking, experience design, visual identity and interaction principles.",
    focusAreas: [
      "Product thinking",
      "Experience design",
      "Visual identity",
      "Interaction principles"
    ],
    image: lumoFeatured,
    href: "/works/lumo",
    capabilities: ["brand-identity", "websites-experiences", "digital-products"],
    presentation: "study",
    featured: true,
    classification: {
      provenance: "Independent Product",
      status: "Prototype",
      evidence: "Prototype evidence"
    }
  },
  {
    title: "Keystone",
    category: "Internal Product • Operations System",
    thesis: "A calmer operating model for creative work.",
    description:
      "A studio operations platform exploring how information, workflows and decision-making can be brought together into a more usable system. Built to reduce friction, improve visibility and create stronger connections between planning and execution.",
    proofLine:
      "Exploring a calmer operational workspace for seeing active work, priorities and studio signals together.",
    challenge:
      "Bring several studio-management concerns into one legible workspace without overstating what has been built.",
    scope: "Product concept, interface direction, and operational information architecture.",
    output: "A focused control-centre interface concept for internal studio operations.",
    result: "A coherent operating model and working prototype direction.",
    focusAreas: [
      "System architecture",
      "Workflow design",
      "Operational clarity",
      "Internal product thinking"
    ],
    image: keystoneHome,
    href: "/works/keystone",
    capabilities: ["digital-products", "systems-automation"],
    presentation: "study",
    classification: {
      provenance: "Internal Project",
      status: "Exploratory Study",
      evidence: "Exploratory evidence"
    }
  },
  {
    title: "Codexia",
    category: "Independent Product • Creative Platform",
    thesis: "A governed engineering system for authority and progression.",
    description:
      "A concept platform exploring the intersection of creativity, structured workflows and AI-assisted creation. Designed as an environment where strategy, design systems, content and experimentation can coexist within a connected ecosystem.",
    proofLine:
      "Giving complex engineering workflows a clearer operational surface while keeping authority and evidence visible.",
    challenge:
      "Make a governed engineering workflow understandable without implying unsupported product readiness.",
    scope: "Product architecture, interface system, and engineering workflow design.",
    output:
      "A working prototype direction and a visual control surface for governed engineering work.",
    result: "An established product model, interface direction and working prototype evidence.",
    focusAreas: [
      "User experience design",
      "Product systems",
      "Creative workflows",
      "AI-assisted processes"
    ],
    image: codexiaHome,
    href: "/works/codexia",
    capabilities: ["digital-products", "systems-automation"],
    presentation: "study",
    classification: {
      provenance: "Independent Product",
      status: "Prototype",
      evidence: "Prototype evidence"
    }
  }
];

export const lumoProject = worksProjects[0];
export const homeFeaturedProjects = worksProjects.filter((project) =>
  ["Keystone", "Codexia"].includes(project.title)
);

export function getWorkProject(title: string) {
  return worksProjects.find((project) => project.title === title);
}

export function getAdjacentWorkProjects(title: string) {
  const index = worksProjects.findIndex((project) => project.title === title);

  if (index === -1) return undefined;

  return {
    previous: worksProjects[(index - 1 + worksProjects.length) % worksProjects.length],
    next: worksProjects[(index + 1) % worksProjects.length]
  };
}

export function getCapabilityLabels(capabilities: readonly ServiceCapabilityId[]) {
  return primaryCapabilities
    .filter((capability) => capabilities.includes(capability.id))
    .map((capability) => capability.title);
}

export const workFilters = ["All Work", "Products & Apps", "Systems & Automation"] as const;

export type WorkFilter = (typeof workFilters)[number];
