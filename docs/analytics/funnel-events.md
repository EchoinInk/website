# Funnel analytics

## Architecture

Echo in Ink uses one first-party funnel event path:

1. `FunnelAnalytics` and the contact form call `trackFunnelEvent`.
2. Development builds emit `echo:analytics` browser events and log the same payload to the console.
3. Production builds send the payload to `/api/analytics`.
4. The Pages Function validates a closed event/property allowlist and writes one data point to the Cloudflare Analytics Engine binding named `ANALYTICS`.

Cloudflare Web Analytics may still be enabled at the deployment layer for aggregate page and performance measurement. It is not duplicated in source and, because it does not support custom events, it is not used as the funnel-event transport.

## Event map

| Event            | Emission point                              | Meaning                                      | Optional dimensions                            |
| ---------------- | ------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| `home_view`      | `FunnelAnalytics` on `/`                    | Home route viewed                            | None                                           |
| `work_view`      | `FunnelAnalytics` on `/works`               | Work index viewed                            | None                                           |
| `project_view`   | `FunnelAnalytics` on a public project route | Lumo, Keystone or Codexia viewed             | `project`; project-continuation attribution    |
| `enquiry_start`  | First non-honeypot contact-form change      | A visitor began the project enquiry form     | project-to-enquiry attribution                 |
| `enquiry_submit` | After `/api/contact` confirms delivery      | A project enquiry was successfully delivered | form-completion and retained entry attribution |

Events are emitted once per meaningful boundary. Validation errors and failed submissions do not count as completion. The honeypot cannot start the funnel.

Project transitions use ephemeral `sessionStorage` attribution. A project-to-project click is attached to the destination `project_view`; a project-to-enquiry click is attached to the next `enquiry_start`. This avoids adding extra event names or double-counting views.

## Data contract and privacy

The endpoint accepts only:

- the five event names above;
- six public paths (`/`, `/works`, the three public project paths, and `/contact`);
- the three public project slugs;
- three journey labels and previous/next direction.

It rejects unrecognised values and cross-origin requests. It does not accept form values, names, email addresses, project descriptions, URLs, query strings, cookies, persistent visitor IDs, fingerprints, IP-derived dimensions, referrers, or user-agent values. Attribution is session-only and is consumed once.

Analytics Engine columns are stable and ordered:

| Column    | Value                           |
| --------- | ------------------------------- |
| `index1`  | Request hostname (sampling key) |
| `blob1`   | Event name                      |
| `blob2`   | Current path                    |
| `blob3`   | Current project                 |
| `blob4`   | Source project                  |
| `blob5`   | Source path                     |
| `blob6`   | Journey                         |
| `blob7`   | Direction                       |
| `double1` | Count (`1`)                     |

Because the implementation is anonymous, aggregate, first-party, and does not use cookies or personal data, it does not introduce a new consent prompt. Reassess that conclusion before adding any identifier, free-text field, advertising use, third-party tracker, or cross-session attribution.

## Deployment gate

In each Cloudflare Pages environment that should record events, add an Analytics Engine binding:

- variable name: `ANALYTICS`
- dataset: `echo_funnel`

Redeploy after adding the binding. Pages cannot use Analytics Engine bindings locally. Without the binding the endpoint returns `503` and no production event is recorded; this is deliberately visible rather than falsely reporting success.

An example aggregate query is:

```sql
SELECT
  blob1 AS event,
  blob2 AS path,
  blob3 AS project,
  blob6 AS journey,
  SUM(_sample_interval) AS events
FROM echo_funnel
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY event, path, project, journey
ORDER BY events DESC
```

## Verification workflow

For local development, open the browser console and follow the core routes. Each event appears once as `[analytics]` with its payload. For a structured view, register:

```js
window.addEventListener("echo:analytics", (event) => console.table(event.detail));
```

Verify:

1. `/` emits `home_view` once.
2. `/works` emits `work_view` once.
3. Each public case study emits one `project_view` with the correct project.
4. Previous/next project navigation adds `project_continuation`, source project/path and direction to the destination `project_view`.
5. Starting the project form emits `enquiry_start` once. A project-origin journey includes `project_to_enquiry` attribution.
6. Client or server validation errors do not emit `enquiry_submit`.
7. A confirmed delivery emits `enquiry_submit` once with `form_completion`.
8. After deployment, repeat the non-submit events and confirm rows in `echo_funnel`. Use a controlled test enquiry only when live form delivery testing is explicitly authorised.
