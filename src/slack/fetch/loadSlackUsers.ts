import * as fs from "fs";
import * as path from "path";

import SlackUser from "../models/SlackUser";
import SlackUserMap from "../models/SlackUserMap";
import dataRoot from "../env/dataRoot";
import findSlackDataDirectories from "../utils/findSlackDataDirectories";

export default function loadSlackUsers(): SlackUserMap {
  const slackDataDirectories = findSlackDataDirectories();
  if (slackDataDirectories.length === 0) {
    throw new Error(`Please dump Slack export data into [${dataRoot}]`);
  }

  // Find the latest "users.json" file from all dumps.
  const allUsersFiles = slackDataDirectories
    .map((slackDataDirectory) => path.join(slackDataDirectory, "users.json"))
    .filter((usersFile) => fs.existsSync(usersFile));
  if (allUsersFiles.length === 0) {
    throw new Error(
      `Cannot find users.json from Slack export data directories [${dataRoot}]`
    );
  }

  const usersFile = allUsersFiles[allUsersFiles.length - 1];
  const users: SlackUser[] = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  return users.reduce(
    (map, user) => Object.assign(map, { [user.id]: user }),
    {} as SlackUserMap
  );
}
