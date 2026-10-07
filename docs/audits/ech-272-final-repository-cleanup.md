# ECH-272 — Final repository cleanup report

Date: 8 October 2026  
Project: Echo in Ink — Repository Consolidation & Legacy Cleanup  
Evidence range: `c17bdc95^..4277fc9a` on `main`

## Outcome

The repository cleanup project is complete at the code and browser-verification level. The project removed unreachable modules, obsolete styles and tokens, a duplicate motion implementation, unused assets and dependencies, and competing CSS ownership without changing the reviewed site behaviour.

Across the evidence range, Git records 125 changed files, 511 inserted lines, and 8,611 deleted lines: a net reduction of 8,100 lines. Seventy-three files were deleted outright. Fifty-one of those files were assets totaling 21,240,625 bytes (20.26 MiB) in the checked-out source tree.

The repository gates and the 14-route desktop/mobile Chromium regression matrix pass. Remaining legacy and verification uncertainty is bounded to the explicit REVIEW items below.

## Completed work

| Issue | Commit | Result |
| --- | --- | --- |
| ECH-273 | `c17bdc95` | Restored the repository verification contract: separated application and test TypeScript configuration, repaired test setup and expectations, and made lint, typecheck, tests, and build meaningful gates again. |
| ECH-268 | `b44fadf6` | Removed unreachable modules and pages, pruned dead exports and content, and reduced the motion helper to its live API. |
| ECH-274 | `f7807fcf` | Deleted the second cinematic-motion implementation and moved the one live footer consumer to the canonical helper. |
| ECH-267 | `61555b8a` | Removed dead page/component CSS, the obsolete project-overview stylesheet, and the large backwards-compatibility typography block. |
| ECH-266 | `0d501ac5` | Removed unused design tokens and legacy layout aliases, migrated the remaining consumers, and reduced Tailwind configuration to its live font-family extension. |
| ECH-269 | `ce524723` | Removed 51 zero-reference assets, two unused dependencies, their lockfile/build allow-list entries, and the unused Tailwind animation plugin configuration. |
| ECH-275 | `f4d41ca6` | Consolidated editorial, homepage-action, root-canvas, and box-sizing ownership while preserving computed styles at desktop and mobile widths. |
| ECH-271 | `4277fc9a` | Completed the full regression and architecture review and made the declared Vite build commands use the repository-local SWC native-binding cache. |

## Removed files, components, styles, and assets

### Modules and pages

ECH-268 deleted 18 component modules, the unreachable project-overview page, and its obsolete test:

- four abandoned atmosphere implementations: `AtmospherePause`, `AtmosphericBridge`, `AtmosphericContinuity`, and `AtmosphericSystem`;
- unused card, home, layout, Lumo, section, UI, work-filter, and developer-catalogue modules;
- the unreachable `ProjectOverviewPage` and its test;
- the unused `src/components/system/index.ts` barrel.

The same pass pruned dead exports and unreachable content from archive, identity, services, systems, works, and worlds data; removed the unused page-transition variant; and reduced `src/lib/motion-cinematic.ts` by 477 lines while retaining its live exports.

ECH-274 then deleted `src/system/motion/cinematic.ts` (392 lines), leaving `src/lib/motion-cinematic.ts` as the only cinematic-motion implementation.

### Styles

ECH-267 deleted `src/styles/03-components/project-overview.css` and removed 4,986 lines while adding 152 across the affected style files. The removed rules were tied to deleted or unreachable cards, identity, sessions, worlds, forms, heroes, works, project-overview, and legacy typography surfaces.

ECH-275 removed a further 82 lines of split editorial ownership, deleted overridden homepage button paint rules, moved the winning root canvas to `globals.css`, and removed a redundant local box-sizing declaration. The final values now live with their canonical surface owners rather than depending on import order.

### Assets and dependencies

ECH-269 deleted 51 zero-reference assets totaling 20.26 MiB:

- 6 obsolete brand/logo PNGs;
- 8 locally bundled Neue Montreal OTF files superseded by the current font-loading path;
- 16 unused hero variants;
- 13 unused section images;
- 4 unused Codexia screenshots;
- 3 unused Lumo cloud images;
- 1 unused signature background.

It also removed `tailwindcss-animate`, `@vheemstra/imagemin-avifenc`, the AVIF encoder build allow-list entry, and their transitive lockfile records. The active image-optimisation and Tailwind toolchains remain installed.

## Legacy token migration and deletion

ECH-266 removed 136 lines of unreferenced token declarations from `tokens.css`, including obsolete surface, background, glow, ring, component-semantic, layout, typography-scale, radius, blur, and duration values. It also removed dead layout aliases such as `--ei-page-max-width`, `--ei-page-gutter`, unused high-end numeric spacing values, and the duplicate section-padding alias.

The two live consumers of legacy naming were migrated before deletion:

- the Header border now uses the canonical semantic border token;
- the Orbitals page background now uses the canonical canvas token.

Tailwind's configuration was reduced by 135 lines: unused colour mappings, shadows, gradients, borders, rings, radii, container settings, keyframes, and animation entries were removed. Only the live font-family extension remains, with an empty plugin list after ECH-269.

ECH-267 removed the broad backwards-compatibility typography block after live consumers were migrated or verified absent. Canonical `.ei-type-*` rules and live surface-owned typography remain.

## Consolidations completed

- **Motion:** one canonical implementation in `src/lib/motion-cinematic.ts`; the duplicate `src/system/motion/cinematic.ts` no longer exists.
- **Editorial article styles:** `editorial-archive.css` owns the Archive article primitives formerly split with `design-system.css`.
- **Homepage hero actions:** `home.css` owns the homepage-specific button presentation; `buttons.css` no longer competes for those selectors.
- **Root canvas:** base-layer declarations in `globals.css` own the site background and foreground.
- **Box sizing:** the universal reset in `layout.css` is the sole authored default.
- **Page-specific CSS:** deleted surfaces no longer leave large dormant rule sets in shared bundles.
- **Verification:** lint, typecheck, tests, and production build are declared, reproducible repository commands; browser acceptance is recorded in the ECH-271 audit.

## Retained compatibility and intentional exceptions

The following code was reviewed and retained deliberately:

- `.text-card-body` and `.ei-body-small` remain as grouped typography aliases pending a focused computed-style comparison. No TS/TSX consumer was found, but removal was not folded into regression verification.
- `.ei-gradient-border-btn` remains in `buttons.css` under a temporary-compatibility comment. No TS/TSX consumer was found; it is a bounded deletion candidate.
- `.ei-glow-violet-soft` and `.ei-aurora-cyan-glow` remain in atmosphere/responsive utility selectors. They have no known component consumer but require an atmosphere-utility visual review before removal.
- `--ei-space-1` through `--ei-space-8` remain because current CSS actively references them. Their former compatibility wording was stale; the tokens themselves are not dead.
- Lumo's project-navigation modifier and its mobile override remain because they provide intentional surface and width differences from the shared project navigation.
- `browser-chrome.css` retains `html` and `body` rules for scrollbar, overscroll, viewport-fill, and print responsibilities; these do not compete with root-canvas ownership.
- Tailwind preflight remains enabled. The authored universal box-sizing rule is retained as the project's explicit contract.
- `/archive` remains a live alias of Insights, and `/internal/orbitals` remains a reachable internal visual-reference route. Neither is classified as dead code.

## REVIEW and deferred items

1. Split or otherwise isolate `src/components/orbitals/orbitals.tsx` if a warning-free lint gate is desired; it currently accounts for all 30 Fast Refresh warnings.
2. Align isolated React Router test helpers with the production router's v7 future flags to remove test-run notices.
3. Decide whether Lumo should receive a dedicated mobile hero composition. The current desktop composition is responsive and verified; this is a design/content decision, not cleanup debt.
4. Review the three unconsumed compatibility groups above (`.ei-gradient-border-btn`, atmosphere glow utilities, and typography aliases) with before/after computed-style evidence, then either delete them or document a real external consumer.
5. Move inline environment assignment to a cross-platform wrapper only if native Windows development becomes supported.
6. Complete manual VoiceOver/TalkBack and physical multi-browser checks before public release if those release gates are required. The current evidence covers automated contracts, keyboard behaviour, and responsive Chromium rendering.

## Verification record

At `4277fc9a`:

- `pnpm lint`: pass, 0 errors and 30 known Orbitals Fast Refresh warnings;
- `pnpm typecheck`: pass across application, test, and Node projects;
- `pnpm test`: pass, 17 files and 71 tests;
- `pnpm build`: pass, 587 modules transformed and production chunks rendered;
- `git diff --check`: pass;
- Chromium route matrix: pass on 14 routes at 1440 × 1000 and 390 × 844;
- runtime console: no warnings or errors during the route and interaction traversal;
- navigation, focus recovery, skip-link targets, hero loading, responsive overflow, semantic themes, transitions, and reduced-motion contracts: pass for the reviewed surfaces.

The detailed route matrix, interaction evidence, and limitations are in `docs/audits/ech-271-full-site-regression.md`. The computed-style consolidation evidence is in `docs/audits/ech-275-css-cascade-ownership.md`.

## Recommended repository hygiene rules

1. **Require proof before deletion.** Confirm zero imports/references, route reachability, and dynamic usage; record exceptions instead of guessing.
2. **Keep one owner per concern.** A component or page stylesheet should own its surface. Shared files should contain only genuinely shared primitives, not earlier copies overridden later in the cascade.
3. **Do not add compatibility aliases without an exit condition.** Every new alias should name its consumer, rationale, and removal trigger in a comment or issue.
4. **Treat tokens as an API.** Add a token only with a live semantic use; migrate consumers before removing or renaming it; periodically scan declarations against references.
5. **Keep barrels and helper modules demand-driven.** Do not preserve exports solely for hypothetical reuse. Prefer the canonical import path and remove duplicate implementations.
6. **Audit assets by reference and role.** New responsive or campaign variants should be wired immediately or tracked outside production source; zero-reference binaries should not accumulate in `src/assets`.
7. **Make dependency changes lockfile-complete.** Remove unused packages, plugin configuration, build allow-list entries, and transitive lock records together.
8. **Run the full gate after cleanup batches.** Use `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `git diff --check`; add desktop/mobile browser comparison whenever CSS ownership or visible assets change.
9. **Keep audits reproducible.** Record the commit range, exact commands, route/viewport matrix, measurable reductions, retained exceptions, and missing evidence in `docs/audits`.
10. **Separate cleanup from redesign.** If a proposed deletion changes composition, copy, imagery, or interaction, stop and route it through a design or product decision rather than treating it as repository hygiene.

## Closeout

This report, the ECH-271 regression record, and the ECH-275 cascade-ownership record form the auditable cleanup baseline. Future cleanup should start from the retained-compatibility and REVIEW lists above, not from a fresh repository archaeology pass.
