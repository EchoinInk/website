export const archiveHero = {
  eyebrow: "Insights",
  title: "Writing, notes, and observations.",
  description:
    "The Archive is Echo in Ink's editorial collection: essays and short studio notes about atmosphere, identity, systems, memory, and the choices that shape digital work.",
} as const;

export const archiveFilters = ["All", "Essays", "Notes"] as const;

export const archiveFeatured = {
  label: "Featured essay",
  category: "Essays",
  format: "Essay",
  title: "Atmosphere is information.",
  emphasis: "information.",
  excerpt:
    "Atmosphere is not decoration. It is the first data your audience receives. Before words, before identity, before logic — there is feeling.",
  action: "Read essay",
  href: "/archive/atmosphere-is-information",
} as const;

export const archiveNotes = [
  {
    id: "identity-is-not-decoration",
    category: "Notes",
    format: "Studio note",
    title: "Identity is not decoration.",
    emphasis: "decoration.",
    excerpt:
      "Your identity should carry the weight of meaning — not just the weight of visual preference.",
    action: "Read note",
    thread: "Identity",
  },
  {
    id: "the-feeling-is-the-product",
    category: "Notes",
    format: "Studio note",
    title: "The feeling is the product.",
    emphasis: "product.",
    excerpt:
      "You are not selling features. You are transmitting a state. Everything else is in service of that.",
    action: "Read note",
    thread: "Atmosphere",
  },
  {
    id: "designing-for-memory",
    category: "Notes",
    format: "Studio note",
    title: "Designing for memory.",
    emphasis: "memory.",
    excerpt:
      "Memory is not about what people see. It’s about what they feel, what lingers, and what repeats.",
    action: "Read note",
    thread: "Memory",
  },
] as const;

export const archiveIndex = [
  {
    title: archiveFeatured.title,
    descriptor: archiveFeatured.excerpt,
    category: archiveFeatured.category,
    format: archiveFeatured.format,
    icon: "synthesisStar",
    href: archiveFeatured.href,
  },
  ...archiveNotes.map((note, index) => ({
    title: note.title,
    descriptor: note.excerpt,
    category: note.category,
    format: note.format,
    icon: (["axiomRing", "innerTide", "memoryComet"] as const)[index],
    href: `/archive/notes#${note.id}`,
  })),
] as const;

export const archivePhilosophy = {
  title: "Each piece is a point in a larger field.",
  description:
    "The Archive is less a publishing timeline than a map of recurring questions around atmosphere, identity, systems, and memory.",
  themes: ["Atmosphere", "Identity", "Systems", "Memory"],
} as const;

export const archiveCta = {
  title: "Read what is here. Follow what connects.",
  description:
    "The Archive holds Echo's current essays and studio notes without pretending to a publication schedule.",
  action: "Visit the Studio",
  href: "/studio",
} as const;

export type ArchiveFilter = (typeof archiveFilters)[number];
export type ArchiveIndexIcon = (typeof archiveIndex)[number]["icon"];
export type ArchiveIndexEntry = (typeof archiveIndex)[number];
