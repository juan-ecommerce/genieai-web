import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createWebApp } from "../server/web.mjs";
import * as startup from "../server/start.mjs";
import { createServer } from "node:http";

test("compute loads credentials on the first API request and shares concurrent initialization", async (t) => {
  assert.equal(typeof startup.createWebHandler, "function");
  const distDirectory = await mkdtemp(join(tmpdir(), "genieai-credentials-"));
  t.after(() => rm(distDirectory, { recursive: true, force: true }));
  await writeFile(join(distDirectory, "index.html"), await readFile(new URL("../index.html", import.meta.url), "utf8"));
  let listening = false;
  let reads = 0;
  const handler = startup.createWebHandler({}, {
    distDirectory,
    resolveEnvironment: async () => {
      assert.equal(listening, true);
      reads++;
      await new Promise((resolve) => setTimeout(resolve, 20));
      return { OPENROUTER_API_KEY: "request-time-key" };
    },
  });
  assert.equal(reads, 0);
  const server = createServer(handler).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  listening = true;
  try {
    assert.equal((await fetch("http://127.0.0.1:" + server.address().port + "/")).status, 200);
    assert.equal(reads, 0, "website readiness requests do not initialize credentials");
    const responses = await Promise.all(Array.from({ length: 3 }, async () => {
      const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/status");
      assert.equal(response.status, 200);
      return response.json();
    }));
    assert.deepEqual(responses, Array(3).fill({ chat: true, email: false }));
    assert.equal(reads, 1);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("production serves route metadata, API, assets, sitemap, and real 404s", async () => {
  const distDirectory = await mkdtemp(join(tmpdir(), "genieai-runtime-"));
  await mkdir(join(distDirectory, "assets"));
  await writeFile(
    join(distDirectory, "assets", "example.js"),
    'console.log("example")',
  );
  await writeFile(
    join(distDirectory, "index.html"),
    await readFile(new URL("../index.html", import.meta.url), "utf8"),
  );
  const app = createWebApp(
    { SITE_URL: "https://agency.example" },
    { distDirectory },
  );
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const base = "http://127.0.0.1:" + server.address().port;
  try {
    const route = await fetch(base + "/ai-agents");
    assert.equal(route.status, 200);
    const html = await route.text();
    assert.match(html, /<title>AI Agents — GenieAI<\/title>/);
    assert.match(html, /name="description"\s+content="Purpose-built AI agents/);
    assert.match(html, /property="og:title"\s+content="AI Agents — GenieAI"/);
    assert.match(html, /href="https:\/\/agency.example\/ai-agents"/);
    assert.match(html, /https:\/\/agency.example\/brand\/social.png/);
    assert.match(
      route.headers.get("content-security-policy"),
      /frame-ancestors 'none'/,
    );
    for (const pathname of ["/", "/ai-agents"]) {
      const head = await fetch(base + pathname, { method: "HEAD" });
      assert.equal(head.status, 200, pathname + " supports health checks");
      assert.match(head.headers.get("content-type"), /text\/html/);
      assert.equal(await head.text(), "");
    }
    assert.equal(
      (await fetch(base + "/not-a-page", { method: "HEAD" })).status,
      404,
    );
    assert.equal((await fetch(base + "/api/status")).status, 200);
    assert.equal((await fetch(base + "/api/missing")).status, 404);
    const asset = await fetch(base + "/assets/example.js");
    assert.equal(asset.status, 200);
    assert.match(asset.headers.get("cache-control"), /immutable/);
    const missingAsset = await fetch(base + "/assets/missing.js");
    assert.equal(missingAsset.status, 404);
    assert.doesNotMatch(await missingAsset.text(), /id="root"/);
    const missingPage = await fetch(base + "/not-a-page");
    assert.equal(missingPage.status, 404);
    assert.match(await missingPage.text(), /noindex/);
    const sitemap = await (await fetch(base + "/sitemap.xml")).text();
    assert.match(sitemap, /https:\/\/agency.example\/privacy/);
    assert.equal((sitemap.match(/<loc>/g) || []).length, 7);
    assert.match(
      await (await fetch(base + "/robots.txt")).text(),
      /Disallow: \/api\//,
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
