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
  } catch (error) {
    const knownErrors = [
      "AccessDeniedException",
      "ResourceNotFoundException",
      "DecryptionFailure",
      "InvalidRequestException",
      "CredentialsProviderError",
      "TokenProviderError",
      "ProviderError",
      "TimeoutError",
      "AbortError",
      "SyntaxError",
      "TypeError",
    ];
    const errorName = error?.name;
    const code = knownErrors.includes(errorName)
      ? errorName
      : "credential_load_failed";
    const sources = {
      environment: Boolean(env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY),
      container: Boolean(
        env.AWS_CONTAINER_CREDENTIALS_FULL_URI ||
          env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI,
      ),
      webIdentity: Boolean(env.AWS_WEB_IDENTITY_TOKEN_FILE && env.AWS_ROLE_ARN),
    };
    (options.logError || console.error)(
      "Production credentials could not be loaded. " +
        JSON.stringify({ code, credentialSources: sources }) +
        " Check the secret and Amplify Compute role; chat and email are unavailable.",
    );
    return result;
  }
}
