import { test, expect } from "@playwright/test";

test.describe("Post Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should check initial state and toggle the post expansion", async ({ page }) => {
    const expandButton = page.locator(".post-expand").first();
    await expect(expandButton).toBeVisible();

    await expandButton.click();

    const expandedContent = page.locator(".post-expanded").first();
    await expect(expandedContent).toBeVisible();

    await expandButton.click();

    await expect(expandedContent).not.toBeVisible();
  });

  test("should prevent navigation when clicking on expandable content", async ({ page }) => {
    const currentUrl = page.url();
    const expandButton = page.locator(".post-expand").first();
    await expandButton.click();

    await expect(page).toHaveURL(currentUrl);
  });
});
