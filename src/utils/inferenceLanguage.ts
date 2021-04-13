export default function inferenceLanguage(sol: string): string {
  if (sol.includes("public:")) {
    return "c++";
  }
  if (sol.includes("impl Solution")) {
    return "rust";
  }
  if (sol.includes("def ")) {
    return "python";
  }
  if (sol.includes("function") || sol.includes("() =>")) {
    return "javascript";
  }
  return "java";
}
