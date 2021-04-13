export default function parseSlackTimestamp(ts: string): number {
  return +ts.substring(0, ts.indexOf(".")) * 1000;
}
