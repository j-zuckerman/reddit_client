import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { store } from "@/store";
import Subreddit from "../Subreddit.vue";

describe("Subreddit", () => {
  it("renders initially properly", async () => {
    // const wrapper = mount(Subreddit, { props: { name: "all" } });
    // await flushPromises();
    // await wrapper.setProps({ store.loading: false })
    // const subredditTitle = wrapper.find("h2.subreddit-title");
    // //console.log(subredditTitle);
    // expect(subredditTitle.text()).toContain("all");
  });
});
