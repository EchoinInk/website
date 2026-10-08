# Echo in Ink — Section Transition System

## Purpose

The section transition system creates continuity between page sections without turning each section into a separate visual block. Transitions should feel like changes in atmosphere, pace, or chapter within one continuous environment.

This specification governs the core transition language for the homepage and should guide future Studio, Services, Work, Insights, and case-study pages.

> The page is one continuous environment. Sections change the atmosphere within it.

Transitions are compositional tools, not decoration. Use them to control page rhythm, direct visual energy, and prepare the reader for what follows.

## Core principles

- The outgoing `Section` owns the transition into the next section.
- The transition must serve the relationship between two sections, not either section in isolation.
- `light`, `lightElevated`, and `mist` are variations of the same base light canvas. Moving between them should feel continuous, not like changing to a new page background.
- Atmospheric colour should feather into the canvas. It must not resolve into a stripe, divider, or glowing bar.
- Strong transitions need quiet space around them. Do not apply the most expressive treatment at every boundary.
- Section content remains primary. Transition layers sit behind real content and must never reduce legibility or interaction clarity.

## Architecture

Transitions are declared on the outgoing `Section`:

```tsx
<Section
  theme="mist"
  transition="atmospheric"
  transitionTo="lightElevated"
  transitionDirection="forward"
>
  {/* Section content */}
</Section>
```

This means the current section uses the `mist` theme and creates a forward atmospheric transition into the following `lightElevated` section.

### Props

| Prop                  | Purpose                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `theme`               | Defines the visual environment of the current section.                                                                                     |
| `transition`          | Defines the treatment of the boundary after the current section. Core values are `atmospheric`, `soft`, and `chapter`; omit it for `none`. |
| `transitionTo`        | Defines the destination canvas that the transition must resolve into. It should match the following section's theme.                       |
| `transitionDirection` | Defines the directional flow of an atmospheric transition: `forward` or `reverse`.                                                         |

`transitionTo` controls colour resolution, while `transition` controls the character and depth of the boundary. They are complementary, not interchangeable.

`transitionDirection` is meaningful for `atmospheric`. Do not add a direction to quiet transitions merely for API consistency.

### Ownership rule

Place transition props on the section that is ending:

```tsx
<Section
  theme="light"
  transition="soft"
  transitionTo="lightElevated"
>
  {/* Outgoing content */}
</Section>

<Section theme="lightElevated">
  {/* Incoming content */}
</Section>
```

Do not place the transition on the incoming section. This keeps the boundary's intent readable in source order and allows the outgoing section's pseudo-elements to bridge both canvases.

### Canvas family

`light`, `lightElevated`, and `mist` share the base light canvas:

- `light` is the default open canvas.
- `lightElevated` adds subtle tonal lift or separation.
- `mist` introduces a slightly more atmospheric light field.

These themes create nuance within one environment. They share the same base canvas specifically to prevent section boundaries from resolving into horizontal bands. A transition between them should preserve continuity; it should not expose a hard seam or imply unrelated surfaces.

## Transition types

### Atmospheric

Use `atmospheric` for a meaningful transfer of energy or emphasis between sections.

> **Atmospheric = Soft Mist Bleed + Directional Flow**

This is the original and canonical atmospheric concept: a hybrid in which mist and flow occupy distinct geometries. It is not one general-purpose collection of overlapping glows.

Its composition has two layers with separate jobs:

- `::after` is the broad, irregular atmospheric mist field. Its taller, asymmetric geometry supplies depth, tonal spread, and a soft cross-boundary bleed.
- `::before` is the elongated directional current. It is built from a sequence of narrow `radial-gradient` fields placed along a curved trajectory. It is not a generic second set of glow pools, and it is not the abandoned `linear-gradient` ribbon approach.

The two layers intentionally stack across the adjoining section canvas, with masks and feathered edges preventing a rectangular or banded result. Real content on both sides stays above all decoration.

```tsx
<Section
  theme="mist"
  transition="atmospheric"
  transitionDirection="forward"
  transitionTo="lightElevated"
>
```

- `forward` reads left to right.
- `reverse` reads right to left.

Forward and reverse use the same mist-and-elongated-flow visual language. `--ei-atmosphere-direction` controls horizontal mirroring rather than introducing a separate reverse design. Direction should respond to page composition and visual momentum; mechanical alternation is not a rule.

The reverse boundary from Ways to Engage into Our Approach may retain a stronger mist composition. It is intentionally the more forceful atmospheric crossing, while the directional current remains part of the same system.

The closing atmospheric treatment uses the existing `ei-transition-closing` class. It is a reduced-intensity final echo built from the same elongated-flow language: faint, restrained, and less visually forceful than the primary atmospheric crossings. It must not revert to generic glow pools merely because its intensity is lower.

### Chapter

Use `chapter` when the page remains continuous but the subject or mode of reading changes. It creates an editorial pause rather than a visual event.

Chapter transitions should be quiet, shallow, and structurally clear. They are appropriate between distinct ideas that still belong to the same journey.

```tsx
<Section
  theme="lightElevated"
  transition="chapter"
  transitionTo="light"
>
```

### Soft

Use `soft` for recovery after a visually or conceptually strong section. It should gently settle into the destination canvas without calling attention to the boundary.

```tsx
<Section
  theme="mist"
  transition="soft"
  transitionTo="lightElevated"
>
```

Soft transitions are useful when continuity matters more than direction and the following section needs breathing room.

### None

Use `none` when no treatment is needed. In the current implementation, `none` means omitting `transition`, `transitionTo`, and `transitionDirection`; it is not a literal `transition="none"` value.

```tsx
<Section theme="light">{/* No transition treatment */}</Section>
```

This is the correct choice for boundaries that are already resolved by spacing, page completion, or a shared canvas—especially Closing to Footer.

## Decision rule

Choose the transition by asking what the boundary must do:

| Boundary intent | Transition    |
| --------------- | ------------- |
| Energy          | `atmospheric` |
| Continuity      | `chapter`     |
| Recovery        | `soft`        |
| Nothing         | `none`        |

If more than one intent seems plausible, choose the quieter treatment. Atmospheric transitions should remain scarce enough to retain meaning.

## Homepage reference rhythm

The homepage is the canonical example of how transition intensity is composed across a full page.

| Boundary                           | Treatment                                  | Direction | Purpose                                                                                     |
| ---------------------------------- | ------------------------------------------ | --------- | ------------------------------------------------------------------------------------------- |
| Selected Work → Areas of Practice  | `atmospheric`                              | `forward` | Expressive. Carries momentum from project evidence into the breadth of the practice.        |
| Areas of Practice → Ways to Engage | `chapter`                                  | —         | Quiet. Marks an editorial change from capabilities to engagement models.                    |
| Ways to Engage → Our Approach      | `atmospheric`                              | `reverse` | Expressive and stronger. Builds renewed energy before the primary dark-panel visual moment. |
| Our Approach → Kind Words          | `soft`                                     | —         | Recovery. Releases intensity and creates room for quieter evidence.                         |
| Kind Words → Closing CTA           | `atmospheric` with `ei-transition-closing` | `forward` | Faint final echo. Carries residual atmosphere into the call to action.                      |
| Closing CTA → Footer               | `none`                                     | —         | Calm. Lets the page resolve without another effect.                                         |

The intended intensity sequence is:

> **Strong → Quiet → Strong → Quiet → Final Accent → Calm**

This sequence is more important than repeating a particular visual pattern. Future pages may use fewer transitions, but should preserve contrast between expressive and quiet boundaries.

## Applying the system to other pages

Start by mapping the page's narrative beats, then assign transitions to relationships between those beats.

- **Studio:** use a chapter transition when moving from point of view to process; reserve atmosphere for a major proof or invitation moment.
- **Services:** use chapters between service architecture and engagement detail; use a soft transition after dense comparison or delivery content.
- **Work:** use atmosphere sparingly around a featured project or shift into a curated body of evidence. Avoid placing it between every project card group.
- **Insights:** favour chapter and soft transitions to protect reading focus. Atmospheric treatments belong only at major editorial thresholds.
- **Case studies:** align transitions with the story arc—context, challenge, decisions, outcome, reflection. Do not use effects to compensate for weak hierarchy or missing evidence.

For every page, read the sequence at full length. A transition that works in isolation may still make the complete page feel repetitive.

## Common failure modes

### Horizontal bands

**Symptom:** the atmosphere reads as a uniform coloured strip across the viewport.

**Causes:** insufficient height, symmetrical gradient placement, a continuous linear wash, glow pools with indistinct roles, or mist constrained too tightly to the boundary.

**Correction:** keep `light`, `lightElevated`, and `mist` on the shared base canvas; restore a taller, irregular mist field; use masks and feathered edges; allow the composition to extend beyond the viewport; and keep the narrower elongated radial-gradient current visibly distinct from the mist.

### Hard seams

**Symptom:** the end of one background and the start of the next are visibly separated.

**Causes:** an incorrect `transitionTo`, mismatched destination theme, clipped pseudo-elements, or an opaque stop that resolves too early.

**Correction:** match `transitionTo` to the following section, feather the final colour into the destination canvas, stack transition layers across the adjoining section canvas, and verify that content remains above all decoration.

### Overuse

**Symptom:** every section boundary glows, the page loses hierarchy, or atmosphere becomes the content.

**Causes:** treating transitions as decoration, applying the same intensity repeatedly, or using atmosphere where spacing would be sufficient.

**Correction:** return to the decision rule, remove unnecessary treatments, and restore alternation between strong and quiet moments.

### Direction without intent

**Symptom:** forward and reverse directions alternate mechanically or fight the composition of adjacent content.

**Correction:** choose direction from the visual weight, imagery, and desired momentum of the two sections. Repetition is acceptable when it produces a more coherent flow.

### Canvas mismatch

**Symptom:** the transition lands in a colour that does not match the next section.

**Correction:** treat `transitionTo` as a contract with the incoming section. Update both together whenever a theme changes.

## Responsive guidance

- Preserve the transition's intent and asymmetry at every breakpoint; do not attempt to preserve desktop dimensions exactly.
- The current implementation keeps the full atmospheric geometry through the 768–1000px middle zone, while decorative node motifs are removed below 900px so they do not compete with reflowed content.
- Below 768px, soft and chapter fades reduce to 6–6.5rem. Atmospheric fields widen to 130–136vw and reduce to a 9.5rem mist with a 6.5rem current; the overflow belongs to the outgoing section and is clipped horizontally there.
- On narrow screens, atmospheric fields may be wider than the viewport so their edges dissolve naturally rather than reveal a rectangular strip.
- Reduce height, blur, and intensity where necessary to keep the effect proportional to shorter mobile sections.
- Check portrait phones, landscape phones, tablets, and wide desktop layouts. A composition can become a band at one aspect ratio even if it works at another.
- Keep transition decoration from causing horizontal scrolling. The current implementation uses clipped horizontal overflow for atmospheric sections.
- Transition pseudo-elements remain absolutely positioned and non-interactive; they do not contribute to section height, so mobile spacing must come from the section's content rhythm rather than transition depth.
- Verify the transition in context with real content and section spacing, not in an isolated demo alone.

## Accessibility guidance

- Transitions are decorative and must not carry information required to understand the page.
- Pseudo-elements must remain non-interactive and ignored by assistive technology.
- Maintain text, controls, focus indicators, and interactive targets above all atmospheric layers.
- Do not reduce colour contrast where mist or ribbons cross into adjacent content.
- Avoid rapid, looping, or high-amplitude motion. If motion is introduced, respect `prefers-reduced-motion` and retain a clear static composition.
- Do not use transition colour alone to communicate a new chapter; preserve semantic headings, landmarks, and content order.
- Test at browser zoom and with increased text size to ensure decorative layers do not obscure reflowed content.

## Review checklist

Before approving a page transition sequence, confirm:

- The outgoing section owns each transition.
- `transitionTo` matches the following section's theme.
- Each boundary has a named intent: Energy, Continuity, Recovery, or Nothing.
- Atmospheric means Soft Mist Bleed + Directional Flow: `::after` reads as a broad irregular field and `::before` reads as a narrower elongated current following a curved trajectory.
- Forward and reverse retain the same visual language and mirror through `--ei-atmosphere-direction`.
- The closing treatment is a faint final echo of the elongated flow, not a new transition style.
- No transition forms a horizontal band or hard seam.
- Strong and quiet moments create a deliberate page rhythm.
- The mobile composition remains asymmetric, unclipped vertically, and free of horizontal scroll.
- Text, controls, focus states, and semantic structure remain clear.
- The final boundary resolves calmly instead of adding an unnecessary effect.

## Final rule

If the transition is the first thing someone notices, reduce it. The system succeeds when the page feels continuous, paced, and intentional—even when the reader cannot name the effect.
