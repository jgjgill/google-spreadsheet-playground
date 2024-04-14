import figlet from "figlet";
import { Command } from "commander";
import fs from "fs";
import path from "path";

const program = new Command();

console.log(figlet.textSync("Dir manager"));

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();

async function listDirContents(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath);
    const detailedFilesPromises = files.map(async (file) => {
      const fileDetails = await fs.promises.lstat(path.resolve(filepath, file));
      const { size, birthtime } = fileDetails;

      return { filename: file, "size(KB)": size, created_at: birthtime };
    });

    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
  } catch (err) {
    console.error("Error occurred while reading the directory!", err);
  }
}

function createDir(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
    console.log("The directory has been created successfully");
  }
}

function createFile(filePath: string) {
  fs.openSync(filePath, "w");
  console.log("An empty file has been created");
}

if (options.ls) {
  const filePath = typeof options.ls === "string" ? options.ls : __dirname;
  listDirContents(filePath);
}

if (options.mkdir) {
  createDir(path.resolve(__dirname, options.mkdir));
}

if (options.touch) {
  createFile(path.resolve(__dirname, options.touch));
}