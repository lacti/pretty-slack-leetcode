import Solved from "./models/Solved";
import SolvedFile from "./models/SolvedFile";
import cacheOrFetchLeetcode from "./leetcode/fetch/cacheOrFetchLeetcode";
import debugPrint from "./utils/debugPrint";
import isSolution from "./utils/isSolution";
import loadSlackMessages from "./slack/fetch/loadSlackMessages";
import loadSlackUsers from "./slack/fetch/loadSlackUsers";
import parseSlackTimestamp from "./slack/utils/parseSlackTimestamp";
import prepareSubmitted from "./prepareSubmitted";
import trimSolution from "./utils/trimSolution";
import writeIndex from "./writeIndex";
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

  const answers: Solved[] = [];
  for (const { problemUrl, replies, ts } of prepareSubmitted(
    Object.values(msgs)
  )) {
    const {
      data: { question: q },
    } = await cacheOrFetchLeetcode(problemUrl);
    if (!q || !q.content) {
      console.error({ problemUrl }, "Invalid question");
      continue;
    }
    debugPrint({
      content: q.content,
      difficulty: q.difficulty,
      likes: q.likes,
      dislikes: q.dislikes,
    });

    const replyMsgs = replies.map((r) => msgs[r.ts]).filter(Boolean);
    debugPrint(problemUrl, replies.length, replies.length);

    const numberTitle = `${q.questionId}. ${q.title}`;
    answers.push({
      id: +q.questionId,
      title: numberTitle,
      slug: q.titleSlug,
      url: `${leetcodeUrlPrefix}/${q.titleSlug}/`,
      started: ts.map((t) => parseSlackTimestamp(t)),
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
        )
        .sort((a, b) => a.solved - b.solved),
    });
  }

  const files: SolvedFile[] = [];
  for (const answer of answers.sort((a, b) => a.id - b.id)) {
    const filePath = writeSolved(answer);
    files.push({
      id: answer.id,
      difficulty: answer.difficulty,
      title: answer.title,
      filePath,
    });
  }

  writeIndex(files);
}

if (require.main === module) {
  main();
}
