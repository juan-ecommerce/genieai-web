# GenieAI Experience Implementation Plan

> Implement inline with executing-plans and test-driven-development, followed by one independent review. The user delegated the remaining design and planning decisions.

**Goal:** Build a WebGL agency experience with useful OpenRouter chat and real SMTP enquiries.

**Architecture:** React pages and shared UI consume same-origin JSON endpoints. Three.js is lazy-loaded and isolated from accessible content. Node/Express implements the API in development and production, with injectable external transports for tests.

**Tech Stack:** React 18, TypeScript, Vite, Three.js, Motion, Express, Nodemailer, Node test runner, Playwright.

**Spec:** ../specs/2026-10-10-genieai-experience-design.md

## Global Constraints

- Preserve the existing AI Agents draft in an external backup before replacing its presentation.
- Fixed enquiry recipient: juan@avancedev.com.
- Keys remain server-side; there are no live credentials in this environment.
- Never invent clients, testimonials, team size, ROI, or delivery success.
- Support mobile, keyboard use, reduced motion, and absent WebGL.
- Leave changes reviewable in the working tree; do not publish or push.

## Review Focus

- Untrusted messages must not replace the server system prompt or execute a send tool.
- SMTP rejection and API timeouts must preserve drafts and avoid false success.
- Small viewports must retain reachable navigation, chat input, and enquiry controls.
- Unavailable WebGL and reduced motion must retain the entire page and meaningful artwork.
- Missing API/email configuration must have clear, usable fallback actions.

## Task 1: API and delivery

Files: server/app.mjs, server/chat.mjs, server/contact.mjs, server/config.mjs, server/index.mjs, server/app.d.mts, tests/api.test.mjs, vite.config.ts, package.json, .env.example.

Interfaces: createApiApp(config, { fetchImpl, sendMail }) returns Express middleware. POST /chat returns { reply, inquiry? }. POST /contact returns { success: true }; errors return { error, code }. Inquiry fields are name, email, company, message; contact adds consent and website.

- [x] Write integration tests for message validation, fixed email recipient, missing configuration, provider failures, draft tools, origin checks, and rate limiting.
- [x] Run node --test tests/api.test.mjs and observe missing implementation failure.
- [x] Implement the API and SMTP transport with validation, timeouts, and safe responses.
- [x] Run the complete API tests; expect all pass.

## Task 2: Visual experience

Files: src/components/scene/*, src/components/ui/*, src/components/Layout.tsx, src/pages/*, src/data/services.ts, src/index.css, src/main.tsx, public/brand/*, index.html.

Interfaces: shared Button, Reveal, ServiceVisual, and useExperience actions; lazy Scene accepts scroll/pointer motion internally. Existing service routes remain usable. Layout owns contact/chat state.

- [x] Write browser assertions for homepage navigation, service routes, fallback content, and workflow interaction; observe current-site failures.
- [x] Implement the Three.js scene and complete coherent page design with fallback artwork.
- [x] Add reusable service content and pages, founder page, FAQ, metadata, and 404.
- [x] Verify desktop/mobile screenshots, routes, interactions, and reduced-motion rendering.

## Task 3: Chat and contact UI

Files: src/components/ChatWidget.tsx, src/components/ContactModal.tsx, src/hooks/useDialog.ts, src/lib/api.ts, tests/experience.spec.ts.

Interfaces: ChatWidget and ContactModal use Task 1's endpoints and Inquiry type. The model's draft opens a reviewable enquiry form; only a deliberate submit invokes contact delivery.

- [x] Add browser tests for chat response/draft, SMTP failure then success, keyboard dismissal, and data preservation.
- [x] Observe missing feature failures.
- [x] Implement accessible chat, enquiry review, consent, loading/error/success states, and email fallback.
- [x] Run browser tests with mocked providers; expect all pass.

## Task 4: Runtime and final verification

Files: README.md, playwright.config.ts, server/index.mjs, metadata helpers, .gitignore.

- [x] Verify production HTTP routing, asset 404s, route metadata, sitemap, and unconfigured API behavior.
- [x] Document setup, environment variables, and hosting requirements.
- [x] Run API tests, browser tests, type checks, lint, build, and npm audit.
- [x] Review screenshots and request one independent read-only review; resolve material findings with regression tests.
