import * as fs from "fs";
import * as path from "path";

import dataRoot from "../env/dataRoot";

export default function findSlackDataDirectories(): string[] {
  const slackDataDirectories: string[] = [];
  for (const dataDirectoryName of fs.readdirSync(dataRoot)) {
    if (!dataDirectoryName.startsWith("slack")) {
      continue;
    }
    const slackDataDirectory = path.join(dataRoot, dataDirectoryName);
    if (!fs.lstatSync(slackDataDirectory).isDirectory()) {
      continue;
    }
    slackDataDirectories.push(slackDataDirectory);
  }
  return slackDataDirectories.sort((a, b) => a.localeCompare(b));
}
