import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { ProjectNavigation } from "@/components/works/ProjectNavigation";
import { primaryCallToAction } from "@/data/siteNavigation";
import keystoneLockup from "@/assets/projects/keystone/keystone-lockup.png";

const sectionLinks = [
  ["01", "Opportunity", "opportunity"],
  ["02", "Operating model", "operating-model"],
  ["03", "Orientation", "orientation"],
  ["04", "From direction to prototype", "architecture"],
  ["05", "Evidence", "evidence"]
] as const;

const operatingPicture = [
  [
    "Commitments",
    "What we have committed to, for whom, and when — including the deadlines that shape delivery."
  ],
  [
    "Project state",
    "Where each project stands across delivery, progress, blockers and its next milestone."
  ],
  ["Resourcing", "How people are allocated, where capacity exists, and where it is constrained."],
  [
    "Decisions / Risk",
    "What needs a decision, what is at risk, and what may block progress or affect finances."
  ]
] as const;

const informationModel = [
  ["Projects", "Client work and internal initiatives."],
  ["Workstreams", "Key areas of focus within each project."],
  ["Commitments", "What the studio has agreed to deliver."],
  ["Status", "Current state, progress, deadlines and risk."],
  ["Decisions", "What requires resolution or action next."]
] as const;

const priorities = [
  [
    "What must you know in 10 seconds?",
    "Active projects, critical deadlines, major risks, resourcing health and anything requiring immediate attention."
  ],
  [
    "What indicates risk?",
    "Delayed milestones, resourcing conflicts, blockers, unresolved decisions and financial warnings."
  ],
  [
    "What requires action?",
    "Decisions awaiting input, approaching deadlines, interventions and items explicitly flagged at risk."
  ],
  [
    "What can wait for drill-down?",
    "Detailed tasks, individual notes, project-specific context, deeper resource or financial detail, and non-urgent updates."
  ]
] as const;

const architecture = [
  [
    "01",
    "Product direction",
    "Goals, users, operational problems and success criteria.",
    "Why Keystone exists"
  ],
  [
    "02",
    "Information model",
    "Key entities, relationships, rules and operational states.",
    "What the system understands"
  ],
  [
    "03",
    "Interaction / interface",
    "Navigation, hierarchy, components and interaction patterns shaped around the model.",
    "How people work with it"
  ],
  [
    "04",
    "Prototype direction",
    "A high-fidelity control-centre composition and project-specific interface language.",
    "How the direction is tested"
  ]
] as const;

const principles = [
  ["Reduce noise", "Focus on what matters, remove distractions and avoid unnecessary complexity."],
  [
    "Clarify hierarchy",
    "Create a clear structure for projects, workstreams, commitments and decisions."
  ],
  [
    "Make operational state visible",
    "Surface progress, deadlines, risk and resourcing in a calm, consistent way."
  ],
  [
    "Design for internal use",
    "Shape the concept around the studio’s operating patterns, with adoption and maintainability in mind."
  ]
] as const;

function SectionHeading({
  index,
  eyebrow,
  title,
  body
}: {
  index: string;
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <header className="ei-keystone-section-heading">
      <p>
        <span>{index}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {body ? <p className="ei-keystone-section-intro">{body}</p> : null}
    </header>
  );
}

function KeystoneControlCentre({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`ei-keystone-control-centre${compact ? " is-compact" : ""}`}>
      <div className="ei-keystone-ui-topbar">
        <strong>Keystone</strong>
        <span>Operating view · Prototype</span>
      </div>
      <div className="ei-keystone-ui-body">
        <aside aria-label="Prototype workspace areas">
          <strong>Control centre</strong>
          <span className="is-active">Home</span>
          <span>Projects</span>
          <span>People</span>
          <span>Finances</span>
          <span>Commitments</span>
          <span>Decisions</span>
        </aside>
        <div className="ei-keystone-ui-main">
          <div className="ei-keystone-ui-heading">
            <div>
              <span>Studio overview</span>
              <strong>Good morning.</strong>
            </div>
            <small>Current operating picture</small>
          </div>
          <div className="ei-keystone-ui-metrics">
            <article>
              <b>8</b>
              <span>Active projects</span>
              <small>2 need attention</small>
            </article>
            <article>
              <b>3</b>
              <span>Require action</span>
              <small>Risk or decision</small>
            </article>
            <article>
              <b>12</b>
              <span>Deadlines</span>
              <small>Next 30 days</small>
            </article>
            <article>
              <b>92%</b>
              <span>Resourcing</span>
              <small>Near capacity</small>
            </article>
          </div>
          <div className="ei-keystone-ui-panels">
            <article>
              <div>
                <strong>Current commitments</strong>
                <span>Status</span>
              </div>
              <p>
                <i className="is-blue" />
                Product direction <em>In progress</em>
              </p>
              <p>
                <i className="is-amber" />
                Prototype review <em>Decision due</em>
              </p>
              <p>
                <i className="is-cyan" />
                Studio operations <em>On track</em>
              </p>
            </article>
            <article>
              <div>
                <strong>Upcoming decisions</strong>
                <span>Timing</span>
              </div>
              <p>
                <i className="is-red" />
                Resolve capacity conflict <em>Today</em>
              </p>
              <p>
                <i className="is-amber" />
                Confirm next milestone <em>3 days</em>
              </p>
              <p>
                <i className="is-blue" />
                Review scope <em>1 week</em>
              </p>
            </article>
          </div>
        </div>
      </div>
      {!compact ? (
        <figcaption>
          <span>High-fidelity interface composition</span>
          <p>
            A representative design artifact for testing hierarchy and information relationships —
            not a live product capture.
          </p>
        </figcaption>
      ) : null}
    </figure>
  );
}

function KeystoneOperatingModelDiagram() {
  return (
    <div className="ei-keystone-model" aria-label="Keystone before and after information model">
      <section className="ei-keystone-model-before">
        <header>
          <span>Before</span>
          <p>Information scattered across tools, notes and conversations.</p>
        </header>
        <div className="ei-keystone-fragments" aria-label="Fragmented operating concepts">
          <span>Tools</span>
          <span>Notes</span>
          <span>Projects</span>
          <span>Tasks</span>
          <span>Decisions</span>
        </div>
        <p className="ei-keystone-model-note">
          Duplicated context · unclear relationships · no reliable operating view
        </p>
      </section>
      <div className="ei-keystone-model-shift" aria-hidden="true">
        →
      </div>
      <section className="ei-keystone-model-after">
        <header>
          <span>After</span>
          <p>A clear information model aligned to how the studio actually works.</p>
        </header>
        <div className="ei-keystone-model-chain">
          {informationModel.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              {index < informationModel.length - 1 ? <b aria-hidden="true">→</b> : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function KeystoneEvidencePanel() {
  return (
    <aside className="ei-keystone-evidence-panel" aria-labelledby="keystone-evidence-title">
      <h3 id="keystone-evidence-title">What exists and what’s exploratory</h3>
      <div>
        <span className="is-supported">✓</span>
        <p>
          <strong>Supported</strong>Internal project and product framing
        </p>
      </div>
      <div>
        <span className="is-supported">✓</span>
        <p>
          <strong>Supported</strong>Information architecture and system modelling
        </p>
      </div>
      <div>
        <span className="is-supported">✓</span>
        <p>
          <strong>Supported</strong>High-fidelity interface composition and state direction
        </p>
      </div>
      <div>
        <span>○</span>
        <p>
          <strong>Not evidenced</strong>Working Keystone frontend or data layer
        </p>
      </div>
      <div>
        <span>○</span>
        <p>
          <strong>Not evidenced</strong>Internal usage, user validation or production deployment
        </p>
      </div>
    </aside>
  );
}

export function KeystoneCaseStudy() {
  return (
    <article className="ei-keystone-case-study" aria-label="Keystone case study content">
      <section className="ei-keystone-hero" aria-labelledby="keystone-heading">
        <div className="ei-keystone-hero-grid" aria-hidden="true" />
        <div className="ei-keystone-shell ei-keystone-hero-layout">
          <div className="ei-keystone-hero-copy">
            <img
              className="ei-keystone-brand-lockup"
              src={keystoneLockup}
              alt="Keystone Studio Operations System"
            />
            <p className="ei-keystone-kicker">Case study · Keystone</p>
            <h1 id="keystone-heading">A calmer control centre for the work behind the studio.</h1>
            <p className="ei-keystone-hero-lede">
              Keystone is an internal operating-platform concept for the studio, designed to bring
              clarity across commitments, project state, finances, resourcing, blockers, deadlines
              and decisions — in one coherent view.
            </p>
            <dl className="ei-keystone-meta">
              <div>
                <dt>Provenance</dt>
                <dd>Internal project</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Exploratory / high-fidelity prototype</dd>
              </div>
              <div>
                <dt>Evidence</dt>
                <dd>Product model and interface composition</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Operational clarity and decision-making</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>Projects, resourcing, finances, commitments, risk</dd>
              </div>
            </dl>
          </div>
          <KeystoneControlCentre />
        </div>
      </section>

      <nav className="ei-keystone-local-nav" aria-label="Keystone case study sections">
        <div className="ei-keystone-shell">
          {sectionLinks.map(([index, label, id]) => (
            <a key={id} href={`#${id}`}>
              <span>{index}</span>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="opportunity" className="ei-keystone-section ei-keystone-section-opportunity">
        <div className="ei-keystone-shell">
          <div className="ei-keystone-split-heading">
            <SectionHeading
              index="01"
              eyebrow="Opportunity"
              title="The opportunity was a clearer operating picture — not another busy dashboard."
            />
            <p>
              An operating picture is a single, reliable view of what the studio is committed to,
              how work is progressing, where capacity is constrained, what is at risk, which
              deadlines are approaching, and where decisions are required. The goal is not more
              information — it is better orientation.
            </p>
          </div>
          <div className="ei-keystone-picture-grid">
            {operatingPicture.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="operating-model" className="ei-keystone-section ei-keystone-section-model">
        <div className="ei-keystone-shell">
          <div className="ei-keystone-split-heading">
            <SectionHeading
              index="02"
              eyebrow="Operating model"
              title="Build the operating model before decorating the dashboard."
            />
            <p>
              We mapped the studio’s operating concepts, clarified their relationships, and defined
              how information moves before designing an interface. The result is a system shaped by
              the work — system before surface.
            </p>
          </div>
          <KeystoneOperatingModelDiagram />
        </div>
      </section>

      <section id="orientation" className="ei-keystone-section ei-keystone-section-orientation">
        <div className="ei-keystone-shell">
          <div className="ei-keystone-split-heading">
            <SectionHeading
              index="03"
              eyebrow="Orientation layer"
              title="One orientation layer, with focused working surfaces beneath it."
            />
            <p>
              The control centre provides a high-level orientation layer, with focused surfaces for
              deeper work. Its first job is to clarify what is happening, what needs attention, and
              where to go next.
            </p>
          </div>
          <div className="ei-keystone-orientation-layout">
            <KeystoneControlCentre compact />
            <div className="ei-keystone-priority-list">
              {priorities.map(([title, body], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="ei-keystone-section ei-keystone-section-architecture">
        <div className="ei-keystone-shell">
          <div className="ei-keystone-split-heading">
            <SectionHeading
              index="04"
              eyebrow="From direction to prototype"
              title="A product system built in a deliberate sequence."
            />
            <p>
              Each layer sets the conditions for the next. Product intent shapes the model; the
              model shapes interaction; the interface becomes a way to test the direction without
              overstating platform maturity.
            </p>
          </div>
          <ol className="ei-keystone-architecture-flow">
            {architecture.map(([number, title, body, outcome]) => (
              <li key={title}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <small>{outcome}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ei-keystone-section ei-keystone-section-principles">
        <div className="ei-keystone-shell">
          <SectionHeading
            index="05"
            eyebrow="Strategic thinking"
            title="Strategic product thinking for a calmer, more effective studio."
          />
          <div className="ei-keystone-principles-grid">
            {principles.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="evidence" className="ei-keystone-section ei-keystone-section-evidence">
        <div className="ei-keystone-shell ei-keystone-evidence-layout">
          <div>
            <p className="ei-keystone-kicker">06 · Exploratory work</p>
            <h2>Exploratory internal work, shown at its actual maturity.</h2>
            <p className="ei-keystone-evidence-copy">
              Keystone is an internal exploratory project developed far enough to test its operating
              model, information architecture, interface hierarchy and visual direction. It is shown
              as evidence of product and systems thinking — not as a working or finished production
              platform.
            </p>
            <p className="ei-keystone-evidence-boundary">
              No client, live data layer, internal adoption, user validation, automation capability,
              production deployment or measured operational result is claimed.
            </p>
          </div>
          <KeystoneEvidencePanel />
        </div>
      </section>

      <section className="ei-keystone-section ei-keystone-next-step">
        <div className="ei-keystone-shell">
          <p className="ei-keystone-kicker">Next project</p>
          <h2>
            Continue to Codexia: a governed engineering platform with implementation evidence.
          </h2>
          <div className="ei-keystone-actions">
            <Button to="/works/codexia" variant="secondary">
              View Codexia case study
            </Button>
            <Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button>
          </div>
          <Link to="/works" className="ei-keystone-back-link">
            View all selected work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <div className="ei-keystone-project-navigation">
        <ProjectNavigation currentProject="Keystone" />
      </div>
    </article>
  );
}
