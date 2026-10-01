import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

import { OrbitalVisual } from "@/components/ui/OrbitalVisual";
import { primaryNavigation, secondaryNavigation } from "@/data/siteNavigation";
import { atmosphericFade, EASE_LUXURY, DURATION, VIEWPORT } from "@/system/motion/cinematic";

interface FooterProps {
  theme?: "light" | "deep";
  variant?: "full" | "compact" | "home";
}

export default function Footer({ theme = "light", variant = "full" }: FooterProps) {
  const isCompact = variant === "compact";
  const isHome = variant === "home";
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      data-theme={theme}
      data-variant={variant}
      className="ei-footer relative overflow-hidden bg-[var(--ei-color-background-canvas)] pb-0 text-[var(--ei-color-text-primary)]"
    >
      {/* Top boundary */}
      <div
        aria-hidden="true"
        className="ei-footer-top-boundary pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--ei-theme-border) 30%, var(--ei-theme-border) 70%, transparent 100%)"
        }}
      />

      {/* Atmospheric depth */}
      <div
        aria-hidden="true"
        className="ei-footer-atmosphere pointer-events-none absolute left-1/2 top-0 h-[50%] w-[50%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, color-mix(in srgb, var(--ei-theme-link) 7%, transparent) 0%, transparent 70%)",
          filter: "blur(80px)"
        }}
      />

      <div className="relative z-10 ei-container max-w-[1220px]">
        {isCompact ? (
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT.normal}
            variants={atmosphericFade}
            transition={{
              duration: DURATION.slow,
              ease: EASE_LUXURY,
              delay: 0.08
            }}
            className="grid gap-7 py-7 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:py-8"
          >
            <div>
              <span className="ei-type-footer-brand mb-2 block font-structural text-[length:var(--ei-type-size-functional)] uppercase tracking-[0.18em]">
                Echo in Ink
              </span>
              <p className="ei-type-footer-copy max-w-[48ch] font-structural text-[length:var(--ei-type-size-functional)] leading-[1.7]">
                Thoughtful strategy, intentional design, and purposeful development — shaping brands, digital experiences, products, and systems that feel as good as they function.
              </p>
            </div>

            <nav aria-label="Footer recovery navigation">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <li>
                  <Link
                    to="/"
                    className="ei-type-footer-link inline-flex min-h-11 items-center font-structural text-[length:var(--ei-type-size-functional)] transition-colors duration-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/works"
                    className="ei-type-footer-link inline-flex min-h-11 items-center font-structural text-[length:var(--ei-type-size-functional)] transition-colors duration-400"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="ei-type-footer-link inline-flex min-h-11 items-center font-structural text-[length:var(--ei-type-size-functional)] transition-colors duration-400"
                  >
                    Project enquiries
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="border-t border-[var(--ei-theme-border)] pt-4 md:col-span-2 md:flex md:items-center md:justify-between">
              <span className="ei-type-footer-meta block font-structural text-[length:var(--ei-type-size-meta)] tracking-[0.1em]">
                © {new Date().getFullYear()} Echo in Ink
              </span>
              <a
                href="mailto:hello@echoin.ink"
                className="ei-type-footer-meta mt-2 inline-flex min-h-11 items-center font-structural text-[length:var(--ei-type-size-meta)] tracking-[0.08em] md:mt-0"
              >
                hello@echoin.ink
              </a>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={VIEWPORT.normal}
              variants={atmosphericFade}
              transition={{
                duration: DURATION.slow,
                ease: EASE_LUXURY,
                delay: 0.1
              }}
              className="pt-8 pb-0 md:pt-8"
            >
              <div className="ei-footer-primary-grid grid grid-cols-2 items-start gap-8 md:grid-cols-[1.05fr_0.95fr_0.85fr_1.1fr] md:gap-8 lg:gap-10">
                {/* Col 1 — Brand */}
                <div className="ei-footer-brand-column order-1 col-span-2 md:order-1 md:col-span-1">
                  <span className="ei-type-footer-brand block font-structural text-[length:var(--ei-type-size-functional)] uppercase tracking-[0.18em]">
                    Echo in Ink
                  </span>

                  <p className="ei-type-footer-copy max-w-[31ch] font-structural text-[length:var(--ei-type-size-functional)] leading-[1.7]">
                    Strategy, design, and development brought together for brands, digital
                    experiences, products, and systems.
                  </p>
                </div>

                {/* Col 2 — Navigation */}
                <nav className="ei-footer-navigation-column order-3 md:order-2" aria-label="Footer primary navigation">
                  <span className="ei-type-footer-label block font-mono text-[length:var(--ei-type-size-label)] uppercase tracking-[0.22em]">
                    Navigation
                  </span>

                  <ul className="ei-footer-primary-links grid grid-cols-2">
                    {primaryNavigation.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="ei-type-footer-link inline-flex min-h-0 items-center font-structural transition-colors duration-400"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Col 3 — Connect */}
                <div className="ei-footer-connect-column order-2 md:order-3">
                  <span className="ei-type-footer-label block font-mono text-[length:var(--ei-type-size-label)] uppercase tracking-[0.22em]">
                    Connect
                  </span>

                  <a
                    href="mailto:hello@echoin.ink"
                    className="ei-type-footer-link inline-flex min-h-0 items-center font-structural transition-colors duration-400"
                  >
                    hello@echoin.ink
                  </a>

                  <span className="ei-type-footer-copy block font-structural text-[length:var(--ei-type-size-functional)]">
                    Auckland, New Zealand
                  </span>

              
                </div>

                {/* Col 4 — Creative resources */}
                <div className="ei-footer-systems-column relative order-4 md:order-4">
                  <span className="ei-type-footer-label ei-footer-systems-heading block font-mono text-[length:var(--ei-type-size-label)] font-bold uppercase tracking-[0.22em]">
                    Creative Systems &amp; Tools
                  </span>

                  <div className="ei-footer-systems-row grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                    <p className="ei-type-footer-copy mb-0 max-w-[22.8ch] font-structural text-[length:var(--ei-type-size-functional)] leading-[1.7]">
                      Creative systems, frameworks, and practical tools designed to bring clarity, direction, and confidence to creative decisions.
                    </p>

                    <div className="hidden shrink-0 opacity-70 md:block">
                      <OrbitalVisual variant="chorusCore" size={44} />
                    </div>
                  </div>

                  {isHome ? null : (
                    <Link
                      to="/systems"
                      className="ei-type-footer-link group inline-flex min-h-11 max-w-[34ch] items-center gap-2 font-mono text-[length:var(--ei-type-size-functional)] uppercase tracking-[0.14em] transition-colors duration-400"
                    >
                      <span>Explore frameworks and experiments</span>
                      <span className="shrink-0 transition-transform duration-400 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>

            {isHome ? null : (
              <motion.nav
                aria-label="Explore deeper"
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={VIEWPORT.normal}
                variants={atmosphericFade}
                transition={{
                  duration: DURATION.slower,
                  ease: EASE_LUXURY,
                  delay: 0.16
                }}
                className="border-t border-[var(--ei-theme-border)] py-5"
              >
                <span className="ei-type-footer-label mb-3 block font-mono text-[length:var(--ei-type-size-label)] uppercase tracking-[0.22em]">
                  Explore deeper
                </span>

                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {secondaryNavigation.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="ei-type-footer-meta inline-flex min-h-11 items-center font-structural text-[length:var(--ei-type-size-meta)] tracking-[0.06em] opacity-75 transition-[color,opacity] duration-400 hover:opacity-100 focus-visible:opacity-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}

            {/* Bottom row */}
            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={VIEWPORT.normal}
              variants={atmosphericFade}
              transition={{
                duration: DURATION.slower,
                ease: EASE_LUXURY,
                delay: 0.2
              }}
              className="pt-4 pb-4"
            >
              <div
                aria-hidden="true"
                className="mb-5 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--ei-theme-border) 25%, var(--ei-theme-border) 75%, transparent 100%)"
                }}
              />

              <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                <span className="ei-type-footer-meta font-structural text-[length:var(--ei-type-size-meta)] tracking-[0.1em]">
                  © {new Date().getFullYear()} Echo in Ink
                </span>

                <span className="ei-type-footer-meta font-structural text-[length:var(--ei-type-size-meta)] uppercase tracking-[0.12em]">
                  Strategy · Design · Development
                </span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </footer>
  );
}
