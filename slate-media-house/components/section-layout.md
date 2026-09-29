# Section Layout

## 1. Overview

The shell every page is built from: a sequence of vertical sections, each with
one job, one background, and a consistent internal rhythm.

**Use it when** composing a page. A page is an ordered list of sections, not a
free-flowing stream of content.

**Do not use it when** building an individual component. This document governs
the container, the grid inside it, and the rhythm between sections — not the
components themselves.

## 2. Tokens and foundations

| Purpose | Token |
| --- | --- |
| Default surface | `color.surface.default` (color-7) |
| Inverse surface | `color.surface.inverse` (color-1) |
| Section divider | `color.border.default` (color-5) |
| Section heading | `text-display-sm` (66px / 72.6px), weight 500–600, `-0.02em` |
| Hero heading | `text-display-lg` (150px / 171px), weight 600–700, `-0.02em` |
| Body | `text-body`, measure ≤ 70 characters |
| Eyebrow | `text-caption` (16px), `color.text.secondary`, sentence case |
| Section padding, small | `space-11` (42px) block |
| Section padding, large | `space-17` (80px) block |
| Hero padding | `space-19` (150px) block |
| Grid gap | `space-10` (40px) large, `space-8` (30px) medium, `space-5` (20px) small |
| Content max measure | 70 characters |
| Container max width | 1280px, `space-6` (24px) inline gutter |
| Radius | `radius-md` (20px) on a card surface, 0 on the section itself |
| Transition | `duration-slow` (300ms) on reveal, `transform` and `opacity` only |

Sections have no radius and no shadow. A section is a band of surface, separated
by spacing and, where a boundary is needed, a 1px `color.border.default`.

## 3. Anatomy and variants

### Anatomy

| Part | Required | Notes |
| --- | --- | --- |
| Section | Yes | One `<section>` per band. The unit of page composition |
| Container | Yes | Max-width 1280px, centred, `space-6` inline gutter |
| Heading | Yes, one per section | `text-display-sm`. Exactly one `h1` on the page, in the hero |
| Eyebrow | Optional | `text-caption`, `color.text.secondary`, one line |
| Grid | Conditional | 1/2/3-up, `space-10` gap |
| Content | Yes | One idea per section. Copy, a list, a form, or a single media figure |
| Actions | Conditional | Max 1 primary, ≤ 2 total. See [button.md](button.md) §7 |

### Surface variants

| Variant | Background | Text | Use |
| --- | --- | --- | --- |
| `default` | color-7 | color-1 | Most of the page |
| `inset` | color-7 with 1px color-5 border | color-1 | Grouped content on the same surface |
| `inverse` | color-1 | color-6, headings color-7 | Max 2 per page. Proof, statistics, a single statement |
| `accent` | color-3 (color-4) | color-7 (color-1) | Max 1 per page. The conversion band |
| `media` | Full-bleed image + scrim | color-7 | Hero, or one `pano` divider |

Surface variants alternate. Three `inverse` sections in a row is a page with no
rest; use `default` between them.

### Layout variants

| Variant | < 640px | 640–1023px | ≥ 1024px | Use |
| --- | --- | --- | --- | --- |
| `stack` | 1-up | 1-up | 1-up | Hero, statement, form |
| `split` | Image over copy | Copy over image, alternating | 50/50 | Story, process, before/after |
| `grid` | 1-up | 2-up | 3-up | Projects, services, list blocks |
| `wide` | Full-bleed | Full-bleed | Full-bleed, 1280px | Images, panorama |
| `prose` | Measure ≤ 70ch | ≤ 70ch | ≤ 70ch | Long-form, one article column |

`prose` is a 70-character measure, not a centred 1280px column of body text. The
difference matters: a 1280px paragraph is unreadable at every breakpoint.

### Vertical rhythm

- Sections are separated by their own padding, not by a margin between them.
  One spacing system per gap.
- `space-17` (80px) block padding on large screens, `space-11` (42px) on small.
  Never both on the same section.
- The gap between two elements inside a section is never larger than the gap
  between two sections. Hierarchy comes from size and surface, not from piling on
  padding.
- `space-18` (100px) is reserved for the gap between major blocks inside a
  `stack` section. It is not a general-purpose gap.

### Responsive behaviour

- Container gutters: `space-6` (24px) below 640px, `space-10` (40px) from 640px.
  Only two values — the scale has no 12px or 30px-per-side compromise.
- `split` reorders to stacked below 1024px, and the media always comes first in
  DOM order so the reading order matches the visual order.
- `grid` never goes three-up below 1024px. Three 300px columns at 768px is 240px
  per column and unreadable.
- `text-display-sm` at 66px is a section heading, not a card heading. Below
  640px a single 66px word may overflow: headings wrap, they never shrink, and
  no viewport-width-relative font sizes are used.
- No horizontal scroll at any width, including at 320px, with any content
  length.

### Edge cases

- No content: do not render an empty section. Padding plus nothing is a hole in
  the page.
- One child in a 3-up grid: the child takes one column, not the full width. A
  full-width orphan in a grid looks like a layout bug.
- Long heading: wraps to 2–3 lines. Beyond that, the wording is wrong.
- Missing media: `split` becomes `stack` with copy first. Never leave a blank
  half.

## 4. States and interactions

| State | Trigger | Visual | Interaction |
| --- | --- | --- | --- |
| Default | — | Per surface variant | Static |
| Revealed | Entering viewport | `opacity: 0` → `1`, `translateY(space-2)` → `0` over `duration-slow` | One shared IntersectionObserver |
| Reveal reduced | `prefers-reduced-motion: reduce` | Immediately at end state, no transform | No motion |
| Sticky nav offset | `position: sticky` header | `scroll-margin-block-start` = bar height + `space-4` | Anchor targets clear the bar |
| Focus within | `:focus-within` on a card | No visual change unless the card is a link | Avoid a ring on an unfocused container |
| Inactive route | n/a | The section does not persist across routes | Full navigation, no SPA transitions |

**Keyboard**

- Sections are not focusable. A `tabindex="0"` on a section is a defect.
- The only focusable elements are the components inside.
- Anchor targets receive `scroll-margin-block-start`; focus is not moved to the
  section on scroll, only on activation.
- Tab order follows DOM order, which follows the visual order at every
  breakpoint. When `split` flips the image above the copy, the image must be
  first in the DOM.

**Pointer**

- Reveal animations must never gate interaction. A section that is
  `opacity: 0` and `pointer-events: none` before its observer fires is
  unreachable if the observer fails.
- The reveal threshold is 15% visibility. Content is present with or without JS.

**Touch**

- The nav's transparent state is only valid if the hero clears contrast. See
  [navigation.md](navigation.md) §5.
- Tap targets inside a section come from the components. The section itself
  never intercepts taps.

**Edge cases**

- Content longer than 700 words in one section: split it. Long copy belongs in
  a `prose` section, and a `prose` section on a marketing page is a warning
  sign, not a victory.
- Print stylesheet: hide the nav, keep `space-11` (42px) block padding, force
  `color.text.primary` on every surface.

## 5. Accessibility

- One `<h1>` per page, in the hero. Every section heading is `<h2>`, and levels
  descend without skipping. A section is a landmark only when it has an
  accessible name.
- `<section>` needs an accessible name to become a `region` landmark. Use
  `aria-labelledby` pointing at the section heading. Unnamed sections are
  ignored, which is fine — but do not pretend to be landmarks.
- Main content is inside one `<main>`. Sections never sit outside it, and the
  header and footer are its siblings.
- Contrast is the surface variant's job, and it is non-negotiable:
  - `default`: color-1 on color-7 = 21:1.
  - `inverse`: color-6 on color-1 = 17.93:1, headings color-7 = 21:1.
  - `accent` on color-3: color-7 = 5.90:1 — passes AA, fails AAA. On color-4,
    color-1 = 11.16:1.
  - Eyebrows use `color.text.secondary` (7.23:1) on color-7 only. On
    `color.surface.inverse` an eyebrow in color-2 reaches 2.91:1 and fails —
    use `color.text.inverse` there.
- Surface variants must be distinguishable without colour when they carry
  meaning. An `accent` band is a conversion band; say so in the copy.
- The reveal animation is decorative. Under `prefers-reduced-motion: reduce`
  the end state applies immediately, and content is never `opacity: 0` by
  default in CSS without the observer to restore it.
- Skip link targets the `<main>` element, and `<main>` is focusable with
  `tabindex="-1"`.
- Anchor links: each target section has a unique `id`, matching the link's
  `aria-label` where the label differs from the heading text.
- No `position: fixed` section. A fixed footer covering content, or a fixed
  section with `z-index`, breaks zoom to 200% and mobile browser chrome.

**Pass/fail checks**

- [ ] Exactly one `h1`; heading levels descend with no skips.
- [ ] Every section is inside `<main>`; the skip link resolves.
- [ ] Contrast verified for every surface variant, including the eyebrow on
      `inverse`.
- [ ] Anchor targets clear the sticky nav.
- [ ] Content is fully visible with animations and JS disabled.
- [ ] No horizontal scroll at 200% zoom at 1280px wide.
- [ ] Grid collapse verified at 320px, 768px, 1024px, 1920px.

## 6. Content guidelines

- One section, one idea, one heading. If a section needs "and" in its heading,
  it is two sections.
- Headings state the outcome or the claim, never the label. "Plans that survive
  planning committee", not "Our planning services".
- Sentence case everywhere. No uppercase eyebrows, no uppercase headings.
- Section heading ≤ 8 words. Hero heading ≤ 6 words, one `text-display-lg` per
  view.
- Body copy: `text-body`, weight 400, 1.5 line height, measure ≤ 70 characters.
  45–75 words per section maximum.
- Eyebrows are one line of context, ≤ 5 words, and never a category
  classification like "SECTION 03".
- Action labels: 1 primary per section, ≤ 2 buttons. See
  [button.md](button.md) §6.
- Section order follows the visitor's decision: what it is, what it costs, what
  happens next, how to start. The conversion section comes before the footer, and
  never before the answer to "what does this cost".

## 7. Anti-patterns

1. **Unnamed section landmarks.** Ten `<section>` elements with no
   `aria-labelledby`. They clutter the landmark list without adding structure, or
   they get skipped entirely. Name them or use plain `<div>`s.
2. **Uppercase eyebrows and headings.** `text-transform: uppercase` on section
   headings, including the 66px display size. Violates the sentence-case rule and
   slows word-shape recognition.
3. **Arbitrary section padding.** `padding-block: 96px`. Not a token. The
   choices are `space-11` (42px), `space-17` (80px) and `space-19` (150px) for
   the hero.
4. **Viewport-relative font sizing.** `font-size: 8vw` to make the 66px heading
   "fit". The scale is fixed. Headings wrap.
5. **Nested interactive elements.** A whole section wrapped in an anchor, or a
   card with a link inside a section link. One destination per element.
6. **Glow.** A `accent` section on every second band, or three `inverse`
   sections in a row. Surface variants are punctuation; used as wallpaper they
   stop meaning anything.
7. **Grid orphan.** A single card in a 3-up grid stretched to full width. It
   occupies one column.
8. **Reveal animation that hides content.** `opacity: 0` in CSS with
   `pointer-events: none`, restored only by an IntersectionObserver that may never
   fire. Content must be visible without JS.
9. **Split with a blank half.** A missing image leaves an empty column instead of
   collapsing to a stack.
10. **Mixed radius and shadow.** `radius-lg` cards with `box-shadow` to "lift"
    them. No elevation tokens exist; separation comes from the border and the
    spacing step.

## 8. Definition of Done

- [ ] All five surface variants and all five layout variants implemented with
      token values only.
- [ ] Reveal, reduced-motion and focus-within states verified.
- [ ] Zero hardcoded hex, px or font values.
- [ ] Keyboard pass: tab order matches visual order at every breakpoint, anchor
      targets clear the nav.
- [ ] Contrast verified per surface variant, including the eyebrow on `inverse`.
- [ ] Checked at 320px, 768px, 1024px and 1920px, and at 200% zoom.
- [ ] One-heading, one-idea, no-orphan and missing-media cases handled.
- [ ] Density held: ≤ 1 primary button per section, ≤ 4 images per section.
- [ ] Props/API and limitations documented alongside the implementation.
