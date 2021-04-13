import cacheOrFetchLeetcode from "./leetcode/fetch/cacheOrFetchLeetcode";
import debugPrint from "./utils/debugPrint";
import isSolution from "./utils/isSolution";
import loadSlackMessages from "./slack/fetch/loadSlackMessages";
import loadSlackUsers from "./slack/fetch/loadSlackUsers";
import parseSlackTimestamp from "./slack/utils/parseSlackTimestamp";
import trimSolution from "./utils/trimSolution";
import writeSolved from "./writeSolved";

const leetcodeUrlPrefix = "https://leetcode.com/problems";

async function main({
  channelName = "algorithm",
}: { channelName?: string } = {}) {
  const users = loadSlackUsers();
  const msgs = loadSlackMessages(channelName);
  debugPrint({
    users: Object.keys(users).length,
    msgs: Object.keys(msgs).length,
  });

  const targetUsers = process.argv[2]
    ? process.argv[2].split(",").map((each) => each.trim().toLowerCase())
    : null;
  debugPrint({ targetUsers });

  for (const { text, replies, ts } of Object.values(msgs).filter(
    (m) => m.text && m.text.includes(leetcodeUrlPrefix)
  )) {
    const problemUrlStart = text.indexOf(leetcodeUrlPrefix);
    const problemUrlEnd = text.indexOf(">", problemUrlStart);
    const problemUrl = text.substring(problemUrlStart, problemUrlEnd);
    if (replies && replies.length > 0) {
      const {
        data: { question: q },
      } = await cacheOrFetchLeetcode(problemUrl);
      debugPrint({
        content: q.content,
        difficulty: q.difficulty,
        likes: q.likes,
        dislikes: q.dislikes,
      });

      const replyMsgs = replies.map((r) => msgs[r.ts]).filter(Boolean);
      debugPrint(problemUrl, replies.length, replies.length);

      writeSolved({
        title: q.title,
        slug: q.titleSlug,
        url: `${leetcodeUrlPrefix}/${q.titleSlug}/`,
        started: parseSlackTimestamp(ts),
        content: q.content,
        difficulty: q.difficulty,
        likes: q.likes,
        dislikes: q.dislikes,
        solutions: replyMsgs
          .map((r) => ({
            name: users[r.user].real_name,
            solution: trimSolution(r.text),
            solved: parseSlackTimestamp(r.ts),
          }))
          .filter(({ solution }) => isSolution(solution))
          .filter(
            ({ name }) =>
              targetUsers === null || targetUsers.includes(name.toLowerCase())
          ),
      });
    }
  }
}

if (require.main === module) {
  main();
}
