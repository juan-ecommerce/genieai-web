import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const publicSettings = [
  "SITE_URL",
  "OPENROUTER_MODEL",
  "GENIEAI_SECRET_ID",
  "GENIEAI_SECRET_REGION",
  "TRUST_PROXY",
];

async function directorySize(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    total += entry.isDirectory()
      ? await directorySize(path)
      : (await stat(path)).size;
  }
  return total;
}

export async function buildAmplifyBundle(projectRoot, env = process.env) {
  const root = resolve(projectRoot);
  const output = join(root, ".amplify-hosting");
  const compute = join(output, "compute/default");
  const staticDirectory = join(output, "static");
  const lock = JSON.parse(await readFile(join(root, "package-lock.json"), "utf8"));
  const expressPackage = JSON.parse(
    await readFile(join(root, "node_modules/express/package.json"), "utf8"),
  );
  await stat(join(root, "dist/index.html"));
  await stat(join(root, "server/amplify.mjs"));

  // Cleanup is limited to this project's generated deployment directory.
  if (relative(root, output) !== ".amplify-hosting")
    throw new Error("Invalid Amplify output directory.");
  await rm(output, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  await mkdir(compute, { recursive: true });
  await mkdir(staticDirectory, { recursive: true });

  const filter = (source) => !basename(source).startsWith(".env");
  for (const directory of ["server", "shared", "dist"])
    await cp(join(root, directory), join(compute, directory), {
      recursive: true,
      filter,
    });

  // Copy installed production packages at their locked paths, including nested
  // dependencies. Dev dependencies and platform-specific optional packages that
  // aren't installed on this builder are omitted.
  for (const [path, entry] of Object.entries(lock.packages)) {
    if (!path.startsWith("node_modules/") || entry.dev) continue;
    const source = resolve(root, path);
    if (!source.startsWith(root + sep)) throw new Error("Invalid dependency path.");
    try {
      await stat(source);
    } catch (error) {
      if (error.code === "ENOENT" && entry.optional) continue;
      throw error;
    }
    await cp(source, join(compute, path), {
      recursive: true,
      dereference: true,
      filter,
    });
  }

  await writeFile(
    join(compute, "package.json"),
    JSON.stringify({ type: "module", private: true }),
  );
  await writeFile(join(compute, "index.mjs"), 'import "./server/amplify.mjs";\n');
  const settings = {};
  for (const key of publicSettings)
    if (env[key]) settings[key] = env[key];
  await writeFile(join(compute, "runtime-config.json"), JSON.stringify(settings));

  // Documents and SEO endpoints go through Express; only public assets use S3.
  await cp(join(root, "dist"), staticDirectory, {
    recursive: true,
    filter: (source) =>
      filter(source) &&
      !["index.html", "robots.txt", "sitemap.xml"].includes(basename(source)),
  });
  const manifest = {
    version: 1,
    framework: { name: "express", version: expressPackage.version },
    routes: [
      { path: "/api/*", target: { kind: "Compute", src: "default" } },
      { path: "/robots.txt", target: { kind: "Compute", src: "default" } },
      { path: "/sitemap.xml", target: { kind: "Compute", src: "default" } },
      {
        path: "/assets/*",
        target: {
          kind: "Static",
          cacheControl: "public, max-age=31536000, immutable",
        },
      },
      {
        path: "/*.*",
        target: { kind: "Static", cacheControl: "public, max-age=3600" },
        fallback: { kind: "Compute", src: "default" },
      },
      { path: "/*", target: { kind: "Compute", src: "default" } },
    ],
    computeResources: [
      { name: "default", runtime: "nodejs22.x", entrypoint: "index.mjs" },
    ],
  };
  await writeFile(
    join(output, "deploy-manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  const size = await directorySize(compute);
  if (size > 220 * 1024 * 1024)
    throw new Error("Amplify compute bundle exceeds the 220 MB limit.");
  return { output, computeBytes: size };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const result = await buildAmplifyBundle(
    fileURLToPath(new URL("../", import.meta.url)),
  );
  console.log(
    "Amplify bundle created (compute: " +
      (result.computeBytes / 1024 / 1024).toFixed(1) +
      " MB).",
  );
}
