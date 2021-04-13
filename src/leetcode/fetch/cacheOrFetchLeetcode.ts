import * as fs from "fs";
import * as path from "path";

import LeetcodeQuestion from "../models/LeetcodeQuestion";
import fetchLeetcode from "./fetchLeetcode";
import filenamify from "filenamify";
import leetcodeCacheRoot from "../env/leetcodeCacheRoot";

export default async function cacheOrFetchLeetcode(
  leetcodeUrl: string
): Promise<LeetcodeQuestion> {
  if (!fs.existsSync(leetcodeCacheRoot)) {
    fs.mkdirSync(leetcodeCacheRoot, { recursive: true });
  }
  const cacheFile = path.join(leetcodeCacheRoot, filenamify(leetcodeUrl));
  if (fs.existsSync(cacheFile)) {
    const maybe = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    if (!("errors" in maybe)) {
      return maybe;
    }
  }
  const data = await fetchLeetcode(leetcodeUrl);
  fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2), "utf8");
  return data;
}
