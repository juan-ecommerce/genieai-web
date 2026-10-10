export type ServiceId = "agents" | "knowledge" | "automation" | "data";
export interface Service {
  id: ServiceId;
  path: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  short: string;
  accent: string;
  deliverables: string[];
  useCases: { title: string; text: string }[];
}
export const services: Service[] = [
  {
    id: "agents",
    path: "/ai-agents",
    name: "AI Agents",
    eyebrow: "Intelligence that takes initiative",
    headline: "AI agents. Real capability.",
    description:
      "Give your team a capable new collaborator. We build AI agents that understand context, use your tools, and move useful work forward—with you in control.",
    short:
      "From a question to an action. Purpose-built AI that works alongside your team.",
    accent: "#b8a5ff",
    deliverables: [
      "A focused agent tailored to your workflow",
      "Connections to the tools you already use",
      "Grounded answers from your own knowledge",
      "Human approval for consequential actions",
      "Evaluation, deployment, and iteration",
    ],
    useCases: [
      {
        title: "Customer support copilots",
        text: "Guide B2C shoppers and B2B buyers through product questions, qualify enquiries, and route complex conversations to your team.",
      },
      {
        title: "Lead qualification & CRM",
        text: "Ask the right questions, collect useful project details, and prepare a next step in your CRM. Your team stays in control of follow-up.",
      },
      {
        title: "Research & reporting assistants",
        text: "Let an agent prepare reports, draft communications, or coordinate a sequence of tools—with clear review points.",
      },
      {
        title: "AI strategy & focused pilots",
        text: "Identify a useful opportunity, assess the tools and data it needs, and build a pilot with clear evaluation criteria before wider adoption.",
      },
    ],
  },
  {
    id: "knowledge",
    path: "/rag",
    name: "RAG Systems",
    eyebrow: "Knowledge, connected",
    headline: "Your knowledge. Finally connected.",
    description:
      "Turn scattered information into something your team can actually use. Retrieval-augmented generation connects AI to your documents and gives answers a reliable foundation.",
    short:
      "Connect your documents to answers. Less searching, more understanding.",
    accent: "#6de4dc",
    deliverables: [
      "Document ingestion and indexing",
      "Semantic search and source references",
      "Vector and graph retrieval where useful",
      "Access-aware integration with your systems",
      "Answer-quality evaluation and updates",
    ],
    useCases: [
      {
        title: "Find the answer, not another file",
        text: "Search across internal documents in natural language and bring the relevant information into one response.",
      },
      {
        title: "Support with a source",
        text: "Connect product documentation, catalogue knowledge, and policies to buyer and support assistants, with references your team can check.",
      },
      {
        title: "Connect the bigger picture",
        text: "Use graph-based retrieval when relationships between people, documents, or entities matter as much as the individual facts.",
      },
    ],
  },
  {
    id: "automation",
    path: "/automation",
    name: "Automation",
    eyebrow: "Make room for meaningful work",
    headline: "Less busywork. More momentum.",
    description:
      "Your tools should work together. From B2B order workflows to B2C commerce operations, we design the connections between systems, remove repetitive handoffs, and keep useful work moving.",
    short:
      "Connect the dots between your tools. Let the repetitive work take care of itself.",
    accent: "#a9ed9d",
    deliverables: [
      "Workflow discovery, process mapping, and solution architecture",
      "B2B/B2C commerce, ERP, CRM, and PIM integration planning",
      "n8n, Make, Zapier, or custom integrations",
      "Reliable triggers and data transformation",
      "Exception handling and human review",
      "Monitoring and practical documentation",
    ],
    useCases: [
      {
        title: "From enquiry to next step",
        text: "Capture an incoming lead, enrich the details, prepare a response, and keep your CRM up to date.",
      },
      {
        title: "Document & invoice workflows",
        text: "Extract and validate data from documents, route exceptions for human review, and connect the approved information to your business systems.",
      },
      {
        title: "Connected B2B & B2C commerce",
        text: "Design the connections between your commerce platform, ERP, CRM, product information, and order workflows. Handle business accounts, customer journeys, and operational exceptions as part of one system.",
      },
      {
        title: "Reports that arrive ready",
        text: "Collect data, prepare a useful summary, and deliver it to the people who need it on a predictable schedule.",
      },
    ],
  },
  {
    id: "data",
    path: "/data-science",
    name: "Data Science",
    eyebrow: "Predictions, patterns, and practical decisions",
    headline: "Understand today. Predict what’s next.",
    description:
      "Turn historical data into a useful view of what comes next. Forecasting, predictive machine learning, customer intelligence, and statistical experiments—connected to the decisions your business needs to make.",
    short:
      "Forecast demand, understand customers, test ideas, and turn your data into action.",
    accent: "#f4ba80",
    deliverables: [
      "Data readiness, exploration, and a business hypothesis",
      "Data preparation and reliable pipelines",
      "Baseline models, backtesting, and meaningful evaluation",
      "Forecast uncertainty and clear model limitations",
      "Decision-focused dashboards and reporting",
      "Model APIs, deployment, and workflow integration",
      "Monitoring for data drift and model performance",
      "Documentation and a practical improvement roadmap",
    ],
    useCases: [
      {
        title: "Demand & revenue forecasting",
        text: "Use time series, seasonality, and relevant commerce signals to support inventory, capacity, and revenue planning for B2B and B2C. Compare forecasts to a baseline and show uncertainty.",
      },
      {
        title: "Churn, propensity & risk",
        text: "Build classification models for customer churn or lead conversion, and explore anomaly detection. Evaluate the cost of errors before a score becomes a business action.",
      },
      {
        title: "Segmentation & recommendations",
        text: "Discover customer groups through clustering and behavioural analysis. Explore recommendation systems that make products, content, or outreach more relevant.",
      },
      {
        title: "Experiments & statistical analysis",
        text: "Define a hypothesis, choose success metrics, and design A/B tests. Interpret results with attention to uncertainty, sample size, and the decision at stake.",
      },
      {
        title: "Analytics & data foundations",
        text: "Bring scattered data together, check quality, and build pipelines and dashboards around the questions your team actually needs to answer.",
      },
      {
        title: "Production ML & MLOps",
        text: "Take a useful model beyond a notebook. Deploy it through an API or workflow, monitor data drift and performance, and document how to maintain and improve it.",
      },
    ],
  },
];
