import * as fs from "fs";
import * as path from "path";

import SolvedFile from "./models/SolvedFile";
import outputRoot from "./env/outputRoot";

export default function writeIndex(files: SolvedFile[]): void {
  if (!fs.existsSync(outputRoot)) {
    fs.mkdirSync(outputRoot, { recursive: true });
  }

  const indexFile = path.join(outputRoot, "README.md");
  fs.writeFileSync(
    indexFile,
    `# Problems solved\n\n` +
      files
        .filter((file) => fs.existsSync(path.join(outputRoot, file.filePath)))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((file) => `- [${file.title}](${file.filePath})`)
        .join("\n"),
    "utf8"
  );
}
