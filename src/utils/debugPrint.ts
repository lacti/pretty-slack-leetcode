export default function debugPrint(
  ...args: Parameters<typeof console.debug>
): ReturnType<typeof console.debug> {
  return process.env.DEBUG ? console.debug(...args) : undefined;
}
