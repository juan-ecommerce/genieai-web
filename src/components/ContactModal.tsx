import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Loader2, Mail, Phone, X } from "lucide-react";
import { emptyInquiry, type Inquiry } from "../lib/experience";
import { postJson } from "../lib/api";
import { useDialog } from "../hooks/useDialog";
export default function ContactModal({
  isOpen,
  onClose,
  draft,
}: {
  isOpen: boolean;
  onClose: () => void;
  draft?: Inquiry;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<Inquiry>(emptyInquiry);
  const [consent, setConsent] = useState(false),
    [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false),
    [success, setSuccess] = useState(false),
    [error, setError] = useState("");
  const pending = useRef(false);
  useDialog(isOpen, dialog, onClose);
  useEffect(() => {
    if (draft) {
      setForm(draft);
      setConsent(false);
      setError("");
    }
  }, [draft]);
  useEffect(() => {
    if (isOpen) setSuccess(false);
  }, [isOpen]);
  function field(name: keyof Inquiry, value: string) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setSubmitting(true);
    setError("");
    try {
      const result = await postJson<{ success: boolean }>("/api/contact", {
        ...form,
        consent,
        website,
      });
      if (!result.success)
        throw new Error(
          "Your enquiry could not be delivered. Please try again.",
        );
      setSuccess(true);
      setForm(emptyInquiry);
      setConsent(false);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Please try again or email Juan directly.",
      );
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }
  if (!isOpen) return null;
  return (
    <div
      className="overlay-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <div
        className="contact-dialog"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        tabIndex={-1}
      >
        <button
          className="icon-button dialog-close"
          aria-label="Close enquiry"
          onClick={onClose}
        >
          <X size={17} />
        </button>
        <p className="eyebrow">A GOOD CONVERSATION GOES A LONG WAY</p>
        <h2 id="contact-title">Let’s build what’s next.</h2>
        {success ? (
          <div className="contact-success" role="status">
            <span className="success-symbol">
              <Check size={26} />
            </span>
            <h3>Your enquiry is on its way.</h3>
            <p>
              It has been accepted for delivery to Juan.
              <br />
              Thank you for starting the conversation.
            </p>
            <button className="button button-outline" onClick={onClose}>
              Back to the possibilities <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <p className="contact-intro">
              Tell us a little about your idea. Juan will follow up with you
              directly.
            </p>
            <form className="contact-form" onSubmit={submit}>
              <div className="field-row">
                <label className="field">
                  Your name
                  <input
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    value={form.name}
                    onChange={(event) => field("name", event.target.value)}
                    placeholder="Alex"
                    data-autofocus
                  />
                </label>
                <label className="field">
                  Email address
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(event) => field("email", event.target.value)}
                    placeholder="alex@company.com"
                  />
                </label>
              </div>
              <label className="field">
                Company <span className="sr-only">(optional)</span>
                <input
                  autoComplete="organization"
                  maxLength={120}
                  value={form.company}
                  onChange={(event) => field("company", event.target.value)}
                  placeholder="Your company (optional)"
                />
              </label>
              <label className="field">
                Your project
                <textarea
                  required
                  minLength={10}
                  maxLength={4000}
                  value={form.message}
                  onChange={(event) => field("message", event.target.value)}
                  placeholder="What would you like to make work better?"
                />
              </label>
              <div className="sr-only" aria-hidden="true">
                <label>
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>
              </div>
              <label className="consent-label">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                I agree to be contacted about this enquiry
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="button button-light"
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} />
                    Sending your enquiry…
                  </>
                ) : (
                  <>
                    Send enquiry <ArrowUpRight size={17} />
                  </>
                )}
              </button>
              <p className="form-note">
                Sent to juan@avancedev.com.{" "}
                <Link to="/privacy" onClick={onClose}>
                  How we handle your details
                </Link>
              </p>
            </form>
            <a
              className="email-fallback"
              href={
                "mailto:juan@avancedev.com?subject=" +
                encodeURIComponent("GenieAI project enquiry") +
                "&body=" +
                encodeURIComponent(
                  "Name: " +
                    form.name +
                    "\nEmail: " +
                    form.email +
                    "\nCompany: " +
                    form.company +
                    "\n\n" +
                    form.message,
                )
              }
            >
              <Mail size={13} />
              Prefer email? Open a draft to Juan
            </a>
            <a className="email-fallback" href="tel:+46793348387">
              <Phone size={13} />
              Call Juan: +46 79 3348387
            </a>
          </>
        )}
      </div>
    </div>
  );
}
