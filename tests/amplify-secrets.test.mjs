import test from "node:test";
import assert from "node:assert/strict";
import { loadRuntimeEnvironment } from "../server/runtime.mjs";
import { createConfig, emailConfigured } from "../server/config.mjs";

test("runtime secret enables chat and email without replacing public configuration", async () => {
  const env = await loadRuntimeEnvironment(
    {
      GENIEAI_SECRET_ID: "genieai/production",
      GENIEAI_SECRET_REGION: "eu-north-1",
      SITE_URL: "https://genieai.se",
      OPENROUTER_MODEL: "test/model",
    },
    {
      readSecret: async (id, region) => {
        assert.equal(id, "genieai/production");
        assert.equal(region, "eu-north-1");
        return JSON.stringify({
          OPENROUTER_API_KEY: "runtime-key",
          RESENDKEY: "resend-runtime-key",
          RESEND_FROM: "GenieAI <hello@example.test>",
          SMTP_HOST: "smtp.example.test",
          SMTP_PORT: 465,
          SMTP_USER: "mail-user",
          SMTP_PASS: "runtime-password",
          SMTP_FROM: "GenieAI <hello@example.test>",
          SITE_URL: "https://wrong.example",
          NODE_OPTIONS: "unsafe-option",
        });
      },
    },
  );
  const config = createConfig(env);
  assert.equal(config.apiKey, "runtime-key");
  assert.equal(config.resendKey, "resend-runtime-key");
  assert.equal(config.resendFrom, "GenieAI <hello@example.test>");
  assert.equal(config.model, "test/model");
  assert.equal(config.siteUrl, "https://genieai.se");
  assert.equal(config.smtpPort, 465);
  assert.equal(emailConfigured(config), true);
  assert.equal(env.NODE_OPTIONS, undefined);
});

test("a configured secret failure disables providers without leaking its error", async () => {
  const logs = [];
  const env = await loadRuntimeEnvironment(
    {
      GENIEAI_SECRET_ID: "genieai/production",
      OPENROUTER_API_KEY: "stale-key",
      SMTP_PASS: "stale-password",
      RESENDKEY: "stale-resend-key",
      RESEND_FROM: "hello@example.test",
      SITE_URL: "https://genieai.se",
    },
    {
      readSecret: async () => {
        throw new Error("secret-provider-error-with-password");
      },
      logError: (message) => logs.push(message),
    },
  );
  const config = createConfig(env);
  assert.equal(config.apiKey, "");
  assert.equal(config.resendKey, "");
  assert.equal(config.resendFrom, "");
  assert.equal(emailConfigured(config), false);
  assert.equal(config.siteUrl, "https://genieai.se");
  assert.equal(logs.length, 1);
  assert.doesNotMatch(logs.join(), /password|stale-key|secret-provider-error/);
});

test("malformed secret payloads fail closed", async () => {
  for (const secret of [
    "not JSON",
    "null",
    "[]",
    '{"OPENROUTER_API_KEY":42}',
    '{"SMTP_PASS":{"value":"not-a-string"}}',
    '{"RESENDKEY":42}',
    '{"RESEND_FROM":{"value":"not-a-string"}}',
  ]) {
    const env = await loadRuntimeEnvironment(
      {
        GENIEAI_SECRET_ID: "genieai/production",
        OPENROUTER_API_KEY: "stale-key",
        SMTP_PASS: "stale-password",
      },
      { readSecret: async () => secret, logError: () => {} },
    );
    assert.equal(createConfig(env).apiKey, "");
    assert.equal(emailConfigured(createConfig(env)), false);
  }
});

test("local credentials still work when no runtime secret is configured", async () => {
  const env = await loadRuntimeEnvironment(
    { OPENROUTER_API_KEY: "local-key" },
    { readSecret: async () => assert.fail("AWS should not be contacted") },
  );
  assert.equal(createConfig(env).apiKey, "local-key");
});

test("startup logs identify known AWS failures while redacting unknown error names", async () => {
  for (const [name, expected] of [
    ["AccessDeniedException", "AccessDeniedException"],
    ["CredentialsProviderError", "CredentialsProviderError"],
    ["secret-key-in-an-error-name", "credential_load_failed"],
  ]) {
    const logs = [];
    await loadRuntimeEnvironment(
      { GENIEAI_SECRET_ID: "genieai/production" },
      {
        readSecret: async () => {
          const error = new Error("secret-key-in-an-error-message");
          error.name = name;
          throw error;
        },
        logError: (message) => logs.push(message),
      },
    );
    assert.match(logs.join(), new RegExp(expected));
    assert.doesNotMatch(logs.join(), /secret-key/);
  }
});
