# Echo in Ink website launch-readiness handoff

Status date: 30 September 2026  
Roadmap: Echo in Ink — Website Experience Roadmap (ECH-148–ECH-159)  
Release status: **Blocked pending required manual evidence and production configuration**

## Completed roadmap implementation

The roadmap’s first eleven issues are recorded as Done in Linear:

| Issue   | Completed outcome                                        |
| ------- | -------------------------------------------------------- |
| ECH-148 | Functional accessibility and interaction foundations     |
| ECH-149 | Mobile layout and responsive recomposition               |
| ECH-150 | Content clarity and canonical CTA language               |
| ECH-151 | Homepage proof and buyer clarity                         |
| ECH-152 | Work index and project evidence system                   |
| ECH-153 | Codexia case-study evidence depth                        |
| ECH-154 | Keystone case-study evidence depth                       |
| ECH-155 | Differentiated service pages and evidence                |
| ECH-156 | Project enquiry flow and form states                     |
| ECH-157 | SEO, metadata, font loading and motion performance       |
| ECH-158 | Available cross-browser, responsive and accessibility QA |

ECH-159 adds the bounded funnel instrumentation and documentation in `docs/analytics/funnel-events.md`. Its source implementation is complete, but production measurement remains gated on the `ANALYTICS` binding and deployment verification.

## Automated and available-browser evidence

ECH-158 recorded:

- `npm run typecheck` passed.
- `npm test` passed: 15 files, 62 tests.
- `npm run build` passed.
- `npm run lint` passed with 0 errors and 30 pre-existing Fast Refresh warnings in `src/components/orbitals/orbitals.tsx`.
- `git -c core.fsmonitor=false diff --check` passed.
- Playwright Chrome coverage completed across 12 routes at 320×568, 390×844, 768×1024, 1440×900, and a 640×450 reflow-equivalent viewport.
- Android Chrome emulation and focused native macOS Safari checks passed on the tested journeys.
- No release-blocking defect was found in the tested coverage.

ECH-159 current-checkout validation:

- `npm run typecheck` passed.
- `npm test` passed: 17 files, 68 tests.
- `npm run build` passed: 582 modules transformed.
- `npm run lint` passed with 0 errors and the same 30 pre-existing Fast Refresh warnings in `src/components/orbitals/orbitals.tsx`.
- `git -c core.fsmonitor=false diff --check` passed.
- Headless installed Chrome verified the development event sequence and exact payloads for Home → Work → Lumo → Keystone → Contact form start. Each core view emitted once; project continuation carried Lumo/next attribution and enquiry start carried Keystone/project-to-enquiry attribution.

Historical ECH-158 evidence above is kept separate rather than rewritten as current evidence.

## Known limitations and blocked release evidence

Formal release acceptance remains blocked because the full required matrix has not been evidenced:

- physical iPhone Safari;
- physical Android Chrome;
- Firefox;
- Edge;
- full native Safari route/viewport coverage;
- real browser 200% zoom (the automated check was a reflow equivalent);
- mobile address-bar and software-keyboard dynamic viewport behaviour;
- screen-reader coverage;
- dedicated automated contrast scan.

No live project-enquiry submission was performed during ECH-158. Cloudflare Pages preview does not execute the production contact delivery path, so a controlled deployed-environment submission remains a distinct release check.

Analytics has two additional production gates:

- add the Cloudflare Analytics Engine binding `ANALYTICS` for dataset `echo_funnel` and redeploy;
- verify the allowlisted events in the deployed dataset. Local tests and development console events do not prove production ingestion.

## Deferred business decisions

Public Strategy Session pricing remains a decision gate. No approved price exists in the canonical content; the site correctly says the real fee is confirmed in writing with a proposed time before acceptance. Do not publish a fee, imply reservation, or imply commitment until pricing is explicitly approved.

No client, testimonial, adoption, revenue, launch, or measured-outcome claim should be added without verified evidence and publication approval. The current project provenance and evidence boundaries remain authoritative.

## Launch decision

The implementation is suitable for continued release preparation, but the website is **not formally release-ready** under the roadmap’s evidence standard. Close the gate only after:

1. completing and recording the outstanding browser/device/accessibility checks;
2. configuring and verifying production analytics ingestion;
3. performing an explicitly authorised deployed contact-delivery test;
4. confirming the production branch and deployment configuration still target `main`.

Pricing publication is not a prerequisite for launch; it remains intentionally deferred behind approval.
