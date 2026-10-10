import express from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createApiApp } from "./app.mjs";
import { createConfig } from "./config.mjs";
import { getMetadata, metadata, normalizePath } from "../shared/metadata.mjs";

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

export function renderDocument(template, pathname, siteUrl) {
  pathname = normalizePath(pathname);
  const meta = getMetadata(pathname);
  const canonical = siteUrl + pathname;
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    "<title>" + escapeHtml(meta.title) + "</title>",
  );
  const fields = {
    description: meta.description,
    robots: metadata[pathname] ? "index, follow" : "noindex, follow",
    "og:title": meta.title,
    "og:description": meta.description,
    "og:url": canonical,
    "og:image": siteUrl + "/brand/social.png",
    "twitter:title": meta.title,
    "twitter:description": meta.description,
    "twitter:image": siteUrl + "/brand/social.png",
  };
  for (const [name, value] of Object.entries(fields)) {
    const expression = new RegExp(
      '(<meta\\s+(?:name|property)="' + name + '"\\s+content=")[^"]*(")',
    );
    html = html.replace(
      expression,
      (_match, prefix, suffix) => prefix + escapeHtml(value) + suffix,
    );
  }
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    (_match, prefix, suffix) => prefix + escapeHtml(canonical) + suffix,
  );
  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GenieAI",
    url: siteUrl,
    logo: siteUrl + "/brand/logo.png",
    email: "juan@avancedev.com",
    telephone: "+46793348387",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stockholm",
      addressCountry: "SE",
    },
    description: metadata["/"].description,
  };
  return html.replace(
    /(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
    (_match, prefix, suffix) =>
      prefix + JSON.stringify(organization).replace(/</g, "\\u003c") + suffix,
  );
}

export function createWebApp(env = process.env, options = {}) {
  const app = express();
  const config = createConfig(env);
  const distDirectory =
    options.distDirectory ||
    fileURLToPath(new URL("../dist/", import.meta.url));
  let template;
  try {
    template = readFileSync(distDirectory + "/index.html", "utf8");
  } catch {
    throw new Error(
      "The website build is missing. Run npm run build before npm start.",
    );
  }
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
    });
    next();
  });
  app.use("/api", createApiApp(env, options.dependencies));
  app.get("/robots.txt", (_req, res) =>
    res
      .type("text")
      .send(
        "User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: " +
          config.siteUrl +
          "/sitemap.xml\n",
      ),
  );
  app.get("/sitemap.xml", (_req, res) =>
    res.type("application/xml").send(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
        Object.keys(metadata)
          .map(
            (pathname) =>
              "<url><loc>" +
              escapeHtml(config.siteUrl + pathname) +
              "</loc></url>",
          )
          .join("") +
        "</urlset>",
    ),
  );
  app.use(
    "/assets",
    express.static(distDirectory + "/assets", {
      index: false,
      immutable: true,
      maxAge: "1y",
      dotfiles: "deny",
    }),
  );
  app.use(
    express.static(distDirectory, {
      index: false,
      maxAge: "1h",
      dotfiles: "deny",
    }),
  );
  app.use((req, res) => {
    if (
      req.method !== "GET" ||
      /\.[^/]+$/.test(req.path) ||
      req.path.startsWith("/assets/")
    )
      return res.status(404).type("text").send("Not found.");
    const pathname = normalizePath(req.path);
    res
      .set("Cache-Control", "no-cache")
      .status(metadata[pathname] ? 200 : 404)
      .type("html")
      .send(renderDocument(template, pathname, config.siteUrl));
  });
  return app;
}
