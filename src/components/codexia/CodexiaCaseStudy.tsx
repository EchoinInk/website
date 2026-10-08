import { Link } from "react-router-dom";

import agentCanvas from "@/assets/projects/codexia/agent-canvas.png";
import codierStates from "@/assets/projects/codexia/codier-states.png";
import controlCentre from "@/assets/projects/codexia/control-centre.png";
import executionWorkspace from "@/assets/projects/codexia/execution-workspace-v2.png";
import ideWorkspace from "@/assets/projects/codexia/ide-workspace-v2.png";
import missionWorkspace from "@/assets/projects/codexia/mission-workspace-v2.png";
import codexiaLogo from "@/assets/projects/codexia/logo-light.svg";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { ProjectNavigation } from "@/components/works/ProjectNavigation";

const opportunity = [
  ["Authority", "Agents need explicit boundaries around what they can inspect, modify, approve and escalate."],
  ["Evidence", "Engineering decisions should leave enough context behind to understand what happened without reconstructing an entire session."],
  ["Lifecycle", "Work needs a persistent state beyond the current prompt: planned, active, blocked, under review, completed or recovered."],
  ["Human state", "The person supervising the system should be able to understand its condition without reading every action an agent performs."],
] as const;

const thesis = [
  ["Authority stays explicit", "Every agent operates within defined permissions, responsibilities and boundaries."],
  ["Mutation follows governed paths", "Changes move through deliberate workflows instead of becoming invisible side effects."],
  ["Evidence survives the conversation", "Diagnostics, implementation history, decisions and outcomes remain attached to the work that produced them."],
  ["Recovery is a first-class capability", "Failure is treated as an expected operating state rather than an exception."],
] as const;

const lifecycle = [
  ["Define", "Establish the engineering objective, constraints and expected outcome."],
  ["Plan", "Translate intent into structured work, dependencies and agent responsibilities."],
  ["Execute", "Agents inspect the codebase, implement changes and coordinate work within their assigned authority."],
  ["Diagnose", "The system surfaces errors, architectural concerns and unresolved engineering signals."],
  ["Review", "Changes, evidence and consequences become inspectable before they are accepted."],
  ["Recover", "Interrupted or failed work can be understood and resumed without discarding accumulated context."],
  ["Complete", "The mission closes with implementation state and supporting evidence intact."],
] as const;

const identity = [
  ["Luminous information", "Light communicates activity, intelligence and depth rather than decoration."],
  ["Reduced chrome", "Structure comes from hierarchy, spacing and surface contrast rather than excessive interface framing."],
  ["Recognisable agents", "Agent identities remain distinct while still belonging to a cohesive operational system."],
  ["Product spectacle, carefully contained", "Expressive moments appear only where they strengthen identity, awareness or system state."],
] as const;

const architecture = [
  ["Translating governance into product structure", "Authority, lifecycle and execution state become visible product primitives rather than hidden infrastructure."],
  ["Keeping recovery inside the product model", "Failure is represented as a normal system condition, allowing interrupted work to remain understandable."],
  ["Separating autonomy from unrestricted control", "Capability is built around bounded responsibility rather than unlimited permission."],
  ["Building a language system that stays useful", "Technical information remains precise while avoiding unnecessary jargon, complexity and performative AI theatre."],
] as const;

function Heading({ number, label, title, children }: { number: string; label: string; title: string; children?: React.ReactNode }) {
  return <header className="ei-codexia-heading"><p><span>{number}</span>{label}</p><h2>{title}</h2>{children}</header>;
}
function PrincipleGrid({ items, className = "" }: { items: ReadonlyArray<readonly [string, string]>; className?: string }) {
  return <div className={`ei-codexia-principles ${className}`}>{items.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>;
}

function ProductImage({ src, alt, label, featured = false }: { src: string; alt: string; label: string; featured?: boolean }) {
  return <figure className={`ei-codexia-product-image${featured ? " is-featured" : ""}`}><div><ImageLightbox src={src} alt={alt} loading={featured ? "eager" : "lazy"} /></div><figcaption>{label}</figcaption></figure>;
}

export function CodexiaCaseStudy() {
  return <article className="ei-codexia-case-study" aria-label="Codexia case study content">
    <section className="ei-codexia-hero" aria-labelledby="codexia-heading"><div className="ei-codexia-atmosphere" aria-hidden="true" /><div className="ei-codexia-shell ei-codexia-hero-grid">
      <div className="ei-codexia-hero-copy"><p className="ei-codexia-kicker">Codexia</p><img className="ei-codexia-logo" src={codexiaLogo} alt="Codexia" /><h1 id="codexia-heading">Engineering authority, evidence and recovery built into the work itself.</h1><div className="ei-codexia-lede"><p>Codexia is an autonomous software engineering system designed around a simple premise: AI should be able to do meaningful engineering work without making that work opaque.</p><p>It brings planning, implementation, diagnostics, review and recovery into one governed environment, giving autonomous agents room to work while keeping decisions, state and evidence visible to the humans overseeing them.</p></div></div>
      <ProductImage src={controlCentre} alt="Codexia Control Centre showing missions, agents, activity, project health and operational state" label="Control Centre · Approved Phase 9 product direction" featured />
      <dl className="ei-codexia-meta"><div><dt>Product</dt><dd>Autonomous Engineering Platform</dd></div><div><dt>Role</dt><dd>Product Architecture · UX/UI · AI Systems · Engineering</dd></div><div><dt>Status</dt><dd>Advanced Working Prototype</dd></div><div><dt>Scope</dt><dd>Web Application · Agent System · IDE · Design System</dd></div></dl>
    </div></section>

    <nav className="ei-codexia-local-nav" aria-label="Codexia case study sections"><div className="ei-codexia-shell"><a href="#opportunity">Opportunity</a><a href="#system-model">Lifecycle</a><a href="#working-surfaces">Surfaces</a><a href="#engineering-intelligence">Intelligence</a><a href="#current-state">Current state</a></div></nav>

    <section id="opportunity" className="ei-codexia-section ei-codexia-opportunity"><div className="ei-codexia-shell"><Heading number="01" label="The opportunity" title="The opportunity was never another code generator."><p className="ei-codexia-subhead">It was a way to make autonomous engineering more visible, governable and trustworthy.</p><div className="ei-codexia-body"><p>Modern AI coding tools are increasingly capable of producing code.</p><p>The harder question begins after generation.</p><p className="ei-codexia-questions">What changed? Why did it change? What evidence supports the decision? Can the work be trusted? And if something goes wrong, how does the system recover?</p><p>Codexia began as an exploration of that missing layer.</p></div></Heading><PrincipleGrid items={opportunity} /></div></section>

    <section className="ei-codexia-section ei-codexia-thesis"><div className="ei-codexia-shell"><Heading number="02" label="Product thesis" title="Make the lifecycle visible. Keep each authority in its lane."><div className="ei-codexia-body"><p>Most AI engineering products begin with the interface.</p><p>Codexia begins with the system.</p><p>Rather than asking a single agent to behave like an entire engineering organisation, responsibility is distributed across specialised agents, governed workflows and persistent operational state.</p><p>The result is not simply more autonomy.</p><p>It&apos;s autonomy that remains inspectable, recoverable and accountable as complexity grows.</p></div></Heading><PrincipleGrid items={thesis} className="is-system" /></div></section>

    <section id="system-model" className="ei-codexia-section ei-codexia-system"><div className="ei-codexia-shell"><Heading number="03" label="System model" title="One engineering lifecycle. Multiple working surfaces."><div className="ei-codexia-body"><p>Planning, execution, diagnostics, review and recovery are not separate products.</p><p>They are different views into the same underlying system.</p><p>A mission can move from intent to implementation while maintaining a continuous record of state, evidence and decision-making throughout its lifecycle.</p></div></Heading><ol className="ei-codexia-lifecycle">{lifecycle.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div></section>

    <section id="working-surfaces" className="ei-codexia-section ei-codexia-surfaces"><div className="ei-codexia-shell"><Heading number="04" label="Working surfaces" title="Dense engineering state, organised into legible working environments."><div className="ei-codexia-body"><p>Codexia contains a significant amount of information by design.</p><p>The challenge was never reducing information.</p><p>The challenge was creating enough hierarchy that developers can understand system state quickly while still moving effortlessly into deep technical detail when required.</p></div></Heading><div className="ei-codexia-surface-grid">
      <article className="is-primary"><ProductImage src={missionWorkspace} alt="Codexia Mission Workspace with objective, task graph, execution, evidence and approval state" label="Mission Workspace" /><h3>Mission workspace</h3><p>A focused environment for understanding objectives, progress, dependencies and supporting evidence.</p></article>
      <article><ProductImage src={agentCanvas} alt="Codexia Agent Canvas showing specialised agents, dependencies, execution status and live activity" label="Agent Workspace · Character System" /><h3>Agent workspace</h3><p>Dedicated views into agent responsibilities, behaviour and current execution state. Agent identity remains recognisable without turning serious engineering work into novelty.</p></article>
      <article><ProductImage src={ideWorkspace} alt="Codexia IDE showing project files, code editor, Codier context, terminal and build checks" label="IDE · Diagnostics" /><h3>IDE and diagnostics</h3><p>Implementation, code intelligence and engineering workflows sit inside the governed environment. Errors, architectural signals and code actions become actionable information rather than detached logs.</p></article>
    </div></div></section>

    <section id="engineering-intelligence" className="ei-codexia-section ei-codexia-intelligence"><div className="ei-codexia-shell ei-codexia-split"><Heading number="05" label="Engineering intelligence" title="Dense engineering state, organised into authoritative work."><div className="ei-codexia-body"><p>Codexia goes beyond task execution.</p><p>The system develops an increasingly structured understanding of the codebase itself: symbols, relationships, diagnostics, architectural patterns and opportunities for change.</p><p>Semantic navigation makes large repositories easier to explore.</p><p>Diagnostics transform system knowledge into actionable engineering signals.</p><p>Refactoring tools allow change to propagate deliberately rather than through brittle text replacement.</p><p>The objective is not simply faster coding.</p><p>It is higher-confidence change.</p></div></Heading><ProductImage src={executionWorkspace} alt="Codexia execution workspace showing code context, build output, tests, logs and runtime services" label="Code context, diagnostics and execution evidence" /></div></section>

    <section className="ei-codexia-section ei-codexia-identity"><div className="ei-codexia-shell"><div className="ei-codexia-split"><Heading number="06" label="Product identity" title="Authoritative without feeling cold."><div className="ei-codexia-body"><p>Codexia needed to feel technically serious without becoming sterile.</p><p>Its visual language combines dense engineering surfaces with restrained cosmic references: near-black blues, periwinkle interaction states, intelligence signals and controlled violet light.</p><p>The goal is not spectacle.</p><p>The goal is orientation.</p><p>Codier introduces personality where it improves recognition and system understanding, without becoming the centre of attention.</p></div></Heading><ProductImage src={codierStates} alt="Codier state system showing ready, thinking, working, approval, success, support and resting states" label="Codier · State, role and communication" /></div><PrincipleGrid items={identity} className="is-system" /></div></section>

    <section className="ei-codexia-section ei-codexia-architecture"><div className="ei-codexia-shell"><Heading number="07" label="System architecture" title="Product thinking that joins authority, interaction and implementation."><div className="ei-codexia-body"><p>Codexia could not be designed as a collection of screens.</p><p>The product model, agent architecture, interface system and implementation strategy all had to evolve together.</p></div></Heading><PrincipleGrid items={architecture} className="is-system" /></div></section>

    <section id="current-state" className="ei-codexia-section ei-codexia-state"><div className="ei-codexia-shell"><Heading number="08" label="Current state" title="What is shown. And what is not claimed."><div className="ei-codexia-body"><p>Codexia is an advanced working prototype and an ongoing engineering project.</p><p>The work presented represents implemented product thinking, functional engineering systems and a substantial design language.</p><p>It is not a claim that every part of the broader autonomous engineering vision is production-complete.</p><p>That distinction matters.</p><p>The platform is being developed in layers, with governance, capability and reliability strengthening as the system evolves.</p></div></Heading><div className="ei-codexia-claims"><article><h3>What is shown</h3><ul><li>Implemented product thinking</li><li>Functional engineering systems</li><li>Substantial design language</li><li>Working prototype surfaces</li><li>Current governance model</li><li>Current engineering intelligence</li><li>Current lifecycle concepts implemented to the extent supported by the project</li></ul></article><article><h3>What is not claimed</h3><ul><li>Every autonomous capability is production complete</li><li>Unrestricted autonomous operation</li><li>Unsupported reliability claims</li><li>Enterprise certification</li><li>Capabilities not represented by the actual project evidence</li></ul></article></div></div></section>

    <section className="ei-codexia-section ei-codexia-larger"><div className="ei-codexia-shell"><Heading number="09" label="The larger idea" title="Complex systems deserve coherent interfaces."><div className="ei-codexia-body"><p>Codexia explores what becomes possible when autonomous engineering is approached as a product architecture problem rather than a prompt problem.</p><p>A system where capability can expand without sacrificing legibility, authority or human oversight.</p></div></Heading><div className="ei-codexia-project-links"><Link to="/works/keystone"><span>Explore Keystone</span><strong>Strategy and operating architecture.</strong></Link><Link to="/works/lumo"><span>Explore Lumo</span><strong>A calmer personal operating system.</strong></Link></div></div></section>
    <div className="ei-codexia-project-navigation"><ProjectNavigation currentProject="Codexia" /></div>
  </article>;
}
