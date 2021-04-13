import * as path from "path";

const slackDataRoot = process.env.SLACK_DATA_ROOT ?? path.join("data", "slack");

export default slackDataRoot;
