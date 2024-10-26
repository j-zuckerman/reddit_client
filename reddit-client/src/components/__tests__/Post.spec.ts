import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { store } from "@/store";
import PostComponent from "../Post.vue";
import type Post from "@/types/posts";
import { text } from "stream/consumers";

const imagePost: Post = {
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
};

const textPost: Post = {
  id: 1,
  title: "title1",
  upvotes: 100,
  url: "permalink1",
  text: "selftext1",
  author: "author1",
  thumbnail_url: "url1",
  num_comments: 10,
  post_type: "TYPE_TEXT",
  video_url: "",
};

const videoPost: Post = {
  id: 1,
  title: "title1",
  upvotes: 100,
  url: "permalink1",
  text: "selftext1",
  author: "author1",
  thumbnail_url: "url1",
  num_comments: 10,
  post_type: "TYPE_VIDEO",
  video_url: "",
};

const galleryPost: Post = {
  id: 1,
  title: "title1",
  upvotes: 100,
  url: "permalink1",
  text: "selftext1",
  author: "author1",
  thumbnail_url: "url1",
  num_comments: 10,
  post_type: "TYPE_GALLERY",
  video_url: "",
};

describe("Posts", () => {
  it("renders image posts correctly", async () => {
    const wrapper = mount(PostComponent, {
      props: {
        post: imagePost,
      },
    });

    const postType = wrapper.find("h2.type");

    expect(postType.text()).toContain("TYPE_IMAGE");
    //more testing
  });

  it("renders text posts correctly", async () => {
    const wrapper = mount(PostComponent, {
      props: {
        post: textPost,
      },
    });

    const postType = wrapper.find("h2.type");

    expect(postType.text()).toContain("TYPE_TEXT");
    //more testing
  });

  it("renders video posts correctly", async () => {
    const wrapper = mount(PostComponent, {
      props: {
        post: videoPost,
      },
    });

    const postType = wrapper.find("h2.type");

    expect(postType.text()).toContain("TYPE_VIDEO");
    //more testing
  });

  it("renders gallery posts correctly", async () => {
    const wrapper = mount(PostComponent, {
      props: {
        post: galleryPost,
      },
    });

    const postType = wrapper.find("h2.type");

    expect(postType.text()).toContain("TYPE_GALLERY");
    //more testing
  });
});
