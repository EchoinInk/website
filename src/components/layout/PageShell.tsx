import { useLayoutEffect, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
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
  canonicalPath?: string | false;
  robots?: string;
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
  canonicalPath,
  robots = 'index,follow',
  atmosphere = 'default',
  theme = 'light',
  className = '',
  id = 'main-content',
  withFooter = true,
  withTopSpacing = true,
}: PageShellProps) {
  const { pathname } = useLocation();
  const resolvedCanonicalPath = canonicalPath === undefined ? pathname : canonicalPath;
  const canonicalUrl =
    resolvedCanonicalPath === false
      ? null
      : `https://echoin.ink${resolvedCanonicalPath === '/' ? '/' : resolvedCanonicalPath.replace(/\/$/, '')}`;
  const socialImageUrl = 'https://echoin.ink/home-hero-desktop.webp';
  const themeColor = theme === 'deep' || theme === 'atmospheric' ? '#080718' : '#f3f0f7';

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
          <meta name="robots" content={robots} />
          <meta name="theme-color" content={themeColor} />
          <meta name="color-scheme" content="light dark" />
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          {description && <meta property="og:description" content={description} />}
          {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
          <meta property="og:image" content={socialImageUrl} />
          <meta property="og:image:alt" content="Echo in Ink atmospheric studio artwork" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          {description && <meta name="twitter:description" content={description} />}
          <meta name="twitter:image" content={socialImageUrl} />
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
