import Solved from "./models/Solved";
import dateFnsFormat from "date-fns/format";
import inferenceLanguage from "./utils/inferenceLanguage";

export default function renderSolved(sol: Solved): string {
  return [
    `# ${sol.title}`,
    [
      `- <${sol.url}>`,
      `- ${sol.difficulty} / ${sol.likes} likes / ${sol.dislikes} dislikes`,
      `- Started at ${dateFnsFormat(sol.started, "yyyy-MM-dd HH:mm:ss")}`,
    ].join("\n"),
    sol.content,
    ...sol.solutions.flatMap(({ name, solution, solved }) => [
      `## ${name}`,
      `- Solved at ${dateFnsFormat(solved, "yyyy-MM-dd HH:mm:ss")}`,
      "```" + inferenceLanguage(solution) + "\n" + solution + "\n```",
    ]),
    "---",
  ].join("\n\n");
}
