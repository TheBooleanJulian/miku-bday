# MIKU.39 — Birthday Countdown & Event Page

A sci-fi futuristic countdown landing page for Hatsune Miku's 19th birthday celebration, with an auto-unlocking schedule and leaderboard management system.

## 📁 Project Structure

```
miku-bday/
├── index.html          # Main countdown landing page
├── schedule.html       # Hidden schedule/leaderboard (auto-unlocks at event time)
├── admin.html          # Admin dashboard for managing games & scores
├── style.css           # Shared styling (sci-fi neon theme)
├── script.js           # Countdown logic
└── README.md           # This file
```

## 🎯 Features

### Landing Page (`index.html`)
- **Sci-Fi Countdown**: Real-time countdown timer to August 30, 2026 at 3:00 PM SGT
- **Miku Silhouette**: Animated Hatsune Miku silhouette in the background
- **Neon Aesthetics**: Cyan/magenta color scheme with glitch effects and animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Easter Egg**: Barely visible link to schedule.html (for testing/debugging)

### Schedule Page (`schedule.html`)
- **Auto-Unlock**: Automatically unlocks when countdown reaches 0 or after Aug 30 3pm SGT
- **Access via URL**: Can be accessed directly with `?unlocked=true` parameter for testing
- **Event Timeline**: Full schedule of activities throughout the day
- **Game Cards**: Clickable cards linking to different games
- **Leaderboards**: Multiple leaderboards (Overall, Quiz Master, etc.)
- **Admin-Updated**: Scores can be filled in from admin dashboard in real-time

### Admin Dashboard (`admin.html`)
- **Game Management**: Add/edit/delete games with custom links
- **Score Tracking**: Manage player Mikudollars across different game categories
- **Data Export**: Export games and leaderboard data
- **Local Storage**: All data stored in browser localStorage for persistence
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
1. Visit `miku-bday.thebooleanjulian.dev/admin.html`
2. **Add Games**:
   - Enter game title, emoji, description, and URL
   - Click "Add Game" to save
   - Games appear on schedule.html immediately

3. **Update Leaderboard**:
   - Enter player name and Mikudollars score
   - Select game category (Overall, Quiz Master, etc.)
   - Click "Add/Update Score"
   - Scores update on schedule.html in real-time

4. **Export Data**:
   - Use "Export" buttons to backup your data
   - Data is stored in browser localStorage

### Testing
- **Test schedule page**: Visit `schedule.html?unlocked=true` at any time
- **Test unlock**: Change the BIRTHDAY_DATE in `script.js` to a past time
- **Test responsiveness**: Use browser dev tools to test mobile view

## ⚙️ Configuration

### Change Event Time
Edit the event date in `script.js`:
```javascript
const BIRTHDAY_DATE = new Date('2026-08-30T15:00:00+08:00').getTime();
```

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
- **Storage**: Uses browser localStorage for leaderboard data
- **Animations**: CSS keyframes for smooth, looping effects
- **Responsive**: CSS Grid and Flexbox for responsive layouts
- **No Dependencies**: Pure HTML/CSS/JavaScript — no external libraries needed

## 🎨 Customization Ideas

1. **Change Miku silhouette**: Modify the SVG in HTML files
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

**Data not persisting?**
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
