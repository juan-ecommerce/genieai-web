import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Brand from "./ui/Brand";
import ContactModal from "./ContactModal";
import ChatWidget from "./ChatWidget";
import CookieConsent from "./CookieConsent";
import Seo from "./Seo";
import { ExperienceContext, type Inquiry } from "../lib/experience";
import { services } from "../data/services";
export default function Layout() {
  const location = useLocation(),
    reduced = useReducedMotion(),
    { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false),
    [menu, setMenu] = useState(false),
    [solutions, setSolutions] = useState(false);
  const [contact, setContact] = useState(false),
    [chat, setChat] = useState(false),
    [cookieSettings, setCookieSettings] = useState(false),
    [draft, setDraft] = useState<Inquiry>();
  const dropdown = useRef<HTMLDivElement>(null);
  const openCookieSettings = useCallback(() => {
    setContact(false);
    setChat(false);
    setCookieSettings(true);
  }, []);
  const closeCookieSettings = useCallback(() => setCookieSettings(false), []);
  const openContact = useCallback((inquiry?: Inquiry) => {
    if (inquiry) setDraft({ ...inquiry });
    setChat(false);
    setMenu(false);
    setContact(true);
  }, []);
  const closeContact = useCallback(() => setContact(false), []),
    closeChat = useCallback(() => setChat(false), []),
    openChat = useCallback(() => setChat(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMenu(false);
    setSolutions(false);
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
      } else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, reduced]);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!dropdown.current?.contains(event.target as Node))
        setSolutions(false);
    }
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenu(false);
        setSolutions(false);
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", keydown);
    };
  }, []);
  return (
    <ExperienceContext.Provider value={{ openContact, openChat }}>
      <Seo />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className={"site-header " + (scrolled || menu ? "scrolled" : "")}>
        <div className="header-inner">
          <Link to="/" aria-label="GenieAI home">
            <Brand />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-dropdown" ref={dropdown}>
              <button
                aria-expanded={solutions}
                aria-controls="solutions-menu"
                onClick={() => setSolutions((value) => !value)}
              >
                Solutions <ChevronDown size={12} />
              </button>
              {solutions && (
                <div className="nav-dropdown-menu" id="solutions-menu">
                  {services.map((service) => (
                    <Link key={service.id} to={service.path}>
                      {service.name}
                      <ArrowUpRight size={13} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/#approach">Our approach</Link>
            <Link to="/about">The studio</Link>
          </nav>
          <button
            className="button button-outline header-contact"
            onClick={() => openContact()}
          >
            Let’s talk <ArrowUpRight size={14} />
          </button>
          <button
            className="mobile-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menu && (
          <nav
            className="mobile-navigation"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {services.map((service) => (
              <Link key={service.id} to={service.path}>
                {service.name}
              </Link>
            ))}
            <Link to="/#approach">Our approach</Link>
            <Link to="/about">The studio</Link>
            <button
              className="button button-light"
              onClick={() => openContact()}
            >
              Let’s talk <ArrowUpRight size={17} />
            </button>
          </nav>
        )}
        {!reduced && (
          <motion.div
            className="scroll-progress"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" aria-label="GenieAI home">
              <Brand />
            </Link>
            <p>
              Intelligent systems. Human possibilities.
              <br />
              Built in Stockholm, Sweden.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="mono">EXPLORE</span>
              {services.map((service) => (
                <Link to={service.path} key={service.id}>
                  {service.name}
                </Link>
              ))}
            </div>
            <div>
              <span className="mono">THE STUDIO</span>
              <Link to="/about">About GenieAI</Link>
              <Link to="/#approach">Our approach</Link>
              <Link to="/privacy">Your details & privacy</Link>
            </div>
            <div>
              <span className="mono">START A CONVERSATION</span>
              <a href="mailto:juan@avancedev.com">juan@avancedev.com</a>
              <a href="tel:+46793348387">+46 79 3348387</a>
              <button className="footer-chat-link" onClick={openChat}>
                Talk to Genie <ArrowUpRight size={11} />
              </button>
              <span>Stockholm · Working together</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GenieAI</span>
          <span>Designed for what’s next.</span>
          <div className="footer-policy-links">
            <Link to="/privacy">Privacy</Link>
            <button onClick={openCookieSettings}>Cookie settings</button>
          </div>
        </div>
      </footer>
      <ChatWidget
        open={chat}
        onOpen={openChat}
        onClose={closeChat}
        onInquiry={openContact}
      />
      <ContactModal isOpen={contact} onClose={closeContact} draft={draft} />
      <CookieConsent
        settingsOpen={cookieSettings}
        onOpenSettings={openCookieSettings}
        onCloseSettings={closeCookieSettings}
        hidden={chat || contact}
      />
    </ExperienceContext.Provider>
  );
}
