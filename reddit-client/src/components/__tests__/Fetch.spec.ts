import { describe, it, expect, vi } from "vitest";
import { store } from "@/store";
import { mount, flushPromises } from "@vue/test-utils";
import Subreddit from "../Subreddit.vue";
import { fetchData } from "@/composables/fetch";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          children: [
            {
              data: {
                id: "1",
                author: "author1",
                selftext: "selftext1",
                title: "title1",
                ups: 100,
                url: "url1",
                is_video: false,
                thumbnail: "thumb1",
                num_comments: 10,
                permalink: "permalink1",
                is_gallery: false,
                over_18: false,
              },
            },
            // add more mock posts if needed
          ],
        },
      }),
  })
);
describe("fetch subreddit data", () => {
  it("fetches data properly", async () => {
    await fetchData("all");

    await flushPromises();

    console.log("Store data:", store.data);
  });
});
