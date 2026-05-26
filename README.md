# Elite's Portfolio Website

This repository contains the source code for my personal portfolio website. I've decided to open-source it so other developers — especially other Roblox scripters — can learn from the structure, reuse parts of the design, and ship their own portfolios faster.

Please read the usage terms below before copying anything.

---

## Project structure

```
docs/
  index.html          # Site entry point
  css/
  js/                 # main.js and modules
  json/
    videoJson/        # Video showcase metadata
    osJson/           # Open-source project metadata
  assets/             # Videos, images, favicon
LICENSE.md
README.md
```

The site is published with **GitHub Pages** from the `/docs` folder on the `main` branch.
---

## What you ARE allowed to use

You're free to copy, modify, and reuse the parts of this repository that make the website work and that define its visual design, including:

- The HTML structure (`docs/index.html`)
- The CSS / styling and visual design (`docs/css/`) — colors, layout, animations, particles, hover effects, glassmorphism cards, etc.
- The JavaScript logic (`docs/js/`, e.g. `main.js` and its modules) — rendering, tab switching, "show all" behavior, status logic, etc.
- The general project structure and file organization
- The JSON-driven content pattern (the *schema* of the JSON files in `docs/json/videoJson/` and `docs/json/osJson/`, not their contents)

You can use these for personal projects, commercial portfolios, client work, or learning. Attribution is appreciated but not required for the code/design itself.

## What you are NOT allowed to use

The following are **not** covered by the open-source permission above and may not be copied, redistributed, or reused:

- **Video assets** — every file under `docs/assets/*.mp4` (showcase recordings of my work).
- **Image assets of my open-source modules** — every file under `docs/assets/*.png` (e.g. `eliteDataStoreService.png`, `voidSentry.png`, etc.) and the `favicon.svg`.
- **Personal / identity content**, including but not limited to:
  - My name, alias ("Elite" / "Elentium"), or any wording that implies the portfolio is mine.
  - The biography and "About me" text.
  - The contact links (Discord profile, Roblox profile, GitHub username, etc.).
  - The specific JSON content under `docs/json/` that points to my projects, modules, or social links.
  - Pricing, terms of service text, and any other authored copy that describes *me* or *my services*.

If you reuse the code/design, you must replace all of the above with your own assets, your own information, and your own content. Do **not** ship a portfolio that still references me or links to my profiles.

---

## Deploying on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/docs`**.
5. Save. The site will be available at `https://<username>.github.io/<repo>/` after a minute or two.

---

## TL;DR

- Code + design: **yes**, copy away.
- My videos, images, name, bio, and contact links: **no**, those are mine.
- Build your own portfolio with your own work — don't pretend mine is yours.

See [`LICENSE.md`](LICENSE.md) for the full legal license that applies to the code.
