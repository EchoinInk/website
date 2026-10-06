import { type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import heroDesktop from "@/assets/imagery/hero/lumo-page-hero-desktop.webp";
import atmosphereDesktop from "@/assets/imagery/hero/lumo-hero-light-horizon-desktop.webp";
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
import logoHorizontal from "@/assets/projects/lumo/brand/logo-lockup-horizontal.png";
import logoStacked from "@/assets/projects/lumo/brand/logo-lockup-stacked.png";
import splashScreen from "@/assets/projects/lumo/brand/lumo-splash-screen.png";
import logoMark from "@/assets/projects/lumo/brand/logo-mark-light.png";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { ProjectNavigation } from "@/components/works/ProjectNavigation";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import { lumoProject } from "@/data/worksProjects";
import { blurEmergence, driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

const reasoningChain = [
  ["Observed problem", "Traditional planning tools can make incomplete work feel like failure."],
  ["Product hypothesis", "A softer emotional model could make re-entry easier and more sustainable for overwhelmed minds."],
  ["Concept response", "Flexible planning, supportive language and a companion character."],
  ["Prototype outcome", "An interactive product prototype and coherent design system demonstrating the concept."],
] as const;

const behaviouralNeeds = [
  ["Non-punitive language", "Encouraging, neutral language instead of guilt or pressure.", "⌁"],
  ["Low-pressure reminders", "Gentle nudges, not urgent alerts. You choose the timing.", "◔"],
  ["Flexible completion", "Reschedule, edit or break tasks down without penalty.", "≋"],
  ["Gentle progress feedback", "Celebrates effort and consistency, not just completion.", "▥"],
  ["Forgiving scheduling", "Plans can change. It is always easy to pick up again.", "↻"],
] as const;

const journey = [
  ["Capture", "Get thoughts out of your head."],
  ["Prioritise", "Find what matters today."],
  ["Plan", "Build a realistic plan."],
  ["Reminder", "A gentle nudge at the right time."],
  ["Complete / Reschedule", "Mark done or move it forward."],
  ["Reflection", "See progress, not perfection."],
] as const;

const intentions = [
  ["Reduce perceived pressure", "Softer language, no shame states and reassuring feedback.", overwhelmedCloud],
  ["Simplify prioritisation", "Clear visual structure to reduce decision overload.", puzzleCloud],
  ["Enable flexibility", "Adjust plans without penalty. Rescheduling is a core part of the experience.", gentleReminderCloud],
  ["Support emotional momentum", "Small wins and gentle progress help maintain motivation.", celebrationCloud],
] as const;

const characterStates = [
  ["Happy", "General positive moments", smilingCloud],
  ["Supportive", "Missed or rescheduled task", connectedCloud],
  ["Focused", "Active planning", focusCloud],
  ["Reminding", "Upcoming task", gentleReminderCloud],
  ["Growing", "Progress milestone", growingCloud],
  ["Curious", "Exploring ideas or features", thinkingCloud],
  ["Resting", "Wind-down or pause state", restingCloud],
] as const;

const consequences = [
  ["Reminders avoid urgent language", "Gentle, supportive nudges instead of pressure or guilt."],
  ["Overdue items are not visually punitive", "Incomplete work remains neutral and approachable."],
  ["Information density stays low", "Clear, focused screens reduce cognitive overload."],
  ["Completion feedback is warm but restrained", "Celebrate effort without excessive rewards or pressure."],
] as const;

const swatches = [["Violet", "#6d5dfc"], ["Pink", "#dd12cb"], ["Lilac", "#c4a3f0"], ["Mint", "#63d5b4"], ["Cream", "#f7f5fa"]] as const;

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div variants={staggerContainer(STAGGER.normal, 0)} initial="hidden" whileInView="visible" viewport={VIEWPORT.normal} className={className}>{children}</motion.div>;
}

function SectionKicker({ index, children, note }: { index?: string; children: ReactNode; note?: string }) {
  return <div className="ei-lumo-kicker-row"><p className="ei-lumo-section-kicker">{index ? <span>{index}</span> : null}{children}</p>{note ? <p className="ei-lumo-evidence-note">{note}</p> : null}</div>;
}

function Panel({ id, className = "", children, label }: { id?: string; className?: string; children: ReactNode; label: string }) {
  return <section id={id} className={`ei-lumo-panel ${className}`} data-theme="deep" aria-label={label}>{children}</section>;
}

function LumoHeroPanel() {
  const meta = [["Provenance", "Independent Product"], ["Status", "Prototype"], ["Evidence", "Design rationale & prototype"], ["Capabilities", "Brand & Identity · Digital Experience · Product Design · Design System"], ["Product scope", "Mobile app · Design system · Character system · Prototype"]];
  return <section id="hero" className="ei-lumo-dashboard-hero" data-theme="deep" aria-labelledby="lumo-hero-heading">
    <div className="ei-lumo-stars" aria-hidden="true"><span /><span /><span /><span /><span /></div>
    <Reveal className="ei-lumo-hero-grid">
      <motion.div variants={driftUp} className="ei-lumo-hero-copy">
        <SectionKicker>Selected work</SectionKicker><h1 id="lumo-hero-heading">Lumo</h1><h2>A world built for<br />overwhelmed humans.</h2>
        <p>Lumo is an ADHD life-planner concept that turns emotionally supportive planning into a calm, clear and intelligent product world.</p>
        <dl className="ei-lumo-hero-meta">{meta.map(([label, value]) => <div key={label} data-wide={label === "Capabilities" || label === "Product scope" ? "true" : undefined}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className="ei-lumo-hero-actions"><a className="ei-lumo-button is-primary" href="#project-brief">Explore the project <span aria-hidden="true">↓</span></a></div>
      </motion.div>
      <motion.figure variants={blurEmergence} className="ei-lumo-hero-art"><img src={heroDesktop} alt="Lumo prototype artwork showing a cloud companion and three mobile planning interfaces" /></motion.figure>
    </Reveal>
  </section>;
}

function ProjectBrief() {
  return <Panel id="project-brief" className="ei-lumo-brief-panel" label="Project brief"><Reveal className="ei-lumo-brief-grid">
    <motion.div variants={driftUp} className="ei-lumo-editorial-intro"><SectionKicker index="01">Project brief</SectionKicker><h2>A product world designed to make planning feel easier to return to.</h2><p>Traditional planning tools can make incomplete work feel like failure.</p><p>Lumo explores a softer, more compassionate approach to planning that helps overwhelmed people re-enter with less pressure and more self-trust.</p></motion.div>
    <motion.div variants={fadeSoft} className="ei-lumo-reasoning"><p className="ei-lumo-overline">The thinking behind Lumo</p><div className="ei-lumo-reasoning-chain">{reasoningChain.map(([title, body], index) => <article key={title}><span aria-hidden="true">{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><article className="ei-lumo-key-decision"><span>Key decision</span><div><h3>Design for re-entry, not perfection.</h3><p>Every interaction reduces perceived pressure and makes it easier to come back, even when plans change.</p></div></article><div className="ei-lumo-brief-foot"><p><strong>Echo’s role</strong><br />Connect identity, product atmosphere and interface direction into one coherent prototype world.</p><nav aria-label="Project references"><a href="#product-screens">Interface screens</a><Link to="/services">Explore Services</Link></nav></div><p className="ei-lumo-claim-boundary"><strong>Evidence boundary:</strong> no launch, clinical validation, formal user research or demonstrated behavioural efficacy is claimed.</p></motion.div>
  </Reveal></Panel>;
}

function Introduction() {
  return <Panel id="introduction" className="ei-lumo-introduction-panel" label="Lumo introduction"><Reveal className="ei-lumo-introduction-grid">
    <div className="ei-lumo-editorial-intro"><SectionKicker index="02">Lumo introduction</SectionKicker><h2>Lumo is more than a planner. <em>A supportive companion.</em></h2><p>Lumo combines interaction design and behavioural principles to create a planning experience that feels kind, flexible and achievable.</p></div>
    <div className="ei-lumo-needs"><p className="ei-lumo-overline">Designed around real behavioural needs</p><div>{behaviouralNeeds.map(([title, body, icon]) => <article key={title}><i aria-hidden="true">{icon}</i><h3>{title}</h3><p>{body}</p></article>)}</div></div>
  </Reveal></Panel>;
}

function ProductJourney() {
  return <Panel id="overview" className="ei-lumo-journey-panel" label="Full product overview"><Reveal><SectionKicker index="03" note="An end-to-end journey through Lumo">Full product overview</SectionKicker><div className="ei-lumo-journey">{journey.map(([title, body], index) => <article key={title}><span>{index + 1}</span><div className="ei-lumo-journey-visual" aria-hidden="true"><i /><i /><i /></div><h3>{title}</h3><p>{body}</p></article>)}</div></Reveal></Panel>;
}

function OutcomeAndIntent() {
  return <div className="ei-lumo-split-grid">
    <Panel id="system" className="ei-lumo-system-panel" label="Challenge, outcome and system"><Reveal><SectionKicker index="04">Challenge / outcome / system</SectionKicker><div className="ei-lumo-story-list">
      <article><img src={overwhelmedCloud} alt="" /><div><h3>Challenge</h3><p>The concept addresses how rigid, pressure-led productivity patterns can feel overwhelming and shame-inducing for some neurodivergent users.</p></div></article>
      <article><img src={thumbsUpCloud} alt="" /><div><h3>Outcome</h3><p>An interactive product prototype and coherent design system demonstrating a calmer, more supportive planning experience.</p></div></article>
      <article><img src={thinkingCloud} alt="" /><div><h3>What’s next</h3><p>Future user validation and testing to refine the experience and assess real-world impact.</p></div></article>
    </div></Reveal></Panel>
    <Panel id="minds" className="ei-lumo-intent-panel" label="Designing for neurodivergent minds"><Reveal><SectionKicker index="05" note="Design intention, not a clinical claim">Designing for neurodivergent minds</SectionKicker><div className="ei-lumo-intent-grid">{intentions.map(([title, body, image]) => <article key={title}><img src={image} alt="" /><h3>{title}</h3><p>{body}</p></article>)}</div></Reveal></Panel>
  </div>;
}

function CharacterSystem() {
  return <Panel id="character-system" className="ei-lumo-character-panel" label="Character system"><Reveal><SectionKicker index="06" note="Character state → product moment">Character system</SectionKicker><div className="ei-lumo-character-grid">{characterStates.map(([state, trigger, image]) => <figure key={state}><img src={image} alt={`${state} Lumo cloud character`} /><figcaption><strong>{state}</strong><span>{trigger}</span></figcaption></figure>)}</div></Reveal></Panel>;
}

function IdentitySystem() {
  return <Panel id="identity-system" className="ei-lumo-identity-panel" label="Identity system"><Reveal><SectionKicker index="07">Identity system</SectionKicker><div className="ei-lumo-identity-grid">
    <article className="ei-lumo-logo-card"><picture><source media="(max-width: 520px)" srcSet={logoStacked} /><img src={logoHorizontal} alt="Lumo logo" /></picture><img className="ei-lumo-identity-character" src={smilingCloud} alt="" /></article>
    <article className="ei-lumo-swatch-card"><h3>Colour palette</h3><div>{swatches.map(([name, value]) => <span key={name} style={{ "--swatch": value } as CSSProperties}><i /><b>{name}</b><small>{value}</small></span>)}</div></article>
    <article className="ei-lumo-type-card"><h3>Typography</h3><strong>Aa</strong><p><b>Playfair Display</b><br />Headings</p><p><b>Inter</b><br />Body, UI, labels</p></article>
    <article className="ei-lumo-icon-card"><h3>Icons</h3><div aria-label="Rounded line icon style"><span>⌂</span><span>▣</span><span>♡</span><span>♧</span><span>○</span><span>⌁</span></div><img src={logoMark} alt="Lumo gradient logo mark" /></article>
  </div></Reveal></Panel>;
}

function EcosystemAndScreens() {
  return <div className="ei-lumo-split-grid ei-lumo-ecosystem-row">
    <Panel id="ecosystem" className="ei-lumo-ecosystem-panel" label="Ecosystem concept exploration"><Reveal><SectionKicker index="08" note="Concept exploration">Ecosystem</SectionKicker><div className="ei-lumo-ecosystem-copy"><h2>A growing world <em>for calmer days.</em></h2><p>The Lumo universe could extend beyond the core planner into new experiences, tools and environments.</p><p>This section explores potential directions rather than shipped functionality.</p></div><div className="ei-lumo-ecosystem-stage"><img src={atmosphereDesktop} alt="" /><img src={restingCloud} alt="Resting Lumo cloud in a conceptual companion environment" /><div>{["Focus Sessions", "Soundscapes", "Themes", "Widgets", "Companion environments"].map((item) => <span key={item}>{item}</span>)}</div></div><div className="ei-lumo-status-key"><span><i />Designed</span><span><i />Prototyped</span><span><i />Conceptual</span></div></Reveal></Panel>
    <Panel id="product-screens" className="ei-lumo-screens-panel" label="Designed screens and interactive prototype evidence"><Reveal><SectionKicker note="Interactive prototype">Designed screens</SectionKicker><figure className="ei-lumo-screen-evidence"><img src={heroDesktop} alt="Composed Lumo prototype artwork showing planning, dashboard and reflection mobile interfaces" /><figcaption>Representative interface work shown in the supplied product composition: planning, daily overview and reflection states.</figcaption></figure><figure className="ei-lumo-splash-evidence"><img src={splashScreen} alt="Lumo splash screen with the gradient logo on a soft lilac atmosphere" /><figcaption>Splash and brand-entry state</figcaption></figure></Reveal></Panel>
  </div>;
}

function ExperiencePrinciple() {
  return <Panel id="experience-principle" className="ei-lumo-principle-panel" label="Experience principle"><Reveal className="ei-lumo-principle-grid"><div><SectionKicker index="09">Experience principle</SectionKicker><blockquote>“Lumo should feel like the moment the room gets quieter:<br />the next step is still there,<br />but it no longer feels like a demand.”</blockquote></div><div><p className="ei-lumo-overline">This means…</p><div className="ei-lumo-consequences">{consequences.map(([title, body]) => <article key={title}><i aria-hidden="true">✦</i><h3>{title}</h3><p>{body}</p></article>)}</div></div></Reveal></Panel>;
}

function StudioCTA() {
  return <CTASection variant="editorialInvitation" panelTheme="deep" eyebrow="Continue with Echo in Ink" heading={<>Bring the next product or studio world into <em>focus.</em></>} body="Lumo is one example of how identity, atmosphere and digital experience can come together when the work needs clarity, care and a deeper understanding of people." className="ei-lumo-studio-cta" headingId="lumo-studio-cta-heading" actions={<><Button to="/contact?inquiry=project" variant="primary">{primaryCallToAction.label}</Button><Button to="/works" variant="secondary">{siteActionLabels.viewWork} <span aria-hidden="true">→</span></Button></>} />;
}

export function SignatureCaseStudy() {
  return <article className="ei-lumo-case-study"><section className="ei-lumo-main" aria-label="Lumo case study content"><LumoHeroPanel /><div className="ei-lumo-panel-stack"><ProjectBrief /><Introduction /><ProductJourney /><OutcomeAndIntent /><CharacterSystem /><IdentitySystem /><EcosystemAndScreens /><ExperiencePrinciple /></div><ProjectNavigation currentProject={lumoProject.title} className="ei-lumo-project-navigation" /><StudioCTA /></section></article>;
}
