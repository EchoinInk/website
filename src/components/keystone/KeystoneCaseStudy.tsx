import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { ProjectContext } from "@/components/works/ProjectContext";
import { ProjectNavigation } from "@/components/works/ProjectNavigation";
import { getWorkProject } from "@/data/worksProjects";
import { primaryCallToAction } from "@/data/siteNavigation";

const keystoneProject = getWorkProject("Keystone")!;

const sectionLinks = [
  ["01", "Context", "context"],
  ["02", "Approach", "approach"],
  ["03", "System", "system"],
  ["04", "Prototype state", "prototype-state"],
  ["05", "Evidence boundary", "evidence-boundary"],
] as const;

const decisions = [
  {
    title: "Organise around decisions",
    body: "The workspace starts with what needs attention, not with a wall of undifferentiated reporting.",
    artifact: "Priority model · daily operating view",
  },
  {
    title: "Keep domains distinct",
    body: "Projects, tasks, content and studio signals remain separate views connected by shared context.",
    artifact: "Information architecture · domain map",
  },
  {
    title: "Reveal detail progressively",
    body: "A calm overview leads into focused working surfaces instead of compressing every control into one dashboard.",
    artifact: "Navigation model · disclosure pattern",
  },
  {
    title: "Design state before polish",
    body: "Empty, active, attention and completed states are treated as product structure, not decorative variants.",
    artifact: "State model · interface inventory",
  },
] as const;

const systemLayers = [
  ["Signals", "What needs attention now"],
  ["Work", "Projects, tasks and decisions"],
  ["Publishing", "Content moving through the studio"],
  ["Operations", "Recurring internal responsibilities"],
] as const;

function SectionHeading({
  index,
  eyebrow,
  title,
  body,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <header className="ei-keystone-section-heading">
      <p><span>{index}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="ei-keystone-section-intro">{body}</p> : null}
    </header>
  );
}

function WorkspaceArtifact() {
  return (
    <figure className="ei-keystone-workspace-artifact">
      <div className="ei-keystone-workspace-frame">
        <div className="ei-keystone-workspace-bar">
          <span>Keystone</span>
          <span>Internal system study</span>
        </div>
        <div className="ei-keystone-workspace-body">
          <aside aria-label="Exploratory workspace areas">
            <strong>Control centre</strong>
            <span className="is-active">Overview</span>
            <span>Projects</span>
            <span>Tasks</span>
            <span>Content</span>
            <span>Studio</span>
          </aside>
          <div className="ei-keystone-workspace-main">
            <div className="ei-keystone-workspace-heading">
              <span>Operating view</span>
              <strong>What needs attention?</strong>
            </div>
            <div className="ei-keystone-workspace-grid">
              <div><span>Now</span><strong>Active work</strong><i /></div>
              <div><span>Next</span><strong>Upcoming decisions</strong><i /></div>
              <div><span>Watch</span><strong>Studio signals</strong><i /></div>
            </div>
            <div className="ei-keystone-workspace-lanes">
              <div><span>Priority</span><i /><i /><i /></div>
              <div><span>Projects</span><i /><i /></div>
            </div>
          </div>
        </div>
      </div>
      <figcaption>
        <span>Interface composition study</span>
        <p>A representative control-centre artifact showing hierarchy and information relationships. It is not a live product capture.</p>
      </figcaption>
    </figure>
  );
}

export function KeystoneCaseStudy() {
  return (
    <article className="ei-keystone-case-study" aria-label="Keystone case study content">
      <section className="ei-keystone-hero" aria-labelledby="keystone-heading">
        <div className="ei-keystone-hero-grid" aria-hidden="true" />
        <div className="ei-keystone-shell ei-keystone-hero-layout">
          <div className="ei-keystone-hero-copy">
            <p className="ei-keystone-kicker">Selected work · Internal project</p>
            <h1 id="keystone-heading">A calmer control centre for the work behind the studio.</h1>
            <p className="ei-keystone-hero-lede">
              Keystone is an exploratory internal product study into how projects, tasks, content
              and operational signals might live in one coherent workspace.
            </p>
            <ProjectContext
              classification={keystoneProject.classification}
              capabilities={keystoneProject.capabilities}
              scope={keystoneProject.scope}
              className="ei-keystone-context"
            />
          </div>
          <WorkspaceArtifact />
        </div>
      </section>

      <nav className="ei-keystone-local-nav" aria-label="Keystone case study sections">
        <div className="ei-keystone-shell">
          {sectionLinks.map(([index, label, id]) => (
            <a key={id} href={`#${id}`}><span>{index}</span>{label}</a>
          ))}
        </div>
      </nav>

      <section id="context" className="ei-keystone-section ei-keystone-section-context">
        <div className="ei-keystone-shell">
          <SectionHeading
            index="01"
            eyebrow="Context"
            title="The opportunity was a clearer operating picture—not another busy dashboard."
          />
          <div className="ei-keystone-context-grid">
            <article>
              <h3>Context</h3>
              <p>Studio work spans delivery, planning, publishing and recurring operations. The concept asks how those concerns could be seen together without losing their individual shape.</p>
            </article>
            <article>
              <h3>Problem / opportunity</h3>
              <p>Important work becomes harder to steer when priorities, tasks and signals are distributed across unrelated views. Keystone explores a shared orientation layer for that work.</p>
            </article>
            <article>
              <h3>Constraints</h3>
              <p>Keep dense operational information legible, preserve clear ownership between domains, and avoid presenting speculative automation or placeholder data as working capability.</p>
            </article>
            <article>
              <h3>Echo&apos;s role</h3>
              <p>Product strategy, information architecture, workflow modelling, interface direction and system prototyping for an internal studio concept.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="approach" className="ei-keystone-section ei-keystone-section-approach">
        <div className="ei-keystone-shell">
          <SectionHeading
            index="02"
            eyebrow="Approach and key decisions"
            title="Build the operating model before decorating the dashboard."
            body="The exploration moved from studio questions to domains, states and decision paths, then into a restrained interface language designed for frequent use."
          />
          <div className="ei-keystone-decision-grid">
            {decisions.map((decision, index) => (
              <article key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
                <small>{decision.artifact}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="ei-keystone-section ei-keystone-section-system">
        <div className="ei-keystone-shell">
          <SectionHeading
            index="03"
            eyebrow="System and artifacts"
            title="One orientation layer, with focused working surfaces beneath it."
            body="The system study separates overview from action. The control centre helps someone orient; each domain remains responsible for its own detailed work."
          />
          <div className="ei-keystone-system-map" aria-label="Keystone information architecture">
            <div className="ei-keystone-system-core">
              <span>Shared orientation</span>
              <strong>Control centre</strong>
              <p>Attention · priority · status · next decision</p>
            </div>
            <div className="ei-keystone-system-layers">
              {systemLayers.map(([title, body], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
          <aside className="ei-keystone-artifact-note">
            <strong>Documented artifact set</strong>
            <p>Product framing, domain map, navigation model, interface composition, state inventory and a representative control-centre direction.</p>
          </aside>
        </div>
      </section>

      <section id="prototype-state" className="ei-keystone-section ei-keystone-section-state">
        <div className="ei-keystone-shell ei-keystone-state-grid">
          <div>
            <SectionHeading
              index="04"
              eyebrow="Implementation / prototype state"
              title="A developed product direction, still intentionally exploratory."
            />
          </div>
          <div className="ei-keystone-state-list">
            <article>
              <span>Defined</span>
              <h3>Product and information model</h3>
              <p>The core opportunity, operational domains, hierarchy and navigation direction have been framed.</p>
            </article>
            <article>
              <span>Explored</span>
              <h3>Interface system</h3>
              <p>A project-specific dark workspace language and representative control-centre composition have been developed.</p>
            </article>
            <article>
              <span>Not claimed</span>
              <h3>Working platform</h3>
              <p>No production application, live automation, user validation, commercial deployment or measured operational result is represented.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ei-keystone-section ei-keystone-section-demonstrates">
        <div className="ei-keystone-shell">
          <SectionHeading
            index="05"
            eyebrow="What the project demonstrates"
            title="Strategic product thinking expressed through structure, state and interface."
          />
          <div className="ei-keystone-demonstrates-grid">
            <p>Turning a broad operational ambition into a bounded product concept.</p>
            <p>Designing information architecture for several connected work domains.</p>
            <p>Making dense workspace UI feel calm without hiding necessary complexity.</p>
            <p>Separating demonstrated design work from future implementation intent.</p>
          </div>
        </div>
      </section>

      <section id="evidence-boundary" className="ei-keystone-section ei-keystone-section-boundary">
        <div className="ei-keystone-shell ei-keystone-boundary-grid">
          <div>
            <p className="ei-keystone-kicker">Evidence boundary</p>
            <h2>Exploratory internal work, shown at its actual maturity.</h2>
          </div>
          <div>
            <p>Keystone is an internal concept study. The evidence supports claims about product framing, information architecture, system modelling and interface direction.</p>
            <p>It is not client work and no client, users, launch, revenue, adoption, testimonial, automation capability or measured outcome is claimed. Interface compositions are design artifacts, not live product captures.</p>
          </div>
        </div>
      </section>

      <section className="ei-keystone-section ei-keystone-next-step">
        <div className="ei-keystone-shell">
          <p className="ei-keystone-kicker">Next project</p>
          <h2>Continue to Codexia: a governed engineering platform with implementation evidence.</h2>
          <div className="ei-keystone-actions">
            <Button to="/works/codexia" variant="secondary">View Codexia case study</Button>
            <Button to="/contact?inquiry=project">{primaryCallToAction.label}</Button>
          </div>
          <Link to="/works" className="ei-keystone-back-link">View all selected work <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <div className="ei-keystone-project-navigation">
        <ProjectNavigation currentProject="Keystone" />
      </div>
    </article>
  );
}
