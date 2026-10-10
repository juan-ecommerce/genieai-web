import { test, expect } from "@playwright/test";

test("the home experience fits narrow screens without horizontal scrolling", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.locator(".insights-section").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});

test("project filters lead to an enquiry about the chosen data science project", async ({
  page,
}) => {
  await page.goto("/");
  const catalog = page.getByRole("region", {
    name: "Find your starting point",
  });
  await catalog
    .getByRole("button", { name: "Data science", exact: true })
    .click();
  await expect(
    catalog.getByRole("heading", { name: "Demand forecasting", exact: true }),
  ).toBeVisible();
  await expect(
    catalog.getByRole("heading", { name: "Support copilot", exact: true }),
  ).toHaveCount(0);
  const projectAction = catalog.getByRole("button", {
    name: /Demand forecasting/,
  });
  await expect(projectAction).toHaveAccessibleName(/^Explore this idea/);
  await projectAction.click();
  const dialog = page.getByRole("dialog", { name: "Let’s build what’s next." });
  await expect(dialog.getByLabel("Your project")).toHaveValue(
    /Demand forecasting/,
  );
  await expect(dialog.getByLabel("Your name")).toHaveValue("");
  await page.keyboard.press("Escape");
  await catalog
    .getByRole("button", { name: "AI & automation", exact: true })
    .click();
  await expect(
    catalog.getByRole("heading", { name: "Support copilot", exact: true }),
  ).toBeVisible();
  await expect(
    catalog.getByRole("heading", { name: "Demand forecasting", exact: true }),
  ).toHaveCount(0);
  await catalog
    .getByRole("button", { name: "All solutions", exact: true })
    .click();
  await expect(
    catalog.getByRole("heading", { name: "Demand forecasting", exact: true }),
  ).toBeVisible();
});

test("the prediction scenario runs from historical data to a planning outcome", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Predictions", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Historical business data",
  );
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(
    page.getByText("Workflow complete", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("tabpanel")).toContainText(
    "A better planning signal",
  );
});

test("cards respond to the mouse and floating data panels move at different scroll depths", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByRole("link", {
    name: "Explore AI Agents",
    exact: true,
  });
  await card.scrollIntoViewIfNeeded();
  const tilt = card.locator("..");
  const restingTransform = await tilt.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const box = await card.boundingBox();
  if (!box) throw new Error("Service card is not visible");
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.2);
  await expect
    .poll(() => tilt.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(restingTransform);
  await page.mouse.move(10, 10);
  await expect
    .poll(() => tilt.evaluate((element) => getComputedStyle(element).transform))
    .toBe(restingTransform);
  const section = page.getByRole("region", {
    name: "Understand today. Anticipate tomorrow.",
  });
  await section.scrollIntoViewIfNeeded();
  const panel = section.locator(".signal-card-forecast");
  const before = await panel.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "instant" }));
  await expect
    .poll(() =>
      panel.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      panel.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");
});
