# (Ad)mission Possible

The college application, demystified. A landing experience plus an
interactive intake that turns a few questions into a concrete plan —
a recommended application pathway, a balanced starter college list,
and a study track — followed by a student dashboard.

Built for the first in their family. Free.

## Stack

Migrated from a vanilla multi-page site to a single-page app:

- **React 18** + **TypeScript** (strict)
- **Vite** (dev server + build)
- **React Router** for client-side routing

The original vanilla implementation is preserved in git history (see the
`legacy/` directory before the migration commits).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
  main.tsx              # entry; mounts <App/> in <BrowserRouter>
  App.tsx               # routes, all nested under the Chrome layout
  types.ts              # shared domain types
  data/                 # nav, questions, pathways, computePlan, sessionStorage
  hooks/
    useReveal.ts        # scroll reveal/slash + hero scramble (per route)
    useScrollHideHeader.ts
  components/            # Chrome, Header, Menu, Footer, Crumbs, Icon, Circle, Slash, Wordmark
  pages/                # Home, How, Offer, Pathways, Coaching, Join,
                        # WritingCourse, ListBuilder, Router, Plan, Dashboard
  styles/global.css     # the full design system (ported verbatim)
public/icons/           # static assets (the supplied learn-write pencil)
```

## Routes

| Path                               | Page                 |
| ---------------------------------- | -------------------- |
| `/`                                | Home                 |
| `/how`                             | How it works         |
| `/offer`                           | What we offer        |
| `/writing-course`                  | The writing course   |
| `/list-builder`                    | College list builder |
| `/pathways`                        | Application pathways |
| `/coaching`                        | Coaching             |
| `/join`                            | Join                 |
| `/router` → `/plan` → `/dashboard` | The intake flow      |

## The intake flow

`Get my plan` goes to `/router`, a 7-question intake. On the last step the
answers and the computed plan are saved to `sessionStorage` and the user is
sent to `/plan`; the plan's track toggle persists and is reflected on
`/dashboard`. Visiting `/plan` or `/dashboard` without intake redirects back
to the router. `computePlan()` maps answers to a pathway, a balanced
reach/target/likely list, and a track.

## Deployment

This is a client-routed SPA, so the host must serve `index.html` for every
path (preserving the old site's direct-URL behaviour). `vercel.json` does
this with a catch-all rewrite. On other static hosts, add the equivalent
SPA fallback (e.g. a `404.html` copy of `index.html` for GitHub Pages).

## Design notes

- **Type:** Geist Mono (display) + Inter (body).
- **Palette:** warm paper `#ECEAE4`, ink `#3A3A36`, electric `#3B33F0`.
- **Motion:** scroll-triggered reveals and rotating hairline "slashes",
  re-scanned on each route change, with an `IntersectionObserver` plus a
  visibility/timeout fallback. Respects `prefers-reduced-motion`.
- **Icons:** original freehand line icons, plus the supplied
  `learn-write.png` (Streamline Freehand) for the Learn & write step.
