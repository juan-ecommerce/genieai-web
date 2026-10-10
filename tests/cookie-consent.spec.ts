import { test, expect } from "@playwright/test";

const storageKey = "genieai.cookie-consent";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("a new visit offers an honest cookie notice without storing a choice", async ({ page }) => {
  await page.goto("/privacy");
  const banner = page.getByRole("region", { name: "Cookie consent" });
  await expect(banner).toBeVisible();
  await expect(banner).toContainText("No analytics or advertising cookies");
  await expect(banner.getByRole("button", { name: "Accept all", exact: true })).toBeVisible();
  await expect(banner.getByRole("button", { name: "Reject optional", exact: true })).toBeVisible();
  await expect(banner.getByRole("link", { name: "Privacy policy" })).toHaveAttribute("href", "/privacy");
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBeNull();
});

test("rejection persists and visitors can change it without scrolling to the footer", async ({ page, context }) => {
  await page.goto("/privacy");
  await page.getByRole("button", { name: "Reject optional", exact: true }).click();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toHaveCount(0);
  const scrollBeforeSettings = await page.evaluate(() => scrollY);
  await page.locator(".cookie-settings-access").getByRole("button", { name: "Cookie settings", exact: true }).click();
  expect(await page.evaluate(() => scrollY)).toBe(scrollBeforeSettings);
  const dialog = page.getByRole("dialog", { name: "Cookie preferences" });
  await expect(dialog).toContainText("Essential only");
  await dialog.getByRole("button", { name: "Accept all", exact: true }).click();
  await page.reload();
  await page.locator(".cookie-settings-access").getByRole("button", { name: "Cookie settings", exact: true }).click();
  await expect(dialog).toContainText("All listed cookies");
  await dialog.getByRole("button", { name: "Reject optional", exact: true }).click();
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), storageKey);
  expect(saved.choice).toBe("essential");
  expect(await context.cookies()).toEqual([]);
});

test("acceptance persists and the footer can reopen preferences", async ({ page }) => {
  await page.goto("/privacy");
  await page.getByRole("button", { name: "Accept all", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toHaveCount(0);
  await page.locator("footer").getByRole("button", { name: "Cookie settings", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Cookie preferences" })).toBeVisible();
});

test("preferences trap focus and Escape does not silently give consent", async ({ page }) => {
  await page.goto("/privacy");
  const trigger = page.getByRole("button", { name: "Manage preferences", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Cookie preferences" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close cookie preferences" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Accept all", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Close cookie preferences" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate((key) => localStorage.getItem(key), storageKey)).toBeNull();
});

test("expired, malformed, or previous-policy preferences require a new choice", async ({ page }) => {
  await page.goto("/privacy");
  const now = Date.now();
  for (const stored of [
    "not-json",
    JSON.stringify({ version: 0, choice: "all", savedAt: now, expiresAt: now + 180 * 86400000 }),
    JSON.stringify({ version: 1, choice: "all", savedAt: now - 181 * 86400000, expiresAt: now - 86400000 }),
    JSON.stringify({ version: 1, choice: "unknown", savedAt: now, expiresAt: now + 180 * 86400000 }),
  ]) {
    await page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key: storageKey, value: stored });
    await page.reload();
    await expect(page.getByRole("region", { name: "Cookie consent" })).toBeVisible();
  }
});

test("saving initial preferences returns keyboard focus to the settings launcher", async ({ page }) => {
  await page.goto("/privacy");
  for (const choice of ["Reject optional", "Accept all"]) {
    await page.evaluate((key) => localStorage.removeItem(key), storageKey);
    await page.reload();
    await page.getByRole("button", { name: "Manage preferences", exact: true }).click();
    await page.getByRole("dialog", { name: "Cookie preferences" }).getByRole("button", { name: choice, exact: true }).click();
    await expect(page.locator(".cookie-settings-access").getByRole("button", { name: "Cookie settings", exact: true })).toBeFocused();
  }
});

test("blocked browser storage does not break consent or navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() { throw new DOMException("Storage is blocked", "SecurityError"); },
    });
  });
  await page.goto("/privacy");
  await page.getByRole("button", { name: "Reject optional", exact: true }).click();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("this visit");
  await page.reload();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("a change in another tab updates open cookie preferences", async ({ page, context }) => {
  await page.goto("/privacy");
  await page.getByRole("button", { name: "Accept all", exact: true }).click();
  const otherTab = await context.newPage();
  await otherTab.goto("/privacy");
  await otherTab.locator(".cookie-settings-access").getByRole("button", { name: "Cookie settings", exact: true }).click();
  const otherDialog = otherTab.getByRole("dialog", { name: "Cookie preferences" });
  await expect(otherDialog).toContainText("All listed cookies");
  await page.locator(".cookie-settings-access").getByRole("button", { name: "Cookie settings", exact: true }).click();
  await page.getByRole("dialog", { name: "Cookie preferences" }).getByRole("button", { name: "Reject optional", exact: true }).click();
  await expect(otherDialog).toContainText("Essential only");
  await otherTab.close();
});

test("cookie controls fit a narrow phone without covering the chat launcher", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/privacy");
  const banner = page.getByRole("region", { name: "Cookie consent" });
  await expect(banner).toBeVisible();
  const bannerBox = await banner.boundingBox();
  const launcher = page.getByRole("button", { name: "Ask Genie", exact: true });
  const launcherBox = await launcher.boundingBox();
  expect(bannerBox).not.toBeNull();
  expect(launcherBox).not.toBeNull();
  expect(bannerBox!.y + bannerBox!.height).toBeLessThanOrEqual(launcherBox!.y);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await launcher.click();
  await expect(page.getByRole("textbox", { name: "Message Genie" })).toBeVisible();
  await expect(banner).toHaveCount(0);
});
