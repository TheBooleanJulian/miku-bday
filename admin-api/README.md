# Live leaderboard + games backend (Google Sheets + Apps Script)

The leaderboard and game list are backed by a real Google Sheet — **[MIKU-19 Leaderboard](https://docs.google.com/spreadsheets/d/1n3x0Ja9P03StAkhcK54SxXFhuk-Lkssptwvr0lCp0EA/edit)** — through a small Google Apps Script "Web App" that acts as the API. This is a one-time, ~2 minute manual setup (Google requires you personally to authorize the deployment — it can't be scripted from outside your account).

## Sheet layout

`Code.gs` auto-creates both tabs (with correct headers) the first time it runs, so you don't need to set this up by hand — but here's what it looks like:

- **`Leaderboard`** tab — `name | attendance | game 1 | game 2 | ...`. One row per guest. **You edit the score values by hand directly in this sheet** (attendance + each game's points) — the API only reads them, it never writes here. Add more `game 3`, `game 4`, ... columns as you add games; the script sums however many columns exist for each row, multiplies by 100, and that's the guest's Mikudollars score. No code changes needed when you add a column.
- **`Games`** tab — `title | emoji | description | url`. One row per game. This one **is** written to by `admin.html`'s Game Management form — add/delete games there and they show up on `schedule.html` automatically.

## 1. Open the Apps Script editor

1. Open the [sheet](https://docs.google.com/spreadsheets/d/1n3x0Ja9P03StAkhcK54SxXFhuk-Lkssptwvr0lCp0EA/edit).
2. **Extensions → Apps Script**.
3. Delete the placeholder `myFunction() {}` code, then paste in the full contents of [`Code.gs`](Code.gs) from this folder.
4. Click the save icon (or Ctrl/Cmd+S).

## 2. Deploy as a Web App

1. Top-right **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → **Web app**.
3. Settings:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy**. The first time, Google will ask you to authorize the script — click through the consent screens (you'll see an "unverified app" warning since this is your own private script; click **Advanced → Go to (project name)** to proceed).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 3. Wire the site up to it

Paste that URL into the `APPS_SCRIPT_URL` constant in **both**:
- [`schedule.html`](../schedule.html) (search for `REPLACE_WITH_YOUR_DEPLOYED_WEB_APP_URL`)
- [`admin.html`](../admin.html) (same placeholder)

Commit and push. That's the only push needed — after this:
- **Scores**: edit the `Leaderboard` tab directly (attendance + game columns); `schedule.html` picks up the change within ~20 seconds.
- **Games**: add/edit/delete from `admin.html`'s Game Management form; same ~20 second turnaround on `schedule.html`.

## Notes

- `SHARED_SECRET` in `Code.gs` must match `ADMIN_KEY` in `admin.html` — they're already set to the same generated value. If you regenerate one, update the other.
- `doGet` (reading leaderboard + games) is intentionally public/unauthenticated — that's what lets `schedule.html` show live data to guests without any login. `doPost` (adding/deleting games) requires `SHARED_SECRET`, which only `admin.html`'s source carries.
- If you ever edit `Code.gs` again, you need to **Deploy → Manage deployments → edit (pencil) → New version → Deploy** for changes to take effect — saving alone doesn't republish a live deployment.
- Open the sheet directly any time to bulk-edit attendance/scores or eyeball the numbers — that's the normal workflow now, not a fallback.
- The sheet currently has a leftover **"Sheet1"** tab from its original setup (unused now that the script reads named `Leaderboard`/`Games` tabs) — safe to delete or rename, it's not read by anything.
