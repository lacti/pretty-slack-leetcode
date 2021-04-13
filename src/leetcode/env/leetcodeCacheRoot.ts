import * as path from "path";

const leetcodeCacheRoot =
  process.env.LEETCODE_CACHE_ROOT ?? path.join("data", "questions");

export default leetcodeCacheRoot;
