# GenieAI experience design

The user has delegated design and implementation decisions and explicitly selected a WebGL-heavy experience. The goal is an engaging, modern agency website that turns interest in AI agents, retrieval, automation, and data science into a real enquiry to Juan.

## Experience

Retain React, TypeScript, Vite, and the existing six public routes. Use an ink-black interface with ivory typography, cyan/indigo accents, generous spacing, a compact navigation, and a distinctive luminous 3D intelligence core. Implement the scene directly in Three.js, with custom shaders, animated particles, orbital rings, pointer response, bloom, and scroll-driven transformations. Load it separately from the page UI. Cap pixel density, pause when offscreen or hidden, and provide a static equivalent for reduced motion or unavailable WebGL.

The homepage includes an editorial hero, tools strip, interactive service cards, an illustrative workflow playground, an engagement process, FAQs, and a clear contact invitation. Service pages share a consistent template with business outcomes, practical use cases, deliverables, and a working contact action. About identifies Juan and Stockholm without inventing team size, testimonials, clients, or measured results. All motion must preserve readability and navigation. Mobile layouts, keyboard controls, focus visibility, and reduced-motion preferences are required.

## Chat and enquiries

Add a floating Ask Genie panel. A same-origin POST /api/chat endpoint proxies bounded user/assistant messages to OpenRouter. Keys and model configuration remain exclusively on the server. A server-owned system prompt explains verified agency services and forbids invented results or claims that an email has been sent. The model may call prepare_inquiry to return a draft { name, email, company, message }. This tool never sends email. Visitors can also open an enquiry form directly.

POST /api/contact accepts { name, email, company, message, consent, website }. Require a valid email, a meaningful message, and consent. The website field is a honeypot. Deliver plain-text email by authenticated SMTP with a fixed recipient juan@avancedev.com, configured sender, and visitor Reply-To. Only report success when SMTP accepts the recipient. Preserve form data on failure. Apply body/history limits, origin checks, rate limits, provider timeouts, and safe error responses. Missing credentials produce an honest unavailable state with an email fallback, never simulated AI or delivery success.

## Runtime and metadata

Keep npm run dev as the local entry point using Vite middleware for the API. Provide npm start for a Node server that serves the production build and API together. Document OPENROUTER_API_KEY, OPENROUTER_MODEL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and SITE_URL in .env.example. No real credentials are available in the current environment, so external inference and actual email delivery cannot be claimed verified.

Provide route-specific titles, descriptions, canonical URLs, a real favicon/social asset, a sitemap, a useful 404 page, and a factual data-handling page. Remove obsolete unused application code that prevents lint/type checks. Refresh dependencies within a compatible stack; avoid a framework migration.

## Verification

Use Node integration tests with local fake OpenRouter and SMTP transports to exercise success, malformed input, untrusted roles/tools, missing configuration, provider failures, rate limits, and recipient invariants. Use browser tests for desktop/mobile navigation, WebGL fallback and canvas rendering, interactive content, chat/enquiry states, accessibility behavior, and honest delivery feedback. Run type checking, lint, production build, and dependency auditing. Inspect screenshots before completion. Perform one independent read-only code review.
