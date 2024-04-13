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

sheet.setHeaderRow(["nickname", "blog"]);

await sheet.addRow({
  nickname: "jgjgill",
  blog: "https://jgjgill-blog.netlify.app/",
});

const rows = await sheet.getRows();

console.log(rows[0].get("nickname"), rows[0].get("blog"));
