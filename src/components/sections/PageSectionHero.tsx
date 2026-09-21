import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { PageOfferAnchor } from "@/components/sections/PageOfferAnchor";
import { Button } from "@/components/ui/Button";
import {
  driftUp,
  fadeSoft,
  staggerContainer,
  STAGGER,
  VIEWPORT,
} from "@/lib/motion-cinematic";

interface PageSectionHeroProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description: string;
  offerAnchor?: ReactNode;
  ctaLabel?: ReactNode;
  ctaHref?: string;
  ctaVariant?: "primary" | "secondary" | "tertiary";
  secondaryCtaLabel?: ReactNode;
  secondaryCtaHref?: string;
  image: string;
  mobileImage: string;
  imageAlt: string;
  align?: "left" | "center";
}

export function PageSectionHero({
  eyebrow,
  title,
  italicWord,
  description,
  offerAnchor,
  ctaLabel,
  ctaHref,
  ctaVariant = "primary",
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
  mobileImage,
  imageAlt,
  align = "left",
}: PageSectionHeroProps) {
  const titleParts = italicWord
    ? title.split(new RegExp(`(${italicWord})`, "i"))
    : [title];

  const isLeft = align === "left";

  return (
    <motion.section
      variants={staggerContainer(STAGGER.cinematic, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.loose}
      className=" ei-page-section-hero
  relative flex min-h-[620px] w-full items-start overflow-hidden
  bg-[var(--ei-color-background-canvas)]
  md:min-h-[720px] lg:min-h-[760px]
"
      aria-labelledby="editorial-hero-heading"
    >
      <picture
        className="ei-page-section-hero-media absolute inset-0 z-0 block"
        aria-hidden="true"
      >
        <source media="(min-width: 768px)" srcSet={image} />
        <img
          src={mobileImage}
          alt=""
          className="ei-page-section-hero-image h-full w-full object-cover object-center saturate-[0.86] md:object-[72%_50%]"
        />
      </picture>

      <div
        aria-hidden="true"
        className="ei-page-section-hero-scrim pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "var(--ei-theme-image-scrim)",
        }}
      />

      <div
        aria-hidden="true"
        className="ei-page-section-hero-side-scrim pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: isLeft
            ? "linear-gradient(90deg, transparent 0%, transparent 44%, rgb(var(--ei-ink-rgb) / 0.16) 100%)"
            : "linear-gradient(90deg, rgb(var(--ei-ink-rgb) / 0.16) 0%, transparent 56%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="ei-page-section-hero-copy-scrim pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: isLeft
            ? "radial-gradient(ellipse 52% 64% at 16% 46%, rgb(var(--ei-ink-rgb) / 0.78) 0%, rgb(var(--ei-ink-rgb) / 0.48) 42%, transparent 74%), linear-gradient(90deg, rgb(var(--ei-ink-rgb) / 0.52) 0%, transparent 58%)"
            : "radial-gradient(ellipse 52% 64% at 84% 46%, rgb(var(--ei-ink-rgb) / 0.78) 0%, rgb(var(--ei-ink-rgb) / 0.48) 42%, transparent 74%), linear-gradient(270deg, rgb(var(--ei-ink-rgb) / 0.52) 0%, transparent 58%)",
        }}
      />

      <div
        aria-hidden="true"
        className="ei-page-section-hero-bottom-fade pointer-events-none absolute right-0 bottom-0 left-0 z-[5] h-[24vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgb(var(--ei-ink-rgb) / 0.42) 70%, var(--ei-ink) 100%)",
        }}
      />

      <Container
        size="xl"
  className="ei-page-section-hero-container relative z-10 w-full"
>
        <div
          className={`ei-page-section-hero-copy-wrap max-w-[680px] ${
            isLeft ? "" : "mx-auto text-center"
          }`}
        >
          <motion.div
  variants={driftUp}
  className={`
  ei-page-section-hero-copy
  pt-36 md:pt-[135px] lg:pt-[160px]
  ${isLeft ? "text-left md:pl-10 lg:pl-14" : "text-center"}
`}
>
  <div className="ei-monogram-frame max-w-[640px] md:max-w-[620px] lg:max-w-[680px]">
            <div
              className={`
                ei-page-section-hero-eyebrow-row
                mb-4 flex items-center gap-4 md:mb-5
                ${isLeft ? "" : "justify-center"}
              `}
            >
<span className="ei-type-hero-eyebrow text-[var(--ei-color-text-secondary)]">
  {eyebrow}
</span>              <div
                className="h-px w-10 shrink-0 rounded-full shadow-[0_0_14px_rgb(var(--ei-halo-blue-rgb)/0.5)]"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(var(--ei-midnight-rgb) / 0.15) 0%, rgb(var(--ei-halo-blue-rgb) / 0.98) 100%)",
                }}
                aria-hidden="true"
              />
            </div>

            <h1
              id="editorial-hero-heading"
              className="ei-type-hero-home ei-page-section-hero-title max-w-[24ch] whitespace-pre-line"
              style={{
                textShadow:
                  "0 2px 28px rgb(0 0 0 / 0.4), 0 0 48px rgb(var(--ei-violet-rgb) / 0.08)",
              }}
            >
              {italicWord
                ? titleParts.map((part, i) =>
                    part.toLowerCase() === italicWord.toLowerCase() ? (
                      <em key={i} className="ei-type-hero-emphasis">
                        {part}
                      </em>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )
                : title}
            </h1>

            <p className="ei-type-hero-description ei-page-section-hero-description mt-5 max-w-[46ch] md:mt-6">
              {description}
            </p>

            {offerAnchor ? (
              <PageOfferAnchor align={align} className="mt-6 md:mt-7">
                {offerAnchor}
              </PageOfferAnchor>
            ) : null}

            {(ctaLabel && ctaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
              <motion.div
                variants={fadeSoft}
                className={`ei-page-section-hero-actions mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-10 md:gap-4 ${
                  isLeft ? "" : "justify-center"
                }`}
              >
                {ctaLabel && ctaHref ? (
                 <Button
  to={ctaHref}
  variant={ctaVariant}
  className="ei-page-section-hero-button ei-page-section-hero-button-primary self-stretch sm:self-start"
>
  {ctaLabel}
</Button>
                ) : null}

                {secondaryCtaLabel && secondaryCtaHref ? (
                  <Button
  to={secondaryCtaHref}
  variant="secondary"
  className="ei-page-section-hero-button ei-page-section-hero-button-secondary self-stretch sm:self-start"
>
  {secondaryCtaLabel}
<span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
  →
</span></Button>
                ) : null}
                
              </motion.div>
            ) : null}</div>
          </motion.div>
        </div>
      </Container>

      <span className="sr-only">{imageAlt}</span>
    </motion.section>
  );
}
