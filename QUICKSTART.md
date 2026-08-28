# 🎂 MIKU.39 — Quick Start Guide

## What You Got

A complete sci-fi futuristic countdown & event page for Miku's birthday celebration.

## 📋 Files Included

```
✅ index.html       → Main countdown page (shows time until Aug 30, 3pm SGT)
✅ schedule.html    → Event schedule & live leaderboard (unlocks automatically)
✅ admin.html       → Password-gated dashboard to manage games & scores
✅ admin-api/       → Apps Script + setup guide for the live Google Sheets leaderboard
✅ style.css        → Shared styling for schedule.html & admin.html (sci-fi neon theme)
✅ README.md        → Full documentation
✅ QUICKSTART.md    → This file
```

## 🚀 Deploy to Your Domain

### Step 1: Upload Files to Zeabur
1. Create a new project on [zeabur.com](https://zeabur.com)
2. Deploy the `miku-bday` folder to your domain `miku-bday.thebooleanjulian.dev`
3. Done! 🎉

### Step 2: Set Up the Live Leaderboard (one-time)
Follow **[admin-api/README.md](admin-api/README.md)** to deploy the Google Apps
Script that backs the leaderboard, then paste the resulting URL into
`APPS_SCRIPT_URL` in both `schedule.html` and `admin.html`. Takes ~2 minutes.
Skip this and the leaderboard just shows "unavailable" — the rest of the site
still works.

### Step 3: Test Everything
- Visit `miku-bday.thebooleanjulian.dev` → See countdown
- Visit `miku-bday.thebooleanjulian.dev/schedule.html?unlocked=true` → See schedule
- Visit `miku-bday.thebooleanjulian.dev/admin.html` → Enter the password → Manage games & scores

## 🎮 Using the Admin Dashboard

### Add Games
1. Go to `admin.html` and enter the password
2. Fill in:
   - Game Title (e.g., "Quiz Master")
   - Emoji (e.g., 🎯)
   - Description
   - Full Game URL (where people play)
3. Click "✚ Add Game"
4. Games appear on `schedule.html` instantly!

### Update Leaderboard
1. Go to `admin.html` → "Leaderboard Management"
2. Enter:
   - Player Name
   - Mikudollars (score)
   - Game Category (Overall, Quiz Master, etc.)
3. Click "✚ Add/Update Score"
4. It's written straight to the Google Sheet — `schedule.html` picks it up
   within ~20 seconds, no redeploy needed.

## 🧪 Testing Before Event

### Test the Schedule Page
Visit this URL at ANY time to see the schedule:
```
miku-bday.thebooleanjulian.dev/schedule.html?unlocked=true
```

### Test Unlock Timing
The schedule auto-unlocks when:
- Current time reaches August 30, 2026 at 3:00 PM SGT
- OR when someone visits with `?unlocked=true` parameter

## 🎨 Customization

### Change Event Time
Each page keeps its own inline countdown target — update all of them together:
- `index.html`: `const target = new Date('2026-08-30T15:00:00+08:00');`
- `schedule.html`: `const BIRTHDAY_DATE = new Date('2026-08-30T15:00:00+08:00').getTime();`

### Change Colors
Edit `style.css`, lines 8-15:
```css
--primary-cyan: #00d4ff;
--primary-magenta: #ff006e;
--secondary-purple: #8b5cf6;
```

### Edit Schedule Items
In `schedule.html`, find the timeline section and modify times/descriptions

### Add More Leaderboards
In `schedule.html`, duplicate the `.leaderboard` div and change the title

## 📊 Data Management

- **Player scores** live in the [Google Sheet](admin-api/README.md) — shared
  across every browser/device, no export needed to keep them in sync
- **Game links** are still stored in this browser's **localStorage** only
- Export data regularly as backup!

### Backup Your Data
1. Go to admin.html
2. Click "📦 Export All Data"
3. Copy the JSON and save it somewhere safe

## 🔐 Security Notes

- This is a **public website** — anyone can see schedule content
- `admin.html` has no visible link anywhere on the site — the only way in is
  a hidden easter egg on `index.html` (crank all three FILTER knobs to max),
  which reveals a small ⚙ ADMIN link — plus a password prompt on the page
  itself (default `xymiku39`, change it — see the comment at the top of
  `admin.html`'s script)
- This is **obscurity + a lightweight client-side check, not real server-side
  auth** — anyone who finds the URL and reads the page source can see the API
  key it uses to write scores. Good enough to keep casual guests out; don't
  rely on it for anything sensitive
- Reading the leaderboard (`schedule.html`) is intentionally public/unauthenticated

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Countdown not showing | Refresh page, check browser console |
| Schedule won't unlock | Check system time, use `?unlocked=true` to test |
| Leaderboard shows "unavailable" | `APPS_SCRIPT_URL` not set yet — see `admin-api/README.md` |
| Admin game links not saving | Check localStorage is enabled (not Incognito mode) |
| Site looks broken | Clear browser cache (Ctrl+Shift+Delete) |
| Mobile layout weird | Check viewport is set correctly in browser |

## 📱 Mobile Optimization

Site is fully responsive! Works great on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

## 🎯 Event Day Checklist

- [ ] Site deployed to `miku-bday.thebooleanjulian.dev`
- [ ] Tested countdown on desktop & mobile
- [ ] Added all games to admin dashboard
- [ ] Set up initial leaderboard with player names
- [ ] Tested schedule page with `?unlocked=true`
- [ ] Shared countdown link with guests
- [ ] Backed up your data
- [ ] Checked timezone is SGT (UTC+8)

## 💡 Pro Tips

1. **Keep the admin password private** — Don't share it or the knob-combo trick publicly
2. **Update scores frequently** — Keep leaderboard fresh throughout the day
3. **Test on mobile** — Most guests will visit on phones
4. **Export before end** — Backup final scores in case of data loss
5. **Custom game links** — You can link to external games or internal pages

## 🎤 Display Tips

- Show countdown on a big screen during registration
- After 3pm, auto-redirects to schedule for everyone
- Print out final leaderboard for awards ceremony
- Share admin dashboard link with co-organizers only

## 📞 Need Help?

- Check **README.md** for detailed documentation
- Review **style.css** comments for styling details
- Look at **schedule.html** to customize timeline & games
- Inspect **script.js** for countdown logic

## 🎂 Final Notes

This is a **near-fully self-contained** website:
- No backend server to host or maintain yourself
- One external call: `schedule.html`/`admin.html` fetch the leaderboard from
  a Google Apps Script Web App (see `admin-api/README.md`) — everything else
  is plain HTML, CSS, and JavaScript
- No third-party dependencies beyond your own Google account

Deploy it and it just works! ✨

---

**Happy birthday to Miku! 🎉🎂** 

May your event be filled with Mikudollars and good vibes! 🎵💙
