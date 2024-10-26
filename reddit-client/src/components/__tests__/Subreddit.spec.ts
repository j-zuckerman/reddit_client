import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { store } from "@/store";
import Subreddit from "../Subreddit.vue";

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

describe("Subreddit", () => {
  it("renders properly", async () => {
    const wrapper = mount(Subreddit, { props: { name: "test" } });
    store.loading = false;

    // await flushPromises();
    // await wrapper.setProps({ store.loading: false })
    const subredditTitle = wrapper.find("h2.subreddit-title");
    // //console.log(subredditTitle);
    expect(subredditTitle.text()).toContain("r/test");
  });
});
