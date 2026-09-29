import lumoFeatured from "@/assets/imagery/sections/lumo-featured-bg.webp";
import codexiaHome from "@/assets/projects/codexia-home.png";
import keystoneHome from "@/assets/projects/keystone-home.png";
import { primaryCapabilities, type ServiceCapabilityId } from "@/data/servicesContent";

export type ProjectPresentation = "study" | "fragment";

export type ProjectProvenance = "Independent Product" | "Concept Project" | "Internal Project";

export type ProjectStatus = "Prototype" | "Exploratory Study";

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
    title: "LUMO",
    category: "Emotionally supportive companion app concept",
    description:
      "An emotionally supportive companion app concept shaped around gentle planning, reduced cognitive load, and emotionally safe interaction.",
    proofLine:
      "Turning an emotionally supportive product concept into a calmer, more coherent digital world for overwhelmed humans.",
    challenge: "Translate emotional safety into a clear, credible product world.",
    scope: "Identity system, digital atmosphere, and interface direction.",
    output: "A connected visual language and modular experience system.",
    result: "A calmer, more recognisable expression of Lumo across its core touchpoints.",
    image: lumoFeatured,
    href: "/works/lumo",
    capabilities: ["brand-identity", "websites-experiences", "digital-products"],
    presentation: "study",
    featured: true,
    classification: {
      provenance: "Independent Product",
      status: "Prototype"
    }
  },
  {
    title: "Keystone",
    category: "Studio operations platform concept",
    description:
      "An internal product concept exploring how projects, tasks, content and studio operations could live in one coherent control centre.",
    proofLine:
      "Exploring a calmer operational workspace for seeing active work, priorities and studio signals together.",
    challenge:
      "Bring several studio-management concerns into one legible workspace without overstating what has been built.",
    scope: "Product concept, interface direction, and operational information architecture.",
    output: "A focused control-centre interface concept for internal studio operations.",
    result: "An exploratory visual direction; no launched platform or measured outcome is claimed.",
    image: keystoneHome,
    href: "/works/keystone",
    capabilities: ["digital-products", "systems-automation"],
    presentation: "study",
    classification: {
      provenance: "Internal Project",
      status: "Exploratory Study"
    }
  },
  {
    title: "Codexia",
    category: "Governed engineering platform prototype",
    description:
      "An independently developed engineering-platform prototype exploring governed planning, execution, validation and reporting for software work.",
    proofLine:
      "Giving complex engineering workflows a clearer operational surface while keeping authority and evidence visible.",
    challenge:
      "Make a governed engineering workflow understandable without implying unsupported product readiness.",
    scope: "Product architecture, interface system, and engineering workflow design.",
    output:
      "A working prototype direction and a visual control surface for governed engineering work.",
    result:
      "Prototype evidence only; no public launch, customer adoption or external validation is claimed.",
    image: codexiaHome,
    href: "/works/codexia",
    capabilities: ["digital-products", "systems-automation"],
    presentation: "study",
    classification: {
      provenance: "Independent Product",
      status: "Prototype"
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

export function getCapabilityLabels(capabilities: readonly ServiceCapabilityId[]) {
  return primaryCapabilities
    .filter((capability) => capabilities.includes(capability.id))
    .map((capability) => capability.title);
}

export const workFilters = ["All Work", "Products & Apps", "Systems & Automation"] as const;

export type WorkFilter = (typeof workFilters)[number];
