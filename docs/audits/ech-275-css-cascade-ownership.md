# ECH-275 — Live CSS cascade ownership

Date: 7 October 2026

## Method

The live Vite application was captured before and after the consolidation in headless Chromium at 1440 × 1000 and 390 × 844. The capture covered the Archive editorial article, homepage hero, header, footer, and the Lumo, Keystone, and Codexia case studies.

For every target element the comparison recorded its bounding rectangle plus these computed values: display, position, box sizing, width constraints, minimum height, margins, padding, gap, grid columns, overflow, background, borders, radius, shadow, colour, font properties, opacity, filter, transform, transition, outline, and outline offset.

All stable values and element geometry matched before and after. The only raw snapshot differences were the header's opacity and translate values while its entrance animation was in progress; captures sampled that animation at slightly different milliseconds. No static header property changed.

## Ownership changes

### Editorial article primitives

Old owner: `src/styles/03-components/design-system.css`

Canonical owner: `src/styles/03-components/editorial-archive.css`

The editorial layout is used by the Archive essay and its final visual rules already lived in the Archive stylesheet. Properties that still contributed to the computed result were migrated property-by-property:

- layout top padding;
- title text wrapping;
- subtitle italic style;
- metadata top margin;
- lead borders and inherited typography;
- grid positioning and top padding;
- body typography;
- aside width, margin, and colour;
- footer block padding.

The earlier header spacing, eyebrow/metadata typography, and duplicated title/subtitle/lead/grid/body values were removed because the later Archive rules fully overrode them. This removes 82 lines of split ownership while preserving the final cascade.

### Homepage hero buttons

Old owner: `src/styles/03-components/buttons.css`

Canonical owner: `src/styles/03-components/home.css`

The earlier primary and secondary paint, hover, border, and shadow declarations were removed. The later homepage declarations already supplied the winning normal, hover, and focus-visible values. The only contributing rule in the earlier block—the ≤389px action gap and full-width buttons—was moved unchanged to `home.css`.

### Root canvas

Old owner: `src/styles/03-components/design-system.css`

Canonical owner: `src/styles/globals.css` in the base layer

The winning canvas background and body foreground were moved to the existing root declarations. The later component-layer `html`, `body`, and `#root` patch was then removed. Browser-specific overscroll, viewport-fill, print, and scrollbar declarations remain in `browser-chrome.css` because they are separate responsibilities rather than competing ownership.

### Box sizing

Canonical owner: the universal reset in `src/styles/02-base/layout.css`

The local `box-sizing: border-box` on `.ei-home-engagement > a` was removed because the universal reset supplies the identical computed value. The universal rule remains explicit in the layout base; no page-specific substitute was introduced.

## Duplicates intentionally retained

- `.ei-lumo-project-navigation` has one base modifier in `lumo.css`, not duplicated base selectors. It intentionally overrides the shared `.ei-project-navigation` surface with Lumo border, background, radius, width, and margin values.
- The `.ei-lumo-project-navigation` occurrence inside the ≤640px grouped selector is a responsive width override (`calc(100% - 1rem)`). Removing or merging it into the desktop rule would change mobile layout.
- `html` and `body` rules in `browser-chrome.css` remain for scrollbar, overscroll, viewport-fill, and print contexts. They do not duplicate the canonical site canvas responsibility.
- Tailwind's generated preflight also normalises box sizing. The authored layout reset remains the project-level contract; changing preflight configuration is outside this cleanup pass and would broaden risk.

## Before/after evidence

| Surface | Desktop | Mobile | Result |
| --- | --- | --- | --- |
| Archive editorial article | 1440 × 1000 | 390 × 844 | Geometry and recorded computed properties unchanged |
| Homepage hero and both actions | 1440 × 1000 | 390 × 844 | Geometry and recorded computed properties unchanged |
| Header | 1440 × 1000 | 390 × 844 | Static properties unchanged; only capture-time animation progress varied |
| Footer | 1440 × 1000 | 390 × 844 | Geometry and recorded computed properties unchanged |
| Lumo case study and project navigation | 1440 × 1000 | 390 × 844 | Geometry and recorded computed properties unchanged |
| Keystone case study | 1440 × 1000 | 390 × 844 | Geometry and recorded computed properties unchanged |
| Codexia case study | 1440 × 1000 | 390 × 844 | Geometry and recorded computed properties unchanged |

Representative preserved computed values:

- Archive editorial layout: `padding-top: 160px` and `background-color: rgb(252, 250, 255)` at desktop.
- Homepage primary hero action: `background-color: rgb(105, 84, 198)`, transparent 1px border, white text, and the same 16px/42px shadow at desktop.
- Lumo project navigation: 1408px desktop width, 16px margin, 16px radius, Lumo border/background, and the shared two-column grid.
- Root canvas: `html`, `body`, and `#root` retained the same resolved canvas background and foreground on every captured route.

Keyboard focus was checked by programmatically focusing the homepage primary action. It remained the active element with a 3px solid white outline and the same shadow. With reduced motion enabled, the media query matched and the action transition resolved to 0.01ms. With normal motion it remained 0.5s. The homepage retained its `light` document theme and all six sampled `soft`, `chapter`, and `atmospheric` transition sections remained rendered with their semantic `light`, `lightElevated`, and `mist` themes.

## Verification

- `pnpm lint`: passed with 0 errors and 30 existing `react-refresh/only-export-components` warnings in `src/components/orbitals/orbitals.tsx`.
- `pnpm typecheck`: passed.
- `pnpm test`: passed, 17 files and 71 tests.
- `pnpm build`: passed; 587 modules transformed and image optimisation completed.
- `git diff --check`: passed.

The initial parallel lint invocation collided with Vite's transient timestamped config file while the build was running. Lint was rerun independently and passed; this was an execution race rather than a source diagnostic.
