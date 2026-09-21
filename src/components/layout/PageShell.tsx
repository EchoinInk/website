import { useLayoutEffect, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/navigation/Footer';

export type PageAtmosphere =
  | 'default'
  | 'identity'
  | 'sessions'
  | 'worlds'
  | 'works'
  | 'studio';

export type SemanticTheme = 'light' | 'lightElevated' | 'mist' | 'atmospheric' | 'deep';

interface PageShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  atmosphere?: PageAtmosphere;
  theme?: SemanticTheme;
  className?: string;
  id?: string;
  withFooter?: boolean;
  withTopSpacing?: boolean;
}

const atmosphereClasses: Record<PageAtmosphere, string> = {
  default: 'ei-atmosphere-default',
  identity: 'ei-atmosphere-identity',
  sessions: 'ei-atmosphere-sessions',
  worlds: 'ei-atmosphere-worlds',
  works: 'ei-atmosphere-works',
  studio: 'ei-atmosphere-default',
};

/**
 * PageShell — Universal page shell providing:
 * - Shared atmospheric background
 * - Consistent top spacing (header offset)
 * - Cinematic page transitions
 * - Universal content rhythm
 * - Footer integration
 * - Ambient lighting continuity
 *
 * All major pages should adopt this shell.
 */
export function PageShell({
  children,
  title,
  description,
  atmosphere = 'default',
  theme = 'light',
  className = '',
  id = 'main-content',
  withFooter = true,
  withTopSpacing = true,
}: PageShellProps) {
  useLayoutEffect(() => {
    document.documentElement.dataset.pageTheme = theme;
    return () => delete document.documentElement.dataset.pageTheme;
  }, [theme]);

  return (
    <main
      id={id}
      data-theme={theme}
      className={`
        ei-page-shell ei-theme-${theme}
        relative
        ${atmosphereClasses[atmosphere]}
        ${withTopSpacing ? 'pt-24 md:pt-32' : ''}
        ${className}
      `.trim()}
    >
      {title && (
        <Helmet>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
        </Helmet>
      )}

      {/* Page-level ambient glow */}
      <div className="ei-glow-page" />

      {/* Edge vignette for depth */}
      <div className="ei-vignette-edges absolute inset-0" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Footer */}
      {withFooter && <Footer />}
    </main>
  );
}

export default PageShell;
