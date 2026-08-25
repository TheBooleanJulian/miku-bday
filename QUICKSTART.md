# 🎂 MIKU.39 — Quick Start Guide

## What You Got

A complete sci-fi futuristic countdown & event page for Miku's birthday celebration.

## 📋 Files Included

```
✅ index.html       → Main countdown page (shows time until Aug 30, 3pm SGT)
✅ schedule.html    → Event schedule & leaderboard (unlocks automatically)
✅ admin.html       → Dashboard to manage games & scores
✅ style.css        → All styling (sci-fi neon theme)
✅ script.js        → Countdown timer logic
✅ README.md        → Full documentation
✅ QUICKSTART.md    → This file
```

## 🚀 Deploy to Your Domain

### Step 1: Upload Files to Zeabur
1. Create a new project on [zeabur.com](https://zeabur.com)
2. Deploy the `miku-bday` folder to your domain `miku-bday.thebooleanjulian.dev`
3. Done! 🎉

### Step 2: Test Everything
- Visit `miku-bday.thebooleanjulian.dev` → See countdown
- Visit `miku-bday.thebooleanjulian.dev/schedule.html?unlocked=true` → See schedule
- Visit `miku-bday.thebooleanjulian.dev/admin.html` → Manage games & scores

## 🎮 Using the Admin Dashboard

### Add Games
1. Go to `admin.html`
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
4. Leaderboard updates instantly!

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
Edit `script.js`, line 1:
```javascript
const BIRTHDAY_DATE = new Date('2026-08-30T15:00:00+08:00').getTime();
```

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

- All data is stored in **browser localStorage**
- Data persists across page refreshes
- Each browser/device has separate storage
- Export data regularly as backup!

### Backup Your Data
1. Go to admin.html
2. Click "📦 Export All Data"
3. Copy the JSON and save it somewhere safe

## 🔐 Security Notes

- This is a **public website** — anyone can see schedule content
- Admin page has NO password protection — keep URL private!
- For added security, use HTTP auth or host admin.html on a private URL
- All data is client-side only (not sent to any server)

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Countdown not showing | Refresh page, check browser console |
| Schedule won't unlock | Check system time, use `?unlocked=true` to test |
| Admin changes not saving | Check localStorage is enabled (not Incognito mode) |
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

1. **Keep admin URL private** — Don't share `admin.html` link publicly
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

This is a **completely self-contained** website:
- No backend server needed
- No external API calls
- No third-party dependencies
- Just plain HTML, CSS, and JavaScript
- Total size: ~50KB

Deploy it and it just works! ✨

---

**Happy birthday to Miku! 🎉🎂** 

May your event be filled with Mikudollars and good vibes! 🎵💙
