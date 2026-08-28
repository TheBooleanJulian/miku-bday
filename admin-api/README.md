# Live leaderboard backend (Google Sheets + Apps Script)

The leaderboard is backed by a real Google Sheet — **[MIKU-19 Leaderboard](https://docs.google.com/spreadsheets/d/1n3x0Ja9P03StAkhcK54SxXFhuk-Lkssptwvr0lCp0EA/edit)** — with columns `name | category | score | updated`. `admin.html` writes to it and `schedule.html` reads from it through a small Google Apps Script "Web App" that acts as the API. This is a one-time, ~2 minute manual setup (Google requires you personally to authorize the deployment — it can't be scripted from outside your account).

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

Commit and push. That's the only push needed — after this, every score you add/edit/delete from the admin dashboard goes straight to the sheet and shows up on `schedule.html` within ~20 seconds, no further deploys required.

## Notes

- `SHARED_SECRET` in `Code.gs` must match `ADMIN_KEY` in `admin.html` — they're already set to the same generated value. If you regenerate one, update the other.
- `doGet` (reading the leaderboard) is intentionally public/unauthenticated — that's what lets `schedule.html` show live scores to guests without any login. `doPost` (writing) requires `SHARED_SECRET`, which only `admin.html`'s source carries.
- If you ever edit `Code.gs` again, you need to **Deploy → Manage deployments → edit (pencil) → New version → Deploy** for changes to take effect — saving alone doesn't republish a live deployment.
- The sheet is manually creatable/browsable any time — open it directly if you want to bulk-edit or eyeball scores outside the admin dashboard.
