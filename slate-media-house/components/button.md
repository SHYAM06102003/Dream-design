# Button

## 1. Overview

A button commits an action. It submits a form, opens a confirmation, starts a
request, or triggers a state change inside the current view.

**Use it when** the label describes something the user does — "Request a
consultation", "Send enquiry", "Compare plans".

**Do not use it when** the action only navigates to another URL. That is a link,
styled as a link. A button that navigates breaks middle-click, opens no new tab,
and lies about what it does to screen readers and search engines. It is also
detected 30 times in the link audit and zero times as a real control on the live
site — navigation is a link problem, not a button problem.

**Density:** 5 buttons detected. Hold to 1 primary per view, ≤ 3 buttons of any
variant in one view, ≤ 12 per page.

## 2. Tokens and foundations

| Purpose | Token |
| --- | --- |
| Primary fill | `color.text.primary` (color-1) |
| Primary label | `color.surface.default` (color-7) |
| Primary hover fill | `color.text.secondary` (color-2) |
| Secondary fill | `color.accent.primary` (color-3) |
| Secondary label | `color.surface.default` (color-7) |
| Secondary hover fill | `color.text.primary` (color-1) |
| Highlight fill | `color.accent.secondary` (color-4) |
| Highlight label | `color.text.primary` (color-1) |
| Outline border | `color.border.default` (color-5), → `color.text.primary` on hover |
| Ghost label | `color.text.secondary` (color-2) → `color.text.primary` on hover |
| Focus ring | `color.accent.primary` (color-3) |
| Disabled fill | `color.border.default` (color-5) at 40% opacity |
| Disabled label | `color.text.secondary` (color-2) at 40% opacity |
| Label | `text-caption` (16px / 22.4px), weight 500 |
| Label case | Sentence case |
| Inline padding | `space-4` (16px) small, `space-5` (20px) medium, `space-6` (24px) large |
| Block padding | `space-3` (14px) all sizes — the control height is set by the label, not by extra padding |
| Icon gap | `space-2` (8px) |
| Icon size | 20px stroke 1.5 |
| Radius | `radius-sm` (10px) for square variants, `radius-lg` (70px) for pill |
| Transition | `duration-fast` (150ms) on `background-color`, `color`, `border-color` |

No shadow tokens exist. A button is a filled or outlined shape — not a raised
object.

## 3. Anatomy and variants

### Anatomy

| Part | Required | Notes |
| --- | --- | --- |
| Container | Yes | The `<button>` element. Inline-flex, centred, no nested interactive children |
| Label | Yes | 1–3 words, verb-led. Never an icon alone unless `aria-label` is set |
| Leading icon | Optional | 20px, `aria-hidden="true"`, never the only label |
| Trailing icon | Optional | Same. Use for directional meaning only (arrow, chevron) |
| Loading indicator | Conditional | Replaces the leading icon slot, label stays in place |

### Variant matrix

| Variant | Rest | Hover | Active | Filled with |
| --- | --- | --- | --- | --- |
| `primary` | color-1 bg, color-7 label | color-2 bg | color-1 bg, inset 1px | `color.surface.default` |
| `secondary` | color-3 bg, color-7 label | color-1 bg | color-3 bg | `color.surface.default` |
| `highlight` | color-4 bg, color-1 label | color-1 bg, color-7 label | color-4 bg | `color.text.primary` |
| `outline` | color-5 border, color-1 label | color-1 bg, color-7 label | color-2 bg | transparent |
| `ghost` | color-2 label, no border | color-1 label | color-3 label | transparent |

`highlight` is the only variant permitted to use `color.accent.secondary`, and
only as a background. Its label must be `color.text.primary` (11.16:1).

### Size matrix

| Size | Label | Inline padding | Min target |
| --- | --- | --- | --- |
| `sm` | `text-caption` 16px | `space-4` (16px) | 44px tall |
| `md` | `text-caption` 16px | `space-5` (20px) | 48px tall |
| `lg` | `text-caption` 16px, weight 600 | `space-6` (24px) | 56px tall |

Label size is constant across sizes. A larger button gets more padding and more
weight, never a larger label — the site has no detected button label scale, and
inventing one would break the type ramp.

### Shape

`radius-sm` (10px) and `radius-lg` (70px) are the only two shapes. Pick one per
component and keep it. Never one rounded end.

### Responsive behaviour

- Buttons stack full-width below 640px, in source order, with `space-3` between.
- `primary` and `secondary` may sit side by side from 640px up.
- Label never truncates. If the label plus icon exceeds the container, the
  container wraps to full-width before the label is allowed to break.
- Maximum label length is 3 words or 24 characters. Beyond that, the intent is
  wrong, not the button.

## 4. States and interactions

| State | Trigger | Visual | Interaction |
| --- | --- | --- | --- |
| Default | — | Per variant matrix | Activates on click, Enter, Space |
| Hover | Pointer over, or focus-visible on non-touch | Per variant matrix | Pointer only; hover styles never apply to keyboard focus |
| Focus-visible | Keyboard focus | 2px `color.accent.primary` ring, 3px offset | Visible on every variant, including on colour-4 fills where the ring sits on the page background |
| Active | Pointer down, or Space held | Filled colour + 1px inset | Fires on keyup for Space, matching native behaviour |
| Disabled | `disabled` attribute | color-5 at 40%, color-2 at 40% | Not focusable, not clickable, not announced as available |
| Loading | Request in flight | Leading icon → spinner, label kept, `cursor: wait` | Clicks ignored. Width frozen to the loading state so the layout cannot jump |
| Error | n/a | n/a | Validation errors belong to the field, not the button. A button never turns red |

**Keyboard**

- Tab: reaches the button in DOM order. Disabled buttons are skipped.
- Enter: activates immediately.
- Space: activates on keyup, matching native button behaviour. Do not
  reimplement this on a `<div>`.
- Escape: not a button behaviour. A button inside an open dialog must not close
  the dialog on Escape.

**Pointer**

- Full padding box is the hit area, not the label.
- One activation per press. Guard `onClick` against double submission with a
  loading flag rather than a timer.

**Touch**

- Minimum target 44×44px including padding. The visual box may be smaller.
- No hover-revealed actions. Anything only reachable on hover is unreachable on
  touch.
- Loading state is the only permitted interaction change on activation.

**Edge cases**

- Long label: wraps the button to full-width, never truncates the text.
- Icon-only: requires `aria-label`. Minimum 44×44px, square, `radius-sm`.
- Overflowing container: `flex-shrink: 0` on the button so a flex parent cannot
  compress it below the label width.
- Icon-only in a tight row: `radius-sm` only, never `radius-lg`.

## 5. Accessibility

- Use the native `<button>` element. A `<div>` with a click handler is not a
  button: no role, no keyboard, no form participation.
- Always set `type`. Default is `submit`, which submits forms the author did not
  intend to submit.
- Contrast, per variant, measured against the resting fill:
  - `primary`: color-7 on color-1 = 21:1 — passes AAA.
  - `secondary`: color-7 on color-3 = 5.90:1 — passes AA, fails AAA. Do not set
    body-size copy at this pairing.
  - `highlight`: color-1 on color-4 = 11.16:1 — passes AAA.
  - `outline`: color-1 on color-7 = 21:1; border color-5 is 1.19:1 and is
    decorative, so the label is the only thing that must be perceivable.
  - `ghost`: color-2 on color-7 = 7.23:1 — passes AAA.
- Focus ring must reach 3:1 against both the button fill and the page background.
  `color.accent.primary` does on every surface in the palette.
- Focus ring is never `outline: none` without a replacement of equal visibility.
- Loading: `aria-busy="true"` on the button and an `aria-live="polite"` region
  for the status message. The label text does not change, so screen readers do
  not announce a phantom button.
- Icon-only buttons: `aria-label` on the element. The icon is `aria-hidden`.
- Disabled: use `disabled`, not `aria-disabled`, unless the control must stay
  focusable to explain why it is unavailable — in which case pair
  `aria-disabled="true"` with a visible reason and suppress the handler.
- Target size 44×44px minimum (WCAG 2.5.5) at every breakpoint.

**Pass/fail checks**

- [ ] Focus ring visible on every variant against its own fill and the page background.
- [ ] `Tab` reaches the control; `Enter` and `Space` both activate it.
- [ ] Every variant meets 4.5:1 for its label against its resting fill.
- [ ] Loading state is announced and does not change button width.
- [ ] Icon-only buttons expose an accessible name.

## 6. Content guidelines

- Sentence case: "Request a consultation", not "REQUEST A CONSULTATION" and not
  "Request A Consultation".
- Verb first. The label must make sense read alone, out of context, to someone
  scanning with a screen reader.
- 1–3 words, 24 characters maximum.
- No trailing period, no exclamation mark, no "Click here", no "Submit" unless
  the thing submitted is unambiguously a form.
- All-caps is reserved for acronyms (ROI, PDF, 3D).
- Loading label: keep the action, add progress separately. "Request a
  consultation" does not become "Requesting..." in the accessible name.
- Placeholder text is not a label. Every button has a visible label unless it is
  icon-only with an `aria-label`.
- Match the noun to the object: the button that starts a project is "Start your
  project", not "Get started" on a page about a house.

## 7. Anti-patterns

1. **Button that navigates.** `<button onClick={router.push("/projects")}>View
   projects</button>`. Breaks middle-click, cmd-click, keyboard link semantics
   and analytics. Use `<a href="/projects">`. A button may submit a form whose
   response changes the URL, but it may not be a link with extra steps.
2. **Button nested inside a link.** `<a href="/contact"><button>Start</button></a>`.
   Interactive content inside an anchor is invalid; screen readers announce one
   control where two exist, and keyboard focus lands unpredictably. Style the
   anchor with the button variants instead.
3. **`color.accent.secondary` as text.** A color-4 label on a white background
   reaches 1.88:1 and is invisible to low-vision users. It is a fill token.
4. **Mixed radii.** `border-radius: 70px 10px 70px 10px` on a pill, or a
   `radius-lg` button containing a `radius-sm` badge. One radius per component;
   children never exceed their parent.
5. **Hover-only actions.** A button that only appears on card hover is
   unreachable on touch and invisible to keyboard users. Always in the DOM,
   always focusable.
6. **Loading implemented as reduced opacity.** A dimmed button still looks
   enabled and can be clicked twice. Use a spinner, `aria-busy`, a frozen width
   and an ignored handler.
7. **Truncating the label.** `text-overflow: ellipsis` on a button produces
   "Request a consulta…". Wrap to full-width or shorten the label.
8. **Disabled as an error state.** Greying out a button because a form is
   incomplete hides the reason. Show the field errors; keep the button enabled.
9. **Arbitrary spacing.** `padding: 13px 22px` matches no token. The next
   available steps are `space-3` (14px) and `space-6` (24px).
10. **Shadow-added depth.** `box-shadow` to make the button look raised. No
    elevation token exists; use `primary` for hierarchy.

## 8. Definition of Done

- [ ] All five variants and three sizes implemented with token values only.
- [ ] Default, hover, focus-visible, active, disabled and loading states
      verified visually and by keyboard.
- [ ] Zero hardcoded hex, px or font values.
- [ ] `Tab`, `Enter` and `Space` all work; no pointer-only behaviour.
- [ ] Label contrast ≥ 4.5:1 for every variant; focus ring ≥ 3:1 on every fill.
- [ ] Checked at 320px (stacked, full-width) and 1920px (inline, centred).
- [ ] Long-label, icon-only and empty-container cases handled.
- [ ] One primary button per view; density limit respected.
- [ ] Props/API and limitations documented alongside the implementation.
