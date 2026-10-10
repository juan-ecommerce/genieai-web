export const metadata = {
  "/": {
    title: "GenieAI — Intelligent systems. Human possibilities.",
    description:
      "AI and ML engineering, B2B/B2C ecommerce architecture, automation, and predictive data science. GenieAI connects intelligent systems to your business.",
  },
  "/ai-agents": {
    title: "AI Agents — GenieAI",
    description:
      "Purpose-built AI agents that understand context, connect your tools, and help your team move useful work forward. Built with GenieAI in Stockholm.",
  },
  "/rag": {
    title: "RAG & Connected Knowledge — GenieAI",
    description:
      "Connect your documents to grounded AI answers. GenieAI builds retrieval, semantic search, and enterprise knowledge assistants around your business.",
  },
  "/automation": {
    title: "Business Automation — GenieAI",
    description:
      "Connect B2B/B2C commerce and business systems. Solution architecture, order workflows, and automation with n8n, Make, Zapier, and custom integrations.",
  },
  "/data-science": {
    title: "Data Science & ML Engineering — GenieAI",
    description:
      "Demand forecasting, churn prediction, customer segmentation, A/B testing, analytics, and production ML. Data science connected to useful business decisions.",
  },
  "/about": {
    title: "The Studio & Juan — GenieAI",
    description:
      "Meet Juan: Solutions Architect for B2B/B2C ecommerce, AI Engineer, and Machine Learning Engineer. Work directly with GenieAI in Stockholm.",
  },
  "/privacy": {
    title: "Your Details & Privacy — GenieAI",
    description:
      "How GenieAI handles website enquiries, AI conversations, and your project details.",
  },
};
export const notFound = {
  title: "Page Not Found — GenieAI",
  description:
    "That page could not be found. Explore GenieAI services or start a conversation about your project.",
};
export function normalizePath(path) {
  return path.replace(/\/+$/, "") || "/";
}
export function getMetadata(path) {
  return metadata[normalizePath(path)] || notFound;
}
