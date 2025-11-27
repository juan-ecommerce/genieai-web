import React, { useState } from 'react';
import { Bot, Brain, MessageSquare, ArrowRight, Code, Database } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const AIAgents: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const agentTypes = [
    {
      icon: MessageSquare,
      title: "RAG-Powered Agents",
      description: "AI agents with Retrieval-Augmented Generation for real-time knowledge access.",
      features: ["Document retrieval", "Knowledge base integration", "Contextual understanding", "Real-time updates"]
    },
    {
      icon: Brain,
      title: "Agentic RAG Systems",
      description: "Multi-agent systems that autonomously search, retrieve, and synthesize information.",
      features: ["Multi-source retrieval", "Autonomous reasoning", "Cross-reference validation", "Dynamic knowledge graphs"]
    },
    {
      icon: Code,
      title: "Code Generation Agents",
      description: "Specialized agents for software development and automation with RAG capabilities.",
      features: ["Code generation", "Documentation retrieval", "Best practices", "Context-aware suggestions"]
    },
    {
      icon: Database,
      title: "Knowledge Management",
      description: "Intelligent agents that organize and retrieve information from enterprise systems.",
      features: ["Enterprise search", "Knowledge extraction", "Semantic understanding", "Automated indexing"]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 rounded-full mb-6 shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300">
            <Bot className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-gray-300 font-medium">AI Agents</span>
          </div>
          <h1 className="relative text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient-x" style={{backgroundSize: '200% auto'}}>
            Intelligent AI Agents
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-2xl opacity-50 -z-10"></div>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Build custom AI agents with RAG capabilities for knowledge retrieval, automation, and intelligent decision-making
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center shadow-lg shadow-blue-500/50 hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
          </button>
        </div>
      </section>

      {/* Agent Types */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Types of AI Agents
            </h2>
            <p className="text-xl text-gray-400">
              Specialized AI agents for different business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {agentTypes.map((agent, index) => {
              const IconComponent = agent.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                >
                  {/* Holographic corner effect */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-lg w-fit mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {agent.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {agent.description}
                  </p>
                  <div className="space-y-2">
                    {agent.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 shadow-sm shadow-cyan-400/50"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Build Your AI Agent?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's create intelligent automation for your business
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default AIAgents;
