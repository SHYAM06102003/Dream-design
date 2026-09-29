# Dream Design

A premium marketing website for a business that takes a client from **bare land
to a finished home**: land surveying, house and floor plan design, architectural
planning, 3D visualisation, construction, renovation and end-to-end coordination.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind
CSS 4 and Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (next core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |

## The journey the site is built around

```
LAND → SURVEY → DESIGN → ESTIMATE → CONSTRUCTION → COMPLETED HOME
```

The home page follows this order: hero → introduction → services → the journey
stage by stage → selected projects → before/after → process → why us → about →
testimonials → enquiry form.

## Routes

| Route | Page |
| --- | --- |
| `/` | Full landing page |
| `/services` | Each service in detail, deep-linkable (`/services#house-construction`) |
| `/projects` | Project index |
| `/projects/[slug]` | Project detail — statically generated per project |
| `/process` | Six-stage process, in depth |
| `/about` | Company, approach and values |
| `/contact` | Contact details, map and the enquiry form (`#enquiry`) |
| `/privacy`, `/terms` | Legal pages (templates) |
| `/credits` | Attribution for the CC-licensed placeholder photography |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO and social |

## Editing content — where everything lives

Almost all copy and imagery is data, not markup. To edit the site, change these
files; you should not need to touch a component.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | **Start here.** Business name, phone, WhatsApp number, email, address, service area, social links, site URL. Every placeholder is marked `PLACEHOLDER`. |
| `src/data/images.ts` | The image library. One entry per photograph, with dimensions, alt text and image credits. Change a path here and it changes everywhere. |
| `src/data/services.ts` | The five services: title, description, deliverables, image. |
| `src/data/projects.ts` | Project records. **All four are clearly marked samples** — set `isPlaceholder: false` and fill in the real details before launch. |
| `src/data/process.ts` | The six process stages. |
| `src/data/content.ts` | Intro, journey stages, before/after. |
| `src/data/about.ts` | Company story, approach, values, benefits, CTA band. |
| `src/data/testimonials.ts` | Testimonials. **All three are placeholders** — replace with real, attributable quotes. |
| `src/data/navigation.ts` | Navbar, footer and legal links. |
| `src/data/enquiry.ts` | Enquiry form options (services, house types, floors, hints). |

## Things you must do before this site goes live

Nothing about the business was invented. The following are placeholders and are
labelled as such in the UI:

1. **`src/data/site.ts`** — real name, phone, WhatsApp number, email, address,
   service area and social profiles. The WhatsApp number is used by every
   WhatsApp button on the site.
2. **`src/data/projects.ts`** — the four sample projects, including
   `"Location placeholder"` and placeholder areas, areas and years.
3. **`src/data/testimonials.ts`** — the three placeholder quotes.
4. **`src/data/about.ts`** — the placeholder company story and portrait.
5. **`public/images/`** — every photograph is a CC-licensed placeholder. Its
   attribution is rendered on `/credits` and mirrored in
   `public/images/CREDITS.md`. Once real photography replaces them, delete
   `/credits`, the footer link and the `legalNavigation` entry for it.
6. **`/privacy` and `/terms`** — both are templates, not legal advice.
7. **Set the production URL** in `.env.local`:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
   This drives canonical URLs, the sitemap, `robots.txt` and social cards.

## The enquiry form is front-end only

`src/components/sections/EnquiryForm.tsx` validates the details in the browser
and then hands the enquiry to WhatsApp, showing the composed message so the
visitor can review and copy it. **It does not send anything to a server**, and
it never claims a request was submitted.

To connect a real backend, post the validated values to an API route or your
email/CRM provider inside `handleSubmit`, and only set `status` to `"prepared"`
after that request succeeds. The current copy of the notice in that file is
written to be honest about the absence of a server — update it when you wire one
up.

## Design system

Tokens live in `src/app/globals.css` under Tailwind's `@theme`:

- **Ink** `#12110f` / **Graphite** `#26241f` — text and dark surfaces
- **Stone**, **Mist** — secondary text
- **Shell** `#fbfaf7` / **Sand** `#f2ede4` / **Parchment** `#e9e2d6` — surfaces
- **Clay** `#8a6a45` — the only accent
- **Line** / **Line-strong** — hairlines

Type: **Instrument Serif** (display) with **Manrope** (interface), loaded through
`next/font/google` so there is no layout shift and no external request at runtime.

Change the palette in one place by editing the `--color-*` values in
`globals.css`; no component hardcodes a hex value.

## Motion and accessibility

- The hero entrance is pure CSS, so the largest element ships without client JS.
- Sections reveal via one shared IntersectionObserver (`RevealObserver`), not
  per-component listeners.
- `prefers-reduced-motion` is respected globally, and inside Framer Motion via
  `useReducedMotion`.
- The mobile menu traps focus, closes on Escape, restores focus on close and
  locks background scroll.
- The before/after slider is a real range input, so it works with keyboard,
  touch and assistive technology.
- Every image has descriptive alt text; decorative SVGs are `aria-hidden`.
- There is one `h1` per page, a skip link, and visible focus states.

## Notes on the stack

- Server Components by default. `"use client"` appears only where there is real
  interactivity: the navbar, mobile menu, services cross-fade, process timeline,
  before/after slider and the enquiry form.
- Dynamic route `params` are awaited (Next.js 16 requirement).
- Images use `preload` / `fetchPriority` (Next.js 16 replaced `priority`).
- All imagery is local, so no `remotePatterns` are configured in
  `next.config.ts`. Add an entry there if you later load images from a CDN.
