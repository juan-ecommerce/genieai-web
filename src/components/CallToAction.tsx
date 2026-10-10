import { ArrowUpRight } from "lucide-react";
import { useExperience } from "../lib/experience";
import Reveal from "./ui/Reveal";
import { BrandMark } from "./ui/Brand";
export default function CallToAction() {
  const { openContact } = useExperience();
  return (
    <section className="section cta-section">
      <Reveal className="cta-panel">
        <div className="cta-orbit" aria-hidden="true" />
        <BrandMark className="cta-star" />
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Big possibilities.
          <br />
          <span className="text-muted">Let’s make them real.</span>
        </h2>
        <p>
          Have a workflow that could work better?
          <br />
          Let’s find out what we can build together.
        </p>
        <button className="button button-light" onClick={() => openContact()}>
          Let’s talk <ArrowUpRight size={18} />
        </button>
        <div className="cta-contact-links">
          <a className="subtle-link" href="mailto:juan@avancedev.com">
            juan@avancedev.com
          </a>
          <a className="subtle-link" href="tel:+46793348387">
            +46 79 3348387
          </a>
        </div>
      </Reveal>
    </section>
  );
}
