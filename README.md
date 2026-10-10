# GenieAI agency website

A React/TypeScript agency website with a Three.js intelligence core, bloom, shader particles, pointer interaction, scroll parallax, animated service illustrations, and an interactive workflow playground. It includes an OpenRouter assistant and an enquiry form that sends to juan@avancedev.com through SMTP.

## Local development

Use Node.js 22.17+ and npm.

1. Run npm ci.
2. Copy .env.example to .env and fill in your own server credentials.
3. Run npm run dev and open the URL printed by Vite.

The Vite development server mounts the same API used in production. Without credentials, the website still works and chat/contact show honest unavailable states with direct email alternatives. Never prefix credentials with VITE_ or put them in frontend code.

## Connect chat and email

OPENROUTER_API_KEY enables inference. OPENROUTER_MODEL defaults to openai/gpt-4.1-mini; choose an OpenRouter model that supports tool calls.

SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM enable delivery. Use an authenticated mailbox or transactional email provider and a verified sender. Port 587 uses STARTTLS; port 465 uses immediate TLS. The recipient is fixed on the server to juan@avancedev.com; the visitor address is Reply-To.

The assistant can prepare an enquiry draft. The visitor reviews it, agrees to be contacted, and submits it before the server sends email. A successful response means the SMTP server accepted the recipient; inbox delivery is not guaranteed. Failed submissions preserve the visitor's details.

SITE_URL must be your final public origin. It controls production canonical URLs, social image URLs, sitemap, and allowed request origins. The default is https://genieai.se. PORT defaults to 3000. Set TRUST_PROXY only to the number of reverse-proxy hops actually trusted in your deployment; this affects per-IP rate limits.

## Production

Run npm run build, then npm start. The Node server serves the built website, route-specific metadata, sitemap, proper 404s, and both API endpoints. Put it behind HTTPS on a host that supports a long-running Node process, and provide secrets through that host's environment settings.

Static-only hosting and npm run preview serve the frontend without its API. They need a separate backend/reverse proxy for /api. This repository does not publish itself.

Chat has a 20 requests/minute/IP limit; email has 5/hour/IP. These counters live in memory, reset on restart, and are local to each server instance. Multiple replicas require a shared limiter before public launch. Chat requests have bounded history and an upstream timeout. SMTP has connection and socket timeouts.

Visitors' chat and form details live only in page memory. No application database or analytics is added. Cookie preferences are the only application data saved in browser storage. Conversation data goes to OpenRouter when chat is configured; enquiries go to your SMTP provider. See /privacy and review providers' retention settings for your deployment.

## Cookie consent

The first-visit banner offers equally prominent Accept all and Reject optional choices, plus a preferences panel. Cookie settings can be reopened from the floating control or the footer on any page. No analytics, advertising, or tracking cookies are currently used; neither choice adds trackers.

The essential `genieai.cookie-consent` local-storage record contains only the selection, policy version, and saved/expiry timestamps. It expires after 180 days. Invalid, expired, and previous-policy records prompt again. If storage is blocked, the choice lasts for the current page visit. Changes sync across tabs.

Before adding any optional storage or tracking provider, update the disclosed purposes/providers and increment POLICY_VERSION in src/lib/cookieConsent.ts. Integrate the provider with purpose-specific consent and ensure revocation stops it; the current banner does not authorize undisclosed future trackers. Chat and enquiry consent remain separate.

## Verification

- npm test — API validation, draft tools, delivery failures, and production routing.
- npm run test:e2e — Playwright navigation, mobile, WebGL, keyboard behavior, and mocked chat/email flows.
- npm run lint — ESLint.
- npm run build — TypeScript checks and production build.
- npm audit — dependency advisory check.

For browser tests, install Chromium once with npx playwright install chromium. Tests inject fake providers and do not send real email or consume inference credits. Live inference and delivery require separate validation after you configure credentials.

The GPU scene loads separately, pauses when offscreen, and uses fewer particles on small screens. Reduced-motion preferences or unavailable WebGL retain a CSS illustration and all content. Routes: /, /ai-agents, /rag, /automation, /data-science, /about, and /privacy.
