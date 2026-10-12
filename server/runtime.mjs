const secretKeys = [
  "OPENROUTER_API_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
];

async function readRuntimeSecret(id, region) {
  const { SecretsManagerClient, GetSecretValueCommand } = await import(
    "@aws-sdk/client-secrets-manager"
  );
  const client = new SecretsManagerClient({ region, maxAttempts: 2 });
  try {
    const result = await client.send(new GetSecretValueCommand({ SecretId: id }), {
      abortSignal: AbortSignal.timeout(8000),
    });
    return result.SecretString;
  } finally {
    client.destroy();
  }
}

export async function loadRuntimeEnvironment(env, options = {}) {
  const result = { ...env };
  if (!env.GENIEAI_SECRET_ID) return result;

  // A configured production secret is authoritative, including on failure.
  for (const key of secretKeys) delete result[key];
  try {
    const readSecret = options.readSecret || readRuntimeSecret;
    const secret = JSON.parse(
      await readSecret(
        env.GENIEAI_SECRET_ID,
        env.GENIEAI_SECRET_REGION || env.AWS_REGION,
      ),
    );
    if (!secret || typeof secret !== "object" || Array.isArray(secret))
      throw new Error("Invalid secret payload.");

    const values = {};
    for (const key of secretKeys) {
      if (secret[key] === undefined) continue;
      if (
        typeof secret[key] !== "string" &&
        !(key === "SMTP_PORT" && typeof secret[key] === "number")
      )
        throw new Error("Invalid secret value.");
      values[key] = String(secret[key]);
    }
    return { ...result, ...values };
  } catch {
    (options.logError || console.error)(
      "Production credentials could not be loaded. Check the secret and Amplify Compute role; chat and email are unavailable.",
    );
    return result;
  }
}
