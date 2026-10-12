import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildAmplifyBundle } from "../scripts/build-amplify.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "genieai-amplify-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const files = {
    "dist/index.html": "<html>GenieAI</html>",
    "dist/assets/app.js": "console.log('public app')",
    "dist/robots.txt": "old static robots",
    "server/amplify.mjs": "export const entry = true;",
    "server/web.mjs": "export const web = true;",
    "server/.env": "OPENROUTER_API_KEY=private-server-file",
    "shared/metadata.mjs": "export const metadata = {};",
    ".env": "OPENROUTER_API_KEY=private-root-file",
    "node_modules/runtime-dep/index.js": "module.exports = true;",
    "node_modules/build-only/index.js": "module.exports = true;",
    "node_modules/express/package.json": '{"version":"5.3.0"}',
    "package-lock.json": JSON.stringify({
      lockfileVersion: 3,
      packages: {
        "": {},
        "node_modules/runtime-dep": { version: "1.0.0" },
        "node_modules/express": { version: "5.3.0" },
        "node_modules/build-only": { version: "1.0.0", dev: true },
      },
    }),
  };
  for (const [path, content] of Object.entries(files)) {
    const target = join(root, path);
    await mkdir(join(target, ".."), { recursive: true });
    await writeFile(target, content);
  }
  return root;
}

test("Amplify bundle routes API requests to a self-contained Node server", async (t) => {
  const root = await fixture(t);
  await buildAmplifyBundle(root, {});
  const output = join(root, ".amplify-hosting");
  const manifest = JSON.parse(await readFile(join(output, "deploy-manifest.json")));
  const apiRoute = manifest.routes.find((route) => route.path === "/api/*");
  assert.deepEqual(apiRoute.target, { kind: "Compute", src: "default" });
  const compute = join(output, "compute/default");
  await stat(join(compute, manifest.computeResources[0].entrypoint));
  await stat(join(compute, "server/amplify.mjs"));
  await stat(join(compute, "shared/metadata.mjs"));
  await stat(join(compute, "dist/index.html"));
  await stat(join(compute, "node_modules/runtime-dep/index.js"));
  assert.equal(await readFile(join(output, "static/assets/app.js"), "utf8"), "console.log('public app')");
  await assert.rejects(stat(join(compute, "node_modules/build-only")), { code: "ENOENT" });
  await assert.rejects(stat(join(output, "static/index.html")), { code: "ENOENT" });
  await assert.rejects(stat(join(output, "static/robots.txt")), { code: "ENOENT" });
});

test("build output persists only allowlisted configuration and excludes credentials", async (t) => {
  const root = await fixture(t);
  await buildAmplifyBundle(root, {
    SITE_URL: "https://genieai.se",
    OPENROUTER_MODEL: "test/model",
    GENIEAI_SECRET_ID: "genieai/production",
    GENIEAI_SECRET_REGION: "eu-north-1",
    OPENROUTER_API_KEY: "private-build-key",
    SMTP_USER: "private-mail-user",
    SMTP_PASS: "private-build-password",
    AWS_SECRET_ACCESS_KEY: "private-aws-key",
  });
  const compute = join(root, ".amplify-hosting/compute/default");
  const settings = JSON.parse(await readFile(join(compute, "runtime-config.json")));
  assert.equal(settings.GENIEAI_SECRET_ID, "genieai/production");
  assert.equal(settings.GENIEAI_SECRET_REGION, "eu-north-1");
  assert.equal(settings.OPENROUTER_MODEL, "test/model");
  assert.equal(settings.OPENROUTER_API_KEY, undefined);
  assert.equal(settings.SMTP_USER, undefined);
  assert.equal(settings.SMTP_PASS, undefined);
  assert.equal(settings.AWS_SECRET_ACCESS_KEY, undefined);
  await assert.rejects(stat(join(compute, ".env")), { code: "ENOENT" });
  await assert.rejects(stat(join(compute, "server/.env")), { code: "ENOENT" });
});
