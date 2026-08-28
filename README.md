# MIKU.39 — Birthday Countdown & Event Page

A sci-fi futuristic countdown landing page for Hatsune Miku's 19th birthday celebration, with an auto-unlocking schedule and leaderboard management system.

## 📁 Project Structure

```
miku-bday/
├── index.html          # Main countdown landing page (self-contained: inline CSS/JS)
├── schedule.html       # Hidden schedule/leaderboard (auto-unlocks at event time)
├── admin.html          # Password-gated admin dashboard for managing games & scores
├── admin-api/          # Google Apps Script + setup guide backing the live leaderboard
├── style.css           # Shared styling for schedule.html & admin.html
├── script.js           # Legacy countdown logic (not used by index.html)
└── README.md           # This file
```

## 🎯 Features

### Landing Page (`index.html`)
- **Sci-Fi Countdown**: Real-time countdown timer to August 30, 2026 at 3:00 PM SGT
- **Angular Accent Shapes**: Animated cyan/magenta clip-path shards in the background and signature badge (no character imagery)
- **Neon Aesthetics**: Cyan/magenta color scheme with glitch effects and animations
- **Mobile-First**: On phones, the title and countdown are reordered to the top so they're visible without scrolling; desktop keeps the full multi-panel dashboard
- **Interactive Synth Knobs**: Drag any dial (mouse or touch); a live SYNC meter tracks real progress from Aug 14 to the event
- **Enter the Simulation**: Central button that unlocks at countdown-zero and links to `schedule.html?unlocked=true`
- **Debug Easter Egg**: Crank all three FILTER knobs (CUTOFF/RES/ENV) to max to unlock debug mode early — also reveals a hidden ⚙ link to `admin.html`, the only entry point to it on the whole site
- **Data Archive**: Two poster buttons open the event poster and full schedule in a lightbox

### Schedule Page (`schedule.html`)
- **Auto-Unlock**: Automatically unlocks when countdown reaches 0 or after Aug 30 3pm SGT
- **Access via URL**: Can be accessed directly with `?unlocked=true` parameter for testing
- **Event Timeline**: Matches the event poster sequence (Arrival → Opening → games → Cake → Hologram Rave → Marble Race)
- **Game Cards**: Clickable cards linking to different games
- **Leaderboards**: One panel per score category, rebuilt from whatever's in the Google Sheet
- **Live**: Polls the leaderboard API every ~20s — no admin push/deploy needed to see new scores

### Admin Dashboard (`admin.html`)
- **Password-Gated**: No visible link anywhere on the site; reachable only via a hidden easter egg on `index.html` (see below), plus a password prompt on the page itself
- **Game Management**: Add/edit/delete games with custom links (stored in browser localStorage)
- **Score Tracking**: Reads/writes player Mikudollars straight to the live Google Sheet via `admin-api/`
- **Data Export**: Export games and leaderboard data as JSON
- **Easy Reset**: Clear all data with one button

## 🚀 Deployment

### To Zeabur (Recommended)

This is a static site, so deployment is simple:

1. **Push to GitHub**:
   ```bash
   cd miku-bday
   git init
   git add .
   git commit -m "Initial Miku birthday site"
   git push origin main
   ```

2. **Deploy on Zeabur**:
   - Go to [Zeabur](https://zeabur.com)
   - Import your GitHub repository
   - Set domain to `miku-bday.thebooleanjulian.dev`
   - Deploy! ✨

### Alternative: Serve Locally

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Open: http://localhost:8000
```

## 🎮 How to Use

### For Guests
1. Visit `miku-bday.thebooleanjulian.dev` to see the countdown
2. On August 30 at 3pm SGT, the page auto-redirects to the schedule
3. Access game links from the schedule page
4. View real-time Mikudollars leaderboards

### For Admin (You!)
1. On `index.html`, drag the FILTER section's CUTOFF, RES, and ENV knobs all the way up to unlock debug mode, then click the ⚙ ADMIN link it reveals in the top bar (or just navigate to `admin.html` directly if you already know the URL)
2. Enter the admin password
3. **Add Games**:
   - Enter game title, emoji, description, and URL
   - Click "Add Game" to save
   - Games appear on schedule.html immediately

4. **Update Leaderboard**:
   - Enter player name and Mikudollars score
   - Select game category (Overall, Quiz Master, etc.)
   - Click "Add/Update Score"
   - Written straight to the Google Sheet — schedule.html picks it up within ~20s

5. **Export Data**:
   - Use "Export" buttons to backup your data as JSON

### Testing
- **Test schedule page**: Visit `schedule.html?unlocked=true` at any time
- **Test unlock**: Change the `BIRTHDAY_DATE` in `schedule.html` to a past time
- **Test responsiveness**: Use browser dev tools to test mobile view

## 📊 Live Leaderboard Setup

The leaderboard is backed by a real Google Sheet, read/written through a small
Google Apps Script Web App — see **[admin-api/README.md](admin-api/README.md)**
for the one-time (~2 min) deployment steps. Until that URL is pasted into
`APPS_SCRIPT_URL` in both `schedule.html` and `admin.html`, the leaderboard
panels just show "unavailable" — everything else on the site works fine
without it.

## ⚙️ Configuration

### Change Event Time
Each page keeps its own inline countdown target — update all of them together:
- `index.html`: `const target = new Date('2026-08-30T15:00:00+08:00');`
- `schedule.html`: `const BIRTHDAY_DATE = new Date('2026-08-30T15:00:00+08:00').getTime();`

Format: `YYYY-MM-DDTHH:MM:SS+TZ:TZ`

### Customize Colors
Edit color variables in `style.css`:
```css
:root {
    --primary-cyan: #00d4ff;
    --primary-magenta: #ff006e;
    --secondary-purple: #8b5cf6;
    /* ... */
}
```

### Modify Schedule Items
Edit timeline items in `schedule.html` (around line 180-220)

### Add/Remove Game Cards
Game cards in `schedule.html` can be customized or duplicated (around line 230-280)

## 🛠️ Technical Details

- **Countdown Logic**: Real-time calculations using JavaScript Date API
- **Timezone**: Event time is in Singapore Time (SGT/UTC+8)
- **Storage**: Player scores live in Google Sheets (via Apps Script); game links use browser localStorage
- **Animations**: CSS keyframes for smooth, looping effects
- **Responsive**: CSS Grid and Flexbox for responsive layouts
- **No Dependencies**: Pure HTML/CSS/JavaScript — no build tools or external libraries needed

## 🎨 Customization Ideas

1. **Change the accent shapes**: Adjust the `.angular-deco .shard` clip-paths in `index.html` for different background silhouettes
2. **Add more games**: Duplicate game cards and update links
3. **Multiple leaderboards**: Add new leaderboard divs in schedule.html
4. **Custom fonts**: Import Google Fonts or use system fonts
5. **Different color scheme**: Update CSS variables
6. **Add music**: Embed Miku songs with audio elements

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🐛 Troubleshooting

**Countdown not updating?**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

**Schedule page locked?**
- Use `?unlocked=true` parameter for testing
- Check that your system time is correct
- Verify event date in `script.js`

**Leaderboard shows "unavailable"?**
- `APPS_SCRIPT_URL` isn't configured yet — see `admin-api/README.md`
- Check the Apps Script is deployed with "Who has access: Anyone"

**Game links not persisting?**
- Check browser localStorage is enabled
- Private/Incognito mode doesn't support localStorage
- Export data regularly as backup

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file is loading (Network tab)
- Verify no CSS file is corrupted

## 📝 Notes

- Event date: **August 30, 2026 at 3:00 PM SGT**
- Organized by: **Xymiku.39**
- Theme: **Sci-Fi Futuristic**
- Colors: **Cyan (#00d4ff) & Magenta (#ff006e)**

## 🎂 Good luck with the birthday celebration! 🎂

For updates or issues, check the GitHub repository or contact TheBooleanJulian.
