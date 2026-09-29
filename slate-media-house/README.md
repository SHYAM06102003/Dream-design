# Slate Media House — Design System Guidelines

Marketing site design system. Conversion-focused, token-driven, accessible by
default. These documents govern every component built against the system.

| Guideline | Covers |
| --- | --- |
| [components/button.md](components/button.md) | Buttons (5 detected) |
| [components/link.md](components/link.md) | Links (30 detected) |
| [components/navigation.md](components/navigation.md) | Navigation (5 elements) |
| [components/list.md](components/list.md) | Lists (1 detected) |
| [components/image-cover.md](components/image-cover.md) | Images (93 detected) |
| [components/section-layout.md](components/section-layout.md) | Section shells, grids and page rhythm |

Order of work: read this file first, then the component guideline, then build.

---

## 1. Semantic token layer

Detection produced seven raw colour tokens. Components never reference them
directly — they reference the semantic names below.

| Semantic token | Raw token | Value | Role | Contrast note |
| --- | --- | --- | --- | --- |
| `color.text.primary` | color-1 | `#000000` | Headings, body, primary button fill | 21:1 on color-7 |
| `color.text.secondary` | color-2 | `#575757` | Secondary text, captions, meta, visited links | 7.23:1 on color-7 — passes AAA |
| `color.text.inverse` | color-6 | `#EFEDE6` | Body text on `color.surface.inverse` | 17.93:1 on color-1 |
| `color.text.inverseStrong` | color-7 | `#FFFFFF` | Headings and emphasis on `color.surface.inverse` | 21:1 on color-1 |
| `color.accent.primary` | color-3 | `#C32300` | Primary accent, links, active states, focus ring | 5.90:1 on color-7 — passes AA |
| `color.accent.secondary` | color-4 | `#FFAC00` | Fill only. Never text on a light surface | 1.88:1 on color-7 — **fails** text contrast |
| `color.border.default` | color-5 | `#EEEBE2` | Decorative borders, dividers, input outlines | 1.19:1 on color-7 — decorative only |
| `color.surface.default` | color-7 | `#FFFFFF` | Page and card background | — |
| `color.surface.inverse` | color-1 | `#000000` | Inverse section background | *Inferred — see Gaps* |

Contrast figures are WCAG 2.1 relative-luminance ratios against the surface named
in the same row. Recompute them if a token value changes.

### Hard rules

- `color.accent.secondary` is a fill, not a text colour. On `color.surface.default`
  it reaches 1.88:1 and fails WCAG 1.4.3. Text on top of it must be
  `color.text.primary` (11.16:1). `color.text.secondary` reaches only 3.84:1 and
  is therefore limited to `text-display-sm` and above, or to non-text indicators.
- `color.border.default` at 1.19:1 on `color.surface.default` is decorative. Any
  boundary that carries meaning — a text input outline, a focus boundary, a
  selected control — must use `color.text.secondary` (7.23:1) or
  `color.text.primary` (21:1) to satisfy WCAG 1.4.11.
- On `color.surface.inverse` the picture inverts: `color.border.default` is
  17.62:1 and `color.text.inverse` 17.93:1, so both are strong enough for
  meaningful boundaries. `color.text.secondary` reaches only 2.91:1, below the
  3:1 floor of WCAG 1.4.11, so it is decorative only on dark. A border that is
  meant to be subtle on dark needs a new token, not a lower-contrast reuse.
- No colour outside this table. No opacity tricks to "make a new grey".

## 2. Typography

Font stack: `Host Grotesk, Candara, Bright Chalk, sans-serif`, declared once at
the document level with `display: swap`. Weights 400 / 500 / 600 / 700 only.
Nothing below 400 — thin type fails contrast at this palette.

### Detected scale

| Token | Size | Line height | Ratio | Use |
| --- | --- | --- | --- | --- |
| `text-caption` (was text-xs) | 16px | 22.4px | 1.4 | Captions, metadata, labels, table cells, button labels |
| `text-body` | **requires sign-off** | 27px | 1.5 | Body copy, list items, form help text |
| `text-display-sm` (was text-sm) | 66px | 72.6px | 1.1 | Section headings, pull quotes |
| `text-display-lg` (was text-base) | 150px | 171px | 1.14 | Hero only, one per view |

`text-sm: 66px` and `text-base: 150px` are display sizes that the extractor
mislabelled. They are not label and body sizes. `text-body` is missing from the
detection because the live site sizes body copy in `rem`; it is called out in
Gaps below and must be signed off before body copy ships.

- Body copy uses `text-body` at weight 400, `line-height: 1.5`, measure capped at
  70 characters.
- Section headings use `text-display-sm` at weight 500 or 600, `line-height: 1.1`.
- Hero uses `text-display-lg` at weight 600 or 700, one instance per view.
- Nothing uses `text-transform: uppercase` except acronyms and short metadata
  labels at `text-caption`. Never for body copy or headings.
- Line heights are not optional: fixing them is what keeps the 66px and 150px
  steps from drifting.

## 3. Spacing

Base unit 4px. Nineteen steps, as detected:

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | 6px | Icon-to-label gap, badge inset |
| `space-2` | 8px | Tight gaps, inline icon pairings |
| `space-3` | 14px | Control vertical padding, chip padding |
| `space-4` | 16px | Control horizontal padding, list item gap |
| `space-5` | 20px | Card padding on small screens, stack gaps |
| `space-6` | 24px | Card padding, field group gap |
| `space-7` | 26px | Media caption offset |
| `space-8` | 30px | Component-to-component gap |
| `space-9` | 34px | Card internal block gap |
| `space-10` | 40px | Block padding, grid gap |
| `space-11` | 42px | Section inner padding on small screens |
| `space-12` | 48px | Section inner padding |
| `space-13` | 52px | Section inner padding on large screens |
| `space-14` | 53px | Suspect value — see Gaps |
| `space-15` | 60px | Media block padding |
| `space-16` | 75px | Section padding, large component padding |
| `space-17` | 80px | Section padding on large screens |
| `space-18` | 100px | Gap between major blocks in a section |
| `space-19` | 150px | Hero vertical padding |

The scale is not uniform: `space-1` (6px), `space-3` (14px), `space-7` (26px),
`space-9` (34px), `space-11` (42px), `space-13` (52px) and `space-14` (53px) are
not multiples of 4, and there is no 12px step. Work with what exists: a 12px gap
is either `space-2` (8px) or `space-3` (14px). Do not insert 12px, and do not
average two steps.

Spacing is applied with logical properties (`padding-inline`, `margin-block`,
`gap`) so the same rules serve LTR and RTL.

## 4. Radius

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | 10px | Inputs, small buttons, tags, thumbnails |
| `radius-md` | 20px | Cards, media frames, panels |
| `radius-lg` | 70px | Pill buttons, chips, filter controls |
| `radius-xl` | 100px | Full-bleed pill shapes, oversized media masks |

- One radius per component. A control does not mix `radius-sm` corners with
  `radius-lg` corners.
- A child's radius is never larger than its parent's. A `radius-md` card may
  contain `radius-sm` children; the reverse is not allowed.
- `radius-lg` and `radius-xl` are for single-line, fully rounded controls only.
  Multi-line text inside a pill is a defect.
- Squared corners are not a token. If a design appears to have none, it is
  `radius-sm`.

## 5. Elevation

No shadow tokens were detected, and the system does not invent them. Depth is
expressed with surface colour, `color.border.default` and radius alone.

- Do not add `box-shadow`, `drop-shadow` or a `z-index` layer purely to imply
  depth. Layering for occlusion (drawer over page, menu over content) is a
  stacking requirement, not elevation.
- Separation of two surfaces at the same depth comes from a border or a spacing
  step, never from a shadow.

## 6. Motion

The extracted motion tokens are unusable — `duration-fast` was captured twice,
as `all` and as `none`, with no time value. Proposed resolution, pending
sign-off:

| Token | Value | Use |
| --- | --- | --- |
| `duration-fast` | 150ms | Colour, background, border transitions |
| `duration-slow` | 300ms | Transform, drawer and menu transitions |
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default |

- Animate only `color`, `background-color`, `border-color`, `opacity` and
  `transform`. Never `width`, `height`, `top`, `left` or `margin`.
- Every transition declares its property list. Bare `transition: all` is an
  anti-pattern.
- `prefers-reduced-motion: reduce` removes transforms and durations, not just
  duration. A drawer must open without sliding when motion is reduced.
- Scroll-triggered reveals use one shared IntersectionObserver. No per-component
  scroll listeners.

## 7. Page density

Detected across the marketing surface: 5 buttons, 30 links, 5 navigation
elements, 1 list, 93 images. Treat these as ceilings per view, not per page.

| Element | Per view | Per page |
| --- | --- | --- |
| Primary buttons | 1 | ≤ 6 |
| Buttons, all variants | ≤ 3 | ≤ 12 |
| Links in body copy | ≤ 2 per paragraph | ≤ 30 |
| Images | ≤ 4 | ≤ 93 |
| List blocks | ≤ 2 | ≤ 6 |

93 images is a property of a long marketing page with a full-bleed hero, not a
licence to fill a section with thumbnails. Image budget per section is four.

## 8. Writing tone

Concise, confident, implementation-focused. Lead with the outcome, not the
process. Cut filler preambles. No exclamation marks in interface copy. No
"click here".

## 9. Spec gaps — require sign-off before build

| # | Gap | Impact | Proposed resolution |
| --- | --- | --- | --- |
| G1 | No body text size detected. `text-base: 150px` is a hero size | Every paragraph is unstyled | Add `text-body: 18px / 27px` |
| G2 | Motion tokens are corrupt (`all`, `none`) | No transitions can be specified | Adopt the 150ms/300ms pair above |
| G3 | `space-14: 53px` is one pixel off a 52px neighbour and breaks the 4px base | Ambiguous choice between two near-identical values | Deprecate; use `space-13` (52px) |
| G4 | "Bright Chalk" is not a web-safe family and will not resolve unless self-hosted | Silent fallback to `sans-serif` | Confirm licensing, or drop it from the stack |
| G5 | `color.surface.inverse` is not a detected token | Dark sections have no background token | Confirm `#000000` is the intended inverse surface |
| G6 | No elevation tokens | Depth must come from colour and border | Confirmed as intentional — add nothing |
| G7 | No letter-spacing tokens | Display sizes at 66px/150px need negative tracking to set | Add `-0.02em` display / `0` body as a rule, not a token |

Items G1, G2 and G3 block body-copy work. G4, G5 and G7 can be resolved in code
with the proposed values. G6 needs no action.

## 10. Definition of Done

A component is not complete until every item is checked.

- [ ] Renders in its default state and passes a smoke test.
- [ ] Every state is implemented and visually verified: hover, focus-visible,
      active, disabled, loading, error, empty.
- [ ] Zero hardcoded colour, px or font values — tokens only.
- [ ] Operable by keyboard alone: Tab order, Enter, Space, Escape, arrows.
- [ ] No critical accessibility violations: contrast, ARIA, focus order.
- [ ] Verified at the smallest and largest supported breakpoint.
- [ ] Anti-patterns section lists at least one concrete misuse.
- [ ] Documentation covers purpose, usage, props/API and limitations.
- [ ] Density limits in §7 respected for the view it ships in.
