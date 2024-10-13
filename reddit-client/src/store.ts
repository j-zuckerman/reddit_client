import { reactive } from "vue";
import { type Store } from "./types/store";

export const store = reactive<Store>({
  data: [],
  error: null,
  loading: false,
});

export function deleteSubreddit(subredditId: string) {
  const index = store.data.findIndex((subreddit) => subreddit.id === subredditId);
  if (index !== -1) {
    store.data.splice(index, 1);
  }
}
