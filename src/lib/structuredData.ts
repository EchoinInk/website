import type { WorkProject } from "@/data/worksProjects";

export type StructuredData = Record<string, unknown>;

const SITE_URL = "https://echoin.ink";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

export const homepageStructuredData: StructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORGANIZATION_ID,
      name: "Echo in Ink",
      url: `${SITE_URL}/`,
      email: "hello@echoin.ink",
      description:
        "A founder-led creative technology studio bringing strategy, design and development together for brands, websites, digital products and systems.",
      areaServed: [
        { "@type": "City", name: "Auckland" },
        { "@type": "Country", name: "New Zealand" },
      ],
      founder: { "@id": FOUNDER_ID },
      sameAs: ["https://github.com/EchoinInk"],
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Alexandria Farley",
      jobTitle: "Founder",
      worksFor: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Echo in Ink",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en-NZ",
    },
  ],
};

export function createProjectStructuredData(
  project: WorkProject,
  pathname: string,
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}${pathname}#project`,
    url: `${SITE_URL}${pathname}`,
    name: project.title,
    description: project.description,
    abstract: project.proofLine,
    creator: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-NZ",
    genre: project.category,
    keywords: project.capabilities.join(", "),
  };
}
