import * as fs from "fs";
import * as path from "path";

import SlackMessage from "../models/SlackMessage";
import slackDataRoot from "../env/slackDataRoot";

export default function loadSlackMessages(
  channelName: string
): { [ts: string]: SlackMessage } {
  const map: { [ts: string]: SlackMessage } = {};
  const channelRoot = path.join(slackDataRoot, channelName);
  if (!fs.existsSync(channelRoot)) {
    throw new Error(
      `Please dump Slack export data into [${slackDataRoot}] or check your channel name.`
    );
  }

  for (const fileName of fs.readdirSync(channelRoot)) {
    const jsonFile = path.join(channelRoot, fileName);
    if (!jsonFile.endsWith(".json") || !fs.lstatSync(jsonFile).isFile()) {
      continue;
    }
    const messages: SlackMessage[] = JSON.parse(
      fs.readFileSync(jsonFile, "utf8")
    );
    messages.forEach((msg) => (map[msg.ts] = msg));
  }
  return map;
}
