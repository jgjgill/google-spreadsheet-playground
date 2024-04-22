import { Command } from "commander";
import readline from "node:readline/promises";
import fs from "fs";

export const config = new Command()
  .name("config")
  .description("구글스프레드 인증 및 세팅 설정을 진행합니다.")
  .action(async () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Please provide your Google Service Account Email:");
    const email = await rl.question("Email: ");
    addToDotenv("GOOGLE_SERVICE_ACCOUNT_EMAIL", email);

    console.log("Please provide your Google Private Key:");
    const key = await rl.question("Key: ");
    addToDotenv("GOOGLE_PRIVATE_KEY", key);

    console.log("Please provide your Spreadsheet Document ID:");
    const docId = await rl.question("Document ID: ");
    addToDotenv("SPREADSHEET_DOC_ID", docId);

    rl.close();
  });

function addToDotenv(key: string, value: string) {
  fs.appendFileSync(".env", `\n${key}="${value}"`);
}
