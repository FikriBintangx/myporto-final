/**
 * Google Apps Script - Visitor Telemetry Web App Handler
 * Spreadsheet ID: 1POl1a7TytH3tBr3ihWZHZwCK6-AEeYilR_TmyNQYsK4
 * Sheet Name: Visitors
 * Target Site: fikribintang.web.id
 *
 * Cara Deploy di Google Apps Script:
 * 1. Buka https://script.google.com/
 * 2. Buat New Project (beri nama: "Portfolio-Visitor-Telemetry")
 * 3. Copy-paste seluruh isi file ini ke editor Code.gs
 * 4. Klik "Deploy" -> "New deployment"
 * 5. Pilih type: "Web app"
 * 6. Set:
 *    - Description: "Production Visitor Telemetry Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (PENTING: harus Anyone agar client beacon bisa kirim tanpa login)
 * 7. Klik "Deploy" dan copy Web App URL yang dihasilkan (format: https://script.google.com/macros/s/AKfycb.../exec)
 * 8. Simpan Web App URL tersebut di Vercel Environment Variables:
 *    GOOGLE_APPS_SCRIPT_URL = <URL_DEPLOYMENT_ANDA>
 */

const SPREADSHEET_ID = "1POl1a7TytH3tBr3ihWZHZwCK6-AEeYilR_TmyNQYsK4";
const SHEET_NAME = "Visitors";

const HEADERS = [
  "No",
  "Timestamp (WIB)",
  "Path",
  "Referrer",
  "IP",
  "Country",
  "City",
  "Browser/OS",
  "Device",
  "Screen",
  "Session ID"
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    // Format Header Row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1E293B");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setHorizontalAlignment("center");
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent requests
  const hasLock = lock.tryLock(10000);
  if (!hasLock) {
    return createJsonResponse({ status: "busy", message: "Concurrent lock acquired" }, 429);
  }

  try {
    const sheet = getOrCreateSheet();
    let data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Determine sequential No
    const lastRow = sheet.getLastRow();
    let nextNo = 1;
    if (lastRow >= 2) {
      const prevVal = Number(sheet.getRange(lastRow, 1).getValue());
      nextNo = isNaN(prevVal) ? (lastRow) : prevVal + 1;
    }

    // Determine Timestamp WIB
    let timestamp = data.timestamp;
    if (!timestamp || typeof timestamp !== "string" || timestamp.trim() === "") {
      timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss 'WIB'");
    }

    const row = [
      nextNo,
      timestamp,
      data.path || "/",
      data.referrer || "Direct",
      data.ip || "Unknown",
      data.country || "Unknown",
      data.city || "Unknown",
      data.browser || data.browser_os || "Unknown",
      data.device || "Unknown",
      data.screen || "Unknown",
      data.sessionId || data.session_id || "Unknown"
    ];

    sheet.appendRow(row);

    // Apply auto alignment
    const newRowIdx = sheet.getLastRow();
    sheet.getRange(newRowIdx, 1, 1, HEADERS.length).setHorizontalAlignment("center");
    sheet.getRange(newRowIdx, 3).setHorizontalAlignment("left"); // Path
    sheet.getRange(newRowIdx, 4).setHorizontalAlignment("left"); // Referrer

    return createJsonResponse({
      status: "success",
      no: nextNo,
      timestamp: timestamp,
      path: data.path || "/"
    }, 200);

  } catch (err) {
    return createJsonResponse({
      status: "error",
      error: err.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  // Check if test ping is supplied
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return doPost(e);
  }

  return createJsonResponse({
    service: "Visitor Telemetry Endpoint",
    target: "fikribintang.web.id",
    sheetId: SPREADSHEET_ID,
    tab: SHEET_NAME,
    status: "active",
    serverTimeWib: Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss 'WIB'")
  }, 200);
}

function createJsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Manual test function to verify sheet connection directly from Apps Script editor
 */
function testAppendVisitor() {
  const result = doPost({
    postData: {
      contents: JSON.stringify({
        timestamp: Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss 'WIB'"),
        path: "/portfolio?test=1",
        referrer: "Direct / AppsScript Test",
        ip: "127.0.0.1",
        country: "Indonesia",
        city: "Tangerang",
        browser: "Chrome 134 / macOS",
        device: "Desktop",
        screen: "1920x1080 (2x)",
        sessionId: "ses_test_" + Date.now().toString(36)
      })
    }
  });
  Logger.log(result.getContent());
}
