import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import wordmark from "@/assets/brand/marks/echo-in-ink-wordmark.png";
import { useSectionAwareTheme } from "@/components/navigation/useSectionAwareTheme";
import {
  isNavigationItemActive,
  primaryCallToAction,
  primaryNavigation
} from "@/data/siteNavigation";
import { DURATION } from "@/lib/motion-cinematic";

const mobileMenuId = "site-mobile-navigation";
const mobileMenuTitleId = "site-mobile-navigation-title";
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");

function getReducedMotionPreference() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function Header() {
  const { pathname } = useLocation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotionPreference);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const menuWasOpenRef = useRef(false);
  const { headerRef, theme, family } = useSectionAwareTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return;

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      if (menuWasOpenRef.current) {
        menuWasOpenRef.current = false;
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
      return;
    }

    menuWasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      menuDialogRef.current?.querySelector<HTMLElement>("[data-mobile-nav-first]")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        menuDialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      ).filter((element) => !element.hasAttribute("disabled"));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!menuDialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  if (pathname === "/works/lumo") {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);
  const contactActive = isNavigationItemActive(pathname, primaryCallToAction);
  const menuTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <motion.header
        ref={headerRef}
        data-theme={theme}
        data-header-surface={family}
        data-reduced-motion={prefersReducedMotion ? "true" : undefined}
        initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : DURATION.slower,
          ease: "easeOut",
          delay: prefersReducedMotion ? 0 : 0.3
        }}
        className="fixed left-0 top-0 z-50 w-full px-6 py-4 md:px-10 md:py-7 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 backdrop-blur-[1px] transition-colors duration-500"
          style={{
            background:
              "linear-gradient(to bottom, var(--ei-theme-header) 0%, color-mix(in srgb, var(--ei-theme-header) 54%, transparent) 45%, transparent 100%)"
          }}
        />

        <nav aria-label="Primary navigation" className="relative flex items-center justify-between">
          <Link
            to="/"
            className="ei-focus-rounded group inline-flex min-h-[44px] shrink-0 items-center rounded-sm"
            aria-label="Echo in Ink home"
            onClick={closeMenu}
          >
            <img
              src={wordmark}
              alt=""
              className="h-3.5 w-auto opacity-75 transition-[filter,opacity] duration-500 group-hover:opacity-95 md:h-4"
              style={{ filter: "var(--ei-header-logo-filter)" }}
            />
          </Link>

          <div className="hidden items-center gap-4 md:flex lg:gap-8">
            <div className="flex gap-3 lg:gap-7">
              {primaryNavigation.map((item) => {
                const active = isNavigationItemActive(pathname, item);

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      group relative pb-1.5
                      font-structural text-[0.61rem] font-medium leading-none uppercase tracking-[0.14em] lg:text-[0.70rem] lg:tracking-[0.17em]
                      transition-colors duration-500
                      ${
                        active
                          ? "!text-[var(--ei-header-text)] [text-shadow:0_0_16px_rgb(var(--ei-halo-blue-rgb)/0.24)]"
                          : "!text-[var(--ei-header-text)] opacity-80 hover:!text-[var(--ei-header-text-hover)] hover:opacity-100 focus-visible:!text-[var(--ei-header-text-hover)]"
                      }
                    `}
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none absolute -bottom-0.5 left-0 h-px rounded-full
                        bg-[linear-gradient(90deg,rgb(var(--ei-halo-blue-rgb)/0.95),rgb(var(--ei-echo-magenta-rgb)/0.72))]
                        shadow-[0_0_10px_rgb(var(--ei-halo-blue-rgb)/0.45)]
                        transition-all duration-500 ease-out
                        ${
                          active
                            ? "w-full opacity-100"
                            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-focus-visible:w-full group-focus-visible:opacity-100"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            <Link
              to={primaryCallToAction.href}
              aria-current={contactActive ? "page" : undefined}
              className={`
                ei-focus-rounded rounded-full
                border border-[var(--ei-theme-border)]
                bg-[var(--ei-theme-surface)]
                px-3 py-2
                font-structural text-[0.6rem] font-semibold uppercase tracking-[0.14em] lg:px-3.5 lg:text-[0.68rem] lg:tracking-[0.19em]
                transition-all duration-500
                hover:border-[var(--ei-theme-focus)]
                hover:bg-[var(--ei-theme-surface-elevated)]
                hover:!text-[var(--ei-header-text-hover)]
                hover:shadow-[0_0_24px_rgb(var(--ei-halo-blue-rgb)/0.12)]
                focus-visible:!text-[var(--ei-header-text-hover)]
                ${
                  contactActive
                    ? "border-[var(--ei-theme-focus)] bg-[var(--ei-theme-surface-elevated)] !text-[var(--ei-header-text)] shadow-[0_0_22px_rgb(var(--ei-halo-blue-rgb)/0.12)]"
                    : "!text-[var(--ei-header-text)] opacity-80"
                }
              `}
            >
              {primaryCallToAction.label}
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-controls={mobileMenuId}
            aria-expanded={menuOpen}
            className="
              ei-focus-rounded flex min-h-[44px] min-w-[60px] items-center justify-end rounded-full
              font-structural text-[11px] font-medium uppercase tracking-[0.18em]
              text-[var(--ei-header-text)]
              transition-colors duration-500
              hover:text-[var(--ei-header-text-hover)]
              md:hidden
            "
          >
            Menu
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuDialogRef}
            id={mobileMenuId}
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={mobileMenuTitleId}
            data-theme="deep"
            data-reduced-motion={prefersReducedMotion ? "true" : undefined}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={menuTransition}
            className="
              fixed left-0 right-0 top-0 z-[60]
              max-h-[82dvh] overflow-y-auto
              rounded-b-[28px]
              border-b border-[rgb(var(--ei-ice-white-rgb)/0.1)]
              bg-[rgb(var(--ei-void-rgb)/0.96)]
              shadow-[0_32px_120px_rgb(0_0_0/0.58)]
              backdrop-blur-xl
              md:hidden
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 72% 18%, rgb(var(--ei-violet-rgb) / 0.16) 0%, transparent 62%), radial-gradient(ellipse 60% 42% at 22% 82%, rgb(var(--ei-halo-blue-rgb) / 0.1) 0%, transparent 64%)"
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgb(var(--ei-void-rgb) / 0.74) 0%, rgb(var(--ei-void-rgb) / 0.96) 100%)"
              }}
            />

            <div className="relative z-20 flex items-center justify-between px-6 py-4">
              <Link
                to="/"
                aria-label="Echo in Ink home"
                onClick={closeMenu}
                className="ei-focus-rounded inline-flex min-h-[44px] items-center rounded-sm"
              >
                <img src={wordmark} alt="" className="h-3.5 w-auto opacity-80" />
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="ei-focus-rounded flex min-h-[44px] min-w-[60px] items-center justify-end rounded-full font-structural text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ei-header-text)] transition-colors duration-500 hover:text-[var(--ei-header-text-hover)]"
              >
                Close
              </button>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(8px)" }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative z-10 flex flex-col px-6 pb-8 pt-6"
            >
              <span
                id={mobileMenuTitleId}
                className="mb-6 font-structural text-[10px] uppercase tracking-[0.28em] text-[var(--ei-header-text-muted)]"
              >
                Navigation
              </span>

              <div className="flex flex-col">
                {primaryNavigation.map((item, index) => {
                  const active = isNavigationItemActive(pathname, item);

                  return (
                    <motion.div
                      key={item.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: prefersReducedMotion ? 0 : 0.06 + index * 0.04
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        data-mobile-nav-first={index === 0 ? "true" : undefined}
                        className={`
                          group relative flex min-h-[56px] items-center justify-between
                          border-b border-[rgb(var(--ei-ice-white-rgb)/0.07)]
                          py-4
                          font-editorial text-[1.55rem] leading-none tracking-[-0.03em]
                          transition-colors duration-500
                          ${
                            active
                              ? "text-[var(--ei-header-text-active)]"
                              : "ei-type-color-primary hover:text-[var(--ei-header-text-hover)]"
                          }
                        `}
                      >
                        <span>{item.label}</span>

                        <span
                          aria-hidden="true"
                          className={`
                            font-structural text-[0.65rem] uppercase tracking-[0.2em]
                            transition-all duration-500
                            ${
                              active
                                ? "text-[rgb(var(--ei-halo-blue-rgb)/0.78)]"
                                : "ei-type-color-faint group-hover:translate-x-1 group-hover:text-[var(--ei-color-text-accent)]"
                            }
                          `}
                        >
                          →
                        </span>

                        <span
                          aria-hidden="true"
                          className={`
                            pointer-events-none absolute bottom-[-1px] left-0 h-px
                            bg-[linear-gradient(90deg,rgb(var(--ei-halo-blue-rgb)/0.95),rgb(var(--ei-echo-magenta-rgb)/0.64))]
                            shadow-[0_0_12px_rgb(var(--ei-halo-blue-rgb)/0.38)]
                            transition-all duration-500
                            ${active ? "w-full opacity-100" : "w-0 opacity-0"}
                          `}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-7">
                <Link
                  to={primaryCallToAction.href}
                  onClick={closeMenu}
                  className="
                    ei-focus-rounded inline-flex min-h-[44px] w-full items-center justify-center rounded-full
                    border border-[rgb(var(--ei-halo-blue-rgb)/0.24)]
                    bg-[linear-gradient(to_bottom,rgb(var(--ei-midnight-rgb)/0.64),rgb(var(--ei-void-rgb)/0.9))]
                    px-6 py-3
                    font-structural text-[10px] font-medium uppercase tracking-[0.2em]
                    text-[var(--ei-button-text-primary)]
                    shadow-[inset_0_1px_0_rgb(var(--ei-ice-white-rgb)/0.07),0_0_24px_rgb(var(--ei-halo-blue-rgb)/0.075)]
                    transition-all duration-500
                    hover:border-[rgb(var(--ei-halo-blue-rgb)/0.42)]
                    hover:text-[var(--ei-button-text-primary-hover)]
                  "
                >
                  {primaryCallToAction.label}
                </Link>

                <p className="ei-type-color-muted mt-4 max-w-[32ch] font-[var(--ei-font-copy)] text-[0.72rem] leading-[1.65] tracking-[-0.004em]">
                  Designing worlds that hold meaning, atmosphere, and emotional intelligence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
