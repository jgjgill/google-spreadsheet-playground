#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import { config } from "./commands/config";
import { sheet } from "./commands/sheet";

async function main() {
  const program = new Command();

  console.log(figlet.textSync("jgjgill"));

  program.version("1.0.0").description("Google Spreadsheet Playground");

  program.addCommand(config).addCommand(sheet);

  program.parse(process.argv);
}

main();
