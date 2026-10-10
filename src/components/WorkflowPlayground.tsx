import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  LineChart,
  Database,
  FileText,
  Mail,
  Play,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Reveal from "./ui/Reveal";
const scenarios = [
  {
    name: "Sales & support",
    input: "A new customer enquiry",
    middle: "Understand & prepare",
    output: "A thoughtful next step",
    result: "Enquiry understood. Next step prepared.",
    icon: Mail,
  },
  {
    name: "Knowledge & docs",
    input: "Your connected documents",
    middle: "Retrieve & reason",
    output: "An answer with context",
    result: "Sources connected. Answers grounded.",
    icon: FileText,
  },
  {
    name: "Operations",
    input: "A routine data handoff",
    middle: "Transform & coordinate",
    output: "Your tools, in sync",
    result: "Information connected. Handoff complete.",
    icon: Database,
  },
  {
    name: "Predictions",
    input: "Historical business data",
    middle: "Model, backtest & evaluate",
    output: "A better planning signal",
    result: "Patterns evaluated. Planning signal prepared.",
    icon: LineChart,
  },
];
export default function WorkflowPlayground() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(-1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scenario = scenarios[selected];
  const Icon = scenario.icon;
  useEffect(() => {
    if (step < 0 || step >= 3) return;
    const timeout = window.setTimeout(() => setStep((value) => value + 1), 650);
    return () => window.clearTimeout(timeout);
  }, [step]);
  function select(index: number) {
    setSelected(index);
    setStep(-1);
  }
  return (
    <section className="section playground-section" id="playground">
      <div className="section-heading">
        <Reveal>
          <p className="eyebrow">LESS THEORY. MORE POSSIBILITY.</p>
          <h2>
            See the dots
            <br />
            <span className="text-muted">connect.</span>
          </h2>
        </Reveal>
        <Reveal className="section-intro">
          <p>
            It starts with a useful idea. It becomes a connected workflow. Try a
            small illustration of what that could look like.
          </p>
        </Reveal>
      </div>
      <Reveal className="playground">
        <div className="playground-header">
          <span className="mono">
            <span className="status-dot" /> WORKFLOW PLAYGROUND
          </span>
          <span className="demo-label">Illustrative demo</span>
        </div>
        <div
          className="scenario-tabs"
          role="tablist"
          aria-label="Workflow scenario"
        >
          {scenarios.map((item, index) => (
            <button
              key={item.name}
              role="tab"
              aria-selected={index === selected}
              tabIndex={index === selected ? 0 : -1}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              aria-controls="workflow-panel"
              id={"scenario-" + index}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                const target =
                  event.key === "ArrowRight"
                    ? (index + 1) % scenarios.length
                    : event.key === "ArrowLeft"
                      ? (index + scenarios.length - 1) % scenarios.length
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? scenarios.length - 1
                          : undefined;
                if (target !== undefined) {
                  event.preventDefault();
                  select(target);
                  tabs.current[target]?.focus();
                }
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          className="workflow-stage"
          id="workflow-panel"
          role="tabpanel"
          aria-labelledby={"scenario-" + selected}
        >
          {[
            { icon: Icon, title: scenario.input, label: "01 / INPUT" },
            {
              icon: Sparkles,
              title: scenario.middle,
              label: "02 / INTELLIGENCE",
            },
            { icon: Check, title: scenario.output, label: "03 / OUTCOME" },
          ].map((item, index) => (
            <div
              className={"flow-item " + (step >= index ? "flow-active" : "")}
              key={item.label}
            >
              <div className="flow-card">
                <item.icon size={26} />
                <span className="mono">{item.label}</span>
                <strong>{item.title}</strong>
              </div>
              {index < 2 && (
                <div
                  className={
                    "flow-line " + (step > index ? "flow-line-active" : "")
                  }
                >
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="playground-footer">
          <div aria-live="polite">
            <span className="workflow-result-title">
              {step === 3
                ? "Workflow complete"
                : step >= 0
                  ? "Connecting the dots…"
                  : "Small steps. Connected intelligently."}
            </span>
            <p>
              {step === 3
                ? scenario.result
                : "A visual example, ready to explore."}
            </p>
          </div>
          <button
            className="button button-small button-outline"
            onClick={() => setStep(0)}
            disabled={step >= 0 && step < 3}
          >
            {step === 3 ? <RefreshCw size={14} /> : <Play size={14} />}Run
            workflow
          </button>
        </div>
      </Reveal>
    </section>
  );
}
