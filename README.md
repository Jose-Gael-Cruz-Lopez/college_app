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
  styles/global.css     # the full design system
```

> Files are grouped by role (data / hooks / components / pages / styles).
> Imports rely on these locations, so prefer extending a folder over moving
> files across folders.

---

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

---

## Home intro animation

The Home page opens with a full-screen **floating-image hero**
(`src/components/IntroFloat.tsx`): the headline _"Impossible is just a
deadline."_ sits centered while ~20 thumbnail images orbit it.

**Behaviour**

- **Scattered, never a grid** — tiles are placed by percentage coordinates
  across every quadrant, at three depth tiers (`far` / `mid` / `near`) that
  drive size, opacity, blur, z-index, and movement amount.
- **Load animation** — each image arrives from an exaggerated outer offset,
  fading and scaling into place on a staggered `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Scroll-linked inward → outward** — progress across the section feeds a
  `--inward` custom property (peaks ~45% scroll). Tiles interpolate between an
  outward vector (ends) and an inward vector (mid), so they travel toward the
  headline and then release back out.
- **Continuous drift** — each image has an independent looping float on a
  separate layer, so idle motion never fights the scroll transform.

**Three-layer composition** keeps transforms from colliding:

| Layer            | Owns                                  |
| ---------------- | ------------------------------------- |
| `.itile`         | scatter position + scroll parallax    |
| `.itile__inner`  | continuous idle drift                 |
| `.itile__media`  | one-shot load arrival                 |

**Performance & a11y** — only `transform` / `opacity` animate, `will-change`
is scoped to animated wrappers, far images lazy-load, and
`prefers-reduced-motion` disables drift/parallax in favour of a static
fade-in. The headline is always real text.

**Swapping in real photos** — drop files into `public/intro/` and update the
`IMAGES` array at the top of `IntroFloat.tsx`; positions and motion keep
working unchanged. The included `t1.svg`–`t8.svg` are brand-palette
placeholders.

---

## The intake flow

`Get my plan` goes to `/router`, a 7-question intake. On the last step the
answers and the computed plan are saved to `sessionStorage` and the user is
sent to `/plan`; the plan's track toggle persists and is reflected on
`/dashboard`. Visiting `/plan` or `/dashboard` without intake redirects back
to the router. `computePlan()` maps answers to a pathway, a balanced
reach/target/likely list, and a track.

---

## Design system

- **Type** — Geist Mono (display) + Inter (body).
- **Palette**
  | Token       | Value       | Use                 |
  | ----------- | ----------- | ------------------- |
  | `--bg`      | `#F5F2E0`   | warm cream paper    |
  | `--ink`     | `#3A3A36`   | text                |
  | `--muted`   | `#6F6E68`   | secondary text      |
  | `--accent`  | `#E8491D`   | orange accent       |
  | `--card`    | `#FBFAF1`   | surfaces            |
  | `--hairline`| `#C9C6BE`   | rules / borders     |
- **Motion** — scroll-triggered reveals and rotating hairline "slashes",
  re-scanned on each route change (`IntersectionObserver` + visibility/timeout
  fallback), plus the Home intro animation above. All respect
  `prefers-reduced-motion`.
- **Icons** — original freehand line icons, plus the supplied
  `learn-write.png` for the Learn & write step.

---

## Accessibility

- Skip link, `main` landmark, and visible focus styles.
- The menu dialog has dialog semantics and moves focus on open.
- Router options are keyboard-operable.
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
