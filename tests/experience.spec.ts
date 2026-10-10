import { test, expect } from "@playwright/test";

test("a failed decorative scene download cannot take down the website", async ({
  page,
}) => {
  await page.route(/IntelligenceScene/, (route) => route.abort());
  const failed = page.waitForEvent("requestfailed", (request) =>
    request.url().includes("IntelligenceScene"),
  );
  await page.goto("/");
  await failed;
  await page.waitForTimeout(250);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Built for",
  );
  await page
    .getByRole("button", { name: "Let’s talk", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("dialog", { name: "Let’s build what’s next." }),
  ).toBeVisible();
});

test("pausing the scene releases its GPU framebuffers", async ({ page }) => {
  await page.addInitScript(() => {
    const scope = window as Window & {
      liveFramebuffers: Map<WebGLFramebuffer, WebGL2RenderingContext>;
    };
    scope.liveFramebuffers = new Map();
    const create = WebGL2RenderingContext.prototype.createFramebuffer;
    const remove = WebGL2RenderingContext.prototype.deleteFramebuffer;
    WebGL2RenderingContext.prototype.createFramebuffer = function () {
      const buffer = create.call(this);
      if (buffer) scope.liveFramebuffers.set(buffer, this);
      return buffer;
    };
    WebGL2RenderingContext.prototype.deleteFramebuffer = function (buffer) {
      if (buffer) scope.liveFramebuffers.delete(buffer);
      return remove.call(this, buffer);
    };
  });
  await page.goto("/");
  const liveCount = () =>
    page.evaluate(
      () =>
        [
          ...(
            window as Window & {
              liveFramebuffers: Map<WebGLFramebuffer, WebGL2RenderingContext>;
            }
          ).liveFramebuffers.values(),
        ].filter((context) => !context.isContextLost()).length,
    );
  await expect.poll(liveCount).toBeGreaterThan(2);
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await expect.poll(liveCount).toBe(0);
});

test("valid trailing slash routes retain service metadata", async ({
  page,
}) => {
  await page.goto("/ai-agents/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "AI agents",
  );
  await expect(page).toHaveTitle("AI Agents — GenieAI");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/ai-agents$/,
  );
});

test("404 navigation restores indexable home metadata", async ({ page }) => {
  await page.goto("/missing-page");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await page.getByRole("link", { name: "Back to the studio" }).click();
  await expect(page).toHaveTitle(
    "GenieAI — Intelligent systems. Human possibilities.",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
});

test("workflow scenarios are keyboard accessible", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Sales & support" }).focus();
  await page.keyboard.press("ArrowRight");
  const knowledge = page.getByRole("tab", { name: "Knowledge & docs" });
  await expect(knowledge).toHaveAttribute("aria-selected", "true");
  await expect(knowledge).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "Predictions" })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("tab", { name: "Sales & support" }),
  ).toBeFocused();
});

test("visitors can pause and resume the 3D animation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await page.getByRole("button", { name: "Resume 3D animation" }).click();
  await expect(page.locator("canvas")).toBeVisible();
});

test("unavailable WebGL leaves the complete website usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Built for",
  );
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "Explore solutions" }).click();
  await expect(
    page.getByRole("heading", {
      name: "A little intelligence. A lot of possibility.",
    }),
  ).toBeInViewport();
});

test("home has the new experience and working navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Built for",
  );
  await expect(
    page.getByRole("button", { name: "Ask Genie", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore solutions" }).click();
  await expect(
    page.getByRole("heading", {
      name: "A little intelligence. A lot of possibility.",
    }),
  ).toBeInViewport();
  await page.getByRole("link", { name: "Explore AI Agents" }).click();
  await expect(page).toHaveURL(/ai-agents/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "AI agents",
  );
});

test("workflow playground changes scenario and runs an illustrative workflow", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Knowledge & docs" }).click();
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(
    page.getByText("Workflow complete", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Sources connected. Answers grounded.", { exact: true }),
  ).toBeVisible();
});

test("chat prepares an enquiry and email errors preserve the visitor draft", async ({
  page,
}) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      json: {
        reply: "Please review your enquiry.",
        inquiry: {
          name: "Alex",
          email: "alex@example.test",
          company: "Example",
          message: "Automate our incoming support requests.",
        },
      },
    }),
  );
  let attempts = 0;
  await page.route("**/api/contact", (route) => {
    attempts++;
    return route.fulfill(
      attempts === 1
        ? {
            status: 502,
            json: {
              error: "Your enquiry could not be delivered. Please try again.",
            },
          }
        : { json: { success: true } },
    );
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Ask Genie", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Message Genie" })
    .fill("I want to contact Juan about automation.");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.getByRole("button", { name: "Review enquiry" }).click();
  const dialog = page.getByRole("dialog", { name: "Let’s build what’s next." });
  await expect(dialog.getByLabel("Your name")).toHaveValue("Alex");
  await dialog.getByLabel("I agree to be contacted about this enquiry").check();
  await dialog.getByRole("button", { name: "Send enquiry" }).click();
  await expect(dialog.getByRole("alert")).toContainText(
    "could not be delivered",
  );
  await expect(dialog.getByLabel("Your name")).toHaveValue("Alex");
  await dialog.getByRole("button", { name: "Send enquiry" }).click();
  await expect(dialog.getByText("Your enquiry is on its way.")).toBeVisible();
});

test("unconfigured chat gives an honest enquiry fallback", async ({ page }) => {
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      status: 503,
      json: {
        error:
          "Chat is temporarily unavailable. You can still send an enquiry to Juan.",
      },
    }),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Ask Genie", exact: true }).click();
  await page.getByRole("textbox", { name: "Message Genie" }).fill("Hi Genie");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "temporarily unavailable",
  );
  await expect(
    page.getByRole("button", { name: "Send an enquiry", exact: true }),
  ).toBeVisible();
});

test("contact traps focus, dismisses with Escape, and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page
    .getByRole("button", { name: "Let’s talk", exact: true })
    .first();
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Let’s build what’s next." }),
  ).toBeVisible();
  const lastContactLink = page.getByRole("link", {
    name: "Call Juan: +46 79 3348387",
  });
  await lastContactLink.focus();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close enquiry" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Let’s build what’s next." }),
  ).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("mobile and reduced motion retain navigation and readable content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("scene-fallback")).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("link", { name: "Automation", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/automation/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page
    .getByRole("button", { name: "Ask Genie", exact: true })
    .last()
    .click();
  await expect(
    page.getByRole("textbox", { name: "Message Genie" }),
  ).toBeVisible();
});

test("all service pages and the 404 have useful content and unique metadata", async ({
  page,
}) => {
  const titles = new Set<string>();
  for (const path of [
    "/ai-agents",
    "/rag",
    "/automation",
    "/data-science",
    "/about",
    "/privacy",
    "/missing-page",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(path),
    );
  }
  expect(titles.size).toBe(7);
});

test("WebGL renders an animated canvas without a page error", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByTestId("intelligence-scene").locator("canvas"),
  ).toBeVisible();
  await page.mouse.move(1100, 380);
  await page.evaluate(() => window.scrollTo(0, 600));
  expect(errors).toEqual([]);
});
