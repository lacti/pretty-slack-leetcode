import Solution from "./Solution";

export default interface Solved {
  id: number;
  title: string;
  slug: string;
  url: string;

  started: number[];
  content: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  solutions: Solution[];
}
