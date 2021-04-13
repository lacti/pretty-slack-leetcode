import * as htmlEntities from "html-entities";

export default function trimSolution(text: string): string {
  if (!text.includes("```")) {
    return text.trim();
  }
  const solStart = text.indexOf("```") + 3;
  const solEnd = text.indexOf("```", solStart);
  const sol = text.substring(solStart, solEnd);
  return htmlEntities.decode(
    sol
      .replace(/\r/g, "")
      .split(/\n/g)
      .filter((line) => !line.trim().startsWith("//"))
      .join("\n")
      .trim()
  );
}
