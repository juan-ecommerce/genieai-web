export async function postJson<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    throw new Error(
      "We could not connect just now. Please try again or email Juan directly.",
    );
  }
  let result: T & { error?: string };
  try {
    result = await response.json();
  } catch {
    throw new Error(
      "This service is temporarily unavailable. Please email Juan directly.",
    );
  }
  if (!response.ok)
    throw new Error(result.error || "Something went wrong. Please try again.");
  return result;
}
