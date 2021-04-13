import LeetcodeQuestion from "../models/LeetcodeQuestion";
import fetch from "node-fetch";
import parseLeetcodeSlug from "./parseLeetcodeSlug";
import queryToFetchQuestion from "./queryToFetchQuestion";
import userAgent from "../env/userAgent";

export default async function fetchLeetcode(
  leetcodeUrl: string
): Promise<LeetcodeQuestion> {
  const slug = parseLeetcodeSlug(leetcodeUrl);
  if (!slug) {
    throw new Error(`Invalid URL[${leetcodeUrl}]`);
  }
  const body = JSON.stringify({
    operationName: "questionData",
    variables: { titleSlug: slug },
    query: queryToFetchQuestion,
  });
  // console.debug({ slug, body });
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "user-agent": userAgent,
      "content-type": "application/json",
      origin: "https://leetcode.com",
      referer: leetcodeUrl,
    },
    body,
  });
  if (!response.ok) {
    throw new Error(`Rejected from URL[${leetcodeUrl}]`);
  }
  try {
    return await response.json();
  } catch (error) {
    console.error({ leetcodeUrl, error }, "Error occurred from Leetcode");
    throw new Error(`Error from URL[${leetcodeUrl}]: ${error.message}`);
  }
}
