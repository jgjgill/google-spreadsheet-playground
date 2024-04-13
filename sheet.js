import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "dotenv/config";

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetDocId = process.env.SPREADSHEET_DOC_ID;

const doc = new GoogleSpreadsheet(spreadsheetDocId, serviceAccountAuth);

await doc.loadInfo();

const sheet = doc.sheetsById["0"];

await sheet.loadCells("A1:E10"); // 셀 범위를 로컬 캐시에 로드 - 셀 반환하지 않음
console.log(sheet.cellStats); // nonEmpty, loaded, total

const a1 = sheet.getCell(0, 0); // zero-based index
const a2 = sheet.getCell(1, 0);

console.log(a1.value, a2.value);

a1.value = "name";
a2.value = "이종길";
a1.textFormat = { bold: true };

await sheet.saveUpdatedCells();
