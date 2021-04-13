import leetcodeSlugRedirectionMapping from "../env/leetcodeSlugRedirectionMapping";

export default function parseLeetcodeSlug(leetcodeUrl: string): string {
  // https://leetcode.com/problems/maximum-depth-of-n-ary-tree/submissions/
  const [, , , , slug] = leetcodeUrl.split(/\//g);
  return leetcodeSlugRedirectionMapping[slug] ?? slug;
}
