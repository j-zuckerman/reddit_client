import { describe, it, expect, vi } from "vitest";
import { store } from "@/store";
import { mount, flushPromises } from "@vue/test-utils";
import { fetchData } from "@/composables/fetch";

const mockResponseData1 = {
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
    ],
  },
};

const mockResponseData2 = {
  data: {
    children: [
      {
        data: {
          id: "2",
          author: "author2",
          selftext: "selftext2",
          title: "title2",
          ups: 100,
          url: "url2",
          is_video: false,
          thumbnail: "thumb2",
          num_comments: 10,
          permalink: "permalink2",
          is_gallery: false,
          over_18: false,
        },
      },
    ],
  },
};

const mockResponseData3 = {
  data: {
    children: [
      {
        data: {
          id: "3",
          author: "author3",
          selftext: "selftext3",
          title: "title3",
          ups: 100,
          url: "url3",
          is_video: false,
          thumbnail: "thumb3",
          num_comments: 10,
          permalink: "permalink3",
          is_gallery: false,
          over_18: false,
        },
      },
    ],
  },
};

global.fetch = vi
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponseData1),
    })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponseData2),
    })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponseData3),
    })
  )
  .mockImplementationOnce(() => Promise.reject(new Error("Error")));

describe("fetch subreddit data", () => {
  it("fetches initial subreddit properly", async () => {
    await fetchData("all");
    await flushPromises();

    expect(store.data).not.toHaveLength(0);
    expect(store.data).toEqual([
      {
        id: expect.any(String),
        name: "all",
        url: "https://www.reddit.com/r/all/",
        posts: [
          {
            id: "1",
            title: "title1",
            upvotes: 100,
            url: "https://www.reddit.com/permalink1",
            text: "selftext1",
            author: "author1",
            num_comments: 10,
            post_type: "TYPE_IMAGE",
            video_url: "",
            external_link: "",
            image_url: "thumb1",
          },
        ],
      },
    ]);

    expect(store.loading).toBe(false);
  });

  it("fetches another subreddit properly", async () => {
    await fetchData("anotherSubreddit");
    await flushPromises();

    expect(store.data).toHaveLength(2);
    expect(store.data[1]).toEqual({
      id: expect.any(String),
      name: "anotherSubreddit",
      url: "https://www.reddit.com/r/anotherSubreddit/",
      posts: [
        {
          id: "2",
          title: "title2",
          upvotes: 100,
          url: "https://www.reddit.com/permalink2",
          text: "selftext2",
          author: "author2",
          num_comments: 10,
          post_type: "TYPE_IMAGE",
          video_url: "",
          external_link: "",
          image_url: "thumb2",
        },
      ],
    });
    expect(store.loading).toBe(false);
  });

  it("fetches duplicate subreddit properly", async () => {
    await fetchData("all");
    await flushPromises();

    expect(store.data).toHaveLength(2);
    expect(store.data[0]).toEqual({
      id: expect.any(String),
      name: "all",
      url: "https://www.reddit.com/r/all/",
      posts: [
        {
          id: "3",
          title: "title3",
          upvotes: 100,
          url: "https://www.reddit.com/permalink3",
          text: "selftext3",
          author: "author3",
          num_comments: 10,
          post_type: "TYPE_IMAGE",
          video_url: "",
          external_link: "",
          image_url: "thumb3",
        },
      ],
    });
    expect(store.loading).toBe(false);
  });

  it("fetching error", async () => {
    await fetchData("error");
    await flushPromises();

    expect(store.data).toHaveLength(2);
    // expect(store.data[0]).toEqual({
    //   id: expect.any(String),
    //   name: "all",
    //   url: "https://www.reddit.com/r/all/",
    //   posts: [
    //     {
    //       id: "3",
    //       title: "title3",
    //       upvotes: 100,
    //       url: "permalink3",
    //       text: "selftext3",
    //       author: "author3",
    //       thumbnail_url: "url3",
    //       num_comments: 10,
    //       post_type: "TYPE_IMAGE",
    //       video_url: "",
    //     },
    //   ],
    // });
    expect(store.error).toBe("Error");
    expect(store.loading).toBe(false);
  });
});
