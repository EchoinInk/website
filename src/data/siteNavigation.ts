export interface SiteNavigationItem {
  label: string;
  href: string;
  activePaths?: readonly string[];
}

export const primaryNavigation = [
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/works" },
  { label: "Services", href: "/services" },
  {
    label: "Insights",
    href: "/insights",
    activePaths: ["/insights", "/archive"]
  },
  { label: "Contact", href: "/contact" }
] as const satisfies readonly SiteNavigationItem[];

export const primaryCallToAction = {
  label: "Start a Project",
  href: "/contact"
} as const satisfies SiteNavigationItem;

export const secondaryNavigation = [
  { label: "Brand & Identity", href: "/identity" },
  { label: "Strategy Sessions", href: "/sessions" },
  { label: "Brand Worlds & Creative Direction", href: "/worlds" },
  { label: "Creative Systems & Tools", href: "/systems" },
  { label: "Lumo", href: "/works/lumo" }
] as const satisfies readonly SiteNavigationItem[];

export function isNavigationItemActive(pathname: string, item: SiteNavigationItem) {
  const paths = item.activePaths ?? [item.href];

  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
