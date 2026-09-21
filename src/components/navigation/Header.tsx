import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { DURATION } from "@/lib/motion-cinematic";
import wordmark from "@/assets/brand/marks/echo-in-ink-wordmark.png";

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Works", href: "/works" },
  { label: "Identity", href: "/identity" },
  { label: "Sessions", href: "/sessions" },
  { label: "Worlds", href: "/worlds" },
  { label: "Archive", href: "/archive" },
];

export function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/works/lumo") {
    return null;
  }

  const closeMenu = () => setMenuOpen(false);
  const isPathActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const contactActive = isPathActive("/contact");

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DURATION.slower,
          ease: "easeOut",
          delay: 0.3,
        }}
        className="fixed left-0 top-0 z-50 w-full px-6 py-4 md:px-10 md:py-7 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 backdrop-blur-[1px]"
          style={{
            background:
              "linear-gradient(to bottom, var(--ei-theme-header) 0%, color-mix(in srgb, var(--ei-theme-header) 54%, transparent) 45%, transparent 100%)",
          }}
        />

        <nav className="relative flex items-center justify-between">
          <Link to="/" className="group shrink-0" onClick={closeMenu}>
            <img
              src={wordmark}
              alt="Echo in Ink"
              className="h-3.5 w-auto opacity-75 transition-opacity duration-500 group-hover:opacity-95 md:h-4"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            <div className="flex gap-6 lg:gap-7">
              {navItems.map((item) => {
                const active = isPathActive(item.href);

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`
                      group relative pb-1.5
                      font-structural text-[0.70rem] font-medium leading-none uppercase tracking-[0.17em]
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
              to="/contact"
              className={`
                ei-focus-rounded rounded-full
                border border-[var(--ei-theme-border)]
                bg-[var(--ei-theme-surface)]
                px-3.5 py-2
                font-structural text-[0.68rem] font-semibold uppercase tracking-[0.19em]
                transition-all duration-700
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
              Start a Conversation
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
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
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed left-0 right-0 top-0 z-40
              max-h-[82vh] overflow-y-auto
              rounded-b-[28px]
              border-b border-[rgb(var(--ei-ice-white-rgb)/0.1)]
              bg-[rgb(var(--ei-void-rgb)/0.96)]
              shadow-[0_32px_120px_rgb(0_0_0/0.58)]
              backdrop-blur-xl
              md:hidden
            "
          >
            {/* Atmosphere */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 72% 18%, rgb(var(--ei-violet-rgb) / 0.16) 0%, transparent 62%), radial-gradient(ellipse 60% 42% at 22% 82%, rgb(var(--ei-halo-blue-rgb) / 0.1) 0%, transparent 64%)",
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgb(var(--ei-void-rgb) / 0.74) 0%, rgb(var(--ei-void-rgb) / 0.96) 100%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col px-6 pb-8 pt-24"
            >
              <span className="mb-6 font-structural text-[10px] uppercase tracking-[0.28em] text-[var(--ei-header-text-muted)]">
                Navigation
              </span>

              <div className="flex flex-col">
                {navItems.map((item, index) => {
                  const active = isPathActive(item.href);

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.06 + index * 0.04,
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className={`
                          group relative flex items-center justify-between
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
                  to="/contact"
                  onClick={closeMenu}
                  className="
                    inline-flex min-h-[44px] w-full items-center justify-center rounded-full
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
                  Start a Conversation
                </Link>

                <p className="ei-type-color-muted mt-4 max-w-[32ch] font-[var(--ei-font-copy)] text-[0.72rem] leading-[1.65] tracking-[-0.004em]">
                  Designing worlds that hold meaning, atmosphere, and emotional
                  intelligence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
