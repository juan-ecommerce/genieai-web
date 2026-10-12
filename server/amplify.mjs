import { readFile } from "node:fs/promises";
import { loadRuntimeEnvironment } from "./runtime.mjs";
import { startWebServer } from "./start.mjs";

const settings = JSON.parse(
  await readFile(new URL("../runtime-config.json", import.meta.url), "utf8"),
);
// Amplify's compute contract requires port 3000.
// Resolve credentials during an API invocation, after website readiness checks.
startWebServer({ ...settings, ...process.env, PORT: "3000" }, {
  resolveEnvironment: () => loadRuntimeEnvironment({ ...settings, ...process.env }),
});
