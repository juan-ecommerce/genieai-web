import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  LineChart,
  ClipboardList,
  FileSearch,
  FlaskConical,
  Layers3,
  Target,
  Users,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import { emptyInquiry, useExperience } from "../lib/experience";

const projects = [
  {
    name: "Support copilot",
    category: "ai",
    label: "AI AGENTS",
    icon: Bot,
    text: "Help B2C shoppers and B2B buyers find answers in your product knowledge, prepare replies, and hand complex conversations to your team.",
    outcome: "A more useful first response",
  },
  {
    name: "Lead qualification",
    category: "ai",
    label: "AGENTS + AUTOMATION",
    icon: Target,
    text: "Collect the right details, qualify enquiries, and prepare a next step in your CRM—with clear human review.",
    outcome: "From enquiry to opportunity",
  },
  {
    name: "Company knowledge assistant",
    category: "ai",
    label: "RAG + SEMANTIC SEARCH",
    icon: FileSearch,
    text: "Connect documents and policies to an internal assistant that finds relevant answers and shows its sources.",
    outcome: "Knowledge your team can use",
  },
  {
    name: "Document automation",
    category: "ai",
    label: "INTELLIGENT WORKFLOWS",
    icon: ClipboardList,
    text: "Extract and validate information from orders, invoices, or forms, then connect it to your commerce platform and business systems.",
    outcome: "Less manual processing",
  },
  {
    name: "Demand forecasting",
    category: "data",
    label: "TIME SERIES + PREDICTION",
    icon: LineChart,
    text: "Use historical sales, seasonality, and business signals to forecast demand or revenue, with backtesting and uncertainty ranges.",
    outcome: "A better basis for planning",
  },
  {
    name: "Churn & lead scoring",
    category: "data",
    label: "PREDICTIVE MACHINE LEARNING",
    icon: Target,
    text: "Estimate customer churn risk or lead conversion propensity. Evaluate the model before connecting its signals to your workflow.",
    outcome: "Know where to focus attention",
  },
  {
    name: "Customer segmentation",
    category: "data",
    label: "CLUSTERING + RECOMMENDATIONS",
    icon: Users,
    text: "Find meaningful customer groups and explore recommendations using purchasing patterns and behavioural data.",
    outcome: "More relevant customer experiences",
  },
  {
    name: "Experiments & analytics",
    category: "data",
    label: "STATISTICS + DECISION SUPPORT",
    icon: FlaskConical,
    text: "Define hypotheses, design A/B tests, and build decision-focused reporting so your team can measure what actually changes.",
    outcome: "Decisions with evidence behind them",
  },
];
const filters = [
  { id: "all", name: "All solutions" },
  { id: "ai", name: "AI & automation" },
  { id: "data", name: "Data science" },
];

export default function ProjectCatalog() {
  const [filter, setFilter] = useState("all");
  const { openContact } = useExperience();
  const visible = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  return (
    <section
      className="section project-section"
      aria-labelledby="project-heading"
    >
      <div className="section-heading">
        <Reveal>
          <p className="eyebrow">REAL PROBLEMS. USEFUL STARTING POINTS.</p>
          <h2 id="project-heading">Find your starting point</h2>
        </Reveal>
        <Reveal className="section-intro">
          <p>
            Something your team could use.
            <br />A focused first project, shaped around your business.
          </p>
        </Reveal>
      </div>
      <div className="project-filters" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.name}
          </button>
        ))}
        <span className="mono" aria-live="polite">
          {visible.length} POSSIBILITIES
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            className={"project-card project-" + project.category}
            key={project.name}
          >
            <div className="project-card-top">
              <project.icon size={23} />
              <span className="mono">{project.label}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.text}</p>
            <span className="project-outcome">
              <Layers3 size={13} />
              {project.outcome}
            </span>
            <button
              aria-label={"Explore this idea: " + project.name}
              onClick={() =>
                openContact({
                  ...emptyInquiry,
                  message:
                    "I’d like to explore " +
                    project.name +
                    ".\n\nOur business goal is: \nOur current tools and data are: ",
                })
              }
            >
              Explore this idea <ArrowUpRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <p className="project-scope">
        Starting points, built to fit. Data readiness, scope, evaluation, and
        deployment are agreed together during discovery.
      </p>
    </section>
  );
}
