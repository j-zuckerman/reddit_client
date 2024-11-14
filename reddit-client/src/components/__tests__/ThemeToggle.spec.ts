import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ThemeToggle from "@/components/ThemeToggle.vue";

describe("Theme Toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });
  it("toggles theme between light and dark", async () => {
    const wrapper = mount(ThemeToggle);
    document.documentElement.setAttribute("data-theme", "light");

    // Initial theme should be light
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    const lightIcon = wrapper.find("span.light");
    expect(lightIcon.exists()).toBe(true);

    // Click to toggle theme
    await wrapper.find('input[type="checkbox"]').trigger("click");

    // Theme should now be dark
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    const darkIcon = wrapper.find("span.dark");
    expect(darkIcon.exists()).toBe(true);

    // Click to toggle theme back to light
    await wrapper.find('input[type="checkbox"]').trigger("click");

    // Theme should be light again
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("sets the theme based on localStorage on mount", () => {
    localStorage.setItem("theme", "dark");
    const wrapper = mount(ThemeToggle);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
