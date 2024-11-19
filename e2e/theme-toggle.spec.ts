// import { test, expect } from "@playwright/test";

// test.describe("Theme Toggle", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("/");
//   });

//   test("should toggle the theme from light to dark and back", async ({ page }) => {
//     const themeToggleCheckbox = page.getByRole("checkbox").first();
//     await themeToggleCheckbox.click({ force: true });

//     const documentElement = page.locator("html");
//     await expect(documentElement).toHaveAttribute("data-theme", "dark");

//     await page.locator('#theme-toggle input[type="checkbox"]').first().uncheck({ force: true });

//     await expect(documentElement).toHaveAttribute("data-theme", "light");
//   });
// });
