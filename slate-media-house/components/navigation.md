# Navigation

## 1. Overview

The persistent header: brand, primary section links, the primary conversion
action, and the mobile drawer that replaces both below 1024px.

**Use it when** the page is a marketing surface with more than one top-level
destination. It appears once, at the top of every page.

**Do not use it when** the site has a single view, or when a full-screen hero
needs the entire first viewport. A hero whose headline is obscured by a fixed
bar is a layout failure, not a navigation feature.

**Density:** 5 elements detected — logo, primary links, primary action, utility
contact, drawer trigger. Hold to that count. Do not add a search field, a
language switcher or a second CTA without a conversion case.

## 2. Tokens and foundations

| Purpose | Token |
| --- | --- |
| Bar background, solid | `color.surface.default` (color-7) |
| Bar background, over hero | transparent, transitioning to solid |
| Bottom border, solid | `color.border.default` (color-5) |
| Logo mark | `color.text.primary` (color-1) |
| Link default | `color.text.secondary` (color-2) |
| Link hover | `color.text.primary` (color-1) |
| Link current rule | `color.text.primary` (color-1), 3px |
| Primary action | Button `primary` tokens |
| Utility link | `color.text.secondary`, `text-caption` |
| Drawer background | `color.surface.default` (color-7) |
| Drawer link | `color.text.primary` (color-1), current = `color.accent.primary` (color-3) |
| Bar height | `space-12` (48px) small, `space-13` (52px) large |
| Inline padding | `space-2` (8px) links, `space-4` (16px) action |
| Link gap | `space-5` (20px) |
| Icon gap | `space-2` (8px) |
| Radius | `radius-sm` (10px) action and trigger; links 0 |
| Transition | `duration-slow` (300ms) bar background; `duration-fast` (150ms) link colour |
| Focus ring | 2px `color.accent.primary`, 3px offset |

No shadow. A sticky bar is separated by `color.border.default` and a surface
change, not elevation.

## 3. Anatomy and variants

### Anatomy

| Part | Required | Notes |
| --- | --- | --- |
| Bar | Yes | `position: sticky` or `fixed`. One page-level landmark |
| Brand | Yes | Logo link to `/`. First tab stop |
| Primary link list | Yes | `<nav aria-label="Primary">` with a `<ul>` |
| Primary action | Yes | Link styled as Button `primary`, destination is the conversion page |
| Utility | Optional | Phone, WhatsApp. Maximum 1, `text-caption` |
| Drawer trigger | Required below 1024px | `aria-expanded`, `aria-controls` |
| Drawer | Required below 1024px | Dialog semantics, focus trap |
| Skip link | Yes | Owned by the page, first in tab order |

### Variant matrix

| Variant | Rest | Over hero | Use |
| --- | --- | --- | --- |
| `solid` | color-7 bg, color-5 border | — | Every inner page, all breakpoints |
| `transparent` | transparent, no border, color-7 text | Same | Full-bleed hero on the home page only |
| `drawer` | Full-height panel, color-7 bg | — | < 1024px |

`transparent` flips to `solid` after `space-3` (14px) of scroll. Over a
photographic hero the transparent variant must clear 4.5:1 at the top of the
image, which means either a scrim on the image or `color.text.inverse` text —
verify per hero, not per template.

### Responsive behaviour

| Breakpoint | Layout |
| --- | --- |
| < 640px | Brand, drawer trigger. Nothing else in the bar |
| 640–1023px | Brand, utility, primary action. Link list collapses into the drawer |
| ≥ 1024px | Full bar: brand, link list, utility, action, no trigger |

- Link list wraps never. If the list does not fit at 1024px, drop the utility
  link before dropping a navigation item.
- The action button is always the last element and always visible; it is the
  reason the bar exists.
- Drawer is 100% width, `overflow-y: auto`, with the list at the top and the
  action pinned to the bottom of the panel content.

## 4. States and interactions

| State | Trigger | Visual | Interaction |
| --- | --- | --- | --- |
| Default | — | Per variant | Links navigate; action navigates |
| Hover | Pointer over a link | color-1 label | Pointer only |
| Focus-visible | Keyboard focus | 2px ring, 3px offset | Visible on logo, every link, action, trigger |
| Current | `aria-current="page"` | color-1 + 3px bottom rule | Not clickable to anywhere new, but stays a link |
| Bar solid | Scroll > 14px | `solid` variant | Triggered by scroll, one listener, throttled by `requestAnimationFrame` |
| Drawer closed | Default < 1024px | Trigger only | Not in the tab order while closed |
| Drawer open | Trigger pressed | Panel + scrim, body scroll locked | Focus moves to close button; Escape closes; focus returns to trigger |
| Drawer loading | Route change | Trigger disabled while the segment loads | Prevents double navigation |

**Keyboard**

- Tab order: skip link → logo → link list → utility → action → drawer trigger.
- Enter activates a focused link. Space does nothing on desktop.
- Escape closes the drawer and nothing else. It must not close a dialog opened
  from the drawer without a second Escape.
- In the drawer, Tab cycles within the panel until it closes. Focus is trapped
  only while open.
- The drawer trigger is `aria-expanded` and is the only element with that
  attribute on the page.

**Pointer**

- The trigger's hit area is 44×44px minimum, including its border.
- Outside the drawer panel, a scrim click closes it. The scrim is decorative
  (`aria-hidden`) and is not focusable.
- The bar never intercepts clicks meant for content beneath it. A transparent
  bar over a hero is `pointer-events: none` except on its own controls.

**Touch**

- Swipe-to-dismiss is optional, never the only way to close.
- Tapping a drawer link closes the drawer and navigates. Focus moves to the new
  page, not back to the trigger.
- Bar height stays ≥ 48px on coarse pointers; do not compress for a fixed CTA.

**Edge cases**

- Six or more link items: the list moves to the drawer permanently. Do not build
  a two-row bar.
- Long label in the drawer: allow two lines, never truncate.
- Route change while the drawer is open: close it, then move focus.
- Fast scroll across the hero boundary: the bar must not flicker. One threshold,
  one rAF-guarded listener.

## 5. Accessibility

- The bar is `<header>` with the site-wide `banner` role implicit. The link list
  is `<nav aria-label="Primary">`; a footer nav uses `aria-label="Footer"`. Two
  navs on one page must have distinguishable names.
- The current page link carries `aria-current="page"`. Current state is also
  non-colour: a 3px rule, or in the drawer, `color.accent.primary` with
  `aria-current` carrying the rest of the meaning.
- Contrast, solid bar: color-2 on color-7 = 7.23:1 for default links; color-1
  hover = 21:1. The action button is Button `primary` at 21:1.
- Contrast, transparent over hero: the bar has no background, so contrast depends
  on the photograph. This is a per-page check and fails by default. Require a
  scrim or `color.text.inverse` text. Never ship an unverified transparent bar.
- Drawer semantics: `role="dialog"`, `aria-modal="true"`, an accessible name,
  focus moved in on open, focus returned to the trigger on close.
- Body scroll is locked while the drawer is open, and restored to its previous
  value on close — not reset to empty.
- Focus ring ≥ 3:1 against the bar and, for the transparent variant, against the
  hero photograph.
- The skip link is the first focusable element, visible on focus, and targets the
  main landmark id.
- No `tabindex` greater than 0 anywhere in the bar.
- Reduced motion: the bar's background change and the drawer both apply their
  end state immediately.

**Pass/fail checks**

- [ ] Exactly one `<header>`; every `<nav>` has a unique accessible name.
- [ ] Current page marked with `aria-current="page"` and a non-colour rule.
- [ ] Escape closes the drawer; focus returns to the trigger.
- [ ] Focus cannot reach the page behind an open drawer.
- [ ] Body scroll lock is released on close, including on route change.
- [ ] Every control in the bar is ≥ 44×44px at 320px width.
- [ ] Transparent-over-hero contrast verified against the actual photograph.

## 6. Content guidelines

- Brand label: the business name, nothing else. No tagline in the bar.
- Link labels: 1–2 words, sentence case, matching the destination page's own
  title so the user is not surprised by a different name for the same place.
- Maximum six primary links. If there are more, group them or cut them.
- Primary action label: the conversion, in the visitor's words. "Start your
  project", not "Get in touch" and not "Submit".
- Utility label: the channel, not a sentence. "WhatsApp", "Call".
- Never put a phone number and an email address in the bar. One channel.
- Drawer repeats the bar contents in the same order, then adds the primary
  action, then the utility link. No new items in the drawer.

## 7. Anti-patterns

1. **Nested interactive elements.** A primary action as a `<button>` inside the
   bar's logo link, or a link wrapping the drawer trigger. One destination per
   element; style the anchor as a button instead.
2. **Dropper menu.** A mega-menu panel over the content, opened on hover. It is
   unreachable on touch, breaks keyboard traversal, and adds hover-only behaviour
   the system forbids. Use the drawer.
3. **Hover-only dropdown.** Any navigation item that reveals sub-links on hover
   only. Invisible to touch and to keyboard.
4. **Transparent bar shipped without a contrast check.** Over a bright hero
   photograph, color-2 links fall below 4.5:1 and the bar disappears. Verify per
   hero or use `solid`.
5. **Scroll listener per link.** One rAF-guarded listener on the window, not
   listeners on children. A listener per item causes visible jitter on fast
   scroll.
6. **Drawer that does not restore focus.** Focus lands on `document.body` after
   close, and the next `Tab` restarts from the logo mid-page.
7. **Uppercase navigation labels.** Violates the sentence-case rule and costs
   legibility at `text-caption`.
8. **Mixed radii in the bar.** A `radius-lg` pill action beside `radius-sm`
   trigger and square links. Pick `radius-sm` for the whole bar.
9. **Scroll-locked body left locked.** `overflow: hidden` added on open and
   never removed, or reset to `""` instead of the previous value, which breaks
   scroll position on mobile after closing.
10. **Two navs with the same label.** Two `<nav>` elements both named "Primary"
    make the landmark list useless in a screen reader.

## 8. Definition of Done

- [ ] Solid, transparent and drawer variants implemented with token values only.
- [ ] Default, hover, focus-visible, current, scrolled and drawer-open states
      verified.
- [ ] Zero hardcoded hex, px or font values.
- [ ] Full keyboard pass: tab order, Enter, Escape, focus trap, focus restore.
- [ ] Transparent variant contrast verified against the real hero image.
- [ ] Checked at 320px (drawer only) and 1920px (full bar, no wrap).
- [ ] Route-change-while-open and rapid-scroll cases handled.
- [ ] Element count held at 5; link count at 6 or fewer.
- [ ] Props/API and limitations documented alongside the implementation.
