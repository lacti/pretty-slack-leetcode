import * as fs from "fs";
import * as path from "path";

import Solved from "./models/Solved";
import filenamify from "filenamify";
import outputRoot from "./env/outputRoot";
import renderSolved from "./renderSolved";

export default function writeSolved(sol: Solved): string {
  const documentPath = path.join(outputRoot, sol.difficulty);
  if (!fs.existsSync(documentPath)) {
    fs.mkdirSync(documentPath, { recursive: true });
  }

  const fileName =
    ("0000" + sol.id).slice(-4) + "-" + filenamify(sol.slug) + ".md";
  const outputFile = path.join(documentPath, fileName);
  if (sol.solutions.length === 0) {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  } else {
    fs.writeFileSync(path.join(outputFile), renderSolved(sol), "utf8");
  }
  return path.join(sol.difficulty, fileName);
}
