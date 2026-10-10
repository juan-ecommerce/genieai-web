import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, LineChart, Fingerprint, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./ui/Reveal";

export function ForecastChart() {
  return (
    <svg
      className="forecast-chart"
      viewBox="0 0 340 150"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 25H330M10 65H330M10 105H330M10 145H330" stroke="#ffffff0d" />
      <path d="M210 15V145" stroke="#ffffff30" strokeDasharray="3 5" />
      <path
        d="M210 82L240 54L270 43L300 20L330 8V66L300 72L270 91L240 97L210 82Z"
        fill="#f4ba8018"
      />
      <path
        d="M10 130L40 114L70 119L100 90L130 99L160 68L185 78L210 82"
        stroke="#6de4dc"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M210 82L240 76L270 67L300 46L330 37"
        stroke="#f4ba80"
        strokeWidth="2.5"
        strokeDasharray="5 5"
        strokeLinejoin="round"
      />
      <circle cx="210" cy="82" r="4" fill="#e9efff" />
    </svg>
  );
}

export function SignalVisual({ standalone = false }: { standalone?: boolean }) {
  const art = useRef<HTMLDivElement>(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: art,
    offset: ["start end", "end start"],
  });
  const forecastY = useTransform(scrollYProgress, [0, 1], [70, -80]);
  const segmentY = useTransform(scrollYProgress, [0, 1], [-35, 60]);
  const actionY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotation = useTransform(scrollYProgress, [0, 1], [-8, 14]);
  const forecastX = useTransform(scrollYProgress, [0, 1], [-15, 20]);
  return (
    <div
      className={"signal-visual " + (standalone ? "signal-standalone" : "")}
      ref={art}
      aria-hidden="true"
    >
      <div className="signal-grid" />
      <div className="signal-orbit-clip">
        <motion.div
          className="signal-orbit"
          style={{ rotate: reduced ? 0 : rotation }}
        >
          <span />
          <span />
          <span />
        </motion.div>
      </div>
      <motion.div
        className="signal-card signal-card-forecast"
        style={{ y: reduced ? 0 : forecastY, x: reduced ? 0 : forecastX }}
      >
        <div className="signal-card-header">
          <LineChart size={16} />
          <span className="mono">01 / FORECAST SIGNAL</span>
          <span className="signal-dot" />
        </div>
        <strong>A view of what could come next.</strong>
        <ForecastChart />
        <div className="chart-legend">
          <span>Observed</span>
          <span>Projected range</span>
        </div>
      </motion.div>
      <motion.div
        className="signal-card signal-card-segments"
        style={{ y: reduced ? 0 : segmentY }}
      >
        <div className="signal-card-header">
          <Fingerprint size={16} />
          <span className="mono">02 / CUSTOMER PATTERNS</span>
        </div>
        <div className="cluster-art">
          {Array.from({ length: 36 }, (_, i) => (
            <span
              key={i}
              style={{
                left: (i % 3) * 30 + Math.sin(i * 2.3) * 9 + 15 + "%",
                top: (Math.floor(i / 3) % 12) * 6 + 12 + "%",
                background: ["#b8a5ff", "#6de4dc", "#f4ba80"][i % 3],
              }}
            />
          ))}
        </div>
        <span className="signal-note">Different needs. Clearer groups.</span>
      </motion.div>
      <motion.div
        className="signal-card signal-card-action"
        style={{ y: reduced ? 0 : actionY }}
      >
        <div className="signal-card-header">
          <Workflow size={16} />
          <span className="mono">03 / CONNECTED ACTION</span>
        </div>
        <div className="signal-action">
          <span>Data</span>
          <ArrowUpRight size={15} />
          <span>Model</span>
          <ArrowUpRight size={15} />
          <span>Your workflow</span>
        </div>
        <span className="signal-note">
          From an insight to a useful next step.
        </span>
      </motion.div>
      <span className="signal-caption mono">
        ILLUSTRATIVE SIGNALS / REAL POSSIBILITIES
      </span>
    </div>
  );
}

export default function ParallaxInsights() {
  return (
    <section
      className="section insights-section"
      aria-labelledby="insights-heading"
    >
      <Reveal className="insights-copy">
        <p className="eyebrow">DATA SCIENCE, CONNECTED TO YOUR BUSINESS</p>
        <h2 id="insights-heading">
          Understand today.
          <br />
          <span className="text-muted">Anticipate tomorrow.</span>
        </h2>
        <p>
          AI can answer a question. Data science helps you ask the next one.
        </p>
        <p>
          Forecast demand. Identify customer patterns. Test an idea. Then
          connect the insight to the people and systems that can act on it.
        </p>
        <Link to="/data-science" className="inline-link">
          Explore data science <ArrowUpRight size={17} />
        </Link>
        <div className="insight-tags">
          <span>Forecasting</span>
          <span>Predictive ML</span>
          <span>Experiments</span>
        </div>
      </Reveal>
      <SignalVisual />
    </section>
  );
}
