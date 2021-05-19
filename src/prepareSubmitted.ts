import SlackMessage from "./slack/models/SlackMessage";
import Submitted from "./models/Submitted";

const leetcodeUrlPrefix = "https://leetcode.com/problems";

export default function prepareSubmitted(msgs: SlackMessage[]): Submitted[] {
  const map: { [problemUrl: string]: Submitted } = {};

  for (const { text, replies, ts } of msgs.filter(
    (m) =>
      m.text &&
      m.text.includes(leetcodeUrlPrefix) &&
      m.replies &&
      m.replies.length > 0
  )) {
    const problemUrlStart = text.indexOf(leetcodeUrlPrefix);
    const problemUrlEnd = text.indexOf(">", problemUrlStart);
    const problemUrl = text.substring(problemUrlStart, problemUrlEnd);

    if (!(problemUrl in map)) {
      map[problemUrl] = {
        problemUrl,
        replies: [],
        ts: [],
      };
    }
    map[problemUrl].replies.push(...replies);
    map[problemUrl].ts.push(ts);
  }
  return Object.values(map);
}
