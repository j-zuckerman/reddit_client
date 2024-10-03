import type Post from "./posts";

export interface Store {
  data: Post | null;
  error: string | null;
  loading: boolean;
}
