import {
  ArrowDown,
  ArrowUpRight,
  Pause,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import SceneShell from "../components/scene/SceneShell";
import Reveal from "../components/ui/Reveal";
import ServiceVisual from "../components/ui/ServiceVisual";
import InteractiveCard from "../components/ui/InteractiveCard";
import ProjectCatalog from "../components/ProjectCatalog";
import ParallaxInsights from "../components/ParallaxInsights";
import WorkflowPlayground from "../components/WorkflowPlayground";
import CallToAction from "../components/CallToAction";
import { services } from "../data/services";
import { useExperience } from "../lib/experience";
const process = [
  {
    number: "01",
    title: "Find the right opportunity.",
    text: "We start with your business, your tools, and the work that gets in the way. Together, we choose a problem worth solving.",
  },
  {
    number: "02",
    title: "Build something useful.",
    text: "A focused prototype turns an idea into something you can try. We test it with real workflows and refine what matters.",
  },
  {
    number: "03",
    title: "Connect it to your world.",
    text: "We integrate, deploy, and document the solution. Clear controls and human review keep your team in the loop.",
  },
  {
    number: "04",
    title: "Keep moving forward.",
    text: "Measure what is working, learn from use, and improve. Intelligent systems get better when they are built to evolve.",
  },
];
const faqs = [
  {
    q: "Where should we start with AI?",
    a: "Start with one useful workflow. We can help you identify repetitive work, scattered knowledge, or a customer interaction that would benefit from better support—then explore a focused first project.",
  },
  {
    q: "Can you work with our existing tools?",
    a: "That is the starting point. We explore your current stack and connect the relevant systems through APIs, automation platforms, or custom integrations, depending on what your workflow needs.",
  },
  {
    q: "Do we need a large project to begin?",
    a: "A focused prototype is often a useful first step. Scope, budget, and timeline are agreed after we understand your goals and constraints.",
  },
  {
    q: "How do you approach reliability and control?",
    a: "We define what a solution should do, test it against realistic examples, and design appropriate review points. Data access, deployment, and ongoing evaluation are part of the project conversation.",
  },
];
export default function Home() {
  const [paused, setPaused] = useState(false);
  const { openChat } = useExperience(),
    heroRef = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 170]),
    textY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  return (
    <>
      <div className="hero-viewport">
        <section className="hero section-wide" ref={heroRef}>
          <div className="hero-grid" aria-hidden="true" />
          <motion.div className="hero-copy" style={{ y: reduced ? 0 : textY }}>
            <Reveal>
              <p className="eyebrow">
                <span className="status-dot" /> AI, DATA & COMMERCE STUDIO ·
                STOCKHOLM
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                Intelligence.
                <br />
                Built for
                <br />
                <span className="hero-accent">what’s next.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="hero-description">
                We turn complex workflows into intelligent systems.
                <br className="desktop-break" /> AI, automation, and smarter
                commerce.
                <br className="desktop-break" /> Designed around your business.
              </p>
            </Reveal>
            <Reveal className="hero-actions" delay={0.3}>
              <Link to="/#solutions" className="button button-light">
                Explore solutions <ArrowUpRight size={18} />
              </Link>
              <button className="button button-ghost" onClick={openChat}>
                <Sparkles size={17} />
                Talk to Genie
              </button>
            </Reveal>
          </motion.div>
          <motion.div className="hero-art" style={{ y: reduced ? 0 : artY }}>
            <SceneShell paused={paused} />
            <div className="core-label">
              <span className="status-dot" />
              <div>
                <span className="mono">GENIE CORE / 001</span>
                <p>Intelligence, connected.</p>
              </div>
            </div>
            <span className="art-coordinate coordinate-top">
              59°20′N · 18°04′E
            </span>
            <span className="art-coordinate coordinate-bottom">
              HUMAN IDEAS. INTELLIGENT SYSTEMS.
            </span>
          </motion.div>
          <div className="hero-footer">
            <span className="mono">BUILT TO WORK. DESIGNED TO EVOLVE.</span>
            {!reduced && (
              <button
                className="motion-toggle"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused ? "Resume 3D animation" : "Pause 3D animation"
                }
              >
                {paused ? <Play size={12} /> : <Pause size={12} />}
                <span>{paused ? "Resume motion" : "Pause motion"}</span>
              </button>
            )}
            <Link to="/#solutions" className="scroll-cue">
              Scroll to explore <ArrowDown size={16} />
            </Link>
          </div>
        </section>
      </div>
      <div className="tools-strip">
        <span className="mono">
          THE TOOLS.
          <br />
          THE POSSIBILITIES.
        </span>
        <div className="tools-list">
          {["OpenAI", "Claude", "n8n", "Make", "Python", "LangChain"].map(
            (tool) => (
              <span key={tool}>{tool}</span>
            ),
          )}
        </div>
        <span className="tools-note">
          Your stack,
          <br />
          connected.
        </span>
      </div>
      <section className="section solutions-section" id="solutions">
        <div className="section-heading">
          <Reveal>
            <p className="eyebrow">WHAT WE CAN BUILD TOGETHER</p>
            <h2>
              A little intelligence.
              <br />
              <span className="text-muted">A lot of possibility.</span>
            </h2>
          </Reveal>
          <Reveal className="section-intro">
            <p>
              Ecommerce architecture, AI engineering, and machine learning.
              <br />
              From B2B platforms to B2C customer experiences.
            </p>
          </Reveal>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal delay={index * 0.06} key={service.id}>
              <InteractiveCard>
                <Link
                  to={service.path}
                  className={"service-card service-" + service.id}
                  aria-label={"Explore " + service.name}
                >
                  <div className="card-top">
                    <span className="mono">0{index + 1} / SOLUTION</span>
                    <span className="card-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <ServiceVisual type={service.id} />
                  <h3>{service.name}</h3>
                  <p>{service.short}</p>
                  <span className="card-link">
                    Explore the possibilities <ArrowUpRight size={14} />
                  </span>
                </Link>
              </InteractiveCard>
            </Reveal>
          ))}
        </div>
      </section>
      <ParallaxInsights />
      <ProjectCatalog />
      <section className="manifesto section">
        <Reveal>
          <span className="eyebrow">OUR POINT OF VIEW</span>
          <p>
            AI should do more than
            <br />
            look impressive.
            <br />
            <span>
              It should make your
              <br />
              business work better.
            </span>
          </p>
        </Reveal>
        <div className="manifesto-note">
          <span className="plus-cross">+</span>
          <p>
            Useful by design.
            <br />
            Human at the centre.
            <br />
            Ready for what comes next.
          </p>
        </div>
      </section>
      <WorkflowPlayground />
      <section className="section approach-section" id="approach">
        <div className="approach-intro">
          <Reveal>
            <p className="eyebrow">HOW WE GET THERE</p>
            <h2>
              From “what if”
              <br />
              <span className="text-muted">to what’s next.</span>
            </h2>
            <p className="section-description">
              A close collaboration.
              <br />A clear path from idea to working system.
            </p>
            <Link to="/about" className="inline-link">
              Meet the studio <ArrowUpRight size={17} />
            </Link>
          </Reveal>
          <div className="approach-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="process-list">
          {process.map((item) => (
            <Reveal className="process-item" key={item.number}>
              <span className="mono process-number">{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <Plus size={17} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section faq-section">
        <Reveal>
          <p className="eyebrow">A FEW GOOD QUESTIONS</p>
          <h2>
            Curious?
            <br />
            <span className="text-muted">You’re in the right place.</span>
          </h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <Plus size={20} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
