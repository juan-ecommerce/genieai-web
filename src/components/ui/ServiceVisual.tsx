import {
  ArrowUpRight,
  Bot,
  Check,
  FileText,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ServiceId } from "../../data/services";
export default function ServiceVisual({ type }: { type: ServiceId }) {
  if (type === "agents")
    return (
      <div className="service-visual agent-visual" aria-hidden="true">
        <div className="mini-message">
          <span className="mini-avatar">
            <Bot size={16} />
          </span>
          <span>What can I take off your plate?</span>
        </div>
        <div className="mini-task">
          <span className="task-dot" />
          <span>Research, connect, take action.</span>
          <ArrowUpRight size={14} />
        </div>
        <div className="mini-status">
          <span className="status-dot" /> YOUR NEW CAPABLE COLLABORATOR
        </div>
      </div>
    );
  if (type === "knowledge")
    return (
      <div className="service-visual knowledge-visual" aria-hidden="true">
        <div className="knowledge-files">
          <span>
            <FileText size={20} />
          </span>
          <span>
            <FileText size={20} />
          </span>
          <span>
            <FileText size={20} />
          </span>
        </div>
        <div className="knowledge-connection" />
        <div className="knowledge-answer">
          <Search size={16} />
          <span>Your answer, with a source.</span>
          <Check size={16} />
        </div>
      </div>
    );
  if (type === "automation")
    return (
      <div className="service-visual automation-visual" aria-hidden="true">
        <span className="workflow-node">
          <Workflow size={22} />
        </span>
        <span className="workflow-connector" />
        <span className="workflow-node core-node">
          <Sparkles size={22} />
        </span>
        <span className="workflow-connector" />
        <span className="workflow-node">
          <Check size={22} />
        </span>
      </div>
    );
  return (
    <div className="service-visual data-visual" aria-hidden="true">
      <div className="chart-label">
        <span>A CLEARER PICTURE</span>
        <ArrowUpRight size={14} />
      </div>
      <svg viewBox="0 0 300 80">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4ba80" stopOpacity=".2" />
            <stop offset="100%" stopColor="#f4ba80" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 75L30 61L60 65L90 40L120 46L150 27L180 33L210 14L240 20L270 5L300 9L300 80L0 80Z"
          fill="url(#chart-fill)"
        />
        <path
          className="chart-line"
          d="M0 75L30 61L60 65L90 40L120 46L150 27L180 33L210 14L240 20L270 5L300 9"
          fill="none"
          stroke="#f4ba80"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
