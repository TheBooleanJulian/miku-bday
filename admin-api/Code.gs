// MIKU-19 leaderboard API — Google Apps Script Web App
//
// Bind this script to the "MIKU-19 Leaderboard" Google Sheet (Extensions >
// Apps Script), paste it in as Code.gs, set SHARED_SECRET below to match
// ADMIN_KEY in admin.html, then deploy as a Web App. See README.md in this
// folder for the full step-by-step.

// Must match ADMIN_KEY in admin.html. Anyone with this string can write to
// the sheet, so keep it out of schedule.html (which only ever needs GET).
const SHARED_SECRET = '142c5803f23d7469e0414f4e4b3b3f770c6891690414c18b';

const HEADERS = ['name', 'category', 'score', 'updated'];

function doGet(e) {
  const sheet = getSheet();
  return respond({ ok: true, players: readRows(sheet) });
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

  const sheet = getSheet();

  if (payload.action === 'upsert') {
    const name = String(payload.name || '').trim();
    const category = String(payload.category || 'overall').trim();
    const score = Number(payload.score) || 0;
    if (!name) return respond({ ok: false, error: 'Missing player name' });
    upsertRow(sheet, name, category, score);
  } else if (payload.action === 'delete') {
    deleteRow(sheet, String(payload.name || ''), String(payload.category || ''));
  } else if (payload.action === 'clear') {
    clearRows(sheet);
  } else {
    return respond({ ok: false, error: 'Unknown action: ' + payload.action });
  }

  return respond({ ok: true, players: readRows(sheet) });
}

// Grabs the first tab and makes sure row 1 has the expected headers,
// self-healing anything odd left over from how the sheet was first created.
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  const header = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const matches = HEADERS.every((h, i) => header[i] === h);
  if (!matches) {
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sheet;
}

function readRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  return values
    .filter(r => r[0])
    .map(r => ({
      name: String(r[0]),
      category: String(r[1]),
      score: Number(r[2]) || 0,
      updated: r[3]
    }));
}

function upsertRow(sheet, name, category, score) {
  const lastRow = sheet.getLastRow();
  const now = new Date().toISOString();
  if (lastRow >= 2) {
    const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === name && values[i][1] === category) {
        sheet.getRange(i + 2, 3, 1, 2).setValues([[score, now]]);
        return;
      }
    }
  }
  sheet.appendRow([name, category, score, now]);
}

function deleteRow(sheet, name, category) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i][0] === name && values[i][1] === category) {
      sheet.deleteRow(i + 2);
    }
  }
}

function clearRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.deleteRows(2, lastRow - 1);
  }
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
