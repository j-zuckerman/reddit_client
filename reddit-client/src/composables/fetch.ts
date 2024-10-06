import { store } from "@/store";
import type Subreddit from "@/types/subreddit";
import type Post from "@/types/posts";

export async function fetchData(subredditName: string): Promise<void> {
  store.loading = true;
  try {
    console.log(subredditName);
    const response = await fetch(`https://www.reddit.com/r/${subredditName}/top.json?limit=5`);
    const result = await response.json();

    console.log(result);
    // result. data.children = array of objects that need to be parsed
    console.log(result.data.children);

    const posts: Post[] = [];

    for (let i = 0; i < result.data.children.length; i++) {
      let { id, author_fullname, selftext, title, ups, url } = result.data.children[i].data;
      posts.push({ id: id, title: title, upvotes: ups, url: url, text: selftext, author: author_fullname });
    }

    const subreddit: Subreddit = {
      posts: posts,
      name: subredditName,
      url: "google.com",
    };

    console.log(subreddit);

    store.data.push(subreddit);
  } catch (error) {
    console.log(error);
    store.error = (error as Error).message;
  } finally {
    store.loading = false;
  }
}
