# (Ad)mission Possible

The college application, demystified. A landing experience plus an
interactive intake that turns a few questions into a concrete plan —
a recommended application pathway, a balanced starter college list,
and a study track — followed by a student dashboard.

Built for the first in their family. Free.

## What's here

This is a static, dependency-free implementation of the
**Admission Possible** design (imported from Claude Design). It runs as
plain HTML/CSS/JS — no build step, no framework. It is a **multi-page
site**: every section is its own page, sharing injected chrome.

### Pages

| Page | Contents |
|------|----------|
| `index.html` | Home — hero, trust strip, manifesto, closing CTA |
| `how.html` | How it works — the five-step process band |
| `offer.html` | What we offer — self-paced course + 1:1 coaching |
| `writing-course.html` | The writing course — 8 produce-as-you-learn modules |
| `list-builder.html` | College list builder — reach/target/likely + fit factors |
| `pathways.html` | Application pathways — the systems table |
| `coaching.html` | 1:1 coaching detail |
| `join.html` | Join form |
| `router.html` → `plan.html` → `dashboard.html` | The intake flow |

### Shared modules

| File | Responsibility |
|------|----------------|
| `styles.css` | All styling and the responsive layout |
| `data.js` | Nav list, questions, pathways, `computePlan()`, sessionStorage helpers |
| `chrome.js` | Injects the header, full-screen menu, footer, and inline-slash crumb bands on every page |
| `motion.js` | Reveal/scramble/slash scroll motion |

Each page sets `<body data-page="...">`, includes `data.js` then
`chrome.js` + `motion.js`, and supplies only its unique `<main>` content.

## The intake flow

`Get my plan` goes to `router.html`, a 7-question intake (grade,
first-gen status, aid eligibility, GPA + rigor, college types, regions,
and study track). On the last step the answers and the computed plan are
saved to `sessionStorage` and the user is sent to `plan.html`; the plan's
track toggle persists and is reflected on `dashboard.html`. Visiting
`plan.html` or `dashboard.html` without intake redirects back to the
router. `computePlan()` maps the answers to:

- **A pathway** — e.g. _QuestBridge + Common App_, _UC Application + Common App_,
  _CBCA + Common App_, _ApplyTexas + Common App_, or _Common App_.
- **A starter list** — reach / target / likely schools, weighted by GPA.
- **A track** — self-paced course or 1:1 coaching (switchable on the plan screen).

The plan then leads into a dashboard with next step, course progress,
list summary, deadlines, and coaching status.

## Running it locally

No dependencies. Serve the folder over HTTP:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Design notes

- **Type:** Geist Mono (display) + Inter (body).
- **Palette:** warm paper `#ECEAE4`, ink `#3A3A36`, electric `#3B33F0`.
- **Motion:** scroll-triggered reveals and rotating hairline "slashes",
  with an `IntersectionObserver` plus a visibility/timeout fallback so
  content never gets stuck hidden. Respects `prefers-reduced-motion`.
- **Accessibility:** keyboard-focusable controls, reduced-motion support,
  and a responsive layout down to small screens.
