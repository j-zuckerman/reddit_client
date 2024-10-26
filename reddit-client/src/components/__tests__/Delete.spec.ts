import { describe, it, expect, vi } from "vitest";
import { store, deleteSubreddit } from "@/store";

const mockData = {
  id: "1",
  name: "test",
  url: "https://www.reddit.com/r/all",
  posts: [
    {
      id: 1,
      title: "title1",
      upvotes: 100,
      url: "permalink1",
      text: "selftext1",
      author: "author1",
      thumbnail_url: "url1",
      num_comments: 10,
      post_type: "TYPE_IMAGE",
      video_url: "",
    },
  ],
};

store.data.push(mockData);

describe("delete subreddits", () => {
  it("deletes subreddit that exists", () => {
    const subredditId = "1";

    deleteSubreddit(subredditId);

    expect(store.data).toHaveLength(0);
  });
});
