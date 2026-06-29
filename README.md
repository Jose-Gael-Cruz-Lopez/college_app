# (Ad)mission Possible

The college application, demystified. A landing experience plus an
interactive intake that turns a few questions into a concrete plan —
a recommended application pathway, a balanced starter college list,
and a study track — followed by a student dashboard.

Built for the first in their family. Free.

## What's here

This is a static, dependency-free implementation of the
**Admission Possible** design (imported from Claude Design). It runs as
plain HTML/CSS/JS — no build step, no framework.

| File | Responsibility |
|------|----------------|
| `index.html` | Semantic markup for the landing sections + overlay mount |
| `styles.css` | All styling and the responsive layout |
| `app.js` | Landing behaviour: nav, scroll-hide header, reveal/scramble motion, pathways table |
| `flow.js` | The interactive flow: menu, router quiz, computed plan, dashboard |

## The intake flow

`Get my plan` opens a 7-question router (grade, first-gen status,
aid eligibility, GPA + rigor, college types, regions, and study track).
`computePlan()` maps the answers to:

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
