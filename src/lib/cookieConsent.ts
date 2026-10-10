export const COOKIE_STORAGE_KEY = "genieai.cookie-consent";
// Change this whenever cookie purposes or providers change. Old choices then expire.
const POLICY_VERSION = 1;
const PREFERENCE_LIFETIME = 180 * 24 * 60 * 60 * 1000;

export type CookieChoice = "all" | "essential";
export type CookiePreference = {
  version: number;
  choice: CookieChoice;
  savedAt: number;
  expiresAt: number;
};

export function parseCookiePreference(value: string | null): CookiePreference | null {
  try {
    const preference = JSON.parse(value || "null");
    const now = Date.now();
    if (
      !preference ||
      preference.version !== POLICY_VERSION ||
      !["all", "essential"].includes(preference.choice) ||
      !Number.isFinite(preference.savedAt) ||
      !Number.isFinite(preference.expiresAt) ||
      preference.savedAt > now ||
      preference.savedAt <= 0 ||
      preference.expiresAt <= now ||
      preference.expiresAt !== preference.savedAt + PREFERENCE_LIFETIME
    ) return null;
    return {
      version: POLICY_VERSION,
      choice: preference.choice,
      savedAt: preference.savedAt,
      expiresAt: preference.expiresAt,
    };
  } catch {
    return null;
  }
}

export function readCookiePreference() {
  try {
    return parseCookiePreference(window.localStorage.getItem(COOKIE_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function createCookiePreference(choice: CookieChoice): CookiePreference {
  const savedAt = Date.now();
  return { version: POLICY_VERSION, choice, savedAt, expiresAt: savedAt + PREFERENCE_LIFETIME };
}

export function saveCookiePreference(preference: CookiePreference) {
  try {
    window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preference));
    return true;
  } catch {
    return false;
  }
}
