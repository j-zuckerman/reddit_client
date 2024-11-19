import { test, expect } from "@playwright/test";

test.describe("Subreddit Form Submission", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens the modal, submits the form, and checks to see if the subreddit and posts exist", async ({ page }) => {
    const subreddit = "pics";

    await page.click(".circular-button");

    await expect(page.locator(".modal-container")).toBeVisible();

    await page.fill("input#name", subreddit);

    await page.click(".submit-btn");

    await expect(page.locator(".modal-container")).not.toBeVisible();

    await page.locator("nav.breadcrumb li.breadcrumb-item", { hasText: `r/${subreddit}` }).click();

    const postCount = await page.locator(".post").count();
    expect(postCount).toBeGreaterThan(5);
  });
});
