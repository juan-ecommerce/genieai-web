import express from "express";
import { createConfig, emailConfigured } from "./config.mjs";
import { answerChat, chatSchema } from "./chat.mjs";
import { contactSchema, createMailSender, deliverInquiry } from "./contact.mjs";

function limiter(limit, windowMs) {
  const requests = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    if (requests.size >= 10000)
      for (const [ip, entry] of requests)
        if (entry.expires <= now) requests.delete(ip);
    let entry = requests.get(key);
    if (!entry || entry.expires <= now) {
      entry = { count: 0, expires: now + windowMs };
      if (requests.size < 10000) requests.set(key, entry);
      else
        return res
          .status(429)
          .json({
            error: "Please try again in a little while.",
            code: "rate_limit",
          });
    }
    entry.count++;
    if (entry.count > limit) {
      res.set("Retry-After", String(Math.ceil((entry.expires - now) / 1000)));
      return res
        .status(429)
        .json({
          error: "Please wait a little before trying again.",
          code: "rate_limit",
        });
    }
    next();
  };
}

export function createApiApp(env = process.env, dependencies = {}) {
  const config = createConfig(env);
  const app = express();
  app.disable("x-powered-by");
  if (config.trustProxy) app.set("trust proxy", config.trustProxy);
  app.use((req, res, next) => {
    res.set({
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    if (req.method === "POST") {
      const origin = req.get("origin");
      const host = req.get("host");
      let ownOrigin = false;
      try {
        ownOrigin =
          origin === config.siteUrl ||
          (Boolean(host) && new URL(origin).host === host);
      } catch {
        /* Absent origin is valid for direct API clients. */
      }
      if (origin && !ownOrigin)
        return res
          .status(403)
          .json({
            error: "This request could not be accepted.",
            code: "origin",
          });
      if (!req.is("application/json"))
        return res
          .status(415)
          .json({
            error: "Please submit a valid request.",
            code: "content_type",
          });
    }
    next();
  });
  app.use(express.json({ limit: "32kb" }));
  app.get("/status", (_req, res) =>
    res.json({ chat: Boolean(config.apiKey), email: emailConfigured(config) }),
  );
  const sendMail =
    dependencies.sendMail ||
    (emailConfigured(config) ? createMailSender(config) : null);

  app.post(
    "/chat",
    limiter(dependencies.limits?.chat ?? 20, 60000),
    async (req, res) => {
      const parsed = chatSchema.safeParse(req.body);
      if (!parsed.success)
        return res
          .status(400)
          .json({
            error: "Please send a shorter message and try again.",
            code: "validation",
          });
      if (!config.apiKey)
        return res
          .status(503)
          .json({
            error:
              "Chat is temporarily unavailable. You can still send an enquiry to Juan.",
            code: "unavailable",
          });
      try {
        res.json(
          await answerChat(
            config,
            parsed.data.messages,
            dependencies.fetchImpl,
          ),
        );
      } catch {
        res
          .status(502)
          .json({
            error:
              "Genie could not respond just now. Please try again, or send an enquiry.",
            code: "provider",
          });
      }
    },
  );

  app.post(
    "/contact",
    limiter(dependencies.limits?.contact ?? 5, 3600000),
    async (req, res) => {
      const parsed = contactSchema.safeParse(req.body);
      if (!parsed.success)
        return res
          .status(400)
          .json({
            error:
              "Please check your details, include a project message, and agree to be contacted.",
            code: "validation",
          });
      if (!emailConfigured(config))
        return res
          .status(503)
          .json({
            error:
              "The enquiry form is temporarily unavailable. Please email juan@avancedev.com directly.",
            code: "unavailable",
          });
      try {
        await deliverInquiry(config, parsed.data, sendMail);
        res.json({ success: true });
      } catch {
        res
          .status(502)
          .json({
            error:
              "Your enquiry could not be delivered. Your details are still here; please try again or email Juan directly.",
            code: "delivery",
          });
      }
    },
  );

  app.use((_req, res) =>
    res.status(404).json({ error: "Endpoint not found.", code: "not_found" }),
  );
  app.use((error, _req, res, _next) => {
    res
      .status(error.type === "entity.too.large" ? 413 : 400)
      .json({
        error: "Please submit a valid, shorter request.",
        code: "invalid_body",
      });
  });
  return app;
}
