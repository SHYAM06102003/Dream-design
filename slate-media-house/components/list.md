# List

## 1. Overview

A list is a set of related items read as one unit: features, deliverables,
process steps, specifications, definitions.

**Use it when** items are peers and the order carries meaning (steps) or is
incidental (features). A bulleted feature set of three to six items is the
system's primary content pattern after imagery.

**Do not use it when** there are two items and no relationship, when the content
is tabular data, or when a single item needs more space than a list row allows.
Two loose items are two paragraphs, not a list.

**Density:** 1 list detected on the live surface. The system intends lists to
appear per section, not once per page. Budget: ≤ 2 list blocks per view, ≤ 6 per
page. A page built entirely of lists is a document, not a marketing page.

## 2. Tokens and foundations

| Purpose | Token |
| --- | --- |
| Marker | `color.accent.primary` (color-3) |
| Marker, inverse section | `color.accent.secondary` (color-4) |
| Item text | `color.text.primary` (color-1) |
| Item meta | `color.text.secondary` (color-2) |
| Item divider | `color.border.default` (color-5) |
| Item text size | `text-body`, line height 27px |
| Item title | `text-caption` (16px), weight 500 |
| Row gap | `space-3` (14px) compact, `space-4` (16px) standard |
| Item block padding | `space-4` (16px) with divider, `space-5` (20px) without |
| Marker gap | `space-2` (8px) |
| Marker size | 6px square, or 20px check icon, stroke 1.5 |
| Radius | `radius-sm` (10px) on an interactive row; 0 on static |
| Transition | `duration-fast` (150ms) on `color` and `background-color` |
| Focus ring | 2px `color.accent.primary`, 3px offset |

`color.accent.secondary` markers are permitted only when the list sits on
`color.surface.inverse`, where the 4px marker is decorative reinforcement of an
already-perceivable text label.

## 3. Anatomy and variants

### Anatomy

| Part | Required | Notes |
| --- | --- | --- |
| List element | Yes | `<ul>`, `<ol>` or `<dl>` matching the semantics of the content |
| Item | Yes | `<li>`, or `<dt>`/`<dd>` pairs |
| Marker | Conditional | Implicit for `<ul>`/`<ol>`; explicit for `<dl>` |
| Item title | Conditional | Required for the `spec` and `feature` variants |
| Item body | Conditional | One or two lines. Longer text is a paragraph, not a list item |
| Item meta | Optional | `text-caption`, `color.text.secondary` |
| Divider | Optional | 1px `color.border.default`, inset by `space-4` |

### Variant matrix

| Variant | Container | Marker | Order | Use |
| --- | --- | --- | --- | --- |
| `feature` | `<ul>`, no list-style | 6px square, color-3 | None | Benefits, capabilities |
| `checklist` | `<ul>`, no list-style | 20px check, color-3 | None | Deliverables, inclusions |
| `steps` | `<ol>`, decimal | 2-digit number, color-3, weight 500 | Meaningful | Process, sequence |
| `spec` | `<dl>` | None | None | Key-value facts, technical attributes |
| `compact` | `<ul>`, no list-style | 6px square | None | Footer links, tag rows, filters |
| `linked` | `<ul>` of `<a>` | 6px square | None | In-page jump links, related reading |
| `inverse` | As above on dark | color-4 square | None | Lists inside inverse sections |

### Responsive behaviour

- Single column below 768px. Two columns from 1024px for `feature` and
  `checklist` only.
- `steps` and `spec` never go two-up: both are read in order.
- Measure capped at 70 characters. If a row exceeds that, the container is too
  narrow — reduce the font or split the content, do not let the measure grow.
- Markers align to the first line of the item text, not its optical centre.
- A list never scrolls horizontally, at any breakpoint, for any item count.

### Edge cases

- One item: not a list. Render the item alone.
- Zero items: render the empty state below, not an empty `<ul>`.
- Seven or more `checklist` items: this is a specification, not a checklist.
  Move it to a page section with its own heading, or split it.
- Item titles longer than 40 characters: truncate at the design's agreed point
  and mark the row `linked`, or shorten. Never `text-overflow: ellipsis` on a
  static list item.
- Long unbreakable strings: `overflow-wrap: anywhere` on the item body.

## 4. States and interactions

| State | Trigger | Visual | Interaction |
| --- | --- | --- | --- |
| Default | — | Per variant matrix | Static: nothing to activate |
| Hover | `linked` and `feature` only | Item text → color-1, marker scales to 120% over `duration-fast` | Pointer only |
| Focus-visible | `linked` only | 2px ring on the item, 3px offset | Whole row is the focus target |
| Active | `linked`, pointer down | 2% opacity | Momentary |
| Current | `linked` to the in-view section | 3px left rule in color-3 + `aria-current="true"` | Scroll-spy state |
| Empty | Zero items | See below | No interaction |

**Static lists are not interactive.** `feature`, `checklist`, `steps` and `spec`
have no hover, no focus stop and no pointer cursor. Adding `cursor: pointer` or a
hover tint to a non-interactive row tells the user to expect a response that
never comes.

**Keyboard**

- Only `linked` items are focusable. Tab enters the list, then each item in
  order.
- Enter activates a `linked` item. Space does not.
- Arrow keys move between items in a `steps` or `linked` list **only** when the
  list is a widget with a stated purpose (a stepper, a jump menu). A plain list
  uses Tab. Do not add arrow-key roving tabindex to static content.
- Escape is not a list behaviour.

**Pointer**

- Hit area is the whole row for `linked`, including the padding, to reach 44px.
- Marker is not independently interactive.

**Touch**

- Rows with dividers need ≥ 44px total height: `space-4` (16px) block padding
  plus a `text-body` line is enough; a single line of `text-caption` is not.
- No hover-only reveal. Any content shown on hover is invisible on touch.

**Empty state**

- Container renders with a 1px `color.border.default` outline, `space-6` (24px)
  block padding, and a single sentence in `color.text.secondary` at
  `text-caption`: "No items to show yet." Never an empty box, never a dash.
- The empty state is not focusable and carries no `aria-live` unless the list
  loads asynchronously.

## 5. Accessibility

- Semantics carry the meaning. `<ul>` for unordered, `<ol>` for ordered,
  `<dl>` for key-value pairs. A list of steps is `<ol>`; screen readers announce
  "item 3 of 6" from that alone.
- When the visual marker replaces the native bullet, keep the `<ul>`/`<ol>`
  element and set `list-style: none` — do not switch to `<div>`s. Native
  semantics plus a removed visual marker is the correct combination; it survives
  list style preferences in Safari and VoiceOver.
- Never announce list position for a non-sequential list. `<ol>` implies meaning
  to the order, so only use it where the order is real.
- `steps`: expose the total, not just the index, if the list length matters —
  `aria-label="Step 3 of 6"` on each item when the heading is not adjacent.
- `linked` current state: `aria-current="true"` for in-page jump links,
  `aria-current="page"` for page links. Pair the colour change with a 3px rule.
- Contrast: item text color-1 on color-7 = 21:1; meta color-2 on color-7 =
  7.23:1; marker color-3 on color-7 = 5.90:1. On `color.surface.inverse`, item
  text color-6 = 17.93:1 and the color-4 marker is decorative.
- `text-body` on `color.text.secondary` fails AA at body size. Meta text may use
  color-2 only when it is `text-caption`.
- A list that loads asynchronously goes in an `aria-live="polite"` container
  with a count announced on update: "6 items". A static list gets no live
  region.
- Decorative SVG markers are `aria-hidden="true"`.
- Touch target: `linked` rows ≥ 44px tall including padding.

**Pass/fail checks**

- [ ] Element type matches content semantics: `ul`, `ol` or `dl`.
- [ ] `list-style: none` never costs the list its `ul`/`ol` semantics.
- [ ] Static lists have no hover, focus stop or pointer cursor.
- [ ] Item text contrast ≥ 4.5:1; meta text is `text-caption` or darker.
- [ ] Current item in a `linked` list uses `aria-current` and a non-colour rule.
- [ ] Empty state renders one sentence, not an empty container.
- [ ] Measure ≤ 70 characters at 320px and 1920px.

## 6. Content guidelines

- Sentence case. No uppercase item titles, even short ones.
- Items start with a capital letter and a verb or noun — not "To be able to".
- 3 to 6 items per `feature` or `checklist`. Two is a paragraph; seven is a
  specification.
- One idea per item. If an item needs "and", it is two items.
- Item body ≤ 20 words. Longer copy belongs in a paragraph.
- Deliverables are written as things the customer receives, not as process
  verbs: "Marked-up site plan you can keep", not "We will create a site plan".
- Meta lines use `text-caption` in sentence case: "2,400 sq.ft · New build".
- Empty-state copy names the condition, not the fix: "No items to show yet", not
  "Nothing here".

## 7. Anti-patterns

1. **Div soup.** `<div>` per row with `<div>` per cell, and no list element.
   The list disappears from the screen reader's structure view and from
   `list-style` preferences.
2. **Ordered list for unordered content.** `<ol>` for benefits. Screen readers
   announce "1 of 6" on items whose order is arbitrary, implying a false
   sequence.
3. **`<dl>` for design text.** Definition lists are for term/definition pairs.
   Using them for a feature block produces nonsense when read linearly.
4. **Hover on a static row.** Colour change or pointer cursor on a list item
   that does nothing. It reads as a broken control.
5. **Uppercase item titles.** `text-transform: uppercase` across 16px items —
   violates the sentence-case rule and reduces word-shape recognition.
6. **Two-column `steps`.** A process split into two columns breaks the reading
   order that `aria` position announcements depend on.
7. **Ellipsis on a static item.** Truncating "Marked-up site plan you can keep"
   to "Marked-up site plan…" in a list with no way to see the rest.
8. **Arbitrary spacing.** `margin-bottom: 15px` between rows. Use `space-3`
   (14px) or `space-4` (16px).
9. **Empty container.** An `<ul>` with no `<li>` and no explanation. It collapses
   to nothing and reads as a failed render.
10. **Marker carrying meaning alone.** A coloured square as the only difference
    between a required and an optional item. Add text.

## 8. Definition of Done

- [ ] All seven variants implemented with token values only.
- [ ] Default, hover, focus-visible, active, current and empty states verified —
      with hover and focus confirmed absent on static variants.
- [ ] Zero hardcoded hex, px or font values.
- [ ] Keyboard pass: `linked` reachable by Tab, activated by Enter; static lists
      skipped.
- [ ] Semantics verified in the accessibility tree: list, listitem, position.
- [ ] Checked at 320px (single column) and 1920px (two-up for feature/checklist).
- [ ] One-item, zero-item and seven-item cases handled.
- [ ] Density held at 2 blocks per view, 6 per page.
- [ ] Props/API and limitations documented alongside the implementation.
