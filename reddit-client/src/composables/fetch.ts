import { store } from "@/store";

export async function fetchData(subreddit: string): Promise<void> {
  store.loading = true;
  try {
    console.log(subreddit);
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=5`);
    const result = await response.json();

    console.log(result);

    //store.data = result;
  } catch (error) {
    store.error = (error as Error).message;
  } finally {
    store.loading = false;
  }
}
