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

## Structure

Dream Design is a survey and civil consultancy (since 2012, Annur). The
site is a single page; the navbar highlights the section being read.

| Section | Id | Notes |
| --- | --- | --- |
| Hero | `#home` | |
| Services | `#services` | Survey / Civil Consultant switch, then a list of every service with a picture and full explanation |
| Process | `#process` | Same two cards, each showing its own step-by-step process |
| About | `#about` | Shared |
| Contact | `#contact` | Enquiry form with a Survey / Civil Consultant / both picker |

Clicking "Enquire" in a service or process panel pre-selects that service in the
form. Old URLs (`/services`, `/process`, `/about`, `/contact`, `/projects`)
redirect to the matching section. Edit content in `src/data/offerings.ts`
(services and processes), `src/data/about.ts` and `src/data/site.ts`
(phone, email, address, WhatsApp number).
