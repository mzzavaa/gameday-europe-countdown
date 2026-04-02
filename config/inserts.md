# Insert Schedule & Prep — AWS Community GameDay Europe 2026

Inserts are full-screen 30-second slides used during the gameplay phase by the stream operator.
All insert compositions live in the stream template repo. This file is the event-specific prep:
which inserts to use, in what order, and what data to fill in beforehand.

See the full operator guide in the stream template repo:
[`docs/playbook.md`](https://github.com/linda-mhmd/community-gameday-europe-stream-templates/blob/main/docs/playbook.md)

---

## Scheduled inserts (can be prepared in advance)

These do not depend on live data. Prepare them before the event by editing the variables
at the top of each `.tsx` file in Remotion Studio.

| Time (T+ from game start 18:30) | Insert | Notes |
|---|---|---|
| T+0 (18:30) | `Insert-QuestsLive` | Quests confirmed live — no changes needed |
| T+20 (18:50) | `Insert-TeamSpotlight` | See spotlight prep below |
| T+30 (19:00) | `Insert-LocationShoutout` | See city list below |
| T+60 (19:30) | `Insert-HalfTime` | No changes needed |
| T+65 (19:35) | `Insert-TopTeams` | Fill in from live leaderboard at that moment |
| T+70 (19:40) | `Insert-TeamSpotlight` | Second spotlight — different region than first |
| T+90 (20:00) | `Insert-LeaderboardHidden` | If scores go dark for final stretch |
| T+105 (20:15) | `Insert-FinalCountdown` | Set `MINUTES_REMAINING = 15` |
| T+115 (20:25) | `Insert-TeamSpotlight` | Third spotlight — team that had a good run |
| T+118 (20:28) | `Insert-FinalCountdown` | Set `MINUTES_REMAINING = 2` |
| T+120 (20:30) | `Insert-ScoresCalculating` | No changes needed |

---

## Reactive inserts (fill in live)

These respond to what's actually happening — do not schedule them.

| What's happening | Insert to use |
|---|---|
| First team finishes a quest | `Insert-FirstCompletion` — fill in TEAM and QUEST name |
| Two teams within 50-100 pts | `Insert-CloseRace` — fill in both team names and point gap |
| Team climbs 5+ positions | `Insert-ComebackAlert` — fill in team name and from/to rank |
| X of Y teams finished a quest | `Insert-CollectiveMilestone` — fill in counts |
| Quest breaks | `Insert-QuestBroken` → fix → `Insert-QuestFixed` |
| Platform issue | `Insert-TechnicalIssue` |
| Gamemaster announcement | `Insert-GamemastersUpdate` |
| Break needed | `Insert-BreakAnnouncement` → return → `Insert-WelcomeBack` |

---

## Team spotlight prep

Prepare 3 spotlights in advance. Fill these into `Insert-TeamSpotlight` before the event.
Good FACT lines: first-time participants, notable travel, cross-country team, unique group story.
Avoid: job titles, company names, anything corporate.

**Spotlight 1 — T+20 (central/western Europe)**
```
TEAM_NAME    = "TBD — fill from registrations"
USER_GROUP   = "TBD"
COUNTRY      = "TBD"
COUNTRY_FLAG = "TBD"
FACT         = "TBD"
```

**Spotlight 2 — T+70 (different region: north/south/east)**
```
TEAM_NAME    = "TBD"
USER_GROUP   = "TBD"
COUNTRY      = "TBD"
COUNTRY_FLAG = "TBD"
FACT         = "TBD"
```

**Spotlight 3 — T+115 (team that's had a notable run)**
```
TEAM_NAME    = "TBD — fill live based on leaderboard"
USER_GROUP   = "TBD"
COUNTRY      = "TBD"
COUNTRY_FLAG = "TBD"
FACT         = "TBD"
```

---

## Location shoutout list (T+30)

Used in `Insert-LocationShoutout`. Shout out cities in a wave — mix regions.
Suggested order for Europe 2026 (23 countries, 53+ groups):

```
LOCATIONS = [
  { city: "Vienna", country: "Austria", flag: "🇦🇹" },
  { city: "Brussels", country: "Belgium", flag: "🇧🇪" },
  { city: "Berlin", country: "Germany", flag: "🇩🇪" },
  { city: "Paris", country: "France", flag: "🇫🇷" },
  { city: "Warsaw", country: "Poland", flag: "🇵🇱" },
  { city: "Budapest", country: "Hungary", flag: "🇭🇺" },
  { city: "Bucharest", country: "Romania", flag: "🇷🇴" },
  { city: "Helsinki", country: "Finland", flag: "🇫🇮" },
  { city: "Zürich", country: "Switzerland", flag: "🇨🇭" },
  { city: "Rome", country: "Italy", flag: "🇮🇹" },
  { city: "Athens", country: "Greece", flag: "🇬🇷" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷" },
  { city: "Oslo", country: "Norway", flag: "🇳🇴" },
  { city: "Ljubljana", country: "Slovenia", flag: "🇸🇮" },
  { city: "Ivano-Frankivsk", country: "Ukraine", flag: "🇺🇦" },
]
```

---

## Quest hints (prepare with Gamemasters before event)

Used in `Insert-QuestHint` if teams get stuck. Get these from Arnaud/Loïc in advance.

| Quest | Hint |
|---|---|
| Quest 1 | TBD — ask Gamemasters |
| Quest 2 | TBD |
| Quest 3 | TBD |
| Quest 4 | TBD |
| Quest 5 | TBD |

---

## Rules reminder

- **One insert max every 10 minutes** during active gameplay
- **30 seconds max** per insert — return to `02-Gameplay` immediately after
- Reactive inserts (quest breaks, first completion) can happen anytime
- `LeaderboardHidden` → `ScoresCalculating` → closing — do not skip steps
