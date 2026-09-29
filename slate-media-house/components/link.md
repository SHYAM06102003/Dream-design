# Link

## 1. Overview

A link navigates. It changes the URL, moves focus to a new view, or downloads a
file. It never commits an action, mutates data, or opens a dialog.

**Use it when** the destination is a URL: another page, a section anchor, a
document, a mailto or tel URI, an external site.

**Do not use it when** the control submits, transforms data, or toggles state in
place. See [button.md](button.md). Conversely, a link must never be rebuilt as a
button: the styling is free, the behaviour is not.

**Density:** 30 links detected — the second most numerous element after images.
The count is legitimate for a marketing page, but it is a ceiling, not a target.
See README §7.

## 2. Tokens and foundations

| Purpose | Token |
| --- | --- |
| Inline link label | `color.accent.primary` (color-3) |
| Inline link visited | `color.text.secondary` (color-2) |
| Inline link hover | `color.text.primary` (color-1) |
| Nav link default | `color.text.secondary` (color-2) |
| Nav link hover / current | `color.text.primary` (color-1) |
| Footer / inverse link | `color.text.inverse` (color-6) |
| Underline | 1px `currentColor`, `text-underline-offset: space-2` (8px) |
| Focus ring | 2px `color.accent.primary`, 3px offset |
| Label | `text-caption` (16px) inline; `text-body` in prose |
| Inline padding | 0 — a link in a sentence must not add box space |
| Block padding | `space-2` (8px) for nav and footer links |
| Radius | `radius-sm` (10px) on block links with padding; 0 on inline |
| Transition | `duration-fast` (150ms) on `color` only |

Links do not use `color.accent.secondary`. It is 1.88:1 on a light surface.

## 3. Anatomy and variants

### Anatomy

| Part | Required | Notes |
| --- | --- | --- |
| Anchor | Yes | `<a href>`. The only element permitted to carry navigation |
| Label | Yes | Text content, not an image, not an icon alone without `aria-label` |
| Trailing icon | Optional | 16px, `aria-hidden`. Arrow for directional meaning, external glyph for off-site |
| Underline | Conditional | Required on inline links; forbidden on nav and button-styled links |

### Variant matrix

| Variant | Rest | Hover | Underline | Use |
| --- | --- | --- | --- | --- |
| `inline` | color-3, 1px | color-1, 1px | Always, 1px with 8px offset | Inside a paragraph |
| `prose` | color-3, 1px | color-1, 1px | Always | Body copy links |
| `nav` | color-2, no border | color-1 | None | Header and footer navigation |
| `navCurrent` | color-1, 3px bottom rule | color-1 | 3px bottom rule | Current page, `aria-current="page"` |
| `inverse` | color-6 | color-7 | 1px | Footer and dark sections |
| `button` | Button `primary` / `outline` tokens | See button.md | None | A link that looks like a button |
| `arrow` | color-3 | color-1 | 1px under the label only | "View all projects →" |
| `meta` | color-2, `text-caption` | color-1 | 1px on hover only | Captions, legal, small print |

### Responsive behaviour

- Inline links wrap as normal text. Never `white-space: nowrap` in a sentence.
- Nav links: horizontal from 1024px; inside a drawer below it. Never a horizontal
  scroll strip.
- `arrow` variant keeps label and icon on one line. If the label would wrap, the
  container wraps the whole link, not the icon.
- Block links with padding need a 44px min target: `space-2` (8px) padding plus a
  `text-caption` line height of 22.4px falls short on touch. Add `space-3` (14px)
  block padding on coarse pointers, or a pseudo-element hit-area expansion.

### Edge cases

- Maximum inline label: 4 words or 40 characters. Longer copy is not a link.
- Anchors to a section on the same page get `scroll-margin-block-start` equal to
  the sticky header height plus `space-4` (16px), or the target hides behind the
  header.
- A link wrapping a long URL must break. `overflow-wrap: anywhere` — never
  `white-space: nowrap` on a URL.
- A link whose label contains an image needs an `alt` on the image that matches
  the visible purpose, not the filename.

## 4. States and interactions

| State | Trigger | Visual | Interaction |
| --- | --- | --- | --- |
| Default | — | Per variant matrix | Activates on click, Enter |
| Hover | Pointer over | Per variant matrix | Pointer only. Never the sole affordance |
| Focus-visible | Keyboard focus | 2px ring, 3px offset, on the text box | First tab stop in its region |
| Active | Pointer down | 2% opacity reduction, 120ms | Momentary |
| Visited | Previously visited URL | `color.text.secondary` | Applies to `inline` and `prose` only |
| Current | Same page as URL | `navCurrent` | `aria-current="page"` |
| External | `target="_blank"` | Trailing external glyph | Announces "opens in new tab" |
| Disabled | n/a for links | n/a | Use `aria-disabled="true"` with `tabindex="-1"` and no `href` removed — see below |

**Keyboard**

- Tab: every link is a tab stop, in DOM order. In the header, links follow the
  logo and precede utility links.
- Enter: activates. Space does not — that is a button behaviour, and a link that
  responds to Space misleads keyboard users.
- Escape: not a link behaviour. A link inside a drawer must not close it.
- Skip link: the first focusable element on every page, visible on focus, and the
  only element allowed to appear before the header in tab order.

**Pointer**

- Whole inline text box is the hit area.
- `cursor: pointer` on every link, always.

**Touch**

- 44×44px minimum. Inline links in prose are exempt from target size under
  WCAG 2.5.5 but must still be separable by spacing from adjacent text.
- No hover-only links in touch layouts.

## 5. Accessibility

- Every link has an accessible name from its text content. Icon-only links need
  `aria-label`.
- Underline is mandatory on links inside a paragraph. Colour alone fails
  WCAG 1.4.1 for anyone who cannot distinguish color-3 from color-1.
  Nav links are exempt because their position and container make them
  recognisable.
- Contrast of the label:
  - `inline` color-3 on color-7 = 5.90:1 — passes AA.
  - `inline` visited color-2 on color-7 = 7.23:1 — passes AAA.
  - `inverse` color-6 on color-1 = 17.93:1 — passes AAA.
  - `meta` color-2 on color-7 = 7.23:1 — passes AAA.
- Focus ring ≥ 3:1 against the page background. `color.accent.primary` on
  `color.surface.default` is 5.90:1; on `color.surface.inverse` it is 3.13:1, which
  clears the 3:1 floor for a non-text indicator. Confirm it is visible against
  the specific element behind it.
- External links opening a new tab: add a visually hidden
  "opens in a new tab", or an `aria-label` when the visible label is short.
  `target="_blank"` alone conveys nothing to a screen reader.
- `aria-current="page"` on the current nav link. Not `aria-selected` — that
  belongs to tabs.
- Current state is never colour-only: pair `navCurrent` with a 3px bottom rule
  so it survives greyscale.
- Focus moves to the new page. For client-side navigation, ensure the target has
  a focusable heading (`tabindex="-1"`) or the browser's default focus reset is
  not suppressed.
- Disabled link: prefer removing the link entirely. When the destination must stay
  visible for context, use `aria-disabled="true"`, keep it out of the tab order
  with `tabindex="-1"`, and leave `href` off.
- External `rel` must include `noopener` on `target="_blank"`.

**Pass/fail checks**

- [ ] Every link has a discernible, non-colour-only affordance in context.
- [ ] Label contrast ≥ 4.5:1 in every variant, on both surfaces.
- [ ] Current page marked with `aria-current="page"` and a non-colour rule.
- [ ] New-tab links announce it; `rel="noopener"` present.
- [ ] Focus order follows reading order; no positive `tabindex` anywhere.

## 6. Content guidelines

- Sentence case everywhere. Never uppercase in a sentence.
- Link labels describe the destination, not the action. "Read the case study",
  not "click here" or "learn more". "Our pricing", not "this page".
- Inline link labels stay inside the sentence grammatically. "See our
  [land surveying services] for coverage" — not "[Click here] to view services".
- Avoid "here", "this", "read this" as the whole label.
- Keep inline labels to 4 words or 40 characters.
- Anchor targets: no duplicate ids, and the target heading text matches the link
  label so the jump is predictable.
- External destinations: name the organisation. "Harvard Business Review", not
  "this article".
- Placeholder labels during build: `aria-label="Placeholder link"` plus a
  `placeholder` class, never a fake live URL.

## 7. Anti-patterns

1. **`<a>` with no `href`.** Used as a styling hook or a fake button. It is not
   focusable, cannot be opened in a new tab, and is invisible to the link list
   in a screen reader. Use a button, or give it an `href`.
2. **Link that mutates data.** "Delete project" as an anchor. Activating a link
   should be safe to prefetch and safe to revisit; destructive or state-changing
   actions belong in a button behind a confirmation.
3. **Colour-only affordance.** An `inline` link with `text-decoration: none`. It
   vanishes for anyone with colour vision deficiency and fails WCAG 1.4.1. Keep
   the underline.
4. **Nested interactive elements.** An anchor wrapping a button, a card with a
   button inside a link wrapper, or a link inside a link. One destination per
   element. Make the whole card a single anchor and move the secondary action out.
5. **Mixed radii on a block link.** A `radius-lg` pill in a nav of `radius-sm`
   items, or a `radius-sm` link containing a `radius-lg` chip. One radius per
   component.
6. **`white-space: nowrap` on a long URL or long label.** Causes horizontal
   scroll on mobile and hides the destination. Allow wrapping.
7. **Arbitrary spacing.** `padding: 0 6px` on nav items. Use `space-2` (8px) or
   `space-1` (6px) and state which.
8. **Uppercase nav labels.** `text-transform: uppercase` on 16px items is a
   legibility tax and violates the sentence-case rule. Sentence case only.
9. **Link as the only route to a primary action.** A "Start your project" link
   with no button on the page buries conversion. See
   [button.md](button.md) §1.

## 8. Definition of Done

- [ ] All eight variants implemented with token values only.
- [ ] Default, hover, focus-visible, active, visited, current and external states
      verified.
- [ ] Zero hardcoded hex, px or font values.
- [ ] `Tab` and `Enter` work; `Space` does not activate; focus order is logical.
- [ ] Inline links underlined; current page marked with rule and `aria-current`.
- [ ] Checked at 320px (drawer) and 1920px (inline nav, 30-link page).
- [ ] URL wrapping, long-label and section-anchor cases handled.
- [ ] Link density within the README §7 ceiling for the view.
- [ ] Props/API and limitations documented alongside the implementation.
