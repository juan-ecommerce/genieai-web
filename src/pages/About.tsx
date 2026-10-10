import { ArrowUpRight } from "lucide-react";
import { SignalVisual } from "../components/ParallaxInsights";
import Reveal from "../components/ui/Reveal";
import CallToAction from "../components/CallToAction";
import { useExperience } from "../lib/experience";
export default function About() {
  const { openContact } = useExperience();
  return (
    <>
      <section className="section about-hero">
        <Reveal>
          <p className="eyebrow">THE STUDIO / STOCKHOLM, SWEDEN</p>
          <h1>
            Human curiosity.
            <br />
            <span className="text-muted">Intelligent possibility.</span>
          </h1>
          <p className="page-description">
            GenieAI brings together ecommerce solution architecture, AI
            engineering, and machine learning to build systems that make your
            business work better.
          </p>
        </Reveal>
      </section>
      <section className="section founder-section">
        <SignalVisual standalone />
        <Reveal className="founder-copy">
          <p className="eyebrow">A DIRECT COLLABORATION</p>
          <h2>
            Hi, I’m Juan.
            <br />
            Let’s build something useful.
          </h2>
          <p>
            I’m a Solutions Architect for B2B and B2C ecommerce, an AI Engineer,
            and a Machine Learning Engineer.
          </p>
          <div className="expertise-tags">
            <span>B2B & B2C ecommerce architecture</span>
            <span>AI engineering</span>
            <span>Machine learning engineering</span>
          </div>
          <p>
            I connect commerce architecture with intelligent systems—from
            product knowledge assistants and custom agents to connected order
            workflows, demand forecasting, and customer analytics. We consider
            the customer experience and the operation behind it together.
          </p>
          <p>
            Based in Stockholm, I bring a hands-on approach to discovery,
            development, and integration. We start with the work you do and
            design around the outcome you need, whether you serve business
            buyers, individual customers, or both.
          </p>
          <p>
            You’ll collaborate directly with me, with clear conversations about
            scope, progress, and what comes next.
          </p>
          <button
            className="button button-outline"
            onClick={() => openContact()}
          >
            Start a conversation <ArrowUpRight size={18} />
          </button>
        </Reveal>
      </section>
      <section className="section studio-values">
        <Reveal>
          <p className="eyebrow">WHAT GUIDES THE WORK</p>
          <h2>Thoughtful by design.</h2>
        </Reveal>
        <div className="use-case-grid">
          {[
            {
              title: "Useful comes first.",
              text: "Start with a real problem. Choose technology because it helps solve it.",
            },
            {
              title: "Stay connected.",
              text: "Build around your tools, your knowledge, and the people doing the work.",
            },
            {
              title: "Make room to evolve.",
              text: "Test, learn, and improve. A working system is the beginning of a better workflow.",
            },
          ].map((item) => (
            <Reveal className="use-case" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
