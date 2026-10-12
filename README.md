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

### AWS Amplify Hosting

The root `amplify.yml` overrides the console build specification. It uses Node 22 and `npm run build:amplify` to generate `.amplify-hosting`, including public static assets, the self-contained Express compute server, and a routing manifest. `/api/*` and HTML documents reach compute on port 3000; assets use Amplify's static hosting. The build preserves only allowlisted, non-secret configuration. Local `.env` files and build-time credentials are excluded from both deployment targets.

For the production app in Stockholm (`eu-north-1`):

1. Create an AWS Secrets Manager secret named `genieai/production` in `eu-north-1`. Use a JSON object with `OPENROUTER_API_KEY` and, when email is ready, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM`. SMTP port may be a string or a number. Store actual credentials only in Secrets Manager.
2. Create an IAM role whose trust policy allows `amplify.amazonaws.com` to perform `sts:AssumeRole`. Its permissions policy should allow `secretsmanager:GetSecretValue` only on the ARN of this secret. If using a customer-managed KMS key, also grant the necessary key decrypt permission.
3. In Amplify, open **App settings → IAM roles → Compute role → Edit**, and attach the role to `main` only. Avoid giving preview branches access to production credentials.
4. In **Hosting → Environment variables**, set `GENIEAI_SECRET_ID=genieai/production` and `GENIEAI_SECRET_REGION=eu-north-1`. Keep `SITE_URL=https://genieai.se` and `OPENROUTER_MODEL=openai/gpt-4.1-mini` here. Remove ordinary build variables containing the OpenRouter key or SMTP credentials after the runtime secret is configured.
5. Deploy the commit containing `amplify.yml`. Its artifact directory is `.amplify-hosting`, rather than `dist`. An existing static app may also need its platform changed to `WEB_COMPUTE`; check the app's platform with `aws amplify get-app --app-id <app-id> --region eu-north-1 --query app.platform`. If it is `WEB`, use `aws amplify update-app --app-id <app-id> --platform WEB_COMPUTE --region eu-north-1` before deploying the compute bundle. Preserve domain redirects, and remove static SPA rewrites that intercept `/api/*` or replace server routes with `/index.html`.
6. Verify that `https://www.genieai.se/api/status` returns JSON with `chat: true`, then send a real message through the website. `email` becomes true only after SMTP is configured; validate delivery separately.

Verify client IP handling before relying on per-IP limits: Amplify forwards requests through proxies, while `TRUST_PROXY` defaults to `0`. Without a verified trusted hop count, the app may count multiple visitors under the same proxy address. Determine the actual forwarded chain in the deployed environment, set `TRUST_PROXY` to that count in Amplify's build variables, redeploy, and confirm two independent client IPs receive separate limits. Never enable blanket proxy trust or assume the first forwarded address is trustworthy. Use an edge or shared rate limiter for enforcement across compute instances.

The server reads the secret during the first API request, once per compute process, using the AWS SDK's default credential provider and its attached Compute role. Website readiness requests do not initialize credentials. This ordering matters: the deployed Amplify process had no role credentials before listening, while request-time loading succeeds. Concurrent API requests share initialization. There are no hardcoded AWS access keys. Secret values and provider error details are not logged. If secret retrieval or parsing fails, the website stays available while chat and email return an unavailable state; after correcting the secret or role, redeploy to restart existing processes. New secret values require restarting/redeploying running processes.

To collect runtime diagnostics, attach a separate Amplify service role with `logs:CreateLogGroup`, `logs:CreateLogStream`, and `logs:PutLogEvents` scoped to the app's `/aws/amplify/<app-id>` log group, plus `logs:DescribeLogGroups`. This logging role is separate from the main branch's secret-reading Compute role. Credential failures log a safe error code and credential-source booleans; provider keys and raw AWS errors are omitted.

Local development and `npm start` continue to use the local `.env`. To inspect the Amplify bundle locally, run `npm run build:amplify`, then `node .amplify-hosting/compute/default/index.mjs`. Supply the non-secret secret ID/region and authorized AWS credentials only when testing real Secrets Manager access.

AWS references: [Express deployment manifest](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-express-server.html), [SSR Compute roles](https://docs.aws.amazon.com/amplify/latest/userguide/amplify-SSR-compute-role.html), and [Amplify build settings](https://docs.aws.amazon.com/amplify/latest/userguide/edit-build-settings.html).

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
