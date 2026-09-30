interface PageJumpLink {
  href: `#${string}`;
  label: string;
}

interface PageJumpLinksProps {
  label: string;
  links: readonly PageJumpLink[];
}

export function PageJumpLinks({ label, links }: PageJumpLinksProps) {
  return (
    <nav className="ei-page-jump-links" aria-label={label}>
      <span>{label}</span>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
