import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { PageJumpLinks } from "@/components/navigation/PageJumpLinks";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { EchoCard } from "@/components/ui/EchoCard";
import { OrbitalVisual, type OrbitalVariant } from "@/components/ui/OrbitalVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { primaryCapabilities, type ServiceCapabilityId } from "@/data/servicesContent";
import { primaryCallToAction, siteActionLabels } from "@/data/siteNavigation";
import { driftUp, fadeSoft, staggerContainer, STAGGER, VIEWPORT } from "@/lib/motion-cinematic";

import brandEvidence from "@/assets/imagery/sections/ei-lightwave-work-card.png";
import digitalEvidence from "@/assets/imagery/sections/works-image-2.webp";
import productEvidence from "@/assets/imagery/sections/lumo-featured-bg.webp";
import systemsEvidence from "@/assets/projects/codexia/execution-workspace.jpg";
import servicesHeroDesktop from "@/assets/imagery/hero/services-hero-desktop.png";
import servicesHeroMobile from "@/assets/imagery/hero/services-hero-mobile.png";

const capabilityVisuals: Record<ServiceCapabilityId, OrbitalVariant> = {
  "brand-identity": "axiomRing",
  "websites-experiences": "memoryComet",
  "digital-products": "focusDial",
  "systems-automation": "quietAxis"
};

const capabilityDetails = [
  { id: "brand-identity", intro: "Creating the foundations people recognise, trust and remember.", scope: "Positioning, messaging, visual identity systems, creative direction and brand expression.", outputs: ["Positioning", "Naming & verbal direction", "Identity systems", "Launch assets"], cta: "Explore Brand & Identity", href: "/identity" },
  { id: "websites-experiences", intro: "Designing experiences that feel intuitive, useful and distinctly yours.", scope: "Websites, information architecture, UX/UI, interface design and content systems.", outputs: ["Information architecture", "UX/UI design", "Interaction design", "Development", "CMS implementation"], cta: "Explore Websites & Experiences", href: "/works" },
  { id: "digital-products", intro: "Turning concepts into products people can understand and use.", scope: "Product strategy, UX/UI, prototyping, validation and product design.", outputs: ["Product definition", "User flows", "Prototypes", "Design systems", "Interface implementation"], cta: "Explore Products & Apps", href: "/works" },
  { id: "systems-automation", intro: "Creating structure behind the scenes so good work scales without losing clarity.", scope: "Workflows, automation, AI-assisted systems, operational frameworks and internal tools.", outputs: ["Workflow mapping", "Internal tools", "Integrations", "Automation", "Operational interfaces"], cta: "Explore Systems & Automation", href: "/systems" }
] as const;

const serviceEvidence = [
  { id: "brand-identity", label: "Brand & Identity", title: "From recognition to meaning.", description: "See how strategy, identity and expression come together to create a coherent brand system.", receive: "A coherent identity system.", inspect: "Strategy, verbal and visual system, applications.", success: "Clearer recognition and more consistent expression.", cta: "View Brand Projects", href: "/identity", image: brandEvidence, position: "center" },
  { id: "websites-experiences", label: "Digital Experiences", title: "Making complexity feel effortless.", description: "See how structure, interaction and interface decisions make digital experiences clearer and easier to use.", receive: "A working digital experience.", inspect: "Information architecture, UX/UI, interaction design, CMS and build.", success: "Clearer journeys and stronger comprehension.", cta: "View Experience Projects", href: "/works", image: digitalEvidence, position: "center" },
  { id: "digital-products", label: "Products & Apps", title: "From idea to usable reality.", description: "See how product thinking, prototyping and implementation turn concepts into working systems.", receive: "A validated product direction or working interface.", inspect: "User flows, prototypes, design system, implementation.", success: "Lower friction and more confident use.", cta: "View Product Work", href: "/works/lumo", image: productEvidence, position: "center top" },
  { id: "systems-automation", label: "Systems & Tools", title: "Structure that supports momentum.", description: "See how workflows, tools and automation reduce friction and improve consistency.", receive: "A working automation, integration or operational system.", inspect: "Workflows, interface, documentation.", success: "Fewer manual steps, clearer authority and lower operational friction.", cta: "View System Projects", href: "/works/codexia", image: systemsEvidence, position: "center top" }
] as const;

const engagementDetails = [
  { title: "Strategy Session", pitch: "A focused working session designed to create clarity, direction and practical next steps.", includes: ["Strategic review and assessment", "Opportunity mapping", "Prioritisation and recommendations", "Action plan and decision framework"], bestFor: "Early-stage ideas, stalled projects, repositioning efforts and complex decisions.", cue: "Best when you know the question but not the answer.", cta: "Request a Strategy Session", href: "/booking" },
  { title: "Digital Reset", pitch: "A focused engagement for improving an existing brand, website, product or digital experience.", includes: ["Experience and systems audit", "Design and usability review", "Brand and messaging alignment", "Clear roadmap for refinement"], bestFor: "Existing businesses, established products and evolving teams.", cue: "Best when something already exists but is no longer working.", cta: "Explore a Digital Reset", href: "/contact?inquiry=project" },
  { title: "Full Project", pitch: "End-to-end strategy, design and implementation delivered as a connected process.", includes: ["Discovery and strategy", "Design and prototyping", "Development and implementation", "Systems implementation and launch support"], bestFor: "New ventures, major initiatives, platform launches and transformation projects.", cue: "Best when the problem spans strategy, design and implementation.", cta: "Start a Project", href: "/contact?inquiry=project" }
] as const;

export function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <PageShell title="Services — Echo in Ink" description="Strategy, identity, digital experiences, products and systems shaped as one connected practice." atmosphere="default" theme="light" withTopSpacing={false} className="ei-services-page">
      <Section theme="light" transition="atmospheric" transitionTo="lightElevated" spacing="none" className="ei-services-hero ei-hero-system" aria-labelledby="services-heading">
        <picture className="ei-services-hero-art" aria-hidden="true"><source media="(max-width: 639px)" srcSet={servicesHeroMobile} /><img src={servicesHeroDesktop} alt="" /></picture>
        <Container size="xl" className="ei-hero-system-container relative z-10"><motion.div variants={staggerContainer(STAGGER.loose, 0)} initial={prefersReducedMotion ? false : "hidden"} animate="visible" className="ei-services-hero-layout">
          <motion.div variants={driftUp} className="ei-services-hero-copy ei-hero-system-copy"><SectionLabel label="Services & Capabilities" tone="accent" className="ei-hero-system-eyebrow" /><h1 id="services-heading" className="ei-hero-system-heading">Shape the idea and the infrastructure together.</h1><div className="ei-services-hero-description ei-hero-system-description"><p>Most problems don&apos;t fit neatly into branding, design or technology.</p><p>Echo in Ink works across strategy, identity, digital experiences, products and systems to keep the thinking, design and implementation connected from first conversation through to delivery.</p></div><p className="ei-services-hero-support">Different disciplines. One connected practice.</p><div className="ei-services-hero-actions ei-hero-system-actions"><Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button><Button to="/works" variant="secondary">{siteActionLabels.viewWork}</Button></div></motion.div>
          <motion.ol variants={fadeSoft} className="ei-services-hero-labels" aria-label="Four connected areas of practice">{primaryCapabilities.map((capability, index) => <li key={capability.id} className={`ei-services-hero-label-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{capability.title}</li>)}</motion.ol>
        </motion.div></Container>
      </Section>

      <Container size="xl" className="ei-services-jump-container"><PageJumpLinks label="On this page" links={[{ href: "#capabilities", label: "Capabilities" }, { href: "#evidence", label: "Proof" }, { href: "#ways-to-work", label: "Ways to work" }]} /></Container>

      <Section id="capabilities" theme="lightElevated" transition="chapter" transitionTo="light" spacing="none" className="ei-services-capabilities" aria-labelledby="services-capabilities-heading"><Container size="xl"><motion.div variants={staggerContainer(STAGGER.loose, 0)} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={VIEWPORT.normal} className="ei-services-section-inner">
        <motion.div variants={driftUp} className="ei-services-section-heading"><SectionLabel label="Four areas of practice" tone="accent" /><div><h2 id="services-capabilities-heading">Four areas of practice. One shared standard.</h2><p>The work changes. The approach doesn&apos;t.</p><p>Every engagement balances thinking, design and implementation differently, while staying grounded in clarity, craft and real-world use.</p></div></motion.div>
        <div className="ei-services-capability-grid">{capabilityDetails.map((detail, index) => { const capability = primaryCapabilities.find((item) => item.id === detail.id)!; return <motion.div key={detail.id} variants={driftUp}><EchoCard variant="static" padding="lg" className="ei-services-capability-card"><div className="ei-services-card-meta"><span>{String(index + 1).padStart(2, "0")}</span><OrbitalVisual variant={capabilityVisuals[detail.id]} size={58} /></div><h3>{capability.title}</h3><p className="ei-services-capability-intro">{detail.intro}</p><p>{detail.scope}</p><div className="ei-services-output-block"><h4>Typical outputs</h4><ul>{detail.outputs.map((output) => <li key={output}>{output}</li>)}</ul></div><Button to={detail.href} variant="tertiary">{detail.cta}<span aria-hidden="true">→</span></Button></EchoCard></motion.div>; })}</div>
      </motion.div></Container></Section>

      <Section id="evidence" theme="light" transition="soft" transitionTo="mist" spacing="none" className="ei-services-evidence" aria-labelledby="services-evidence-heading"><Container size="xl"><motion.div variants={staggerContainer(STAGGER.loose, 0)} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={VIEWPORT.normal} className="ei-services-section-inner">
        <motion.div variants={driftUp} className="ei-services-section-heading"><SectionLabel label="Different work, different proof" tone="accent" /><div><h2 id="services-evidence-heading">Different disciplines. Different outcomes. Same philosophy.</h2><p>Each practice area produces a different type of result, but all share the same goal: bringing clarity to complexity.</p></div></motion.div>
        <div className="ei-services-evidence-grid">{serviceEvidence.map((item, index) => <motion.article key={item.id} variants={driftUp} className={`ei-service-evidence ei-service-evidence-${item.id}`}><div className="ei-service-evidence-meta"><OrbitalVisual variant={capabilityVisuals[item.id]} size={34} /><span>{String(index + 1).padStart(2, "0")} / {item.label}</span></div><div className="ei-service-evidence-body"><figure><img src={item.image} alt="" loading="lazy" style={{ objectPosition: item.position }} /></figure><div className="ei-service-evidence-copy"><h3>{item.title}</h3><p>{item.description}</p><dl><div><dt>What you receive</dt><dd>{item.receive}</dd></div><div><dt>What you can inspect</dt><dd>{item.inspect}</dd></div><div><dt>What success looks like</dt><dd>{item.success}</dd></div></dl><Button to={item.href} variant="tertiary">{item.cta}<span aria-hidden="true">→</span></Button></div></div></motion.article>)}</div>
      </motion.div></Container></Section>

      <Section id="ways-to-work" theme="mist" transition="atmospheric" transitionTo="deep" spacing="none" className="ei-services-engagements ei-transition-closing" aria-labelledby="services-engagements-heading"><Container size="xl"><motion.div variants={staggerContainer(STAGGER.loose, 0)} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={VIEWPORT.normal} className="ei-services-section-inner">
        <motion.div variants={driftUp} className="ei-services-section-heading"><SectionLabel label="Ways of working" tone="accent" /><div><h2 id="services-engagements-heading">Choose the shape that fits the challenge.</h2><p>Whether you need strategic clarity, focused execution or end-to-end delivery, engagements are designed around outcomes rather than rigid packages.</p></div></motion.div>
        <div className="ei-services-engagement-grid">{engagementDetails.map((model, index) => <motion.div key={model.title} variants={driftUp}><EchoCard variant="static" padding="lg" className="ei-services-engagement-card"><span className="ei-services-engagement-index">{String(index + 1).padStart(2, "0")}</span><h3>{model.title}</h3><p>{model.pitch}</p><div className="ei-services-includes"><h4>Includes</h4><ul>{model.includes.map((item) => <li key={item}>{item}</li>)}</ul></div><dl className="ei-services-engagement-details"><div><dt>Best for</dt><dd>{model.bestFor}</dd></div><div><dt>Suitability</dt><dd>{model.cue}</dd></div></dl><Button to={model.href} variant="tertiary">{model.cta}<span aria-hidden="true">→</span></Button></EchoCard></motion.div>)}</div>
        <motion.p variants={fadeSoft} className="ei-services-engagement-note"><span>Not usually the right fit for:</span> pure production overflow, disconnected execution, or work that only needs pre-specced implementation.</motion.p>
      </motion.div></Container></Section>

      <Section theme="deep" spacing="none" className="ei-services-closing"><CTASection variant="imagePanel" panelTheme="deep" eyebrow="Next step" heading={<>Bring the challenge.<br />We&apos;ll find the right shape for it.</>} body={<><p>Some projects need sharper strategy. Others need better systems, clearer communication or thoughtful technology.</p><p>Most need a combination.</p><p>Let&apos;s work out what that combination looks like.</p></>} decoration={<div className="ei-services-closing-orbit" aria-hidden="true"><span /><span /><span /></div>} actions={<><Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button><Button to="/booking" variant="secondary">Book a Strategy Session</Button></>} /></Section>
    </PageShell>
  );
}
