import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { useExperience } from "../lib/experience";
import Reveal from "../components/ui/Reveal";
import ServiceVisual from "../components/ui/ServiceVisual";
import CallToAction from "../components/CallToAction";
export default function ServicePage({ service }: { service: Service }) {
  const { openContact, openChat } = useExperience();
  return (
    <>
      <section className={"section service-hero service-" + service.id}>
        <Reveal className="service-hero-copy">
          <Link className="breadcrumb" to="/#solutions">
            Solutions <span>/</span> {service.name}
          </Link>
          <p className="eyebrow">{service.eyebrow}</p>
          <h1>{service.headline}</h1>
          <p className="page-description">{service.description}</p>
          <div className="hero-actions">
            <button
              className="button button-light"
              onClick={() => openContact()}
            >
              Explore your project <ArrowUpRight size={18} />
            </button>
            <button className="button button-ghost" onClick={openChat}>
              <Sparkles size={17} />
              Ask Genie
            </button>
          </div>
        </Reveal>
        <Reveal className="service-hero-visual" delay={0.2}>
          <div className="service-art-grid" />
          <ServiceVisual type={service.id} />
          <span className="mono">PURPOSE-BUILT. CONNECTED. USEFUL.</span>
        </Reveal>
      </section>
      <section className="section">
        <Reveal>
          <p className="eyebrow">WHAT THIS COULD LOOK LIKE</p>
          <h2>Built for real work.</h2>
          <p className="section-description">
            A few possibilities to start the conversation.
            <br />
            Your solution starts with your specific needs.
          </p>
        </Reveal>
        <div
          className={
            "use-case-grid " +
            (service.useCases.length === 4 ? "use-case-grid-pairs" : "")
          }
        >
          {service.useCases.map((item, index) => (
            <Reveal key={item.title} className="use-case" delay={index * 0.08}>
              <span className="mono">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section deliverables-section">
        <Reveal>
          <p className="eyebrow">MORE THAN A PROTOTYPE</p>
          <h2>
            A considered system.
            <br />
            <span className="text-muted">A practical handover.</span>
          </h2>
        </Reveal>
        <Reveal className="deliverables">
          {service.deliverables.map((item) => (
            <div key={item}>
              <Check size={18} />
              <span>{item}</span>
            </div>
          ))}
          <p>Scope and deliverables are agreed together after discovery.</p>
        </Reveal>
      </section>
      <CallToAction />
    </>
  );
}
