import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import heroDesktop from "@/assets/imagery/hero/lumo-page-hero-desktop.webp";
import atmosphereDesktop from "@/assets/imagery/hero/lumo-hero-light-horizon-desktop.webp";
import monogram from "@/assets/brand/monogram/monogram-balanced.png";
import celebrationCloud from "@/assets/projects/lumo/lumo-clouds/lumo-celebrationcloud.png";
import connectedCloud from "@/assets/projects/lumo/lumo-clouds/lumo-connectedcloud.png";
import focusCloud from "@/assets/projects/lumo/lumo-clouds/lumo-focuscloud.png";
import gentleReminderCloud from "@/assets/projects/lumo/lumo-clouds/lumo-gentleremindercloud.png";
import growingCloud from "@/assets/projects/lumo/lumo-clouds/lumo-growingcloud.png";
import overwhelmedCloud from "@/assets/projects/lumo/lumo-clouds/lumo-overwhelmedcloud.png";
import puzzleCloud from "@/assets/projects/lumo/lumo-clouds/lumo-puzzle.png";
import restingCloud from "@/assets/projects/lumo/lumo-clouds/lumo-restingcloud.png";
import smilingCloud from "@/assets/projects/lumo/lumo-clouds/lumo-smilingcloud.png";
import thinkingCloud from "@/assets/projects/lumo/lumo-clouds/lumo-thinkingcloud.png";
import thumbsUpCloud from "@/assets/projects/lumo/lumo-clouds/lumo-thumbsupcloud.png";
import youTriedCloud from "@/assets/projects/lumo/lumo-clouds/lumo-youtriedcloud.png";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { ProjectContext } from "@/components/works/ProjectContext";
import { lumoProject } from "@/data/worksProjects";
import { blurEmergence, driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const railItems = [
  { id: "hero", index: "01", label: "Hero" },
  { id: "introduction", index: "02", label: "Introduction" },
  { id: "overview", index: "03", label: "Overview" },
  { id: "system", index: "04", label: "Challenge / Outcome" },
  { id: "minds", index: "05", label: "Designing for Neurodivergent Minds" },
  { id: "character-system", index: "06", label: "Character System" },
  { id: "product-screens", index: "07", label: "Product Screens" },
  { id: "identity-system", index: "08", label: "Identity System" },
  { id: "ecosystem", index: "09", label: "Ecosystem" },
  { id: "experience-principle", index: "10", label: "Experience Principle" },
  { id: "final-outcome", index: "11", label: "Concept Direction" },
];

const overviewScreens = ["Start", "Dashboard", "Tasks", "Calendar", "Habits", "Budget", "Wellness"];

const storyRows = [
  {
    label: "Challenge",
    body: "Traditional productivity apps often feel overwhelming, rigid, and shame-inducing for neurodivergent users.",
    image: puzzleCloud,
    alt: "Lumo puzzle mascot symbol",
  },
  {
    label: "Design intent",
    body: "Lumo is shaped as a calming, flexible, and encouraging product concept that builds habits and momentum gently.",
    image: gentleReminderCloud,
    alt: "Lumo gentle reminder cloud",
  },
  {
    label: "System",
    body: "A cohesive design system with a friendly character, soft visual language, and accessible, customizable UI.",
    image: growingCloud,
    alt: "Lumo growing cloud",
  },
];

const principles = [
  {
    title: "Reduce Overwhelm",
    body: "Clear hierarchy, simple flows, and fewer competing demands.",
    image: overwhelmedCloud,
    alt: "Lumo overwhelmed cloud being supported",
  },
  {
    title: "Gentle Reminders",
    body: "Helpful nudges that empower, not pressure.",
    image: gentleReminderCloud,
    alt: "Lumo reminder cloud with a note",
  },
  {
    title: "Celebrate Progress",
    body: "Small wins matter. Visual feedback builds confidence.",
    image: celebrationCloud,
    alt: "Lumo cloud celebrating progress",
  },
  {
    title: "Flexible & Personal",
    body: "Customizable routines and UI choices for changing needs.",
    image: growingCloud,
    alt: "Lumo cloud with a sprout",
  },
];

const characterSystem = [
  { name: "Happy", image: smilingCloud, alt: "Happy Lumo cloud" },
  { name: "Supportive", image: connectedCloud, alt: "Supportive Lumo cloud" },
  { name: "Focused", image: focusCloud, alt: "Focused Lumo cloud" },
  { name: "Reminding", image: gentleReminderCloud, alt: "Reminder Lumo cloud" },
  { name: "Growing", image: growingCloud, alt: "Growing Lumo cloud" },
  { name: "Curious", image: thinkingCloud, alt: "Curious thinking Lumo cloud" },
];

const productScreens = [
  { title: "Dashboard", tone: "dashboard", details: ["Tasks 18", "Habits 7", "Budget $420"] },
  { title: "Task List", tone: "tasks", details: ["Take meds", "Deep work", "Tidy up"] },
  { title: "Habit Log", tone: "habits", details: ["Water", "Meals", "Movement"] },
  { title: "Weekly Planner", tone: "planner", details: ["May", "Focus block", "Laundry"] },
  { title: "Meal Planning", tone: "meals", details: ["Breakfast", "Lunch", "Dinner"] },
  { title: "Budget Tracker", tone: "budget", details: ["Groceries", "Rent", "General"] },
];

const swatches = [
  { name: "Lumo Violet", value: "#6d5dfc" },
  { name: "Halo Blue", value: "var(--ei-halo-blue)" },
  { name: "Echo Magenta", value: "var(--ei-echo-magenta)" },
  { name: "Warm Gold", value: "#ffb45c" },
  { name: "Soft Mint", value: "#63d5b4" },
  { name: "Deep Ink", value: "var(--ei-ink)" },
  { name: "Moonlit", value: "var(--ei-moonlit)" },
  { name: "Ice White", value: "var(--ei-ice-white)" },
];

const outcomes = [
  "Calmer Planning",
  "Flexible Routines",
  "Supportive Nudges",
  "Designed for Real Life",
  "Built for Neurodivergent Minds",
];

const lumoEvidence = [
  {
    title: "Product challenge",
    body: "Make planning feel less rigid, less punitive, and easier to return to after overwhelm.",
  },
  {
    title: "Design intent",
    body: "Use softness, hierarchy, and a companion character system to make the next step feel approachable.",
  },
  {
    title: "Accessibility considerations",
    body: "Reduce cognitive load through simple flows, legible interface rhythm, gentle reminders, and flexible routines.",
  },
  {
    title: "Concept boundary",
    body: "This page does not claim a launched product, clinical validation, user research, or accessibility testing.",
  },
] as const;

function useActiveSection() {
  const [activeId, setActiveId] = useState(railItems[0].id);

  useEffect(() => {
    const sections = railItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.12, 0.24, 0.42] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer(STAGGER.normal, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.normal}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LumoRail({ activeId }: { activeId: string }) {
  return (
    <aside className="ei-lumo-rail" aria-label="Lumo case study navigation">
      <Link to="/" className="ei-lumo-rail-brand" aria-label="Echo in Ink home">
        <img src={monogram} alt="" aria-hidden="true" />
        <span>echo in ink</span>
      </Link>
      <div className="ei-lumo-rail-project">
        <span>Selected Work</span>
        <a href="#hero" aria-current={activeId === "hero" ? "page" : undefined}>
          <i aria-hidden="true">✦</i>
          Lumo
        </a>
      </div>
      <nav>
        {railItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? "is-active" : undefined}
            aria-current={activeId === item.id ? "true" : undefined}
          >
            <span>{item.index}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="ei-lumo-rail-footer">
        <a href="#product-screens">View Project ↗</a>
        <small>© 2024 Echo in Ink<br />All rights reserved.</small>
        <span aria-hidden="true">✦</span>
      </div>
    </aside>
  );
}

function LumoMobileNav({ activeId }: { activeId: string }) {
  const current = railItems.find((item) => item.id === activeId) ?? railItems[0];

  return (
    <div className="ei-lumo-mobile-nav">
      <Link to="/" className="ei-lumo-mobile-brand" aria-label="Echo in Ink home">
        <img src={monogram} alt="" aria-hidden="true" />
        <span>Lumo selected work</span>
      </Link>
      <details>
        <summary>
          <span>{current.index}</span>
          {current.label}
        </summary>
        <nav aria-label="Lumo case study sections">
          {railItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span>{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </details>
    </div>
  );
}

function SectionKicker({ index, label }: { index?: string; label: string }) {
  return (
    <p className="ei-lumo-section-kicker">
      {index ? <span>{index}</span> : null}
      {label}
    </p>
  );
}

function LumoPanel({
  id,
  index,
  label,
  children,
  className = "",
}: {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`ei-lumo-panel ${className}`} aria-labelledby={`${id}-heading`}>
      <Reveal>
        <SectionKicker index={index} label={label} />
        {children}
      </Reveal>
    </section>
  );
}

function LumoHeroPanel() {
  return (
    <section id="hero" className="ei-lumo-dashboard-hero" aria-labelledby="lumo-hero-heading">
      <div className="ei-lumo-stars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <Reveal className="ei-lumo-hero-grid">
        <motion.div variants={driftUp} className="ei-lumo-hero-copy">
          <Link to="/" className="ei-lumo-hero-brand" aria-label="Echo in Ink home">
            <img src={monogram} alt="" aria-hidden="true" />
            <span>echo in ink</span>
          </Link>
          <SectionKicker index="" label="Selected Work" />
          <h1 id="lumo-hero-heading">Lumo</h1>
          <h2>A world built for overwhelmed humans.</h2>
          <p>
            Lumo is an ADHD life-planner concept that turns emotionally supportive planning into
            a calm, clear, and intelligent product world.
          </p>
          <ProjectContext
            classification={lumoProject.classification}
            capabilities={lumoProject.capabilities}
            scope={lumoProject.scope}
            className="ei-lumo-hero-context"
          />
        </motion.div>
        <motion.figure variants={blurEmergence} className="ei-lumo-hero-art">
          <img
            src={heroDesktop}
            alt="Lumo product world with mobile screens, purple cloud mascot, stars, and supportive planning UI"
          />
        </motion.figure>
      </Reveal>
    </section>
  );
}

function LumoEvidencePanel() {
  return (
    <section className="ei-lumo-evidence-panel" aria-labelledby="lumo-evidence-heading">
      <Reveal className="ei-lumo-evidence-shell">
        <motion.div variants={driftUp} className="ei-lumo-evidence-copy">
          <SectionKicker index="" label="Project context" />
          <h2 id="lumo-evidence-heading">What this case study proves, and what it does not claim.</h2>
          <p>
            The page is presented as independent product-world exploration: identity, interface
            direction, emotional UX, and a prototype-level experience system.
          </p>
        </motion.div>

        <motion.div variants={fadeSoft} className="ei-lumo-evidence-list">
          {lumoEvidence.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

function StudioBridgePanel() {
  return (
    <section className="ei-lumo-studio-bridge" aria-labelledby="lumo-studio-bridge-heading">
      <Reveal className="ei-lumo-studio-bridge-shell">
        <motion.div variants={driftUp} className="ei-lumo-studio-bridge-copy">
          <SectionKicker index="" label="Selected Work" />
          <h2 id="lumo-studio-bridge-heading">
            Lumo sits inside Echo in Ink&apos;s selected work in identity, product atmosphere,
            and digital experience.
          </h2>
          <p>
            It shows how the studio carries emotional clarity, interface direction, and
            atmosphere into a product world without flattening its softness.
          </p>
        </motion.div>

        <motion.div variants={fadeSoft} className="ei-lumo-studio-bridge-link">
          <Link to="/works">
            Return to selected work{" "}
            <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
              →
            </span>
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

function ScreenArtifact({ title, tone, details, compact = false }: { title: string; tone: string; details: string[]; compact?: boolean }) {
  return (
    <article className={`ei-lumo-screen-artifact is-${tone} ${compact ? "is-compact" : ""}`}>
      <div className="ei-lumo-screen-chrome">
        <span>9:41</span>
        <i aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <div className="ei-lumo-screen-body" aria-hidden="true">
        {details.map((detail) => (
          <span key={detail}>{detail}</span>
        ))}
      </div>
      <div className="ei-lumo-screen-tabbar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

function IntroductionOverview() {
  return (
    <div className="ei-lumo-intro-overview-grid">
      <LumoPanel id="introduction" index="02" label="Lumo Introduction" className="ei-lumo-intro-panel">
        <div className="ei-lumo-intro-layout">
          <div>
            <h2 id="introduction-heading">Lumo is more than a planner.</h2>
            <p>
              It is a supportive companion concept for helping neurodivergent minds plan, focus,
              and follow through without guilt.
            </p>
            <div className="ei-lumo-pill-row" aria-label="Lumo qualities">
              <span>ADHD Friendly</span>
              <span>Empathetic</span>
              <span>Simple</span>
              <span>Customizable</span>
            </div>
          </div>
          <img src={connectedCloud} alt="Lumo cloud mascot holding a heart" />
        </div>
      </LumoPanel>

      <LumoPanel id="overview" index="03" label="Full Product Overview" className="ei-lumo-overview-panel">
        <div className="ei-lumo-overview-board" aria-label="Lumo product overview sequence">
          {overviewScreens.map((screen, index) => (
            <ScreenArtifact
              key={screen}
              title={screen}
              tone={productScreens[index % productScreens.length].tone}
              details={productScreens[index % productScreens.length].details}
              compact
            />
          ))}
        </div>
      </LumoPanel>
    </div>
  );
}

function StorySystemPanel() {
  return (
    <LumoPanel id="system" index="03" label="Challenge / Outcome / System" className="ei-lumo-system-panel">
      <div className="ei-lumo-story-rows">
        {storyRows.map((item) => (
          <article key={item.label}>
            <img src={item.image} alt={item.alt} />
            <div>
              <h2>{item.label}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </LumoPanel>
  );
}

function MindsPanel() {
  return (
    <LumoPanel id="minds" index="04" label="Designing for Neurodivergent Minds" className="ei-lumo-minds-panel">
      <div className="ei-lumo-card-grid">
        {principles.map((principle) => (
          <article key={principle.title}>
            <img src={principle.image} alt={principle.alt} />
            <h2>{principle.title}</h2>
            <p>{principle.body}</p>
          </article>
        ))}
      </div>
    </LumoPanel>
  );
}

function CharacterPanel() {
  return (
    <LumoPanel id="character-system" index="05" label="Character System" className="ei-lumo-character-panel">
      <div className="ei-lumo-character-row">
        {characterSystem.map((character) => (
          <figure key={character.name}>
            <img src={character.image} alt={character.alt} />
            <figcaption>{character.name}</figcaption>
          </figure>
        ))}
      </div>
    </LumoPanel>
  );
}

function ProductGalleryPanel() {
  return (
    <LumoPanel id="product-screens" index="06" label="Selected Screens" className="ei-lumo-product-panel">
      <div className="ei-lumo-product-gallery" aria-label="Lumo product screen gallery">
        {productScreens.map((screen) => (
          <ScreenArtifact key={screen.title} title={screen.title} tone={screen.tone} details={screen.details} />
        ))}
      </div>
    </LumoPanel>
  );
}

function IdentityPanel() {
  return (
    <LumoPanel id="identity-system" index="07" label="Identity System" className="ei-lumo-identity-panel">
      <div className="ei-lumo-identity-board">
        <article className="ei-lumo-brand-card">
          <span className="ei-lumo-spark-mark" aria-hidden="true" />
          <h2>Lumo</h2>
          <p>Focus. Plan. Do. Feel good.</p>
          <div aria-label="Icon and spark mark samples">
            <i />
            <i />
            <i />
          </div>
        </article>
        <article className="ei-lumo-palette-card">
          <h2>Colour Palette</h2>
          <div>
            {swatches.map((swatch) => (
              <span key={swatch.name}>
                <i />
                <b>{swatch.name}</b>
                <small>{swatch.value}</small>
              </span>
            ))}
          </div>
        </article>
        <article className="ei-lumo-type-card">
          <h2>Typography</h2>
          <strong>Aa</strong>
          <p>Editorial warmth paired with a clean product rhythm for readable, emotionally safe UI.</p>
          <dl>
            <div><dt>Headings</dt><dd>Editorial</dd></div>
            <div><dt>Interface</dt><dd>Structural</dd></div>
            <div><dt>Body</dt><dd>System Sans</dd></div>
          </dl>
        </article>
      </div>
    </LumoPanel>
  );
}

function EcosystemPanel() {
  return (
    <LumoPanel id="ecosystem" index="08" label="Ecosystem" className="ei-lumo-ecosystem-panel">
      <div className="ei-lumo-ecosystem-stage">
        <img className="ei-lumo-ecosystem-bg" src={atmosphereDesktop} alt="" aria-hidden="true" />
        <img className="ei-lumo-ecosystem-cloud" src={smilingCloud} alt="Smiling Lumo cloud mascot" />
        <span className="ei-lumo-ecosystem-app" aria-label="Lumo spark app icon" />
        <ScreenArtifact title="Focus Session" tone="planner" details={["Breathe", "Plan", "Begin"]} compact />
        <div className="ei-lumo-watch" aria-label="Lumo wearable concept">
          <span />
        </div>
        <img className="ei-lumo-ecosystem-plant" src={growingCloud} alt="Lumo growth mascot" />
      </div>
    </LumoPanel>
  );
}

function ExperiencePrinciplePanel() {
  return (
    <LumoPanel id="experience-principle" index="09" label="Experience Principle" className="ei-lumo-testimonial-panel">
      <div className="ei-lumo-testimonial-layout">
        <blockquote>
          Lumo should feel like the moment the room gets quieter: the next step is still there,
          but it no longer feels like a demand.
        </blockquote>
        <div>
          <span>Experience principle</span>
          <p>This is an internal design principle, not a testimonial or user-research quote.</p>
        </div>
        <img src={thumbsUpCloud} alt="Supportive Lumo cloud mascot" />
      </div>
    </LumoPanel>
  );
}

function OutcomePanel() {
  return (
    <LumoPanel id="final-outcome" index="10" label="Concept Direction" className="ei-lumo-outcome-panel">
      <div className="ei-lumo-outcome-layout">
        <div className="ei-lumo-outcomes" aria-label="Qualitative Lumo outcomes">
          {outcomes.map((outcome) => (
            <article key={outcome}>
              <span>{outcome}</span>
            </article>
          ))}
        </div>
        <img src={restingCloud} alt="Resting celebratory Lumo cloud mascot" />
      </div>
    </LumoPanel>
  );
}

function LumoStudioCTA() {
  return (
    <CTASection
      variant="editorialInvitation"
      eyebrow="Continue with Echo in Ink"
      heading={
        <>
          Bring the next product or studio world into <em>focus.</em>
        </>
      }
      body="Lumo is one example of how identity, atmosphere, and digital experience can move together when the work needs clarity people can feel."
      className="ei-lumo-studio-cta"
      headingId="lumo-studio-cta-heading"
      actions={
        <>
          <Button to="/contact?inquiry=project" variant="primary">
            Discuss a project
          </Button>
          <Button to="/works" variant="secondary">
            Return to selected work{" "}
            <span aria-hidden="true" className="ei-cta-arrow ei-cta-arrow-right">
              →
            </span>
          </Button>
        </>
      }
    />
  );
}

export function SignatureCaseStudy() {
  const activeId = useActiveSection();

  return (
    <article className="ei-lumo-case-study">
      <LumoRail activeId={activeId} />
      <section className="ei-lumo-main" aria-label="Lumo case study content">
        <LumoMobileNav activeId={activeId} />
        <LumoHeroPanel />
        <LumoEvidencePanel />
        <StudioBridgePanel />
        <div className="ei-lumo-panel-stack">
          <IntroductionOverview />
          <div className="ei-lumo-two-column">
            <StorySystemPanel />
            <MindsPanel />
          </div>
          <div className="ei-lumo-two-column ei-lumo-two-column-balanced">
            <CharacterPanel />
            <ProductGalleryPanel />
          </div>
          <div className="ei-lumo-two-column ei-lumo-two-column-balanced">
            <IdentityPanel />
            <EcosystemPanel />
          </div>
          <div className="ei-lumo-two-column ei-lumo-two-column-balanced">
            <ExperiencePrinciplePanel />
            <OutcomePanel />
          </div>
        </div>
        <LumoStudioCTA />
      </section>
    </article>
  );
}
