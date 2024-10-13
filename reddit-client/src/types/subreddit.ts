import type Post from "./posts";

export default interface Subreddit {
  name: string;
  url: string;
  posts: Post[];
  id: string;
}
