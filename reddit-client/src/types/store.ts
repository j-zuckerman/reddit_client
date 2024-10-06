import type Subreddit from "./subreddit";

export interface Store {
  data: Subreddit[];
  error: string | null;
  loading: boolean;
}
