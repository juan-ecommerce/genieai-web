import { createWebApp } from "./web.mjs";
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error("PORT must be an integer between 1 and 65535.");
const server = createWebApp().listen(port, () =>
  console.log("GenieAI is listening on http://localhost:" + port),
);
server.on("error", (error) => {
  console.error("Could not start GenieAI:", error.message);
  process.exitCode = 1;
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
