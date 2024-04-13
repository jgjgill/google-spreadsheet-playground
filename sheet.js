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

const newSheet = doc.sheetsByTitle["새로운 시트"];
await newSheet.delete();
