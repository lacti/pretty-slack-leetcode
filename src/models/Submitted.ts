export default interface Submitted {
  problemUrl: string;
  replies: {
    user: string;
    ts: string;
  }[];
  ts: string[];
}
