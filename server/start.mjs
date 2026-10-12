import { createWebApp } from "./web.mjs";
import { createServer } from "node:http";

export function createWebHandler(env, options = {}) {
  const publicApp = createWebApp(env, options);
  if (!options.resolveEnvironment) return publicApp;
  let appPromise;
  return async (req, res) => {
    const path = req.url.split("?")[0];
    if (path !== "/api" && !path.startsWith("/api/"))
      return publicApp(req, res);
    try {
      appPromise ||= Promise.resolve()
        .then(options.resolveEnvironment)
        .then((runtimeEnv) => createWebApp(runtimeEnv, options));
      const app = await appPromise;
      app(req, res);
    } catch {
      res.writeHead(503, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      res.end(JSON.stringify({
        error: "The service is temporarily unavailable.",
        code: "unavailable",
      }));
    }
  };
}

export function startWebServer(env = process.env, options = {}) {
  const port = Number(env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("PORT must be an integer between 1 and 65535.");
  const server = createServer(createWebHandler(env, options)).listen(port, () =>
    console.log("GenieAI is listening on port " + port),
  );
  server.on("error", (error) => {
    console.error("Could not start GenieAI:", error.message);
    process.exitCode = 1;
  });
  for (const signal of ["SIGINT", "SIGTERM"])
    process.on(signal, () => server.close(() => process.exit(0)));
  return server;
}
