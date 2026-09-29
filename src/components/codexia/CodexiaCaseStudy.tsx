import { Link } from "react-router-dom";

import applicationShell from "@/assets/projects/codexia/application-shell.jpg";
import codierPlanning from "@/assets/projects/codexia/codier-planning.jpg";
import executionWorkspace from "@/assets/projects/codexia/execution-workspace.jpg";
import ideWorkspace from "@/assets/projects/codexia/ide-workspace.jpg";
import codexiaLogo from "@/assets/projects/codexia/logo-light.svg";
import missionWorkspace from "@/assets/projects/codexia/mission-workspace.jpg";
import { Button } from "@/components/ui/Button";
import { ProjectContext } from "@/components/works/ProjectContext";
import { ProjectNavigation } from "@/components/works/ProjectNavigation";
import { getWorkProject } from "@/data/worksProjects";
import { primaryCallToAction } from "@/data/siteNavigation";

const codexiaProject = getWorkProject("Codexia")!;

const sectionLinks = [
  ["01", "Context", "context"],
  ["02", "Approach", "approach"],
  ["03", "Architecture", "architecture"],
  ["04", "Interface evidence", "interface-evidence"],
  ["05", "Development state", "development-state"],
  ["06", "Evidence boundary", "evidence-boundary"],
] as const;

const decisions = [
  {
    title: "Authority stays explicit",
    body: "Planning, execution, validation, continuation and reporting remain separate responsibilities. The interface is a projection of that lifecycle, not a second runtime.",
    evidence: "RuntimeController · EngineeringPlanner · Workflow · Validator · Reporter",
  },
  {
    title: "Mutation enters one governed path",
    body: "Ordinary chat remains read-only. Engineering requests enter through the dedicated engineering route, then pass scope, proposal, approval and verification boundaries.",
    evidence: "app/api/engineering/route.ts · app/api/chat/route.ts",
  },
  {
    title: "Failure closes safely",
    body: "Fresh-source validation, bounded execution, fixed checks, durable checkpoints and rollback protect the workspace when evidence changes or verification fails.",
    evidence: "lib/agent/engineering/runtime.ts · workflow.ts",
  },
  {
    title: "Integration does not gain authority",
    body: "The platform boundary can request existing capabilities, but cannot approve mutations, bypass verification or invent Reporter-owned outcomes.",
    evidence: "lib/platform-integration/service.ts · contract 1.0",
  },
];

const architecture = [
  ["Mission", "Frames intent and scope"],
  ["Planner", "Authors the bounded plan"],
  ["Approval", "Confirms the exact proposal"],
  ["Workflow", "Coordinates approved actions"],
  ["Executor", "Applies bounded operations"],
  ["Validator", "Runs fixed verification"],
  ["Reporter", "Owns the outcome record"],
] as const;

const developmentStates = [
  {
    label: "Implemented kernel",
    title: "Governed local engineering",
    body: "Repository-backed planning, proposal approval, source validation, bounded editing, verification, rollback, reporting and restart-aware checkpoints.",
  },
  {
    label: "Released boundary",
    title: "Phase 8.6 contract",
    body: "A versioned in-process adapter over existing intelligence, engineering, lifecycle and reporting capabilities. It is not proof of a deployed IDE integration.",
  },
  {
    label: "Active design work",
    title: "Phase 9 product experience",
    body: "The Nebula interface system shown here is an approved implementation target. These views document direction and intended orchestration; they are not represented as shipped screens.",
  },
];

function SectionHeading({ index, eyebrow, title, body }: { index: string; eyebrow: string; title: string; body?: string }) {
  return (
    <header className="ei-codexia-section-heading">
      <p><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="ei-codexia-section-intro">{body}</p> : null}
    </header>
  );
}

function EvidenceFigure({ src, alt, label, caption, featured = false }: { src: string; alt: string; label: string; caption: string; featured?: boolean }) {
  return (
    <figure className={`ei-codexia-evidence-figure${featured ? " is-featured" : ""}`}>
      <div className="ei-codexia-figure-frame">
        <img src={src} alt={alt} loading={featured ? "eager" : "lazy"} />
      </div>
      <figcaption>
        <span>{label}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}

export function CodexiaCaseStudy() {
  return (
    <article className="ei-codexia-case-study" aria-label="Codexia case study content">
      <section className="ei-codexia-hero" aria-labelledby="codexia-heading">
        <div className="ei-codexia-hero-glow" aria-hidden="true" />
        <div className="ei-codexia-shell ei-codexia-hero-grid">
          <div className="ei-codexia-hero-copy">
            <p className="ei-codexia-kicker">Selected work · Independent product</p>
            <img className="ei-codexia-logo" src={codexiaLogo} alt="Codexia" />
            <h1 id="codexia-heading">Engineering work with authority, evidence and recovery built in.</h1>
            <p className="ei-codexia-hero-lede">
              A studio-built software engineering platform exploring how planning, execution,
              validation and reporting can operate as one governed system—without collapsing
              control into an opaque agent loop.
            </p>
            <ProjectContext
              classification={codexiaProject.classification}
              capabilities={codexiaProject.capabilities}
              scope={codexiaProject.scope}
              className="ei-codexia-context"
            />
          </div>
          <EvidenceFigure
            src={applicationShell}
            alt="Codexia Nebula application-shell interface reference with project navigation, editor, mission context, terminal and Codier assistant panels"
            label="Approved interface reference · Phase 9"
            caption="Canonical application-shell target. It communicates the intended product composition; it is not presented as a shipped interface."
            featured
          />
        </div>
      </section>

      <nav className="ei-codexia-local-nav" aria-label="Codexia case study sections">
        <div className="ei-codexia-shell">
          {sectionLinks.map(([index, label, id]) => (
            <a key={id} href={`#${id}`}><span>{index}</span>{label}</a>
          ))}
        </div>
      </nav>

      <section id="context" className="ei-codexia-section ei-codexia-section-context">
        <div className="ei-codexia-shell">
          <SectionHeading
            index="01"
            eyebrow="Context"
            title="The opportunity was not another code generator. It was a more governable engineering system."
          />
          <div className="ei-codexia-context-grid">
            <article>
              <h3>Problem / opportunity</h3>
              <p>Autonomous software work becomes difficult to trust when intent, approval, mutation, validation and reporting blur into one invisible process. Codexia explores a legible operating model for that work.</p>
            </article>
            <article>
              <h3>Constraints</h3>
              <p>Local-first operation, strict workspace containment, explicit proposal identity, fail-closed boundaries and evidence that survives interruption. Product UX cannot override those controls.</p>
            </article>
            <article>
              <h3>Echo&apos;s role</h3>
              <p>Product architecture, workflow and authority design, interface system, engineering implementation, validation strategy and the evolving Nebula product language.</p>
            </article>
            <article className="ei-codexia-context-state">
              <h3>Current state</h3>
              <p>Active development. A substantial governed engineering kernel exists; the wider Phase 9 experience shown here remains an implementation target rather than a public launch claim.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="approach" className="ei-codexia-section ei-codexia-section-approach">
        <div className="ei-codexia-shell">
          <SectionHeading
            index="02"
            eyebrow="Approach and key decisions"
            title="Make the lifecycle visible. Keep each authority in its lane."
            body="The core design move was architectural before it was visual: define who is allowed to plan, act, validate, continue and report, then design interfaces around those real boundaries."
          />
          <div className="ei-codexia-decision-grid">
            {decisions.map((decision, index) => (
              <article key={decision.title}>
                <span>0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
                <code>{decision.evidence}</code>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="ei-codexia-section ei-codexia-section-architecture">
        <div className="ei-codexia-shell">
          <SectionHeading
            index="03"
            eyebrow="Product / system architecture"
            title="One governed lifecycle, projected into different working surfaces."
            body="Control Centre, mission, IDE and execution views are intended to expose the same authoritative state—not create parallel versions of it."
          />
          <div className="ei-codexia-architecture-flow" aria-label="Codexia governed engineering lifecycle">
            {architecture.map(([title, body], index) => (
              <div key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <aside className="ei-codexia-authority-note">
            <strong>Authority boundary</strong>
            <p>The platform integration layer may request existing capabilities. It does not gain approval, mutation, validation, lifecycle, queue or reporting authority.</p>
          </aside>
        </div>
      </section>

      <section id="interface-evidence" className="ei-codexia-section ei-codexia-section-evidence">
        <div className="ei-codexia-shell">
          <SectionHeading
            index="04"
            eyebrow="Interface and implementation evidence"
            title="Dense engineering state, organised around the work."
            body="These approved Nebula references are repository-backed design artifacts. They show how the product should expose missions, code, verification and runtime context while keeping technical surfaces quiet enough to read."
          />
          <div className="ei-codexia-gallery">
            <EvidenceFigure
              src={missionWorkspace}
              alt="Codexia mission workspace interface reference showing mission brief, scope, tasks, approval gate and activity"
              label="Mission workspace · Approved target"
              caption="Intent, constraints, task structure and approval are composed as one reviewable mission surface."
            />
            <EvidenceFigure
              src={ideWorkspace}
              alt="Codexia IDE workspace interface reference showing file tree, code editor, terminal, build checks and Codier context"
              label="IDE workspace · Approved target"
              caption="The editor remains the centre of gravity while context, checks and assistance stay adjacent and inspectable."
            />
            <EvidenceFigure
              src={executionWorkspace}
              alt="Codexia execution workspace interface reference showing code, build state, tests, logs and runtime services"
              label="Execution workspace · Approved target"
              caption="Execution evidence is gathered without turning a requested action into a success claim."
            />
          </div>
          <div className="ei-codexia-repository-proof">
            <div>
              <p className="ei-codexia-kicker">Repository-backed implementation</p>
              <h3>Evidence beneath the interface</h3>
              <p>The case study is grounded in implemented routes, runtime components, tests and architecture records—not only screen concepts.</p>
            </div>
            <ul>
              <li><code>app/api/engineering/route.ts</code><span>Governed request entry</span></li>
              <li><code>lib/agent/engineering/runtime.ts</code><span>Continuation and checkpoints</span></li>
              <li><code>lib/agent/engineering/workflow.ts</code><span>Bounded execution lifecycle</span></li>
              <li><code>lib/platform-integration/service.ts</code><span>Versioned adapter boundary</span></li>
              <li><code>tests/workspace-watcher.test.cjs</code><span>Workspace-change evidence</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="development-state" className="ei-codexia-section ei-codexia-section-state">
        <div className="ei-codexia-shell ei-codexia-state-layout">
          <div>
            <SectionHeading
              index="05"
              eyebrow="Current development state"
              title="A real kernel, a bounded integration layer, and an interface system still being built."
            />
            <div className="ei-codexia-state-list">
              {developmentStates.map((state) => (
                <article key={state.label}>
                  <span>{state.label}</span>
                  <h3>{state.title}</h3>
                  <p>{state.body}</p>
                </article>
              ))}
            </div>
          </div>
          <figure className="ei-codexia-codier-card">
            <img src={codierPlanning} alt="Codier mascot planning architecture beside stacked system blocks" />
            <figcaption>
              <span>Codier · Canonical character asset</span>
              <p>A restrained personality layer around the engineering system—not a substitute for operational evidence.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="ei-codexia-section ei-codexia-section-demonstrates">
        <div className="ei-codexia-shell">
          <SectionHeading index="06" eyebrow="What the project demonstrates" title="Product thinking that joins system authority, interaction design and implementation detail." />
          <div className="ei-codexia-demonstrates-grid">
            <p>Translating backend governance into interface hierarchy.</p>
            <p>Designing failure, recovery and verification as first-class product states.</p>
            <p>Separating implementation evidence from visual direction and future intent.</p>
            <p>Building a project-specific visual world without obscuring dense technical work.</p>
          </div>
        </div>
      </section>

      <section id="evidence-boundary" className="ei-codexia-section ei-codexia-section-boundary">
        <div className="ei-codexia-shell ei-codexia-boundary-grid">
          <div>
            <p className="ei-codexia-kicker">Evidence boundary</p>
            <h2>What is shown—and what is not claimed.</h2>
          </div>
          <div>
            <p>Codexia is an independently developed platform in active development. The repository supports claims about its governed local engineering kernel, validated release records and approved design artifacts.</p>
            <p>No public launch, customer adoption, commercial outcome, production deployment, external validation or measured product result is claimed. Phase 9 screens are labelled as implementation targets, not live product captures.</p>
          </div>
        </div>
      </section>

      <section className="ei-codexia-section ei-codexia-next-step">
        <div className="ei-codexia-shell">
          <p className="ei-codexia-kicker">Continue</p>
          <h2>Explore another system, or bring Echo a complex one.</h2>
          <div className="ei-codexia-actions">
            <Button to="/works/lumo" variant="secondary">View Lumo case study</Button>
            <Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button>
          </div>
          <Link to="/works" className="ei-codexia-back-link">View all selected work <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <div className="ei-codexia-project-navigation">
        <ProjectNavigation currentProject="Codexia" />
      </div>
    </article>
  );
}
