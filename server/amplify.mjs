import { readFile } from "node:fs/promises";
import { loadRuntimeEnvironment } from "./runtime.mjs";
import { startWebServer } from "./start.mjs";

const settings = JSON.parse(
  await readFile(new URL("../runtime-config.json", import.meta.url), "utf8"),
);
const env = await loadRuntimeEnvironment({ ...settings, ...process.env });

// Amplify's compute contract requires port 3000.
startWebServer({ ...env, PORT: "3000" });
