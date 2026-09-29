# Implementation notes — Slate Media House on Dream Design

What was built, what was changed on purpose, and what is still open. The
component documents in `components/` are the specification; this file records
where the site deliberately differs from it.

- **Scope:** every route of the existing Next.js site (18 prerendered routes),
  not a single landing page.
- **Preserved:** all copy, imagery, project data, routes, business identity and
  the front-end-only enquiry form behaviour. Only presentation changed.
- **Entry point:** `src/app/globals.css` holds the whole token layer, so every
  value below is reachable from one file.

## Palette mapping

The spec's red/yellow accent system was not adopted. The site keeps its clay
accent, so the app reuses the spec's structure with a different hue.

| Spec token | Spec value | App token | App value | Note |
| --- | --- | --- | --- | --- |
| colour.surface.default | `#FFFFFF` | `--color-surface` | `#FFFFFF` | unchanged |
| colour.surface.inverse | `#121110` | `--color-primary` | `#000000` | pure black reads as a printed mark; contrast only improves |
| colour.text.primary | `#0B0A0A` | `--color-primary` | `#000000` | |
| colour.text.secondary | `#575757` | `--color-secondary` | `#575757` | 7.23:1 on white, 7.36:1 on the inverse surface |
| colour.border.default | `#EEEBE2` | `--color-line` | `#EEEBE2` | decorative only, 1.19:1 |
| accent.primary | `#C32300` | `--color-accent` | `#8A6A45` | clay, 4.97:1 on white |
| accent.secondary | `#FFAC00` | `--color-accent-soft` | `#E3D6C1` | fill only, 14.65:1 under a black label |

Measured contrast for the app palette:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `#000000` on `#FFFFFF` | 21.00:1 | AAA |
| `#FFFFFF` on `#000000` | 21.00:1 | AAA |
| `#EFEDE6` on `#000000` | 17.93:1 | AAA |
| `#575757` on `#FFFFFF` | 7.23:1 | AAA |
| `#8A6A45` on `#FFFFFF` | 4.97:1 | AA |
| `#8A6A45` on `#EFEDE6` | 4.24:1 | AA large only |
| `#8A6A45` on `#000000` | 4.23:1 | AA large and UI only |

Consequences enforced in the code:

- Clay is never used for normal-size text on `bg-primary` or `bg-inverse`.
  On the home page hero the highlight action uses `accent-soft` with a black
  label instead (`Button` variant `highlight`).
- The focus ring is clay on light surfaces and flips to `inverse-strong` on any
  `bg-primary` / `bg-inverse` subtree, because clay drops to 3.80:1 on black.
- `color-2` on `color-4` was corrected in `README.md` (3.84:1, not 7.36:1) and
  `text-body` line height was corrected to 27px.

## Typography

- **Full sans, as chosen.** `Host Grotesk` is not available as a web font, so
  the body and display stacks are both
  `Instrument Sans, Candara, ui-sans-serif, system-ui, sans-serif`
  (`--font-sans` and `--font-display` are the same stack by design, so the two
  roles are named but never differentiated by face).
- Ramp in use: `caption` 16/22, `body` 18/27, `lede` 21/33, `title-sm` 22/29,
  `title` 28/34, `display-sm` 34 → 48 → 66, `display-lg` 44 → 72 → 110 → 150.
- Display steps are fixed per breakpoint (`640`, `1024`, `1536`) and never
  fluid, so a heading wraps instead of shrinking. The spec's `clamp()` values
  are therefore not reproduced.
- Tracking is only ever negative on `title`, `display-sm` and `display-lg`
  (-0.01em to -0.025em). No positive tracking and no `uppercase` anywhere in
  the UI, including the Open Graph card.
- Technical annotation text inside the three SVG drawings keeps its wider
  spacing: it is illustration content, not UI text.

## Layout, surfaces and rhythm

- Section rhythm is `space-11` (42px) on small screens and `space-17` (68px)
  from `lg`, applied as `py-11 lg:py-17`.
- `surface-inset` is the only way a light section differs from the page
  surface, and it always carries the 1px decorative border.
- Radii in use: `sm` 10px (controls, inputs, thumbnails), `md` 20px (media
  frames, cards, panels), `full` only for the before/after handle.
  `lg` 70px and `xl` 100px are declared for future pill and mask use.
- No shadow token exists. Depth comes from surface, hairline and spacing.
- Anchor offsets use one global `scroll-padding-top: 4.5rem`, which clears the
  48/52px navigation bar. Sections do not add their own scroll margin.

## Navigation

- Bar height 48px, 52px from `md`; solid state is an opaque
  `bg-surface` with a hairline, no blur.
- Scroll threshold 14px. The in-page primary action is the shared
  `ButtonLink`, so the bar and the drawer cannot drift apart.
- Current page is marked with colour **and** a 1px underline (bar) or a 3px
  left rule (drawer), so the state survives a monochrome check.
- Drawer motion is 300ms with `cubic-bezier(0.2, 0, 0, 1)`; the reveal travel
  is 8px at a 0.15 threshold. The hero entrance is CSS only, so the largest
  element on the page ships without client JavaScript.

## Components

- `Button`: `primary` (filled black), `secondary` (filled clay, one per view),
  `highlight` (filled clay-soft, black label), `outline`, `ghost`, plus
  `onDark` and `onDarkGhost` for inverse surfaces and photography. Sizes
  `sm` 44px, `md` 48px, `lg` 56px, with 16px labels throughout and weight 600
  at `lg`. `ButtonLink` handles in-app routes, `ButtonAnchor` handles `tel:`,
  `mailto:` and off-site links, `Button` handles actions — no button navigates
  and no link commits. `WhatsAppButton` delegates to `ButtonAnchor`, so the
  footer, the service rows and the project pages cannot drift from that set.
- `Field`: 1px `line` border, 10px radius, 2px clay focus outline at 3px
  offset, error text in clay at 18px (4.97:1).
- `SectionHeading`: eyebrow (16px, hairline rule, sentence case), display
  heading, optional lede, optional action.
- Photography always sits in `.frame` (20px radius, hairline, 1.02 zoom on
  hover) or `StageVisual`; no rounded child escapes its parent radius.

- `EquipmentIcon`: eight 24-unit line icons (total station, GNSS, automatic
  level, rotating laser, prism, staff, drone, field controller) drawn on the
  same grid as the interface icons, stroke only, always beside a text label.
- `GallerySection`: framed image band with a caption and one line of context per
  frame. `featureFirst` promotes the first frame to a 16:10 hero, `points`
  renders the optional checklist underneath. No caption sits on a photograph.
- `EquipmentSection`: survey kit grid plus the deliverables list and a sample
  plan on a drafting grid.

## Mobile

The layout is mobile-first: every grid is a single column until `sm`, and every
image carries an explicit aspect ratio, so nothing reflows on load. Beyond that:

- **Notch and home indicator.** The sticky header, the menu panel and the
  footer bar take `env(safe-area-inset-*)` padding, `.shell` gutters use
  `max(1.5rem, env(safe-area-inset-left))` so landscape does not put text under
  a cutout, and `scroll-padding-top` includes the top inset so anchor jumps
  still clear the bar.
- **Touch targets.** `.tap` and `.arrow-link` set a 44px minimum height
  (WCAG 2.5.5) on text and icon controls; filled buttons were already 44px or
  taller. Applied to the header links, footer links, phone and email links,
  credit links and the mobile menu.
- **Tap behaviour.** `touch-action: manipulation` removes the double-tap wait
  without disabling pinch-zoom, and the iOS tap flash is suppressed. Range
  inputs keep `touch-action: auto` so dragging still works.
- **Hover is pointer-only.** The `.frame` zoom is inside
  `@media (hover: hover) and (pointer: fine)`, so a tap no longer leaves an
  image permanently scaled.
- **Below 360px** both display steps drop one notch (36px / 30px) so a hero
  heading does not eat the fold. Below 560px of height the hero gives up its
  `92svh` minimum, which is what makes it unreadable in landscape.
- **The phone header** carries a 44px WhatsApp action, because the text CTA and
  the filled button are hidden there and the menu was the only way through.
- **The mobile menu** pins its primary action below the scrolling list, with the
  bottom safe-area inset, so the CTA is never below the fold.
- **Long content.** The credits table becomes a stacked list below `sm` instead
  of a 42rem-wide horizontal scroll; the equipment grid becomes a snap carousel
  (`.snap-rail`, 78vw cards with the next one peeking) so eight instruments do
  not become eight screens of scrolling; the service deliverables list is no
  longer desktop-only. `overflow-wrap: break-word` and `max-width: 100%` on
  media stop long emails, file names and URLs forcing a sideways scroll.

## Content: survey, half-built and interiors

Three areas that had no content now do, all from `src/data/`:

- `equipment.ts` — eight instruments, each with a client-readable role, detail
  and typical published capability, plus `surveyIntro` and the six
  `surveyDeliverables`. No model numbers, brand partnerships or accuracy
  guarantees are claimed, because none can be substantiated. Rendered by
  `EquipmentSection` on `/services`; the survey journey stage on `/process`
  now uses the site-survey photograph instead of a drawing.
- `gallery.ts` — `buildGallery` (three half-built / on-site frames) and
  `interiorGallery` (kitchen, living space, bathroom) with captions and notes,
  plus `interiorDesignPoints`. The build band sits on `/` and `/process`; the
  interiors band on `/`; project galleries gained a half-built or interior
  frame each.
- `images.ts` — ten new placeholder photographs (four survey, two drawings,
  one construction, three interiors), all credited. The GNSS photograph is
  portrait (`1600x3651`), so `equipment.ts` sets an `imagePosition` focal point
  for it rather than cropping the file.

## Copy

Sentence case was applied to headings, eyebrow labels, button labels, list
items, navigation labels and page titles. Left unchanged: proper nouns, project
names, image credit titles, `alt` text, acronyms (`3D`, `CAD`), and the
Open Graph `alt` attribute.

## Open items

1. `accent-soft` is only used for fills so far; a clay-soft eyebrow on a dark
   surface is the one place a coloured eyebrow is still untested.
2. `radius-lg` (70px) and `radius-xl` (100px) are declared but unused.
3. Placeholder content is still placeholder: phone, email, office address,
   founder portrait, service area, project locations, the three testimonials,
   and every photograph in `public/images` (22 files, all credited placeholders,
   none of them a real Dream Design project).
4. The enquiry form still has no backend; it validates and hands off to
   WhatsApp by design.
5. The clay-on-clay combination is untested at large field sizes; the closing
   CTA band was moved from clay to black for that reason.
