# (Ad)mission Possible

> The college application, demystified — and free, built for the first in their family.

A landing experience plus an interactive intake that turns a few questions
into a concrete plan — a recommended application pathway, a balanced starter
college list, and a study track — followed by a student dashboard.

---

## Table of contents

- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Routes](#routes)
- [Home intro animation](#home-intro-animation)
- [The intake flow](#the-intake-flow)
- [Design system](#design-system)
- [Accessibility](#accessibility)
- [Testing & CI](#testing--ci)
- [Deployment](#deployment)

---

## Overview

(Ad)mission Possible is a single-page app (migrated from a vanilla
multi-page site) that walks a student from a bold landing page through a
7-question intake and into a personalized plan and dashboard. The goal is to
make the application process legible for students who are navigating it
without a map.

The original vanilla implementation is preserved in git history (see the
`legacy/` directory before the migration commits).

---

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| UI             | **React 18** + **TypeScript** (strict)  |
| Build / dev    | **Vite**                                |
| Routing        | **React Router** (client-side)          |
| Styling        | A single hand-authored `global.css`     |
| Tests          | **Vitest** + **Testing Library** (jsdom)|
| Hosting        | Static SPA (Vercel rewrite / SPA fallback) |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build
```

---

## Available scripts

| Script                | What it does                                  |
| --------------------- | --------------------------------------------- |
| `npm run dev`         | Start the Vite dev server with HMR            |
| `npm run build`       | Type-check then build to `dist/`              |
| `npm run preview`     | Serve the production build locally            |
| `npm run typecheck`   | `tsc`, no emit                                |
| `npm run lint`        | ESLint (flat config, TS + react-hooks)        |
| `npm run format`      | Prettier write (`format:check` to verify)     |
| `npm test`            | Vitest + Testing Library (jsdom)              |

---

## Project structure

```
public/
  icons/                # static assets (the supplied learn-write pencil)
  intro/                # thumbnail art for the Home intro animation (t1–t8.svg)
src/
  main.tsx              # entry; mounts <App/> in <BrowserRouter>
  App.tsx               # routes, all nested under the Chrome layout
  types.ts              # shared domain types
  data/                 # nav, questions, pathways, computePlan, sessionStorage
  hooks/
    useReveal.ts        # scroll reveal/slash + hero scramble (per route)
    useScrollHideHeader.ts
  components/
    Chrome, Header, Menu, Footer, Crumbs, Icon, Circle, Slash, Wordmark
    IntroFloat.tsx      # the Home floating-image hero (see below)
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
