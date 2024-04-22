import { Command } from "commander";
import fs from "fs";
import { SHEET } from "../utils.ts/template";
import path from "path";

export const sheet = new Command()
  .name("sheet")
  .description("초기 시트를 생성합니다.")
  .action(() => {
    const root = process.cwd();
    const sheetDir = path.join(root, "sheet");

    if (!fs.existsSync(sheetDir)) {
      fs.mkdirSync(sheetDir, { recursive: true });
    }

    fs.writeFileSync(path.join(sheetDir, "index.ts"), SHEET);
  });
