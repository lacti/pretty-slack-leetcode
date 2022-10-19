import * as fs from "fs";
import * as path from "path";

import SlackMessage from "../models/SlackMessage";
import dataRoot from "../env/dataRoot";
import findSlackDataDirectories from "../utils/findSlackDataDirectories";

export default function loadSlackMessages(channelName: string): {
  [ts: string]: SlackMessage;
} {
  const map: { [ts: string]: SlackMessage } = {};

  // Prepare all channel root directories.
  const channelRoots = findSlackDataDirectories()
    .map((slackDataDirectory) => path.join(slackDataDirectory, channelName))
    .filter((channelRoot) => fs.existsSync(channelRoot))
    .sort((a, b) => a.localeCompare(b));
  if (channelRoots.length === 0) {
    throw new Error(
      `Please dump Slack export data into [${dataRoot}] or check your channel name.`
    );
  }

  // Prepare a file map with latest files.
  const jsonFiles: { [fileName: string]: string } = {};
  for (const channelRoot of channelRoots) {
    for (const fileName of fs.readdirSync(channelRoot)) {
      const jsonFile = path.join(channelRoot, fileName);
      if (!jsonFile.endsWith(".json") || !fs.lstatSync(jsonFile).isFile()) {
        continue;
      }
      jsonFiles[fileName] = jsonFile;
    }
  }

  // Load them all.
  for (const jsonFile of Object.values(jsonFiles).sort((a, b) =>
    a.localeCompare(b)
  )) {
    const messages: SlackMessage[] = JSON.parse(
      fs.readFileSync(jsonFile, "utf8")
    );
    messages.forEach((msg) => (map[msg.ts] = msg));
  }
  return map;
}
