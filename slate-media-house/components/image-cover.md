# Image / Cover

## 1. Overview

Images carry the property work: site photographs, plans, drone captures, and the
full-bleed heroes that open a page. This guideline covers how they are framed,
sized, captioned and made to fail safely.

**Use it when** a section needs to show the work, the place, or the result. One
image per section is the norm; four is the budget.

**Do not use it when** text would communicate better. A 150px `text-display-lg`
hero over a photograph of a staircase is decoration, and 93 decorative images is
not a design decision.

**Density:** 93 images detected — by far the dominant element. That figure is a
ceiling, not a target. Hard budget is four per view, and full-bleed heroes
consume the entire budget for the first screen.

## 2. Tokens and foundations

| Purpose | Token |
| --- | --- |
| Caption text | `color.text.secondary` (color-2) |
| Caption on dark | `color.text.inverse` (color-6) |
| Frame border | `color.border.default` (color-5) |
| Hero scrim | `color.surface.inverse` (color-1), gradient to 0% |
| Focus ring | 2px `color.accent.primary`, 3px offset |
| Figure gap (image → caption) | `space-7` (26px) |
| Frame padding | `space-6` (24px) bordered, 0 flush |
| Grid gap | `space-10` (40px) |
| Radius | `radius-md` (20px) frame, `radius-xl` (100px) full-bleed mask |
| Caption | `text-caption` (16px / 22.4px), sentence case |
| Transition | `duration-slow` (300ms) on `transform` only, for a slow zoom |
| Object position | `object-position: 50% 50%` default; per-image override allowed |

No shadow, no image-specific colour filters, no duotone. Radius and crop are
the only treatments.

## 3. Anatomy and variants

### Anatomy

| Part | Required | Notes |
| --- | --- | --- |
| Figure | Yes, unless the image is purely decorative | Wraps image plus caption, owns the `radius-md` |
| Image | Yes | `<img>` with `width`, `height`, `alt`, `loading`, `decoding` |
| Caption | Optional | Sentence case, `text-caption`, `color.text.secondary` |
| Attribution | Conditional | Required for placeholder imagery, in the caption or a `/credits` page |
| Overlay | Conditional | Scrim behind text laid on an image |
| Link wrapper | Conditional | Only when the whole image navigates |

### Variant matrix

| Variant | Crop | Radius | Ratio | Use |
| --- | --- | --- | --- | --- |
| `cover` | `object-fit: cover` | `radius-md` (20px) | 4:3 | Property photo, work image |
| `portrait` | cover | `radius-md` | 3:4 | Portrait-format property shot |
| `landscape` | cover | `radius-md` | 16:9 | Panoramic or plan view |
| `fullBleed` | cover | 0, or `radius-xl` (100px) masked | viewport | Hero only, one per page |
| `pano` | cover | `radius-xl` (100px) pill | 32:9 | Section divider, one per page |
| `frame` | contain | `radius-md` (20px) | natural | Site plans, drawings, anything with legible detail |
| `inline` | intrinsic | 0 | natural | Inside body copy |
| `inverse` | cover | `radius-md` | 4:3 | On `color.surface.inverse` |

`frame` uses `contain` and is the only variant that may show an image
edge-to-edge. Everything else crops. Cropping a site plan to 4:3 makes the
drawing unusable — use `frame`.

### Responsive behaviour

| Breakpoint | Full-bleed hero | Standard variants |
| --- | --- | --- |
| < 640px | 100vw, 60–70vh, `object-position` adjusted to keep the subject | 1-up, `space-5` (20px) gap |
| 640–1023px | 100vw, 70–80vh | 2-up grid, `space-8` (30px) gap |
| ≥ 1024px | 100vw, 80–90vh | up to 3-up, `space-10` (40px) gap |

- Every variant sets `aspect-ratio` and `object-fit` together. Height is never
  left to the intrinsic image.
- A `fullBleed` hero must not cover the navigation. The bar's transparent state
  must clear 4.5:1 against the top of the image, or the hero uses `solid`
  navigation.
- Below 640px, `pano` becomes a 16:9 crop. A 32:9 crop at 320px is 90px tall and
  unreadable.

### Edge cases

- Missing asset: the frame keeps its `aspect-ratio` and shows a
  `color.border.default` outline with the `alt` text. The layout must not
  collapse.
- Broken `src`: same reserved space; the browser broken-image glyph is
  suppressed in favour of the caption.
- Panoramic source in a portrait frame: `cover` crops, `object-position`
  per-image.
- Transparent PNG: renders on `color.surface.default`. No matte colour is
  invented.
- SVG logo: `inline` variant, no `alt` if decorative, `alt` describing the brand
  if it is the only brand mark on the page.

## 4. States and interactions

| State | Trigger | Visual | Interaction |
| --- | --- | --- | --- |
| Default | — | Per variant | None, unless wrapped in a link |
| Loading | `loading="lazy"` and not yet decoded | Reserved `aspect-ratio` box, no layout shift | No spinner — the placeholder is the empty frame |
| Loaded | Decode complete | Full opacity, `duration-slow` if a reveal is used | — |
| Error | 404 or decode failure | 1px `color.border.default` frame, `alt` or caption text visible | Announced as an image by the browser |
| Hover | Image is a link | 2% opacity reduction, 1.02 scale over `duration-slow` | Pointer only |
| Focus-visible | Linked image | 2px `color.accent.primary` ring on the figure | Whole figure is the focus target |
| Reduced motion | `prefers-reduced-motion` | No transform, no zoom | Colour changes only |
| Lazy | Below the fold | Not loaded until near viewport | `loading="lazy"`, `decoding="async"` |

**Keyboard**

- A non-interactive image has no focus stop. It must not be added to the tab
  order.
- A linked image is one tab stop activated by `Enter`, in DOM order, at the
  position of the figure — not after the caption text.
- Space does not activate a link.

**Pointer**

- The hit area for a linked image is the whole figure including the caption.
- No hover-only controls on an image: no zoom button, no crop toggle, no
  lightbox trigger that exists only on hover.

**Touch**

- Tap target is the full figure, ≥ 44px on the smallest axis.
- A gallery must expose the count and the current position. A tappable image
  grid that does nothing on tap is a broken page.
- `object-position` is chosen for the small screen first; the crop that frames
  a face on desktop must still read at 320px.

**Edge cases**

- Empty slot during a build: omit the figure entirely. Never render an empty
  frame with a caption that says nothing.
- Animated GIF or autoplaying video: out of scope here. Do not substitute one
  for an image.

## 5. Accessibility

- `alt` describes the content and the function, not the filename. "Rear elevation
  of the Ashby Road extension", not "ashby-01.jpg".
- Decorative images: `alt=""` and `aria-hidden="true"` is not required in
  addition — `alt=""` alone is sufficient and is the correct single mechanism.
- Never `alt="image"` or `alt="photo"`. Never omit `alt` on a content image.
- A linked image whose link has no other accessible name takes its name from the
  `alt`: `<a href="/projects/ashby"><img alt="Ashby Road extension"></a>`.
- A captioned content image may use `alt=""` when the caption already carries
  the full meaning, provided the caption is not hidden.
- Dimension attributes: `width` and `height` are always set, plus `aspect-ratio`
  in CSS. This prevents layout shift, which is a Core Web Vitals failure, not a
  nicety.
- The hero image is decorative when text sits on top of it. It gets `alt=""`,
  and the scrim exists for contrast, not for style.
- Overlay text on an image must meet 4.5:1 against the scrimmed region, not
  against the image. `color.text.inverseStrong` on the darkest end of the scrim
  is 21:1.
- Decorative overlays and scrims are `aria-hidden="true"`.
- `figure` and `figcaption` carry the semantic relationship. Do not use a
  `div` with a `title` attribute.
- An image gallery uses a labelled list (`role="list"` preserved) with
  `aria-label` per group and a text indication of position.
- `loading="lazy"` on everything below the fold, never on the hero. The hero gets
  `fetchpriority="high"`.
- Decorative border frames are `aria-hidden`; a border is not an outline that
  needs a role.

**Pass/fail checks**

- [ ] Every content image has descriptive `alt`; every decorative image has
      `alt=""`.
- [ ] No `alt` text is a filename, "image", or empty on a content image.
- [ ] `width`, `height` and `aspect-ratio` set on every variant.
- [ ] Linked images have a discernible focus ring and one accessible name.
- [ ] Overlay text verified ≥ 4.5:1 against the scrim, at 320px.
- [ ] Lazy loading applied below the fold only; hero excluded.
- [ ] Missing-asset case verified: frame holds, layout does not shift.

## 6. Content guidelines

- Captions state the fact a visitor needs: location, scope, or stage. "Ashby
  Road, Sheffield — full rear extension, 2024."
- Captions are sentence case and ≤ 90 characters. No "Image 3 of 12".
- Alt text and captions are not the same job. Alt is for people who never see the
  image; the caption is for people who do.
- Do not write alt text that begins "This image shows" or "Picture of". Screen
  readers already announce the image role.
- No text baked into the image. Logos, labels and numbers live in HTML so they
  scale, translate and reach assistive technology.
- Placeholder imagery in a build carries an attribution link to `/credits`. This
  is a temporary, documented obligation — see the site README.
- File names are descriptive and lowercase with hyphens. Formats: AVIF or WebP
  with an `<img>` fallback; no sprite sheets, no background-image for content.

## 7. Anti-patterns

1. **Image as the entire message.** A hero photograph with no words, no
   proposition, and no next step. 93 images is how a page ends up with no
   content.
2. **Empty alt on a content image.** `alt=""` on a photograph of the delivered
   kitchen tells a screen reader user nothing. Reserve `alt=""` for genuinely
   decorative and hero-under-text images.
3. **Filename as alt.** `alt="IMG_4471.jpg"`.
4. **Linked image wrapping other links.** An anchor over a card that itself
   contains a project link. Two destinations, one element, invalid HTML and
   broken keyboard traversal. Make the whole card one anchor and remove the
   inner link.
5. **Arbitrary crop.** `aspect-ratio: 1.618` with no variant behind it, or
   `height: 437px` hardcoded on a hero. Ratios come from the variant matrix.
6. **Text over an image with no scrim.** A white headline on a pale sky. Fails
   1.4.3 and fails in daylight on a phone.
7. **Mixed radii.** A `radius-sm` thumbnail next to a `radius-md` cover in the
   same grid. One radius per grid.
8. **Arbitrary spacing.** `margin-top: 18px` between a figure and its caption.
   Use `space-7` (26px).
9. **Cropped site plans.** Forcing a drawing into 4:3 with `cover` destroys the
   legibility that matters. Use `frame` with `contain`.
10. **Text baked into the image.** Pricing, room names and phone numbers painted
    into a render. They do not scale, do not translate, and are invisible to
    assistive technology.

## 8. Definition of Done

- [ ] All eight variants implemented with token values only.
- [ ] Default, loading, error, hover, focus-visible and reduced-motion states
      verified.
- [ ] Zero hardcoded hex, px or font values; ratios come from the variant
      matrix.
- [ ] Alt text reviewed for every image on the page, not generated.
- [ ] Missing-asset and broken-`src` cases hold the layout.
- [ ] Checked at 320px (1-up, hero full-bleed) and 1920px (3-up grid, 90vh
      hero).
- [ ] Overlay text contrast verified against the scrim, not the image.
- [ ] Density held at 4 images per view.
- [ ] Props/API and limitations documented alongside the implementation.
