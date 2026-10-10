import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createWebApp } from "../server/web.mjs";

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
