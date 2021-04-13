import * as fs from "fs";
import * as path from "path";

import SlackUser from "../models/SlackUser";
import SlackUserMap from "../models/SlackUserMap";
import slackDataRoot from "../env/slackDataRoot";

export default function loadSlackUsers(): SlackUserMap {
  const usersFile = path.join(slackDataRoot, "users.json");
  if (!fs.existsSync(usersFile)) {
    throw new Error(`Please dump Slack export data into [${slackDataRoot}]`);
  }
  const users: SlackUser[] = JSON.parse(
    fs.readFileSync(path.join(slackDataRoot, "users.json"), "utf8")
  );
  return users.reduce(
    (map, user) => Object.assign(map, { [user.id]: user }),
    {} as SlackUserMap
  );
}
