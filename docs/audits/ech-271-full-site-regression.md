# ECH-271 — Full site regression and architecture verification

Date: 8 October 2026

## Outcome

The cleanup baseline passes the repository and browser acceptance gates. No current site-behaviour regression was found across the required routes. One verification-gate defect was found and fixed: the production build did not use the repository-local SWC native-binding cache already required by the test command, so the declared `pnpm build` command failed in the managed development environment before Vite could load its config.

The cleanup is architectural rather than behavioural: the preceding cleanup commits remove unreachable modules, redundant motion code, legacy tokens and Tailwind configuration, dead CSS, unused dependencies/assets, and competing cascade ownership. The live route, semantic-theme, responsive, interaction, hero, navigation, footer, transition, and motion contracts remain present after those removals.

## Repository gates

| Gate | Result | Evidence |
| --- | --- | --- |
| `pnpm lint` | Pass with warnings | 0 errors; 30 `react-refresh/only-export-components` warnings in the internal Orbitals catalogue. |
| `pnpm typecheck` | Pass | Application, test, and Node TypeScript projects pass. |
| `pnpm test` | Pass | 17 files and 71 tests. React Router emits its expected v7 future-flag notices from isolated test routers. |
| `pnpm build` | Pass after fix | 587 modules transformed; production chunks rendered; image optimisation completed. |
| `git diff --check` | Pass | No whitespace errors. |

### Build regression fixed

`pnpm test` already set `SWC_NATIVE_BINDING_CACHE="$PWD/.cache/swc-native"`, while the two Vite build scripts did not. Both direct attempts to run the declared `pnpm build` failed with `Failed to load native binding`. Running the same build with the repository-local cache passed. The `build` and `build:dev` scripts now use the same local cache contract, making the declared production gate reproducible without changing application output.

## Browser method

The local Vite application was exercised in Chromium at 1440 × 1000 and 390 × 844. Each route was required to expose a visible `main#main-content`, an H1 and document title, the shared header and footer, a loaded hero image where the route owns one, and a document width no greater than the viewport. The run also recorded semantic themes and transition markers and reviewed browser warnings/errors.

## Route coverage

| Surface | Route | Desktop | Mobile | Hero / notes |
| --- | --- | --- | --- | --- |
| Home | `/` | Pass | Pass | Desktop and mobile WebP sources load; 6 atmospheric transition boundaries. |
| Studio | `/studio` | Pass | Pass | Desktop and mobile PNG sources load; 4 transition boundaries. |
| Services | `/services` | Pass | Pass | Desktop and mobile PNG sources load; 4 transition boundaries. |
| Works | `/works` | Pass | Pass | Desktop and mobile PNG sources load; 5 transition boundaries. |
| Lumo | `/works/lumo` | Pass | Pass | The current implementation intentionally uses one desktop composition at both widths. |
| Keystone | `/works/keystone` | Pass | Pass | Current lockup loads at both widths. |
| Codexia | `/works/codexia` | Pass | Pass | Current SVG brand hero loads at both widths. |
| Contact | `/contact` | Pass | Pass | Desktop and mobile PNG sources load; validation/focus recovery passes. |
| Booking | `/booking` | Pass | Pass | Text-led hero; staged request validation/focus recovery passes. |
| Insights | `/insights` | Pass | Pass | Desktop and mobile PNG sources load; 5 transition boundaries. |
| Archive alias | `/archive` | Pass | Pass | Shares the current Insights implementation and canonical content. |
| Editorial essay | `/archive/atmosphere-is-information` | Pass | Pass | Desktop and mobile WebP sources load. |
| Studio notes | `/archive/notes` | Pass | Pass | Desktop and mobile WebP sources load. |
| Archive index | `/archive/map` | Pass | Pass | Desktop and mobile WebP sources load. |

No route produced horizontal document overflow. Decorative elements that intentionally extend beyond their local boxes remain clipped by their owning compositions and do not expand the document canvas.

## Behaviour and architecture checks

### Console and runtime

- No browser console warnings or errors were recorded while traversing the complete route matrix and exercising the tested interactions.
- Every observed hero image completed with a non-zero natural width.
- Header and footer were present on every route.

### Responsive navigation and accessibility-critical interactions

- At 390px the header exposes an `Open navigation menu` control with `aria-expanded="false"`.
- Opening the menu sets `aria-expanded="true"`, exposes a dialog, and locks body scrolling.
- Escape closes the menu, restores body scrolling, and returns focus to the menu trigger.
- Contact invalid submission marks Name, Email, and Message with `aria-invalid="true"`, associates descriptions, announces the error, and focuses Name.
- Booking timing validation marks Preferred week and Timezone invalid, associates descriptions, announces the error, and focuses Preferred week.
- The skip link targets `#main-content`, which exists on every reviewed route.

### Semantic themes and atmospheric transitions

- The light editorial/commercial pages retain their intended combinations of `light`, `lightElevated`, `mist`, and `deep` semantic themes.
- Lumo, Keystone, and Codexia retain their deep case-study themes.
- Home, Studio, Services, Works, Contact, Insights, and Archive retain their authored transition markers; the shared `Section` primitive still owns transition type, target, direction, and motif data attributes.
- Case-study and editorial-detail pages without shared transition markers retain their bespoke continuous compositions; their absence is intentional rather than a missing runtime primitive.

### Motion and reduced motion

- Normal-motion presentation is active in the browser run; the fixed header resolves to full opacity with no residual transform after entry.
- The shared page transition, header, footer, heroes, cards, CTA sections, and motion-heavy pages use `useReducedMotion` or explicit `prefers-reduced-motion` handling.
- The global accessibility stylesheet and page-specific styles remove or collapse non-essential animation under reduced motion.
- Automated coverage verifies reduced-motion behaviour for navigation and immediate Booking content presentation.

## Regressions found and fixed

1. **Production build command could not load SWC in the managed environment.** Fixed by applying the existing repository-local SWC cache contract to `build` and `build:dev`. No runtime or generated-site behaviour changed.

No visual, responsive, routing, navigation, footer, semantic-theme, transition, motion, hero, or accessibility interaction regression required an application-code fix.

## Deferred REVIEW items

- The internal `/internal/orbitals` catalogue produces 30 Fast Refresh warnings because one file exports many components. It has no lint errors and is intentionally retained as a visual reference surface, but splitting the catalogue would make the lint gate warning-free.
- Unit tests that construct isolated React Router instances still emit v7 future-flag notices. The production router already enables both future flags; test helpers can be aligned in a separate maintenance pass.
- The Lumo case study uses its desktop hero composition at mobile widths. It is responsive and does not overflow, but a dedicated mobile source was removed as unused. Reintroducing one would be a design/content decision, not a regression fix.
- The build is shell-portable for the repository's current macOS/Linux workflow. If native Windows command execution becomes a supported development environment, the inline environment assignment should move to a cross-platform wrapper.
- Manual assistive-technology and physical-device checks remain appropriate before a public release. This pass covers browser semantics, keyboard behaviour, responsive Chromium rendering, and automated contracts; it is not evidence for VoiceOver/TalkBack or multiple physical browsers.

## Remaining legacy code

- `.ei-gradient-border-btn` remains in `buttons.css` under a temporary-compatibility comment, but no TS/TSX consumer was found. It remains only to avoid broadening this regression issue into another deletion pass and should be reviewed for removal.
- `.ei-glow-violet-soft` and `.ei-aurora-cyan-glow` remain in `atmosphere.css` and responsive utility selectors, but no component consumer was found. They are retained pending an explicit atmosphere-utility cleanup review.
- `.text-card-body` and `.ei-body-small` remain grouped with canonical typography selectors as compatibility aliases. No component consumer was found; they should be removed only with a focused computed-style comparison.
- Numeric `--ei-space-1` through `--ei-space-8` tokens remain actively referenced throughout current CSS. Despite the old compatibility wording in `layout.css`, they are live tokens and cannot be classified as removable legacy.
- `/internal/orbitals` and its multi-export catalogue remain reachable by design as an internal visual reference route. They are not dead production-route dependencies, but they are the source of the lint warnings noted above.

## Conclusion

The repository is release-testable after cleanup. The removals materially improve source hygiene and ownership while the current site continues to satisfy the reviewed behaviour contracts. Remaining uncertainty is bounded to the explicit REVIEW items above rather than an observed user-facing regression.
