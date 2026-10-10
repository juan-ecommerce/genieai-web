import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";
import {
  COOKIE_STORAGE_KEY,
  createCookiePreference,
  parseCookiePreference,
  readCookiePreference,
  saveCookiePreference,
  type CookieChoice,
} from "../lib/cookieConsent";

export default function CookieConsent({
  settingsOpen,
  onOpenSettings,
  onCloseSettings,
  hidden,
}: {
  settingsOpen: boolean;
  onOpenSettings: () => void;
  onCloseSettings: () => void;
  hidden: boolean;
}) {
  const [preference, setPreference] = useState(readCookiePreference);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const focusLauncher = useCallback(() => launcher.current?.focus(), []);
  useDialog(settingsOpen, dialog, onCloseSettings, focusLauncher);

  useEffect(() => {
    function syncPreference(event: StorageEvent) {
      if (event.key === COOKIE_STORAGE_KEY || event.key === null) {
        setPreference(parseCookiePreference(event.newValue));
        setStorageBlocked(false);
      }
    }
    window.addEventListener("storage", syncPreference);
    return () => window.removeEventListener("storage", syncPreference);
  }, []);

  function choose(choice: CookieChoice) {
    const next = createCookiePreference(choice);
    setStorageBlocked(!saveCookiePreference(next));
    setPreference(next);
    onCloseSettings();
  }

  const choices = (
    <>
      <button className="button button-outline cookie-choice" onClick={() => choose("essential")}>
        Reject optional
      </button>
      <button className="button button-outline cookie-choice" onClick={() => choose("all")}>
        Accept all
      </button>
    </>
  );

  return (
    <>
      {!hidden && !preference && (
        <section
          className="cookie-banner"
          aria-label="Cookie consent"
          aria-hidden={settingsOpen || undefined}
          style={settingsOpen ? { visibility: "hidden" } : undefined}
        >
          <div className="cookie-banner-heading">
            <span className="cookie-symbol"><ShieldCheck size={20} aria-hidden="true" /></span>
            <h2>Your privacy, your choice.</h2>
          </div>
          <p>
            We use essential storage to remember your cookie choice. No analytics or advertising cookies
            are currently used. You can change your choice any time in Cookie settings.
          </p>
          <div className="cookie-banner-actions">
            {choices}
            <button className="cookie-text-button" onClick={onOpenSettings}>Manage preferences</button>
          </div>
          <Link className="cookie-policy-link" to="/privacy">Privacy policy</Link>
        </section>
      )}
      {!hidden && preference && (
        <div
          className="cookie-settings-access"
          aria-hidden={settingsOpen || undefined}
          style={settingsOpen ? { visibility: "hidden" } : undefined}
        >
          {storageBlocked && (
            <p className="cookie-storage-notice" role="status">
              Your choice applies to this visit. Your browser prevented saving it.
            </p>
          )}
          <button className="cookie-settings-launcher" ref={launcher} onClick={onOpenSettings}>
            <Cookie size={15} aria-hidden="true" /> Cookie settings
          </button>
        </div>
      )}
      {settingsOpen && (
        <div className="overlay-backdrop cookie-overlay" onClick={(event) => {
          if (event.target === event.currentTarget) onCloseSettings();
        }}>
          <div
            className="contact-dialog cookie-dialog"
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-description"
            tabIndex={-1}
          >
            <button className="icon-button dialog-close" aria-label="Close cookie preferences" onClick={onCloseSettings}>
              <X size={17} />
            </button>
            <p className="eyebrow">YOUR DATA. YOUR DECISION.</p>
            <h2 id="cookie-preferences-title">Cookie preferences</h2>
            <p id="cookie-preferences-description" className="cookie-dialog-intro">
              Browse freely, whatever you choose. Your choice applies only to the storage described here.
              We will ask again if this changes.
            </p>
            <div className="cookie-category">
              <div><h3>Essential storage</h3><span className="cookie-category-status">Always active</span></div>
              <p>Remembers your selection on this device for up to 180 days. It contains your choice and dates, without contact details or chat messages.</p>
            </div>
            <div className="cookie-category">
              <div><h3>Analytics & advertising</h3><span className="cookie-category-status cookie-category-inactive">Not used</span></div>
              <p>This website currently has no analytics, advertising, or tracking cookies. Accepting all does not add any trackers.</p>
            </div>
            <p className="cookie-current-choice">
              {preference ? <>Your current choice: <strong>{preference.choice === "all" ? "All listed cookies" : "Essential only"}</strong>.</> : "No choice saved yet. Optional storage stays off until you choose."}
            </p>
            <p className="cookie-revisit">Change or withdraw your choice any time using Cookie settings, available on every page.</p>
            <Link className="cookie-policy-link" to="/privacy" onClick={onCloseSettings}>Read the privacy policy</Link>
            <div className="cookie-dialog-actions">{choices}</div>
          </div>
        </div>
      )}
    </>
  );
}
