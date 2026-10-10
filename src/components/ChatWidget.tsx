import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import type { Inquiry } from "../lib/experience";
import { postJson } from "../lib/api";
import { BrandMark } from "./ui/Brand";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  inquiry?: Inquiry;
}
export default function ChatWidget({
  open,
  onClose,
  onOpen,
  onInquiry,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  onInquiry: (draft?: Inquiry) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I’m Genie.\n\nTell me what you’d like to make work better. Explore AI agents, automation, B2B/B2C commerce integrations, or data science—from forecasting to customer insights. I can also help you start an enquiry with Juan.",
    },
  ]);
  const [input, setInput] = useState(""),
    [sending, setSending] = useState(false),
    [error, setError] = useState("");
  const pending = useRef(false),
    inputRef = useRef<HTMLTextAreaElement>(null),
    endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", keydown);
      if (previous?.isConnected) previous.focus();
    };
  }, [open, onClose]);
  useEffect(() => {
    if (open)
      endRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
  }, [messages, sending, error, open]);
  async function send(text = input) {
    const content = text.trim();
    if (!content || pending.current) return;
    const user: Message = {
      id: "user-" + Date.now(),
      role: "user",
      content: content.slice(0, 2000),
    };
    const history = [
      ...messages.filter((message) => message.id !== "welcome"),
      user,
    ];
    let size = 0;
    const bounded = history
      .slice(-12)
      .reverse()
      .filter((message) => {
        size += Math.min(message.content.length, 2000);
        return size <= 16000;
      })
      .reverse()
      .map(({ role, content }) => ({ role, content: content.slice(0, 2000) }));
    pending.current = true;
    setSending(true);
    setError("");
    setInput("");
    setMessages(history);
    try {
      const result = await postJson<{ reply: string; inquiry?: Inquiry }>(
        "/api/chat",
        { messages: bounded },
      );
      setMessages((previous) => [
        ...previous,
        {
          id: "genie-" + Date.now(),
          role: "assistant",
          content: result.reply,
          inquiry: result.inquiry,
        },
      ]);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Genie is temporarily unavailable.",
      );
      setMessages((previous) =>
        previous.filter((message) => message.id !== user.id),
      );
      setInput(content);
    } finally {
      pending.current = false;
      setSending(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void send();
  }
  return (
    <>
      <button
        className="chat-launcher"
        onClick={onOpen}
        aria-label="Ask Genie"
        aria-expanded={open}
        aria-controls="genie-chat"
      >
        <Sparkles size={17} />
        <span>Ask Genie</span>
        <span className="status-dot" />
      </button>
      {open && (
        <section
          className="chat-panel"
          role="dialog"
          aria-labelledby="genie-chat-title"
          id="genie-chat"
        >
          <header className="chat-header">
            <span className="chat-avatar">
              <BrandMark />
            </span>
            <div>
              <h2 id="genie-chat-title">Ask Genie</h2>
              <p>Your AI guide to what’s possible</p>
            </div>
            <button
              className="icon-button"
              aria-label="Close chat"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </header>
          <div
            className="chat-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div key={message.id} className="chat-row">
                <div className={"chat-message " + message.role}>
                  {message.role === "assistant" && (
                    <span className="chat-message-title">
                      GENIE / AI ASSISTANT
                    </span>
                  )}
                  {message.content}
                </div>
                {message.inquiry && (
                  <div className="chat-draft">
                    <strong>Your project enquiry</strong>
                    <p>
                      {message.inquiry.name} · {message.inquiry.email}
                    </p>
                    <button
                      className="button button-outline"
                      onClick={() => onInquiry(message.inquiry)}
                    >
                      Review enquiry <ArrowUpRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {messages.length === 1 && messages[0].id === "welcome" && (
              <div className="chat-suggestions">
                {[
                  "What could AI do for my business?",
                  "Connect AI to our documents",
                  "Help me automate a workflow",
                ].map((text) => (
                  <button key={text} onClick={() => void send(text)}>
                    {text} <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
            )}
            {sending && (
              <div
                className="chat-typing"
                role="status"
                aria-label="Genie is thinking"
              >
                <i />
                <i />
                <i />
              </div>
            )}
            {error && (
              <div className="chat-error" role="alert">
                {error}
                <button
                  className="button button-outline"
                  onClick={() => onInquiry()}
                >
                  Send an enquiry <ArrowUpRight size={12} />
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form className="chat-composer" onSubmit={submit}>
            <div className="chat-input-row">
              <textarea
                aria-label="Message Genie"
                placeholder="What would you like to build?"
                rows={1}
                maxLength={2000}
                ref={inputRef}
                value={input}
                disabled={sending}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    void send();
                  }
                }}
              />
              <button
                className="chat-send"
                aria-label="Send message"
                disabled={sending || !input.trim()}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="chat-composer-note">
              AI can make mistakes.{" "}
              <Link to="/privacy" onClick={onClose}>
                Your conversation & privacy
              </Link>
            </p>
          </form>
        </section>
      )}
    </>
  );
}
