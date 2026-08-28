// MIKU-19 leaderboard + games API — Google Apps Script Web App
//
// Bind this script to the "MIKU-19 Leaderboard" Google Sheet (Extensions >
// Apps Script), paste it in as Code.gs, set SHARED_SECRET below to match
// ADMIN_KEY in admin.html, then deploy as a Web App. See README.md in this
// folder for the full step-by-step.
//
// Two tabs are auto-created on first run if they don't already exist:
//
//   "Leaderboard": name | attendance | game 1 | game 2 | ...
//     One row per guest. Score = 100 x (sum of every column after name).
//     Add more "game N" columns directly in the sheet as you add games —
//     the script sums however many columns exist, no code changes needed.
//     You edit these values by hand in the sheet; this API only reads them.
//
//   "Games": title | emoji | description | url
//     One row per game. Managed entirely from admin.html (Game Management).

// Must match ADMIN_KEY in admin.html. Anyone with this string can write to
// the sheet, so keep it out of schedule.html (which only ever needs GET).
const SHARED_SECRET = '142c5803f23d7469e0414f4e4b3b3f770c6891690414c18b';

const LEADERBOARD_SHEET_NAME = 'Leaderboard';
const LEADERBOARD_HEADERS = ['name', 'attendance', 'game 1', 'game 2'];

const GAMES_SHEET_NAME = 'Games';
const GAMES_HEADERS = ['title', 'emoji', 'description', 'url'];

function doGet(e) {
  return respond({
    ok: true,
    players: computeLeaderboard(getOrCreateSheet(LEADERBOARD_SHEET_NAME, LEADERBOARD_HEADERS)),
    games: readGames(getOrCreateSheet(GAMES_SHEET_NAME, GAMES_HEADERS))
  });
}

function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ ok: false, error: 'Malformed request body' });
  }

  if (payload.key !== SHARED_SECRET) {
    return respond({ ok: false, error: 'Unauthorized' });
  }

  if (payload.action === 'addGame') {
    const title = String(payload.title || '').trim();
    if (!title) return respond({ ok: false, error: 'Missing game title' });
    const sheet = getOrCreateSheet(GAMES_SHEET_NAME, GAMES_HEADERS);
    sheet.appendRow([
      title,
      String(payload.emoji || ''),
      String(payload.description || ''),
      String(payload.url || '')
    ]);
  } else if (payload.action === 'deleteGame') {
    deleteGameRow(getOrCreateSheet(GAMES_SHEET_NAME, GAMES_HEADERS), String(payload.title || ''));
  } else {
    return respond({ ok: false, error: 'Unknown action: ' + payload.action });
  }

  return respond({
    ok: true,
    players: computeLeaderboard(getOrCreateSheet(LEADERBOARD_SHEET_NAME, LEADERBOARD_HEADERS)),
    games: readGames(getOrCreateSheet(GAMES_SHEET_NAME, GAMES_HEADERS))
  });
}

// Gets a tab by name, creating it with the given headers if it doesn't
// exist yet. If it exists but the first columns don't match, only those
// header cells are rewritten — any extra columns the user already added
// (e.g. "game 3", "game 4") are left untouched.
function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return sheet;
  }
  const width = Math.max(headers.length, sheet.getLastColumn() || headers.length);
  const existing = sheet.getRange(1, 1, 1, width).getValues()[0];
  const matches = headers.every((h, i) => existing[i] === h);
  if (!matches) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

function computeLeaderboard(sheet) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  const players = values
    .filter(r => r[0])
    .map(r => {
      let sum = 0;
      for (let i = 1; i < r.length; i++) {
        sum += Number(r[i]) || 0;
      }
      return { name: String(r[0]), score: sum * 100 };
    });
  players.sort((a, b) => b.score - a.score);
  return players;
}

function readGames(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, GAMES_HEADERS.length).getValues();
  return values
    .filter(r => r[0])
    .map(r => ({
      title: String(r[0]),
      emoji: String(r[1]),
      description: String(r[2]),
      url: String(r[3])
    }));
}

function deleteGameRow(sheet, title) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i][0] === title) sheet.deleteRow(i + 2);
  }
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
