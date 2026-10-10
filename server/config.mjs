export const LEAD_RECIPIENT = "juan@avancedev.com";

export function createConfig(env = {}) {
  let siteUrl = "https://genieai.com";
  try {
    const parsed = new URL(env.SITE_URL || siteUrl);
    if (["http:", "https:"].includes(parsed.protocol)) siteUrl = parsed.origin;
  } catch {
    /* Use the agency's existing public URL. */
  }
  const smtpPort = Number(env.SMTP_PORT || 587);
  return {
    apiKey: env.OPENROUTER_API_KEY || "",
    model: env.OPENROUTER_MODEL || "openai/gpt-4.1-mini",
    siteUrl,
    smtpHost: env.SMTP_HOST || "",
    smtpPort:
      Number.isInteger(smtpPort) && smtpPort > 0 && smtpPort <= 65535
        ? smtpPort
        : 587,
    smtpUser: env.SMTP_USER || "",
    smtpPass: env.SMTP_PASS || "",
    smtpFrom: env.SMTP_FROM || "",
    trustProxy: Math.max(0, Math.min(5, Number(env.TRUST_PROXY || 0) || 0)),
  };
}

export function emailConfigured(config) {
  return Boolean(
    config.smtpHost && config.smtpUser && config.smtpPass && config.smtpFrom,
  );
}
