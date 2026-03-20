# community-gameday-europe-event

Event-specific configuration for **AWS Community GameDay Europe 2026**.

This repository holds only what changes between editions — participant data, schedule, face photos. All stream visuals and web player code live in the template repository. Pushing to `main` triggers an automatic build and deploy.

> **Two-repo architecture:**
> [`community-gameday-europe-stream-templates`](https://github.com/mzzavaa/community-gameday-europe-stream-templates) — all code, compositions, design system
> [`community-gameday-europe-event`](https://github.com/mzzavaa/community-gameday-europe-event) — this repo, event config + deploys

---

## Live page

https://mzzavaa.github.io/community-gameday-europe-event/

---

## Setup

Three one-time steps after forking, then every push deploys automatically.

**1. Enable workflows**

Go to the **Actions** tab of your fork and click:
> "I understand my workflows, go ahead and enable them"

GitHub disables workflows on all forks by default. This click is unavoidable.

**2. Enable GitHub Pages**

Go to **Settings → Pages** and change the Source dropdown:

> Source: ~~Deploy from a branch~~ → **GitHub Actions** → Save

GitHub does not allow workflows to enable Pages automatically on forked repos. This click is also unavoidable.

**3. Trigger a deploy**

Either push any change to `main`, or re-run the workflow manually:

- **GitHub UI:** Actions → Deploy to GitHub Pages → latest run → Re-run jobs
- **CLI:** `gh workflow run deploy.yml --repo <your-org>/<your-repo-name>`

> If the workflow already ran before you enabled Pages in step 2, the deploy was skipped.
> Re-running it is required — this is a one-time thing.

Your page will be live at:
`https://<your-org-or-username>.github.io/<your-repo-name>/`

The URL also appears at the top of **Settings → Pages** after the first successful deploy.

---

## How it works

On every push to `main`, GitHub Actions:

1. Checks out [`community-gameday-europe-stream-templates`](https://github.com/mzzavaa/community-gameday-europe-stream-templates) as the build base
2. Overwrites `stream/config/participants.ts` with `config/participants.ts` from this repo
3. Overwrites `stream/web-player/src/schedule.ts` with `config/schedule.ts` from this repo
4. Merges face photos from `public/faces/` into `stream/public/assets/faces/`
5. Builds the web player with Vite (base path derived from your repo name automatically)
6. Deploys the built output to GitHub Pages

No manual build step needed. Push → live in ~2 minutes.

See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for the full workflow.

---

## Repository structure

```
community-gameday-europe-event/
│
├── config/
│   ├── participants.ts   ← Organizers, AWS supporters, all 57 user groups + logos
│   ├── schedule.ts       ← Web player segment timing and event start time
│   └── inserts.md        ← Insert schedule and operator prep for this edition
│
├── public/
│   └── faces/            ← Organizer face photos (firstname.jpg, all lowercase)
│
└── .github/workflows/
    └── deploy.yml        ← Builds from template repo + deploys to GitHub Pages
```

---

## Using a forked or modified template

By default this repo builds against the upstream template:
`mzzavaa/community-gameday-europe-stream-templates`

If you want to use your own fork of the template (e.g. to change compositions, design, or add new inserts):

1. Fork [`community-gameday-europe-stream-templates`](https://github.com/mzzavaa/community-gameday-europe-stream-templates) and make your changes
2. In **this** repo (your event repo fork), go to **Settings → Secrets and variables → Actions → Variables tab**
3. Create a new variable:
   - **Name:** `TEMPLATE_REPO`
   - **Value:** `your-org/your-template-repo-name`
4. Push to `main` — the workflow now builds from your template fork

No changes to any workflow file needed.

---

## Updating config for a new edition

Edit the files in `config/` and push:

| File | What to update |
|---|---|
| `config/participants.ts` | Organizers (name, fullName, role, city, bio, face), AWS supporters, user group list with logo URLs |
| `config/schedule.ts` | Event date, segment start times relative to event start |
| `config/inserts.md` | Insert schedule, team spotlight prep, city shoutout list |
| `public/faces/` | Add organizer face photos (`firstname.jpg`, all lowercase) |

> `config/event.ts` (event name, host name, timezone) lives in the **template repo**, not here. Update it there for a new edition.

---

## Remotion Studio

To preview compositions locally, clone the template repo:

```bash
git clone https://github.com/mzzavaa/community-gameday-europe-stream-templates.git
cd community-gameday-europe-stream-templates
npm install
npm run studio
```

Open **http://localhost:3000** — all 35 compositions appear in the sidebar.

[![Remotion Studio — all compositions in the sidebar](https://raw.githubusercontent.com/mzzavaa/community-gameday-europe-stream-templates/main/screenshots/studio/readme-remotion-studio.png)](https://github.com/mzzavaa/community-gameday-europe-stream-templates)

**Remotion Studio runs at:** http://localhost:3000
**Template repo:** https://github.com/mzzavaa/community-gameday-europe-stream-templates
**Remotion docs:** https://www.remotion.dev/docs/studio

---

## Documentation

All detailed documentation lives in the template repo:

| Document | Link |
|---|---|
| Full developer guide (Remotion Studio, rendering, all compositions) | [docs/remotion.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/remotion.md) |
| Stream operator playbook (when to trigger each insert) | [docs/playbook.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/playbook.md) |
| Insert design rules and how to create a new one | [docs/inserts.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/inserts.md) |
| Pre-show phase details | [docs/00-preshow-muted.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/00-preshow-muted.md) |
| Main event phase details | [docs/01-mainevent-audio.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/01-mainevent-audio.md) |
| Gameplay phase details | [docs/02-gameplay-muted.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/02-gameplay-muted.md) |
| Closing ceremony details | [docs/03-closing-audio.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/docs/03-closing-audio.md) |
| Filling in winner data before closing | [TEMPLATE.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/TEMPLATE.md) |
| How to adapt for your own event | [CONTRIBUTING.md](https://github.com/mzzavaa/community-gameday-europe-stream-templates/blob/main/CONTRIBUTING.md) |
| This edition's insert schedule | [config/inserts.md](config/inserts.md) |

---

## Schedule (CET)

| Time | Segment | Audio | Description |
|---|---|---|---|
| 17:30 | Pre-Show Loop | Muted | Countdown + info loop while teams gather |
| 18:00 | Live Stream | Audio | Welcome, speakers, GameDay instructions |
| 18:30 | GameDay | Muted | 2 hours of competitive cloud challenges |
| 20:30 | Closing Ceremony | Audio | Winners revealed globally |

All times CET. Event spans 4+ timezones across 20+ countries.

---

## License

[CC BY-NC-SA 4.0](LICENSE) — built by community volunteers for non-commercial community use.
