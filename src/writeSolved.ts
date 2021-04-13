import * as fs from "fs";
import * as path from "path";

import Solved from "./models/Solved";
import dateFnsFormat from "date-fns/format";
import filenamify from "filenamify";
import outputRoot from "./env/outputRoot";
import renderSolved from "./renderSolved";

export default function writeSolved(sol: Solved): void {
  if (!fs.existsSync(outputRoot)) {
    fs.mkdirSync(outputRoot, { recursive: true });
  }

  const fileName = filenamify(
    `${sol.slug}-${dateFnsFormat(sol.started, "yyyyMMdd")}`
  );
  const outputFile = path.join(outputRoot, fileName + ".md");
  if (sol.solutions.length === 0) {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  } else {
    fs.writeFileSync(path.join(outputFile), renderSolved(sol), "utf8");
  }
}
